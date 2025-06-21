import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SplashComponent } from './home/splash/splash.component';
import { ProfileComponent } from './account/profile/profile.component';
import { UpdateProfileComponent } from './account/update-profile/update-profile.component';
import { FieldAdminComponent } from './attendance-register/field-admin/field-admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // default route loads SplashComponent
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'field-admin', component: FieldAdminComponent }
  // other routes...
];

const routerOptions: ExtraOptions = {
  // useHash: false,
  scrollPositionRestoration: 'disabled',  // disable automatic scroll to top
  // or use 'top' to scroll to top on navigation
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes,routerOptions) // <-- Here you set useHash option
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
