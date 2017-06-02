if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('Wildcard', () => {
    describe('Simples Rules ', () => {
        it('should have validation a deep level fails', () => {
            var validator = new Validator(
                {
                    foo: [{
                        bar: [
                            {
                                people: [
                                    {
                                        name: '',
                                        age: 'aa',
                                        term: false,
                                        isActive: 'not'
                                    },
                                    {
                                        name: '',
                                        age: 'aa',
                                        term: false,
                                        isActive: 'not'
                                    }
                                ]
                            },
                            {
                                people: [
                                    {
                                        name: '',
                                        age: 'aa',
                                        term: false,
                                        isActive: 'not'
                                    },
                                    {
                                        name: '',
                                        age: 'aa',
                                        term: false,
                                        isActive: 'not'
                                    }
                                ]
                            }
                        ]
                    }]
                },
                {
                    'foo.*.bar.*.people.*.name': 'required',
                    'foo.*.bar.*.people.*.age': 'numeric',
                    'foo.*.bar.*.people.*.term': 'accepted',
                    'foo.*.bar.*.people.*.isActive': 'boolean',
                }
            );
            expect(validator.fails()).to.be.true;
            expect(validator.passes()).to.be.false;
        });
        it('should have validation a deep level passes', () => {
            var validator = new Validator(
                {
                    foo: [{
                        bar: [
                            {
                                people: [
                                    {
                                        name: 'Test',
                                        age: '100',
                                        term: true,
                                        isActive: '0'
                                    }
                                ]
                            }]
                    }]
                },
                {
                    'foo.*.bar.*.people.*.name': 'required',
                    'foo.*.bar.*.people.*.age': 'numeric',
                    'foo.*.bar.*.people.*.term': 'accepted',
                    'foo.*.bar.*.people.*.isActive': 'boolean',
                }
            );
            expect(validator.fails()).to.be.false;
            expect(validator.passes()).to.be.true;
        });
    });
    describe('Rules with dependent of another field', () => {
        it.only('should have validation fail with required_*', () => {
            var validator = new Validator(
                {
                    id: '12,500.00',
                    addresses: [
                        {
                            street: '',
                            phones: [{
                                home: '44',
                                work: '123',
                                requireHome: 'true'
                            },
                            {
                                home: '345',
                                work: '125',
                                requireHome: 'false'
                            }]
                        },
                        {
                            street: '',
                            phones: []
                        }
                    ]
                },
                {
                    'addresses.*.phones.*.home': 'required_if:addresses.*.phones.*.requireHome,true'
                }
            );
            expect(validator.fails()).to.be.true;
            expect(validator.passes()).to.be.false;
        });
    });
});