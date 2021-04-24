if (typeof require !== "undefined") {
  var Validator = require("../src/validator.js");
  var expect = require("chai").expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe("cased attributes", () => {
  it("should perform default message", () => {
    const customMessage = { required: "You forgot to give a :attribute" };
    const validator = new Validator({ lname: null }, { lname: "required" }, customMessage);

    expect(validator.passes()).to.be.false;

    let result = validator.errors.first("lname");
    expect(result).to.equal("You forgot to give a lname");
  });

  it("should perform alternate attribute (Title)", () => {
    const customMessage = { required: "You forgot to give a :Attribute" };
    const validator = new Validator({ lname: null }, { lname: "required" }, customMessage);

    expect(validator.passes()).to.be.false;

    expect(validator.errors.first("lname")).to.equal("You forgot to give a Lname");
  });

  it("should perform alternate attribute (UPPERCASE)", () => {
    const customMessage = { required: "You forgot to give a :ATTRIBUTE" };
    const validator = new Validator({ lname: null }, { lname: "required" }, customMessage);

    expect(validator.passes()).to.be.false;

    let result = validator.errors.first("lname");
    expect(validator.errors.first("lname")).to.equal("You forgot to give a LNAME");
  });

  it("always use alias regardless of atrribute configuration", () => {
    let aliases = { fname: "First Name" };

    const validator = new Validator({ fname: null }, { fname: "required" }, null, null, aliases);

    expect(validator.passes()).to.be.false;

    let result = validator.errors.first("fname");
    expect(result).to.equal("The First Name field is required.");
  });

  it("should work with `setMessage` command", () => {
    // setup custom attribute format, custom language
    Validator.setMessages("temp", {
      required: "The :Attribute field is required.",
    });

    // verify message template
    const rawMessages = { required: "The :Attribute field is required.", attributes: {} };
    Validator.setMessages("temp", rawMessages);

    // initiate validation with new language
    Validator.useLang("temp");
    const validator = new Validator({ name: "" }, { name: "required" });

    expect(validator.passes()).to.be.false;

    const messages = Validator.getMessages("temp");
    expect(messages.required).to.equal("The :Attribute field is required.");

    expect(validator.errors.first("name")).to.equal("The Name field is required.");

    Validator.resetLang();
  });

  it("should be able to add custom", () => {
    // get current language/messages, they will be restore below
    const oldLang = Validator.getDefaultLang();
    let originalMessages = Validator.getMessages("en");

    const rawMessages = { required: "You really need to supply :Attribute or data will not be searchable.", attributes: {} };
    Validator.setMessages("en", rawMessages);
    const validator = new Validator({ name: "" }, { name: "required" });

    expect(validator.fails()).to.be.true;
    expect(validator.errors.first("name")).to.equal("You really need to supply Name or data will not be searchable.");

    // restore defualts
    Validator.setMessages("en", originalMessages);
  });
});
