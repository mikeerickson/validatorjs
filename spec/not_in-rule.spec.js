// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('not_in validation rule', function() {
	var validator;

	it('should fail the value is in the set of comma separated values', function() {
		validator = new Validator({ username: 'skaterdav85', }, { username: 'not_in:skaterdav85,dtang,dtang85' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('username')).toEqual('The selected username is invalid.');
	});

	it('should pass when the value is not in the set of comma separated values', function() {
		validator = new Validator({ username: 'skatedav85', }, { username: 'not_in:user1,user2,user3' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});