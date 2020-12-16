if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("Validator constructor", () => {
  var validator;

  beforeEach(() => {
    validator = new Validator({ name: "David", email: "johndoe@gmail.com" }, { name: "required", email: "required" }, { required: "You're missing :required" });
  });

  it("should expose on window if browser", () => {
    if (typeof window !== "undefined") {
      expect(window.Validator).to.not.be.undefined;
    }
  });

  it("should have a rules property containing all the validation rules", () => {
    expect(validator.rules).to.be.a("object");
  });

  it("should have an input property containing the input data to be validated", () => {
    expect(validator.input).to.be.a("object");
  });

  it("should have a messages property containing the combined messages for validation", () => {
    expect(validator.messages).to.be.a("object");
  });

  it("should have a passes() method", () => {
    expect(validator.passes).to.be.a.function;
  });

  it("should have a fails() method", () => {
    expect(validator.fails).to.be.a.function;
  });

  it("should have a check method", () => {
    expect(validator.check).to.be.a.function;
  });

  it("should handle undefined data", () => {
    var validator = new Validator(undefined, { name: "required" });
    validator.fails();
  });

  it("should handle null data", () => {
    var validator = new Validator(null, { name: "required" });
    validator.fails();
  });
}); // Page constructor
