if (typeof require !== "undefined") {
  const Validation = require("../src/Validation.js");
  const expect = require("chai").expect;

  describe("validatorjs promises", () => {
    let validator;
    beforeEach(() => {
      validator = new Validation();
    });

    it("should pass validation", (done) => {
      validator
        .validate({ firstName: "mike", lastName: "erickson" }, { firstName: "required", lastName: "required" })
        .then(() => {
          // whatever you would like when validation passes
          // expect(true).to.be.true;
        })
        .catch((data) => {
          // expect(true).to.be.true;
        });

      done();

      expect(validator.passes()).to.be.true;
    });

    it("should fail validation", (done) => {
      validator
        .validate({ firstName: "", lastName: "erickson" }, { firstName: "required", lastName: "required|max:3" })
        .then(() => {
          // whatever you would like when validation passes
          // expect(true).to.be.true;
        })
        .catch((data) => {
          // expect(true).to.be.true;
        });

      done();
      expect(validator.fails()).to.be.true;
    });

    it("should fail validation and have populated errors", (done) => {
      validator
        .validate({ firstName: "", lastName: "erickson" }, { firstName: "required", lastName: "required" })
        .then(() => {
          /* */
        })
        .catch((errors) => {
          /* errors will contain errors object */
        });

      done();

      expect(validator.first("firstName")).to.equal("The firstName field is required.");
    });

    it("should use attribute aliases", (done) => {
      validator
        .validate({ firstName: "mike" }, { firstName: "required" })
        .then(() => {
          /* */
        })
        .catch((errors) => {
          /* errors will contain errors object */
        });

      done();

      expect(Object.keys(validator.successes()).length).to.equal(1);
      expect(validator.successes().hasOwnProperty("firstName")).to.be.true;
    });
  });
}
