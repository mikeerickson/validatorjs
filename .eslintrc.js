module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-useless-escape": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-redeclare": "off",
    "no-console": [
      "error",
      {
        allow: ["log"]
      }
    ]
  }
};
