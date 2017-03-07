if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('url validation rule', function() {
  it('should fail with a url only containing http://', function() {
    var link = 'http://';
    var validator = new Validator({
      link: link
    }, {
      link: 'url'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it('should pass with a url starting with http:// followed by 1 or more characters', function() {
    var link = 'http://g';
    var validator = new Validator({
      link: link
    }, {
      link: 'url'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with an https url', function() {
    var link = 'https://google.com';
    var validator = new Validator({
      link: link
    }, {
      link: 'url'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with an empty value', function() {
    var validator = new Validator({
      link: ''
    }, {
      link: 'url'
    });
    expect(validator.passes()).to.be.true;
  });

  it('should pass with an undefined value', function() {
    var validator = new Validator({}, {
      link: 'url'
    });
    expect(validator.passes()).to.be.true;
  });
});
