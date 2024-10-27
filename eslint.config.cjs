// .eslintrc.cjs
module.exports = {
  ignores: ["**/*.config.js", "**/*.config.cjs", "**/*.config.ts"],
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  plugins: {
    react: require("eslint-plugin-react"),
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "no-console": "warn",
    quotes: ["error", "single"],
    "react/self-closing-comp": "warn",
    "react/no-danger": "warn",
    "no-magic-numbers": ["warn", { ignore: [0, 1] }],
    indent: ["error", 2],
    "max-len": ["warn", { code: 80 }],
    "prefer-const": "warn",
    semi: ["error", "always"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
