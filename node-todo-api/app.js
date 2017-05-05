const mongoose 		= require('./db/mongoose'),
			User     		= require('./db/models/user'),
			Todo     		= require('./db/models/todo'),
			express  		= require('express'),
			bodyParser  = require('body-parser'),
			app         = express(),
			port				= process.env.PORT || 3000;


app.use(bodyParser.json());
app.get('/', (req, res)=>{
	res.send('Hello world!');
});
////***ROUTES***////
	//Todo-POST-route
app.post('/todos', (req, res)=>{
	var todo = new Todo({
		text: req.body.text
	});
	//save to the DB
	todo.save().then((doc)=>{
		res.status(200).send(doc);
	}, (e) =>{
		res.status(400).send(e);
 });
});

	//Todo-GET-route
app.get('/todos', (req, res)=>{
	Todo.find().then((todos)=>{
		res.send({todos});
	}, (e)=>{
		res.status(400);
	});
});

	//User-POST-route
app.post('/users', (req, res)=>{
	var user = new User({
		email: req.body.email
	});
	//save to the DB
	user.save().then((doc)=>{
		res.status(200).send(doc);
	}, (e) =>{
		res.status(400).send(e);
 });
});

app.listen(port, ()=>{
	console.log(`server is running on ${port}`);
});

module.exports = app;