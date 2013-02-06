##validator.js
### Setup

##### Browser usage:
1. Include __validator.js__ or __validator.min.js__ script onto your page from the distribution folder (_dist_).
2. Invoke the Validator constructor function. See below for details on Validator parameters and validation rules.

##### Node.js Usage:
1. Install the Validator package from the NPM registry [https://npmjs.org/package/laravel-validator-for-js](https://npmjs.org/package/laravel-validator-for-js)

```
	npm install laravel-validator-for-js
```

2. On your node.js script, require the module.

```js
	var ValidationModule = require('validator');
```

3. Invoke the Validator constructor function.

### Examples

The __1st argument__ to the constructor is an object that contains the data you want to validate. 

The __2nd argument__ is an object that contains the validation rules. 

#####Example 1:
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

To apply validation rules to the _input_ object, use the same object key names for the _rules_ object.

#####Example 2:
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

###Validation Rules

* required - Checks if the length of the String representation of the value is > 0

```
	username: 'required'
```

* email - Checks for an @ symbol followed by a period


```
	address: 'email'
```

* size - Validate that an attribute is a given length, or, if an attribute is numeric, is a given value


```
	duration: 'size:2'
```

* min - Validate that an attribute is at least a given size.

```
	payment: 'min:10'
	
```

* max - Validate that an attribute is no greater than a given size

```
	cost: 'max:100'
```

* numeric - Validate that an attribute is numeric. The string representation of a number will pass.

```
	age: 'numeric'
```

__Note: All minimum and maximum checks are inclusive.__

###Public Instance Methods

* passes() - returns boolean
* fails() - returns boolean
* first(attribute_name) - returns first error message for _string_ attribute_name, or _null_ if no error message exists


See SpecRunner.html for Jasmine tests and examples