import { Component } from '@angular/core';
import { SignInRequest } from '../DBOS/sign-in-request';
import { SignupService } from '../signup.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  model: SignInRequest;

  constructor(private signinservice: SignupService, private jwtHelper: JwtHelperService, private router: Router) {
    this.model = {
      username: '',
      password: ''
    }
  }

  onFormSubmit() {
    this.signinservice.signin(this.model).subscribe((response: any) => {
      const token = response.token;

      console.log(token);

      localStorage.setItem('jwtToken', token);

      const decodedToken = this.jwtHelper.decodeToken(token);

      console.log(decodedToken);

      const theusername = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      const therole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      console.log(theusername);
      console.log(therole);

      if (therole === 'HR') {
        this.router.navigate(['/HR-component']);
      } else if (therole === 'Admin') {
        this.router.navigate(['/admin-component']);
      } else if (therole === 'User') {
        this.router.navigate(['/user-component']);
      } else {
        this.router.navigate(['']);
      }


    });
  }
}
