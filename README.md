# validatorjs

[![Build Status](https://travis-ci.org/skaterdav85/validatorjs.png?branch=master)](https://travis-ci.org/skaterdav85/validatorjs)

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
		email: 'johndoe@gmail.com'
	};
	
	var rules = {
		email: 'email'
	};

	var validation = new Validator(data, rules);
	
	validation.passes() // true
	validation.fails() // false
	
```

To apply validation rules to the _data_ object, use the same object key names for the _rules_ object.

#### Example 2:
```js
	var rules = {
		name: 'required|size:3',
		email: 'required|email'
	};

	var data = {
		name: '',
		email: ''
	};

	var validation = new Validator(data, rules);

	validation.fails(); // true

```

## Validation Rules

####alpha_num

The field under validation must be entirely alpha-numeric characters.

####required

Checks if the length of the String representation of the value is >

```
	username: 'required'
```

####email

The field under validation must be formatted as an e-mail address.


```
	address: 'email'
```

####size

Validate that an attribute is a given length, or, if an attribute is numeric, is a given value


```
	duration: 'size:2'
```

####min

Validate that an attribute is at least a given size.

```
	payment: 'min:10'
```

####max
Validate that an attribute is no greater than a given size

```
	cost: 'max:100'
```

__Note: All minimum and maximum checks are inclusive.__

####numeric

Validate that an attribute is numeric. The string representation of a number will pass.

```
	age: 'numeric'
```

####url

Validate that an attribute has a valid URL format

```
	link: 'url'
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
		required: 'The :attribute field is required.',
		email: 'The :attribute format is invalid.',
		def: 'The :attribute attribute has errors.',
		min: {
			numeric: 'The :attribute must be at least :min.',
			string: 'The :attribute must be at least :min characters.'
		},
		max: {
			numeric: 'The :attribute must be less than :max.',
			string: 'The :attribute must be less than :max characters.'
		},
		size: {
			numeric: 'The :attribute must be :size.',
			string: 'The :attribute must be :size characters.'
		},
		numeric: 'The :attribute must be a number.',
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

## Static Methods

####.register(custom_rule_name, callbackFn, errorMessage)

Register a custom validation rule

* __custom_rule_name__ - string
* callbackFn - function. If __callbackFn__ returns a truthy value, the validation will pass for this rule. Otherwise, this validation rule will fail. 
* __errorMessage__ is an optional string where you can specify a custom error message. _:attribute_ inside errorMessage will be replaced with the attribute name.

```js
	Validator.register('telephone', function(val) {
		return val.match(/^\d{3}-\d{3}-\d{4}$/);
	}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
```

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