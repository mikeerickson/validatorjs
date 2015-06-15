if (typeof require !== 'undefined') {
	var Validator = require('../src/validator.js');
	var expect = require('chai').expect;
} else {
	var Validator = window.Validator;
	var expect = window.chai.expect;
}

describe('register a custom validation rule', function() {
	
	it('should have a telephone method on obj.validate.prototype', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator();
		expect(typeof validator.validate.telephone).to.equal('function');
	});

	it('should pass the custom telephone rule registration', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator({ phone: '213-454-9988' }, { phone: 'telephone' });
		expect(validator.passes()).to.be.true;
	});

	it('should fail the custom telephone rule registration with a default error message', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator({ phone: '4213-454-9988' }, { phone: 'telephone' });
		expect(validator.passes()).to.be.false;
		expect(validator.fails()).to.be.true;
	});
});