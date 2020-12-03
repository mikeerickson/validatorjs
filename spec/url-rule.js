const { Validator, expect } = require("./setup.js");

describe("url validation rule", function() {
  it("should fail with a url only containing http://", function() {
    const link = "http://";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail with a url starting with http:// followed by 1 or more characters without a `.`", function() {
    const link = "http://google";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.fails()).to.be.true;
  });

  it("should pass with an https url", function() {
    const link = "https://google.com";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass for url with short domain name", function() {
    const link = "https://t.co";
    const validator = new Validator({ link: link }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an empty value", function() {
    const validator = new Validator({ link: "" }, { link: "url" });
    expect(validator.passes()).to.be.true;
  });

  it("should pass with an undefined value", function() {
    const validator = new Validator({}, { link: "url" });
    expect(validator.passes()).to.be.true;
  });
});
