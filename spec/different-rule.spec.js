describe('different validation rule', function() {
	var validator;

	it('should fail when the 2 attributes are the same', function() {
		validator = new Validator({ field1: 'abc', field2: 'abc' }, { field2: 'different:field1' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
	});

	it('should pass when the 2 attributes are different', function() {
		validator = new Validator({ field1: 'abc', field2: 'abcd' }, { field2: 'different:field1' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});