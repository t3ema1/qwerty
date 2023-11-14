import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private jwtHelper: JwtHelperService) { }

  isHr(): boolean {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from a secure storage location

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("ishr()");

      console.log(decodedToken);
      const therole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      console.log(therole);

      // Check if the user's role claim is "HR"
      return decodedToken && therole === 'HR';
    }

    return false;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from a secure storage location

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("isAdmin()");
      const therole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(decodedToken);
      console.log(therole);


      // Check if the user's role claim is "HR"
      return decodedToken && therole === 'Admin';
    }

    return false;
  }

  isUser(): boolean {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from a secure storage location

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log("isUser()");

      console.log(decodedToken);
      console.log(decodedToken.role);


      // Check if the user's role claim is "HR"
      return decodedToken && decodedToken.role === 'User';
    }

    return false;
  }


}
