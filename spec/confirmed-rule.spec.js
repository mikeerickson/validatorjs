// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('confirmed validation rule', function() {
	it('should fail without a matching confirmation field for the field under validation', function() {
		var validator = new Validator({ password: 'abc' }, { password: 'confirmed' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail without a matching confirmation field for the field under validation', function() {
		var validator = new Validator({ password: 'abc', password_confirmation: 'abcd' }, { password: 'confirmed' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('password')).toEqual('The password confirmation does not match.');
	});

	it('should pass with a matching confirmation field for the field under validation', function() {
		var validator = new Validator({ password: 'abc', password_confirmation: 'abc' }, { password: 'confirmed' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});