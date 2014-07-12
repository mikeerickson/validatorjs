describe('Validator custom messages', function() {
    var validator;

    it('can be passed as third argument', function() {
        validator = new Validator({ name: '' }, { name: 'required' }, { todo: 'Need to do something' });
        expect(validator.messages.todo).toEqual('Need to do something');
    });

    it('override the default message in the messages property', function() {
        validator = new Validator({ name: '' }, { name: 'required' }, { required: 'Name is missing.' });
        expect(validator.messages.required).toEqual('Name is missing.');
    });

    it('override the default message for the validator', function() {
        validator = new Validator({ name: '' }, { name: 'required' }, { required: 'Name is missing.' });
        expect(validator.fails()).toBe(true);
        expect(validator.errors.get('name').length).toBe(1);
        expect(validator.errors.first('name')).toEqual('Name is missing.');
    });

    it('override the default message for a type of the validator', function() {
        validator = new Validator({ name: 'A' }, { name: 'min:4' }, { min: { string: ':attribute is not long enough. Should be :min.' } });
        expect(validator.fails()).toBe(true);
        expect(validator.errors.get('name').length).toBe(1);
        expect(validator.errors.first('name')).toEqual('name is not long enough. Should be 4.');
    });

    it('can be specified on a per attribute basis for a validator', function() {
        validator = new Validator(
            { name: '', email: '' }, 
            { name: 'required', email: 'required' }, 
            { 'required.name': 'Name is missing.' }
        );
        expect(validator.fails()).toBe(true);
        expect(validator.errors.get('name').length).toBe(1);
        expect(validator.errors.first('name')).toEqual('Name is missing.');
        expect(validator.errors.get('email').length).toBe(1);
        expect(validator.errors.first('email')).toEqual('The email field is required.');
    });

    it('can be specified for custom validators', function() {
        Validator.register('telephone', function(value, requirement, attribute) {
            return value.match(/^\d{3}-\d{3}-\d{4}$/);
        }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

        validator = new Validator(
            { phone: '1234567890' }, 
            { phone: 'telephone' }, 
            { telephone: 'Wrong number.' }
        );
        expect(validator.fails()).toBe(true);
        expect(validator.errors.get('phone').length).toBe(1);
        expect(validator.errors.first('phone')).toEqual('Wrong number.');
    });

    it('can be specified for custom validators per attribute', function() {
        Validator.register('telephone', function(value, requirement, attribute) {
            return value.match(/^\d{3}-\d{3}-\d{4}$/);
        }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

        validator = new Validator(
            { phone: '1234567890', fax: '1234567890' }, 
            { phone: 'telephone', fax: 'telephone' }, 
            { 'telephone.fax': 'Why are you even using a fax?' }
        );
        expect(validator.fails()).toBe(true);
        expect(validator.errors.get('phone').length).toBe(1);
        expect(validator.errors.first('phone'))
            .toEqual('The phone phone number is not in the format XXX-XXX-XXXX.');
        expect(validator.errors.get('fax').length).toBe(1);
        expect(validator.errors.first('fax'))
            .toEqual('Why are you even using a fax?');
    });
});