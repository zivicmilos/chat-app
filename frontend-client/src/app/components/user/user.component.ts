import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User = new User;
  users: User[] = [];
  loggedinUsers: User[] = [];
  connection: WebSocket = new WebSocket("ws://localhost:8080/Chat-war/ws/chat");

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.connection = new WebSocket("ws://localhost:8080/Chat-war/ws/"+this.currentUser.username);
    console.log("ws://localhost:8080/Chat-war/ws/"+this.currentUser.username);
    this.initSocket();
  }

  initSocket() {
    //let connection = new WebSocket("ws://localhost:8080/Chat-war/ws/chat");
    this.connection.onopen = function () {
      console.log("Socket is open");
    }

    this.connection.onclose = function () {
      //connection = null;
    }

    this.connection.onmessage = (msg) => {
      const data = msg.data.split("!");
      if (data[0] === "REGISTERED") {
        this.users = [];
        data[1].split("|").forEach((user: string) => {
          if (user) {
            let userData = user.split(",");
            this.users.push(new User(userData[0], userData[1]));
          }
        });
      }
      else if (data[0] === "LOGGEDIN") {
        this.loggedinUsers = [];
        data[1].split("|").forEach((user: string) => {
          if (user) {
            let userData = user.split(",");
            this.loggedinUsers.push(new User(userData[0], userData[1]));
          }
        });
      }
      else {
        this.toastr.success(data[1]);
      }
    }

  }

  getRegisteredUsers() {
    this.userService.getRegisteredUsers();
  }

  getLoggedinUsers() {
    this.userService.getLoggedinUsers();
  }

  logout() {
    this.userService.logout(this.currentUser);
    this.router.navigate(['/home']);
  }

}
