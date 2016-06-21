if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('nested validation rules', function() {
  var nestedObject = {
    name: 'required',
    data: {
      weight: 'required',
      hair: {
        color: 'required'
      }
    }
  };

  var nestedFlatten = {
    name: 'required',
    'data.weight': 'required',
    'data.hair.color': 'required'
  };

  var dataPass = {
    name: 'David',
    data: {
      weight: 70,
      hair: {
        color: 'black'
      }
    }
  };

  var failAsserts = [
    [{}, {
      name: 'The name field is required.',
      'data.weight': 'The data.weight field is required.',
      'data.hair.color': 'The data.hair.color field is required.'
    }],
    [{ name: 'David' }, {
      'data.weight': 'The data.weight field is required.',
      'data.hair.color': 'The data.hair.color field is required.'
    }],
    [{ data: { weight: 70 } }, {
      name: 'The name field is required.',
      'data.hair.color': 'The data.hair.color field is required.'
    }],
    [{ data: { hair: { color: 'black' } } }, {
      name: 'The name field is required.',
      'data.weight': 'The data.weight field is required.'
    }]
  ];

  it('should pass with validation rules nested object', function() {
    var validator = new Validator(dataPass, nestedObject);
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail with validation rules nested object', function() {
    failAsserts.forEach(function (assert) {
      var validator = new Validator(assert[0], nestedObject);
      expect(validator.passes()).to.be.false;
      expect(validator.fails()).to.be.true;
      Object.keys(assert[1]).forEach(function (key) {
        expect(validator.errors.first(key)).to.equal(assert[1][key]);
      });
    });
  });

  it('should pass with validation rules flatten object', function() {
    var validator = new Validator(dataPass, nestedFlatten);
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail with validation rules flatten object', function() {
    failAsserts.forEach(function (assert) {
      var validator = new Validator(assert[0], nestedFlatten);
      expect(validator.passes()).to.be.false;
      expect(validator.fails()).to.be.true;
      Object.keys(assert[1]).forEach(function (key) {
        expect(validator.errors.first(key)).to.equal(assert[1][key]);
      });
    });
  });
}); // Page constructor
