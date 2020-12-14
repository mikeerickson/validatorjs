const { Validator, expect } = require("./setup.js");

describe("bail rule", function () {
  it("should abort if validation rule passes and list contains `bail`", function () {
    const validator = new Validator({ age: 4, lname: null }, { age: "bail|required|min:5|max:1", lname: "required" });
    expect(validator.fails()).to.be.true;
    let result = validator.errors.get("age");
    expect(result.includes("max")).to.be.false;
  });
});
