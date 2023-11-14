import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  usersWithRoles: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from a secure storage location

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      // Make an HTTP request to get the list of users with roles
      this.http.get('https://localhost:7044/api/Authentication/users', { headers }).subscribe((data: any) => {
        this.usersWithRoles = data;
        console.log(this.usersWithRoles);

      });
    }

  }
}
