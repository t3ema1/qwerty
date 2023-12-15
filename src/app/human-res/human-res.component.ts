import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-human-res',
  templateUrl: './human-res.component.html',
  styleUrls: ['./human-res.component.css']
})
export class HumanResComponent {

  usersWithRoles: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http.get('https://localhost:7044/api/Authentication/users', { headers }).subscribe((data: any) => {
        this.usersWithRoles = data;
        console.log(this.usersWithRoles);

      });
    }

  }
}
