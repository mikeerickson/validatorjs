if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("in validation rule", () => {
  it("should fail when the value is not in the set of comma separated values", () => {
    const validator = new Validator({ state: "fakeState" }, { state: "in:CA,TX,FL" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("state")).to.equal("The selected state is invalid.");
  });

  it("should pass when the value is in the set of comma separated values", () => {
    const validator = new Validator({ state: "CA" }, { state: "in:CA,TX,FL" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the value is undefined", () => {
    const validator = new Validator({}, { state: "in:CA,TX,FL" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the value is an empty string", () => {
    const validator = new Validator({ state: "" }, { state: "in:CA,TX,FL" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail when the numeric value is not in the set of comma separated values", () => {
    const validator = new Validator({ quantity: 10 }, { quantity: "in:0,1,2" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("quantity")).to.equal("The selected quantity is invalid.");
  });

  it("should pass when the value is in the set of comma separated values", () => {
    const validator = new Validator(
      {
        quantity: 1,
      },
      {
        quantity: "in:0,1,2",
      },
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when all values are present", () => {
    const validator = new Validator({ fruits: ["apple", "strawberry"] }, { fruits: "array|in:apple,strawberry,kiwi" });

    expect(validator.passes()).to.be.true;
  });

  it("should fail when not all values are present", () => {
    const validator = new Validator({ fruits: ["strawberry", "kiwi"] }, { fruits: "array|in:apple,strawberry" });

    expect(validator.passes()).to.be.false;
  });

  it("should check value in array (string will be converted to array during validation)", () => {
    let req = "['kiwi','strawberry']";

    let validator = new Validator({ fruit: "orange" }, { fruit: `in_array:${req}` });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("fruit")).to.equal(`The fruit must be in ${req}.`);

    validator = new Validator({ fruit: "kiwi" }, { fruit: `in_array:${req}` });
    expect(validator.passes()).to.be.true;
  });

  it("should check simple array interpolation", () => {
    let states = ["AZ", "CA", "NY"];

    let validator = new Validator({ state: "ca" }, { state: `in_array:${states}` });

    expect(validator.passes()).to.be.true;
  });

  it("should check simple array interpolation case sensitive", () => {
    let states = ["AZ", "CA", "NY"];

    let rules = { state: `in_array:${states}:true` };

    let validator = new Validator({ state: "ca" }, { state: `in_array:${states}:true` });

    expect(validator.passes()).to.be.false;
  });

  it("should use array of non quoted delimited strings", () => {
    let states = ["AZ", "CA", "NY"];
    let stateStrings = states.join(",");
    let rules = { state: `in_array:[${stateStrings}]` };

    let validator = new Validator({ state: "CA" }, rules);

    expect(validator.passes()).to.be.true;
  });

  it("should check simple array interpolation using numeric array", () => {
    let years = [2020, 2021, 2022];

    let validator = new Validator({ value: 2020 }, { value: `in_array:${years}` });

    expect(validator.passes()).to.be.true;
  });
});
