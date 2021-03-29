// const OFF = 0;
// const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  parser: '',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.js', '.json'],
      },
      webpack: {
        config: './scripts/webpack.common.js',
      },
    },
  },
  plugins: ['react', 'unicorn', 'promise', 'import'],
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        jsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': [0],
  },
};
