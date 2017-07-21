import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../user';
import { UserService } from './../user.service';
import { Question } from './../question';
import { QaService } from './../qa.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  question = new Question;
  errors = [];

  constructor(private _userService: UserService, private _qaService: QaService, private _router: Router) { }

  ngOnInit() {

  }

  addQuestion() {
  	this._qaService.addQuestion(this.question).then(data => this._router.navigate(['dashboard'])).catch( err => this.errors = JSON.parse(err._body))
  }

  cancel() {
  	this._router.navigate(['dashboard']);
  }
}
