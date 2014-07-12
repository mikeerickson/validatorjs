describe('Validator constructor', function() {
	var validator;

	beforeEach(function() {
		validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com'
		}, {
			name: 'required',
			email: 'required'
		}, {
			required: "You're missing :required"
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
