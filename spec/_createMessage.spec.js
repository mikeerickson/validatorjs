// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('_createMessage', function() {
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