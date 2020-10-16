module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  },
  extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint'
  ],
  rules: {
      'no-var': 'error',
      'no-use-before-define': 'error',
      'no-undef': 'error',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/ban-types': [
          'error',
          {
              extendDefaults: true,
              types: {
                  '{}': false
              }
          }
      ],
      'simple-import-sort/sort': 'error'
  }
}
