if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('passes()', function() {
  it('should not duplicate error messages when called multiple times', function() {
    var validator = new Validator({}, {
      login: 'required'
    });

    validator.passes();
    validator.passes();

    expect(validator.errors.all()).to.eql({
      login: [
        'The login field is required.'
      ]
    });
  });
});
