if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('Validator custom messages', function() {
  it('override the default message for the validator', function() {
    var validator = new Validator({
      name: ''
    }, {
      name: 'required'
    }, {
      required: 'Name is missing.'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('name').length).to.equal(1);
    expect(validator.errors.first('name')).to.equal('Name is missing.');
  });

  it('override the default message for a type of the validator', function() {
    var validator = new Validator({
      name: 'A'
    }, {
      name: 'min:4'
    }, {
      min: {
        string: ':attribute is not long enough. Should be :min.'
      }
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('name').length).to.equal(1);
    expect(validator.errors.first('name')).to.equal('name is not long enough. Should be 4.');
  });

  it('override the default message for the validator with several :attribute in message', function() {
    var validator = new Validator({
      name: ''
    }, {
      name: 'required'
    }, {
      required: ':attribute is required. :attribute can\'t be empty.'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('name').length).to.equal(1);
    expect(validator.errors.first('name')).to.equal('name is required. name can\'t be empty.');
  });

  it('override the default message for a type of the validator', function() {
    var validator = new Validator({
      name: 'A'
    }, {
      name: 'min:4'
    }, {
      min: {
        string: ':attribute is not long enough. Should be :min.'
      }
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('name').length).to.equal(1);
    expect(validator.errors.first('name')).to.equal('name is not long enough. Should be 4.');
  });

  it('override the default message for a type of the validator with several :attribute and :min in message', function() {
    var validator = new Validator({
      name: 'A'
    }, {
      name: 'min:4'
    }, {
      min: {
        string: ':attribute is not long enough. :attribute should be :min. Because needed string with :min symbols or more.'
      }
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('name').length).to.equal(1);
    expect(validator.errors.first('name')).to.equal('name is not long enough. name should be 4. Because needed string with 4 symbols or more.');
  });

  it('can be specified on a per attribute basis for a validator', function() {
    var validator = new Validator({
      name: '',
      email: ''
    }, {
      name: 'required',
      email: 'required'
    }, {
      'required.name': 'Name is missing.'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('name').length).to.equal(1);
    expect(validator.errors.first('name')).to.equal('Name is missing.');
    expect(validator.errors.get('email').length).to.equal(1);
    expect(validator.errors.first('email')).to.equal('The email field is required.');
  });

  it('can be specified for custom validators', function() {
    Validator.register('telephone', function(value, requirement, attribute) {
      return value.match(/^\d{3}-\d{3}-\d{4}$/);
    }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

    var validator = new Validator({
      phone: '1234567890'
    }, {
      phone: 'telephone'
    }, {
      telephone: 'Wrong number.'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('phone').length).to.equal(1);
    expect(validator.errors.first('phone')).to.equal('Wrong number.');
  });

  it('can be specified for custom validators per attribute', function() {
    Validator.register('telephone', function(value, requirement, attribute) {
      return value.match(/^\d{3}-\d{3}-\d{4}$/);
    }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

    var validator = new Validator({
      phone: '1234567890',
      fax: '1234567890'
    }, {
      phone: 'telephone',
      fax: 'telephone'
    }, {
      'telephone.fax': 'Why are you even using a fax?'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.get('phone').length).to.equal(1);
    expect(validator.errors.first('phone')).to.equal('The phone phone number is not in the format XXX-XXX-XXXX.');
    expect(validator.errors.get('fax').length).to.equal(1);
    expect(validator.errors.first('fax')).to.equal('Why are you even using a fax?');
  });
});
