const { Validator, expect } = require("./setup.js");

describe("_onlyInputWithRules()", function () {
  it("should return only attributes defined in the rules", function () {
    const validator = new Validator(
      {
        email: "test1@example.com",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      {
        email: "required|string|email",
      }
    );

    expect(validator._onlyInputWithRules()).to.eql({
      email: "test1@example.com",
    });
    expect(validator._onlyInputWithRules()).to.have.property("email");
    expect(validator._onlyInputWithRules()).not.to.have.property(
      "additional_field1"
    );
    expect(validator._onlyInputWithRules()).not.to.have.property(
      "additional_field2"
    );
  });
});

describe("validated()", function () {
  this.beforeAll(function () {
    Validator.registerAsync(
      "not_dustin",
      function (username, attribute, req, passes) {
        setTimeout(function () {
          if (username === "dustin") {
            passes(false, "The :attribute can not be Dustin.");
          } else {
            passes();
          }
        }, 1000);
      }
    );
  });

  it("should return only attributes defined in the rules (normal)", function () {
    const validator = new Validator(
      {
        user: "dustin_the_second",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      {
        user: "required|string",
      }
    );

    expect(validator.validated()).to.eql({
      user: "dustin_the_second",
    });
    expect(validator.validated()).to.have.property("user");
    expect(validator.validated()).not.to.have.property("additional_field1");
    expect(validator.validated()).not.to.have.property("additional_field2");
  });

  it("should return only attributes defined in the rules (async)", function (done) {
    const validator = new Validator(
      {
        user: "dustin_the_second",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      {
        user: "required|string|not_dustin",
      }
    );

    validator.validated(
      function (validated) {
        expect(validated).to.eql({ user: "dustin_the_second" });
        expect(validated).to.have.property("user");
        expect(validated).not.to.have.property("additional_field1");
        expect(validated).not.to.have.property("additional_field2");
        done();
      },
      function () {
        throw new Error("fails callback shouldn't be called!");
      }
    );
  });

  it("should throw an Error when current validation fails (normal)", function () {
    const validator = new Validator(
      {
        user: "dustin_the_second",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      {
        user: "required|string|max:10",
      }
    );

    expect(validator.validated.bind(validator)).to.throw("Validation failed!");
  });

  it("should throw an Error when current validation fails (async)", function (done) {
    const validator = new Validator(
      {
        user: "dustin",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      {
        user: "required|string|not_dustin",
      }
    );

    validator.validated(
      function (validated) {
        throw new Error("passes callback shouldn't be called!");
      },
      function () {
        done();
      }
    );
  });
});
