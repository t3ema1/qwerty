import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../DBOS/announcement';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent {
  announcementForm!: FormGroup;



  constructor(private fb: FormBuilder, private announcementService: AnnouncementService, private jwtHelper: JwtHelperService) {
    this.createForm();
  }

  createForm() {
    this.announcementForm = this.fb.group({
      labelName: ['', Validators.required],
      messageBody: ['', Validators.required],
      publishedTo: ['', Validators.required],
      announcementDate: ['', Validators.required],
      createdby: ['']
    });
  }

  onSubmit() {
    const token = localStorage.getItem('jwtToken');


    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      if (this.announcementForm.valid) {
        const announcement: Announcement = this.announcementForm.value;
        const decodedToken = this.jwtHelper.decodeToken(token);
        const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        console.log(announcement);
        console.log(username);
        announcement.createdby = username;
        this.announcementService.addAnnouncement(announcement, headers).subscribe(
          () => {
            this.announcementForm.reset();
          },
          (error) => {
            console.error('Error adding announcement:', error);
          }
        );
      }
    }
  }
}
