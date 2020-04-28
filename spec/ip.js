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

    it('should fail on non string input', function () {
      var validator = new Validator({
        ipAddr: 1234
      }, {
        ipAddr: 'ipv4'
      });
      expect(validator.passes()).to.be.false;
    });
  });

  describe('IPv6 Validation rule', function () {
    it('should pass normal ipv6 address ', function () {
      var validator = new Validator({
        ipAddr: '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should pass normal ipv6 address with ommited zeros', function () {
      var validator = new Validator({
        ipAddr: '2001:0db8:85a3:0:0:8a2e:0370:7334'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should pass max ipv6 address', function () {
      var validator = new Validator({
        ipAddr: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should pass ipv6 address with ommiting section of zeros', function () {
      var validator = new Validator({
        ipAddr: '2001:db8::ff00:42:8329'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should pass ipv6 address of localhost', function () {
      var validator = new Validator({
        ipAddr: '::1'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should pass ipv6 input with 7 hextets and ending omitting sector', function () {
      var validator = new Validator({
        ipAddr: '1:2:3:4:5:6:7::'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should pass ipv6 input with 7 hextets and leading omitting sector', function () {
      var validator = new Validator({
        ipAddr: '::2:3:4:5:6:7:8'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.true;
    });

    it('should fail on ipv4 address', function () {
      var validator = new Validator({
        ipAddr: '192.168.33.10'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail on ipv6 address with more than 8 sectors', function () {
      var validator = new Validator({
        ipAddr: '2001:0db8:85a3:1234:5349:8a2e:0370:7334:1234'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail on ipv6 address with less than 2 sectors', function () {
      var validator = new Validator({
        ipAddr: ':2000'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail on ipv6 address with bigger values in octet than ffff', function () {
      var validator = new Validator({
        ipAddr: '2001:0db8:85a3:1234:123456789:8a2e:0370:7334'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail on ipv6 address when consecutive ommiting sections occure', function () {
      var validator = new Validator({
        ipAddr: '234::123::23'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail on non string input', function () {
      var validator = new Validator({
        ipAddr: 1234
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail on ipv6 input with less then 8 hextets and no omitting sector', function () {
      var validator = new Validator({
        ipAddr: '2001:0db8:85a3:9876:1234:8a2e'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ipv6 input with 8 hextets and one omitting sector', function () {
      var validator = new Validator({
        ipAddr: '1:2:3:4:5::6:7:8'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });

    it('should fail ipv6 starting with one colon', function () {
      var validator = new Validator({
        ipAddr: ':1:2:3:4:5:6:7'
      }, {
        ipAddr: 'ipv6'
      });
      expect(validator.passes()).to.be.false;
    });
  });
});
