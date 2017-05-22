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
      '1995-08-09T00:00:00.000Z',
      (new Date())
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

  it('should pass for correct date formats', function() {
    var validator;

    validator = new Validator({passingDate: 'Friday, March 17 2017'}, {passingDate: 'date'});
    expect(validator.passes()).to.be.true;

    validator = new Validator({passingDate: '2017-03-18'}, {passingDate: 'date'});
    expect(validator.passes()).to.be.true;

    validator = new Validator({passingDate: '2017-03-18'}, {passingDate: 'date'});
    expect(validator.passes()).to.be.true;

    validator = new Validator({passingDate: '2017.03.18'}, {passingDate: 'date'});
    expect(validator.passes()).to.be.true;

    validator = new Validator({passingDate: '2017-03-31'}, {passingDate: 'date'});
    expect(validator.passes()).to.be.true;

  });

  it('should fail for incorrect date formats', function() {

    var validator;

    validator = new Validator({failDate: '2014-25-23'}, {failDate: 'date'});
    expect(validator.fails()).to.be.true;

    validator = new Validator({failDate: 'foo-bar'}, {failDate: 'date'});
    expect(validator.fails()).to.be.true;

    validator = new Validator({failDate: '0908 1995'}, {failDate: 'date'});
    expect(validator.fails()).to.be.true;

    validator = new Validator({failDate: '9/39/19'}, {failDate: 'date'});
    expect(validator.fails()).to.be.true;

  });
});
