if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('same validation rule', function() {
  it('should fail when the 2 attributes are different', function() {
    var validator = new Validator({
      pw: 'abc123',
      pw2: 'abc1234'
    }, {
      pw2: 'same:pw'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('pw2')).to.equal('The pw2 and pw fields must match.');
  });

  it('should fail when the the comparing attribute doesnt exist', function() {
    var validator = new Validator({
      pw2: 'abc1234'
    }, {
      pw2: 'same:pw'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('pw2')).to.equal('The pw2 and pw fields must match.');
  });

  it('should pass when the 2 attributes are equal', function() {
    var validator = new Validator({
      pw: 'abc123',
      pw2: 'abc123'
    }, {
      pw2: 'same:pw'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass if one of the 2 attributes is a nested path', function() {
    var validator = new Validator({
      payload: {
        pw: 'abc123',
        username: 'test',
      },
      username: 'test',
    }, {
      username: 'same:payload.username'
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
      username: 'test',
    }, {
      username: 'same:payload.username'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('username')).to.equal('The username and payload.username fields must match.');
  });
});
