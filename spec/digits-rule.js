if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('digits rule', function() {
  it('should be numeric and must have an exact length of 5', function() {
    var validation = new Validator({
      zip: '90989'
    }, {
      zip: 'digits:5'
    });

    expect(validation.passes()).to.be.true;
    expect(validation.fails()).to.be.false;
  });

  it('should not pass if non-digits are present', function() {
    var validation = new Validator({
      zip: '9098a'
    }, {
      zip: 'digits:5'
    });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first('zip')).to.equal('The zip must be 5 digits.');
    expect(validation.passes()).to.be.false;
  });
});
