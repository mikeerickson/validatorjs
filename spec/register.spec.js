describe('register a custom validation rule', function() {
	it('should have a telephone method on obj.validate.prototype', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator();
		expect(typeof validator.validate.telephone).toEqual('function');
	});

	it('should pass the custom telephone rule registration', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator({ phone: '213-454-9988' }, { phone: 'telephone' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail the custom telephone rule registration with a default error message', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator({ phone: '4213-454-9988' }, { phone: 'telephone' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
	});
});