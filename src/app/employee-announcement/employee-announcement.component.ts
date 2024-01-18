import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
declare var $: any;

@Component({
  selector: 'app-employee-announcement',
  templateUrl: './employee-announcement.component.html',
  styleUrls: ['./employee-announcement.component.css']
})
export class EmployeeAnnouncementComponent implements OnInit {
  EmployeeAnnouncements: { title: string, body: string, announcementDate: Date, createdby: string }[] = [];
  sidebarVisible: boolean = false;

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchHRAnnouncements();
  }

  fetchHRAnnouncements(): void {
    this.announcementService.getEmployeeAnnouncements().subscribe(
      (data: any[]) => {
        console.log(data);
        this.EmployeeAnnouncements = data.map(item => ({
          title: item.labelName,
          body: item.messageBody,
          announcementDate: new Date(item.announcementDate),
          createdby: item.createdby
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
