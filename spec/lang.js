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

  // it("should use english fallback if language `attribute` or default `def` does not exists", () => {
  //   Validator.useLang("es");
  //   const validator = new Validator({ value: 18 }, { value: "greater_than:21" });
  //   expect(validator.fails()).to.be.true;
  //   expect(validator.errors.first("value")).to.equal("The value attribute has errors.");
  // });
});
