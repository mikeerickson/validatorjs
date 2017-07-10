if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('register a custom validation rule', function() {
  it('should be able to get validation rule', function() {
    Validator.register('telephone', function(val) {
      return val.match(/^\d{3}-\d{3}-\d{4}$/);
    });

    var validator = new Validator();
    expect(validator.getRule('telephone').validate).to.be.a.function;
  });

  it('should pass the custom telephone rule registration', function() {
    Validator.register('telephone', function(val) {
      return val.match(/^\d{3}-\d{3}-\d{4}$/);
    });

    var validator = new Validator({
      phone: '213-454-9988'
    }, {
      phone: 'telephone'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should override custom rules', function() {
    Validator.register('string', function(val) {
      return true;
    });

    var validator = new Validator({
      field: ['not a string']
    }, {
      field: 'string'
    });

    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
    Validator.register('string', function(val) {
      return typeof val === 'string';
    }, 'The :attribute must be a string.');
  });

  it('should throw error in case of unknown validator rule', function () {
    var validator = new Validator({
      field: 'test'
    }, {
      field: 'unknown'
    });

    expect(validator.passes).to.throw();
    expect(validator.fails).to.throw();
  });

  it('should allow to add custom validator to unknown validator rules', function () {
    Validator.registerMissedRuleValidator(function() {
      return true;
    });

      var validator = new Validator({
          field: 'test'
      }, {
          field: 'unknown'
      });

      expect(validator.passes()).to.be.true;
      expect(validator.fails()).to.be.false;
  });
});
