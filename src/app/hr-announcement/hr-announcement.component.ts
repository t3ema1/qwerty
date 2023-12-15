import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';

@Component({
  selector: 'app-hr-announcement',
  templateUrl: './hr-announcement.component.html',
  styleUrls: ['./hr-announcement.component.css']
})
export class HrAnnouncementComponent implements OnInit {
  HrAnnouncements: { title: string, body: string, announcementDate: Date }[] = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchHRAnnouncements();
  }

  fetchHRAnnouncements(): void {
    this.announcementService.getHrAnnouncements().subscribe(
      (data: any[]) => {
        this.HrAnnouncements = data.map(item => ({
          title: item.labelName,
          body: item.messageBody,
          announcementDate: new Date(item.announcementDate)
        }));
      },
      (error) => {
        console.error('Error fetching HR announcements:', error);
      }
    );
  }

  shouldDisplay(announcementDate: Date): boolean {
    const currentDate = new Date();
    return announcementDate <= currentDate;
  }

}
