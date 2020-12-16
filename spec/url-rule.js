if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("url validation rule", () => {
  it("should fail with a url only containing http://", () => {
    const link = "http://";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with a url starting with http:// followed by 1 or more characters without a `.`", () => {
    const link = "http://google";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.fails()).to.be.true;
  });

  it("should pass with an https url", () => {
    const link = "https://google.com";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass for url with short domain name", () => {
    const link = "https://t.co";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an empty value", () => {
    const validator = new Validator({ link: "" }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an undefined value", () => {
    const validator = new Validator({}, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass when localhost is supplied as url", () => {
    const validator = new Validator({ link: "https://localhost:8787/api/v1/contacts" }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should fail if invalid strings precede the valid URL", () => {
    const link = "==sdkdhttps://t.co/abc.jpg";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.passes()).to.be.false;
  });
});
