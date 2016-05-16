if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('numeric validation rule', function() {
  it('should pass with a numeric value', function() {
    var validator = new Validator({
      age: 44
    }, {
      age: 'numeric'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with a decimal numeric value', function() {
    var validator = new Validator({
      measurement: 0.5454
    }, {
      measurement: 'numeric'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with a string numeric value', function() {
    var validator = new Validator({
      age: '44'
    }, {
      age: 'numeric'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with a string decimal numeric value', function() {
    var validator = new Validator({
      measurement: '0.5454'
    }, {
      measurement: 'numeric'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should fail with a string value', function() {
    var validator = new Validator({
      age: '18something'
    }, {
      age: 'numeric'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with a boolean true value', function() {
    var validator = new Validator({
      age: true
    }, {
      age: 'numeric'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with a boolean false value', function() {
    var validator = new Validator({
      age: false
    }, {
      age: 'numeric'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should pass with no value', function() {
    var validator = new Validator({}, {
      age: 'numeric'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass with an empty string value', function() {
    var validator = new Validator({
      age: ''
    }, {
      age: 'numeric'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
