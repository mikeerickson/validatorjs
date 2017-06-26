if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('Wildcard', function () {
    describe('Simple Rules ', function () {
        it('should have validation a deep level fails', function () {
            var validator = new Validator({
                foo: [{
                    bar: [{
                            people: [{
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
                            people: [{
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
            }, {
                'foo.*.bar.*.people.*.name': 'required',
                'foo.*.bar.*.people.*.age': 'numeric',
                'foo.*.bar.*.people.*.term': 'accepted',
                'foo.*.bar.*.people.*.isActive': 'boolean',
            });
            expect(validator.fails()).to.be.true;
            expect(validator.passes()).to.be.false;
        });
        it('should have validation a deep level passes', function () {
            var validator = new Validator({
                foo: [{
                    bar: [{
                        people: [{
                            name: 'Test',
                            age: '100',
                            term: true,
                            isActive: '0'
                        }]
                    }]
                }]
            }, {
                'foo.*.bar.*.people.*.name': 'required',
                'foo.*.bar.*.people.*.age': 'numeric',
                'foo.*.bar.*.people.*.term': 'accepted',
                'foo.*.bar.*.people.*.isActive': 'boolean',
            });
            expect(validator.fails()).to.be.false;
            expect(validator.passes()).to.be.true;
        });
    });
    describe('Rules with dependent of another field', function () {
        it('should have validation fail with required_* and show customMessage', function () {
            var validator = new Validator({
                users: [{
                    name: 'Teste',
                    lastName: '',
                    age: '',
                    requiredAge: 'true',
                }]
            }, {
                'users.*.age': 'required_if:users.*.requiredAge,true',
                'users.*.lastName': 'required_with:users.*.name',
            }, {
                'required_if.users.*.age': 'Required'
            });
            expect(validator.fails()).to.be.true;
            expect(validator.passes()).to.be.false;
            expect(validator.errors.all()).to.eql({
                'users.0.age': ['Required'],
                'users.0.lastName': ['The users.0.lastName field is required when users.0.name is not empty.']
            })
        });
    });
});