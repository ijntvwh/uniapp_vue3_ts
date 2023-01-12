// ESlint 检查配置
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    uni: true,
    UniApp: true,
    wx: true,
  },
  rules: {
    'vue/multi-word-component-names': 1,
    'no-unused-vars': [1, { args: 'after-used', argsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-ts-comment': 1,
  },
}
