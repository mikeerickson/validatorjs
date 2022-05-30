const { Validator, expect } = require("./setup.js");

describe("after or equal rule", function() {
  it("should fail when the comparing attribute are greather", function() {
    const validator = new Validator({ date: "1996-12-09", date2: "1995-08-09" }, { date2: "after_or_equal:date" });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date2")).to.equal("The date2 must be equal or after date.");
  });

  it('should fail when comparing date value is greater', function () {
    const validator = new Validator({ date: '1996-03-03' }, { date: 'after_or_equal:1996-03-04' });

    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be equal or after 1996-03-04.");
  });

  it("should pass when the comparing attribute are equal", function() {
    const validator = new Validator({ date: "1995-08-09", date2: "1995-08-09" }, { date2: "after_or_equal:date" });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it("should pass when the comparing attribute are smaller", function() {
    const validator = new Validator({ date: "1995-08-09", date2: "1996-12-09" }, { date2: "after_or_equal:date" });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it('should pass when comparing date value is equal', function () {
    const validator = new Validator({ date: '1996-03-03' }, { date: 'after_or_equal:1996-03-03' });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });

  it('should pass when comparing date value is smaller', function () {
    const validator = new Validator({ date: '1996-12-09' }, { date: 'after_or_equal:1995-08-09' });

    expect(validator.fails()).to.be.false;
    expect(validator.passes()).to.be.true;
  });
});
