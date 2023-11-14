import { Component } from '@angular/core';
import { SignUpRequest } from '../DBOS/sign-up-request';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  model: SignUpRequest



  constructor(private signupservice: SignupService) {
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
        console.log("signed-up")



      }, error: () => {
        console.log("failed-sign-up")



      }

    })
  }


}
