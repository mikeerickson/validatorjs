if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('Error counts', function() {
  it('should return 0 when validation has not yet run', function() {
    var validator = new Validator({
      username: ''
    }, {
      username: 'required'
    });
    expect(validator.errorCount).to.equal(0);
  });

  it('should return a count when there are errors', function() {
    var validator = new Validator({
      username: '',
      name: ''
    }, {
      username: 'required',
      name: 'required'
    });
    expect(validator.passes()).to.be.false;
    expect(validator.errorCount).to.equal(2);
  });

  it('should not return a count when error free', function() {
    var validator = new Validator({
      username: 'a',
      name: 'a'
    }, {
      username: 'required',
      name: 'required'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.errorCount).to.equal(0);
  });
});
