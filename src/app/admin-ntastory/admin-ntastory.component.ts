import { Component, OnInit } from '@angular/core';
import { NTAStoryService } from '../ntastory.service';
import { Ntastory } from '../DBOS/ntastory';
declare var $: any;

@Component({
  selector: 'app-admin-ntastory',
  templateUrl: './admin-ntastory.component.html',
  styleUrls: ['./admin-ntastory.component.css']
})
export class AdminNtastoryComponent implements OnInit {
  ntastoryHistoryData: any[] = [];
  sidebarVisible: boolean = false;
  hoveredNtaStory: string = '';

  constructor(private ntastoryHistoryService: NTAStoryService) { }

  ngOnInit(): void {
    this.fetchNTAStoryHistory();
  }

  fetchNTAStoryHistory(): void {
    this.ntastoryHistoryService.getNTAStoryHistory().subscribe(
      (data: any[]) => {
        this.ntastoryHistoryData = data;
        console.log(this.ntastoryHistoryData);
      },
      (error) => {
        console.error('Error fetching NTA story history:', error);
      }
    );
  }

  onDeleteNTAStory(ntaStoryId: number): void {
    this.ntastoryHistoryService.deleteNTAStory(ntaStoryId)
      .subscribe(
        () => {
          console.log('NTA story deleted successfully.');
        },
        (error) => {
          console.error('Error deleting NTA story:', error);
        }
      );
  }


  onHoverNtastory(ntaStoryId: number): void {
    this.ntastoryHistoryService.getNTAStoryById(ntaStoryId).subscribe(
      (story: Ntastory) => {
        this.hoveredNtaStory = story['body'];
        console.log(this.hoveredNtaStory, story);
      },
      (error) => {
        console.error('Error fetching NTA story body:', error);
      }
    );
  }

  hideMessage(): void {
    this.hoveredNtaStory = '';
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
