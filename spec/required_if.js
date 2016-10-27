if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required if', function() {
  it('should fail when text input has value', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: ''
    }, {
      flavour: 'required_if:desert,icecream'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is icecream.');
  });

  it('should pass when text input has value', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,icecream'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass when text input input value is different than condition value', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: ''
    }, {
      flavour: 'required_if:desert,fries'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  }); 

  it('should fail when input value is true', function() {
    var validator = new Validator({
      desert: true,
      flavour: ''
    }, {
      flavour: 'required_if:desert,true'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is true.');
  })

  it('should pass when input value is true', function() {
    var validator = new Validator({
      desert: true,
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,true'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when input value is false', function() {
    var validator = new Validator({
      desert: false,
      flavour: ''
    }, {
      flavour: 'required_if:desert,false'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is false.');
  });

  it('should pass when input value is true', function() {
    var validator = new Validator({
      desert: false,
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,false'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when input is numeric (100)', function() {
    var validator = new Validator({
      desert: 100,
      flavour: ''
    }, {
      flavour: 'required_if:desert,100'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is 100.');
  });

  it('should pass when input is numeric (100)', function() {
    var validator = new Validator({
      desert: 100,
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,100'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  }); 

  it('should fail when input is numeric (-5)', function() {
    var validator = new Validator({
      desert: -5,
      flavour: ''
    }, {
      flavour: 'required_if:desert,-5'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is -5.');
  });

  it('should pass when input is numeric (-5)', function() {
    var validator = new Validator({
      desert: -5,
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,-5'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should fail when value does not match any condition in array', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: ''
    }, {
      flavour: 'required_if:desert,pie,icecream,cake'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is pie, icecream, cake.');
  });

  it('should pass when value matches a condition in array', function() {
    var validator = new Validator({
      desert: 'icecream',
      flavour: 'chocolate'
    }, {
      flavour: 'required_if:desert,pie,icecream,cake'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  }); 
});
