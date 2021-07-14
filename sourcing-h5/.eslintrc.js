module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'no-use-before-define': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', 'ts', 'tsx'],
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': ['error', 'as-needed'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/', '^umi/', 'components', 'utils', 'config', 'api', 'services', 'pages'],
      },
    ],
    'max-len': ['error', { code: 180 }],
    'max-lines': ['error', 300],
    // 'max-lines-per-function': ['error', 300], // 单个函数行数
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'react/jsx-curly-spacing': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'no-unused-expressions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'react/require-default-props': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
  },
  globals: {
    ENV: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
