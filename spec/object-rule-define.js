if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("object rule define", () => {
  it("mixed rule definition", () => {
    const validator = new Validator({ age: 30, name: "Joe" }, { name: [{ required_if: ["age", 30], min: 2 }, "max:3"] });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("type checking", () => {
    const validator = new Validator({ age: 30 }, { age: [{ in: [30, 31], not_in: [29, 40] }] });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
