// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('require validation rule', function() {
	var validator;

	it('should pass with non-empty strings', function() {
		validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com'
		}, {
			name: 'required',
			email: 'required'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with empty strings', function() {
		validator = new Validator({
			name: 'David',
			email: ''
		}, {
			name: 'required',
			email: 'required'
		});

		expect(validator.fails()).toBeTruthy();
	});


	it('should fail with strings containing only white space', function() {
		validator = new Validator({ name: '      	'}, { name: 'required' });
		expect(validator.fails()).toBeTruthy();
	});


	it('should fail when a value is equal to undefined', function() {
		validator = new Validator({ name: undefined }, { name: 'required' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail when a value is equal to null', function() {
		validator = new Validator({ name: null }, { name: 'required' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when a value numeric', function() {
		validator = new Validator({ age: 29 }, { age: 'required' });
		expect(validator.passes()).toBeTruthy();
	});
});