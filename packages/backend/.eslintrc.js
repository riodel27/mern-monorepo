module.exports = {
  env: {
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "should|expect",
      },
    ],
  },
};
