const { resolve } = require("node:path")

const project = resolve(process.cwd(), "tsconfig.json")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint-config-turbo",
    "prettier",
  ],
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  plugins: ["@typescript-eslint", "turbo"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    semi: ["error", "never"],
  },
}
