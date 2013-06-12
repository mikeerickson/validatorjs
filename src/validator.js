(function() {

	var messages = {
		alpha: 'The :attribute field must contain only alphabetic characters.',
		alpha_num: 'The :attribute field must be alphanumeric.',
		required: 'The :attribute field is required.',
		email: 'The :attribute format is invalid.',
		def: 'The :attribute attribute has errors.',
		min: {
			numeric: 'The :attribute must be at least :min.',
			string: 'The :attribute must be at least :min characters.'
		},
		max: {
			numeric: 'The :attribute must be less than :max.',
			string: 'The :attribute must be less than :max characters.'
		},
		size: {
			numeric: 'The :attribute must be :size.',
			string: 'The :attribute must be :size characters.'
		},
		numeric: 'The :attribute must be a number.',
		url: 'The :attribute format is invalid.'
	};


	var Validator = function(input, rules) {
		this.input = input;
		this.rules = rules;

		this.errors = {
			get: function(attribute) {
				if (this[attribute]) {
					return this[attribute];	
				}

				return [];
			},
			first: function(attribute) {
				if (this[attribute]) {
					return this[attribute][0];	
				}
				
				return false;
			}
		};

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
			var key, val, curRules, curRulesLen, i, rule, ruleVal, passes, msg, msgTmpl, dataForMessageTemplate = {};

			for (key in this.input) {
				if (this.input.hasOwnProperty(key)) { // make sure property is not inherited
					val = this.input[key];

					if (this.rules.hasOwnProperty(key)) { //check if a rule exists in rules object
						curRules = this.rules[key].split('|');
						curRulesLen = curRules.length;

						for (i = 0; i < curRulesLen; i++) { //iterate over rules
							rule = curRules[i];

							if (rule.indexOf(':') >= 0) {
								rule = rule.split(':');
							}

							if (rule instanceof Array) {
								ruleVal = rule[1];
								rule = rule[0];
								passes = this.validate[rule](val, ruleVal);
							} else {
								ruleVal = null;
								passes = this.validate[rule](val);
							}

							if (!passes) {
								if ( !this.errors.hasOwnProperty(key) ) {
									this.errors[key] = [];
								}

								msgTmpl = this._selectMessageTemplate(rule, val);
								dataForMessageTemplate = { attribute: key };
								dataForMessageTemplate[rule] = ruleVal; // if no rule value, then this will equal to null

								msg = this._createMessage(msgTmpl, dataForMessageTemplate);

								this.errors[key].push(msg);
								this.errorCount++;
							}
						}
					}
				}
			}
		},

		// selects the correct message template from the messages variable based on the rule and the value
		_selectMessageTemplate: function(rule, val) {
			var msgTmpl;

			// if the custom error message template exists in messages variable
			if (messages.hasOwnProperty(rule)) {
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
		},

		first: function(key) {
			return this.errors.hasOwnProperty(key) ? this.errors[key][0] : null;
		},

		// validate functions should return T/F
		validate: {
			required: function(val) {
				var str = val.replace(/\s/g, "");
				return String(str).length > 0 ? true : false;
			},

			// compares the size of strings
			// with numbers, compares the value
			size: function(val, req) {
				req = parseFloat(req);

				if (typeof val === 'number') {
					return val === req ? true : false;
				} else {
					return val.length === req ? true : false;
				}
			},

			// compares the size of strings
			// with numbers, compares the value
			min: function(val, req) {
				if (typeof val === 'number') {
					return val >= req ? true : false;
				} else {
					return val.length >= req ? true : false;
				}
			},

			// compares the size of strings
			// with numbers, compares the value
			max: function(val, req) {
				if (typeof val === 'number') {
					return val <= req ? true : false;
				} else {
					return val.length <= req ? true : false;
				}
			},

			email: function(val) {
				return (/\w+@\w{2,}\.\w{2,}/).test(val);
			},

			numeric: function(val) {
				var num = Number(val); // tries to convert value to a number. useful if value is coming from form element
			
				if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
					return true;
				} else {
					return false;
				}
			},

			url: function(val) {
				return (/^https?:\/\/\S+/).test(val);
			},

			alpha: function(val) {
				return (/^[a-zA-Z]+$/).test(val);
			},

			alpha_num: function(val) {
				return (/^[a-zA-Z0-9]+$/).test(val);
			}
		}
	};

	// static methods
	Validator.register = function(rule, fn, errMsg) {
		this.prototype.validate[rule] = fn;

		if (typeof errMsg === 'string') {
			messages[rule] = errMsg;
		}
	};

	if (typeof module !== 'undefined' && typeof require !== 'undefined') {
		module.exports = Validator;
	} else {
		window.Validator = Validator;
	}
	
}());