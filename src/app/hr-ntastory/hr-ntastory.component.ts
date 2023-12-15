import { Component, OnInit } from '@angular/core';
import { NTAStoryService } from '../ntastory.service';

@Component({
  selector: 'app-hr-ntastory',
  templateUrl: './hr-ntastory.component.html',
  styleUrls: ['./hr-ntastory.component.css']
})
export class HrNtastoryComponent implements OnInit {
  hrNtaStories: { title: string, body: string, announcementDate: Date }[] = [];

  constructor(private ntaStoryService: NTAStoryService) { }

  ngOnInit(): void {
    this.fetchHrNtaStories();
    console.log(this.hrNtaStories);
  }

  fetchHrNtaStories(): void {
    this.ntaStoryService.getHrNTAStories().subscribe(
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
