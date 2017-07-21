import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { User } from './../user';
import { UserService } from './../user.service';
import { QaService } from './../qa.service';
import { Question } from './../question';
import { Answer } from './../answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  id;
  private sub: any;
  question: Question;
  errors = [];
  answer = new Answer();


  constructor(private _userService: UserService, private _qaService: QaService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  	this.sub = this._route.params.subscribe(param => 
  		this.id = param
  	);

  	this.getQuestion(this.id);
  }

  getQuestion(question_id) {
  	this._qaService.getQuestion(this.id).then( data => {this.question = data}).catch( err => this.errors = JSON.parse(err._body))
  }

  logout() {
  	this._userService.logout().then(data => this._router.navigate(['landing'])).catch()
  }

  cancel() {
  	this._router.navigate(['dashboard']);
  }

  addAnswer() {
  	this._qaService.submit_answer(this.answer, this.question).then( data =>this._router.navigate(['dashboard']) ).catch();
  }

}
