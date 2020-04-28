if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('IP Validation rules', function () {

  describe('IPv4 Validation rule', function () {
    it('should accept localhost ipv4 addres', function () {
      var validator = new Validator({
        ipAddr: '127.0.0.1'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should accept maximum ip range ', function () {
      var validator = new Validator({
        ipAddr: '255.255.255.255'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should accept random ip address withing range ', function () {
      var validator = new Validator({
        ipAddr: '192.168.33.10'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should fail ip address containing non integer octants', function () {
      var validator = new Validator({
        ipAddr: '192.fail.33.10'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ip address containing non integer octants', function () {
      var validator = new Validator({
        ipAddr: '192.fail.33.10'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ip address more than 4 octants', function () {
      var validator = new Validator({
        ipAddr: '192.168.33.10.10'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ip address less than 4 octants', function () {
      var validator = new Validator({
        ipAddr: '192.168.10'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ip address which contains octant values more than 255', function () {
      var validator = new Validator({
        ipAddr: '256.168.10.0'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ip address which contains empty octants', function () {
      var validator = new Validator({
        ipAddr: '256...0'
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });
  });

  describe('IPv6 Validation rule', function () {
  });
});
