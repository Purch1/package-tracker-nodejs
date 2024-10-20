module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'node',
    'import',
    'promise',
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'eqeqeq': ['error', 'always'],
    'semi': ['error', 'always'],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'always',  
        json: 'always', 
      },
    ],
  },
};
