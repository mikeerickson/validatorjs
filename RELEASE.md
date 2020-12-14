# validatorjs

## [Version 3.3.0] -- 2020.12.12

### Added

Over 25 new validators have been added, bringing it close to complete parity with Laravel 8 Validators.

- Add `bail` rule which can be used to stop further process of errors after first failure

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
