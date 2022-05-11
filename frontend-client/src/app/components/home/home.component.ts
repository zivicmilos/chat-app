import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = new User();
  users: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initSocket();
  }

  initSocket() {
    let connection = new WebSocket("ws://localhost:8080/Chat-war/ws/chat"); // 'chat' should be individual person's username
    connection.onopen = function () {
      console.log("Socket is open");
    }

    /*connection.onclose = function () {
      connection = null;
    }*/

    connection.onmessage = function (msg) {
      const data = msg.data.split("!");
      if (data[0] === "LOGGEDIN") {
        //users = [];
        data[1].split("|").forEach((user: string) => {
          if (user) {
            let userData = user.split(",");
            /*this.users.push({
              username: userData[0],
              password: userData[1]
            });*/
          }
        });
      }
      else if (data[0] === "REGISTER") {
        //toast(data[1]);
        alert('register');
      }
      else {
        //toast(data[1]);
        alert('login');
      }
    }

  }

  register() {
    this.userService.register(this.user);
  }

  login() {
    this.userService.login(this.user);
  }

  getUsers() {
    this.userService.getUsers();
  }

}
