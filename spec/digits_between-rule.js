if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('digits_between rule', function() {
  it('should be numeric and must have an exact length between 8 and 10', function() {
    var validation = new Validator({
      phone: '800692775'
    }, {
      phone: 'digits_between:8,10'
    });

    expect(validation.passes()).to.be.true;
    expect(validation.fails()).to.be.false;
  });

  it('should not pass if non-digits are present', function() {
    var validation = new Validator({
      phone: '80069277a'
    }, {
      phone: 'digits_between:8,10'
    });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first('phone')).to.equal('The phone field must be between 8 and 10 digits.');
    expect(validation.passes()).to.be.false;
  });

  it('should not pass if value length is below minimum', function() {
    var validation = new Validator({
      phone: '8006927'
    }, {
      phone: 'digits_between:8,10'
    });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first('phone')).to.equal('The phone field must be between 8 and 10 digits.');
    expect(validation.passes()).to.be.false;
  });

  it('should not pass if value length is above maximum', function() {
    var validation = new Validator({
      phone: '80069277525'
    }, {
      phone: 'digits_between:8,10'
    });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first('phone')).to.equal('The phone field must be between 8 and 10 digits.');
    expect(validation.passes()).to.be.false;
  });
});
