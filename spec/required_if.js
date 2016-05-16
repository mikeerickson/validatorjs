if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required if', function() {
  it('should fail', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: ''
    }, {
      flavour: 'required_if:desert,icecream'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is icecream.');
  });

  it('should pass', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,icecream'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
