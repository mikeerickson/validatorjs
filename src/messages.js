var Messages = function(lang, messages) {
	this.lang = lang;
	this.messages = messages;
	this.customMessages = {};
	this.attributeNames = {};
};

var replacements = {

	/**
	 * Between replacement (replaces :min and :max)
	 *
	 * @param  {string} template
	 * @param  {Rule} rule
	 * @return {string}
	 */
	between: function(template, rule) {
		var parameters = rule.getParameters();
		return this._replacePlaceholders(rule, template, { min: parameters[0], max: parameters[1] });
	},

	/**
	 * Required_if replacement.
	 *
	 * @param  {string} template
	 * @param  {Rule} rule
	 * @return {string}
	 */
	required_if: function(template, rule) {
		var parameters = rule.getParameters();
		return this._replacePlaceholders(rule, template, { other: parameters[0], value: parameters[1] });
	}
};

Messages.prototype = {
	constructor: Messages,

	/**
	 * Set custom messages
	 *
	 * @param {object} customMessages
	 * @return {void}
	 */
	_setCustom: function(customMessages) {
		this.customMessages = customMessages || {};
	},

	/**
	 * Set custom attribute names.
	 *
	 * @param {object} attributes
	 */
	_setAttributeNames: function(attributes) {
		this.attributeNames = attributes;
	},

	/**
	 * Get attribute name to display.
	 *
	 * @param  {string} attribute
	 * @return {string}
	 */
	_getAttributeName: function(attribute) {
		if (this.attributeNames.hasOwnProperty(attribute)) {
			return this.attributeNames[attribute];
		}
		if (this.messages.attributes.hasOwnProperty(attribute)) {
			return this.messages.attributes[attribute];
		}
		return attribute;
	},

	/**
	 * Get all messages
	 *
	 * @return {object}
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
	 * @param  {string} template
	 * @param  {object} data
	 * @return {string}
	 */
	_replacePlaceholders: function(rule, template, data) {
		var message, attribute;

		data.attribute = this._getAttributeName(rule.attribute);
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