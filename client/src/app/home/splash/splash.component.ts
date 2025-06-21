import { Component, Inject, PLATFORM_ID, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-splash',
  standalone: false,
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit, OnDestroy {
  isLoading = true;
  private routerSub!: Subscription;

  constructor(
    private router: Router,
    //@Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    //if (isPlatformBrowser(this.platformId)) {
      this.isLoading = true;

      // Optional: delay before redirect
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

      // Stop loader when navigation completes
      this.routerSub = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isLoading = false;
        }
      });
    //}
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
