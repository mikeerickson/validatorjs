if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("conditional rule tests", () => {
  it("should perform greater than validation", () => {
    let validator = new Validator({ date: "2020-11-31" }, { date: "greater_than:2020-12-01" });
    expect(validator.passes()).to.be.false;

    expect(validator.errors.first("date")).to.equal("The date must be greater than 2020-12-01.");

    validator = new Validator({ date: "2020-12-02" }, { date: "greater_than:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform greater than validation (using gt alias)", () => {
    let validator = new Validator({ date: "2020-11-31" }, { date: "gt:2020-12-01" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be greater than 2020-12-01.");

    validator = new Validator({ date: "2020-12-02" }, { date: "gt:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform numeric greater than validation", () => {
    const validator = new Validator({ age: 18 }, { age: "greater_than:18" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be greater than 18.");
  });

  it("should perform boolean greater than validation", () => {
    let validator = new Validator({ boolean: false }, { boolean: "greater_than:true" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("boolean")).to.equal("The boolean must be greater than true.");
  });

  it("should perform greater or equal than validation", () => {
    let validator = new Validator({ date: "2020-11-31" }, { date: "greater_than_or_equal:2020-12-01" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be greater than or equal 2020-12-01.");

    validator = new Validator({ date: "2020-12-01" }, { date: "greater_than_or_equal:2020-12-01" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ date: "2020-12-02" }, { date: "greater_than_or_equal:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform numeric greater than or equal validation", () => {
    let validator = new Validator({ age: 17 }, { age: "greater_than_or_equal:18" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be greater than or equal 18.");

    validator = new Validator({ age: 18 }, { age: "greater_than_or_equal:18" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ age: 19 }, { age: "greater_than_or_equal:18" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform greater or equal than validation (using gte)", () => {
    let validator = new Validator({ date: "2020-11-31" }, { date: "gte:2020-12-01" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be greater than or equal 2020-12-01.");

    validator = new Validator({ date: "2020-12-01" }, { date: "gte:2020-12-01" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ date: "2020-12-02" }, { date: "gte:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform less than validation", () => {
    let validator = new Validator({ date: "2020-12-01" }, { date: "less_than:2020-11-31" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be less than 2020-11-31.");

    validator = new Validator({ date: "2020-11-31" }, { date: "less_than:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform less than validation (using lt alias)", () => {
    let validator = new Validator({ date: "2020-12-01" }, { date: "lt:2020-11-31" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be less than 2020-11-31.");

    validator = new Validator({ date: "2020-11-31" }, { date: "lt:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform numeric less than validation", () => {
    const validator = new Validator({ age: 18 }, { age: "less_than:18" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be less than 18.");
  });

  it("should perform boolean less than validation", () => {
    let validator = new Validator({ boolean: false }, { boolean: "less_than:true" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("boolean")).to.equal("The boolean must be less than true.");
  });

  it("should perform less than or equal than validation", () => {
    let validator = new Validator({ date: "2020-12-01" }, { date: "less_than_or_equal:2020-11-31" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("date")).to.equal("The date must be less than or equal 2020-11-31.");

    validator = new Validator({ date: "2020-12-01" }, { date: "less_than_or_equal:2020-12-01" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ date: "2020-11-31" }, { date: "less_than_or_equal:2020-12-01" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform numeric less than or equal validation", () => {
    let validator = new Validator({ age: 19 }, { age: "less_than_or_equal:18" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be less than or equal 18.");

    validator = new Validator({ age: 18 }, { age: "less_than_or_equal:18" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ age: 18 }, { age: "less_than_or_equal:18" });
    expect(validator.passes()).to.be.true;
  });

  it("should perform less than or equal than validation (using lte)", () => {
    let validator = new Validator({ age: 19 }, { age: "lte:18" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("age")).to.equal("The age must be less than or equal 18.");

    validator = new Validator({ age: 18 }, { age: "lte:18" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ age: 18 }, { age: "lte:18" });
    expect(validator.passes()).to.be.true;
  });
});
