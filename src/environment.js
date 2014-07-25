// Node environment
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Validator;
} else { // browser environment
	if (typeof define === 'function' && define.amd) {
		define('Validator', [], function() {
			return Validator;
		});
	} else {
		window.Validator = Validator;
	}
}