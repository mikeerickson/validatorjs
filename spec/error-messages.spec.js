describe('Error messages', function() {
	var validator;

	describe('first()', function() {
		it('should return an error message that states the email is required', function() {
			validator = new Validator({
				email: ''
			}, {
				email: 'required|email'
			});

			expect(validator.errors.first('email')).toEqual('The email field is required.');
		});

		it('should have a method on the errors object to retrieve the first error message for an attribute', function() {
			validator = new Validator({
				email: ''
			}, {
				email: 'required|email'
			});

			expect(validator.errors.first('email')).toEqual('The email field is required.');
		});

		it('should return false if errors.first() is called and there are no errors', function() {
			validator = new Validator({
				email: 'john@yahoo.com'
			}, {
				email: 'required|email'
			});

			expect(validator.errors.first('email')).toEqual(false);
		});

		it('should return an error message that states the email must be valid', function() {
			validator = new Validator({
				email: 'john@yahoo'
			}, {
				email: 'required|email'
			});

			expect(validator.errors.first('email')).toEqual('The email format is invalid.');
		});

		it('should return null for a key without an error message', function() {
			validator = new Validator({ name: 'David' }, { name: 'required' });
			expect(validator.errors.first('name')).toBeFalsy();
		});

		it('should return error messages with attribute names and values for multi-part rules', function() {
			validator = new Validator({
				age: 17,
				description: 'a',
				info: '',
				hours: 3,
				pin: '123',
				range: 20,
				tweet: 'some tweet'
			}, {
				age: 'min:18',
				description: 'required|min:5',
				info: 'required|min:3',
				hours: 'size:5',
				pin: 'size:4',
				range: 'max:10',
				tweet: 'max:5'
			});

			expect(validator.errors.first('age')).toEqual('The age must be at least 18.'); // min numeric
			expect(validator.errors.first('description')).toEqual('The description must be at least 5 characters.'); // min string
			expect(validator.errors.first('info')).toEqual('The info field is required.');
			expect(validator.errors.first('hours')).toEqual('The hours must be 5.'); // size numeric
			expect(validator.errors.first('pin')).toEqual('The pin must be 4 characters.'); // size string
			expect(validator.errors.first('range')).toEqual('The range must be less than 10.'); // max numeric
			expect(validator.errors.first('tweet')).toEqual('The tweet must be less than 5 characters.'); // max string
		});

		it('should return a customized alpha error message', function() {
			validator = new Validator({ name: '12' }, { name: 'alpha' });
			expect(validator.errors.first('name')).toEqual('The name field must contain only alphabetic characters.');
		});

		it('should fail with non alpha dash characters', function() {
			validator = new Validator({ name: 'David *' }, { name: 'alpha_dash' });
			expect(validator.errors.first('name')).toEqual('The name field may only contain alpha-numeric characters, as well as dashes and underscores.');
		});

		it('should fail without a matching confirmation field for the field under validation', function() {
			var validator = new Validator({ password: 'abc' }, { password: 'confirmed' });
			expect(validator.errors.first('password')).toEqual('The password confirmation does not match.');
		});

		it('should fail when the 2 attributes are the same', function() {
			var validator = new Validator({ field1: 'abc', field2: 'abc' }, { field2: 'different:field1' });
			expect(validator.errors.first('field2')).toEqual('The field2 and field1 must be different.');
		});

		it('should fail with a url only containing http://', function() {
			var link = 'http://';
			var validator = new Validator({ link: link }, { link: 'url' });
			expect(validator.errors.first('link')).toEqual('The link format is invalid.');
		});

		it('should fail the custom telephone rule registration with a default error message', function() {
			Validator.register('telephone', function(val) {
				return val.match(/^\d{3}-\d{3}-\d{4}$/);
			});

			var validator = new Validator({ phone: '4213-454-9988' }, { phone: 'telephone' });
			expect(validator.errors.first('phone')).toEqual('The phone attribute has errors.');
		});

		it('should fail the custom telephone rule registration with a custom error message', function() {
			Validator.register('telephone', function(val) {
				return val.match(/^\d{3}-\d{3}-\d{4}$/);
			}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

			var validator = new Validator({ cell: '4213-454-9988' }, { cell: 'telephone' });
			expect(validator.errors.first('cell')).toEqual('The cell phone number is not in the format XXX-XXX-XXXX.');
		});
	});

	describe('get()', function() {
		it('should return an array of all email error messages', function() {
			validator = new Validator({
				email: ''
			}, {
				email: 'required|email'
			});

			expect(validator.errors.get('email') instanceof Array).toBeTruthy();
			expect(validator.errors.get('email').length).toEqual(1);
		});

		it('should return an empty array if there are no messages for an attribute', function() {
			validator = new Validator({
				email: 'johndoe@gmail.com'
			}, {
				email: 'required|email'
			});

			expect(validator.errors.get('email') instanceof Array).toBeTruthy();
			expect(validator.errors.get('email').length).toEqual(0);
		});
	});

	

	describe('ValidatorErrors.prototype.all()', function() {
		var validation;

		beforeEach(function() {
			validation = new Validator({
				name: 'd',
				email: '',
				age: 28
			}, {
				name: 'required|min:2',
				email: 'required|email',
				age: 'min:18'
			});
		});

		it('should return an array of all email error messages', function() {
			var expected = JSON.stringify({
				name: ['The name must be at least 2 characters.'], 
				email: ['The email field is required.']
			});

			expect(JSON.stringify(validation.errors.all())).toEqual(expected);
		});
	});

	describe('ValidatorErrors.prototype.has()', function() {
		var validation;

		beforeEach(function() {
			validation = new Validator({
				name: 'd',
				email: '',
				age: 28
			}, {
				name: 'required|min:2',
				email: 'required|email',
				age: 'min:18'
			});
		});

		it('should return an array of all email error messages', function() {
			expect(validation.errors.has('name')).toEqual(true);
			expect(validation.errors.has('age')).toEqual(false);
			expect(validation.errors.has('fake-property')).toEqual(false);
		});
	});
});