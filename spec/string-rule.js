const { Validator, expect } = require("./setup.js");

describe("string validation rule", function() {
  it("should pass when the input is a string", function() {
    const validator = new Validator({ name: "David" }, { name: "string" });

    expect(validator.passes()).to.be.true;
  });

  it("should fail when the input is not a string", function() {
    const validator = new Validator({ name: 5 }, { name: "string" });

    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("name")).to.equal("The name must be a string.");
  });
});
