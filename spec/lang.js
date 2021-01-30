if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("lang / messages", () => {
  it("should default to english", () => {
    expect(Validator.getDefaultLang()).to.equal("en");
  });

  it("should be able to change lang", () => {
    const oldLang = Validator.getDefaultLang();
    Validator.useLang("ru");
    expect(Validator.getDefaultLang()).to.equal("ru");
    Validator.useLang(oldLang);
  });

  it("should be able to add custom", () => {
    const oldLang = Validator.getDefaultLang();
    const rawMessages = { required: "Le nkundla iyadingeka", attributes: {} };
    Validator.setMessages("zu", rawMessages);
    Validator.useLang("zu");
    const validator = new Validator({ zip: "" }, { zip: "required" });

    const messages = Validator.getMessages("zu");
    expect(messages).to.equal(rawMessages);
    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("zip")).to.equal("Le nkundla iyadingeka");
    Validator.useLang(oldLang);
  });

  it("should use alternate language feature using validator instance", () => {
    if (typeof require !== "undefined") {
      const validator = new Validator({ zip: "" }, { zip: "required" }, null, "se");
      expect(validator.fails()).to.be.true;
      expect(validator.errors.first("zip")).to.equal("zip måste vara ifyllt.");
    }
  });
});
