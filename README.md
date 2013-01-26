###Validator usage:
1. Include the validator.js script onto your page. Minified version in the __dist__ folder.

2. Invoke the Validator constructor function. The first argument is an object that contains the data you want to validate. The 2nd argument is an object that contains the validation rules.

####Example 1:
```
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

####Example 2:
```
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

####Validation Rules

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


__Note: All minimum and maximum checks are inclusive.__

####Public Instance Methods

* passes() - returns boolean
* fails() - returns boolean
* first(attribute_name) - returns first error message for _string_ attribute_name, or _null_ if no error message exists


See SpecRunner.html for Jasmine tests and examples