if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('sometimes validation pass rules', function() {
  it('should pass when the property is passed with data', function() {
    var validator = new Validator({
      firstname: 'Johnny',
      lastname: 'Appleseed'
    }, {
      firstname: 'required',
      lastname: 'required|sometimes'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass when the property is not passed with data', function() {
    var validator = new Validator({
      firstname: 'Johnny'
    }, {
      firstname: 'required',
      lastname: 'required|sometimes'
    });
    expect(validator.passes()).to.be.true;
  });
});
