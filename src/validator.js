var Validator = function(input, rules, customMessages) {
	this.input = input;
	this.rules = rules;
	this.messages = extend({}, messages, customMessages || {});

	this.errors = new ValidatorErrors();

	this.errorCount = 0;
	this.parsedRules = this._parseRules(this.rules);
	this.check();
};

Validator.prototype = {

	constructor: Validator,

	numericRules: ['integer', 'numeric'],

	// replaces placeholders in tmpl with actual data
	_createMessage: function(tmpl, data) {
		var message, key;

		if (typeof tmpl === 'string' && typeof data === 'object') {
			message = tmpl;

			for (key in data) {
				if (data.hasOwnProperty(key)) {
					message = message.replace(':' + key, data[key]);
				}
			}
		}

		return message;
	},

	check: function() {

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

		var dataForMessageTemplate = this._createErrorMessageTemplateData(attribute, rule.name, rule.value);
		var msgTmpl = this._selectMessageTemplate(rule.name, inputValue, attribute);
		var msg = this._createMessage(msgTmpl, dataForMessageTemplate);
		
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

	_createErrorMessageTemplateData: function(key, rule, ruleVal) {
		var dataForMessageTemplate = { attribute: this.messages.attributes[key] || key };
		dataForMessageTemplate[rule] = ruleVal; // if no rule value, then this will equal to null

		return dataForMessageTemplate;
	},

	// selects the correct message template from the messages variable based on the rule and the value
	_selectMessageTemplate: function(rule, val, key) {
		var msgTmpl, messages = this.messages;

		// if the custom error message template exists in messages variable
		if (messages.hasOwnProperty(rule + '.' + key)) {
			msgTmpl = messages[rule + '.' + key];
		} else if (messages.hasOwnProperty(rule)) {
			msgTmpl = messages[rule];

			if (typeof msgTmpl === 'object') {
				switch (typeof val) {
					case 'number':
						msgTmpl = msgTmpl['numeric'];
						break;
					case 'string':
						msgTmpl = msgTmpl['string'];
						break;
				}
			}
		} else { // default error message
			msgTmpl = messages.def;
		}

		return msgTmpl;
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
			if (findRules.indexOf(rules[i].name) > -1) return true;
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

	passes: function() {
		return this.errorCount === 0 ? true : false;
	},

	fails: function() {
		return this.errorCount > 0 ? true : false;
	}

};

// static methods
Validator.register = function(rule, fn, errMsg) {
	this.prototype.validate[rule] = fn;
	messages[rule] = (typeof errMsg === 'string') ? errMsg : messages['def'];
};

Validator.make = function(input, rules, customMessages) {
	return new Validator(input, rules, customMessages);
};