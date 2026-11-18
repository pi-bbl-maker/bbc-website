export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^React$" }],
      "no-undef": "off"
    }
  }
];
