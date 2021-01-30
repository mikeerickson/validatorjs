# validatorjs

<h1 align="center">
    <img src="docs/images/validator1.png" width="10%" height="10%" alt="validatorjs">
</h1>

## Overview

The validatorjs library makes data validation in JavaScript very easy in both the browser and NodeJS.

## Inspired by Laravel Validation

Inspired by [Laravel framework's Validator](https://laravel.com/docs/8.x/validation), validatorjs provides a simple, expressive API and is the perfect compliment for frontend validation. `validatorjs` provides over 50 built-in validation rules, and provides parity with current [Laravel Validation Rules](https://laravel.com/docs/8.x/validation#rule-gt) (as of Laravel v8). If `validatorjs` does not have a rule you are looking for, you can create your own rules which can be used in conjunction with existing `validatorjs` rules as you see fit.

## Table of Contents

- [Installation](#installation)
- [Overview](#overview)
- [Available Rules](#available-rules)
- [Custom Rules](#custom-validator-rules)
- [Asynchronous Validation](#asynchronous-validation)
- [Language Support](#language-support)
- [Error Message Alias Support](#error-message-aliases)
- [License](#license)
- [Credits](#credits)

## Why use validatorjs?

- Works in both the browser using script tag, or as node module
- Readable and declarative validation rules
- Error messages with multilingual or custom support
- ES6 support

## Installation

### Using npm

```bash
npm install validatorjs
```

### Using yarn

```bash
yarn add validatorjs
```

### Browser

```html
<script src="validator.js"></script>
```

### Node.js / Browserify

```js
// ES5
const Validator = require("validatorjs");
```

```js
// ES6
import * as Validator from "validatorjs";
```

### Overview

| Parameter           | Type   | Required | Description                                     |
| ------------------- | ------ | -------- | ----------------------------------------------- |
| data                | Object | yes      | The data you want to validate                   |
| rules               | Object | yes      | Validation rules                                |
| customErrorMessages | Object | no       | custom error messages to return                 |
| language            | String | no       | desired language (default `en` English)         |
|                     |        |          | _language must exist in `./src/lang` directory_ |
| aliases             | Object | no       | Validation Aliases                              |

#### Constructor Syntax

```js
const validation = new Validator(data, rules [, customErrorMessages, language, aliases ]);
```

**Example 1 - Passing Validation**

```js
let data = {
  name: "John",
  email: "johndoe@gmail.com",
  age: 28,
};

let rules = {
  name: "required",
  email: "required|email",
  age: "min:18",
};

const validation = new Validator(data, rules);

validation.passes(); // true
validation.fails(); // false
```

To apply validation rules to the _data_ object, use the same object key names for the _rules_ object.

**Example 2 - Failing Validation**

```js
const validation = new Validator(
  {
    name: "D",
    email: "not an email address.com",
  },
  {
    name: "size:3",
    email: "required|email",
  },
);

validation.fails(); // true
validation.passes(); // false

// Error messages
validation.errors.first("email"); // 'The email format is invalid.'
validation.errors.get("email"); // returns an array of all email error messages
```

### Nested Rules

Nested objects can also be validated. There are two ways to declare validation rules for nested objects. The first way is to declare the validation rules with a corresponding nested object structure that reflects the data. The second way is to declare validation rules with flattened key names. For example, to validate the following data:

```js
let data = {
  name: "John",
  bio: {
    age: 28,
    education: {
      primary: "Elementary School",
      secondary: "Secondary School",
    },
  },
};
```

We could declare our validation rules as follows:

```js
let nested = {
  name: "required",
  bio: {
    age: "min:18",
    education: {
      primary: "string",
      secondary: "string",
    },
  },
};

// OR

let flattened = {
  name: "required",
  "bio.age": "min:18",
  "bio.education.primary": "string",
  "bio.education.secondary": "string",
};
```

### WildCards Rules

WildCards can also be validated.

```js
let data = {
  users: [
    {
      name: "John",
      bio: {
        age: 28,
        education: {
          primary: "Elementary School",
          secondary: "Secondary School",
        },
      },
    },
  ],
};
```

We could declare our validation rules as follows:

```js
let rules = {
  "users.*.name": "required",
  "users.*.bio.age": "min:18",
  "users.*.bio.education.primary": "string",
  "users.*.bio.education.secondary": "string",
};
```

## Available ValidatorJS Rules

Validation rules do not have an implicit 'required'. If a field is _undefined_ or an empty string, it will pass validation. If you want a validation to fail for undefined or '', use the _required_ rule.

Below is a list of all available validation rules and their function:

| rules                               |                                                 |                           |                                               |
| ----------------------------------- | ----------------------------------------------- | ------------------------- | --------------------------------------------- |
| [accepted](#accepted)               | [date](#date)                                   | [hex](#hex)               | [required](#required)                         |
| [after](#after)                     | [digits](#digits)                               | [in](#in)                 | [required_if](#required_if)                   |
| [after_or_equal](#after_or_equal)   | [digits_between](#digits-between)               | [in_array](#in-array)     | [required_unless](#required-unless)           |
| [alpha](#alpha)                     | [different](#different)                         | [integer](#integer)       | [required_with](#required-with)               |
| [alpha_dash](#alpha-dash)           | [distinct](#distinct)                           | [ip_address](#ip-address) | [required_with_all](#required-with-all)       |
| [alpha_num](#alpha-num)             | [email](#email)                                 | [json](#json)             | [required_without](#required-without)         |
| [alpha_numeric](#alpha-numeric)     | [ends_with](#ends-with)                         | [max](#max)               | [required_without_all](#required-without-all) |
| [array](#array)                     | [exclude_if](#exclude-if)                       | [min](#min)               | [same](#same)                                 |
| [bail](#bail)                       | [exclude_unless](#exclude-unless)               | [not_in](#not-in)         | [size](#size)                                 |
| [before](#before)                   | [filled](#filled)                               | [nullable](#nullable)     | [sometimes](#sometimes)                       |
| [before_or_equal](#before-or-equal) | [greater_than](#greater-than)                   | [numeric](#numeric)       | [starts_with](#starts-with)                   |
| [between](#between)                 | [gt](#gt)                                       | [present](#present)       | [string](#string)                             |
| [boolean](#boolean)                 | [greater_than_or_equal](#greater-than-or-equal) | [regex](#regex)           | [url](#url)                                   |
| [confirmed](#confirmed)             | [gte](#gte)                                     |                           | [uuid](#uuid)                                 |

#### accepted

The field under validation must be yes, on, 1 or true. This is useful for validating "Terms of Service" acceptance.

#### after*:date*

The field under validation must be after the given date.

```js
{'start_date' : 'required|date|after:tomorrow')
```

#### after_or_equal

The field under validation must be after or equal to the given field

#### alpha

The field under validation must be entirely alphabetic characters.

#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

#### alpha_num

The field under validation must be entirely alpha-numeric characters.

#### alpha_numeric

_alias to `alpha_num` for consistency with Laravel Rules_

The field under validation must be entirely alpha-numeric characters.

#### array

The field under validation must be an array.

#### bail

The field under validation will stop further process up first error.

#### before*:date*

The field under validation must be before the given date.

#### before_or_equal*:date*

The field under validation must be before or equal to the given date.

#### between*:min,max*

The field under validation must have a size between the given min and max. Strings, numerics, and files are evaluated in the same fashion as the size rule.

#### boolean

The field under validation must be a boolean value of the form `true`, `false`, `0`, `1`, `'true'`, `'false'`, `'0'`, `'1'`,

#### confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### date

The field under validation must be a valid date format which is acceptable by JavaScript's `Date` object.

#### digits*:value*

The field under validation must contain only digits and must have an exact length of value.

#### digits_between*:min,max*

The field under validation must contain only digits and must have length between given min and max.

#### different*:attribute*

The given field must be different than the field under validation.

#### distinct

When validating arrays, the field under validation must not have any duplicate values

```js
{'foo.*.id' : 'distinct'}
```

You may add `ignore_case` to the validation rule's arguments to make the rule ignore capitalization differences:

```js
{'foo.*.id' : 'distinct:ignore_case'}
```

#### email

The field under validation must be formatted as an e-mail address.

#### ends_with

The field under validation must end with one of the given values.

#### exclude_if*:anotherfield,value*

The field under validation will be excluded from the request data returned by the validate and validated methods if the `anotherfield` field is equal to `value`.

#### exclude_unless*:anotherfield,value*

The field under validation will be excluded from the request data returned by the validate and validated methods if the `anotherfield` field is equal to `value`.

#### filled

The field under validation must be formatted as an e-mail address.

#### greater_than*:condition*

#### gt*:condition (alias)*

The field under validation must be greater than the given condition. The two fields must be of the same type. Strings, numerics, arrays, and files are evaluated using the same conventions as the `size` rule.

#### greater_than_or_equal*:condition*

#### gte*:condition (alias)*

The field under validation must be greater than or equal to the given condition. The two fields must be of the same type. Strings, numerics, arrays, and files are evaluated using the same conventions as the `size` rule.

#### hex

The field under validation should be a hexadecimal format. Useful in combination with other rules, like `hex|size:6` for hex color code validation.

#### in*:foo,bar,...*

The field under validation must be included in the given list of values. The field can be an array or string.

#### in_array*:condition\[:caseSensitive=false\]*

The field under validation must exist in condition's values. You can pass `caseSensitive` flag to perform case sensitive lookup

**Example 1 - Default (case insensitive)**

```js
const states = ["AZ", "CA", "NY"];
const validator = new Validator({ state: "ca" }, { state: `in_array:${states}` });
validator.passes(); // returns true
```

**Example 2 - Case Sensitive**

```js
const states = ["AZ", "CA", "NY"];
const validator = new Validator({ state: "ca" }, { state: `in_array:${states}:true` });
validator.passes(); // returns false
```

#### integer

The field under validation must have an integer value.

#### ip_address

The field under validation must be an IP address (IPv4 or IPv6).

#### json

The field under validation must be valid JSON

#### max*:value*

Validate that an attribute is no greater than a given size

_Note: Maximum checks are inclusive._

#### min:value

Validate that an attribute is at least a given size.

_note: Minimum checks are inclusive._

#### not_in*:foo,bar,...*

The field under validation must not be included in the given list of values.

#### nullable

The field under validation may be `null`.

#### numeric

Validate that an attribute is numeric. The string representation of a number will pass.

#### present

The field under validation must be present in the input data but can be empty.

#### regex*:pattern*

The field under validation must match the given regular expression.

**Note**: When using the `regex` pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character.
For each backward slash that you used in your regex pattern, you must escape each one with another backward slash.

#### required

Checks if the length of the String representation of the value is >

#### required_if*:anotherfield,value*

The field under validation must be present and not empty if the anotherfield field is equal to any value.

#### required_unless*:anotherfield,value*

The field under validation must be present and not empty unless the anotherfield field is equal to any value.

#### required_with*:foo,bar,...*

The field under validation must be present and not empty only if any of the other specified fields are present.

#### required_with_all*:foo,bar,...*

The field under validation must be present and not empty only if all of the other specified fields are present.

#### required_without*:foo,bar,...*

The field under validation must be present and not empty only when any of the other specified fields are not present.

#### required_without_all*:foo,bar,...*

The field under validation must be present and not empty only when all of the other specified fields are not present.

#### same:attribute

The given field must match the field under validation.

#### size:value

The field under validation must have a size matching the given value. For string data, value corresponds to the number of characters. For numeric data, value corresponds to a given integer value.

#### sometimes

In some situations, you may wish to run validation checks against a field only if that field is present in the data being validated. To quickly accomplish this, add the sometimes rule to your rule list:

**Example 1 - General `sometimes`**

In the following example, `name` will only be validated if value is supplied. The `min` and `max` rules will only be applied if `name` is in data list.

```js
const validator = new Validator({ name: "mike" }, { name: "sometimes|min:3|max:80" });
```

**Example 2 - Using `sometimes` and `required`**

Further, the following example will not use the `required` rule if `sometimes` is supplied. Since the `name` attribute is not supplied, this validation would pass

```js
const validator = new Validator({}, { name: "required|sometimes|min:3|max:80" });
```

#### starts_with*:foo,bar...*

The field under validation must start with one of the given values.

#### string

The field under validation must be a string.

#### url

Validate that an attribute has a valid URL format

#### uuid

The field under validation must be a valid RFC 4122 (version 1, 3, 4, or 5) universally unique identifier (UUID).

**Example 1 - Regex validation**

```js
const validation = new Validator(
  {
    name: "Doe",
    salary: "10,000.00",
    yearOfBirth: "1980",
  },
  {
    name: "required|size:3",
    salary: ["required", "regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/"],
    yearOfBirth: ["required", "regex:/^(19|20)[\\d]{2,2}$/"],
  },
);

validation.fails(); // false
validation.passes(); // true
```

**Example 2 - Type Checking Validation**

```js
const validation = new Validator(
  {
    age: 30,
    name: "",
  },
  {
    age: ["required", { in: [29, 30] }],
    name: [{ required_if: ["age", 30] }],
  },
);

validation.fails(); // true
validation.passes(); // false
```

## Custom Validator Rules

If `validatorjs` does not have a rule you are looking for, you can create your own rules which can be used in conjunction with existing `validatorjs` rules as you see fit.

### Register Custom Validation Rules

Using the following signature, you can create validation rules which fit your applications requirements.

| Parameter                          | Type     | Description                                                                                                                                 |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| name                               | String   | The name of the rule                                                                                                                        |
| callback function                  | Function | Callback function that is executed when validation rule is invoked.                                                                         |
| _(see parameter definition below)_ |          | _Return a boolean value (true or false) to signal pass or failed validation_                                                                |
| language                           | String   | An optional string where you can specify a custom error message. _:attribute_ inside errorMessage will be replaced with the attribute name. |

```js
Validator.register(
  "telephone",
  (value, requirement, attribute) => {
    return value.match(/^\d{3}-\d{3}-\d{4}$/);
  },
  "The :attribute phone number is not in the format XXX-XXX-XXXX.",
);
```

**Validator Rule Parameters**

| Parameter   | Type   | Description                                                                    |
| ----------- | ------ | ------------------------------------------------------------------------------ |
| value       | any    | The field under validation value (string, number, boolean, array, etc)         |
| requirement | String | will contain the information after semicolon (will be null if not requirement) |
| attributes  | Object | will be the object name (field) for field under validation                     |

**Example: The following examples outlines how each parameter will be used**

```js
it("should should assure years is correct number of digits", () => {
  Validator.register("years", (val, req, attrs) => {
    return val.length === parseInt(req);
  });

  const validator = new Validator({ digits: "2020" }, { digits: "years:4" });
  expect(validator.passes()).to.be.true;
});
```

#### Database Exists Rule Example

The following example demonstrates how `validatorjs` can use used to perform verification against a database.

This example will use `axios` but can be adjusted to match you existing database configuration.

```js
Validator.register(
  "exists",
  async (val, req, attrs) => {
    let table = typeof req === "string" ? req : "states"; // perform check to make sure table was supplied
    let response = await axios.get(`/${table}/${val}`);
    return response.status === 200;
  },
  "The supplied :attribute does not exists in database.",
);

let data = { state: "CC" };
let rules = { state: "exists:states" };
let validator = new Validator(data, rules);

validator.passes(); // will be false
let msg = validation.errors.first("state"); // The supplied state does not exist in database.
```

## Asynchronous Validation

If you would like to create asynchronous rules, you can register a rule which accepts a `passes` callback:

```js
Validator.registerAsync("username_available", (username, attribute, requirements, passes) => {
  // do your database/api checks here etc
  // then call the `passes` method where appropriate:
  passes(); // if username is available
  passes(false, "Username has already been taken."); // if username is not available
});
```

Then call your validator using `checkAsync` passing `fails` and `passes` callbacks like so:

```js
const validator = new Validator({ username: "test123" }, { username: "required|min:3|username_available" });

function passes() {
  // Validation passed
}

function fails() {
  validator.errors.first("username");
}

validator.checkAsync(passes, fails);
```

### Error Messages

This constructor will automatically generate error messages for validation rules that failed.

If there are errors, the Validator instance will have its **errors** property object populated with the error messages for all failing attributes. The methods and properties on the **errors** property object are:

#### .fields()

returns array of all fields which have errors

#### .keys() [alias `fields`]

returns array of all keys (fields) which have errors

#### .first(attribute)

returns the first error message for an attribute, false otherwise

#### .get(attribute)

returns an array of error messages for an attribute, or an empty array if there are no errors

#### .all()

returns an object containing all error messages for all failing attributes

#### .has(attribute)

returns true if error messages exist for an attribute, false otherwise

#### .errorCount

the number of validation errors

```js
const validation = new Validator(input, rules);
validation.errors.all(); // returns all failing validation rules
validation.errors.fields(); // returns all fields which failed validation
validation.errors.keys(); // returns all keys which failed validation (alias to `fields` method)
validation.errors.first("email"); // returns first error message for email attribute
validation.errors.get("email"); // returns an array of error messages for the email attribute
validation.errors.has("email"); // returns true if error has `email` otherwise returns false
validation.errors.errorCount(); // returns number of error rules
```

### Custom Error Messages

If you need a specific error message and you don't want to override the default one, you can pass an override as the third argument to the Validator object, just like with [Laravel](http://laravel.com/docs/validation#custom-error-messages).

```js
const validation = new Validator({ name: "" }, { name: "required" }, { required: "You forgot to give a :attribute" });
validation.passes();
validation.errors.first("name"); // returns 'You forgot to give a name'
```

Some of the validators have string and numeric versions. You can change them too.

```js
let input = {
  username: "myusernameistoolong",
};

let rules = {
  username: "max:16",
};

const validation = new Validator(input, rules, {
  max: {
    string: "The :attribute is too long. Max length is :max.",
  },
});
validation.passes();
validation.errors.first("username"); // returns 'The username is too long. Max length is 16.'
```

You can even provide error messages on a per attribute basis! Just set the message's key to 'validator.attribute'

```js
let input = { name: "", email: "" };
let rules = { name: "required", email: "required" };

const validation = new Validator(input, rules, {
  "required.email": "Without an :attribute we can't reach you!",
});

validation.passes();
validation.errors.first("name"); // returns  'The name field is required.'
validation.errors.first("email"); // returns 'Without an email we can\'t reach you!'
```

### Success Messages

Like the `Error Messages`, this will also be the case for success messages.

This constructor will automatically generate success messages for validation rules that pass.

If there are successes, the Validator instance will have its **successes** property object populated with the success messages for all passing attributes. The methods and properties on the **successes** property object are:

_Note: You can perform anything message related on the `validation.successes` object_

#### .fields()

returns array of all fields which have errors

#### .keys() [alias `fields`]

returns array of all keys (fields) which have errors

#### .first(attribute)

returns the first success rule message for an attribute, false otherwise

#### .all()

returns an object containing all success messages for all passing attributes

#### .has(attribute)

returns true if success messages exist for an attribute, false otherwise

#### .successCount

the number of validation successes

```js
const validation = new Validator(input, rules);
validation.successes.all(); // returns all passing validation rules
validation.successes.fields(); // returns all fields which pass validation
validation.successes.keys(); // returns all keys which pass validation (alias to `fields` method)
validation.successes.first("email"); // returns first success message for email attribute
validation.successes.get("email"); // returns an array of success messages for the email attribute
validation.successes.has("email"); // returns true if success has `email` otherwise returns false
validation.successes.successCount(); // returns number of success rules
```

### Custom Attribute Names

To display a custom "friendly" attribute name in error messages, use `.setAttributeNames()`
When defining attribute name, you can use anything and may include spaces, or other characters

```js
const validator = new Validator({ name: "" }, { name: "required" });
validator.setAttributeNames({ name: "customer name 😀" });
if (validator.fails()) {
  validator.errors.first("name"); // "The customer name 😀 field is required."
}
```

Alternatively you can supply global custom attribute names in your lang with the `attributes` property.

You can also configure a custom attribute formatter:

```js
// Configure global formatter.
Validator.setAttributeFormatter(function (attribute) {
  return attribute.replace(/_/g, " ");
});

// Or configure formatter for particular instance.
const validator = new Validator({ first_name: "" }, { first_name: "required" });
validator.setAttributeFormatter(function (attribute) {
  return attribute.replace(/_/g, " ");
});
if (validator.fails()) {
  console.log(validator.errors.first("first_name")); // The first name field is required.
}
```

Note: by default all \_ characters will be replaced with spaces.

## Language Support

Error messages are in English by default. To include another language in the browser, reference the language file in a script tag and call `Validator.useLang('lang_code')`.

```html
<script src="dist/validator.js"></script>
<script src="dist/lang/ru.js"></script>
<script>
  Validator.useLang("es");
</script>
```

In Node, it will automatically pickup on the language source files.

```js
const Validator = require("validatorjs");
Validator.useLang("ru");
```

If you don't see support for your language, please add one to `src/lang`!

You can also add your own custom language by calling `setMessages`:

```js
Validator.setMessages("lang_code", {
  required: "The :attribute field is required.",
});
```

Get the raw object of messages for the given language:

```js
Validator.getMessages("lang_code");
```

Switch the default language used by the validator:

```js
Validator.useLang("lang_code");
```

Get the default language being used:

```js
Validator.getDefaultLang(); // returns e.g. 'en'
```

Override default messages for language:

```js
let messages = Validator.getMessages("en");
messages.required = "Whoops, :attribute field is required.";
Validator.setMessages("en", messages);
```

### Language per Validator instance

In addition to setting the language globally as outlined above, you can also supply the desired language per Validator instance as follows:

```js
const validator = new Validator({ zip: "" }, { zip: "required" }, null, "se");
const message = validator.errors.first("zip")); // returns `zip måste vara ifyllt.`
```

### Error Message Aliases

You can supply error message field aliases, to better explain resulting error as follows:

```js
const Validator = require("validatorjs");

let data = { fname: "", lname: "" };
let rules = { fname: "required", lname: "required" };
let aliases = { fname: "First Name", lname: "Last Name" };

const validator = new Validator(data, rules, null, null, aliases);

let result = validator.passes();  // false
let messages = validator.errors.all();

Returns Errors Object:

{
  fname: [ 'The First Name field is required.' ],
  lname: [ 'The Last Name field is required.' ]
}
```

## License

Copyright &copy; 2012-2018 David Tang,
Copyright &copy; 2018-2021 Mike Erickson
Released under the MIT license

## Credits

validatorjs concept and original release by David Tang
validatorjs maintained by Mike Erickson and Contributors

E-Mail: [mike.erickson@codedungeon.io](mailto:mike.erickson@codedungeon.io)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](http://codedungeon.io)
