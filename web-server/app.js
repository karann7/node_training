"use strict";

//// ========Dependencies========
const express = require('express'),
			app     = express();
// Index
app.get('/', (req, res) => {
	res.send('Hello World!');
});
// About 
app.get('/about', (req, res) => {
	res.send('About page');
});
//Error
app.get('/error', (req, res) =>{
	res.send({
		"cars": [ 
			"Audi",
			"B.M.W",
			"Tesla",
			"Jeep"
		],
		"errorMessage": "Status: OK"
	});
});





app.listen(3000, ()=>{
	console.log('Server is Running!');
});