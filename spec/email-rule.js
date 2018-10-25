if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('email validation rule', function() {
  it('should pass with the email address: johndoe@gmail.com', function() {
    var validator = new Validator({
      email: 'johndoe@gmail.com'
    }, {
      email: 'email'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should fail with the email address: johndoe.gmail.com', function() {
    var validator = new Validator({
      email: 'johndoe.gmail.com'
    }, {
      email: 'email'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail with the email address: johndoe@gmail', function() {
    var validator = new Validator({
      email: 'johndoe@gmail'
    }, {
      email: 'email'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should fail when the email address contains whitespace only and is required', function() {
    var validator = new Validator({
      email: '   '
    }, {
      email: 'required|email'
    });
    expect(validator.fails()).to.be.true;
  });

  it('should pass when the field is an empty string', function() {
    var validator = new Validator({
      email: ''
    }, {
      email: 'email'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass when the field does not exist', function() {
    var validator = new Validator({}, {
      email: 'email'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass with first.last@example.com', function() {
    var validator = new Validator({
      email: 'first.last@example.com'
    }, {
      email: 'email'
    });

    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
