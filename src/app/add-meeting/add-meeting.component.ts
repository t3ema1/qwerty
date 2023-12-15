import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Meeting } from '../DBOS/meeting';

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
    meetingDate: new Date()
  };

  constructor(private announcementService: AnnouncementService) { }

  addNewMeeting() {

    console.log(this.newMeeting)
    this.announcementService.addMeeting(this.newMeeting).subscribe(
      (response) => {
        console.log('Meeting added successfully:', response);
      },
      (error) => {
        console.error('Error adding meeting:', error);
      }
    );
  }
  handleAttendeeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.newMeeting.attendeeUsernames = inputElement.value.split(',');
    } else {
      this.newMeeting.attendeeUsernames = [];
    }
  }

}
