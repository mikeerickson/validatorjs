const { Validator, expect } = require("./setup.js");

describe("max validation rule", function() {
  it('should fail with the name "David". Maximum size is 3 letters.', function() {
    const validator = new Validator({ name: "David" }, { name: "max:3" });
    expect(validator.passes()).to.be.false;
  });

  it('should pass with the name "David". Maximum size is 5 letters.', function() {
    const validator = new Validator(
      {
        name: "Da"
      },
      {
        name: "max:5"
      }
    );
    expect(validator.passes()).to.be.true;
  });

  it('should fail with the age "18". Max is 12.', function() {
    const validator = new Validator(
      {
        age: 18
      },
      {
        age: "max:12"
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it('should pass with the age "12". Max is 12.', function() {
    const validator = new Validator(
      {
        age: 12
      },
      {
        age: "max:12"
      }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail with boolean true value", function() {
    const validator = new Validator(
      {
        val: true
      },
      {
        val: "max:5"
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should fail with boolean false value", function() {
    const validator = new Validator(
      {
        val: false
      },
      {
        val: "max:5"
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass when the age is 0", function() {
    const validator = new Validator(
      {
        age: 0
      },
      {
        age: "max:2"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the field is an empty string", function() {
    const validator = new Validator(
      {
        email: ""
      },
      {
        email: "max:2"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should pass when the field does not exist", function() {
    const validator = new Validator(
      {},
      {
        email: "max:2"
      }
    );
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it("should fail when given string-integer value", function() {
    const validator = new Validator(
      {
        val: "18"
      },
      {
        val: "integer|max:16"
      }
    );
    expect(validator.passes()).to.be.false;
  });

  it("should fail when given string-float value", function() {
    const validator = new Validator(
      {
        val: "17.56"
      },
      {
        val: "numeric|max:17.5"
      }
    );
    expect(validator.passes()).to.be.false;
  });
});
