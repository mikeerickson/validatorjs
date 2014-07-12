/**
 * passes for undefined or ''
 * fails if boolean value
 */

describe('max validation rule', function() {
	var validator;

	it('should fail with the name "David". Maximum size is 3 letters.', function() {
		validator = new Validator({ name: 'David' }, { name: 'max:3' });
		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "David". Maximum size is 5 letters.', function() {
		validator = new Validator({ name: 'Da' }, { name: 'max:5' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "18". Max is 12.', function() {
		validator = new Validator({ age: 18 }, { age: 'max:12' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass with the age "12". Max is 12.', function() {
		validator = new Validator({ age: 12 }, { age: 'max:12' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with boolean true value', function() {
		validator = new Validator({ val: true }, { val: 'max:5' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with boolean false value', function() {
		validator = new Validator({ val: false }, { val: 'max:5' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when the age is 0', function() {
		var validator = new Validator({ age: 0 }, { age: 'max:2' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass when the field is an empty string', function() {
		var validator = new Validator({ email: '' }, { email: 'max:2' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass when the field does not exist', function() {
		var validator = new Validator({}, { email: 'max:2' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});