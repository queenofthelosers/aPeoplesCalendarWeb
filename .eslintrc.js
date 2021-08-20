module.exports = {
  globals: {
    JSX: true,
  },
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {},
    },
  },
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
    "react/destructuring-assignment": [0, 'always'],
    "react/jsx-filename-extension": [0, { extensions: [".js", "tsx"] }],
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "linebreak-style": 0,
    "react/no-unescaped-entities": 0,
    "no-use-before-define": [0, { variables: false }],
    "react-hooks/exhaustive-deps": [0],
    quotes: [0, "single"],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "operator-linebreak": 0,
    "import/extensions": [0, {
      '.tsx': 'never',
    }],
    "no-plusplus": 0,
    "arrow-body-style": 0,
    "no-alert": 0,
    "react/jsx-boolean-value": 0,
    "react/no-unused-prop-types": 0,
  },
};
