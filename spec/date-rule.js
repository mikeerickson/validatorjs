if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('date rule', function() {
  it('should pass for correct, parsable date format', function() {
    var asserts = [
      807926400000,
      'Aug 9, 1995',
      'Wed, 09 Aug 1995 00:00:00 GMT',
      'Wed, 09 Aug 1995 00:00:00',
      '1995-08-09',
      '1995-08-09T00:00:00+00:00',
      '1995-08-09T00:00:00Z',
      '1995-08-09T00:00:00.000Z'
    ];

    asserts.forEach(function (assert) {
      var validator = new Validator({
        date: assert
      }, {
        date: 'date'
      });
      expect(validator.passes()).to.be.true;
      expect(validator.fails()).to.be.false;
    });
  });

  it('should fail for incorrect date format', function() {
    var asserts = [
      807926400,
      '2014-25-23',
      'foo-bar',
      '0908 1995'
    ];

    asserts.forEach(function (assert) {
      var validator = new Validator({
        date: assert
      }, {
        date: 'date'
      });
      expect(validator.passes()).to.be.false;
      expect(validator.fails()).to.be.true;
    });
  });
});
