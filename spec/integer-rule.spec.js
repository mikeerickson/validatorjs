// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('integer validation rule', function() {
	it('should fail with a decimal value', function() {
		var validator = new Validator({ age: 18.9 }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('age')).toEqual('The age must be an integer.')
	});

	it('should fail with a string value', function() {
		var validator = new Validator({ age: '18d' }, { age: 'integer' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('age')).toEqual('The age must be an integer.')
	});

	it('should pass with an integer value', function() {
		var validator = new Validator({ age: 18 }, { age: 'integer' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});
});