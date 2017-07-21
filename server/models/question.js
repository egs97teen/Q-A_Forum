// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var QuestionSchema = new mongoose.Schema({
	content: {
		type: String,
		minlength: [10, "Question must be at least 10 characters long"],
		required: [true, "Question is required"]
	},
	description: {
		type: String,
	},
	answer_count: {
		type: Number,
	},
	_user: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	answers: [{
		type: Schema.Types.ObjectId, ref: 'Answer'
	}]
	},
	{ timestamps: true }
);

var Question = mongoose.model('Question', QuestionSchema);