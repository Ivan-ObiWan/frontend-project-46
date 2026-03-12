import globals from 'globals';

export default [
  {
    ignores: [
      'coverage/**',
      'node_modules/**',
      'dist/**',
      '**/*.json'
    ]
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2021
      }
    },
    rules: {
      'no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }]
    }
  }
];
