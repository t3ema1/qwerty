import { Component, OnInit } from '@angular/core';
import { NTAStoryService } from '../ntastory.service'; // Replace with the correct path

@Component({
  selector: 'app-admin-ntastory',
  templateUrl: './admin-ntastory.component.html',
  styleUrls: ['./admin-ntastory.component.css']
})
export class AdminNtastoryComponent implements OnInit {
  ntastoryHistoryData: any[] = []; // Define a variable to store the data

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
}
