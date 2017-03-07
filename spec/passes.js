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

  it('should work if the input doesn\'t extend Object', function () {
    // This happens in Express's req.body, for example.
    var body = Object.create(null);
    body.a = 2;

    var validator = new Validator(body, {'a': 'required'});

    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
