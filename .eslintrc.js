module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-empty": "off",
    indent: ["error", 2],
    // quotes: ['error', 'single'],
    semi: ["error", "always"],
    "no-useless-escape": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-control-regex": "off",
    "no-console": [
      "error",
      {
        allow: ["log"],
      },
    ],
  },
};
