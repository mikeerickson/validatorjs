if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('Validator constructor', function() {
  var validator;

  beforeEach(function() {
    validator = new Validator({
      name: 'David',
      email: 'johndoe@gmail.com'
    }, {
      name: 'required',
      email: 'required'
    }, {
      required: "You're missing :required"
    });
  });

  it('should expose on window if browser', function() {
    if (typeof window !== 'undefined') {
      expect(window.Validator).to.not.be.undefined;
    }
  });

  it('should have a rules property containing all the validation rules', function() {
    expect(validator.rules).to.be.a('object');
  });

  it('should have an input property containing the input data to be validated', function() {
    expect(validator.input).to.be.a('object');
  });

  it('should have a messages property containing the combined messages for validation', function() {
    expect(validator.messages).to.be.a('object');
  });

  it('should have a passes() method', function() {
    expect(validator.passes).to.be.a.function;
  });

  it('should have a fails() method', function() {
    expect(validator.fails).to.be.a.function;
  });

  it('should have a check method', function() {
    expect(validator.check).to.be.a.function;
  });

  it('should handle undefined data', function() {
    var validator = new Validator(undefined, { name: 'required' });
    validator.fails();
  });

  it('should handle null data', function() {
    var validator = new Validator(null, { name: 'required' });
    validator.fails();
  });
}); // Page constructor
