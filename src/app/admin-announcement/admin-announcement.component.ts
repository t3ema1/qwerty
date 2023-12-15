import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.css']
})
export class AdminAnnouncementComponent implements OnInit {
  announcementHistory: any[] = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchAnnouncementHistory();
  }

  fetchAnnouncementHistory(): void {
    this.announcementService.getAnnouncementHistory().subscribe(
      (data: any[]) => {
        this.announcementHistory = data;
      },
      (error) => {
        console.error('Error fetching announcement history:', error);
      }
    );
  }

  onDeleteAnnouncement(announcementId: number): void {
    this.announcementService.deleteAnnouncement(announcementId)
      .subscribe(
        () => {
          console.log('Announcement deleted successfully.');

          this.fetchAnnouncementHistory();
        },
        (error) => {
          console.error('Error deleting announcement:', error);
        }
      );
  }



}
