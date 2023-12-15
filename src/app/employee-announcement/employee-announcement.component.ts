import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';

@Component({
  selector: 'app-employee-announcement',
  templateUrl: './employee-announcement.component.html',
  styleUrls: ['./employee-announcement.component.css']
})
export class EmployeeAnnouncementComponent implements OnInit {
  EmployeeAnnouncements: { title: string, body: string, announcementDate: Date }[] = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchHRAnnouncements();
  }

  fetchHRAnnouncements(): void {
    this.announcementService.getEmployeeAnnouncements().subscribe(
      (data: any[]) => {
        this.EmployeeAnnouncements = data.map(item => ({
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
