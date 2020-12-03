const { Validator, expect } = require("./setup.js");

describe("date rule", function () {
  it("should pass for correct, parsable date format", function () {
    var asserts = [
      807926400000,
      "Aug 9, 2020",
      "Wed, 09 Aug 2020 00:00:00 GMT",
      "Wed, 09 Aug 2020 00:00:00",
      "2020-08-09",
      "2020-08-09T00:00:00+00:00",
      "2020-08-09T00:00:00Z",
      "2020-08-09T00:00:00.000Z",
      new Date()
    ];

    asserts.forEach(function (assert) {
      var validator = new Validator({ date: assert }, { date: "date" });
      expect(validator.passes()).to.be.true;
      expect(validator.fails()).to.be.false;
    });
  });

  it("should pass for correct date formats", function () {
    var validator;

    validator = new Validator({ passingDate: "Friday, March 17 2017" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ passingDate: "2017-03-18" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ passingDate: "2017-03-18" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ passingDate: "2017.03.18" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ passingDate: "2017-03-31" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;
  });

  it("should fail for incorrect date formats", function () {
    var validator;

    validator = new Validator({ failDate: "2014-25-23" }, { failDate: "date" });
    expect(validator.fails()).to.be.true;

    validator = new Validator({ failDate: "foo-bar" }, { failDate: "date" });
    expect(validator.fails()).to.be.true;

    validator = new Validator({ failDate: "0908 2020" }, { failDate: "date" });
    expect(validator.fails()).to.be.true;

    validator = new Validator({ failDate: "9/39/2020" }, { failDate: "date" });
    expect(validator.fails()).to.be.true;
  });

  it("should properly check invalid dates", () => {
    let invalidDates = [
      "2020-01-32",
      "2019-02-31",
      "2020-02-31",
      "2020-03-32",
      "2020-04-31",
      "2020-05-32",
      "2020-06-31",
      "2020-07-32",
      "2020-08-32",
      "2020-09-31",
      "2020-10-32",
      "2020-11-31",
      "2020-12-32"
    ];
    invalidDates.forEach(dateValue => {
      validator = new Validator({ failDate: dateValue }, { failDate: "date" });
      expect(validator.passes()).to.be.false;
    });

    let validDates = [
      "2020-01-31",
      "2020-02-28",
      "2020-03-31",
      "2020-04-30",
      "2020-05-31",
      "2020-06-30",
      "2020-07-31",
      "2020-08-31",
      "2020-09-30",
      "2020-10-31",
      "2020-11-30",
      "2020-12-31"
    ];
    validDates.forEach(dateValue => {
      validator = new Validator({ failDate: dateValue }, { failDate: "date" });
      expect(validator.passes()).to.be.true;
    });
  });

  it("should support alternate date formats", () => {
    let validator;

    validator = new Validator({ passingDate: "2020.09.26" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;
    validator = new Validator({ passingDate: "2020/09/26" }, { passingDate: "date" });
    expect(validator.passes()).to.be.true;
  });

});
