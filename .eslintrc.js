module.exports = {
  globals: {
    JSX: true,
  },
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
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "max-len": ["error", 120, 2, {
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreComments: true,
    }],
    "react/destructuring-assignment": [1, 'always'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", "tsx"] }],
    "import/prefer-default-export": 0,
    "linebreak-style": 0,
    "react/no-unescaped-entities": 0,
    "no-use-before-define": [0, { "variables": false }],
    "react-hooks/exhaustive-deps": [0],
    "quotes": [1, "single"],
    "jsx-a11y/click-events-have-key-events": 1,
    "jsx-a11y/no-static-element-interactions": 1,
    "operator-linebreak": 0,
    "import/extensions": [1, {
      '.tsx': 'never',
    }],
    "no-plusplus": 0,
  },
};
