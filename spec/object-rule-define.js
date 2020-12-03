const { Validator, expect } = require("./setup.js");

describe("object rule define", function() {
  it("mixed rule definition", function() {
    const validator = new Validator(
      { age: 30, name: "Joe" },
      { name: [{ required_if: ["age", 30], min: 2 }, "max:3"] }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("type checking", function() {
    const validator = new Validator({ age: 30 }, { age: [{ in: [30, 31], not_in: [29, 40] }] });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
