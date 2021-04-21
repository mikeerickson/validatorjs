const { Validator, expect } = require("./setup.js");

describe("alpha_space validation rule", function() {
  it("should fail with non alphabetic-space characters", function() {
    const validator = new Validator({ name: "Daniel_." }, { name: "alpha_space" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });

  it("should fail with non-alphabetic characters", function() {
    const validator = new Validator({ name: 12 }, { name: "alpha_space" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with only alphabetic-space characters", function() {
    const validator = new Validator({ name: "Daniel Naranjo" }, { name: "alpha_space" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the field is blank / optional", function() {
    const validator = new Validator({ name: "" }, { name: "alpha_space" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field does not exist", function() {
    const validator = new Validator({}, { name: "alpha_space" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
