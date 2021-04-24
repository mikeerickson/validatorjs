if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("string validation rule", () => {
  it("should pass when the input is a string", () => {
    const validator = new Validator({ name: "David" }, { name: "string" });

    expect(validator.passes()).to.be.true;
  });

  it("should fail when the input is not a string", () => {
    const validator = new Validator({ name: 5 }, { name: "string" });

    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("name")).to.equal("The name must be a string.");
  });

  it("should start with", () => {
    let validator = new Validator({ name: "Mike" }, { name: "starts_with:M" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ name: "Kira" }, { name: "starts_with:M" });
    expect(validator.passes()).to.be.false;
  });

  it("should begins with", () => {
    let validator = new Validator({ name: "Mike" }, { name: "begins_with:M" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ name: "Kira" }, { name: "starts_with:M" });
    expect(validator.passes()).to.be.false;
  });

  it("should end with", () => {
    let validator = new Validator({ name: "Mike" }, { name: "ends_with:e" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ name: "Kira" }, { name: "starts_with:e" });
    expect(validator.passes()).to.be.false;
  });

  it("should be valid UUID v1", () => {
    let validator = new Validator({ value: "2354ebf2-3ce9-11eb-adc1-0242ac120002" }, { value: "uuid" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ value: "2354ebf2-3ce9-11eb-0242ac120002" }, { value: "uuid" });
    expect(validator.passes()).to.be.false;
  });

  it("should be valid UUID v4", () => {
    let validator = new Validator({ value: "deb8e4ab-d77b-4641-aef1-6a425e51057d" }, { value: "uuid" });
    expect(validator.passes()).to.be.true;
  });

  it("should be filled", () => {
    let validator = new Validator({ fname: "" }, { fname: "filled|min:3" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ fname: "m" }, { fname: "filled|min:3" });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("fname")).to.equal("The fname must be at least 3 characters.");

    validator = new Validator({ fname: "mike" }, { fname: "filled|min:3" });
    expect(validator.passes()).to.be.true;
  });
});
