module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    es2021: true,
  },
  globals: {
    // Jest Global Methods
    test: true,
    expect: true,
    describe: true,
    it: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-proto': 'off',
    'max-len': ['error', { code: 120 }],
    'import/extensions': ['error', {
      ts: 'never',
    }],
    'import/no-unresolved': 'off',
  },
};
