module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: 'arrow-function'
      }
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // External packages:
          ['^react', '^@?\\w'],
          // Alias imports:
          [
            '^@(([\\/.]?\\w)|assets|test-utils)',
            '^@hooks?\\w',
            '^@ui?\\w',
            '^@utils?\\w',
            '^@icons?\\w',
            '^@modules?\\w',
            '^@constants?\\w'
          ],
          // Side effect imports:
          ['^\\u0000'],
          // Parent imports:
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports:
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports:
          ['^.+\\.s?css$']
        ]
      }
    ],

    'no-console': ['warn', { allow: ['info', 'error'] }]
  }
};
