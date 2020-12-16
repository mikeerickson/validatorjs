if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("bail rule", () => {
  it("should abort if validation rule passes and list contains `bail`", () => {
    const validator = new Validator({ age: 4, lname: null }, { age: "bail|required|min:5|max:1", lname: "required" });
    expect(validator.fails()).to.be.true;
    let result = validator.errors.get("age");
    expect(result.includes("max")).to.be.false;
  });
});
