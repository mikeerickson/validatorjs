/*! Laravel inspired Validator constructor function - v0.1.1 - 2013-02-03
* https://github.com/skaterdav85/Validator
* Copyright (c) 2013 David; Licensed  */

(function (window) {

	var messages = {
		required: 'The :attribute field is required.',
		email: 'The :attribute field must be a valid email address.',
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
		}
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

		_createMessage: function(tmpl, data) {
			var message, key;

			if (typeof tmpl === 'string' && typeof data === 'object') {
				message = tmpl;

				for (key in data) {
					if (data.hasOwnProperty(key)) {
						message = message.replace(':' + key, data[key]);
					}
				}

			} else {
				message = tmpl.replace(/:attribute/, data);
			}

			return message;
		},

		check: function() {
			var key, val, curRules, curRulesLen, i, rule, ruleVal, passes, msg, msgTmpl, data;

			for (key in this.input) {
				if (this.input.hasOwnProperty(key)) { // make sure property is not inherited
					val = this.input[key];

					if (this.rules.hasOwnProperty(key)) { //check if a rule exists in rules object
						curRules = this.rules[key].split('|');
						curRulesLen = curRules.length;

						for (i = 0; i < curRulesLen; i++) { //iterate over rules
							rule = curRules[i];
							data = [];

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

										data['attribute'] = key;
										data[rule] = ruleVal;

										msg = this._createMessage(msgTmpl, data);

									} else {
										msg = this._createMessage(msgTmpl, key);
									}

								} else { // default error message
									msgTmpl = messages.def;
									msg = this._createMessage(msgTmpl, key);
								}

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
			},

			numeric: function(val) {
				var num = Number(val); // tries to convert value to a number. useful if value is coming from form element
			
				if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
					return true;
				} else {
					return false;
				}
			}
		}
	};

	window.Validator = Validator;
	
}(window));