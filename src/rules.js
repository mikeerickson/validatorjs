
// https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year
function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function checkFalsePositiveDates(dateString = '') {

  if (dateString.length === 10) {

    // massage input to use yyyy-mm-dd format
    // we support yyyy/mm/dd or yyyy.mm.dd
    let normalizedDate = dateString.replace('.', '-').replace('/', '-');
    let parts = normalizedDate.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // yyyy-mm-dd format
        let y = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        let d = parseInt(parts[2]);
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
  let testDate;
  if (typeof dateString === 'number') {
    testDate = new Date(dateString);
    if (typeof testDate === 'object') {
      return true;
    }
  }
  // first convert incoming string to date object and see if it correct date and format
  testDate = new Date(dateString);
  if (typeof testDate === 'object') {
    if (testDate.toString() === 'Invalid Date') {
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
    if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
      return this.validator.getRule("required").validate(val);
    }

    return true;
  },

  required_unless: function (val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule("required").validate(val);
    }

    return true;
  },

  required_with: function (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return this.validator.getRule("required").validate(val);
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

    return this.validator.getRule("required").validate(val);
  },

  required_without: function (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }

    return this.validator.getRule("required").validate(val);
  },

  required_without_all: function (val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule("required").validate(val);
  },

  boolean: function (val) {
    return (
      val === true ||
      val === false ||
      val === 0 ||
      val === 1 ||
      val === "0" ||
      val === "1" ||
      val === "true" ||
      val === "false"
    );
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
    return re.test(val);
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

  url: function (url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
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

  integer: function (val) {
    return String(parseInt(val, 10)) === String(val);
  },

  digits: function (val, req) {
    var numericRule = this.validator.getRule('numeric');
    if (numericRule.validate(val) && String(val.trim()).length === parseInt(req)) {
      return true;
    }

    return false;
  },

  digits_between: function (val) {
    var numericRule = this.validator.getRule("numeric");
    var req = this.getParameters();
    var valueDigitsCount = String(val).length;
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);

    if (numericRule.validate(val) && valueDigitsCount >= min && valueDigitsCount <= max) {
      return true;
    }

    return false;
  },

  regex: function (val, req) {
    let reqPattern = req;
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

  hex: function (val) {
    return /^[0-9a-f]+$/i.test(val);
  },

  ipv4: function (val, req, attribute) {
    if (typeof val != 'string')
      return false;

    // regex to check that each octet is valid
    var er = /^[0-9]+$/;
    // ipv4 octets are delimited by dot
    octets = val.split('.');
    // check 1: ipv4 address should contains 4 octets
    if (octets.length != 4)
      return false;

    for (let i = 0; i < octets.length; i++) {
      const element = octets[i];
      // check 2: each octet should be integer bigger than 0
      if (!er.test(element))
        return false;

      // check 3: each octet value should be less than 256
      var octetValue = parseInt(element);
      if (octetValue >= 256)
        return false;
    }

    // if all checks passed, we know it's valid IPv4 address!
    return true;
  },

  ipv6: function (val, req, attribute) {
    if (typeof val != 'string')
      return false;

    // regex to check that each hextet is valid
    var er = /^[0-9a-f]+$/;
    // ipv6 hextets are delimited by colon
    hextets = val.split(':');

    // check 1: ipv6 should contain only one consecutive colons
    colons = val.match(/::/);
    if (colons != null && val.match(/::/g).length > 1)
      return false;

    // check 2: ipv6 should not be ending or starting with colon
    //          edge case: not with consecutive colons
    if (val[0] == ':' && (colons == null || (colons != null && colons.index != 0)))
      return false;
    if (val[val.length - 1] == ':' && (colons == null || (colons != null && colons.index != val.length - 2)))
      return false;

    // check 3: ipv6 should contain no less than 3 sector
    //         minimum ipv6 addres - ::1
    if (3 > hextets.length)
      return false;

    // check 4: ipv6 should contain no more than 8 sectors
    //         only 1 edge case: when first or last sector is ommited
    var isEdgeCase = (hextets.length == 9 && colons != null && (colons.index == 0 || colons.index == val.length - 2));
    if (hextets.length > 8 && !isEdgeCase)
      return false;

    // check 5: ipv6 should contain exactly one consecutive colons if it has less than 8 sectors
    if (hextets.length != 8 && colons == null)
      return false;

    for (let i = 0; i < hextets.length; i++) {
      const element = hextets[i];

      if (element.length == 0)
        continue;

      // check 6: all of hextets should contain numbers from 0 to f (in hexadecimal)
      if (!er.test(element))
        return false;

      // check 7: all of hextet values should be less then ffff (in hexadeimal)
      //          checking using length of hextet. lowest invalid value's length is 5.
      //          so all valid hextets are length of 4 or less
      if (element.length > 4)
        return false;
    }
    return true;
  },

  ip: function (val, req, attribute) {
    return rules['ipv4'](val, req, attribute) || rules['ipv6'](val, req, attribute);
  }

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
  }
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
  implicitRules: [
    "required",
    "required_if",
    "required_unless",
    "required_with",
    "required_with_all",
    "required_without",
    "required_without_all",
    "accepted",
    "present"
  ],

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
  }
};

module.exports = manager;
