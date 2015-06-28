var Messages = function(lang, messages) {
	this.lang = lang;
	this.messages = messages;
	this.customMessages = {};
};

var replacements = {
	between: function(template, rule) {
		var parameters = rule.getParameters();
		return this._replacePlaceholders(rule, template, { min: parameters[0], max: parameters[1] });
	}
};

Messages.prototype = {
	constructor: Messages,

	/**
	 * Set message format for given attribute
	 *
	 * @param {string} attribute
	 * @param {string} message
	 */
	set: function(attribute, message) {
		this.messages[attribute] = message === undefined ? this.messages.def : message;
	},

	/**
	 * Set custom messages
	 *
	 * @param {object} customMessages
	 */
	_setCustom: function(customMessages) {
		this.customMessages = customMessages || {};
	},

	/**
	 * Get all messages
	 *
	 * @return {string}
	 */
	all: function() {
		return this.messages;
	},

	/**
	 * Render message
	 *
	 * @param  {Rule} rule
	 * @return {string}
	 */
	render: function(rule) {
		if (rule.customMessage) {
			return rule.customMessage;
		}
		var template = this._getTemplate(rule);

		var message;
		if (replacements[rule.name]) {
			message = replacements[rule.name].apply(this, [template, rule]);
		}
		else {
			message = this._replacePlaceholders(rule, template, {});
		}

		return message;
	},

	/**
	 * Get the template to use for given rule
	 *
	 * @param  {Rule} rule
	 * @return {string}
	 */
	_getTemplate: function(rule) {

		var messages = this.messages;
		var template = messages.def;
		var customMessages = this.customMessages;
		var formats = [rule.name + '.' + rule.attribute, rule.name];

		for (var i = 0, format; i < formats.length; i++) {
			format = formats[i];
			if (customMessages.hasOwnProperty(format)) {
				template = customMessages[format];
				break;
			}
			else if (messages.hasOwnProperty(format)) {
				template = messages[format];
				break;
			}
		}

		if (typeof template === 'object') {
			switch (typeof rule.inputValue) {
				case 'number':
					template = template['numeric'];
					break;
				case 'string':
					template = template['string'];
					break;
			}
		}

		return template;
	},

	/**
	 * Replace placeholders in the template using the data object
	 *
	 * @param  {Rule} rule
	 * @param  {string} tmpl
	 * @param  {object} data
	 * @return {string}
	 */
	_replacePlaceholders: function(rule, template, data) {
		var message, attribute;

		data.attribute = this.messages.attributes[rule.attribute] || rule.attribute;
		data[rule.name] = rule.getParameters().join(',');

		if (typeof template === 'string' && typeof data === 'object') {
			message = template;

			for (attribute in data) {
				message = message.replace(':' + attribute, data[attribute]);
			}
		}

		return message;
	}

};

module.exports = Messages;