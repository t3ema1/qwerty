import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {


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
