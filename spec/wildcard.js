if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe.only('Wildcard', () => {
    it('should have validation a simple level', () => {
        var validator = new Validator(
            {
                testes: [{
                    name: ''
                }]
            },
            {
                'testes.*.name': 'required'
            });
    });
});