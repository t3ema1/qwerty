import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Announcement } from '../DBOS/announcement';
import { AnnouncementService } from '../announcement.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.css']
})
export class UpdateAnnouncementComponent implements OnInit {
  announcementId: number | null = null;
  announcementForm!: FormGroup;
  announcement: Announcement | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id !== null) {
      this.announcementId = +id;
      console.log(id);
      this.initForm();
      this.fetchAnnouncementDetails();
    } else {
      console.log("id = null");
    }
  }

  initForm() {
    this.announcementForm = this.fb.group({
      LabelName: ['', Validators.required],
      MessageBody: ['', Validators.required],
      PublishedTo: ['', Validators.required],
      AnnouncementDate: ['', Validators.required]
    });
    console.log("init-form");
  }

  fetchAnnouncementDetails() {
    this.announcementService.getAnnouncementById(this.announcementId!).subscribe(
      (data: any) => {
        this.announcement = data;
        console.log(this.announcement);

      },
      (error) => {
        console.error('Error fetching announcement details:', error);
      }
    );
    console.log("announcement-searched");
  }


  populateForm() {
    if (this.announcement) {
      this.announcementForm.patchValue({
        LabelName: this.announcement.labelName,
        MessageBody: this.announcement.messageBody,
        PublishedTo: this.announcement.publishedTo,
        AnnouncementDate: this.announcement.announcementDate
      });
      console.log("form-completed");
      console.log(this.announcementForm.value);
    }
  }

  onSubmit() {
    console.log(this.announcementForm);
    console.log(this.announcementId);
    console.log(this.announcement?.messageBody);
    console.log(this.announcement?.labelName);
    this.populateForm();

    if (this.announcementForm.valid && this.announcementId !== null) {
      const updatedAnnouncement: Announcement = this.announcementForm.value;
      const token = localStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.announcementService.updateAnnouncement(this.announcementId, updatedAnnouncement, headers).subscribe(
        () => {
          console.log("updated");
        },
        (error) => {
          console.error('Error updating announcement:', error);
        }
      );
      console.log("request-made");
    } else {
      console.log("request-not-made");
      console.log(this.announcement?.messageBody);
      console.log(this.announcement?.labelName);
    }
  }
}
