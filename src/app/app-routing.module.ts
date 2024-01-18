import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { HumanResComponent } from './human-res/human-res.component';
import { UserComponent } from './user/user.component';
import { EmployeeAnnouncementComponent } from './employee-announcement/employee-announcement.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { adminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { humanResGuard } from './human-res.guard';
import { AdminAnnouncementComponent } from './admin-announcement/admin-announcement.component';
import { EmployeeNtastoryComponent } from './employee-ntastory/employee-ntastory.component';
import { AdminNtastoryComponent } from './admin-ntastory/admin-ntastory.component';
import { HrAnnouncementComponent } from './hr-announcement/hr-announcement.component';
import { HrNtastoryComponent } from './hr-ntastory/hr-ntastory.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AddNtastoryComponent } from './add-ntastory/add-ntastory.component';
import { UpdateNtastoryComponent } from './update-ntastory/update-ntastory.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';

const routes: Routes = [{ path: '', component: SignupComponent },
{ path: 'add-announcement', component: AddAnnouncementComponent, canActivate: [adminGuard] },
{ path: 'add-ntastory', component: AddNtastoryComponent, canActivate: [adminGuard] },
{ path: 'add-meeting', component: AddMeetingComponent },
{ path: 'update-meeting/:id', component: UpdateMeetingComponent },
{ path: 'update-ntastory/:id', component: UpdateNtastoryComponent, canActivate: [adminGuard] },
{ path: 'update-announcement/:id', component: UpdateAnnouncementComponent, canActivate: [adminGuard] },
{ path: 'admin-announcement', component: AdminAnnouncementComponent, canActivate: [adminGuard] },
{ path: 'admin-ntastory', component: AdminNtastoryComponent, canActivate: [adminGuard] },
{ path: 'hr-announcement', component: HrAnnouncementComponent, canActivate: [humanResGuard] },
{ path: 'hr-ntastory', component: HrNtastoryComponent, canActivate: [humanResGuard] },
{ path: 'employee-announcement', component: EmployeeAnnouncementComponent, canActivate: [userGuard] },
{ path: 'employee-ntastory', component: EmployeeNtastoryComponent, canActivate: [userGuard] },
{ path: 'signin-component', component: SigninComponent },
{ path: 'meeting-calendar', component: CalendarComponent },
{ path: 'admin-component', component: AdminComponent, canActivate: [adminGuard] },
{ path: 'HR-component', component: HumanResComponent, canActivate: [humanResGuard] },
{ path: 'user-component', component: UserComponent, canActivate: [userGuard] },
{ path: 'forbidden-component', component: ForbiddenComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
