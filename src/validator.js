// Get required modules
var Rules = require('./rules');
var Lang = require('./lang');
var Errors = require('./validatorerrors');
var AsyncResolvers = require('./async');

function langs() {
	require('./lang/en');
	require('./lang/ru');
}

var Validator = function(input, rules, customMessages) {
	var lang = Validator.getLang();
	this.input = input;

	this.messages = Lang._get(lang);
	this.messages._setCustom(customMessages);
	this.errors = new Errors();

	this.errorCount = 0;
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
	lang: 'en',

	/**
	 * Numeric based rules
	 *
	 * @type {array}
	 */
	numericRules: ['integer', 'numeric'],

	/**
	 * Run validator
	 *
	 * @return {boolean} Whether it passes; true = passes, false = fails
	 */
	check: function() {
		var self = this;

		for (var attribute in this.rules) {
			var attributeRules = this.rules[attribute];
			var inputValue = this.input[attribute]; // if it doesnt exist in input, it will be undefined

			for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
				ruleOptions = attributeRules[i];
				rule = this.getRule(ruleOptions.name);

				if (!this._isValidatable(rule, attribute, inputValue)) {
					continue;
				}
				
				if (!rule.validate(inputValue, ruleOptions.value, attribute)) {
					this._addFailure(rule);
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
	checkAsync: function(passes, fails) {
		var _this = this;

		var failsOne = function(rule, message) {
			_this._addFailure(rule, message);
		};

		var resolvedAll = function(allPassed) {
			if (allPassed) {
				passes();
			}
			else {
				fails();
			}
		};

		var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);

		for (var attribute in this.rules) {
			var attributeRules = this.rules[attribute];
			var inputValue = this.input[attribute]; // if it doesnt exist in input, it will be undefined

			for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
				ruleOptions = attributeRules[i];

				rule = this.getRule(ruleOptions.name);

				asyncResolvers.add(rule, i);

				(function(inputValue, ruleOptions, attribute, i, rule) {
					rule.validate(inputValue, ruleOptions.value, attribute, function() { asyncResolvers.resolve(i); });
				})(inputValue, ruleOptions, attribute, i, rule);
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
	_addFailure: function(rule) {
		if ( !this.errors.hasOwnProperty(rule.attribute) ) {
			this.errors[rule.attribute] = [];
		}

		var msg = this.messages.render(rule);
		
		this.errors[rule.attribute].push(msg);
		this.errorCount++;
	},

	/**
	 * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
	 *
	 * @param  {object} rules
	 * @return {object}
	 */
	_parseRules: function(rules) {
		var parsedRules = {};
		for (var attribute in rules) {
			var rulesArray = rules[attribute];
			var attributeRules = [];

			if (typeof rulesArray === 'string') {
				rulesArray = rulesArray.split('|');
			}
			
			for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
				rule = this._extractRuleAndRuleValue(rulesArray[i]);
				if (Rules.isAsync(rule.name)) {
					this.hasAsync = true;
				}
				attributeRules.push(rule);
			}

			parsedRules[attribute] = attributeRules;
		}
		return parsedRules;
	},

	/**
	 * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
	 * 
	 * @param  {string} ruleString min:3
	 * @return {object} object containing the name of the rule and value
	 */
	_extractRuleAndRuleValue: function(ruleString) {
		var rule = {}, ruleArray;

		rule.name = ruleString;

		if (ruleString.indexOf(':') >= 0) {
			ruleArray = ruleString.split(':');
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
	_hasRule: function(attribute, findRules) {
		var rules = this.rules[attribute] || [];
		for (var i = 0, len = rules.length; i < len; i++) {
			if (findRules.indexOf(rules[i].name) > -1) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Determine if rule is validatable
	 *
	 * @param  {Rule}   rule
	 * @param  {string} attribute
	 * @param  {mixed}  value
	 * @return {boolean} 
	 */
	_isValidatable: function(rule, attribute, value) {
		if (rule.name === 'required' || rule.name === 'accepted') {
			return true;
		}

		return this.getRule('required').validate(value);
	},

	/**
	 * Get size of value
	 *
	 * @param  {string} attribute
	 * @param  {mixed} value
	 * @return {integer|float}
	 */
	_getSize: function(attribute, value) {
		if (typeof value === 'number') {
			return value;
		}

		if (this._hasRule(attribute, this.numericRules)) {
			return parseFloat(value, 10);
		}

		return value.length;
	},

	/**
	 * Get validation rule
	 *
	 * @param  {string} name
	 * @return {Rule}
	 */
	getRule: function(name) {
		return Rules.make(name, this);
	},

	/**
	 * Determine if validation passes
	 *
	 * @param {function} passes
	 * @return {boolean}
	 */
	passes: function(passes) {
		var async = this._checkAsync('passes', passes);
		if (async) {
			return this.checkAsync(passes);
		}
		return this.check();
	},

	/**
	 * Determine if validation fails
	 *
	 * @param {function} fails
	 * @return {boolean}
	 */
	fails: function(fails) {
		var async = this._checkAsync('fails', fails);
		if (async) {
			return this.checkAsync(undefined, fails);
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
	_checkAsync: function(funcName, callback) {
		var hasCallback = typeof callback === 'function';
		if (this.hasAsync && !hasCallback) {
			throw funcName + ' expects a callback when async rules are being tested.';
		}

		return this.hasAsync || hasCallback;
	}

};

/**
 * Set messages for language
 *
 * @param {string} lang
 * @param {object} messages
 */
Validator.setMessages = function(lang, messages) {
	Lang._set(lang, messages);
	return this;
};

/**
 * Get messages instance for given language
 *
 * @param  {string} lang
 * @return {Messages}
 */
Validator.getMessages = function(lang) {
	return Lang._get(lang);
};

/**
 * Set default language
 *
 * @param {string} lang
 */
Validator.setLang = function(lang) {
	this.prototype.lang = lang;
	return this;
};

/**
 * Get default language
 *
 * @return {string}
 */
Validator.getLang = function() {
	return this.prototype.lang;
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.register = function(name, fn, message) {
	var lang = Validator.getLang();
	var messages = Validator.getMessages(lang);
	Rules.register(name, fn);
	messages.set(name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsync = function(name, fn, message) {
	var lang = Validator.getLang();
	var messages = Validator.getMessages(lang);
	Rules.registerAsync(name, fn);
	messages.set(name, message);
};

/**
 * Make validator
 *
 * @param  {object} input
 * @param  {object} rules
 * @param  {object} customMessages
 * @return {Validator}
 */
Validator.make = function(input, rules, customMessages) {
	return new Validator(input, rules, customMessages);
};

module.exports = Validator;