if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("alpha validation rule", () => {
  it("should fail with non-alphabetic characters", () => {
    const validator = new Validator({ name: "12" }, { name: "alpha" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with non-alphabetic characters", () => {
    const validator = new Validator({ name: 12 }, { name: "alpha" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should pass with only alphabetic characters", () => {
    const validator = new Validator({ name: "abc" }, { name: "alpha" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field is an empty string", () => {
    const validator = new Validator({ name: "" }, { name: "alpha" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field does not exist", () => {
    const validator = new Validator({}, { name: "alpha" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
