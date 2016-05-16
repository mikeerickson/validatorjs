if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('string validation rule', function() {
  it('should pass when the input is a string', function() {
    var validator = new Validator({
      name: 'David'
    }, {
      name: 'string'
    });

    expect(validator.passes()).to.be.true;
  });

  it('should fail when the input is not a string', function() {
    var validator = new Validator({
      name: 5
    }, {
      name: 'string'
    });

    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('name')).to.equal('The name must be a string.');
  });
});
