var Validator = function(input, rules, customMessages) {
	this.input = input;
	this.rules = rules;
	this.messages = extend({}, messages, customMessages || {});

	this.errors = new ValidatorErrors();

	this.errorCount = 0;
	this.check();
};

Validator.prototype = {
	constructor: Validator,

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
		var self = this;

		this._each(this.rules, function(attributeToValidate) {

			var rulesArray = this.rules[attributeToValidate];
			if( typeof rulesArray === "string" ) {
        rulesArray = this.rules[attributeToValidate].split('|');
      }

			var inputValue = this.input[attributeToValidate]; // if it doesnt exist in input, it will be undefined

			rulesArray.forEach(function(ruleString) {
				var ruleExtraction = self._extractRuleAndRuleValue(ruleString);
				var rule = ruleExtraction.rule;
				var ruleValue = ruleExtraction.ruleValue;
				var passes, dataForMessageTemplate, msgTmpl, msg;

				passes = self.validate[rule].call(self, inputValue, ruleValue, attributeToValidate);

				if (!passes) {
					if ( !self.errors.hasOwnProperty(attributeToValidate) ) {
						self.errors[attributeToValidate] = [];
					}

					dataForMessageTemplate = self._createErrorMessageTemplateData(attributeToValidate, rule, ruleValue);
					msgTmpl = self._selectMessageTemplate(rule, inputValue, attributeToValidate);
					msg = self._createMessage(msgTmpl, dataForMessageTemplate);
					self._addErrorMessage(attributeToValidate, msg);
				}
			});
		}, this); // end of _each()
	},

	_each: function(obj, cb, context) {
		for (var key in obj) {
			cb.call(context, key);
		}
	},

	/**
	 * Extract a rule and a rule value from a ruleString (i.e. min:3), rule = min, ruleValue = 3
	 * @param  {string} ruleString min:3
	 * @return {object} object containing the rule and ruleValue
	 */
	_extractRuleAndRuleValue: function(ruleString) {
		var obj = {}, ruleArray;

		obj.rule = ruleString;

		if (ruleString.indexOf(':') >= 0) {
			ruleArray = ruleString.split(':');
			obj.rule = ruleArray[0];
			obj.ruleValue = ruleArray.slice(1).join(":");
		}

		return obj;
	},

	_addErrorMessage: function(key, msg) {
		this.errors[key].push(msg);
		this.errorCount++;
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