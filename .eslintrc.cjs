/* eslint-env node */

/** @type { import("eslint").Linter.Config } */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "tailwind.config.ts", "vite.config.ts"],
  plugins: ["@typescript-eslint", "react", "react-hooks", "react-refresh"],
  parser: "@typescript-eslint/parser",
};
