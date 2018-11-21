if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('gte validation rule', function() {
  it('should fail when value is too small.', function() {
    var validator = new Validator({
      age: 1,
      bar: 2
    }, {
      age: 'gt:bar'
    });
    expect(validator.passes()).to.be.false;
  });

  it('should pass when value is bigger', function() {
    var validator = new Validator({
      age: 3,
      bar: 2
    }, {
      age: 'gte:bar'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass when value is equal', function() {
    var validator = new Validator({
      age: 2,
      bar: 2
    }, {
      age: 'gte:bar'
    });
    expect(validator.passes()).to.be.true;
  });

});
