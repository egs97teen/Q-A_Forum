var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');

module.exports = {
	add: (req, res) => {
		if (req.session.user_id) {
			User.findOne({_id: req.session.user_id }, (err, user) => {
				if (err) {
					console.log("ERROR FINDING USER");
					var errors = [];
					for (var i in err) {
						errors.push(err[i].message);
					}
					return res.status(400).send(errors);
				} else {
					var question = new Question(req.body);
					question._user = user._id;

					question.save( (err, saved_question) => {
						if (err) {
							console.log("QUESTION NOT SAVED");
							var errors = [];
							for (var i in err) {
								errors.push(err[i].message);
							}
							return res.status(400).send(errors);
						} else {
							console.log("SUCCESSFULLY SAVED QUESTION", question);
							user.questions.push(question);

							user.save( (err) => {
								if (err) {
									console.log("ERROR SAVING USER WITH QUESTION", err);
									var errors = [];
									for (var i in err) {
										errors.push(err[i].message);
									}
									return res.status(400).send(errors);
								} else {
									console.log("SUCCESSFULLY ADDED QUESTION TO USER", user);
									return res.json(true);
								}
							})
						}
					})
				}
			})
		} else {
			console.log("NO SESSION");
			let errors = ["No session"];
			return res.status(400).send(errors);
		}
	},

	getAll: (req, res) => {
		Question.find({}, (err, questions) => {
			if (err) {
				console.log("ERROR GETTING ALL QUESTIONS");
				var errors = [];
				for (var i in err) {
					errors.push(err[i].message);
				}
				return res.status(400).send(errors);
			} else {
				return res.json(questions);
			}
		})
	},

	getOne: (req, res) => {
		Question.findOne({_id: req.params.question_id}).populate('answers').exec( (err, question) => {
			if (err) {
				return res.status(400).send(err);
			} else {
				console.log("GOT ONE QUESTION");
				return res.json(question);
			}
		})
	},

	addAnswer: (req, res) => {
		if (req.session.user_id) {
			User.findOne({_id: req.session.user_id}, (err, user) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					Question.findOne({_id: req.params.question_id}, (err, question) => {
						if (err) {
							return res.status(400).send(err);
						} else {
							var answer = new Answer(req.body);
							answer._user = user._id;
							answer._question = question._id;

							answer.save( (err, saved_answer) => {
								if (err) {
									console.log("CANT SAVE THE ANSWER");
									return res.status(400).send(err);
								} else {
									console.log("SUCCESSFULLY SAVED ANSWER", answer);
									question.answer_count += 1;
									question.answers.push(answer);
									question.save( (err) => {
										if (err) {
											return res.status(400).send(err);
										} else {
											console.log("SUCCESSFULLY ADDED ANSWER TO QUESTION", question);
										}
									})
									user.answers.push(answer);
									user.save( (err) => {
										if (err) {
											return res.status(400).send(err);
										} else {
											console.log("SUCCESSFULLY ADDED ANSWER TO USER", user);
											return res.json(true);
										}
									})
								}
							})
						}
					}) 
				}
			})
		} else {
			let errors = ["No session"];
			return res.status(400).send(errors);
		}
	},

	likeAnswer: (req, res) => {
		Answer.findOne({_id: req.params.answer_id}, (err, answer) => {
			if (err) {
				return res.status(400).send(err)
			} else {
				answer.like_count += 1;
				console.log("I LIKE THE ANSWER")
				answer.save( (err) => {
					if (err) {
						return res.status(400).send(err);
					} else {
						return res.json(true);
					}
				})
			}
		})
	}
}