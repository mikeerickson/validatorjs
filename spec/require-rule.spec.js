describe('require validation rule', function() {
	
	if (typeof require !== 'undefined') {
		var Validator = require('../src/validator.js');
	} else {
		var Validator = window.Validator;
	}

	it('should pass with non-empty strings', function() {
		var validator = new Validator({ name: 'David' }, { name: 'required' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with empty strings', function() {
		var validator = new Validator({ email: '' }, { email: 'required' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with strings containing only white space', function() {
		var validator = new Validator({ name: '      	'}, { name: 'required' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail when a value is equal to undefined', function() {
		var validator = new Validator({ name: undefined }, { name: 'required' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail when a value is equal to null', function() {
		var validator = new Validator({ name: null }, { name: 'required' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when a value is numeric', function() {
		var validator = new Validator({ age: 29 }, { age: 'required' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail when the attribute is not passed in', function() {
		var validator = new Validator({}, { email: 'required'} );
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});
});