const mongoose  = require('mongoose'),
			validator = require('validator');

//User Model
// we are using npm validator to make sure email is valid
//the tokens property refers to login from different devices 
var User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		unique: true,
		validate: {
			isAsync: true,
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email"
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

// how to make a new User
// var user = new User({
// 	email: "booooom."
// });

// how to save a user to the DB
// user.save().then((doc)=>{
// 	console.log('Saved todo', doc);
// }, (e) =>{
// 	console.log('Unable to save todo');
// });
module.exports  = User;