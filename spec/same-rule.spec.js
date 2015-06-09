describe('same validation rule', function() {
	
	if (typeof require !== 'undefined') {
		var Validator = require('../src/validator.js');
	} else {
		var Validator = window.Validator;
	}
	
	it('should fail when the 2 attributes are different', function() {
		var validator = new Validator({ pw: 'abc123', pw2: 'abc1234' }, { pw2: 'same:pw' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('pw2')).toEqual('The pw2 and pw fields must match.');
	});

	it('should fail when the the comparing attribute doesnt exist', function() {
		var validator = new Validator({ pw2: 'abc1234' }, { pw2: 'same:pw' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('pw2')).toEqual('The pw2 and pw fields must match.');
	});

	it('should pass when the 2 attributes are equal', function() {
		var validator = new Validator({ pw: 'abc123', pw2: 'abc123' }, { pw2: 'same:pw' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});