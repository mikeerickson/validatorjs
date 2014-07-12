describe('not_in validation rule', function() {
	var validator;

	it('should fail the value is in the set of comma separated values', function() {
		validator = new Validator({ username: 'skaterdav85', }, { username: 'not_in:skaterdav85,dtang,dtang85' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('username')).toEqual('The selected username is invalid.');
	});

	it('should pass when the value is not in the set of comma separated values', function() {
		validator = new Validator({ username: 'skatedav85', }, { username: 'not_in:user1,user2,user3' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should fail when the numeric value is in the set of comma separated values', function() {
		validator = new Validator({ id: 1, }, { id: 'not_in:0,1,2' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('id')).toEqual('The selected id is invalid.');
	});

	it('should pass when the value is not in the set of comma separated values', function() {
		validator = new Validator({ id: 10, }, { id: 'not_in:0,1,2' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass when the value is undefined', function() {
		validator = new Validator({}, { country: 'not_in:China,Spain,France' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass when the value is an empty string', function() {
		validator = new Validator({ country: '' }, { country: 'not_in:China,Spain,France' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});
});