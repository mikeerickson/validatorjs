if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('not_in validation rule', function() {
  it('should fail the value is in the set of comma separated values', function() {
    var validator = new Validator({
      username: 'skaterdav85'
    }, {
      username: 'not_in:skaterdav85,dtang,dtang85'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('username')).to.equal('The selected username is invalid.');
  });

  it('should pass when the value is not in the set of comma separated values', function() {
    var validator = new Validator({
      username: 'skatedav85'
    }, {
      username: 'not_in:user1,user2,user3'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when the numeric value is in the set of comma separated values', function() {
    var validator = new Validator({
      id: 1
    }, {
      id: 'not_in:0,1,2'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('id')).to.equal('The selected id is invalid.');
  });

  it('should pass when the value is not in the set of comma separated values', function() {
    var validator = new Validator({
      id: 10
    }, {
      id: 'not_in:0,1,2'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when the value is undefined', function() {
    var validator = new Validator({}, {
      country: 'not_in:China,Spain,France'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when the value is an empty string', function() {
    var validator = new Validator({
      country: ''
    }, {
      country: 'not_in:China,Spain,France'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
