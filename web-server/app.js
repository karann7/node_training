"use strict";
//// ========Dependencies========
const express = require('express'),
			app     = express(),
			hbs     = require('hbs'),
			port 		= process.env.PORT || 3000,
			fs      = require('fs');

//Setting the view engine to hbs and registering partials for all the pages
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//custom middleware that logs the incoming requests to a file for review
app.use((req, res, next)=>{
  let now = new Date().toString();
  let log = `${now} ${req.url} ${req.method}`;
  fs.appendFile('server.log', log + "\n", (err)=>{
  	if(err){
  		console.log(err);
  	}
  });
  next();
});
// Activate ONLY for Maintenance!!!
// app.use((req, res, next)=>{
// 	res.render('maintenance');
// });
app.use(express.static(__dirname + '/public/'));

//hbs helpers are functions that can be dynamically intergrated into the page
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});
// Index
app.get('/', (req, res) => {
	res.render('index', {
		pageTitle: 'Home Page',
	  welcomeMessage: "Hello and welcome to this horrible looking website. Thank you."
	});
});

// About 
app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'About Page'
	});
});

// reason for using a port variable is so that I can run this project on services that will dynamically set the port.
app.listen(port, ()=>{
	console.log(`Server is running on port: ${port}`);
});