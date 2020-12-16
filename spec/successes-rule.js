if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("successes object", () => {
  it("should populate `.successes` object", () => {
    const validation = new Validator({ fname: "", lname: "Erickson" }, { fname: "required|min:1", lname: "required|min:1" });

    expect(validation.fails()).to.be.true;

    expect(Object.keys(validation.successes.all()).length).to.equal(1);
    expect(validation.successes.fields().includes("lname")).to.be.true;
    expect(validation.successes.keys().includes("lname")).to.be.true;
    expect(validation.successes.first("lname")).to.equal("The lname field is required.");
    expect(validation.successes.get("lname").length).to.equal(2);
    expect(validation.successes.successCount()).to.equal(1);
  });
});
