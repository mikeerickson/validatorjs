var expect = require('chai').expect;
var Validator = require('../dist/validator');
var data = {
	name: [
		{first: 'raabb', last: 'ajam'},
		{first: 'abdi', last: 'abdillah'}
	],
	foo: {
		bar: {
			baz: 'a'
		}
	}
};
var rules = {
	name: {
		first: 'required|alpha',
		last: 'required|alpha'
	},
	foo:{
		bar:{
			baz:'required|alpha'
		}
	}
};

describe('Validator', function () {
	it('should return true on valid data', function (next) {
		var validator = new Validator(data, rules);
		expect(validator.passes()).to.be.ok;
		next();
	});
	it('should return error messages on invalid data', function (next) {
		var validator = new Validator({}, rules);
		console.log(JSON.stringify(validator.errors));
		console.log(validator.errors);
		expect(validator.passes()).to.be.not.ok;
		expect(validator.errors.name.first).to.exist;
		expect(validator.errors.name.last).to.exist;
		expect(validator.errors.foo.bar.baz).to.exist;
		next();
	});
});