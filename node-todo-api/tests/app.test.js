const expect 		= require('expect'),
			request   = require('supertest'),
			app   		= require('../app'),
			Todo  		= require('../db/models/todo'),
			User 			= require('../db/models/user');

		const todos = [{
			text: "first todo"
		}, {
			text: "second todo"
		}];
//Seeds the DB with exactly 2 todos before each test
 beforeEach((done)=>{
 	Todo.remove({}).then(()=> {
 		return Todo.insertMany(todos);
 	}).then(()=> done());
 });

describe('POST /todos', ()=>{
	it('should create a new todo', (done)=>{
		var text = "my name is karan";

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res)=>{
			expect(res.body.text).toBe(text);
		})
		.end((err, res) =>{
			if(err){
				return done(err);
			}
			Todo.find({text}).then((todos)=>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e)=> done(e));
			});
	});
	it('should not create a todo with invalid data',(done)=>{

		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) =>{
			if(err){
				return done(err);
			}
			Todo.find().then((todos)=>{
				expect(todos.length).toBe(2);
				done();
			}).catch((e)=> done(e));
			});
	});
});

describe('GET /todos', ()=>{
	it('should get all the todos', (done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});