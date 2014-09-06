describe('email validation rule', function() {
	it('should pass with the email address: johndoe@gmail.com', function() {
		var validator = new Validator({ email: 'johndoe@gmail.com' }, { email: 'email' });
		expect(validator.passes()).toBeTruthy();
	});

	it ('should fail with the email address: johndoe.gmail.com', function() {
		var validator = new Validator({ email: 'johndoe.gmail.com' }, { email: 'email' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with the email address: johndoe@gmail', function() {
		var validator = new Validator({ email: 'johndoe@gmail' }, { email: 'email' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should fail when the email address contains whitespace only', function() {
		var validator = new Validator({ email: '   ' }, { email: 'email' });
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when the field is an empty string', function() {
		var validator = new Validator({ email: '' }, { email: 'email' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass when the field does not exist', function() {
		var validator = new Validator({}, { email: 'email' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass with first.last@example.com', function() {
		var validator = new Validator({ 
			email: 'first.last@example.com'
		}, {
			email: 'email'
		});

		expect(validator.passes()).toBe(true);
		expect(validator.fails()).toBe(false);
	});
});