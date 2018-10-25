if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('Validator', function () {
  context('_flattenObject', function() {
    it('should correctly flatten nested object', function() {
      var asserts = [
        [undefined, {}],
        [null, {}],
        [{}, {}],
        [{ foo: null }, { foo: null }],
        [{ foo: {} }, { foo: {} }],
        [{ foo : 1 }, { foo : 1 }],
        [{ foo : [] }, { foo : [] }],
        [{ foo: { bar: 1 } }, { 'foo.bar' : 1 }],
        [{ foo: { bar: [] } }, { 'foo.bar' : [] }],
        [{ foo: { bar: { fizz: "buzz" } } }, { 'foo.bar.fizz' : "buzz" }],
        [{ foo: { bar: { fizz: ["buzz"] } } }, { 'foo.bar.fizz' : ["buzz"] }]
      ];
      var validator = new Validator({}, {});

      asserts.forEach(function (assert) {
        expect(validator._flattenObject(assert[0])).to.be.eql(assert[1]);
      });
    });
  });
}); // Page constructor
