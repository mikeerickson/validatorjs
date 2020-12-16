if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("alpha_num validation rule", () => {
  it("should fail with non-alphanumeric characters", () => {
    const validator = new Validator({ age: "$" }, { age: "alpha_num" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age field must be alphanumeric.");
  });

  it("should use alpha_numeric alias", () => {
    const validator = new Validator({ age: "$" }, { age: "alpha_numeric" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age field must be alphanumeric.");
  });

  it("should pass with only alphanumeric characters", () => {
    const validator = new Validator({ age: "abc123" }, { age: "alpha_num" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass with only numeric characters", () => {
    const validator = new Validator({ age: 123 }, { age: "alpha_num" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the field is blank / optional", () => {
    const validator = new Validator({ name: "" }, { name: "alpha_num" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the field does not exist", () => {
    const validator = new Validator(
      {},
      {
        name: "alpha_num",
      },
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
