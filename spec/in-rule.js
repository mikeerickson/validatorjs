if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('in validation rule', function() {
  it('should fail when the value is not in the set of comma separated values', function() {
    var validator = new Validator({
      state: 'fakeState',
    }, {
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('state')).to.equal('The selected state is invalid.');
  });

  it('should pass when the value is in the set of comma separated values', function() {
    var validator = new Validator({
      state: 'CA'
    }, {
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when the value is undefined', function() {
    var validator = new Validator({}, {
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when the value is an empty string', function() {
    var validator = new Validator({
      state: ''
    }, {
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when the numeric value is not in the set of comma separated values', function() {
    var validator = new Validator({
      quantity: 10
    }, {
      quantity: 'in:0,1,2'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('quantity')).to.equal('The selected quantity is invalid.');
  });

  it('should pass when the value is in the set of comma separated values', function() {
    var validator = new Validator({
      quantity: 1
    }, {
      quantity: 'in:0,1,2'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when all values are present', function() {
    var validator = new Validator({
      fruits: ['apple', 'strawberry']
    }, {
      fruits: 'array|in:apple,strawberry,kiwi'
    });

    expect(validator.passes()).to.be.true;
  });

  it('should fail when not all values are present', function() {
    var validator = new Validator({
      fruits: ['strawberry', 'kiwi']
    }, {
      fruits: 'array|in:apple,strawberry'
    });

    expect(validator.passes()).to.be.false;
  });
});
