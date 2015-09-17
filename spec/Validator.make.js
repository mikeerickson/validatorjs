if (typeof require !== 'undefined') {
	var Validator = require('../src/validator.js');
	var expect = require('chai').expect;
} else {
	var Validator = window.Validator;
	var expect = window.chai.expect;
}

describe('Validator.make', function() {

	it('should have a static make method that news up Validator', function() {
		var data = {
			name: 'David',
			email: 'johndoe@gmail.com'
		};

		var rules = {
			name: 'required',
			email: 'required'
		};

		var customErrors = {
			required: "You're missing :required"
		};

		var validation = Validator.make(data, rules, customErrors);
		expect(validation).to.be.instanceOf(Validator);
		expect(validation.rules).to.be.a('object');
		expect(validation.input).to.be.a('object');
		expect(validation.messages).to.be.a('object');
	});
});