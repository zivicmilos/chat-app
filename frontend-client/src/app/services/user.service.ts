import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/Chat-war/api/chat/';

  register(user: User) {
    return this.http.post<any>(this.baseUrl + 'users/register', user).subscribe();
  }

  login(user: User) {
    return this.http.post(this.baseUrl + 'users/login', user).subscribe();
  }

  getRegisteredUsers() {
    return this.http.get(this.baseUrl + 'users/registered').subscribe();
  }

  getLoggedinUsers() {
    return this.http.get(this.baseUrl + 'users/loggedIn').subscribe();
  }
}
