import uniHelper from '@uni-helper/eslint-config'

// 查看规则 npx @eslint/config-inspector@latest
export default uniHelper({
  unocss: true,
  vue: true,
  markdown: false,
  ignores: [
    'src/uni_modules/',
    'dist',
    'generated',
    'auto-import.d.ts',
    // vite-plugin-uni-pages 生成的类型文件，每次切换分支都一堆不同的，所以直接 .gitignore
    'uni-pages.d.ts',
    'src/pages.json',
    'src/manifest.json',
    // 'src/service/**',
  ],
  // https://eslint-config.antfu.me/rules
  rules: {
    'no-useless-return': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'ts/ban-ts-comment': 0,
    'ts/no-empty-object-type': 0,
    'antfu/if-newline': 0,
    'unused-imports/no-unused-vars': 1,
    'eslint-comments/no-unlimited-disable': 0,
    'jsdoc/check-param-names': 0,
    'jsdoc/require-returns-description': 0,
    'style/arrow-parens': [2, 'as-needed'],
    'style/quote-props': [2, 'as-needed'],
    'style/brace-style': [2, '1tbs', { allowSingleLine: true }],
    'style/operator-linebreak': [2, 'before', { overrides: { '=': 'after' } }],
    'style/member-delimiter-style': [
      2,
      {
        multiline: { delimiter: 'none', requireLast: false },
        multilineDetection: 'brackets',
        overrides: { interface: { multiline: { delimiter: 'none', requireLast: false } } },
        singleline: { delimiter: 'semi' },
      },
    ],
    'vue/no-unused-refs': 0,
    'vue/singleline-html-element-content-newline': 0,
    // vue SFC 调换顺序改这里
    'vue/block-order': [2, { order: [['script', 'template'], 'style'] }],
  },
  formatters: { css: true, html: true },
})
