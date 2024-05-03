/** @type {import("prettier").Config} */

const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  bracketSameLine: true,
  tabWidth: 2,
  printWidth: 120,
  tailwindFunctions: ["cn"],
};

export default config;
