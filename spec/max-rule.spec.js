// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('max validation rule', function() {
	var validator;

	it('should fail with the name "David". Maximum size is 3 letters.', function() {
		validator = new Validator({
			name: 'David'
		}, {
			name: 'max:3'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "David". Maximum size is 5 letters.', function() {
		validator = new Validator({
			name: 'Da'
		}, {
			name: 'max:5'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "18". Max is 12.', function() {
		validator = new Validator({
			age: 18
		}, {
			age: 'max:12'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should pass with the age "12". Max is 12.', function() {
		validator = new Validator({
			age: 12
		}, {
			age: 'max:12'
		});

		expect(validator.passes()).toBeTruthy();
	});
});