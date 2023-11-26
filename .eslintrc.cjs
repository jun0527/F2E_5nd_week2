/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/airbnb"
    // "@vue/eslint-config-prettier/skip-formatting"
    // "plugin:vue/vue3-recommended",
    // "plugin:vue/base",
    // "eslint:recommended",
    // "plugin:tailwindcss/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    // parser: "@typescript-eslint/parser",
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // indent: ["error", "tab"],
    // "linebreak-style": ["error", "unix"],
    // quotes: ["error", "double"],
    // semi: ["error", "always"],
    // "prettier/prettier": ["error", { singleQuote: false }]
    "tailwindcss/no-custom-classname": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "vue/component-definition-name-casing": "off"
  }
};
