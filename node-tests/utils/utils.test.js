const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
	var res = utils.add(33,11);

	expect(res).toBe(44).toBeA('number');
	// if(res !== 44){
	// 	throw new Error(`Expected 44, but got ${res}`);
	// }
});

it('should square the number', ()=>{
	var sqrt = utils.square(6);

	expect(sqrt).toBe(36).toBeA('number');
	
});

it('expect a value', () => {
	// expect(12).toNotBe(11);
	//can not use toBe for array or Object comparsions have to use toEqual
	// expect({name: "Karan"}).toEqual({name: "Karan"});
	expect([2,3,4]).toExclude(5);
});