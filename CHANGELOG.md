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
