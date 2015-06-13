describe('digits rule', function() {
	
	if (typeof require !== 'undefined') {
		var Validator = require('../src/validator.js');
	} else {
		var Validator = window.Validator;
	}

	it('should be numeric and must have an exact length of 5', function() {
		var validation = new Validator({
			zip: '90989'
		}, {
			zip: 'digits:5'
		});

		expect(validation.passes()).toBeTruthy();
		expect(validation.fails()).toBeFalsy();
	});

	it('should not pass if non-digits are present', function() {
		var validation = new Validator({
			zip: '9098a'
		}, {
			zip: 'digits:5'
		});

		expect(validation.fails()).toBeTruthy();
		expect(validation.errors.first('zip')).toEqual('The zip must be 5 digits.');
		expect(validation.passes()).toBeFalsy();
	});
});