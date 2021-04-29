/*! validatorjs - 2021-04-29 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Validator = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

"use strict";

function AsyncResolvers(onFailedOne, onResolvedAll) {
  this.onResolvedAll = onResolvedAll;
  this.onFailedOne = onFailedOne;
  this.resolvers = {};
  this.resolversCount = 0;
  this.passed = [];
  this.failed = [];
  this.firing = false;
}

AsyncResolvers.prototype = {
  /**
   * Add resolver
   *
   * @param {Rule} rule
   * @return {integer}
   */
  add: function (rule) {
    var index = this.resolversCount;
    this.resolvers[index] = rule;
    this.resolversCount++;
    return index;
  },

  /**
   * Resolve given index
   *
   * @param  {integer} index
   * @return {void}
   */
  resolve: function (index) {
    var rule = this.resolvers[index];
    if (rule.passes === true) {
      this.passed.push(rule);
    } else if (rule.passes === false) {
      this.failed.push(rule);
      this.onFailedOne(rule);
    }

    this.fire();
  },

  /**
   * Determine if all have been resolved
   *
   * @return {boolean}
   */
  isAllResolved: function () {
    return this.passed.length + this.failed.length === this.resolversCount;
  },

  /**
   * Attempt to fire final all resolved callback if completed
   *
   * @return {void}
   */
  fire: function () {
    if (!this.firing) {
      return;
    }

    if (this.isAllResolved()) {
      this.onResolvedAll(this.failed.length === 0);
    }
  },

  /**
   * Enable firing
   *
   * @return {void}
   */
  enableFiring: function () {
    this.firing = true;
  },
};

module.exports = AsyncResolvers;

},{}],2:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

"use strict";

var replacements = {
  /**
   * Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  between: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1],
    });
  },

  /**
   * Digits-Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  digits_between: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1],
    });
  },

  /**
   * Required_if replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_if: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1],
    });
  },

  /**
   * Required_unless replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_unless: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1],
    });
  },

  /**
   * Required_with replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0]),
    });
  },

  /**
   * Required_with_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with_all: function (template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(", "),
    });
  },

  /**
   * Required_without replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0]),
    });
  },

  /**
   * Required_without_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without_all: function (template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(", "),
    });
  },

  /**
   * After replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after: this._getAttributeName(parameters[0]),
    });
  },

  /**
   * Before replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before: this._getAttributeName(parameters[0]),
    });
  },

  /**
   * After_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after_or_equal: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after_or_equal: this._getAttributeName(parameters[0]),
    });
  },

  /**
   * Before_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before_or_equal: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before_or_equal: this._getAttributeName(parameters[0]),
    });
  },

  /**
   * Same replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  same: function (template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      same: this._getAttributeName(parameters[0]),
    });
  },
};

function formatter(attribute) {
  return attribute.replace(/[_\[]/g, " ").replace(/]/g, "");
}

module.exports = {
  replacements: replacements,
  formatter: formatter,
};

},{}],3:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

var Errors = function () {
  this.errors = {};
};

Errors.prototype = {
  constructor: Errors,

  /**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function (attribute, message) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }

    if (this.errors[attribute].indexOf(message) === -1) {
      this.errors[attribute].push(message);
    }
  },

  /**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */
  get: function (attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }

    return [];
  },

  /**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First error message or false
   */
  first: function (attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }

    return false;
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function () {
    return this.errors;
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @return {array} Failed fields
   */
  fields: function () {
    return Object.keys(this.errors);
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @return {array} Failed fields
   */
  keys: function () {
    return Object.keys(this.errors);
  },

  /**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function (attribute) {
    if (this.errors.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  },

  /**
   * Returns number of errors
   *
   * @return {number}
   */
  errorCount: function () {
    return Object.keys(this.errors).length;
  },
};

module.exports = Errors;

},{}],4:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

var Messages = require("./messages");

require("./lang/en");

var require_method = require;

var container = {
  messages: {},

  /**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} rawMessages
   * @return {void}
   */
  _set: function (lang, rawMessages) {
    this.messages[lang] = rawMessages;
  },

  /**
   * Set message for given language's rule.
   *
   * @param {string} lang
   * @param {string} attribute
   * @param {string|object} message
   * @return {void}
   */
  _setRuleMessage: function (lang, attribute, message) {
    this._load(lang);
    if (message === undefined) {
      message = this.messages[lang].def;
    }

    this.messages[lang][attribute] = message;
  },

  /**
   * Load messages (if not already loaded)
   *
   * @param  {string} lang
   * @return {void}
   */
  _load: function (lang) {
    if (!this.messages[lang]) {
      try {
        var rawMessages = require_method("./lang/" + lang);
        this._set(lang, rawMessages);
      } catch (e) {}
    }
  },

  /**
   * Get raw messages for language
   *
   * @param  {string} lang
   * @return {object}
   */
  _get: function (lang) {
    this._load(lang);
    return this.messages[lang];
  },

  /**
   * Make messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */
  _make: function (lang) {
    this._load(lang);
    return new Messages(lang, this.messages[lang]);
  },
};

module.exports = container;

},{"./lang/en":5,"./messages":6}],5:[function(require,module,exports){
module.exports = {
  attributes: {},
  accepted: "The :attribute must be accepted.",
  after: "The :attribute must be after :after.",
  after_or_equal: "The :attribute must be equal or after :after_or_equal.",
  alpha: "The :attribute field must contain only alphabetic characters.",
  alpha_dash: "The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.",
  alpha_num: "The :attribute field must be alphanumeric.",
  alpha_numeric: "The :attribute field must be alphanumeric.",
  array: "The :attribute must be an array",
  before: "The :attribute must be before :before.",
  before_or_equal: "The :attribute must be equal or before :before_or_equal.",
  begins_with: "The :attribute must begin with :value.",
  between: {
    numeric: "The :attribute field must be between :min and :max.",
    string: "The :attribute field must be between :min and :max characters.",
  },
  confirmed: "The :attribute confirmation does not match.",
  email: "The :attribute format is invalid.",
  date: "The :attribute is not a valid date format.",
  def: "The :attribute attribute has errors.",
  digits: "The :attribute must be :digits digits.",
  digits_between: "The :attribute field must be between :min and :max digits.",
  different: "The :attribute and :different must be different.",
  ends_with: "The :attribute must end with :ends_with",
  exclude_if: "The :attribute will be excluded if :exclude_if.",
  exclude_unless: "The :attribute will be excluded unless :exclude_unless.",
  filled: "The :attribute must be filled if supplied.",
  greater_than: {
    numeric: "The :attribute must be greater than :greater_than.",
    file: "The :attribute must be greater than :greater_than kilobytes.",
    string: "The :attribute must be greater than :greater_than.",
    array: "The :attribute must have more than :greater_than items.",
  },
  gt: {
    numeric: "The :attribute must be greater than :gt.",
    file: "The :attribute must be greater than :gt kilobytes.",
    string: "The :attribute must be greater than :gt.",
    array: "The :attribute must have more than :gt items.",
  },
  greater_than_or_equal: {
    numeric: "The :attribute must be greater than or equal :greater_than_or_equal.",
    file: "The :attribute must be greater than or equal :greater_than_or_equal kilobytes.",
    string: "The :attribute must be greater than or equal :greater_than_or_equal.",
    array: "The :attribute must have :greater_than_or_equal items or more.",
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :gte.",
    file: "The :attribute must be greater than or equal :gte kilobytes.",
    string: "The :attribute must be greater than or equal :gte.",
    array: "The :attribute must have :gte items or more.",
  },
  in: "The selected :attribute is invalid.",
  in_array: "The :attribute must be in :in_array.",
  json: "The :attribute does not contain valid json.",
  less_than: {
    numeric: "The :attribute must be less than :less_than.",
    file: "The :attribute must be less than :less_than kilobytes.",
    string: "The :attribute must be less than :less_than.",
    array: "The :attribute must have less than :less_than items.",
  },
  lt: {
    numeric: "The :attribute must be less than :lt.",
    file: "The :attribute must be less than :lt kilobytes.",
    string: "The :attribute must be less than :lt.",
    array: "The :attribute must have less than :lt items.",
  },
  less_than_or_equal: {
    numeric: "The :attribute must be less than or equal :less_than_or_equal.",
    file: "The :attribute must be less than or equal :less_than_or_equal kilobytes.",
    string: "The :attribute must be less than or equal :less_than_or_equal.",
    array: "The :attribute must not have more than :less_than_or_equal items.",
  },
  lte: {
    numeric: "The :attribute must be less than or equal :lte.",
    file: "The :attribute must be less than or equal :lte kilobytes.",
    string: "The :attribute must be less than or equal :lte characters.",
    array: "The :attribute must not have more than :lte items.",
  },
  integer: "The :attribute must be an integer.",
  hex: "The :attribute field should have hexadecimal format",
  min: {
    numeric: "The :attribute must be at least :min.",
    string: "The :attribute must be at least :min characters.",
  },
  max: {
    numeric: "The :attribute may not be greater than :max.",
    string: "The :attribute may not be greater than :max characters.",
  },
  multiple_of: "The :attribute is not multiple of :multiple_of",
  not_in: "The selected :attribute is invalid.",
  nullable: "the :attribute is nullable.",
  numeric: "The :attribute must be a number.",
  object: "The :attribute must be an object",
  present: "The :attribute field must be present (but can be empty).",
  required: "The :attribute field is required.",
  required_if: "The :attribute field is required when :other is :value.",
  required_unless: "The :attribute field is required when :other is not :value.",
  required_with: "The :attribute field is required when :field is not empty.",
  required_with_all: "The :attribute field is required when :fields are not empty.",
  required_without: "The :attribute field is required when :field is empty.",
  required_without_all: "The :attribute field is required when :fields are empty.",
  same: "The :attribute and :same fields must match.",
  size: {
    numeric: "The :attribute must be :size.",
    string: "The :attribute must be :size characters.",
  },
  starts_with: "The :attribute must start with :value.",
  string: "The :attribute must be a string.",
  uuid: "The :attribute must be a valid v1 or v4 uuid",
  url: "The :attribute format is invalid.",
  regex: "The :attribute format is invalid.",
  not_regex: "The :attribute format is must not match regex.",
};

},{}],6:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

const attributes = require("./attributes");
var Attributes = require("./attributes");

var Messages = function (lang, messages) {
  this.lang = lang;
  this.messages = messages;
  this.customMessages = {};
  this.attributeNames = {};
};

Messages.prototype = {
  constructor: Messages,

  /**
   * Set custom messages
   *
   * @param {object} customMessages
   * @return {void}
   */
  _setCustom: function (customMessages) {
    this.customMessages = customMessages || {};
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   */
  _setAttributeNames: function (attributes) {
    this.attributeNames = attributes;
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  _setAttributeFormatter: function (func) {
    this.attributeFormatter = func;
  },

  /**
   * Get attribute name to display.
   *
   * @param  {string} attribute
   * @return {string}
   */
  _getAttributeName: function (attribute) {
    var name = attribute;

    if (this.attributeNames && this.attributeNames.hasOwnProperty(attribute)) {
      return this.attributeNames[attribute];
    } else if (this.messages && this.messages.attributes.hasOwnProperty(attribute)) {
      name = this.messages.attributes[attribute];
    }

    if (this.attributeFormatter) {
      name = this.attributeFormatter(name);
    }

    return name;
  },

  /**
   * Get all messages
   *
   * @return {object}
   */
  all: function () {
    return this.messages;
  },

  /**
   * Render message
   *
   * @param  {Rule} rule
   * @return {string}
   */
  render: function (rule, aliases = {}) {
    if (rule.customMessage) {
      return rule.customMessage;
    }
    var template = this._getTemplate(rule);

    var message;
    if (Attributes.replacements[rule.name]) {
      message = Attributes.replacements[rule.name].apply(this, [template, rule]);
    } else {
      message = this._replacePlaceholders(rule, template, {}, aliases);
    }

    return message;
  },

  /**
   * Get the template to use for given rule
   *
   * @param  {Rule} rule
   * @return {string}
   */
  _getTemplate: function (rule) {
    var messages = this.messages;
    var template = messages.def;

    var customMessages = this.customMessages;
    var formats = [rule.name + "." + rule.attribute, rule.name];

    for (var i = 0, format; i < formats.length; i++) {
      format = formats[i];
      if (customMessages.hasOwnProperty(format)) {
        template = customMessages[format];
        break;
      } else if (messages.hasOwnProperty(format)) {
        template = messages[format];
        break;
      }
    }

    if (typeof template === "object") {
      template = template[rule._getValueType()];
    }

    return template;
  },

  /**
   * Replace placeholders in the template using the data object
   *
   * @param  {Rule} rule
   * @param  {string} template
   * @param  {object} data
   * @return {string}
   */
  _replacePlaceholders: function (rule, template, data, alias = {}) {
    var message, attribute;

    data.attribute = this._getAttributeName(rule.attribute);
    // data.ATTRIBUTE = data.attribute.toLocaleUpperCase();
    // data.attribute = data.attribute.charAt(0).toLocaleUpperCase() + data.attribute.substring(1);

    data[rule.name] = data[rule.name] || rule.getParameters().join(",");

    if (typeof template === "string" && typeof data === "object") {
      message = template;

      for (attribute in data) {
        // support alternating attributes (normal, ucfirst, uppercase)

        var attrs = [attribute, this._ucfirst(attribute), attribute ? attribute.toLocaleUpperCase() : attribute];
        attrs.forEach((attr) => {
          message = message.replace(new RegExp(":" + attr, "g"), data[attribute]);
          message = message.replace(new RegExp(":" + this._ucfirst(attr), "g"), this._ucfirst(data[attribute]));
          if (data[attribute]) {
            message = message.replace(new RegExp(":" + attr.toLocaleUpperCase(), "g"), data[attribute].toLocaleUpperCase());
          }
        });

        // if we supplied alias, then use it over anything else
        message = alias.hasOwnProperty(data[attribute]) ? message.replace(data[attribute], alias[data[attribute]]) : message;
      }
    }

    return message;
  },
  _ucfirst: (data) => {
    if (typeof data === "string") {
      return data.charAt(0).toLocaleUpperCase() + data.substring(1);
    }
  },

  _titlecase: (str) => {
    if (str) {
      str = str.toLowerCase().split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    }
    return str;
  },
};

module.exports = Messages;

},{"./attributes":2}],7:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

// https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year
function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function checkFalsePositiveDates(dateString = "") {
  // fix issue with IE11 https://github.com/mikeerickson/validatorjs/pull/415/files
  dateString = dateString || "";
  if (dateString.length === 10) {
    // massage input to use yyyy-mm-dd format
    // we support yyyy/mm/dd or yyyy.mm.dd
    var normalizedDate = dateString.replace(".", "-").replace("/", "-");
    var parts = normalizedDate.split("-");
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // yyyy-mm-dd format
        var y = parseInt(parts[0]);
        var m = parseInt(parts[1]);
        var d = parseInt(parts[2]);
        if (m === 2) {
          // return leapYear(y) ? d <= 29 : d <= 28;
          if (leapYear(y)) {
            if (d > 29) {
              return false;
            }
          } else {
            if (d > 28) {
              return false;
            }
          }
        }
        if (m === 4 || m === 6 || m === 9 || m === 11) {
          if (d > 30) {
            return false;
          }
        }
      }
    }
    return true; // we are not in feburary, proceed
  }
  return true; // we are not testing formatted date, proceed to rest of validation
}

function isValidDate(dateString) {
  var testDate;
  if (typeof dateString === "number") {
    testDate = new Date(dateString);
    if (typeof testDate === "object") {
      return true;
    }
  }
  // first convert incoming string to date object and see if it correct date and format
  testDate = new Date(dateString);
  if (typeof testDate === "object") {
    if (testDate.toString() === "Invalid Date") {
      return false;
    }

    /**
     * Check for false positive dates
     * perform special check on february as JS `new Date` incorrectly returns valid date
     * Eg.  let newDate = new Date('2020-02-29')  // returns as March 02 2020
     * Eg.  let newDate = new Date('2019-02-29')  // returns as March 01 2020
     * Eg.  let newDate = new Date('2019-04-31')  // returns as April 30 2020
     */
    if (!checkFalsePositiveDates(dateString)) {
      return false;
    }

    // valid date object and not a february date
    return true;
  }

  // First check for the pattern
  var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (!regex_date.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

// NOTE: https://gist.github.com/dperini/729294
// NOTE: This pattern will still not support "localhost" and am using alternate pattern to support "localhost"

function isValidUrl(url) {
  var pattern = new RegExp(
    "^" +
      // protocol identifier (optional)
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)?\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      "(?:" +
      "(?:" +
      "[a-z0-9\\u00a1-\\uffff]" +
      "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
      ")?" +
      "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
      "$",
    "i",
  );
  return pattern.test(url);
}

var rules = {
  required: function (val) {
    var str;

    if (val === undefined || val === null) {
      return false;
    }

    str = String(val).replace(/\s/g, "");
    return str.length > 0 ? true : false;
  },

  required_if: function (val, req, attribute) {
    req = this.getParameters();
    if (req.splice(1, req.length - 1).includes(this.validator._objectPath(this.validator.input, req[0]))) {
      return this.validator.getRule("required").validate(val, req, attribute);
    }

    return true;
  },

  exclude_if: function (val, req, attrs) {
    req = this.getParameters();
    if (req.length >= 1) {
      return this.validator.input[req[0]] === req[1];
    }

    return false;
  },

  exclude_unless: function (val) {
    req = this.getParameters();
    if (req.length >= 1) {
      if (req[1] === this.validator.input[req[0]]) {
        return false;
      }
      return true;
    }
  },

  filled: function (val, req, attrs) {
    return val.length > 0;
  },

  // this rule is only used when exting immediately after validation fails
  bail: function (val, req, attribute) {
    return true;
  },

  required_unless: function (val, req, attribute) {
    req = this.getParameters();

    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule("required").validate(val, req, attribute);
    }

    return true;
  },

  required_with: function (val, req, attribute) {
    var parts = req.split(",");
    if (parts.length > 0) {
      var errors = 0;
      parts.forEach((part) => {
        !this.validator.getRule("required").validate(val, part, attribute) ? errors++ : null;
      });
      return errors === 0;
    } else {
      if (this.validator._objectPath(this.validator.input, req)) {
        return this.validator.getRule("required").validate(val, req, attribute);
      }
    }

    return true;
  },

  required_with_all: function (val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (!this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule("required").validate(val, req, attribute);
  },

  required_without: function (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }

    return this.validator.getRule("required").validate(val, req, attribute);
  },

  required_without_all: function (val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule("required").validate(val, req, attribute);
  },

  boolean: function (val) {
    return val === true || val === false || val === 0 || val === 1 || val === "0" || val === "1" || val === "true" || val === "false";
  },

  // compares the size of strings
  // with numbers, compares the value
  size: function (val, req, attribute) {
    if (val) {
      req = parseFloat(req);

      var size = this.getSize();

      return size === req;
    }

    return true;
  },

  string: function (val, req, attribute) {
    return typeof val === "string";
  },

  sometimes: function (val) {
    return true;
  },

  starts_with: function (val, req, attribute) {
    return val.startsWith(req);
  },

  begins_with: function (val, req, attribute) {
    return val.startsWith(req);
  },

  ends_with: function (val, req, attribute) {
    return val.endsWith(req);
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min: function (val, req, attribute) {
    var size = this.getSize();
    return size >= req;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max: function (val, req, attribute) {
    var size = this.getSize();
    return size <= req;
  },

  between: function (val, req, attribute) {
    req = this.getParameters();
    var size = this.getSize();
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },

  email: function (val) {
    // Added umlaut support https://github.com/skaterdav85/validatorjs/issues/308
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)) {
      // added support domain 3-n level https://github.com/skaterdav85/validatorjs/issues/384
      re = /^((?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)+)*$/;
    }

    var result = re.test(val);
    if (result) {
      var parts = val.split("@");
      result = parts.length > 0 ? !parts[0].endsWith(".") : false;
    }
    return result;
  },

  numeric: function (val) {
    var num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === "number" && !isNaN(num) && typeof val !== "boolean") {
      return true;
    } else {
      return false;
    }
  },

  array: function (val) {
    return val instanceof Array;
  },

  object: function (val) {
    return val instanceof Object;
  },

  url: function (url) {
    // NOTE: using isValidUrl (see above), localhost is still failing.
    // Used suggested regEx to fix issue for now as it will cure issue and not break backwards compatability

    // https://github.com/mikeerickson/validatorjs/issues/284
    return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}|(localhost)\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/i.test(url);
  },

  uuid: function (val, req, attr) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
  },

  alpha: function (val) {
    return /^[a-zA-Z]+$/.test(val);
  },

  alpha_dash: function (val) {
    return /^[a-zA-Z0-9_\-]+$/.test(val);
  },

  alpha_num: function (val) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },

  alpha_numeric: function (val) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },

  same: function (val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 === val2) {
      return true;
    }

    return false;
  },

  different: function (val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 !== val2) {
      return true;
    }

    return false;
  },

  in: function (val, req) {
    var list, i;

    if (val) {
      list = this.getParameters();
    }

    if (val && !(val instanceof Array)) {
      var localValue = val;

      for (i = 0; i < list.length; i++) {
        if (typeof list[i] === "string") {
          localValue = String(val);
        }

        if (localValue === list[i]) {
          return true;
        }
      }

      return false;
    }

    if (val && val instanceof Array) {
      for (i = 0; i < val.length; i++) {
        if (list.indexOf(val[i]) < 0) {
          return false;
        }
      }
    }

    return true;
  },

  in_array: function (val, req, attrs) {
    if (typeof req === "undefined") {
      return true;
    }

    var arr = req
      .replace(/["'\[\]]/g, "")
      .replace(/[|]/g, ",")
      .split(/, ?/);

    if (typeof val === "string") {
      var [, flag] = req.split(":");

      if (flag === "true") {
        return arr.includes(val);
      } else {
        const test = (arr, q) => arr.findIndex((item) => q.toLowerCase() === item.toLowerCase());
        return test(arr, val) !== -1;
      }
    } else {
      arr = arr.map((item) => {
        return parseInt(item);
      });
      return arr.includes(val);
    }
  },

  json: function (val, req) {
    try {
      JSON.parse(val);
    } catch (e) {
      return false;
    }
    return true;
  },

  multiple_of: function (val, req) {
    return req % val === 0;
  },

  not_in: function (val, req) {
    var list = this.getParameters();
    var len = list.length;
    var returnVal = true;

    for (var i = 0; i < len; i++) {
      var localValue = val;

      if (typeof list[i] === "string") {
        localValue = String(val);
      }

      if (localValue === list[i]) {
        returnVal = false;
        break;
      }
    }

    return returnVal;
  },

  accepted: function (val) {
    if (val === "on" || val === "yes" || val === 1 || val === "1" || val === true) {
      return true;
    }

    return false;
  },

  confirmed: function (val, req, key) {
    var confirmedKey = key + "_confirmation";

    if (this.validator.input[confirmedKey] === val) {
      return true;
    }

    return false;
  },

  distinct: function (val, req) {
    var distinct = [...new Set(val)];
    return distinct.length === val.length;
  },

  integer: function (val) {
    return String(parseInt(val, 10)) === String(val);
  },

  nullable: function (val = null) {
    return val === null;
  },

  digits: function (val, req, attribute) {
    var numericRule = this.validator.getRule("numeric");

    if (typeof val === "number") {
      return numericRule.validate(val, req, attribute);
    } else {
      if (numericRule.validate(val, req, attribute) && String(val.trim()).length === parseInt(req)) {
        return true;
      }
    }

    return false;
  },

  digits_between: function (val, req, attribute) {
    var numericRule = this.validator.getRule("numeric");
    var params = this.getParameters();
    var valueDigitsCount = String(val).length;
    var min = parseFloat(params[0], 10);
    var max = parseFloat(params[1], 10);

    if (numericRule.validate(val, params, attribute) && valueDigitsCount >= min && valueDigitsCount <= max) {
      return true;
    }

    return false;
  },

  regex: function (val, req) {
    var reqPattern = req;
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : "";

    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },

  not_regex: function (val, req) {
    var reqPattern = req;
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : "";

    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },

  date: function (val, format) {
    return isValidDate(val);
  },

  present: function (val) {
    return typeof val !== "undefined";
  },

  after: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() < new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  after_or_equal: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() <= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() > new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before_or_equal: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() >= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  greater_than: function (val, req) {
    return val > req;
  },

  gt: function (val, req) {
    return val > req;
  },

  greater_than_or_equal: function (val, req) {
    return val >= req;
  },

  gte: function (val, req) {
    return val >= req;
  },

  less_than: function (val, req) {
    return val < req;
  },

  lt: function (val, req) {
    return val < req;
  },

  less_than_or_equal: function (val, req) {
    return val <= req;
  },

  lte: function (val, req) {
    return val <= req;
  },

  hex: function (val) {
    return /^[0-9a-f]+$/i.test(val);
  },

  ipv4: function (val, req, attribute) {
    if (typeof val != "string") return false;

    // regex to check that each octet is valid
    var er = /^[0-9]+$/;
    // ipv4 octets are delimited by dot
    octets = val.split(".");
    // check 1: ipv4 address should contains 4 octets
    if (octets.length != 4) return false;

    for (var i = 0; i < octets.length; i++) {
      const element = octets[i];
      // check 2: each octet should be integer bigger than 0
      if (!er.test(element)) return false;

      // check 3: each octet value should be less than 256
      var octetValue = parseInt(element);
      if (octetValue >= 256) return false;
    }

    // if all checks passed, we know it's valid IPv4 address!
    return true;
  },

  ipv6: function (val, req, attribute) {
    if (typeof val != "string") return false;

    // regex to check that each hextet is valid
    var er = /^[0-9a-f]+$/;
    // ipv6 hextets are delimited by colon
    hextets = val.split(":");

    // check 1: ipv6 should contain only one consecutive colons
    colons = val.match(/::/);
    if (colons != null && val.match(/::/g).length > 1) return false;

    // check 2: ipv6 should not be ending or starting with colon
    //          edge case: not with consecutive colons
    if (val[0] == ":" && (colons == null || (colons != null && colons.index != 0))) return false;
    if (val[val.length - 1] == ":" && (colons == null || (colons != null && colons.index != val.length - 2))) return false;

    // check 3: ipv6 should contain no less than 3 sector
    //         minimum ipv6 addres - ::1
    if (3 > hextets.length) return false;

    // check 4: ipv6 should contain no more than 8 sectors
    //         only 1 edge case: when first or last sector is ommited
    var isEdgeCase = hextets.length == 9 && colons != null && (colons.index == 0 || colons.index == val.length - 2);
    if (hextets.length > 8 && !isEdgeCase) return false;

    // check 5: ipv6 should contain exactly one consecutive colons if it has less than 8 sectors
    if (hextets.length != 8 && colons == null) return false;

    for (var i = 0; i < hextets.length; i++) {
      const element = hextets[i];

      if (element.length == 0) continue;

      // check 6: all of hextets should contain numbers from 0 to f (in hexadecimal)
      if (!er.test(element)) return false;

      // check 7: all of hextet values should be less then ffff (in hexadeimal)
      //          checking using length of hextet. lowest invalid value's length is 5.
      //          so all valid hextets are length of 4 or less
      if (element.length > 4) return false;
    }
    return true;
  },

  ip: function (val, req, attribute) {
    return rules["ipv4"](val, req, attribute) || rules["ipv6"](val, req, attribute);
  },
};

var missedRuleValidator = function () {
  throw new Error("Validator `" + this.name + "` is not defined!");
};
var missedRuleMessage;

function Rule(name, fn, async) {
  this.name = name;
  this.fn = fn;
  this.passes = null;
  this._customMessage = undefined;
  this.async = async;
}

Rule.prototype = {
  /**
   * Validate rule
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  validate: function (inputValue, ruleValue, attribute, callback) {
    var _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === "function") {
      this.callback = callback;
      var handleResponse = function (passes, message) {
        _this.response(passes, message);
      };

      if (this.async) {
        return this._apply(inputValue, ruleValue, attribute, handleResponse);
      } else {
        return handleResponse(this._apply(inputValue, ruleValue, attribute));
      }
    }
    return this._apply(inputValue, ruleValue, attribute);
  },

  /**
   * Apply validation function
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  _apply: function (inputValue, ruleValue, attribute, callback) {
    var fn = this.isMissed() ? missedRuleValidator : this.fn;

    return fn.apply(this, [inputValue, ruleValue, attribute, callback]);
  },

  /**
   * Set validating data
   *
   * @param {string} attribute
   * @param {mixed} inputValue
   * @param {mixed} ruleValue
   * @return {void}
   */
  _setValidatingData: function (attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  },

  /**
   * Get parameters
   *
   * @return {array}
   */
  getParameters: function () {
    var value = [];

    if (typeof this.ruleValue === "string") {
      value = this.ruleValue.split(",");
    }

    if (typeof this.ruleValue === "number") {
      value.push(this.ruleValue);
    }

    if (this.ruleValue instanceof Array) {
      value = this.ruleValue;
    }

    return value;
  },

  /**
   * Get true size of value
   *
   * @return {integer|float}
   */
  getSize: function () {
    var value = this.inputValue;

    if (value instanceof Array) {
      return value.length;
    }

    if (typeof value === "number") {
      return value;
    }

    if (this.validator._hasNumericRule(this.attribute)) {
      return parseFloat(value, 10);
    }

    return value.length;
  },

  /**
   * Get the type of value being checked; numeric or string.
   *
   * @return {string}
   */
  _getValueType: function () {
    if (typeof this.inputValue === "number" || this.validator._hasNumericRule(this.attribute)) {
      return "numeric";
    }

    return "string";
  },

  /**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */
  response: function (passes, message) {
    this.passes = passes === undefined || passes === true;
    this._customMessage = message;
    this.callback(this.passes, message);
  },

  /**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */
  setValidator: function (validator) {
    this.validator = validator;
  },

  /**
   * Check if rule is missed
   *
   * @return {boolean}
   */
  isMissed: function () {
    return typeof this.fn !== "function";
  },

  get customMessage() {
    return this.isMissed() ? missedRuleMessage : this._customMessage;
  },
};

var manager = {
  /**
   * List of async rule names
   *
   * @type {Array}
   */
  asyncRules: [],

  /**
   * Implicit rules (rules to always validate)
   *
   * @type {Array}
   */
  implicitRules: ["required", "required_if", "required_unless", "required_with", "required_with_all", "required_without", "required_without_all", "accepted", "present"],

  /**
   * Get rule by name
   *
   * @param  {string} name
   * @param {Validator}
   * @return {Rule}
   */
  make: function (name, validator) {
    var async = this.isAsync(name);
    var rule = new Rule(name, rules[name], async);
    rule.setValidator(validator);
    return rule;
  },

  /**
   * Determine if given rule is async
   *
   * @param  {string}  name
   * @return {boolean}
   */
  isAsync: function (name) {
    for (var i = 0, len = this.asyncRules.length; i < len; i++) {
      if (this.asyncRules[i] === name) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if rule is implicit (should always validate)
   *
   * @param {string} name
   * @return {boolean}
   */
  isImplicit: function (name) {
    return this.implicitRules.indexOf(name) > -1;
  },

  /**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  register: function (name, fn) {
    rules[name] = fn;
  },

  /**
   * Register new implicit rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerImplicit: function (name, fn) {
    this.register(name, fn);
    this.implicitRules.push(name);
  },

  /**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsync: function (name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  },

  /**
   * Register implicit async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsyncImplicit: function (name, fn) {
    this.registerImplicit(name, fn);
    this.asyncRules.push(name);
  },

  registerMissedRuleValidator: function (fn, message) {
    missedRuleValidator = fn;
    missedRuleMessage = message;
  },
};

module.exports = manager;

},{}],8:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

var Success = function () {
  this.successes = {};
};

Success.prototype = {
  constructor: Success,

  /**
   * Add new success message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function (attribute, message) {
    if (!this.has(attribute)) {
      this.successes[attribute] = [];
    }

    if (this.successes[attribute].indexOf(message) === -1) {
      this.successes[attribute].push(message);
    }
  },

  /**
   * Returns an array of success messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of success messages
   */
  get: function (attribute) {
    if (this.has(attribute)) {
      return this.successes[attribute];
    }

    return [];
  },

  /**
   * Returns the first success message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First success message or false
   */
  first: function (attribute) {
    if (this.has(attribute)) {
      return this.successes[attribute][0];
    }

    return false;
  },

  /**
   * Get all success messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function () {
    return this.successes;
  },

  /**
   * Get all success messages from all failing attributes
   *
   * @return {array} Failed fields
   */
  fields: function () {
    return Object.keys(this.successes);
  },

  /**
   * Get all success messages from all failing attributes
   *
   * @return {array} Failed fields
   */
  keys: function () {
    return Object.keys(this.successes);
  },

  /**
   * Determine if there are any success messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function (attribute) {
    if (this.successes.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  },

  /**
   * Returns number of successes
   *
   * @return {number}
   */
  successCount: function () {
    return Object.keys(this.successes).length;
  },
};

module.exports = Success;

},{}],9:[function(require,module,exports){
/*-------------------------------------------------------------------------------------------
 * validatorjs
 *
 * Copyright (c) 2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

var Lang = require("./lang");
var Rules = require("./rules");
var Errors = require("./errors");
var Success = require("./success");
var AsyncResolvers = require("./async");
var Attributes = require("./attributes");

var Validator = function (input, rules, customMessages, language = null, aliases = {}) {
  var lang = language ? language : Validator.getDefaultLang();
  this.input = input || {};
  this.aliases = aliases || {};

  this.messages = Lang._make(lang);
  this.messages._setCustom(customMessages);
  this.setAttributeFormatter(Validator.prototype.attributeFormatter);

  this.errors = new Errors();
  this.errorCount = 0;

  this.successes = new Success();
  this.successCount = 0;

  this.hasAsync = false;
  this.rules = this._parseRules(rules);
};

Validator.prototype = {
  constructor: Validator,

  /**
   * Default language
   *
   * @type {string}
   */
  lang: "en",

  /**
   * Numeric based rules
   *
   * @type {array}
   */
  numericRules: ["integer", "numeric"],

  /**
   * Attribute formatter.
   *
   * @type {function}
   */
  attributeFormatter: Attributes.formatter,

  /**
   * Run validator
   *
   * @return {boolean} Whether it passes; true = passes, false = fails
   */
  check: function () {
    var self = this;

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ["sometimes"]) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        var ruleKeys = [];
        attributeRules.forEach((item) => {
          return ruleKeys.push(item.name);
        });

        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);

        if (!rulePassed) {
          this._addFailure(rule);
          if (ruleKeys.includes("bail")) {
            break;
          }
        } else {
          this._addSuccess(rule);
        }

        if (this._shouldStopValidating(attribute, rulePassed)) {
          break;
        }
      }
    }

    return this.errorCount === 0;
  },

  /**
   * Run async validator
   *
   * @param {function} passes
   * @param {function} fails
   * @return {void}
   */
  checkAsync: function (passes, fails) {
    var _this = this;
    passes = passes || function () {};
    fails = fails || function () {};

    var failsOne = function (rule, message) {
      _this._addFailure(rule, message);
    };

    var resolvedAll = function (allPassed) {
      if (allPassed) {
        passes();
      } else {
        fails();
      }
    };

    var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);

    var validateRule = function (inputValue, ruleOptions, attribute, rule) {
      return function () {
        var resolverIndex = asyncResolvers.add(rule);
        rule.validate(inputValue, ruleOptions.value, attribute, function () {
          asyncResolvers.resolve(resolverIndex);
        });
      };
    };

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ["sometimes"]) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
        ruleOptions = attributeRules[i];

        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }
        validateRule(inputValue, ruleOptions, attribute, rule)();
      }
    }

    asyncResolvers.enableFiring();
    asyncResolvers.fire();
  },

  /**
   * Add failure and error message for given rule
   *
   * @param {Rule} rule
   */
  _addFailure: function (rule) {
    var msg = this.messages.render(rule, this.aliases);
    this.errors.add(rule.attribute, msg);
    this.errorCount++;
  },

  /**
   * Add failure and error message for given rule
   *
   * @param {Rule} rule
   */
  _addSuccess: function (rule) {
    var msg = this.messages.render(rule, this.aliases);
    this.successes.add(rule.attribute, msg);
    this.successCount++;
  },

  /**
   * Flatten nested object, normalizing { foo: { bar: 1 } } into: { 'foo.bar': 1 }
   *
   * @param  {object} nested object
   * @return {object} flattened object
   */
  _flattenObject: function (obj) {
    var flattened = {};

    function recurse(current, property) {
      if (!property && Object.getOwnPropertyNames(current).length === 0) {
        return;
      }
      if (Object(current) !== current || Array.isArray(current)) {
        flattened[property] = current;
      } else {
        var isEmpty = true;
        for (var p in current) {
          isEmpty = false;
          recurse(current[p], property ? property + "." + p : p);
        }
        if (isEmpty) {
          flattened[property] = {};
        }
      }
    }
    if (obj) {
      recurse(obj);
    }
    return flattened;
  },

  /**
   * Extract value from nested object using string path with dot notation
   *
   * @param  {object} object to search in
   * @param  {string} path inside object
   * @return {any|void} value under the path
   */
  _objectPath: function (obj, path) {
    if (Object.prototype.hasOwnProperty.call(obj, path)) {
      return obj[path];
    }

    var keys = path
      .replace(/\[(\w+)\]/g, ".$1")
      .replace(/^\./, "")
      .split(".");
    var copy = {};
    for (var attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = obj[attr];
      }
    }

    for (var i = 0, l = keys.length; i < l; i++) {
      if (typeof copy === "object" && copy !== null && Object.hasOwnProperty.call(copy, keys[i])) {
        copy = copy[keys[i]];
      } else {
        return;
      }
    }
    return copy;
  },

  /**
   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
   *
   * @param  {object} rules
   * @return {object}
   */
  _parseRules: function (rules) {
    var parsedRules = {};
    rules = this._flattenObject(rules);

    for (var attribute in rules) {
      var rulesArray = rules[attribute];

      this._parseRulesCheck(attribute, rulesArray, parsedRules);
    }
    return parsedRules;
  },

  _parseRulesCheck: function (attribute, rulesArray, parsedRules, wildCardValues) {
    if (attribute.indexOf("*") > -1) {
      this._parsedRulesRecurse(attribute, rulesArray, parsedRules, wildCardValues);
    } else {
      this._parseRulesDefault(attribute, rulesArray, parsedRules, wildCardValues);
    }
  },

  _parsedRulesRecurse: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var parentPath = attribute.substr(0, attribute.indexOf("*") - 1);
    var propertyValue = this._objectPath(this.input, parentPath);

    if (propertyValue) {
      for (var propertyNumber = 0; propertyNumber < propertyValue.length; propertyNumber++) {
        var workingValues = wildCardValues ? wildCardValues.slice() : [];
        workingValues.push(propertyNumber);
        this._parseRulesCheck(attribute.replace("*", propertyNumber), rulesArray, parsedRules, workingValues);
      }
    }
  },

  _parseRulesDefault: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var attributeRules = [];

    if (rulesArray instanceof Array) {
      rulesArray = this._prepareRulesArray(rulesArray);
    }

    if (typeof rulesArray === "string") {
      rulesArray = rulesArray.split("|");
    }

    for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
      rule = typeof rulesArray[i] === "string" ? this._extractRuleAndRuleValue(rulesArray[i]) : rulesArray[i];
      if (rule.value) {
        rule.value = this._replaceWildCards(rule.value, wildCardValues);
        this._replaceWildCardsMessages(wildCardValues);
      }

      if (Rules.isAsync(rule.name)) {
        this.hasAsync = true;
      }
      attributeRules.push(rule);
    }

    parsedRules[attribute] = attributeRules;
  },

  _replaceWildCards: function (path, nums) {
    if (!nums) {
      return path;
    }

    var path2 = path;
    nums.forEach(function (value) {
      if (Array.isArray(path2)) {
        path2 = path2[0];
      }
      const pos = path2.indexOf("*");
      if (pos === -1) {
        return path2;
      }
      path2 = path2.substr(0, pos) + value + path2.substr(pos + 1);
    });
    if (Array.isArray(path)) {
      path[0] = path2;
      path2 = path;
    }
    return path2;
  },

  _replaceWildCardsMessages: function (nums) {
    var customMessages = this.messages.customMessages;
    var self = this;
    Object.keys(customMessages).forEach(function (key) {
      if (nums) {
        var newKey = self._replaceWildCards(key, nums);
        customMessages[newKey] = customMessages[key];
      }
    });

    this.messages._setCustom(customMessages);
  },
  /**
   * Prepare rules if it comes in Array. Check for objects. Need for type validation.
   *
   * @param  {array} rulesArray
   * @return {array}
   */
  _prepareRulesArray: function (rulesArray) {
    var rules = [];

    for (var i = 0, len = rulesArray.length; i < len; i++) {
      if (typeof rulesArray[i] === "object") {
        for (var rule in rulesArray[i]) {
          rules.push({
            name: rule,
            value: rulesArray[i][rule],
          });
        }
      } else {
        rules.push(rulesArray[i]);
      }
    }

    return rules;
  },

  /**
   * Determines if the attribute is supplied with the original data object.
   *
   * @param  {array} attribute
   * @return {boolean}
   */
  _suppliedWithData: function (attribute) {
    return this.input.hasOwnProperty(attribute);
  },

  /**
   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
   *
   * @param  {string} ruleString min:3
   * @return {object} object containing the name of the rule and value
   */
  _extractRuleAndRuleValue: function (ruleString) {
    var rule = {},
      ruleArray;

    rule.name = ruleString;

    if (ruleString.indexOf(":") >= 0) {
      ruleArray = ruleString.split(":");
      rule.name = ruleArray[0];
      rule.value = ruleArray.slice(1).join(":");
    }

    return rule;
  },

  /**
   * Determine if attribute has any of the given rules
   *
   * @param  {string}  attribute
   * @param  {array}   findRules
   * @return {boolean}
   */
  _hasRule: function (attribute, findRules) {
    var rules = this.rules[attribute] || [];
    for (var i = 0, len = rules.length; i < len; i++) {
      if (findRules.indexOf(rules[i].name) > -1) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if attribute has any numeric-based rules.
   *
   * @param  {string}  attribute
   * @return {Boolean}
   */
  _hasNumericRule: function (attribute) {
    return this._hasRule(attribute, this.numericRules);
  },

  /**
   * Determine if rule is validatable
   *
   * @param  {Rule}   rule
   * @param  {mixed}  value
   * @return {boolean}
   */
  _isValidatable: function (rule, value) {
    // if (rule.name === "min") {
    //   return true;
    // }
    if (Array.isArray(value)) {
      return true;
    }
    if (Rules.isImplicit(rule.name)) {
      return true;
    }

    return this.getRule("required").validate(value);
  },

  /**
   * Determine if we should stop validating.
   *
   * @param  {string} attribute
   * @param  {boolean} rulePassed
   * @return {boolean}
   */
  _shouldStopValidating: function (attribute, rulePassed) {
    var stopOnAttributes = this.stopOnAttributes;
    if (typeof stopOnAttributes === "undefined" || stopOnAttributes === false || rulePassed === true) {
      return false;
    }

    if (stopOnAttributes instanceof Array) {
      return stopOnAttributes.indexOf(attribute) > -1;
    }

    return true;
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   * @return {void}
   */
  setAttributeNames: function (attributes) {
    this.messages._setAttributeNames(attributes);
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  setAttributeFormatter: function (func) {
    this.messages._setAttributeFormatter(func);
  },

  /**
   * Get validation rule
   *
   * @param  {string} name
   * @return {Rule}
   */
  getRule: function (name) {
    return Rules.make(name, this);
  },

  /**
   * Stop on first error.
   *
   * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
   * @return {void}
   */
  stopOnError: function (attributes) {
    this.stopOnAttributes = attributes;
  },

  /**
   * Determine if validation passes
   *
   * @param {function} passes
   * @return {boolean|undefined}
   */
  passes: function (passes) {
    var async = this._checkAsync("passes", passes);
    if (async) {
      return this.checkAsync(passes);
    }
    return this.check();
  },

  /**
   * Determine if validation fails
   *
   * @param {function} fails
   * @return {boolean|undefined}
   */
  fails: function (fails) {
    var async = this._checkAsync("fails", fails);
    if (async) {
      return this.checkAsync(function () {}, fails);
    }
    return !this.check();
  },

  /**
   * Check if validation should be called asynchronously
   *
   * @param  {string}   funcName Name of the caller
   * @param  {function} callback
   * @return {boolean}
   */
  _checkAsync: function (funcName, callback) {
    var hasCallback = typeof callback === "function";
    if (this.hasAsync && !hasCallback) {
      throw funcName + " expects a callback when async rules are being tested.";
    }

    return this.hasAsync || hasCallback;
  },
};

/**
 * Set messages for language
 *
 * @param {string} lang
 * @param {object} messages
 * @return {this}
 */
Validator.setMessages = function (lang, messages) {
  Lang._set(lang, messages);
  return this;
};

/**
 * Get messages for given language
 *
 * @param  {string} lang
 * @return {Messages}
 */
Validator.getMessages = function (lang) {
  return Lang._get(lang);
};

/**
 * Set default language to use
 *
 * @param {string} lang
 * @return {void}
 */
Validator.useLang = function (lang = "en") {
  this.prototype.lang = lang;
};

/**
 * Resets lanague to english
 * @return {void}
 */
Validator.resetLang = function () {
  this.prototype.lang = "en";
};

/**
 * Resets lanague to english
 * @return {void}
 */
Validator.useDefaultLang = function () {
  this.prototype.lang = "en";
};

/**
 * Get default language
 *
 * @return {string}
 */
Validator.getDefaultLang = function () {
  return this.prototype.lang;
};

/**
 * Set the attribute formatter.
 *
 * @param {fuction} func
 * @return {void}
 */
Validator.setAttributeFormatter = function (func) {
  this.prototype.attributeFormatter = func;
};

/**
 * Stop on first error.
 *
 * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
 * @return {void}
 */
Validator.stopOnError = function (attributes) {
  this.prototype.stopOnAttributes = attributes;
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.register = function (name, fn, message, fnReplacement) {
  var lang = Validator.getDefaultLang();
  Rules.register(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @param  {function} fnReplacement
 * @return {void}
 */
Validator.registerImplicit = function (name, fn, message, fnReplacement) {
  var lang = Validator.getDefaultLang();
  Rules.registerImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsync = function (name, fn, message, fnReplacement) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsync(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsyncImplicit = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsyncImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register validator for missed validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerMissedRuleValidator = function (fn, message) {
  Rules.registerMissedRuleValidator(fn, message);
};

module.exports = Validator;

},{"./async":1,"./attributes":2,"./errors":3,"./lang":4,"./rules":7,"./success":8}]},{},[9])(9)
});
