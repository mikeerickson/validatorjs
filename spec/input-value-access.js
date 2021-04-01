const { Validator, expect } = require("./setup.js");

describe("access input value", function() {
  it("should pass if value is not null", function() {
    const validator = new Validator({}, { value: "string" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should fail if value is null and not a string", function() {
    const validator = new Validator(
      { value: 12 },
      { value: "required|string" }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should pass if value is replaced in the template error with :inputValue", function() {
    const validator = new Validator(
      { value: 12 },
      { value: "required|in:val1,val2" },
      { "in.value": "The value ':inputValue' is not a valid value." }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.get("value"));
    expect(validator.errors.get("value")[0]).equal(
      "The value '12' is not a valid value."
    );
  });

  it("should pass if array is replaced in the template error with :inputValue", function() {
    const validator = new Validator(
      { value: [12, '13'] },
      { value: "required|in:val1,val2" },
      { "in.value": "The value ':inputValue' is not a valid value." }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.get("value"));
    expect(validator.errors.get("value")[0]).equal(
      "The value '12,13' is not a valid value."
    );
  });

  
  it("should pass if empty array is replaced in the template error with :inputValue", function() {
    const validator = new Validator(
      { value: [] },
      { value: "string" },
      { "string.value": "The value ':inputValue' is not a valid string." }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.get("value"));
    expect(validator.errors.get("value")[0]).equal(
      "The value '' is not a valid string."
    );
  });

  
  it("should pass if empty object '{}' is replaced for [Object]", function() {
    const validator = new Validator(
      { value: {} },
      { value: "string" },
      { "string.value": "The value ':inputValue' is not a valid string." }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.get("value"));
    expect(validator.errors.get("value")[0]).equal(
      "The value '[Object]' is not a valid string."
    );
  });

  it("should pass if null is replaced for null text", function() {
    const validator = new Validator(
      { value: null },
      { value: "required|string|same:34" },
      { "required.value": "The value ':inputValue' is not a valid string." }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    console.log(validator.errors.get("value"));
    expect(validator.errors.get("value"));
    expect(validator.errors.get("value")[0]).equal(
      "The value 'null' is not a valid string."
    );
  });
});
