const expect 		= require('expect'),
			request   = require('supertest'),
			app   		= require('../app'),
			Todo  		= require('../db/models/todo'),
			User 			= require('../db/models/user'),
		 {ObjectID} = require('mongodb');

		const todos = [{
			_id: new ObjectID(),
			text: "first todo"
		}, {
			_id: new ObjectID(),
			text: "second todo",
			completed: true,
			completedAt: 333
		}];
//Seeds the DB with exactly 2 todos before each test
 beforeEach((done)=>{
 	Todo.remove({}).then(()=> {
 		return Todo.insertMany(todos);
 	}).then(()=> done());
 });

//Tests the post routes, 1 test sends info, the other does not.
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

//Tests the GET route 
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

//Tests the GET by ID route

describe("GET /todos/:id", ()=>{
	it('gets the corresponding todo relative to the ID', (done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('return 404 if todo not found', (done)=>{
		var hexId = new ObjectID().toHexString;
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if id is not proper format', (done)=>{
		request(app)
		.get(`/todos/123`)
		.expect(404)
		.end(done);
	});
}); 

//Tests for the DELETE route

describe("DELETE /todos:id", ()=>{
	var hexId = todos[1]._id.toHexString();
	it('should remove a todo', (done)=>{
		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err, res) => {
			if(err){
				return done(err);
			}
			Todo.findById(hexId).then((todo)=>{
				expect(todo).toNotExist();
				done();
			}).catch((e) => done(e));
		});
	});
	
	it('should return 404 if todo not found', (done)=>{
		var hexId = new ObjectID().toHexString;
		request(app)
		.delete(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if id is invalid', (done)=>{
		request(app)
		.delete('/todos/1234')
		.expect(404)
		.end(done);
	});
});

//Tests for the Patch route

describe('PATCH /todos/id', (done)=>{
it('should clear completedAt when todo is not completed', (done)=>{
	var hexId = todos[0]._id.toHexString();
	var text = "This should be the new text";
	//grab id of first item
	//update text, set completed true
	//200, res.body has text body sent changed and completed is true
	//completedSt is a number
	request(app)
	.patch(`/todos/${hexId}`)
	.send({
		completed: true,
		text: text
	})
	.expect(200)
	.expect((res)=>{
		expect(res.body.todo.text).toBe(text);
		expect(res.body.todo.completed).toBe(true);
		expect(res.body.todo.completedAt).toBeA('number');
	})
	.end(done);
});
it('should clear completedAt when todo is not completed', (done) =>{
//grab id of second todo item
//update text, set completed to false
//200
//text is changed, completed false, completedAt is null .toNotExist
var hexId = todos[1]._id.toHexString();
	var text = "This should be the new text";
	request(app)
	.patch(`/todos/${hexId}`)
	.send({
		completed: false,
		text: text
	})
	.expect(200)
	.expect((res)=>{
		expect(res.body.todo.text).toBe(text);
		expect(res.body.todo.completed).toBe(false);
		expect(res.body.todo.completedAt).toNotExist();
	})
	.end(done);


});
});