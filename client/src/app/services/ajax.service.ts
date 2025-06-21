import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user-model';
import { LoginResponse } from '../models/login-response.model';
import { FieldToUpdateModel } from '../models/fieldToUpdate';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  private apiUrl = environment.apiUrl;  // Adjust your backend URL

  constructor(private http: HttpClient) { 
    
  }

  // login API
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}user/login`, { Username: username, Password: password });
  }

  loginHistory(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}user/loginHistory`, userData);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}user/user/${id}`);
  }

  fieldToUpdate(fieldData: any): Observable<FieldToUpdateModel> {
    return this.http.post<FieldToUpdateModel>(`${this.apiUrl}user/profileToUpdate`, fieldData);
  }

  // getUserProfileById(id: number): Observable<UserModel> {
  //   return this.http.get<UserModel>(`${this.apiUrl}users/profile/${id}`);
  // }

  // updateUser(id: number, userData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}users/profile/${id}`, userData);
  // }

  // Add other auth methods here, e.g. register, logout, etc.
}
