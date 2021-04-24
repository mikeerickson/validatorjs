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

  // it.only("should fail if not all values are met", () => {
  //   let data = {
  //     field1: "a",
  //     field2: "B",
  //     field3: "c",
  //     field4: null,
  //   };

  //   const rules = {
  //     field4: "required_with:field1",
  //   };

  //   const validator = new Validator(data, rules);

  //   validator.passes();
  //   // expect(validator.passes()).to.be.true;
  //   console.log(validator.errors.all());
  // });
});
