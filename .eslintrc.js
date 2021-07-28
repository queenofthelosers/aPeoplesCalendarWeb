module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "max-len": ["error", 120, 2, {
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreComments: true,
    }],
    "react/destructuring-assignment": [1, 'always'],
    "import/prefer-default-export": 0,
    "linebreak-style": 1,
    "no-use-before-define": [0, { "variables": false }],
    "react-hooks/exhaustive-deps": [0],
    "quotes": [1, "single"]
  },
};
