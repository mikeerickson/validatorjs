const { Validator, expect } = require("./setup.js");

describe("hex validation rule", function() {
  it("should fail with incorrect hexadecimal values", function() {
    const validator = new Validator({ color: "4d4b8z" }, { color: "hex" });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should pass for valid hexadecimal values ", function() {
    const validator = new Validator(
      { mongoId: "54759eb3c090d83494e2d804", symbolStr: "0", symbolNum: 0, str: "a" },
      { color: "hex", mongoId: "hex", symbolStr: "hex", symbolNum: "hex", str: "hex" }
    );

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an empty value", function() {
    const validator = new Validator({ olor: "", mongoId: "" }, { color: "hex", mongoId: "hex" });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an undefined value", function() {
    const validator = new Validator({}, { color: "hex", mongoId: "hex" });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });
});
