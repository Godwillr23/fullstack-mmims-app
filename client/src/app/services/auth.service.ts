import { Injectable } from '@angular/core';
import { removeToken,removeUserId } from '../utils/utility';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  setAuthState(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }

  logout() {
    removeToken();
    removeUserId();
    this.isLoggedIn = false;
    // redirect to login if you want
  }
}
