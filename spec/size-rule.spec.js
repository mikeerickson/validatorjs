describe('size validation rule', function() {
	it('should fail with the state = C. Size must be 2 letters.', function() {
		var validator = new Validator({ state: 'C' }, { state: 'size:2' });
		expect(validator.fails()).toBeTruthy();
	});
	
	it('should pass with the state = CA. Size must be 2 letters.', function() {
		var validator = new Validator({ state: 'CA' }, { state: 'size:2' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with an empty string', function() {
		var validator = new Validator({ state: '' }, { state: 'size:2' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with the age 65. Size must be 65', function() {
		var validator = new Validator({ age: 65 }, { age: 'size:65' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age 64. Size must be 65.', function() {
		var validator = new Validator({ age: 64 }, { age: 'size:65' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when no value exists in the input object', function() {
		var validator = new Validator({}, { age: 'size:65' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});	
});