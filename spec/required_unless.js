if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required unless', function() {
  it('should fail', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: ''
    }, {
      flavour: 'required_unless:desert,cake'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is not cake.');
  });

  it('should pass', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: 'chocolate'
    }, {
      flavour: 'required_unless:desert,cake'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
