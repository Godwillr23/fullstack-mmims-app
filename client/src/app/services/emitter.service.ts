import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  // Subject that emits login status string messages
  private loginCompleteSource = new Subject<string>();

  // Subject that emits logout status string messages
  private logoutCompleteSource = new Subject<string>();

  // Observable that components can subscribe to
  loginComplete$ = this.loginCompleteSource.asObservable();

  // Observable that components can subscribe to
  logoutComplete$ = this.logoutCompleteSource.asObservable();

  constructor() { }

  // Method to emit login status
  emitLoginComplete(status: string) {
    this.loginCompleteSource.next(status);
  }

  // Method to emit logout status
  emitLogoutComplete(status: string) {
    this.logoutCompleteSource.next(status);
  }

}