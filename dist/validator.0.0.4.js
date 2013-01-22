/*! Laravel inspired Validator constructor function - v0.0.4 - 2013-01-22
* https://github.com/skaterdav85/Validator
* Copyright (c) 2013 David; Licensed  */

(function (window) {

	var messages = {
		required: 'The :attribute field is required.',
		email: 'The :attribute field must be a valid email address.',
		def: 'The :attribute attribute has errors.'
	};

	var Validator = function(input, rules) {
		this.rules = rules;
		this.input = input;
		this.errors = {};
		this.errorCount = 0;

		this.check();
	};

	Validator.prototype = {
		constructor: Validator,

		check: function() {
			var key, val, curRules, curRulesLen, i, rule, ruleVal, passes, msg;

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
								ruleVal = parseFloat(rule[1]);
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

								if (messages.hasOwnProperty(rule)) {
									msg = messages[rule];
								} else {
									msg = messages.def;
								}

								msg = msg.replace(/:attribute/, key);
								this.errors[key].push(msg);

								this.errorCount++;
							}
						}
					}
				}
			}
		},

		passes: function() {
			if (this.errorCount === 0) {
				return true;
			} else {
				return false;
			}
		},

		fails: function() {
			if (this.errorCount > 0) {
				return true;
			} else {
				return false;
			}
		},

		first: function(key) {
			if (this.errors.hasOwnProperty(key)) {
				return this.errors[key][0];
			} else {
				return null;
			}
		},

		// validate functions should return T/F
		validate: {
			required: function(val) {
				if (String(val).length > 0) {
					return true;
				} else {
					return false;
				}
			},

			// compares the size of strings
			// with numbers, compares the value
			size: function(val, req) {
				if (typeof val === 'number') {
					if (val === req) {
						return true;
					} else {
						return false;
					}
				} else {
					if (val.length === req) {
						return true;
					} else {
						return false;
					}
				}
			},

			// compares the size of strings
			// with numbers, compares the value
			min: function(val, req) {
				if (typeof val === 'number') {
					if (val >= req) {
						return true;
					} else {
						return false;
					}
				} else {
					if (val.length >= req) {
						return true;
					} else {
						return false;
					}
				}
			},

			// compares the size of strings
			// with numbers, compares the value
			max: function(val, req) {
				if (typeof val === 'number') {
					if (val <= req) {
						return true;
					} else {
						return false;
					}
				} else {
					if (val.length <= req) {
						return true;
					} else {
						return false;
					}
				}
			},

			email: function(val) {
				var atPos = val.indexOf('@');
				var periodPos = val.indexOf('.', atPos + 2);

				if (atPos !== -1 && periodPos !== -1) {
					return true;
				} else {
					return false;
				}
			}
		}
	};

	window.Validator = Validator;
	
}(window));