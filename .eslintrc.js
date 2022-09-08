module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'react-app',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'curly': 'warn',
    'quotes': ["warn", 'single'],
    'semi': ['warn', 'never']
  }
}
