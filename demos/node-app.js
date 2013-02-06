var ValidationModule = require('./../src/validator.js');

var validation = new ValidationModule.Validator({
	name: 'John',
	age: 45,
	email: 'johndoe.gmail.com'
}, {
	name: 'required',
	age: 'numeric',
	email: 'required|email'
});

console.log('Validation result: ', validation.passes()); // should fail because email format is invalid
console.log(validation.first('email'));