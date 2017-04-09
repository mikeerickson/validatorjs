if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('after rule', function() {
  it('should fail when the comparing attribute are smaller ', function() {
    var validator = new Validator({
      date: 807921500000,
      date2: 807926500000,
    },{
      date2: 'after:date'
    });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('date2')).to.equal('The date2 must be after the date.');
  });

  it('should fail when the comparing attribute are equal', function() {
    var validator = new Validator({
      date: 807921500000,
      date2: 807921500000,
    },{
      date2: 'after:date'
    });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('date2')).to.equal('The date2 must be after the date.');
  });

  it('should pass when the comparing attribute are greather', function() {
    var validator = new Validator({
      date: 807926500000,
      date2: 807921500000,
    },{
      date2: 'after:date'
    });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });
});
