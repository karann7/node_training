// Manually setting up JWT's using crypot-js
// const {SHA256} = require('crypto-js');
// var message = "My Name is karan";

// var hash = SHA256(message).toString();

// console.log(`Message is ${message}`);
// console.log(`Hash is ${hash}`);

//sending from the server
// var data = {
// 	id: 4
// };

// var token = {
// 	data, 
// 	hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };

// //recieving from the client
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash){
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed do not trust');
// }

const jwt = require('jsonwebtoken');
var data = {
	id: 4,
	username: "Karan",
	password: "singh"
};

var token = jwt.sign(data.password, '123abc');

console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);