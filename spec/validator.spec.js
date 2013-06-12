// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('Validator constructor', function() {
	var validator;

	beforeEach(function() {
		validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com'
		}, {
			name: 'required',
			email: 'required'
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


describe('require validation rule', function() {
	var validator;

	it('should pass with non-empty strings', function() {
		validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com'
		}, {
			name: 'required',
			email: 'required'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with empty strings', function() {
		validator = new Validator({
			name: 'David',
			email: ''
		}, {
			name: 'required',
			email: 'required'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with strings containing only white space', function() {
		validator = new Validator({
			name: '      	'
		}, {
			name: 'required'
		});

		expect(validator.fails()).toBeTruthy();
	});
});

describe('email validation rule', function() {
	it('should pass with the email address: johndoe@gmail.com', function() {
		var validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail.com'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it ('should fail with the email address: johndoe.gmail.com', function() {
		var validator = new Validator({
			name: 'David',
			email: 'johndoe.gmail.com'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with the email address: johndoe@gmail', function() {
		var validator = new Validator({
			name: 'David',
			email: 'johndoe@gmail'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('size validation rule', function() {
	it('should fail with the state = C. Size must be 2 letters.', function() {
		var validator = new Validator({
			state: 'C'
		}, {
			state: 'size:2'
		});

		expect(validator.fails()).toBeTruthy();
	});
	
	it('should pass with the state = CA. Size must be 2 letters.', function() {
		var validator = new Validator({
			state: 'CA'
		}, {
			state: 'size:2'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with the age 65. Size must be 65', function() {
		var validator = new Validator({
			age: 65
		}, {
			age: 'size:65'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age 64. Size must be 65.', function() {
		var validator = new Validator({
			age: 64
		}, {
			age: 'size:65'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('min validation rule', function() {
	var validator;

	it('should fail with the name "D". Minimum size is 2 letters.', function() {
		validator = new Validator({
			name: 'D'
		}, {
			name: 'min:2'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "Da". Minimum is 2 letters.', function() {
		validator = new Validator({
			name: 'Da'
		}, {
			name: 'min:2'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with the age "18". Minimum is 18.', function() {
		validator = new Validator({
			age: 18
		}, {
			age: 'min:18'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "17". Minimum is 18.', function() {
		validator = new Validator({
			age: 17
		}, {
			age: 'min:18'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with value of 0.04', function() {
		validator = new Validator({
			val: 0.04
		}, {
			val: 'min:0.05'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('max validation rule', function() {
	var validator;

	it('should fail with the name "David". Maximum size is 3 letters.', function() {
		validator = new Validator({
			name: 'David'
		}, {
			name: 'max:3'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "David". Maximum size is 5 letters.', function() {
		validator = new Validator({
			name: 'Da'
		}, {
			name: 'max:5'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "18". Max is 12.', function() {
		validator = new Validator({
			age: 18
		}, {
			age: 'max:12'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should pass with the age "12". Max is 12.', function() {
		validator = new Validator({
			age: 12
		}, {
			age: 'max:12'
		});

		expect(validator.passes()).toBeTruthy();
	});
});

describe('numeric validation rule', function() {
	var validator;

	it('should pass with a numeric value', function() {
		validator = new Validator({ age: 44 }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a decimal numeric value', function() {
		validator = new Validator({ measurement: 0.5454 }, { measurement: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string numeric value', function() {
		validator = new Validator({ age: '44' }, { age: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with a string decimal numeric value', function() {
		validator = new Validator({ measurement: '0.5454' }, { measurement: 'numeric' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with a string value', function() {
		validator = new Validator({ age: 'something' }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('something is not a number');
	});

	it('should fail with a boolean value', function() {
		validator = new Validator({ age: true }, { age: 'numeric' });
		expect(validator.fails()).toBeTruthy('age is a boolean, not a number');
	});

	it('should return a customized numeric error message', function() {
		validator = new Validator({ age: true }, { age: 'numeric' });
		expect(validator.first('age')).toEqual('The age must be a number.');
	});
});

describe('alpha validation rule', function() {
	it('should fail with non-alphabetic characters', function() {
		validator = new Validator({ name: '12' }, { name: 'alpha' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with only alphabetic characters', function() {
		validator = new Validator({ name: 'abc' }, { name: 'alpha' });
		expect(validator.fails()).toBeFalsy();
		expect(validator.passes()).toBeTruthy();
	});

	it('should return a customized alpha error message', function() {
		validator = new Validator({ name: '12' }, { name: 'alpha' });
		expect(validator.errors.first('name')).toEqual('The name field must contain only alphabetic characters.');
	});
});

describe('alpha_num validation rule', function() {
	it('should fail with non-alphanumeric characters', function() {
		validator = new Validator({ age: '$' }, { age: 'alpha_num' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('age')).toEqual('The age field must be alphanumeric.');
	});

	it('should pass with only alphanumeric characters', function() {
		validator = new Validator({ age: 'abc123' }, { age: 'alpha_num' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});

describe('alpha_dash validation rule', function() {
	it('should fail with non alpha dash characters', function() {
		validator = new Validator({ name: 'David *' }, { name: 'alpha_dash' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('name')).toEqual('The name field may only contain alpha-numeric characters, as well as dashes and underscores.');
	});

	it('should pass with only alpha dash characters', function() {
		validator = new Validator({ name: 'David9_-' }, { name: 'alpha_dash' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});

describe('url validation rule', function() {
	it('should fail with a url only containing http://', function() {
		var link = 'http://';
		var validator = new Validator({ link: link }, { link: 'url' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.first('link')).toEqual('The link format is invalid.');
	});

	it('should pass with a url starting with http:// followed by 1 or more characters', function() {
		var link = 'http://g';
		var validator = new Validator({ link: link }, { link: 'url' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with an https url', function() {
		var link = 'https://google.com';
		var validator = new Validator({ link: link }, { link: 'url' });
		expect(validator.passes()).toBeTruthy();
	});
});

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
		expect(validator.first('phone')).toEqual('The phone attribute has errors.');
	});

	it('should fail the custom telephone rule registration with a custom error message', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

		var validator = new Validator({ cell: '4213-454-9988' }, { cell: 'telephone' });
		expect(validator.first('cell')).toEqual('The cell phone number is not in the format XXX-XXX-XXXX.');
	});
});

describe('Error messages', function() {
	var validator;

	it('should return an error message that states the email is required', function() {
		validator = new Validator({
			email: ''
		}, {
			email: 'required|email'
		});

		expect(validator.first('email')).toEqual('The email field is required.');
	});

	it('should return an array of all email error messages', function() {
		validator = new Validator({
			email: ''
		}, {
			email: 'required|email'
		});

		expect(validator.errors.get('email') instanceof Array).toBeTruthy();
		expect(validator.errors.get('email').length).toEqual(2);
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

		expect(validator.first('email')).toEqual('The email format is invalid.');
	});

	it('should return null for a key without an error message', function() {
		validator = new Validator({ name: 'David' }, { name: 'required' });
		expect(validator.first('name')).toBeFalsy();
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

		expect(validator.first('age')).toEqual('The age must be at least 18.'); // min numeric
		expect(validator.first('description')).toEqual('The description must be at least 5 characters.'); // min string
		expect(validator.first('info')).toEqual('The info field is required.');
		expect(validator.first('hours')).toEqual('The hours must be 5.'); // size numeric
		expect(validator.first('pin')).toEqual('The pin must be 4 characters.'); // size string
		expect(validator.first('range')).toEqual('The range must be less than 10.'); // max numeric
		expect(validator.first('tweet')).toEqual('The tweet must be less than 5 characters.'); // max string
	});
});


describe('_createMessage', function() {
	var validator;

	it('should create a message from the template given only the attribute name', function() {
		var msg = Validator.prototype._createMessage('The :attribute field is required.', { attribute: 'email' });
		expect(msg).toEqual('The email field is required.');
	});

	it('should create a message from the template given the attribute name and value', function() {
		var msg = Validator.prototype._createMessage('The :attribute must be at least :min.', {
			attribute: 'age',
			min: 18
		});

		expect(msg).toEqual('The age must be at least 18.');
	});
});
