if(typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('should be able to get all messages', function (){
    it('should get all error messages separated by space', function (){
        var validator = new Validator({
            name: "",
            age: 12
        }, {
            name: "required",
            age: 'required|min:18'
        });
        expect(validator.fails()).to.be.true;
        expect(validator.passes()).to.be.false;
        expect(validator.getAllMessages()).to.equal('The name field is required. The age must be at least 18.');
    });

    it('should get empty string', function (){
        var validator = new Validator({
            name: "bob",
            age: 20
        }, {
            name: "required",
            age: 'required|min:18'
        });
        expect(validator.fails()).to.be.true;
        expect(validator.passes()).to.be.false;
        expect(validator.getAllMessages()).to.equal('');
    });
});
