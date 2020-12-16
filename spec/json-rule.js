if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("json rule tests", () => {
  it("should confirm supplied string is not valid JSON", () => {
    let jsonString = "{fname: 'mike'}";
    let validator = new Validator({ jsonStr: jsonString }, { jsonStr: `json` });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("jsonStr")).to.equal("The jsonStr does not contain valid json.");
  });

  it("should confirm supplied string is valid JSON", () => {
    let jsonString = JSON.stringify({ fname: "mike", lnamne: "erickson" });
    let validator = new Validator({ jsonStr: jsonString }, { jsonStr: `json` });
    expect(validator.passes()).to.be.true;
  });
});
