import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/Chat-war/api/chat/';
  private currentUser: User = new User();

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

  logout(user: User) {
    return this.http.delete(this.baseUrl + 'users/loggedIn/'+user.username).subscribe();
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser() {
    let s = localStorage.getItem('user');
    let ss: string = '';
    if (s !== null) {
      ss = s;
    }
    return JSON.parse(ss);
  }

}
