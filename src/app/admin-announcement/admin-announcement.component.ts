import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../DBOS/announcement';
declare var $: any;

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.css']
})
export class AdminAnnouncementComponent implements OnInit {
  announcementHistory: any[] = [];
  sidebarVisible: boolean = false;
  hoveredAnnouncementMessage: string = '';


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


  onDisplayAnnouncement(announcementId: number): void {
    this.announcementService.getAnnouncementById(announcementId).subscribe(
      (announcement: Announcement) => {
        this.hoveredAnnouncementMessage = announcement.messageBody;
        console.log('Message Body:', this.hoveredAnnouncementMessage);

      },
      (error) => {
        console.error('Error fetching announcement:', error);
      }
    );
  }


  hideMessage(): void {
    this.hoveredAnnouncementMessage = '';
  }

  handleClick(event: Event): void {
    const clickedElement = event.target as HTMLElement;
    const sidebarButton = document.getElementById('sidebarToggleBtn');

    if (
      !clickedElement.closest('.col-md-2') &&
      this.sidebarVisible &&
      !(clickedElement === sidebarButton)
    ) {
      this.sidebarVisible = false;
      $('#sidebar').hide('slide');
    }
  }



  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    if (this.sidebarVisible) {
      $('#sidebar').show('slide');
    } else {
      $('#sidebar').hide('slide');
    }
  }

}
