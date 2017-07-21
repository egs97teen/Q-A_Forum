import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class QaService {

  constructor(private _http: Http) { }

  addQuestion(question) {
  	return this._http.post('/api/add_question', question).map( data => data.json() ).toPromise();
  }

  getAllQuestions() {
  	return this._http.get('/api/get_all_questions').map( data => data.json() ).toPromise();
  }

  submit_answer(answer, question) {
  	return this._http.post('/api/answer_question/' + question._id, answer).map( data => data.json() ).toPromise();
  }

  getQuestion(question_id) {
  	return this._http.get('/api/get_question/' + question_id.id).map( data => data.json() ).toPromise();
  }

  like_answer(answer_id) {
  	console.log("IN THE SERVICE");
  	return this._http.get('api/like_answer/' + answer_id).map( data => data.json() ).toPromise();
  }
}
