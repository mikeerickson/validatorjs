const { Validator, expect } = require("./setup.js");

describe("string validation rule", function () {
  it("should pass when the input is a string", function () {
    const validator = new Validator({ name: "David" }, { name: "string" });

    expect(validator.passes()).to.be.true;
  });

  it("should fail when the input is not a string", function () {
    const validator = new Validator({ name: 5 }, { name: "string" });

    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("name")).to.equal("The name must be a string.");
  });

  it("should start with", function () {
    let validator = new Validator({ name: "Mike" }, { name: "starts_with:M" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ name: "Kira" }, { name: "starts_with:M" });
    expect(validator.passes()).to.be.false;
  });

  it("should end with", function () {
    let validator = new Validator({ name: "Mike" }, { name: "ends_with:e" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ name: "Kira" }, { name: "starts_with:e" });
    expect(validator.passes()).to.be.false;
  });

  it("should be valid UUID v1", function () {
    let validator = new Validator({ value: "2354ebf2-3ce9-11eb-adc1-0242ac120002" }, { value: "uuid" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ value: "2354ebf2-3ce9-11eb-0242ac120002" }, { value: "uuid" });
    expect(validator.passes()).to.be.false;
  });

  it("should be valid UUID v4", function () {
    let validator = new Validator({ value: "deb8e4ab-d77b-4641-aef1-6a425e51057d" }, { value: "uuid" });
    expect(validator.passes()).to.be.true;
  });

  it("should be filled", function () {
    let validator = new Validator({ fname: "" }, { fname: "filled|min:3" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ fname: "m" }, { fname: "filled|min:3" });
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("fname")).to.equal("The fname must be at least 3 characters.");

    validator = new Validator({ fname: "mike" }, { fname: "filled|min:3" });
    expect(validator.passes()).to.be.true;
  });
});
