// Get required modules
var Rules = require('./rules');
var Lang = require('./lang');
var Errors = require('./validatorerrors');

function langs() {
	require('./lang/en');
	require('./lang/ru');
}

var Validator = function(input, rules, customMessages) {
	var lang = Validator.getLang();
	this.input = input;
	this.rules = rules;

	this.messages = Lang._get(lang);
	this.messages._setCustom(customMessages);
	this.errors = new Errors();

	this.errorCount = 0;
	this.parsedRules = this._parseRules(this.rules);
	this.check();
};

Validator.prototype = {

	constructor: Validator,

	/**
	 * Rules
	 *
	 * @type {object}
	 */
	validate: Rules,

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
	 * @return {void}
	 */
	check: function() {
		var self = this;

		for (var attribute in this.parsedRules) {
			var attributeRules = this.parsedRules[attribute];
			var inputValue = this.input[attribute]; // if it doesnt exist in input, it will be undefined

			for (var i = 0, len = attributeRules.length, rule, passes; i < len; i++) {
				rule = attributeRules[i];
				passes = this.validate[rule.name].call(this, inputValue, rule.value, attribute);

				if (!passes)
				{
					this._addFailure(attribute, rule, inputValue);
				}
			}
		}
	},

	/**
	 * Add failure and error message for given attribute, rule and value
	 *
	 * @param {string} attribute
	 * @param {object} rule
	 * @param {mixed} inputValue
	 */
	_addFailure: function(attribute, rule, inputValue) {
		if ( !this.errors.hasOwnProperty(attribute) ) {
			this.errors[attribute] = [];
		}

		var msg = this.messages.render({
			attribute: attribute,
			value: inputValue,
			rule: rule.name,
			ruleValue: rule.value
		});
		
		this.errors[attribute].push(msg);
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
			
			for (var i = 0, len = rulesArray.length, parsedRule; i < len; i++) {
				attributeRules.push(this._extractRuleAndRuleValue(rulesArray[i]));
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
		var rules = this.parsedRules[attribute] || [];
		for (var i = 0, len = rules.length; i < len; i++) {
			if (findRules.indexOf(rules[i].name) > -1) {
				return true;
			}
		}
		return false;
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
	 * Determine if validation passes
	 *
	 * @return {boolean}
	 */
	passes: function() {
		return this.errorCount === 0 ? true : false;
	},

	/**
	 * Determine if validation fails
	 *
	 * @return {boolean}
	 */
	fails: function() {
		return this.errorCount > 0 ? true : false;
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
 * @param  {string}   rule
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.register = function(rule, fn, message) {
	var lang = Validator.getLang();
	this.prototype.validate[rule] = fn;
	var messages = Validator.getMessages(lang);
	messages.set(rule, message);
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