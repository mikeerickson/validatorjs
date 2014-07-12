// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../dist/validator');
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
		expect(validation instanceof Validator).toBeTruthy();
		expect(validation.rules).toBeTruthy();
		expect(validation.input).toBeTruthy();
		expect(validation.messages).toBeTruthy();
	});
});