### 3.13.4

* https://github.com/skaterdav85/validatorjs/issues/187

### 3.11.0

* Fixes required_if (https://github.com/skaterdav85/validatorjs/pull/148)
* New rules 'required_unless', 'required_with', 'required_with_all', 'required_without', 'required_without_all' (https://github.com/skaterdav85/validatorjs/pull/148)
* Adds Persian/Farsi (https://github.com/skaterdav85/validatorjs/pull/149)
* Adds Vietnamese (https://github.com/skaterdav85/validatorjs/pull/141)

### 3.10.0

* Adds Portuguese language

### 3.9.0

* Add Norwegian Bokmål (nb_NO) localization

### 3.8.0

* Adds Greek language support

### 3.7.0

* Adds "sometimes" rule
* add optional check for checkAsync method and add additional test specs for checkAsync methods

### 3.6.0

Adds Traditional Chinese translations

### 3.5.0

* Adds Chinese translations

### 3.4.0

* Adds Turkish translations

### 3.3.1

* Fixes https://github.com/skaterdav85/validatorjs/pull/119#issuecomment-240060885

### 3.3.0

* Adds German translation file

### 3.1.1

* Fixes https://github.com/skaterdav85/validatorjs/issues/102
* Fixes https://github.com/skaterdav85/validatorjs/pull/104

### 3.1.0

* Adds date rule

### 3.0.0

* Released nested rules feature

### 2.1.1

* Discovered nested rules broke some custom validation rules that handled nested objects so removed this feature in 2.x to follow semver. See [issue](https://github.com/skaterdav85/validatorjs/issues/94).

### 2.1.0

* Introduced nested rules

### 2.0.2

* Documentation updates for language support
* Adds lang/es.js
* Support arrays with "in" rule

### 2.0.0

* Added asynchronous validation `registerAsync()` and pass callbacks to `passes(func)` and `fails(func)`.
* Added `array`, `between`, and `required_if` validation rules.
* Removed `Validator.make(..)` use `new Validator(..)` instead.
* Fixed `integer` rule not allowing unsigned integers.
* Fixed attempting to validate non-required rules when there's nothing to validate.
* Fixed numeric comparison rules where value is a string: `size`, `min`, `max`.
* Fixed error messages for attributes with names: 'has', 'get', or 'first'.
* Errors must now be accessed by `.errors.get('username')` or `.errors.first('username')` rather than `.errors.username`.
* Only validate when calling `passes()` or `fails()` (should now be called first before accessing `.errors` or `.errorCount`).
* Added ability to format attributes `.setAttributeFormatter(function)` (by default replaces all _[] with spaces.)
* Added ability to set custom attribute names to display in errors `.setAttributeNames()`.
* Added ability to switch language `useLang()` and customise/add new languages `setMessages()`.
* Added `getMessages(<lang>)` to get the raw messages for given language.
* Added `getDefaultLang()` to return the default language that is being used.
* Use source files in node (no longer uses dist).
* Improved structuring of library, use Browserify, switch to mocha for testing.

### 1.3.0

* Adds regex pattern rules
* Adds alternative array syntax (instead of pipe) for declaring validation rules

### 1.2.1

* email validation rule now supports emails with a dot before the @ symbol, like john.doe@gmail.com

### 1.2.0

#### API additions

* Adds Validator.make() as an alias to new Validator()
* Adds .all() method on validation errors object
* Adds .has() method on validation errors object

#### Tooling changes

* Broke up library into smaller files that get combined during build
* Replaces jasmine-node with Karma and Grunt watch for testing
* Adds Istanbul for test coverage reporting


### 1.1.0

* Adds language support
* Updates travis config file to use Node 0.10 instead of 0.8
