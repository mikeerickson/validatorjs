Validator.prototype.validate = {

	required: function(val) {
		var str;

		if (val === undefined || val === null) {
			return false;
		}

		str = String(val).replace(/\s/g, "");
		return str.length > 0 ? true : false;
	},

	// compares the size of strings
	// with numbers, compares the value
	size: function(val, req) {
		if (val) {
			req = parseFloat(req);

			if (typeof val === 'number') {
				return val === req ? true : false;
			}

			return val.length === req ? true : false;
		}

		return true;
	},

	/**
	 * Compares the size of strings or the value of numbers if there is a truthy value
	 */
	min: function(val, req) {
		if (val === undefined || val === '') { return true; }

		if (typeof val === 'number') {
			return val >= req ? true : false;
		} else {
			return val.length >= req ? true : false;
		}
	},

	/**
	 * Compares the size of strings or the value of numbers if there is a truthy value
	 */
	max: function(val, req) {
		if (val === undefined || val === '') { return true; }

		if (typeof val === 'number') {
			return val <= req ? true : false;
		} else {
			return val.length <= req ? true : false;
		}
	},

	email: function(val) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (val === undefined || val === '') {
			return true;
		}

		return re.test(val);
	},

	numeric: function(val) {
		var num;

		if (val === undefined || val === '') { return true; }

		num = Number(val); // tries to convert value to a number. useful if value is coming from form element

		if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
			return true;
		} else {
			return false;
		}
	},

	url: function(url) {
		if (url === undefined || url === '') { return true; }

		return (/^https?:\/\/\S+/).test(url);
	},

	alpha: function(val) {
		if (val === undefined || val === '') { return true; }

		return (/^[a-zA-Z]+$/).test(val);
	},

	alpha_dash: function(val) {
		if (val === undefined || val === '') { return true; }
		return (/^[a-zA-Z0-9_\-]+$/).test(val);
	},

	alpha_num: function(val) {
		if (val === undefined || val === '') { return true; }

		return (/^[a-zA-Z0-9]+$/).test(val);
	},

	same: function(val, req) {
		var val1 = this.input[req];
		var val2 = val;

		if (val1 === val2) {
			return true;
		}

		return false;
	},

	different: function(val, req) {
		var val1 = this.input[req];
		var val2 = val;

		if (val1 !== val2) {
			return true;
		}

		return false;
	},

	"in": function(val, req) {
		var list, len, returnVal;

		if (val) {
			list = req.split(',');
			len = list.length;
			returnVal = false;

			val = String(val); // convert val to a string if it is a number

			for (var i = 0; i < len; i++) {
				if (val === list[i]) {
					returnVal = true;
					break;
				}
			}

			return returnVal;
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
		if (val === 'on' || val === 'yes' || val === 1 || val === '1') {
			return true;
		}

		return false;
	},

	confirmed: function(val, req, key) {
		var confirmedKey = key + '_confirmation';

		if (this.input[confirmedKey] === val) {
			return true;
		}

		return false;
	},

	integer: function(val) {
		if (val === undefined || val === '') { return true; }

		val = String(val);

		if ( (/^\d+$/).test(val) ) {
			return true;
		} else {
			return false;
		}
	},

	digits: function(val, req) {
		if (this.validate.numeric(val) && String(val).length === parseInt(req)) {
			return true;
		}

		return false;
	},

	regex: function(val, req) {
		var mod = /[g|i|m]{1,3}$/;
		var flag = req.match(mod);
		flag = flag ? flag[0] : "i";
		req = req.replace(mod,"").slice(1,-1);
		req = new RegExp(req,flag);
		return !!val.match(req);
	}
	
};