if (typeof require !== 'undefined') {
	var Validator = require('../src/validator.js');
	var expect = require('chai').expect;
} else {
	var Validator = window.Validator;
	var expect = window.chai.expect;
}

describe('lang / messages', function() {

	it('should default to english', function() {
		expect(Validator.getLang()).to.equal('en');
	});

	it('should be able to change lang', function() {
		var oldLang = Validator.getLang();
		Validator.setLang('ru');
		expect(Validator.getLang()).to.equal('ru');
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
		expect(messages.all()).to.equal(rawMessages);
		expect(validator.fails()).to.be.true;
		expect(validator.errors.first('zip')).to.equal('Le nkundla iyadingeka');
		Validator.setLang(oldLang);
	});

});