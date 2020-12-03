const { Validator, expect } = require("./setup.js");

describe("integer pass rules", function() {
  it("should pass if no value is entered", function() {
    const validator = new Validator({}, { age: "integer" });
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an integer value", function() {
    const validator = new Validator(
      {
        age: 18
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with a string containing an integer value", function() {
    const validator = new Validator(
      {
        age: "18"
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass with unsigned integer", function() {
    const validator = new Validator(
      {
        num: -123
      },
      {
        num: "integer"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });
});

describe("integer fail rules", function() {
  it("should fail with a decimal value", function() {
    const validator = new Validator(
      {
        age: 18.9
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be an integer.");
  });

  it("should fail with a string value containing numbers and letters", function() {
    const validator = new Validator(
      {
        age: "18d"
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be an integer.");
  });

  it("should fail with a boolean true value", function() {
    const validator = new Validator(
      {
        age: true
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with a boolean false value", function() {
    const validator = new Validator(
      {
        age: false
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail if the value is an array", function() {
    const validator = new Validator(
      {
        age: []
      },
      {
        age: "required|integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail if the value is an object", function() {
    const validator = new Validator(
      {
        age: {}
      },
      {
        age: "integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with unsigned float-integer", function() {
    const validator = new Validator(
      {
        num: -70.36
      },
      {
        num: "integer"
      }
    );
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });
});
