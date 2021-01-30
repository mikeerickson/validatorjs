if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("field aliases", () => {
  it("should override default message", () => {
    let data = { fname: "", lname: "" };
    let rules = { fname: "required", lname: "required" };
    let aliases = { fname: "First Name", lname: "Last Name" };

    const validator = new Validator(data, rules, null, null, aliases);

    validator.passes();
    let messages = validator.errors.all();

    expect(messages.fname[0]).to.equal("The First Name field is required.");
    expect(messages.lname[0]).to.equal("The Last Name field is required.");
  });
});
