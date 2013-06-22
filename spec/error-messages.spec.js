// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('Error messages', function() {
	var validator;

	it('should return an error message that states the email is required', function() {
		validator = new Validator({
			email: ''
		}, {
			email: 'required|email'
		});

		expect(validator.first('email')).toEqual('The email field is required.');
	});

	it('should return an array of all email error messages', function() {
		validator = new Validator({
			email: ''
		}, {
			email: 'required|email'
		});

		expect(validator.errors.get('email') instanceof Array).toBeTruthy();
		expect(validator.errors.get('email').length).toEqual(2);
	});

	it('should return an empty array if there are no messages for an attribute', function() {
		validator = new Validator({
			email: 'johndoe@gmail.com'
		}, {
			email: 'required|email'
		});

		expect(validator.errors.get('email') instanceof Array).toBeTruthy();
		expect(validator.errors.get('email').length).toEqual(0);
	});

	it('should have a method on the errors object to retrieve the first error message for an attribute', function() {
		validator = new Validator({
			email: ''
		}, {
			email: 'required|email'
		});

		expect(validator.errors.first('email')).toEqual('The email field is required.');
	});

	it('should return false if errors.first() is called and there are no errors', function() {
		validator = new Validator({
			email: 'john@yahoo.com'
		}, {
			email: 'required|email'
		});

		expect(validator.errors.first('email')).toEqual(false);
	});

	it('should return an error message that states the email must be valid', function() {
		validator = new Validator({
			email: 'john@yahoo'
		}, {
			email: 'required|email'
		});

		expect(validator.first('email')).toEqual('The email format is invalid.');
	});

	it('should return null for a key without an error message', function() {
		validator = new Validator({ name: 'David' }, { name: 'required' });
		expect(validator.first('name')).toBeFalsy();
	});

	it('should return error messages with attribute names and values for multi-part rules', function() {
		validator = new Validator({
			age: 17,
			description: 'a',
			info: '',
			hours: 3,
			pin: '123',
			range: 20,
			tweet: 'some tweet'
		}, {
			age: 'min:18',
			description: 'required|min:5',
			info: 'required|min:3',
			hours: 'size:5',
			pin: 'size:4',
			range: 'max:10',
			tweet: 'max:5'
		});

		expect(validator.first('age')).toEqual('The age must be at least 18.'); // min numeric
		expect(validator.first('description')).toEqual('The description must be at least 5 characters.'); // min string
		expect(validator.first('info')).toEqual('The info field is required.');
		expect(validator.first('hours')).toEqual('The hours must be 5.'); // size numeric
		expect(validator.first('pin')).toEqual('The pin must be 4 characters.'); // size string
		expect(validator.first('range')).toEqual('The range must be less than 10.'); // max numeric
		expect(validator.first('tweet')).toEqual('The tweet must be less than 5 characters.'); // max string
	});
});