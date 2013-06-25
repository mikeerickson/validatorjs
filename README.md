# validatorjs v0.9.0

[![Build Status](https://travis-ci.org/skaterdav85/validatorjs.png?branch=master)](https://travis-ci.org/skaterdav85/validatorjs)

The validatorjs library makes data validation in JavaScript very easy on both the client and server side (Node.js). This library was inspired by the [Laravel framework's Validator class](http://laravel.com/docs/validation#rule-integer) so you will see a lot of similarities in the library's API.

## Setup

#### Browser:
1. Include __validator.min.js__ script onto your page from the distribution folder _dist_.
2. Invoke the Validator constructor function. See below for details on Validator parameters and validation rules.

#### Node.js:
Install the Validator package from the NPM registry [https://npmjs.org/package/validatorjs](https://npmjs.org/package/validatorjs)

```
	npm install validatorjs
```

```js
	var Validator = require('validatorjs');
```

## Usage and Examples

The __1st argument__ to the constructor is an object that contains the data you want to validate. 

The __2nd argument__ is an object that contains the validation rules. 

#### Example 1:
```js
	var data = {
		name: 'David',
		email: 'david@gmail.com',
		age: 27
	};
	
	var rules = {
		name: 'required',
		email: 'email',
		age: 'min:18'
	};

	var validation = new Validator(data, rules);
	
	validation.passes() // true
	validation.fails() // false
	
```

To apply validation rules to the _data_ object, use the same object key names for the _rules_ object.

#### Example 2:
```js
	var data = {
		name: '',
		email: 'not an email address.com'
	};
	
	var rules = {
		name: 'required|size:3',
		email: 'required|email'
	};

	var validation = new Validator(data, rules);

	validation.fails(); // true
	validation.passes(); // false

	// Error messages
	validation.errors.first('email'); // 'The email format is invalid.'
	validation.errors.get('email'); // returns an array of all email error messages
```

## Validation Rules

####accepted

The field under validation must be yes, on, or 1. This is useful for validating "Terms of Service" acceptance.

####alpha

The field under validation must be entirely alphabetic characters.

####alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

####alpha_num

The field under validation must be entirely alpha-numeric characters.

####confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

####different:attribute

The given field must be different than the field under validation.


####email

The field under validation must be formatted as an e-mail address.


```
	address: 'email'
```

####in:foo,bar,...

The field under validation must be included in the given list of values.

####integer

The field under validation must have an integer value.

####max:value

Validate that an attribute is no greater than a given size

```
	cost: 'max:100'
```
_Note: Maximum checks are inclusive._

####min:value

Validate that an attribute is at least a given size.

```
	payment: 'min:10'
```

_Note: Minimum checks are inclusive._

####not_in:foo,bar,...

The field under validation must not be included in the given list of values.

####numeric

Validate that an attribute is numeric. The string representation of a number will pass.

```
	age: 'numeric'
```

####required

Checks if the length of the String representation of the value is >

```
	username: 'required'
```



####same:attribute

The given field must match the field under validation.


####size:value

Validate that an attribute is a given length, or, if an attribute is numeric, is a given value


```
	duration: 'size:2'
```

####url

Validate that an attribute has a valid URL format

```
	link: 'url'
```

## Register a custom validation rule

```js
	Validator.register(custom_rule_name, callbackFn, errorMessage);
```

* custom_rule_name - string
* callbackFn - function. If callbackFn returns a truthy value, the validation will pass for this rule. Otherwise, this validation rule will fail. 
* errorMessage is an optional string where you can specify a custom error message. _:attribute_ inside errorMessage will be replaced with the attribute name.

```js
	Validator.register('telephone', function(value, requirement, attribute) { // requirement paramter defaults to null
		return val.match(/^\d{3}-\d{3}-\d{4}$/);
	}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
```


## Error Messages
This contructor will automatically generate error messages for validation rules that failed. 

If there are errors, the Validator instance will have its __errors__ property object populated with the error messages for all failing attributes. The methods and properties on the __errors__ property object are:

####.first(attribute)

returns the first error message for an attribute, false otherwise

####.get(attribute)
returns an array of error messages for an attribute, or an empty array if there are no errors

####.errorCount

the number of validation errors

####Example:

```js
	var validation = new Validator(input, rules);
	validation.errors.first('email'); // returns first error message for email attribute
	validator.errors.get('email'); // returns an array of error messages for the email attribute
```

Here are the default error messages. If you want to change these error messages, modify the file in the _src_ directory.

```js
	var messages = {
		accepted: 'The :attribute must be accepted.',
		alpha: 'The :attribute field must contain only alphabetic characters.',
		alpha_dash: 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
		alpha_num: 'The :attribute field must be alphanumeric.',
		confirmed: 'The :attribute confirmation does not match.',
		email: 'The :attribute format is invalid.',
		def: 'The :attribute attribute has errors.',
		different: 'The :attribute and :different must be different.',
		'in': 'The selected :attribute is invalid.',
		integer: 'The :attribute must be an integer.',
		min: {
			numeric: 'The :attribute must be at least :min.',
			string: 'The :attribute must be at least :min characters.'
		},
		max: {
			numeric: 'The :attribute must be less than :max.',
			string: 'The :attribute must be less than :max characters.'
		},
		not_in: 'The selected :attribute is invalid.',
		numeric: 'The :attribute must be a number.',
		required: 'The :attribute field is required.',
		same: 'The :attribute and :same fields must match.',
		size: {
			numeric: 'The :attribute must be :size.',
			string: 'The :attribute must be :size characters.'
		},
		url: 'The :attribute format is invalid.'
	};
```

## Public Instance Methods

####.passes()
returns boolean

####.fails()
returns boolean

####.first(attribute_name)
returns first error message for _string_ attribute_name, or _null_ if no error message exists. 

__This will be deprecated in the future.__ Use _validation_instance_.errors.first(attribute) instead


## Testing

Install node module dependencies

```
	npm install
```

See __SpecRunner.html__ for Jasmine tests in the browser. 

You can also run the jasmine tests via Node.js once you've installed the NPM package jasmine-node.

```
	jasmine-node spec/ --verbose --color

	//OR

	npm test (which calls the above command)
```

Once the above test passes, run the following command which will in turn run JSHint and minify the source
```
	grunt
```