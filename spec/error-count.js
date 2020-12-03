const { Validator, expect } = require("./setup.js");

describe("Error counts", function() {
  it("should return 0 when validation has not yet run", function() {
    const validator = new Validator({ username: "" }, { username: "required" });
    expect(validator.errorCount).to.equal(0);
  });

  it("should return a count when there are errors", function() {
    const validator = new Validator({ username: "", name: "" }, { username: "required", name: "required" });
    expect(validator.passes()).to.be.false;
    expect(validator.errorCount).to.equal(2);
  });

  it("should not return a count when error free", function() {
    const validator = new Validator({ username: "a", name: "a" }, { username: "required", name: "required" });
    expect(validator.passes()).to.be.true;
    expect(validator.errorCount).to.equal(0);
  });
});
