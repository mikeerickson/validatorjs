// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('in validation rule', function() {
	var validator;

	it('should fail the value is not in the set of comma separated values', function() {
		validator = new Validator({ state: 'fakeState', }, { state: 'in:CA,TX,FL' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('state')).toEqual('The selected state is invalid.');
	});

	it('should pass when the value is in the set of comma separated values', function() {
		validator = new Validator({ state: 'CA', }, { state: 'in:CA,TX,FL' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});