if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('different validation rule', function() {
  it('should fail when the 2 attributes are the same', function() {
    var validator = new Validator({
      field1: 'abc',
      field2: 'abc'
    }, {
      field2: 'different:field1'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });

  it('should pass when the 2 attributes are different', function() {
    var validator = new Validator({
      field1: 'abc',
      field2: 'abcd'
    }, {
      field2: 'different:field1'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass if one of the 2 attributes is a nested path', function() {
    var validator = new Validator({
      payload: {
        pw: 'abc123',
        username: 'test123',
      },
      username: 'test',
    }, {
      username: 'different:payload.username'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail if one of the 2 attributes is an invalid nested path', function() {
    var validator = new Validator({
      payload: {
        pw: 'abc123',
        username: 'test123',
      },
      username: 'test123',
    }, {
      username: 'different:payload.username'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('username')).to.equal('The username and payload.username must be different.');
  });
});
