const { Validator, expect } = require("./setup.js");

describe("alpha validation rule", function() {
  it("should fail with non-alphabetic characters", function() {
    const validator = new Validator({ name: "12" }, { name: "alpha" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with non-alphabetic characters", function() {
    const validator = new Validator({ name: 12 }, { name: "alpha" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should pass with only alphabetic characters", function() {
    const validator = new Validator({ name: "abc" }, { name: "alpha" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field is an empty string", function() {
    const validator = new Validator({ name: "" }, { name: "alpha" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field does not exist", function() {
    const validator = new Validator({}, { name: "alpha" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
