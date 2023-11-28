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
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "vue/component-definition-name-casing": "off"
  }
};
