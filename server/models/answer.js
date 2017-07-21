// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var AnswerSchema = new mongoose.Schema({
	content: {
		type: String,
		minlength: [5, "Answer must be at least 5 characters long"],
		required: [true, "Answer is required"]
	}, 
	details: {
		type: String
	},
	like_count: {
		type: Number
	},
	_user: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	_question: {
		type: Schema.Types.ObjectId, ref: 'Question'
	}
	},
	{ timestamps: true }
);

var Answer = mongoose.model('Answer', AnswerSchema);