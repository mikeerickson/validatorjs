if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('confirmed validation rule', function() {
  it('should fail without a matching confirmation field for the field under validation', function() {
    var validator = new Validator({
      password: 'abc'
    }, {
      password: 'confirmed'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });

  it('should fail without a matching confirmation field for the field under validation', function() {
    var validator = new Validator({
      password: 'abc',
      password_confirmation: 'abcd'
    }, {
      password: 'confirmed'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('password')).to.equal('The password confirmation does not match.');
  });

  it('should pass with a matching confirmation field for the field under validation', function() {
    var validator = new Validator({
      password: 'abc',
      password_confirmation: 'abc'
    }, {
      password: 'confirmed'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
