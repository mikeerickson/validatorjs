const { Validator, expect } = require("./setup.js");

describe("alpha_dash validation rule", function() {
  it("should fail with non alpha dash characters", function() {
    const validator = new Validator({ name: "David *" }, { name: "alpha_dash" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });

  it("should fail with non-alphabetic characters", function() {
    const validator = new Validator({ name: 12 }, { name: "alpha_dash" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with only alpha dash characters", function() {
    const validator = new Validator({ name: "David9_-" }, { name: "alpha_dash" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the field is blank / optional", function() {
    const validator = new Validator({ name: "" }, { name: "alpha_dash" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field does not exist", function() {
    const validator = new Validator({}, { name: "alpha_dash" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
