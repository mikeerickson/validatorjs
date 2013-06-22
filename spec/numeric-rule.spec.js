// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('numeric validation rule', function() {
	var validator;

	it('should pass with a numeric value', function() {
		validator = new Validator({ age: 44 }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a decimal numeric value', function() {
		validator = new Validator({ measurement: 0.5454 }, { measurement: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string numeric value', function() {
		validator = new Validator({ age: '44' }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string decimal numeric value', function() {
		validator = new Validator({ measurement: '0.5454' }, { measurement: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with a string value', function() {
		validator = new Validator({ age: 'something' }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('something is not a number');
	});

	it('should fail with a boolean value', function() {
		validator = new Validator({ age: true }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('age is a boolean, not a number');
	});

	it('should return a customized numeric error message', function() {
		validator = new Validator({ age: true }, { age: 'numeric' });
		expect(validator.first('age')).toEqual('The age must be a number.');
	});
});