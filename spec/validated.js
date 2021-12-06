const { Validator, expect } = require("./setup.js");

describe("_onlyInputWithRules()", function () {
  it("should return only attributes defined in the rules", function () {
    const validator = new Validator(
      {
        email: "test1@example.com",
        addresses: [
          {
            line1: "934 High Noon St. Ronkonkoma, NY 1177",
            zip: 1177,
          },
          {
            line1: "476 Main St. Clinton Township",
            line2: "MI 48035",
            zip: 48035,
          },
        ],
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      {
        email: "required|string|email",
        "addresses.*.line1": "required|string|max:200",
        "addresses.*.line2": "nullable|string|max:200",
      }
    );

    const validated = validator._onlyInputWithRules();

    expect(validated).to.eql({
      email: "test1@example.com",
      addresses: [
        {
          line1: "934 High Noon St. Ronkonkoma, NY 1177",
        },
        {
          line1: "476 Main St. Clinton Township",
          line2: "MI 48035",
        },
      ],
    });
    expect(validated).to.have.property("email");
    expect(validated).to.have.property("addresses");
    expect(validated).not.to.have.property("additional_field1");
    expect(validated).not.to.have.property("additional_field2");
    expect(validated.addresses[0]).to.have.property("line1");
    expect(validated.addresses[0]).not.to.have.property("line2");
    expect(validated.addresses[0]).not.to.have.property("zip");
    expect(validated.addresses[1]).to.have.property("line1");
    expect(validated.addresses[1]).to.have.property("line2");
    expect(validated.addresses[1]).not.to.have.property("zip");
  });
});

describe("validated()", function () {
  this.beforeAll(function () {
    Validator.registerAsync(
      "not_dustin",
      function (username, attribute, req, passes) {
        setTimeout(function () {
          if (username === "dustin") {
            passes(false);
          } else {
            passes();
          }
        }, 1000);
      },
      "The :attribute can not be Dustin."
    );
  });

  it("should return only attributes defined in the rules (normal)", function () {
    const validator = new Validator(
      {
        user: "John Doe",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      { user: "string" }
    );

    const validated = validator.validated();

    expect(validated).to.eql({ user: "John Doe" });
    expect(validated).to.have.property("user");
    expect(validated).not.to.have.property("additional_field1");
    expect(validated).not.to.have.property("additional_field2");
  });

  it("should return only attributes defined in the rules (async)", function (done) {
    const validator = new Validator(
      {
        user: "John Doe",
        additional_field1: "lorem_ipsum",
        additional_field2: "lorem_ipsum",
      },
      { user: "not_dustin" }
    );

    validator.validated(
      function (validated) {
        expect(validated).to.eql({ user: "John Doe" });
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
    const validator = new Validator({ user: "John Doe" }, { user: "min:20" });

    expect(validator.validated.bind(validator)).to.throw("Validation failed!");
  });

  it("should throw an Error when current validation fails (async)", function (done) {
    const validator = new Validator({ user: "dustin" }, { user: "not_dustin" });

    validator.validated(
      function (validated) {
        throw new Error("passes callback shouldn't be called!");
      },
      function () {
        expect(validator.errors.first("user")).to.be.equal(
          "The user can not be Dustin."
        );
        done();
      }
    );
  });
});
