import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  loggedInUsername: string = '';
  sidebarVisible: boolean = false;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const decodedToken = this.jwtHelper.decodeToken(token);
      const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

      this.loggedInUsername = username;

    }








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
