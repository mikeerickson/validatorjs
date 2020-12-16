if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("present validation rule", () => {
  it("should pass with attribute present", () => {
    const validator = new Validator({ email: "name@domain.com" }, { email: "present" });
    expect(validator.passes()).to.be.true;
  });

  it("should fail with attribute not present", () => {
    const validator = new Validator({}, { email: "present" });
    expect(validator.passes()).to.be.false;
  });
});
