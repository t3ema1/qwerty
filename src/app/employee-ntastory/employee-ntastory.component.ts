import { Component, OnInit } from '@angular/core';
import { NTAStoryService } from '../ntastory.service';
@Component({
  selector: 'app-employee-ntastory',
  templateUrl: './employee-ntastory.component.html',
  styleUrls: ['./employee-ntastory.component.css']
})
export class EmployeeNtastoryComponent implements OnInit {
  hrNtaStories: { title: string, body: string, announcementDate: Date }[] = [];

  constructor(private ntaStoryService: NTAStoryService) { }

  ngOnInit(): void {
    this.fetchHrNtaStories();
    console.log(this.hrNtaStories);
  }

  fetchHrNtaStories(): void {
    this.ntaStoryService.getUserNTAStories().subscribe(
      (data: any[]) => {
        this.hrNtaStories = data.map(item => ({
          title: item.header,
          body: item.body,
          announcementDate: new Date(item.announcementDate)
        }));
        console.log(data)
      },
      (error) => {
        console.error('Error fetching HR NTA stories:', error);
      }
    );
  }

  shouldDisplay(announcementDate: Date): boolean {
    const currentDate = new Date();
    return announcementDate <= currentDate;
  }

}