import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getCurrentLocation(): Observable<GeoCoordinates> {
    return new Observable(observer => {
      if (!isPlatformBrowser(this.platformId)) {
        observer.error('Geolocation can only be accessed in the browser.');
        return;
      }

      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          observer.complete();
        },
        (error) => {
          let errorMsg = '';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMsg = 'The request to get user location timed out.';
              break;
            default:
              errorMsg = 'An unknown error occurred.';
          }
          observer.error(errorMsg);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }
}
