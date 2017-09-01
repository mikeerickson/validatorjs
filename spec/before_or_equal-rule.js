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

  it('should fail when the comparing attribute doesnt exist', function() {
    var validator = new Validator({
      date2: '1995-08-09',
    },{
      date2: 'before_or_equal:date'
    });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('date2')).to.equal('The date2 must be equal or before date.');
  });

  it('should fail if one of the 2 date is an invalid nested path', function() {
    var validator = new Validator({
      payload: {
        name: 'abc123',
        date: '1995-08-09'
      },
      date2: '1996-12-09',
    }, {
      date2: 'before_or_equal:payload.date'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('date2')).to.equal('The date2 must be equal or before payload.date.');
  });

  it('should fail if one of the 2 date is a invalid nested path with wildcards rule', function(){
    var validator = new Validator({
      payloads: [{
        name: 'abc123',
        date: '1995-08-09',
        date2: '1996-12-09',
      }],
    }, {
      'payloads.*.date2': 'before_or_equal:payloads.*.date'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('payloads.0.date2')).to.equal('The payloads.0.date2 must be equal or before payloads.0.date.');
  });

  it('should pass if one of the 2 dates is a nested path and smaller', function() {
    var validator = new Validator({
      payload: {
        name: 'abc123',
        date: '1995-08-09'
      },
      date2: '1994-12-09',
    }, {
      date2: 'before_or_equal:payload.date'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass if one of the 2 date is a nested path, date2 issmaller and rules are wildcards', function(){
    var validator = new Validator({
      payloads: [{
        name: 'abc123',
        date: '1995-08-09',
        date2: '1994-08-09',
      }],
    }, {
      'payloads.*.date2': 'before_or_equal:payloads.*.date'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

});
