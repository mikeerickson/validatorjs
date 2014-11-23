var ValidatorErrors = function() {};

ValidatorErrors.prototype = {
	constructor: ValidatorErrors,

	/**
	 * returns an array of error messages for an attribute, or an empty array
	 * @param  {String} attribute A key in the data object being validated
	 * @return {Array}           	An array of error messages
	 */
	get: function(attribute) {
		if (this[attribute]) {
			return this[attribute];
		}

		return [];
	},

	/**
	 * returns the first error message for an attribute, false otherwise
	 * @param  {String} attribute A key in the data object being validated
	 * @return {String}           First error message or false
	 */
	first: function(attribute) {
		if (this[attribute]) {
			return this[attribute][0];
		}

		return false;
	},

	/**
	 * Get all error messages from all failing attributes
	 * @return {Object} Failed attribute names for keys and an array of messages for values
	 */
	all: function() {
		return this;
	},

	/**
	 * checks if there are error messages for an attribute
	 * @param  {String}  attribute A key in the data object being validated
	 * @return {Boolean}           True if there are error messages. Otherwise false
	 */
	has: function(attribute) {
		if (this[attribute] && this[attribute].length > 0) {
			return true;
		}

		return false;
	}
};