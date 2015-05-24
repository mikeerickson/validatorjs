var messages = {};

var ValidatorMessages = function(lang, customMessages) {
	this.lang = lang;
	this.messages = messages[lang];
	this.customMessages = customMessages || {};
};

ValidatorMessages.prototype = {
	constructor: ValidatorMessages,

	// render message given the options
	render: function(options) {
		var dataForMessageTemplate = this._createTemplateData(options.attribute, options.rule, options.ruleValue);
		var msgTmpl = this._selectTemplate(options.rule, options.value, options.attribute);
		var msg = this._replacePlaceholders(msgTmpl, dataForMessageTemplate);
		return msg;
	},

	// replaces placeholders in tmpl with actual data
	_replacePlaceholders: function(tmpl, data) {
		var message, attribute;

		if (typeof tmpl === 'string' && typeof data === 'object') {
			message = tmpl;

			for (attribute in data) {
				if (data.hasOwnProperty(attribute)) {
					message = message.replace(':' + attribute, data[attribute]);
				}
			}
		}

		return message;
	},

	_createTemplateData: function(attribute, rule, ruleVal) {
		var dataForMessageTemplate = { attribute: this.messages.attributes[attribute] || attribute };
		dataForMessageTemplate[rule] = ruleVal; // if no rule value, then this will equal to null

		return dataForMessageTemplate;
	},

	// get template to use from given rule and optional attribute
	_getTemplate: function(rule, attribute) {
		var messages = this.messages;
		var customMessages = this.customMessages;
		var formats = [rule + '.' + attribute, rule];
		var format;

		for (var i in formats)
		{
			format = formats[i];
			if (customMessages.hasOwnProperty(format))
			{
				return customMessages[format];
			}
			else if (messages.hasOwnProperty(format))
			{
				return messages[format];
			}
		}

		return messages.def;
	},

	// selects the correct message template from the messages variable based on the rule and the value
	_selectTemplate: function(rule, val, attribute) {
		var tmpl = this._getTemplate(rule, attribute);
		var message = '';
		var messages = this.messages;

		if (typeof tmpl === 'object') {
			switch (typeof val) {
				case 'number':
					tmpl = tmpl['numeric'];
					break;
				case 'string':
					tmpl = tmpl['string'];
					break;
			}
		}

		return tmpl;
	}

};