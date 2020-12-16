# validatorjs Changelog

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Version 3.3.0] -- 2020.12.16

### Added

Over 20 new validators have been added, bringing it close to complete parity with Laravel 8 Validators.

#### Rules

- Added `bail` rule which can be used to stop further process of errors after first failure
- Added `boolean` rule which will test if field under test is boolean
- Added `email` rule which will test if field under test is a valid email address
- Added `ends_with` rule which will test if field under test ends with string
- Added `exclude_if` rule which will exclude field under test if condition is met
- Added `exclude_unless` rule which will exclude field under test unless test condition is met
- Added `filled` rule which will ensure field under test is filled if supplied
- Added `greater_than` rule which will test if field under test is greater than condition
- Added `gt` rule is alias for `greater_than` and is less verbose
- Added `greater_than_or_equal` rule which will test if field under test is greater than or equal to condition
- Added `gte` rule is alias for `greater_than_or_equal` and is less verbose
- Added `in_array` rule which will field under test is in supplied array
- Added `ip_address` rule will test if field under test is a valid ip address (supports IP4 and IP6)
- Added `json` rule which will test if field under test is valid json
- Added `less_than` rule which will test if field under test is less than condition
- Added `lt` rule is alias for `less_than` and is less verbose
- Added `less_than_or_equal` rule which will test if field under test is less than or equal to condition
- Added `lte` rule is alias to `less_than_or_equal` and is less verbose
- Added `present` rule will test if field under test is present
- Added `regex` rule to test if field under test meets supplied regex pattern
- Added `not_regex` rule to test if field under test does not meet supplied regex pattern
- Added `sometimes` rule which determines if field under test meets a condition only if present
- Added `starts_with` rule which determines is field under test starts with condition
- Added `uuid` rule which determines is field under test is valid UUID (v1 and v4)

#### Success Object (like Errors but for Success)

- Added `successes` object which can be used to get all information about passing rules

Example using `successes` validator object

```js
let validation = new Validator(input, rules);
validation.successes.all(); // returns all passing validation rules
validation.successes.fields(); // returns all fields which pass validation
validation.successes.keys(); // returns all keys which pass validation (alias to `fields` method)
validation.successes.first("email"); // returns first success message for email attribute
validator.successes.get("email"); // returns an array of success messages for the email attribute
validator.successes.has("email"); // returns true if success has `email` otherwise returns false
validator.successes.successCount(); // returns number of success rules
```

### Fixed

- Fixed email validation, returning false when email ends with period (eg "mike.erickson.@codedungeon.io" should fail)
  https://github.com/mikeerickson/validatorjs/issues/393

- Added support for `localhost` pattern matching
  https://github.com/mikeerickson/validatorjs/issues/284

- Fixed URL edge case
  https://github.com/mikeerickson/validatorjs/issues/399

- Added support for multiple values when using `required_if` rule
  https://github.com/mikeerickson/validatorjs/issues/361

### Changes

https://github.com/mikeerickson/validatorjs/issues/271

- Updated documentation to clairfy custom validation rule use of `req` parameter

## [Version: 3.22] -- 2020.12.03

### Fixed

https://github.com/skaterdav85/validatorjs/pull/383

- Updated langage `en` and `ja` to differentiate `numeric` and `string` for between message
- Updated tests to reflect these changes and add separate tests for `numeric` and `string`

https://github.com/skaterdav85/validatorjs/pull/394

- Updated README to call missing `validation.passes();` method before accession errors

## [Version 3.20.0] -- 2020.09.26

### Fixed

Fixed issues reporting parseISO and isValid not being imported (refactored code to remove date-fns dependency)

## [Version 3.19.1] -- 2020.08.24

### Fixed

https://github.com/skaterdav85/validatorjs/issues/381

## [Version 3.19] -- 2020.08.14

### Added

### Fixed

Issues

- Added `hex` attribute language files which were missing
  https://github.com/skaterdav85/validatorjs/pull/240

[Version 3.18.1] -- 2019.11.27

## Fixed

- Fixed `date-fns` dependency regression (https://github.com/skaterdav85/validatorjs/issues/350)

[Version 3.18] -- 2019.11.24

## Changed

- Reduceds bundle size requiring date-fns functions (parseISO and isValid) instead of whole date-fns library
- Updated to use date-fns 2.1
- Preparing for rollup / webpack bundling

[Version 3.17.1] -- 2019-09.05

## Changed

- Data validation (isValidDate)
- Added tests to support date validation

## Removed

[Version 3.16.0] - 2019.09.04

## Added

- Added Swedish `se` language
- Updated language files missing `attributes` key

## Changed

Issues
https://github.com/skaterdav85/validatorjs/issues/328
https://github.com/skaterdav85/validatorjs/issues/335
https://github.com/skaterdav85/validatorjs/issues/339

https://github.com/skaterdav85/validatorjs/pull/268
https://github.com/skaterdav85/validatorjs/pull/278
https://github.com/skaterdav85/validatorjs/pull/293
https://github.com/skaterdav85/validatorjs/pull/312
https://github.com/skaterdav85/validatorjs/pull/330
https://github.com/skaterdav85/validatorjs/pull/329
https://github.com/skaterdav85/validatorjs/pull/341
https://github.com/skaterdav85/validatorjs/pull/316

## References

[keep a changelog](https://keepachangelog.com/en/1.0.0/)
