var Errors = function() {
	this.errors = {};
};

Errors.prototype = {
	constructor: Errors,

	/**
	 * Add new error message for given attribute
	 *
	 * @param  {string} attribute
	 * @param  {string} message
	 * @return {void}
	 */
	add: function(attribute, message) {
		if (!this.has(attribute)) {
			this.errors[attribute] = [];
		}
		this.errors[attribute].push(message);
	},

	/**
	 * returns an array of error messages for an attribute, or an empty array
	 * @param  {String} attribute A key in the data object being validated
	 * @return {Array}           	An array of error messages
	 */
	get: function(attribute) {
		if (this.has(attribute)) {
			return this.errors[attribute];
		}

		return [];
	},

	/**
	 * returns the first error message for an attribute, false otherwise
	 * @param  {String} attribute A key in the data object being validated
	 * @return {String}           First error message or false
	 */
	first: function(attribute) {
		if (this.has(attribute)) {
			return this.errors[attribute][0];
		}

		return false;
	},

	/**
	 * Get all error messages from all failing attributes
	 * @return {Object} Failed attribute names for keys and an array of messages for values
	 */
	all: function() {
		return this.errors;
	},

	/**
	 * checks if there are error messages for an attribute
	 * @param  {String}  attribute A key in the data object being validated
	 * @return {Boolean}           True if there are error messages. Otherwise false
	 */
	has: function(attribute) {
		if (this.errors.hasOwnProperty(attribute)) {
			return true;
		}

		return false;
	}
};

module.exports = Errors;