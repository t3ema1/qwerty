import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from './DBOS/announcement';
import { Meeting } from './DBOS/meeting';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private baseUrl = 'https://localhost:7044/api/Authentication';

  constructor(private http: HttpClient) { }

  getAnnouncementById(announcementId: number): Observable<Announcement> {
    console.log(announcementId);
    const url = `${this.baseUrl}/getannouncementbyid/${announcementId}`;
    console.log(announcementId);
    return this.http.get<Announcement>(url);
  }


  getAdminAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/adminAnnouncements`);
  }

  getHrAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hrAnnouncements`);
  }

  getEmployeeAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employeeAnnouncements`);
  }

  getAnnouncementHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/announcementhistory`);
  }

  getAllMeetings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getallmeetings`);
  }

  getAllAttendees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getallattendees`);
  }

  getAttendeeDatesByUsername(username: string): Observable<any[]> {
    const url = `${this.baseUrl}/attendeeDatesByUsername/${username}`;
    return this.http.get<any[]>(url);
  }

  addAnnouncement(announcement: Announcement, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addannouncement`, announcement, { headers });
  }

  deleteAnnouncement(announcementId: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/deleteannouncement/${announcementId}`;
    return this.http.delete<any>(deleteUrl);
  }


  updateAnnouncement(announcementId: number, updatedAnnouncement: Announcement, headers: HttpHeaders): Observable<any> {
    const updateUrl = `${this.baseUrl}/updateannouncement/${announcementId}`;
    return this.http.put<any>(updateUrl, updatedAnnouncement, { headers });
  }

  addMeeting(meeting: Meeting): Observable<any> {
    console.log(meeting.attendeeUsernames)
    const url = `${this.baseUrl}/addmeeting`;

    return this.http.post<any>(url, meeting);
  }

}
