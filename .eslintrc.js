module.exports = {
  languageOptions: {
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    globals: {
      node: true,
    },
  },
  files: ['src/scripts/**/*.js'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'require-unicode-regexp': 'off',
    'class-methods-use-this': 'off',
    'implicit-arrow-linebreak': ['error', 'below'],
    'object-curly-spacing': ['error', 'always'],
  },
};
