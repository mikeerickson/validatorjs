describe('alternative initialization using an array instead pipe', function() {
	var validator;

	beforeEach(function() {
		validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com',
			salary: '10,000.00',
			birthday: '03/07/1980'
		}, {
			name: ['required', 'min:3', 'max:10'],
			email: ['required', 'email'],
			salary: ['required', 'regex:/^\\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,3})(\\.[0-9]{2})?$/'],
			birthday: ['required', 'regex:/^([1-9]|0[1-9]|[12][0-9]|3[01])\\D([1-9]|0[1-9]|1[012])\\D(19[0-9][0-9]|20[0-9][0-9])$/']
		});
	});

	it('should have a rules property containing all the validation rules', function() {
		expect(validator.rules).toBeTruthy();
	});

	it('should have an input property containing the input data to be validated', function() {
		expect(validator.input).toBeTruthy();
	});

	it('should have a messages property containing the combined messages for validation', function() {
		expect(validator.messages).toBeTruthy();
	});

	it('should have a passes() method', function() {
		expect(typeof validator.passes).toEqual('function');
	});

	it('should have a fails() method', function() {
		expect(typeof validator.fails).toEqual('function');
	});

	it('should have an errors property containing validation errors', function() {
		expect(validator.errors).toBeDefined();
	});

	it('should have a check method', function() {
		expect(typeof validator.check).toEqual('function');
	});
}); // Page constructor
