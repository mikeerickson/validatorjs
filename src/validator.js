var Validator = function(rules, input) {
	this.rules = rules;
	this.input = input;
	this.errors = null;

	this.check();
};

Validator.prototype = {
	constructor: Validator,

	check: function() {
		var key, val, curRules, curRulesLen, i, rule, ruleVal, passes;

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
							ruleVal = parseInt(rule[1], 10);
							rule = rule[0];

							passes = this.validate[rule](val, ruleVal);
						} else {
							passes = this.validate[rule](val);
						}

						if (!passes) {
							this.errors = this.errors || [];
							this.errors.push(key + ' ' + rule + ' failed');
						}
					}
				}
			}
		}
	},

	passes: function() {
		if (!this.errors) {
			return true;
		} else {
			return false;
		}
	},

	fails: function() {
		if (this.errors) {
			return true;
		} else {
			return false;
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

		size: function(val, len) {
			if (val.length === len) {
				return true;
			} else {
				return false;
			}
		},

		min: function(val, len) {
			if (val.length >= len) {
				return true;
			} else {
				return false;
			}
		},

		max: function(val, len) {

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