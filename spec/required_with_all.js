if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("required with all", () => {
  it("should fail", () => {
    const validator = new Validator(
      {
        desert: {
          first: "icecream",
          second: "icecream",
        },
        flavour: "",
      },
      { flavour: "required_with_all:desert.first,desert.second" },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("flavour")).to.equal("The flavour field is required when desert.first, desert.second are not empty.");
  });

  it("should pass", () => {
    const validator = new Validator(
      {
        desert: {
          first: "icecream",
          second: "icecream",
        },
        flavour: "chocolate",
      },
      { flavour: "required_with_all:desert.first,desert.second" },
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail with required_with_all containing multiple fields", () => {
    const data = { field1: "a", field2: "b", field3: null };
    const rules = { field3: "required_with_all:field1,field2" };

    let validation = new Validator(data, rules);
    expect(validation.passes()).to.be.false;
  });

  it("should fail with required_with_all containing multiple fields and test field exist", () => {
    const data = { field1: "a", field2: "b", field3: "c" };
    const rules = { field3: "required_with_all:field1,field2" };

    let validation = new Validator(data, rules);
    expect(validation.passes()).to.be.true;
  });

  it("should fail with required_with_all containing multiple fields but missing one field", () => {
    const data = { field1: "a", field2: null, field3: null };
    const rules = { field3: "required_with_all:field1,field2" };

    let validation = new Validator(data, rules);
    expect(validation.passes()).to.be.true;
  });

  it("should pass (not all required field are set)", () => {
    const validator = new Validator(
      {
        desert: {
          first: "icecream",
        },
        flavour: "",
      },
      {
        flavour: "required_with_all:desert.first,desert.second",
      },
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});
