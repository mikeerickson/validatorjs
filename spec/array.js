const { Validator, expect } = require("./setup.js");

describe("array rule", function() {
  it("should pass when array", function() {
    const validator = new Validator({ users: [] }, { users: "array" });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail when given object", function() {
    const validator = new Validator({ users: {} }, { users: "array" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should fail when given boolean", function() {
    const validator = new Validator({ users: true }, { users: "array" });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

  it("should have a minimum number of array items ", function() {
    const validator = new Validator({
      names: []
    }, {
      'names': 'array|min:1'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
  });

});
