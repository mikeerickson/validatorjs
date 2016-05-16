if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('array rule', function() {
  it('should pass when array', function() {
    var validator = new Validator({
      users: []
    }, {
      users: 'array'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when given object', function() {
    var validator = new Validator({
      users: {}
    }, {
      users: 'array'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it('should fail when given boolean', function() {
    var validator = new Validator({
      users: true
    }, {
      users: 'array'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });
});
