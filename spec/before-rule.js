const { Validator, expect } = require("./setup.js");

describe("before rule", function() {
  it("should fail when the comparing attribute are smaller", function() {
    const validator = new Validator({ date: "1994-12-09", date2: "1998-08-09" }, { date2: "before:date" });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date2")).to.equal("The date2 must be before date.");
  });

  it("should fail when the comparing attribute are equal", function() {
    const validator = new Validator({ date: "1994-12-09", date2: "1994-12-09" }, { date2: "before:date" });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date2")).to.equal("The date2 must be before date.");
  });

  it("should pass when the comparing attribute are greather", function() {
    const validator = new Validator({ date: "1998-08-09", date2: "1994-12-09" }, { date2: "before:date" });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });
});
