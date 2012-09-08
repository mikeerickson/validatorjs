describe('Validator()', function() {
	var validator;

	beforeEach(function() {
		validator = new Validator({
			name: 'required',
			email: 'required'
		}, {
			name: 'David',
			email: 'dtang@usc.edu'
		});
	});
	
	it('should have a rules property containing all the validation rules', function() {
		expect(validator.rules).toBeTruthy();
	});

	it('should have an input property containing the input data to be validated', function() {
		expect(validator.input).toBeTruthy();
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


describe('required validator flag', function() {
	var validator;

	it('should pass with non-empty strings for required data fields', function() {
		validator = new Validator({
			name: 'required',
			email: 'required'
		}, {
			name: 'David',
			email: 'dtang@usc.edu'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with empty strings for required data fields', function() {
		validator = new Validator({
			name: 'required',
			email: 'required'
		}, {
			name: 'David',
			email: ''
		});

		expect(validator.fails()).toBeTruthy();
		console.log(validator.errors);
	});
});

describe('email validator flag', function() {
	var validator;

	it('should pass with the email address: dtang85@gmail.com', function() {
		validator = new Validator({
			name: 'required',
			email: 'required|email'
		}, {
			name: 'David',
			email: 'dtang85@gmail.com'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it ('should fail with the email address: dtang85.gmail.com', function() {
		validator = new Validator({
			name: 'required',
			email: 'required|email'
		}, {
			name: 'David',
			email: 'dtang85.gmail.com'
		});

		expect(validator.fails()).toBeTruthy();
		console.log(validator.errors);
	});

	it('should fail with the email address: dtang85@gmail', function() {
		validator = new Validator({
			name: 'required',
			email: 'required|email'
		}, {
			name: 'David',
			email: 'dtang85@gmail'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('size validator flag', function() {
	var validator;

	it('should fail with the state = C. Size must be 2 letters.', function() {
		validator = new Validator({
			state: 'size:2'
		}, {
			state: 'C'
		});

		expect(validator.fails()).toBeTruthy();
	});
	
	it('should pass with the state = CA. Size must be 2 letters.', function() {
		validator = new Validator({
			state: 'size:2'
		}, {
			state: 'CA'
		});

		expect(validator.passes()).toBeTruthy();
		console.log(validator.errors);
	});

	it('should pass with the age 65. Size must be 65', function() {
		validator = new Validator({
			age: 'size:65'
		}, {
			age: 65
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age 64. Size must be 65.', function() {
		validator = new Validator({
			age: 'size:65'
		}, {
			age: 64
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('min validator flag', function() {
	var validator;

	it('should fail with the name "D". Minimum size is 2 letters.', function() {
		validator = new Validator({
			name: 'min:2'
		}, {
			name: 'D'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "Da". Minimum is 2 letters.', function() {
		validator = new Validator({
			name: 'min:2'
		}, {
			name: 'Da'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with the age "18". Minimum is 18.', function() {
		validator = new Validator({
			age: 'min:18'
		}, {
			age: 18
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "17". Minimum is 18.', function() {
		validator = new Validator({
			age: 'min:18'
		}, {
			age: 17
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('max validator flag', function() {
	var validator;

	it('should fail with the name "David". Maximum size is 3 letters.', function() {
		validator = new Validator({
			name: 'max:3'
		}, {
			name: 'David'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "David". Maximum size is 5 letters.', function() {
		validator = new Validator({
			name: 'max:5'
		}, {
			name: 'Da'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "18". Max is 12.', function() {
		validator = new Validator({
			age: 'max:12'
		}, {
			age: 18
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should pass with the age "12". Max is 12.', function() {
		validator = new Validator({
			age: 'max:12'
		}, {
			age: 12
		});

		expect(validator.passes()).toBeTruthy();
	});
});