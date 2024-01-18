import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ntastory } from '../DBOS/ntastory';
import { NTAStoryService } from '../ntastory.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-ntastory',
  templateUrl: './update-ntastory.component.html',
  styleUrls: ['./update-ntastory.component.css']
})
export class UpdateNtastoryComponent implements OnInit {
  ntaStoryId: number | null = null;
  ntaStoryForm!: FormGroup;
  ntaStory: Ntastory | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ntaStoryService: NTAStoryService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.ntaStoryId = +id;
      this.initForm();
      this.fetchNTAStoryDetails();
    } else {
    }
  }


  initForm() {
    this.ntaStoryForm = this.fb.group({
      Header: ['', Validators.required],
      Body: ['', Validators.required],
      publishedTo: ['', Validators.required],
      announcementDate: ['', Validators.required],
      Createdby: ['', Validators.required]
    });
    console.log("init-form");

  }

  fetchNTAStoryDetails() {
    this.ntaStoryService.getNTAStoryById(this.ntaStoryId!).subscribe(
      (data: any) => {
        this.ntaStory = data;

        console.log(this.ntaStory);
      },
      (error) => {
        console.error('Error fetching NTAstory details:', error);
      }
    );
    console.log("ntastory-searched");

  }

  populateForm() {
    if (this.ntaStory) {
      this.ntaStoryForm.patchValue({
        Header: this.ntaStory.Header,
        Body: this.ntaStory.body,
        publishedTo: this.ntaStory.publishedTo,
        announcementDate: this.ntaStory.announcementDate,
        Createdby: this.ntaStory.createdby
      });
    }
    console.log("form-completed");
    console.log(this.ntaStoryForm.value);
    console.log(this.ntaStoryForm.value.publishedTo);

    console.log("form-completed");

  }

  onSubmit() {
    this.populateForm();
    console.log(this.ntaStoryForm);
    console.log(this.ntaStoryId);
    console.log(this.ntaStory?.body);
    console.log(this.ntaStory?.Header);

    if (this.ntaStoryForm.valid && this.ntaStoryId !== null) {
      const updatedNTAStory: Ntastory = this.ntaStoryForm.value;

      const token = localStorage.getItem('jwtToken');;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`

      });

      this.ntaStoryService.updateNTAStory(this.ntaStoryId, updatedNTAStory, headers).subscribe(
        () => {
          console.log("updated")
        },
        (error) => {
          console.error('Error updating NTAstory:', error);
        }
      );
      console.log("request-made");
    } else {
      console.log("request-not-made");
      console.log(this.ntaStory?.body);
      console.log(this.ntaStory?.Header);

    }


  }

}
