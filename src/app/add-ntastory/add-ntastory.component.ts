import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NTAStoryService } from '../ntastory.service'; // Assuming you have an Ntastory service
import { Ntastory } from '../DBOS/ntastory'; // Import the Ntastory interface
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-add-ntastory',
  templateUrl: './add-ntastory.component.html',
  styleUrls: ['./add-ntastory.component.css']
})
export class AddNtastoryComponent {
  ntastoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ntastoryService: NTAStoryService,
    private jwtHelper: JwtHelperService
  ) {
    this.createForm();
  }

  createForm() {
    this.ntastoryForm = this.fb.group({
      header: ['', Validators.required],
      body: ['', Validators.required],
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
      if (this.ntastoryForm.valid) {
        const ntastory: Ntastory = this.ntastoryForm.value;
        const decodedToken = this.jwtHelper.decodeToken(token);
        const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        console.log(ntastory);
        console.log(username);
        ntastory.createdby = username;

        this.ntastoryService.addNtastory(ntastory, headers).subscribe(
          () => {
            this.ntastoryForm.reset();
          },
          (error) => {
            console.error('Error adding Ntastory:', error);
          }
        );
      }
    }
  }

}
