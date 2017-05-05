var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// Todo Model
var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

// var newTodo = new Todo({
// 	text: 'blah blah blahhhh'

// });
//User Model

var User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 8
	}
});

var user = new User({
	email: "quirky.devikngy@gmail.com"
});


user.save().then((doc)=>{
	console.log('Saved todo', doc);
}, (e) =>{
	console.log('Unable to save todo');
});