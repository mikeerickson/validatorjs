if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("array rule", () => {
  it("should pass when array", () => {
    const validator = new Validator({ users: [] }, { users: "array" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail when given object", () => {
    const validator = new Validator({ users: {} }, { users: "array" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail when given boolean", () => {
    const validator = new Validator({ users: true }, { users: "array" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should have a minimum number of array items ", () => {
    const validator = new Validator(
      {
        names: [],
      },
      {
        names: "array|min:1",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should contain distinct values", () => {
    let validator = new Validator({ names: ["Mike", "Erickson"] }, { names: "distinct" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ names: ["Mike", "Mike"] }, { names: "distinct" });
    expect(validator.passes()).to.be.false;
  });
});
