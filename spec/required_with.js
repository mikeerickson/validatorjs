if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("required with", () => {
  it("should fail", () => {
    const validator = new Validator(
      {
        desert: {
          first: "icecream",
        },
        flavour: "",
      },
      { flavour: "required_with:desert.first" },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("flavour")).to.equal("The flavour field is required when desert.first is not empty.");
  });

  it("should pass", () => {
    const validator = new Validator(
      {
        desert: {
          first: "icecream",
        },
        flavour: "chocolate",
      },
      {
        flavour: "required_with:desert.first",
      },
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail with required_with containing multiple fields", () => {
    const data = { field1: "a", field2: "b", field3: null };
    const rules = { field3: "required_with:field1,field2" };

    let validation = new Validator(data, rules);
    expect(validation.passes()).to.be.false;
  });
});
