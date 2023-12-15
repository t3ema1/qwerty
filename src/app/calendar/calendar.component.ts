import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(private announcementService: AnnouncementService, private jwtHelper: JwtHelperService) {

  }



  // Access claims from the decoded token


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
        dayName: date.toLocaleString('default', { weekday: 'short' }), // Get day name (e.g., "Mon")
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

      this.announcementService.getAttendeeDatesByUsername(username).subscribe(
        (attendeeDates: any[]) => {
          console.log('Attendee Dates:', attendeeDates);
          this.generateCalendar();
          this.markMeetingDays(attendeeDates);

        },
        (error) => {
          console.error('Error fetching attendee dates:', error);
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



}
