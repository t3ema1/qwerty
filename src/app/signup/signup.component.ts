import { Component } from '@angular/core';
import { SignUpRequest } from '../DBOS/sign-up-request';
import { SignupService } from '../signup.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { SignInRequest } from '../DBOS/sign-in-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  model: SignUpRequest



  constructor(private signupservice: SignupService, private jwtHelper: JwtHelperService, private router: Router) {
    this.model = {

      username: '',

      email: '',
      password: '',
      role: ''

    }

  }



  onFormSubmit() {
    this.signupservice.signup(this.model).subscribe({


      next: () => {
        const signInRequest: SignInRequest = {
          username: this.model.username,
          password: this.model.password
        };

        this.signupservice.signin(signInRequest).subscribe((response: any) => {
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


        }

        )

      }, error: () => {
        console.log("failed-sign-up")



      }

    })
  }


}
