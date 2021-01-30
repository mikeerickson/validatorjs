if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("required unless rule", () => {
  it("should fail", () => {
    const validator = new Validator({ desert: "icecream", flavour: "" }, { flavour: "required_unless:desert,cake" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("flavour")).to.equal("The flavour field is required when desert is not cake.");
  });

  it("should pass", () => {
    const validator = new Validator({ desert: "icecream", flavour: "chocolate" }, { flavour: "required_unless:desert,cake" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should require city and state if address value is present", () => {
    let rules = { address: "sometimes", city: "required_unless:address," };
    let data = {};

    let validator = new Validator({ data, rules });

    expect(validator.passes()).to.be.true;
  });

  it("should fail when address is supplied but city is not supplied", () => {
    let rules = { address: "sometimes", city: "required_unless:address," };
    let data = { address: "1234 Main Street" };

    let validator = new Validator(data, rules);

    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("city")).to.equal("The city field is required when address is not .");
  });

  it("should pass when city is supplied", () => {
    let rules = { address: "sometimes", city: "required_unless:address," };
    let data = { address: "1234 Main Street", city: "Anytown" };

    let validator = new Validator(data, rules);

    expect(validator.passes()).to.be.true;
  });
});
