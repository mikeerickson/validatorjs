describe('lang / messages', function() {

	if (typeof require !== 'undefined') {
		var Validator = require('../src/validator.js');
	} else {
		var Validator = window.Validator;
	}

	it('should default to english', function() {
		expect(Validator.getLang()).toEqual('en');
	});

	it('should be able to change lang', function() {
		var oldLang = Validator.getLang();
		expect(Validator.setLang('ru')).toBeTruthy();
		expect(Validator.getLang()).toEqual('ru');
		Validator.setLang(oldLang);
	});

	it('should be able to add custom', function() {
		var oldLang = Validator.getLang();
		var rawMessages = {
			required: 'Le nkundla iyadingeka',
			attributes: {}
		};
		Validator.setMessages('zu', rawMessages);
		Validator.setLang('zu');
		var validator = new Validator({ zip: '' }, { zip: 'required' });

		var messages = Validator.getMessages('zu');
		expect(messages.all()).toEqual(rawMessages);
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('zip')).toEqual('Le nkundla iyadingeka');
		Validator.setLang(oldLang);
	});

});