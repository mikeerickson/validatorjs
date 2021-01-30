const Validator = require("./validator");

class Validation {
  constructor() {
    this.validationErrors = {};
    this.validationSuccesses = {};
  }

  validate(data, rules, customMessages = {}, language = "", aliases = {}) {
    return new Promise((resolve, reject) => {
      const validator = new Validator(data, rules, customMessages, language, aliases);

      const handleSuccesses = () => {
        this.validationErrors = validator.errors.all();
        this.validationSuccesses = validator.successes.all();
        resolve();
      };

      const handleErrors = () => {
        this.validationErrors = validator.errors.all();
        this.validationSuccesses = validator.successes.all();
        reject(validator.errors.all());
      };
      // Asynchronous handler (with callbacks)
      if (validator.hasAsync) {
        validator.passes(() => handleSuccesses());
        validator.fails(() => handleErrors());
      } else {
        // Synchronous handler
        validator.passes() ? handleSuccesses() : handleErrors();
      }
    });
  }

  errors() {
    return this.validationErrors;
  }

  successes() {
    return this.validationSuccesses;
  }

  all() {
    return this.validationErrors;
  }

  first(attribute = "") {
    let msg = "";
    if (this.validationErrors[attribute].length > 0) {
      msg = this.validationErrors[attribute][0];
    }
    return msg;
  }

  get(attribute) {
    if (this.validationErrors.hasOwnProperty(attribute)) {
      return this.validationErrors[attribute];
    }
  }

  fields() {
    return Object.keys(this.validationErrors);
  }

  keys() {
    return this.fields();
  }

  attributes() {
    return this.fields();
  }

  has(attribute) {
    return this.validationErrors.hasOwnProperty(attribute);
  }

  errorCount() {
    return Object.keys(this.validationErrors).length;
  }

  passes() {
    return Object.keys(this.validationErrors).length === 0;
  }

  fails() {
    return Object.keys(this.validationErrors).length > 0;
  }
}

module.exports = Validation;
