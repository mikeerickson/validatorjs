if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('before or equal rule', function() {
  it('should fail when the comparing attribute are smaller', function() {
    var validator = new Validator({
      date: '1994-12-09',
      date2: '1998-08-09',
    },{
      date2: 'before_or_equal:date'
    });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('date2')).to.equal('The date2 must be equal or before date.');
  });

  it('should pass when the comparing attribute are equal', function() {
    var validator = new Validator({
      date: '1994-12-09',
      date2: '1994-12-09',
    },{
      date2: 'before_or_equal:date'
    });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it('should pass when the comparing attribute are greather', function() {
    var validator = new Validator({
      date: '1998-08-09',
      date2: '1994-12-09',
    },{
      date2: 'before_or_equal:date'
    });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });
});
