describe('lang / messages', function() {

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
		var messages = {
			required: 'Le nkundla iyadingeka',
			attributes: {}
		};
		Validator.setMessages('zu', messages);
		Validator.setLang('zu');
		var validator = new Validator({ zip: '' }, { zip: 'required' });
		expect(Validator.getMessages('zu')).toEqual(messages);
		expect(validator.fails()).toBeTruthy();
		expect(validator.errors.first('zip')).toEqual('Le nkundla iyadingeka');
		Validator.setLang(oldLang);
	});

});