var rules = {

  required: function(val) {
    var str;

    if (val === undefined || val === null) {
      return false;
    }

    str = String(val).replace(/\s/g, "");
    return str.length > 0 ? true : false;
  },

  required_if: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator.input[req[0]] === req[1]) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  // compares the size of strings
  // with numbers, compares the value
  size: function(val, req, attribute) {
    if (val) {
      req = parseFloat(req);

      var size = this.getSize();

      return size === req;
    }

    return true;
  },

  string: function(val, req, attribute) {
    return typeof val === 'string';
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min: function(val, req, attribute) {
    var size = this.getSize();
    return size >= req;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max: function(val, req, attribute) {
    var size = this.getSize();
    return size <= req;
  },

  between: function(val, req, attribute) {
    req = this.getParameters();
    var size = this.getSize();
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },

  email: function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },

  numeric: function(val) {
    var num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
      return true;
    } else {
      return false;
    }
  },

  array: function(val) {
    return val instanceof Array;
  },

  url: function(url) {
    return (/^https?:\/\/\S+/).test(url);
  },

  alpha: function(val) {
    return (/^[a-zA-Z]+$/).test(val);
  },

  alpha_dash: function(val) {
    return (/^[a-zA-Z0-9_\-]+$/).test(val);
  },

  alpha_num: function(val) {
    return (/^[a-zA-Z0-9]+$/).test(val);
  },

  same: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (val1 === val2) {
      return true;
    }

    return false;
  },

  different: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (val1 !== val2) {
      return true;
    }

    return false;
  },

  "in": function(val, req) {
    var list, i;

    if (val) {
      list = req.split(',');
    }

    if (val && !(val instanceof Array)) {
      val = String(val); // if it is a number

      for (i = 0; i < list.length; i++) {
        if (val === list[i]) {
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

  not_in: function(val, req) {
    var list = req.split(',');
    var len = list.length;
    var returnVal = true;

    val = String(val); // convert val to a string if it is a number

    for (var i = 0; i < len; i++) {
      if (val === list[i]) {
        returnVal = false;
        break;
      }
    }

    return returnVal;
  },

  accepted: function(val) {
    if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
      return true;
    }

    return false;
  },

  confirmed: function(val, req, key) {
    var confirmedKey = key + '_confirmation';

    if (this.validator.input[confirmedKey] === val) {
      return true;
    }

    return false;
  },

  integer: function(val) {
    return String(parseInt(val, 10)) === String(val);
  },

  digits: function(val, req) {
    var numericRule = this.validator.getRule('numeric');
    if (numericRule.validate(val) && String(val).length === parseInt(req)) {
      return true;
    }

    return false;
  },

  regex: function(val, req) {
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : "i";
    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!val.match(req);
  }

};

function Rule(name, fn, async) {
  this.name = name;
  this.fn = fn;
  this.passes = null;
  this.customMessage = undefined;
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
  validate: function(inputValue, ruleValue, attribute, callback) {
    var _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === 'function') {
      this.callback = callback;
      var handleResponse = function(passes, message) {
        _this.response(passes, message);
      };

      if (this.async) {
        return this.fn.apply(this, [inputValue, ruleValue, attribute, handleResponse]);
      } else {
        return handleResponse(this.fn.apply(this, [inputValue, ruleValue, attribute]));
      }
    }
    return this.fn.apply(this, [inputValue, ruleValue, attribute]);
  },

  /**
   * Set validating data
   *
   * @param {string} attribute
   * @param {mixed} inputValue
   * @param {mixed} ruleValue
   * @return {void}
   */
  _setValidatingData: function(attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  },

  /**
   * Get parameters
   *
   * @return {array}
   */
  getParameters: function() {
    return this.ruleValue ? this.ruleValue.split(',') : [];
  },

  /**
   * Get true size of value
   *
   * @return {integer|float}
   */
  getSize: function() {
    var value = this.inputValue;

    if (value instanceof Array) {
      return value.length;
    }

    if (typeof value === 'number') {
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
  _getValueType: function() {

    if (typeof this.inputValue === 'number' || this.validator._hasNumericRule(this.attribute)) {
      return 'numeric';
    }

    return 'string';
  },

  /**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */
  response: function(passes, message) {
    this.passes = (passes === undefined || passes === true);
    this.customMessage = message;
    this.callback(this.passes, message);
  },

  /**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */
  setValidator: function(validator) {
    this.validator = validator;
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
  implicitRules: ['required', 'required_if', 'accepted'],

  /**
   * Get rule by name
   *
   * @param  {string} name
   * @param {Validator}
   * @return {Rule}
   */
  make: function(name, validator) {
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
  isAsync: function(name) {
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
  isImplicit: function(name) {
    return this.implicitRules.indexOf(name) > -1;
  },

  /**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  register: function(name, fn) {
    rules[name] = fn;
  },

  /**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsync: function(name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  }

};


module.exports = manager;
