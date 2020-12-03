const { Validator, expect } = require("./setup.js");

describe("boolean validation rule", function() {
  it("should pass with a boolean value", function() {
    const validator = new Validator({ isHappy: true }, { isHappy: "boolean" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass with a decimal boolean value", function() {
    const validator = new Validator({ isHappy: 1, isSad: 0 }, { isHappy: "boolean", isSad: "boolean" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass with a string boolean value", function() {
    const validator = new Validator(
      { firstOne: "true", secondOne: "false", thirdOne: "0", fourthOne: "1" },
      { firstOne: "boolean", secondOne: "boolean", thirdOne: "boolean", fourthOne: "boolean" }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail with an incorrect string value", function() {
    const validator = new Validator({ firstOne: "truee" }, { firstOne: "boolean" });
    expect(validator.fails()).to.be.true;
  });

  it("should pass with no value", function() {
    const validator = new Validator({}, { age: "boolean" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass with an empty string value", function() {
    const validator = new Validator({ age: "" }, { age: "boolean" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
