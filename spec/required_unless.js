const { Validator, expect } = require("./setup.js");

describe("required unless", function() {
  it("should fail", function() {
    const validator = new Validator({ desert: "icecream", flavour: "" }, { flavour: "required_unless:desert,cake" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("flavour")).to.equal("The flavour field is required when desert is not cake.");
  });

  it("should pass", function() {
    const validator = new Validator(
      { desert: "icecream", flavour: "chocolate" },
      { flavour: "required_unless:desert,cake" }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
