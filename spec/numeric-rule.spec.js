/**
 * passes for undefined or ''
 * passes for number 18
 * passes for string '18'
 * fails if letters exist in value
 * fails if boolean value
 * passes if decimal value
 */

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
		validator = new Validator({ age: '18something' }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('something is not a number');
	});

	it('should fail with a boolean true value', function() {
		validator = new Validator({ age: true }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('age is a boolean, not a number');
	});

	it('should fail with a boolean false value', function() {
		validator = new Validator({ age: false }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('age is a boolean, not a number');
	});

	it('should pass with no value', function() {
		validator = new Validator({}, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});	

	it('should pass with an empty string value', function() {
		validator = new Validator({ age: '' }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});	
});