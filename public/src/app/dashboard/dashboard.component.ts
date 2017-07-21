import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from './../user';
import { UserService } from './../user.service';
import { QaService } from './../qa.service';
import { Question } from './../question';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  questions: Array<Question>
  errors = [];
  
  constructor(private _userService: UserService, private _qaService: QaService, private _router: Router) { }

  ngOnInit() {
  	this._userService.check_session().then( data => this.user = data ).catch( err => this._router.navigate(['landing']));
  	this._qaService.getAllQuestions().then( data => this.questions = data ).catch(  err => this.errors = JSON.parse(err._body) )
  }

  logout() {
  	this._userService.logout().then(data => this._router.navigate(['landing'])).catch()
  }
}
