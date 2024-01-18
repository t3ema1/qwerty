import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  [x: string]: any;
  @Input() initialMonth: number = new Date().getMonth();
  @Input() initialYear: number = new Date().getFullYear();

  currentMonth: number = this.initialMonth;
  currentYear: number = this.initialYear;
  monthYearDisplay: string = '';
  calendar: any[] = [];
  meetingDates: any[] = []; // Store meeting dates for the logged-in user
  meetinginfo: any[] = [];
  currentUsername: string = '';

  constructor(private announcementService: AnnouncementService, private jwtHelper: JwtHelperService, private router: Router) {
    this.prevMonth()
  }





  async ngOnChanges() {
    console.log("ngonchange")

    await this.retrieveAttendeeDates();


  }

  generateCalendar() {
    console.log("generate-calendar")
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.calendar = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const dayInfo = {
        day: i,
        date: date,
        dayName: date.toLocaleString('default', { weekday: 'short' }),
        text: '',
        hasMeeting: false // Flag to identify meeting days
      };

      if (!this.calendar[Math.floor(i / 7)]) {
        this.calendar[Math.floor(i / 7)] = [];
      }
      this.calendar[Math.floor(i / 7)][i % 7] = dayInfo;
    }

    this.monthYearDisplay = `${new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' })} ${this.currentYear}`;
  }

  async retrieveAttendeeDates() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.currentUsername = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.announcementService.getAttendeeDatesByUsername(username).subscribe(
        (attendeeMeetingInfo: any[]) => {
          console.log('Attendee Meeting Info:', attendeeMeetingInfo);
          this.meetinginfo = attendeeMeetingInfo;
          const meetingDates = attendeeMeetingInfo.map(data => data.meetingDate);
          const meetingCreatedBy = attendeeMeetingInfo.map(data => data.meeting.createdBy);
          console.log(meetingDates);
          console.log(meetingCreatedBy);

          this.generateCalendar();
          this.markMeetingDays(meetingDates);

          meetingCreatedBy.forEach(createdBy => {
          });
        },
        (error) => {
          console.error('Error fetching attendee meeting info:', error);
        }
      );

    } else {
      console.log('Token not found');
    }
  }

  markMeetingDays(attendeeDates: any[]) {
    this.calendar.forEach(week => {
      week.forEach((day: { date: Date; hasMeeting: boolean; }) => {
        if (day.date && attendeeDates.some(meetingDate => this.isSameDate(day.date, new Date(meetingDate)))) {
          day.hasMeeting = true;

        }
        console.log("does ", day.date, "has meeting => ", day.hasMeeting)
      });
    });
  }


  isSameDate(dateA: Date, dateB: Date) {
    if (!(dateA instanceof Date) || !(dateB instanceof Date)) {
      console.log(dateA, "<===>", dateB)
      return false;

    }
    console.log("is here the date ?  ")
    console.log("today", dateA.getDate(), "   meetingday", dateB.getDate())
    console.log(dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate());
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.ngOnChanges();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.ngOnChanges();
  }


  checkIfCreatedBy(date: Date, username: string): boolean {
    const meeting = this.meetinginfo.find(
      (meetingInfo: any) => {
        const meetingDate = new Date(meetingInfo.meetingDate);
        return (
          meetingDate.getFullYear() === date.getFullYear() &&
          meetingDate.getMonth() === date.getMonth() &&
          meetingDate.getDate() === date.getDate() &&
          meetingInfo.meeting?.createdBy === username
        );
      }
    );
    console.log("Date:", date, "Meeting :", this.meetinginfo);


    return !!meeting;
  }


  handleMeetingDetails(date: Date) {
    console.log("the problem", date)
    const selectedMeeting = this.meetinginfo.find((info) => this.isSameDate(new Date(info.meetingDate), date));

    if (selectedMeeting) {
      const meetingId = selectedMeeting.meeting.id;
      this.router.navigate(['/update-meeting', meetingId]);
    }
  }




}
