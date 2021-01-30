const { EXIT_CODE } = require("karma/lib/constants");

class ValidationMessage {
  constructor(messages = {}) {
    this.messages = messages;
  }
  all() {
    return this.messages;
  }

  fields() {
    return Object.keys(this.messages);
  }

  first(attribute = "") {
    let msg = "";
    if (this.messages.hasOwnProperty(attribute)) {
      if (this.messages[attribute].length > 0) {
        msg = this.messages[attribute][0];
      }
    }
    return msg;
  }

  get(attribute) {
    if (this.messages.hasOwnProperty(attribute)) {
      return this.messages[attribute];
    }
  }

  keys() {
    return this.fields();
  }

  attributes() {
    return this.fields();
  }

  has(attribute) {
    return this.messages.hasOwnProperty(attribute);
  }

  errorCount() {
    return Object.keys(this.messages).length;
  }
}

module.exports = ValidationMessage;
