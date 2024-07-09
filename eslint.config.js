import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      globals: {
        es6: true,
        node: true,
        es2021: true
      },
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.eslint.json"
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin
    },
    rules: {
      "no-console": "off",
      "no-proto": "off",
      "max-len": ["error", { "code": 120 }]
    },
    ignorePatterns: ["dist/*", "node_modules/*"]
  }
];
