// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('email validation rule', function() {
	it('should pass with the email address: johndoe@gmail.com', function() {
		var validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it ('should fail with the email address: johndoe.gmail.com', function() {
		var validator = new Validator({
			name: 'David',
			email: 'johndoe.gmail.com'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with the email address: johndoe@gmail', function() {
		var validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when the email field is blank / optional', function() {
		var validator = new Validator({ email: '' }, { email: 'email' });

		expect(validator.passes()).toBeTruthy();
	});
});