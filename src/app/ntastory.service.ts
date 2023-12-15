import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ntastory } from './DBOS/ntastory';

@Injectable({
  providedIn: 'root'
})
export class NTAStoryService {

  private baseUrl = 'https://localhost:7044/api/Authentication';

  constructor(private http: HttpClient) { }

  getNTAStoryById(ntaStoryId: number): Observable<Ntastory> {
    const url = `${this.baseUrl}/getntastorybyid/${ntaStoryId}`;

    return this.http.get<Ntastory>(url);
  }

  getAdminNTAStories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getadminntastories`);
  }

  getHrNTAStories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/gethrntastories`);
  }

  getUserNTAStories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getuserntastories`);
  }

  getNTAStoryHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getntastorieshistory`);
  }
  addNtastory(ntastory: Ntastory, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addntastory`, ntastory, { headers });
  }

  updateNTAStory(ntaStoryId: number, updatedNTAStory: Ntastory, headers: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/updatentastory/${ntaStoryId}`;

    return this.http.put<any>(url, updatedNTAStory, { headers });
  }
  deleteNTAStory(ntaStoryId: number): Observable<any> {
    console.log(ntaStoryId);
    const deleteUrl = `${this.baseUrl}/deletentastory/${ntaStoryId}`;
    return this.http.delete<any>(deleteUrl);
  }

}
