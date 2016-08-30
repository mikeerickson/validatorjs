if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('wildcard validation rule for items in an array', function() {
  it('items with required properties should pass with wildcard rule', function() {
    var validator = new Validator({
      id: '12,500.00',
      addresses: [
          {street: '123'},
          {street: 'sadfa'}
      ]

    }, {
      'addresses.*.street': 'required'
      
    });
    expect(validator.check()).to.be.true;    
  });

  it('items with required properties should fail with one missing wildcard rule', function() {
    var validator = new Validator({
      id: '12,500.00',
      addresses: [
          {street: '123'},
          {street: ''}
      ]
    }, {
      'addresses.*.street': 'required'      
    });
    expect(validator.check()).to.be.false;

    var errors = validator.errors.all();
    expect(Object.keys(errors).length).to.be.equal(1);
    var firstProperty = Object.keys(errors)[0];
    expect(firstProperty).to.be.equal('addresses.1.street'); 
  });

  it('items with required properties should fail with two missing wildcard rule', function() {
    var validator = new Validator({
      id: '12,500.00',
      addresses: [
          {street: ''},
          {street: ''}
      ]
    }, {
      'addresses.*.street': 'required'      
    });
    expect(validator.check()).to.be.false;

    var errors = validator.errors.all();
    expect(Object.keys(errors).length).to.be.equal(2);

    var firstProperty = Object.keys(errors)[0];
    expect(firstProperty).to.be.equal('addresses.0.street');
    firstProperty = Object.keys(errors)[1];
    expect(firstProperty).to.be.equal('addresses.1.street'); 
  });

  it('items with required properties should fail with one missing wildcard rule, inside an embedded array requirements', function() {
    var validator = new Validator({
      id: '12,500.00',
      addresses: [
          {street: '',
          phones: [{
            home: '',
            work: '123'
          },
          {
            home: '345',
            work: '125'
          }]
        },
          {street: '',
          phones:[]}
      ]
    }, {
      'addresses.*.phones.*.home': 'required'      
    });
    expect(validator.check()).to.be.false;

    var errors = validator.errors.all();

    expect(Object.keys(errors).length).to.be.equal(1);

    var firstProperty = Object.keys(errors)[0];
    expect(firstProperty).to.be.equal('addresses.0.phones.0.home');
     
  });

  it('items with required properties should fail with one missing wildcard rule, inside an embedded array requirements, in a required_if', function() {
    var validator = new Validator({
      id: '12,500.00',
      addresses: [
          {street: '',
          phones: [{
            home: '',
            work: '123',
            requireHome: 'true'
          },
          {
            home: '345',
            work: '125',
            requireHome: 'false'
          }]
        },
          {street: '',
          phones:[]}
      ]
    }, {
      'addresses.*.phones.*.home': 'required_if:addresses.*.phones.*.requireHome,true'           
    });
    expect(validator.check()).to.be.false;

    var errors = validator.errors.all();

    expect(Object.keys(errors).length).to.be.equal(1);

    var firstProperty = Object.keys(errors)[0];
    expect(firstProperty).to.be.equal('addresses.0.phones.0.home');
     
  });

});
