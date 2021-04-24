# validatorjs

<h1 align="center">
    <img src="docs/images/validator1.png" width="10%" height="10%" alt="validatorjs">
</h1>

## Overview

The validatorjs library makes data validation in JavaScript very easy in both the browser and NodeJS.

## Quick Start

### Install `validatorjs`

👉 [ValidatorJS Installation](https://validatorjs-docs.netlify.app/installation/#module-system)

Using npm

```bash
npm install validatorjs
```

Using yarn

```js
yarn add validatorjs
```

### Add to your script

👉 [ValidatorJS Signature](https://validatorjs-docs.netlify.app/usage/#constructor-signature)

```js
const Validator = require("validatorjs");
const validation = new Validator(data, rules);
```

or ES6

```js
import * as Validator from 'validatorjs`
const validation = new Validator(data, rules)
```

### Invoke Validator

👉 [Invoking ValidatorJS](https://validatorjs-docs.netlify.app/usage/#invoking-validator)

```js
const result = valdation.passes();
```

## Documentation

📝 [ValidatorJS Documentation](https://validatorjs-docs.netlify.app/)

## License

Copyright &copy; 2012-2018 David Tang,
Copyright &copy; 2018-2021 Mike Erickson
Released under the MIT license

## Credits

validatorjs concept and original release by David Tang
validatorjs maintained by Mike Erickson and Contributors

E-Mail: [mike.erickson@codedungeon.io](mailto:mike.erickson@codedungeon.io)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](http://codedungeon.io)
