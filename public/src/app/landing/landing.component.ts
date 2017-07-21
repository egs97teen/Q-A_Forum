import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user = new User();
  user_login = new User();
  errors = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  register() {
    this._userService.register(this.user).then( data => this._router.navigate(['dashboard']) ).catch( err => this.errors = JSON.parse(err._body))
    this.user = new User();
  }

  login() {
    this._userService.login(this.user_login).then ( data => this._router.navigate(['dashboard']) ).catch( err => this.errors = JSON.parse(err._body))
    this.user_login = new User();
  }
}
