const { Validator, expect } = require("./setup.js");

describe("digits rule", function() {
  it("should be numeric and must have an exact length of 5", function() {
    const validation = new Validator({ zip: "90989" }, { zip: "digits:5" });

    expect(validation.passes()).to.be.true;
    expect(validation.fails()).to.be.false;
  });

  it("should not pass if non-digits are present", function() {
    const validation = new Validator({ zip: "9098a" }, { zip: "digits:5" });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first("zip")).to.equal("The zip must be 5 digits.");
    expect(validation.passes()).to.be.false;
  });

  it('should not pass if spaces are present', function() {
    var validation = new Validator({
      zip: '9098 '
    }, {
      zip: 'digits:5'
    });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first('zip')).to.equal('The zip must be 5 digits.');
    expect(validation.passes()).to.be.false;

    var validation = new Validator({
      zip: ' 9098'
    }, {
      zip: 'digits:5'
    });

    expect(validation.fails()).to.be.true;
    expect(validation.errors.first('zip')).to.equal('The zip must be 5 digits.');
    expect(validation.passes()).to.be.false;
  });
});
