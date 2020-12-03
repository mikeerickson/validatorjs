const { Validator, expect } = require("./setup.js");

describe("lang / messages", function() {
  it("should default to english", function() {
    expect(Validator.getDefaultLang()).to.equal("en");
  });

  it("should be able to change lang", function() {
    const oldLang = Validator.getDefaultLang();
    Validator.useLang("ru");
    expect(Validator.getDefaultLang()).to.equal("ru");
    Validator.useLang(oldLang);
  });

  it("should be able to add custom", function() {
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
});
