# Pull Request Details

We welcome pull requests for this project as we strive to make this a complete solution for all! When submitting a pull request, please make sure to provide the following:

#### Reason For Pull Request

- [ ] Bug Fix
- [ ] Feature

#### Issue Summary

_Please provide as much information as possible to make clear what issue you are addressing_

#### Details

_Please include full executable code in native JavaScript (please no TypeScript so that we can easily integrate into existing code_

```js
const Validator = require("validatorjs");
const validation = new Validator(data, rules);
let result = validation.passes();
```

#### Test

Provide one of the following

1. new test (located in the `spec` directory) _we use mocha for this project_
2. new test (located in the `spec` directory)
