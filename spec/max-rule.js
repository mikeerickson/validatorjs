if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('max validation rule', function() {
  it('should fail with the name "David". Maximum size is 3 letters.', function() {
    var validator = new Validator({
      name: 'David'
    }, {
      name: 'max:3'
    });
    expect(validator.passes()).to.be.false;
  });

  it('should pass with the name "David". Maximum size is 5 letters.', function() {
    var validator = new Validator({
      name: 'Da'
    }, {
      name: 'max:5'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should fail with the age "18". Max is 12.', function() {
    var validator = new Validator({
      age: 18
    }, {
      age: 'max:12'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should pass with the age "12". Max is 12.', function() {
    var validator = new Validator({
      age: 12
    }, {
      age: 'max:12'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should fail with boolean true value', function() {
    var validator = new Validator({
      val: true
    }, {
      val: 'max:5'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with boolean false value', function() {
    var validator = new Validator({
      val: false
    }, {
      val: 'max:5'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should pass when the age is 0', function() {
    var validator = new Validator({
      age: 0
    }, {
      age: 'max:2'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when the field is an empty string', function() {
    var validator = new Validator({
      email: ''
    }, {
      email: 'max:2'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when the field does not exist', function() {
    var validator = new Validator({}, {
      email: 'max:2'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when given string-integer value', function() {
    var validator = new Validator({
      val: '18'
    }, {
      val: 'integer|max:16'
    });
    expect(validator.passes()).to.be.false;
  });

  it('should fail when given string-float value', function() {
    var validator = new Validator({
      val: '17.56'
    }, {
      val: 'numeric|max:17.5'
    });
    expect(validator.passes()).to.be.false;
  });
});
