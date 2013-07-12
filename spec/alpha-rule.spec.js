// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('alpha validation rule', function() {
	var validator;
	
	it('should fail with non-alphabetic characters', function() {
		validator = new Validator({ name: '12' }, { name: 'alpha' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with only alphabetic characters', function() {
		validator = new Validator({ name: 'abc' }, { name: 'alpha' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});

	it('should return a customized alpha error message', function() {
		validator = new Validator({ name: '12' }, { name: 'alpha' });
		expect(validator.errors.first('name')).toEqual('The name field must contain only alphabetic characters.');
	});

	it('should pass when the field is blank / optional', function() {
		var validator = new Validator({ name: '' }, { name: 'alpha' });

		expect(validator.passes()).toBeTruthy();
	});
});