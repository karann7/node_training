//// ========Dependencies========
const express = require('express'),
			app     = express(),
			hbs     = require('hbs'),
			port 		= process.env.port || 3000;
hbs.registerPartials(__dirname + '/views/partials');
//Serving a static asset directory and setting the view engine of the app to hbs
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'hbs');

// Index
app.get('/', (req, res) => {
	res.render('index', {
		pageTitle: 'Home Page',
	  currentYear: new Date().getFullYear(),
	  welcomeMessage: "Hello and welcome to this horrible looking website. Thank you."
	});
});

// About 
app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'About Page',
	  currentYear: new Date().getFullYear()
	});
});

// reason for using a port variable is so that I can run this project on other services
// such as cloud9 without having to change it everytime.
app.listen(port, ()=>{
	console.log(`Server is running on port: ${port}`);
});