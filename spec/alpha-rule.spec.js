describe('alpha validation rule', function() {
	var validator;
	
	it('should fail with non-alphabetic characters', function() {
		validator = new Validator({ name: '12' }, { name: 'alpha' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should fail with non-alphabetic characters', function() {
		validator = new Validator({ name: 12 }, { name: 'alpha' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with only alphabetic characters', function() {
		validator = new Validator({ name: 'abc' }, { name: 'alpha' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});



	it('should pass when the field is an empty string', function() {
		var validator = new Validator({ name: '' }, { name: 'alpha' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass when the field does not exist', function() {
		var validator = new Validator({}, { name: 'alpha' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});