import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjaxService } from '../../services/ajax.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoginResponse } from '../../models/login-response.model';
import { Subscription } from 'rxjs';
import { EmitterService } from '../../services/emitter.service';
import { LoaderService } from '../../services/loader.service';
import { setToken,setUserId } from '../../utils/utility';
import { isPlatformBrowser } from '@angular/common';
import { GeoCoordinates, GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMsg = '';
  isLoading = false;

  isLoggedIn = false;
  logoutSubs!: Subscription;

  deferredPrompt: any;
  showInstallButton = false;

  //for GPS coordinates
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;
  private intervalId: any;

  constructor(
    private fb: FormBuilder, 
    private ajaxService: AjaxService,
    private router: Router,
    private emitterService: EmitterService,
    private loaderService: LoaderService,
    private gpsService: GeolocationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) 
  
  {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loaderService.hide();
      }
    });
    
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallButton = true;  // Show the custom install button
    });
    this.getLocation();
  }

  getLocation(): void {

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

  addLoginHistory(userId:number){

    const date = new Date();
    
    this.ajaxService.loginHistory({
        UserId: userId,
        ProjId: 1,
        LoginDate: date.toLocaleDateString(),
        LoginTime: date.toLocaleTimeString(),
        Longitude: this.longitude,
        Latitude: this.latitude
    }).subscribe({
      error: (err) => {
        console.error('error:', err);
        this.errorMsg = err.error?.error || 'failed!';
        this.isLoading = false; // hide loader
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMsg = '';
    this.isLoading = true; // show loader

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.ajaxService.login(username, password).subscribe({
      next: (res: LoginResponse) => {
        if (res.status === 'success') {
          setToken(res.token);
          if (res.userId) {
            setUserId(res.userId);
          }

          this.addLoginHistory(Number(res.userId));
          this.router.navigate(['/profile']);
          this.emitterService.emitLoginComplete('LoginCompleted');
          this.isLoading = false; // hide loader
        } 
        else {
          this.errorMsg = 'Invalid login credentials';
          this.isLoading = false; // hide loader
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMsg = err.error?.error || 'Login failed!';
        this.isLoading = false; // hide loader
      }
    });
  }

   installApp() {
    this.showInstallButton = false;
    if (this.deferredPrompt) {
      console.log('Prompting install...');
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log('User choice:', choiceResult.outcome);
        this.deferredPrompt = null;
      });
    } else {
      console.log('No deferredPrompt available');
    }
  }
}
