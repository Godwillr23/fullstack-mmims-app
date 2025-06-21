import { Component } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmitterService } from '../../services/emitter.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user-model';
import { getUserId } from '../../utils/utility';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  loginSubs!: Subscription;  // declare subscription
  isLoading = false;
  user?: UserModel;
  error = '';
  loader = false;
  userItem: any;
  userImageUrl: any;

    UserId: any;

  private intervalId: any;
  User: any;

  loading = false;
  isLoggedIn = false;
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private emitterService: EmitterService,
    private authService: AuthService
  )  
  {

    this.loginSubs = this.emitterService.loginComplete$.subscribe(loginStatus => {
      if (loginStatus === "LoginCompleted") {
        this.UserId = getUserId();
        this.isLoggedIn = true;
      }
    });
  }

  
  ngOnInit() {

    if(this.isLoggedIn){
      this.userImageUrl = environment.s3Url+"/Users/";
      this.getUserProfile();
    }
  }

  getUserProfile(){
    this.loader = true;
    const userId = Number(getUserId());
    this.ajaxService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loader = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Error loading user';
        this.loader = false;
      }
    });
  }


  redirect(page: string){
    this.router.navigate(['/'+page]);
  }

  logout() {
    this.authService.logout(); // clear tokens etc.
    this.router.navigate(['/login']); // redirect to login
    this.emitterService.emitLogoutComplete('LogoutCompleted');
  }
}
