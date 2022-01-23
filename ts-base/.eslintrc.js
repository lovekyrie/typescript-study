module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended"], //this is optional
  rules: {
    "prefer-const": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-empty-function": 0,
  },
};
