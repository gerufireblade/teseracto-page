module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": ["error", { singleQuote: true, trailingComma: "all", semi: true }],
    "no-trailing-spaces": "error",
    "react/react-in-jsx-scope": "off"
  },
  settings: { react: { version: "detect" } }
};