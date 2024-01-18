import { Component, OnInit } from '@angular/core';
import { NTAStoryService } from '../ntastory.service';
declare var $: any;

@Component({
  selector: 'app-hr-ntastory',
  templateUrl: './hr-ntastory.component.html',
  styleUrls: ['./hr-ntastory.component.css']
})
export class HrNtastoryComponent implements OnInit {
  hrNtaStories: {
    title: string, body: string, announcementDate: Date, createdby: string
  }[] = [];
  sidebarVisible: boolean = false;


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
          announcementDate: new Date(item.announcementDate),
          createdby: item.createdby

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
