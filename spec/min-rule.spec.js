// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('min validation rule', function() {
	var validator;

	it('should fail with the name "D". Minimum size is 2 letters.', function() {
		validator = new Validator({
			name: 'D'
		}, {
			name: 'min:2'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "Da". Minimum is 2 letters.', function() {
		validator = new Validator({
			name: 'Da'
		}, {
			name: 'min:2'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with the age "18". Minimum is 18.', function() {
		validator = new Validator({
			age: 18
		}, {
			age: 'min:18'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "17". Minimum is 18.', function() {
		validator = new Validator({
			age: 17
		}, {
			age: 'min:18'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with value of 0.04', function() {
		validator = new Validator({
			val: 0.04
		}, {
			val: 'min:0.05'
		});

		expect(validator.fails()).toBeTruthy();
	});
});