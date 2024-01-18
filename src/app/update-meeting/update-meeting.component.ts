import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meeting } from '../DBOS/meeting';
import { AnnouncementService } from '../announcement.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css']
})
export class UpdateMeetingComponent implements OnInit {
  meetingId: number | null = null;
  meetingForm!: FormGroup;
  meeting: Meeting | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.meetingId = +id;
      this.initForm();
      this.fetchMeetingDetails();
    }
  }

  initForm() {
    this.meetingForm = this.fb.group({
      MeetingName: ['', Validators.required],
      MeetingType: ['', Validators.required],
      AttendeeUsernames: [''],
      Description: [''],
      MeetingLocation: [''],
      MeetingLink: [''],
      AnnouncementDate: [''],
      MeetingDate: [''],
      CreatedBy: ['']
    });
  }

  fetchMeetingDetails() {
    if (this.meetingId !== null) {
      this.announcementService.getMeetingById(this.meetingId).subscribe(
        (data: Meeting) => {
          this.meeting = data;
          this.populateForm();
        },
        (error) => {
          console.error('Error fetching meeting details:', error);
        }
      );
    }
  }

  populateForm() {
    if (this.meeting) {
      this.meetingForm.patchValue({
        MeetingName: this.meeting.meetingName || '',
        MeetingType: this.meeting.meetingType || '',
        AttendeeUsernames: this.meeting.attendeeUsernames || '',
        Description: this.meeting.description || '',
        MeetingLocation: this.meeting.meetingLocation || '',
        MeetingLink: this.meeting.meetingLink || '',
        AnnouncementDate: this.meeting.announcementDate || '',
        MeetingDate: this.meeting.meetingDate || '',
        CreatedBy: this.meeting.createdBy || ''

      });
    }
  }

  onSubmit() {
    if (this.meetingForm.valid && this.meetingId !== null) {
      const updatedMeeting: Meeting = this.meetingForm.value;
      console.log(this.meetingForm.value);
      const token = localStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      console.log(this.meetingId, "<========>", updatedMeeting);

      this.announcementService.updateMeeting(this.meetingId, updatedMeeting, headers).subscribe(
        () => {
          console.log("Meeting updated successfully");
        },
        (error) => {
          console.error('Error updating meeting:', error);
        }
      );
    }
  }

  handleAttendeeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const formattedUsernames = inputElement.value ? inputElement.value.split(',').map(username => username.trim()) : [];
    this.meetingForm.get('AttendeeUsernames')?.setValue(formattedUsernames);
  }


}
