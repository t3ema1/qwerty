import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { HumanResComponent } from './human-res/human-res.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { adminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { humanResGuard } from './human-res.guard';

const routes: Routes = [{ path: '', component: SignupComponent }, // This is the initial route
{ path: 'signin-component', component: SigninComponent },
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
