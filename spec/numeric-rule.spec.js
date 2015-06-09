describe('numeric validation rule', function() {
	
	if (typeof require !== 'undefined') {
		var Validator = require('../src/validator.js');
	} else {
		var Validator = window.Validator;
	}

	it('should pass with a numeric value', function() {
		var validator = new Validator({ age: 44 }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a decimal numeric value', function() {
		var validator = new Validator({ measurement: 0.5454 }, { measurement: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string numeric value', function() {
		var validator = new Validator({ age: '44' }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string decimal numeric value', function() {
		var validator = new Validator({ measurement: '0.5454' }, { measurement: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with a string value', function() {
		var validator = new Validator({ age: '18something' }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('something is not a number');
	});

	it('should fail with a boolean true value', function() {
		var validator = new Validator({ age: true }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('age is a boolean, not a number');
	});

	it('should fail with a boolean false value', function() {
		var validator = new Validator({ age: false }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('age is a boolean, not a number');
	});

	it('should pass with no value', function() {
		var validator = new Validator({}, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});	

	it('should pass with an empty string value', function() {
		var validator = new Validator({ age: '' }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});	
});