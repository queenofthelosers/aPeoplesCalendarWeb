module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
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
    "react/destructuring-assignment": [1, 'always'],
    "import/prefer-default-export": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    "react/jsx-filename-extension":
      [1, { "extensions": [".tsx", ".ts"] }],
    "react/no-unescaped-entities": 0,
    "no-plusplus": 0,
    "no-use-before-define": 0,
    "no-return-assign": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    
  },
};
