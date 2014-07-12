/**
 * passes for undefined or ''
 * passes for number 18
 * passes for string '18'
 * fails if letters exist in value
 * fails if an array or object
 * fails if boolean value
 * fails if decimal value
 */

describe('integer validation rule', function() {
	it('should fail with a decimal value', function() {
		var validator = new Validator({ age: 18.9 }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('age')).toEqual('The age must be an integer.')
	});

	it('should fail with a string value containing numbers and letters', function() {
		var validator = new Validator({ age: '18d' }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('age')).toEqual('The age must be an integer.')
	});

	it('should fail with a boolean true value', function() {
		var validator = new Validator({ age: true }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should fail with a boolean false value', function() {
		var validator = new Validator({ age: false }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should fail if the value is an array', function() {
		var validator = new Validator({ age: [] }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should fail if the value is an object', function() {
		var validator = new Validator({ age: {} }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should pass if no value is entered', function() {
		var validator = new Validator({}, { age: 'integer' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});	

	it('should pass with an integer value', function() {
		var validator = new Validator({ age: 18 }, { age: 'integer' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string containing an integer value', function() {
		var validator = new Validator({ age: '18' }, { age: 'integer' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});
});