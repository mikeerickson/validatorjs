if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("integer pass rules", () => {
  it("should pass if no value is entered", () => {
    const validator = new Validator({}, { age: "integer" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an integer value", () => {
    const validator = new Validator(
      {
        age: 18,
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with a string containing an integer value", () => {
    const validator = new Validator(
      {
        age: "18",
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with unsigned integer", () => {
    const validator = new Validator(
      {
        num: -123,
      },
      {
        num: "integer",
      },
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});

describe("integer fail rules", () => {
  it("should fail with a decimal value", () => {
    const validator = new Validator(
      {
        age: 18.9,
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be an integer.");
  });

  it("should fail with a string value containing numbers and letters", () => {
    const validator = new Validator(
      {
        age: "18d",
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be an integer.");
  });

  it("should fail with a boolean true value", () => {
    const validator = new Validator(
      {
        age: true,
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with a boolean false value", () => {
    const validator = new Validator(
      {
        age: false,
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail if the value is an array", () => {
    const validator = new Validator(
      {
        age: [],
      },
      {
        age: "required|integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail if the value is an object", () => {
    const validator = new Validator(
      {
        age: {},
      },
      {
        age: "integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with unsigned float-integer", () => {
    const validator = new Validator(
      {
        num: -70.36,
      },
      {
        num: "integer",
      },
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });
});
