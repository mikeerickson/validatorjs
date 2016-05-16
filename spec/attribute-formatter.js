if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('attribute formatter tests', function() {
  it('should replace _[] with spaces by default', function() {
    var validator = new Validator({
      'all_users[3][first_name]': ''
    }, {
      'all_users[3][first_name]': 'required'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('all_users[3][first_name]')).to.equal('The all users 3 first name field is required.');
  });

  it('should be able configure global attribute formatter', function() {
    var originalAttributeFormatter = Validator.prototype.attributeFormatter;
    Validator.setAttributeFormatter(function(attribute) {
      return attribute.replace(/_/, ' ');
    });
    var validator = new Validator({
      first_name: ''
    }, {
      first_name: 'required'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('first_name')).to.equal('The first name field is required.');
    Validator.setAttributeFormatter(originalAttributeFormatter);
  });

  it('should be able configure attribute formatter for particular instance', function() {
    var validator = new Validator({
      first_name: ''
    }, {
      first_name: 'required'
    });
    validator.setAttributeFormatter(function(attribute) {
      return attribute;
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('first_name')).to.equal('The first_name field is required.');
  });
});
