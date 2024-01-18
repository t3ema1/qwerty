import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Meeting } from '../DBOS/meeting';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent {
  newMeeting: Meeting = {
    meetingName: '',
    meetingType: '',
    description: '',
    meetingLocation: '',
    meetingLink: '',
    attendeeUsernames: [],
    announcementDate: new Date(),
    meetingDate: new Date(),
    createdBy: ''
  };

  constructor(private announcementService: AnnouncementService, private jwtHelper: JwtHelperService) { }

  addNewMeeting() {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };
      console.log(this.newMeeting)
      console.log(token);
      const decodedToken = this.jwtHelper.decodeToken(token);
      const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.newMeeting.createdBy = username

      this.announcementService.addMeeting(this.newMeeting, headers).subscribe(
        (response) => {
          console.log('Meeting added successfully:', response);
        },
        (error) => {
          console.error('Error adding meeting:', error);
        }
      );
    }
  }

  handleAttendeeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const usernames = inputElement.value.split(',').map(username => username.trim());
      this.newMeeting.attendeeUsernames = usernames;
    } else {
      this.newMeeting.attendeeUsernames = [];
    }
  }



}
