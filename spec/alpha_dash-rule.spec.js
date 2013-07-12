// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('alpha_dash validation rule', function() {
	var validator;

	it('should fail with non alpha dash characters', function() {
		validator = new Validator({ name: 'David *' }, { name: 'alpha_dash' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('name')).toEqual('The name field may only contain alpha-numeric characters, as well as dashes and underscores.');
	});

	it('should pass with only alpha dash characters', function() {
		validator = new Validator({ name: 'David9_-' }, { name: 'alpha_dash' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass when the field is blank / optional', function() {
		var validator = new Validator({ name: '' }, { name: 'alpha_dash' });

		expect(validator.passes()).toBeTruthy();
	});
});