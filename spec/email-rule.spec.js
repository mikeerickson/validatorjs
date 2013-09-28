// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

// only checks numeric, string, and undefined

describe('email validation rule', function() {
	it('should pass with the email address: johndoe@gmail.com', function() {
		var validator = new Validator({ email: 'johndoe@gmail.com' }, { email: 'email' });
		expect(validator.passes()).toBeTruthy();
	});

	it ('should fail with the email address: johndoe.gmail.com', function() {
		var validator = new Validator({ email: 'johndoe.gmail.com' }, { email: 'email' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with the email address: johndoe@gmail', function() {
		var validator = new Validator({ email: 'johndoe@gmail' }, { email: 'email' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail when the email address contains whitespace only', function() {
		var validator = new Validator({ email: '   ' }, { email: 'email' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when the field is an empty string', function() {
		var validator = new Validator({ email: '' }, { email: 'email' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass when the field does not exist', function() {
		var validator = new Validator({}, { email: 'email' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});