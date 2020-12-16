if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("require validation pass rules", () => {
  it("should pass with non-empty strings", () => {
    const validator = new Validator({ name: "David" }, { name: "required" });
    expect(validator.passes()).to.be.true;
  });

  it("should fail with empty strings", () => {
    const validator = new Validator({ email: "" }, { email: "required" });
    expect(validator.fails()).to.be.true;
  });

  it("should fail with strings containing only white space", () => {
    const validator = new Validator({ name: "      	" }, { name: "required" });
    expect(validator.fails()).to.be.true;
  });

  it("should fail when a value is equal to undefined", () => {
    const validator = new Validator({ name: undefined }, { name: "required" });
    expect(validator.fails()).to.be.true;
  });

  it("should fail when a value is equal to null", () => {
    const validator = new Validator({ name: null }, { name: "required" });
    expect(validator.fails()).to.be.true;
  });

  it("should pass when a value is numeric", () => {
    const validator = new Validator(
      {
        age: 29,
      },
      {
        age: "required",
      },
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail when the attribute is not passed in", () => {
    const validator = new Validator(
      {},
      {
        email: "required",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail when the array is empty", () => {
    const validator = new Validator({ users: [] }, { users: "required|array" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should not fail when not an empty array", () => {
    const validator = new Validator({ users: [false] }, { users: "required|array" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
