const { Validator, expect } = require("./setup.js");

describe("regex validation rule for most common regular expressions", function() {
  it("should pass with the currency pattern: 12,500.00", function() {
    const validator = new Validator(
      { currency: "12,500.00" },
      { currency: "regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/" }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail with the currency pattern: 200.0", function() {
    const validator = new Validator(
      { currency: "200.0" },
      { currency: "regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/" }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the date pattern: 03/11/2015", function() {
    const validator = new Validator(
      { pattern: "03/11/2015" },
      { pattern: ["regex:/^([1-9]|0[1-9]|[12][0-9]|3[01])\\D([1-9]|0[1-9]|1[012])\\D(19[0-9][0-9]|20[0-9][0-9])$/"] }
    );
    expect(validator.passes()).to.be.true;
  });
  it("should fail with the date pattern: 0311/2015", function() {
    const validator = new Validator(
      { pattern: "0311/2015" },
      { pattern: ["regex:/^([1-9]|0[1-9]|[12][0-9]|3[01])\\D([1-9]|0[1-9]|1[012])\\D(19[0-9][0-9]|20[0-9][0-9])$/"] }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the year pattern: 2015", function() {
    const validator = new Validator({ pattern: "2015" }, { pattern: ["regex:/^(19|20)[\\d]{2,2}$/"] });
    expect(validator.passes()).to.be.true;
  });
  it("should fail with the year pattern:: 20151", function() {
    const validator = new Validator({ pattern: "20151" }, { pattern: ["regex:/^(19|20)[\\d]{2,2}$/"] });
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the email pattern: johndoe@gmail.com", function() {
    const validator = new Validator(
      { pattern: "johndoe@gmail.com" },
      {
        pattern: [
          'regex:/^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/'
        ]
      }
    );
    expect(validator.passes()).to.be.true;
  });
  it("should fail with the email pattern: johndoe.gmail.com", function() {
    const validator = new Validator(
      { pattern: "johndoe.gmail.com" },
      {
        pattern: [
          'regex:/^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/'
        ]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the url pattern: http://github.com", function() {
    const validator = new Validator(
      {
        pattern: "http://github.com"
      },
      {
        pattern: ["regex:/^https?:\\/\\/\\S+/"]
      }
    );
    expect(validator.passes()).to.be.true;
  });
  it("should fail with the url pattern: http://githubcom", function() {
    const validator = new Validator(
      {
        pattern: "http:/github.com"
      },
      {
        pattern: ["regex:/^https?:\\/\\/\\S+/"]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the hex pattern: #ff0033", function() {
    const validator = new Validator(
      {
        pattern: "#ff0033"
      },
      {
        pattern: ["regex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/"]
      }
    );
    expect(validator.passes()).to.be.true;
  });
  it("should fail with the hex pattern: #xx9911", function() {
    const validator = new Validator(
      {
        pattern: "#xx9911"
      },
      {
        pattern: ["regex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/"]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the slug pattern: matching-a-slug-here", function() {
    const validator = new Validator(
      {
        pattern: "matching-a-slug-here"
      },
      {
        pattern: ["regex:/^[a-z0-9-]+$/"]
      }
    );
    expect(validator.passes()).to.be.true;
  });
  it("should fail with the slug pattern: not_matching_here", function() {
    const validator = new Validator(
      {
        pattern: "not_matching_here"
      },
      {
        pattern: ["regex:/^[a-z0-9-]+$/"]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should support the case insensitive flag", function() {
    const validator = new Validator(
      {
        pattern: "A"
      },
      {
        pattern: ["regex:/[a-f]/i"]
      }
    );

    expect(validator.passes()).to.be.true;
  });

  it("should not be case insensitive unless specified", function() {
    const validator = new Validator(
      {
        pattern: "A"
      },
      {
        pattern: ["regex:/[a-f]/"]
      }
    );

    expect(validator.fails()).to.be.true;
  });

  it("should pass with the string: 12-500.00A", function() {
    const validator = new Validator(
      {
        pattern: "12-500.00A"
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\-\\.]+$/"]
      }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail with the string: 12-500.00/A", function() {
    const validator = new Validator(
      {
        pattern: "12-500.00/A"
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\-\\.]+$/"]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the string: 12.500", function() {
    const validator = new Validator(
      {
        pattern: "12.500"
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\-\\.]+$/i"]
      }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail with the string: 12.500,00", function() {
    const validator = new Validator(
      {
        pattern: "12.500,00"
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\-\\.]+$/i"]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the number: 12.500", function() {
    const validator = new Validator(
      {
        pattern: 12.5
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\-\\.]+$/i"]
      }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should fail with the number: -12.500", function() {
    const validator = new Validator(
      {
        pattern: -12.5
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\.]+$/i"]
      }
    );
    expect(validator.fails()).to.be.true;
  });

  it("should pass with the number: 999", function() {
    const validator = new Validator(
      {
        pattern: 999
      },
      {
        pattern: ["regex:/^[A-Za-z0-9_\\-\\.]+$/i"]
      }
    );
    expect(validator.passes()).to.be.true;
  });

  it("should be valid password (see rule wihtin test)", function () {
    // must have at leaset one uppercase
    // must have at leaset one lowercase
    // must have at leaset one digit
    // must have at leaset one special character
    // must have at least 10 digits
    const validator = new Validator(
      { pattern: "SomePass1#" },
      { pattern: ["regex:/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$/"] }
    );

    expect(validator.passes()).to.be.true;

    const validator2 = new Validator(
      { pattern: "SmePass1#" }, // less than 10 digits
      { pattern: ["regex:/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$/"] }
    );

    expect(validator2.passes()).to.be.false;
    expect(validator2.fails()).to.be.true;

  });
  it("should pass with simple password format w/ escaped back slashes", function () {
    const validator = new Validator(
      { pattern: "SomePass1" },
      { pattern: ["regex:/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/"] }
    );

    expect(validator.passes()).to.be.true;
  });
});
