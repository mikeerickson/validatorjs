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

  it('should use custom attribute names for replacements in required_if rule', function() {
    var validator = new Validator({
      name: '',
      req: 'is_required'
    }, {
      name: 'required_if:req,is_required'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      req: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required when other_field is is_required.');
  });

  it('should use custom attribute names for replacements in required_unless rule', function() {
    var validator = new Validator({
      name: '',
      req: 'not_required'
    }, {
      name: 'required_unless:req,is_required'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      req: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required when other_field is not is_required.');
  });

  it('should use custom attribute names for replacements in required_with rule', function() {
    var validator = new Validator({
      name: '',
      req: true
    }, {
      name: 'required_with:req'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      req: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required when other_field is not empty.');
  });

  it('should use custom attribute names for replacements in required_with_all rule', function() {
    var validator = new Validator({
      name: '',
      req1: true,
      req2: true
    }, {
      name: 'required_with_all:req1,req2'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      req1: 'other_field_1',
      req2: 'other_field_2'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required when other_field_1, other_field_2 are not empty.');
  });

  it('should use custom attribute names for replacements in required_without rule', function() {
    var validator = new Validator({
      name: '',
    }, {
      name: 'required_without:req'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      req: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required when other_field is empty.');
  });

  it('should use custom attribute names for replacements in required_without_all rule', function() {
    var validator = new Validator({
      name: '',
    }, {
      name: 'required_without_all:req1,req2'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      req1: 'other_field_1',
      req2: 'other_field_2'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name field is required when other_field_1, other_field_2 are empty.');
  });

  it('should use custom attribute names for replacements in after rule', function() {
    var validator = new Validator({
      date: new Date('2017-01-01'),
      other: new Date('2017-01-02')
    }, {
      date: 'after:other'
    });
    validator.setAttributeNames({
      date: 'custom_name',
      other: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('date')).to.equal('The custom_name must be after other_field.');
  });

  it('should use custom attribute names for replacements in before rule', function() {
    var validator = new Validator({
      date: new Date('2017-01-03'),
      other: new Date('2017-01-02')
    }, {
      date: 'before:other'
    });
    validator.setAttributeNames({
      date: 'custom_name',
      other: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('date')).to.equal('The custom_name must be before other_field.');
  });

  it('should use custom attribute names for replacements in after_or_equal rule', function() {
    var validator = new Validator({
      date: new Date('2017-01-01'),
      other: new Date('2017-01-02')
    }, {
      date: 'after_or_equal:other'
    });
    validator.setAttributeNames({
      date: 'custom_name',
      other: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('date')).to.equal('The custom_name must be equal or after other_field.');
  });

  it('should use custom attribute names for replacements in before_or_equal rule', function() {
    var validator = new Validator({
      date: new Date('2017-01-03'),
      other: new Date('2017-01-02')
    }, {
      date: 'before_or_equal:other'
    });
    validator.setAttributeNames({
      date: 'custom_name',
      other: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('date')).to.equal('The custom_name must be equal or before other_field.');
  });

  it('should use custom attribute names for replacements in same rule', function() {
    var validator = new Validator({
      name: 'name',
      other: 'other'
    }, {
      name: 'same:other'
    });
    validator.setAttributeNames({
      name: 'custom_name',
      other: 'other_field'
    })
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first('name')).to.equal('The custom_name and other_field fields must match.');
  });
});
