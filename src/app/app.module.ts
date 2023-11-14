import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { HumanResComponent } from './human-res/human-res.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    AdminComponent,
    HumanResComponent,
    UserComponent,
    ForbiddenComponent
  ],
  imports: [JwtModule.forRoot({
    config: {
      tokenGetter: () => {
        return localStorage.getItem('jwtToken'); // Adjust this to your storage method
      },
    },
  }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
