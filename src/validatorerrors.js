var ValidatorErrors = function() {};

ValidatorErrors.prototype = {
	constructor: ValidatorErrors,

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