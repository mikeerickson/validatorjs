validatorjs
===========

[![Build Status](https://travis-ci.org/skaterdav85/validatorjs.png?branch=master)](https://travis-ci.org/skaterdav85/validatorjs)

The validatorjs library makes data validation in JavaScript very easy in both the browser and Node.js. This library was inspired by the [Laravel framework's Validator class](http://laravel.com/docs/validation).

### Why use validatorjs?

1. Not dependent on any libraries
2. Works in the browser and Node.js
3. Readable and declarative validation rules
4. Size
	* Development version: 3.62 kB gzipped with lots of spacing and comments
	* Production version: 2.02 kB gzipped and minified
5. Supports other languages
6. AMD/Require.js and CommonJS/Browserify support

### Browser

```html
<script src="dist/validator.min.js"></script>
```

You can also install it using Bower.

```
bower install validatorjs
```

### Node.js / Browserify Setup

```
npm install validatorjs
```

```js
var Validator = require('validatorjs');
```

### Basic Usage

```js
var validation = new Validator(data, rules [, customErrorMessages]);
```

__data__ {Object} - The data you want to validate

__rules__ {Object} - Validation rules

__customErrorMessages__ {Object} - Optional custom error messages to return


Alternatively, you can use a static _make()_ method on the Validator class.

```js
var validation = Validator.make(data, rules [, customErrorMessages]);
```

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

### Validation Rules

Validation rules do not have an implicit 'required'. If a field is _undefined_ or an empty string, it will pass validation. If you want a validation to fail for undefined or '', use the _required_ rule.

#### accepted

The field under validation must be yes, on, or 1. This is useful for validating "Terms of Service" acceptance.

#### alpha

The field under validation must be entirely alphabetic characters.

#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

#### alpha_num

The field under validation must be entirely alpha-numeric characters.

#### confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### digits:value

The field under validation must be numeric and must have an exact length of value.

#### different:attribute

The given field must be different than the field under validation.

#### email

The field under validation must be formatted as an e-mail address.


#### in:foo,bar,...

The field under validation must be included in the given list of values.

####integer

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

Validate that an attribute is a given length, or, if an attribute is numeric, is a given value


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
Validator.register(custom_rule_name, callbackFn, errorMessage);
```

__custom_rule_name__ {String}

__callbackFn__ {Function}. Returns a boolean to represent a successful or failed validation.

__errorMessage__ {String} - An optional string where you can specify a custom error message. _:attribute_ inside errorMessage will be replaced with the attribute name.

```js
Validator.register('telephone', function(value, requirement, attribute) { // requirement paramter defaults to null
	return val.match(/^\d{3}-\d{3}-\d{4}$/);
}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
```

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

### Language Support

You can build the project with error messages in other languages. Simply create a language file in _src/lang/_ modeled after _en.js_.

```
# Defaults to en.js
grunt --lang=en
```

The English build will be dist/validator.js. Other builds will be dist/validator-**.js.

Please contribute your language files!

### Tests

```
# Terminal tab 1
./node_modules/karma/bin/karma start

# Terminal tab 2
grunt watch
```

Grunt will watch the files in _src/_ and build the library on change. Karma will watch the final build of the library, _dist/validator.js_, and run the tests on change.

If someone knows how to make this into a combined task, please send a pull request!

### Build

```
grunt
```
