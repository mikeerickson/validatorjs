validatorjs
===========

[![Build Status](https://travis-ci.org/skaterdav85/validatorjs.png?branch=master)](https://travis-ci.org/skaterdav85/validatorjs)

The validatorjs library makes data validation in JavaScript very easy in both the browser and Node.js. This library was inspired by the [Laravel framework's Validator](http://laravel.com/docs/validation).

## Why use validatorjs?

* Not dependent on any libraries.
* Works in both the browser and Node.
* Readable and declarative validation rules.
* Error messages with multilingual support.
* AMD/Require.js and CommonJS/Browserify support.

## Installation

Grab validatorjs from Bower, NPM, or the /dist directory on Github:

```
bower install validatorjs
```

```
npm install validatorjs
```

### Browser

```html
<script src="validator.min.js"></script>
```

### Node.js / Browserify

```js
var Validator = require('validatorjs');
```

### Basic Usage

```js
var validation = new Validator(data, rules [, customErrorMessages, limit]);
```

__data__ {Object} - The data you want to validate

__rules__ {Object} - Validation rules

__customErrorMessages__ {Object} - Optional custom error messages to return

__limit__ {Object} - Optional custom restrict flatten on specific fields

#### Example 1 - Passing validation

```js
var data = {
	name: 'John',
	email: 'johndoe@gmail.com',
	age: 28
};

var rules = {
	name: 'required',
	email: 'required|email',
	age: 'min:18'
};

var validation = new Validator(data, rules);

validation.passes(); // true
validation.fails(); // false
```

To apply validation rules to the _data_ object, use the same object key names for the _rules_ object.

#### Example 2 - Failing validation

```js
var validation = new Validator({
	name: 'D',
	email: 'not an email address.com'
}, {
	name: 'size:3',
	email: 'required|email'
});

validation.fails(); // true
validation.passes(); // false

// Error messages
validation.errors.first('email'); // 'The email format is invalid.'
validation.errors.get('email'); // returns an array of all email error messages
```

#### Example 3 - Custom rule / limits

```js
const data = {
  name: 'name',
  platforms: {
    ios: false,
    android: false,
    desktop: false
  },
  ageRange: {
    start: 0,
    end: 80
  }
};

const rules = {
  platforms: 'singleTrueRule'
};

Validator.register('singleTrueRule', value => {
  return Object.keys(value).some(k => k.value === true);
}, 'At least one must be true');

const limits = {
  'targeting.platforms': true
};

var validation = new Validator(data, rules, null, limits);

validation.fails(); // true

validation.errors.first('targeting.platforms'); // 'At least one must be true'
```

### Nested rules

Nested objects can also be validated. There are two ways to declare validation rules for nested objects. The first way is to declare the validation rules with a corresponding nested object structure that reflects the data. The second way is to declare validation rules with flattened key names. For example, to validate the following data:

```js
var data = {
  name: 'John',
  bio: {
    age: 28,
    education: {
      primary: 'Elementary School',
      secondary: 'Secondary School'
    }
  }
};
```

We could declare our validation rules as follows:

```js
var nested = {
  name: 'required',
  bio: {
    age: 'min:18',
    education: {
      primary: 'string',
      secondary: 'string'
    }
  }
};

// OR

var flattened = {
  'name': 'required',
  'bio.age': 'min:18'
  'bio.education.primary': 'string',
  'bio.education.secondary': 'string'
};
```

### Available Rules

Validation rules do not have an implicit 'required'. If a field is _undefined_ or an empty string, it will pass validation. If you want a validation to fail for undefined or '', use the _required_ rule.

#### accepted

The field under validation must be yes, on, 1 or true. This is useful for validating "Terms of Service" acceptance.

#### alpha

The field under validation must be entirely alphabetic characters.

#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

#### alpha_num

The field under validation must be entirely alpha-numeric characters.

#### array

The field under validation must be an array.

#### between:min,max

The field under validation must have a size between the given min and max. Strings, numerics, and files are evaluated in the same fashion as the size rule.

#### confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### date

The field under validation must be a valid date format which is acceptable by Javascript's `Date` object.

#### digits:value

The field under validation must be numeric and must have an exact length of value.

#### different:attribute

The given field must be different than the field under validation.

#### email

The field under validation must be formatted as an e-mail address.

#### in:foo,bar,...

The field under validation must be included in the given list of values. The field can be an array or string.

#### integer

The field under validation must have an integer value.

#### max:value

Validate that an attribute is no greater than a given size

_Note: Maximum checks are inclusive._

#### min:value

Validate that an attribute is at least a given size.

_Note: Minimum checks are inclusive._

#### not_in:foo,bar,...

The field under validation must not be included in the given list of values.

#### numeric

Validate that an attribute is numeric. The string representation of a number will pass.

#### required

Checks if the length of the String representation of the value is >

#### same:attribute

The given field must match the field under validation.

#### size:value

The field under validation must have a size matching the given value. For string data, value corresponds to the number of characters. For numeric data, value corresponds to a given integer value.

#### string

The field under validation must be a string.

#### url

Validate that an attribute has a valid URL format

#### regex:pattern

The field under validation must match the given regular expression.

**Note**: When using the ``regex`` pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character.
For each backward slash that you used in your regex pattern, you must escape each one with another backward slash.

#### Example 3 - Regex validation

```js
var validation = new Validator({
	name: 'Doe',
	salary: '10,000.00',
	yearOfBirth: '1980'
}, {
	name: 'required|size:3',
	salary: ['required', 'regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/'],
	yearOfBirth: ['required', 'regex:/^(19|20)[\\d]{2,2}$/']
});

validation.fails(); // false
validation.passes(); // true

```

### Registering Custom Validation Rules

```js
Validator.register(name, callbackFn, errorMessage);
```

__name__ {String} - The name of the rule.

__callbackFn__ {Function} - Returns a boolean to represent a successful or failed validation.

__errorMessage__ {String} - An optional string where you can specify a custom error message. _:attribute_ inside errorMessage will be replaced with the attribute name.

```js
Validator.register('telephone', function(value, requirement, attribute) { // requirement parameter defaults to null
	return value.match(/^\d{3}-\d{3}-\d{4}$/);
}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
```

### Asynchronous validation

Register an asynchronous rule which accepts a `passes` callback:

```js
Validator.registerAsync('username_available', function(username, attribute, req, passes) {
	// do your database/api checks here etc
	// then call the `passes` method where appropriate:
	passes(); // if username is available
	passes(false, 'Username has already been taken.'); // if username is not available
});
```

Then call your validator passing a callback to `fails` or `passes` like so:

```js
var validator = new Validator({ username: 'test123' }, { username: 'required|min:3|username_available' });
validator.passes(function() {
	// Validation passed
});

// Or call fails()
validator.fails(function() {
	// Error message:
	validator.errors.first('username');
});
```

Note: if you attempt to call `passes` or `fails` without a callback and the validator detects there are asynchronous validation rules, an exception will be thrown.

### Error Messages

This contructor will automatically generate error messages for validation rules that failed.

If there are errors, the Validator instance will have its __errors__ property object populated with the error messages for all failing attributes. The methods and properties on the __errors__ property object are:

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
var validation = new Validator(input, rules);
validation.errors.first('email'); // returns first error message for email attribute
validator.errors.get('email'); // returns an array of error messages for the email attribute
```

### Custom Error Messages

If you need a specific error message and you don't want to override the default one, you can pass an override as the third argument to the Validator object, just like with [Laravel](http://laravel.com/docs/validation#custom-error-messages).

```js
var input = {
	name: ''
};

var rules = {
	name : 'required'
};

var validation = new Validator(input, rules, { required: 'You forgot to give a :attribute' });
validation.errors.first('name'); // returns 'You forgot to give a name'
```

Some of the validators have string and numeric versions. You can change them too.

```js
var input = {
	username: 'myusernameistoolong'
};

var rules = {
	username : 'max:16'
};

var validation = new Validator(input, rules, {
	max: {
		string: 'The :attribute is too long. Max length is :max.'
	}
});

validation.errors.first('username'); // returns 'The username is too long. Max length is 16.'
```

You can even provide error messages on a per attribute basis! Just set the message's key to 'validator.attribute'

```js
var input = { name: '', email: '' };
var rules = { name : 'required', email : 'required' };

var validation = new Validator(input, rules, {
	"required.email": "Without an :attribute we can't reach you!"
});

validation.errors.first('name'); // returns  'The name field is required.'
validation.errors.first('email'); // returns 'Without an email we can\'t reach you!'
```

### Custom attribute names

To display a custom "friendly" attribute name in error messages, use `.setAttributeNames()`

```js
var validator = new Validator({ name: '' }, { name: 'required' });
validator.setAttributeNames({ name: 'custom_name' });
if (validator.fails()) {
	validator.errors.first('name'); // "The custom_name field is required."
}
```

Alternatively you can supply global custom attribute names in your lang with the `attributes` property.

You can also configure a custom attribute formatter:

```js
// Configure global formatter.
Validator.setAttributeFormatter(function(attribute) {
	return attribute.replace(/_/g, ' ');
});

// Or configure formatter for particular instance.
var validator = new Validator({ first_name: '' }, { first_name: 'required' });
validator.setAttributeFormatter(function(attribute) {
	return attribute.replace(/_/g, ' ');
});
if (validator.fails()) {
	console.log(validator.errors.first('first_name')); // The first name field is required.
}
```

Note: by default all _[] characters will be replaced with spaces.

### Language Support

Error messages are in English by default. To include another language in the browser, reference the language file in a script tag and call `Validator.useLang('lang_code')`.

```html
<script src="dist/validator.min.js"></script>
<script src="dist/lang/ru.js"></script>
<script>
	Validator.useLang('es');
</script>
```

In Node, it will automatically pickup on the language source files.

```js
var Validator = require('validatorjs');
Validator.useLang('ru');
```

If you don't see support for your language, please add one to `src/lang`!

You can also add your own custom language by calling `setMessages`:

```js
Validator.setMessages('lang_code', {
	required: 'The :attribute field is required.',
	....
	....
});
```

Get the raw object of messages for the given language:

```js
Validator.getMessages('lang_code');
```

Switch the default language used by the validator:

```js
Validator.useLang('lang_code');
```

Get the default language being used:

```js
Validator.getDefaultLang(); // returns e.g. 'en'
```

Override default messages for language:

```js
var messages = Validator.getMessages('en');
messages.required = 'Whoops, :attribute field is required.';
Validator.setMessages('en', messages);
```
