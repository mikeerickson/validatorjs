(function(exports) {

	var messages = {
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
				var re = /\w+@\w{2,}\.\w{2,}/;
				return val.match(re) ? true : false;
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
				var re = /^http:\/\/\S+/;
				return val.match(re);
			}
		}
	};

	// static methods
	Validator.register = function(rule, fn) {
		this.prototype.validate[rule] = fn;
	};

	exports.Validator = Validator;
	
}(typeof exports === 'undefined' ? window : exports));