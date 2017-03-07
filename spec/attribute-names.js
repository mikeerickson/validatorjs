if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('custom attribute names', function() {
  it('should allow custom attribute names', function() {
    var validator = new Validator({
      name: ''
    }, {
      name: 'required'
    });
    validator.setAttributeNames({
      name: 'custom_name'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required.');
  });
});
