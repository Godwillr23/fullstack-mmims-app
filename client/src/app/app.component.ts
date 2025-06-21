import { Component, Inject, PLATFORM_ID, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EmitterService } from './services/emitter.service';
import { interval, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { GeolocationService, GeoCoordinates } from './services/geolocation.service';
import { getToken,getUserId } from './utils/utility';
import { AjaxService } from './services/ajax.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  loginSubs!: Subscription;
  logoutSubs!: Subscription;

  //currentdate time
  currentDateTime: any;

  //for GPS coordinates
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;

  //getUserid

  UserId: any;

  private intervalId: any;
  User: any;

  userImageUrl = environment.s3Url+"/Users/";

  loading = false;
  isPageOnLogin = true;

  constructor(
    private emitterService: EmitterService,
    private authService: AuthService,
    private router: Router,
    private gpsService: GeolocationService,
    private ajaxService: AjaxService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginSubs = this.emitterService.loginComplete$.subscribe(loginStatus => {
      if (loginStatus === "LoginCompleted") {
        this.isPageOnLogin = true;
        this.UserId = getUserId();
        this.isLoggedIn = true;
        this.getUserProfile(Number(this.UserId));

      }
    });

    this.logoutSubs = this.emitterService.logoutComplete$.subscribe(logoutStatus => {
      if (logoutStatus === "LogoutCompleted") {
        this.isLoggedIn = false;
        this.isPageOnLogin = false;
      }
    });
  }

  ngOnInit(): void {

    const currentRoute = window.location.pathname;
    if(currentRoute.includes('login') || currentRoute === '/'){
        this.isPageOnLogin = false;
      }

    this.UserId = getUserId();

    if (currentRoute !== '/' && currentRoute !== '/login') {
      this.getUserProfile(Number(this.UserId));
    }

    //this.getUserProfile(Number(this.UserId));
    this.getLocation();
    if (isPlatformBrowser(this.platformId)) {
      const pathname = location.pathname;  // safe now
      const token = getToken();

      if (token) {
        this.authService.setAuthState(true);
      } else {
        this.authService.logout();
        this.router.navigate(['/login']); // redirect to login
      }
    }
  }

  getUserProfile(userId: number){
    this.loading = true;
    this.ajaxService.getUserById(userId).subscribe({
      next: (data) => {
        this.User = data;
        this.loading = false;
      }
    });
  }

  getLocation(): void {
    this.intervalId = setInterval(() => this.getCurrentDate(), 1000); // Update every second
    this.getCurrentDate();

    if (!isPlatformBrowser(this.platformId)) {
      this.errorMessage = 'Geolocation can only be accessed in the browser.';
      return;
    }

    this.gpsService.getCurrentLocation().subscribe({
      next: (coords: GeoCoordinates) => {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        this.errorMessage = null;
        console.log('Location:', coords);
      },
      error: (err: string) => {
        this.errorMessage = err;
        console.error('Location error:', err);
      }
    });
  }

  getCurrentDate(){
      interval(1000).subscribe(() => {
      const now = new Date();
      this.currentDateTime = now.toLocaleString();
    });
  }


  ngOnDestroy() {
    if (this.loginSubs) {
      this.loginSubs.unsubscribe();
    }
    clearInterval(this.intervalId); // Prevent memory leak
  }
}
