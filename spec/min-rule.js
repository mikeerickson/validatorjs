if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('min validation rule', function() {
  it('should fail with the name "D". Minimum size is 2 letters.', function() {
    var validator = new Validator({
      name: 'D'
    }, {
      name: 'min:2'
    });
    expect(validator.passes()).to.be.false;
  });

  it('should pass with the name "Da". Minimum is 2 letters.', function() {
    var validator = new Validator({
      name: 'Da'
    }, {
      name: 'min:2'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with the age "18". Minimum is 18.', function() {
    var validator = new Validator({
      age: 18
    }, {
      age: 'min:18'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should fail with the age "17". Minimum is 18.', function() {
    var validator = new Validator({
      age: 17
    }, {
      age: 'min:18'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with value of 0.04', function() {
    var validator = new Validator({
      val: 0.04
    }, {
      val: 'min:0.05'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with boolean true value', function() {
    var validator = new Validator({
      val: true
    }, {
      val: 'min:0.05'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with boolean false value', function() {
    var validator = new Validator({
      val: false
    }, {
      val: 'min:0.05'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should pass with an undefined value', function() {
    var validator = new Validator({}, {
      val: 'min:0.05'
    });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it('should pass with an empty string value', function() {
    var validator = new Validator({
      val: ''
    }, {
      val: 'min:0.05'
    });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it('should pass when given string-integer value', function() {
    var validator = new Validator({
      val: '18'
    }, {
      val: 'integer|min:16'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass when given string-float value', function() {
    var validator = new Validator({
      val: '17.56'
    }, {
      val: 'numeric|min:17.5'
    });
    expect(validator.passes()).to.be.true;
  });
});
