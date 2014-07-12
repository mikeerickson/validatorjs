describe('accepted validation rule', function() {
	it('should pass if the value is yes', function() {
		var validator = new Validator({ terms: 'yes' }, { terms: 'accepted' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass if the value is on', function() {
		var validator = new Validator({ terms: 'on' }, { terms: 'accepted' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass if the value is the number 1', function() {
		var validator = new Validator({ terms: 1 }, { terms: 'accepted' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass if the value is the string 1', function() {
		var validator = new Validator({ terms: '1' }, { terms: 'accepted' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should fail if the value is not 1, on, or yes', function() {
		var validator = new Validator({ terms: '10' }, { terms: 'accepted' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail if the value is an empty string', function() {
		var validator = new Validator({ terms: '' }, { terms: 'accepted' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail if the value is undefined', function() {
		var validator = new Validator({}, { terms: 'accepted' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
	});
});