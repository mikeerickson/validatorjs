var Messages = require('./messages');

var container = {

	messages: {},

	/**
	 * Set messages for language
	 *
	 * @param {string} lang
	 * @param {object} rawMessages
	 * @return {Messages}
	 */
	_set: function(lang, rawMessages) {
		var messages = new Messages(lang, rawMessages);
		this.messages[lang] = messages;
		return messages;
	},

	/**
	 * Get messages for language
	 *
	 * @param  {string} lang
	 * @return {Messages}
	 */
	_get: function(lang) {
		var messages = this.messages[lang];
		if (messages)
		{
			return messages;
		}

		var rawMessages = require('./lang/' + lang);
		messages = this._set(lang, rawMessages);
		return messages;
	}

};

module.exports = container;