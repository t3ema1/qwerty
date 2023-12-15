import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule and FormsModule
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { HumanResComponent } from './human-res/human-res.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EmployeeAnnouncementComponent } from './employee-announcement/employee-announcement.component';
import { AdminAnnouncementComponent } from './admin-announcement/admin-announcement.component';
import { AdminNtastoryComponent } from './admin-ntastory/admin-ntastory.component';
import { EmployeeNtastoryComponent } from './employee-ntastory/employee-ntastory.component';
import { HrAnnouncementComponent } from './hr-announcement/hr-announcement.component';
import { HrNtastoryComponent } from './hr-ntastory/hr-ntastory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AddNtastoryComponent } from './add-ntastory/add-ntastory.component';
import { UpdateNtastoryComponent } from './update-ntastory/update-ntastory.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    AdminComponent,
    HumanResComponent,
    UserComponent,
    ForbiddenComponent,
    EmployeeAnnouncementComponent,
    AdminAnnouncementComponent,
    AdminNtastoryComponent,
    EmployeeNtastoryComponent,
    HrAnnouncementComponent,
    HrNtastoryComponent,
    CalendarComponent,
    AddAnnouncementComponent,
    AddNtastoryComponent,
    UpdateNtastoryComponent,
    UpdateAnnouncementComponent,
    AddMeetingComponent
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
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
