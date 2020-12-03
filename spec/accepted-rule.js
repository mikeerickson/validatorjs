const { Validator, expect } = require("./setup.js");

describe("accepted validation rule", function() {
  it("should pass if the value is yes", function() {
    const validator = new Validator({ terms: "yes" }, { terms: "accepted" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass if the value is on", function() {
    const validator = new Validator({ terms: "on" }, { terms: "accepted" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass if the value is the number 1", function() {
    const validator = new Validator({ terms: 1 }, { terms: "accepted" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass if the value is the string 1", function() {
    const validator = new Validator({ terms: "1" }, { terms: "accepted" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass if the value is a boolean true", function() {
    const validator = new Validator({ terms: true }, { terms: "accepted" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail if the value is not 1, on, or yes", function() {
    const validator = new Validator({ terms: "10" }, { terms: "accepted" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });

  it("should fail if the value is an empty string", function() {
    const validator = new Validator({ terms: "" }, { terms: "accepted" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });

  it("should fail if the value is undefined", function() {
    const validator = new Validator({}, { terms: "accepted" });
    expect(validator.passes()).to.be.false;
    expect(validator.fails()).to.be.true;
  });
});
