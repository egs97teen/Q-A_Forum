var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');

module.exports = (app) => {
	app.post('/api/register', users.register);
	app.post('/api/login', users.login);
	app.get('/api/session', users.check_session);
	app.get('/api/logout', users.logout);
	app.get('/api/get_user', users.find);
	app.post('/api/add_question', questions.add);
	app.get('/api/get_all_questions', questions.getAll);
	app.get('/api/get_question/:question_id', questions.getOne);
	app.post('/api/answer_question/:question_id', questions.addAnswer);
	app.get('/api/like_answer/:answer_id', questions.likeAnswer);
}