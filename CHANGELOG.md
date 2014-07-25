### Current

* digits:value validation rule and custom error message
* karma-growl-notifications-reporter. Install terminal-notifier if you dont have growl
* Support for AMD/Require.js
* Updates bower.json file

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
