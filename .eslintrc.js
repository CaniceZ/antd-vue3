module.exports = {
  root: true,
  env: {
    node: true, // Node.js 全局变量和 Node.js 作用域
    browser: true, // 浏览器全局变量
    es6: true // 启用 ES6 语法支持 及 新的 ES6 全局变量
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 这一块待整理
    eqeqeq: [2, 'always'], //必须使用 === 或者 !==
    'vue/no-template-key': 'off',
    'no-return-await': 0,
    'prettier/prettier': [
      'warn',
      {
        semi: false, // 是否分号结尾
        singleQuote: true, // 使用单引号
        endOfLine: 'auto' // 换行cr检查
      }
    ],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/no-template-key': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^h$',
    //     varsIgnorePattern: '^h$'
    //   }
    // ],
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    quotes: ['error', 'single'],
    // 'comma-dangle': ['error', 'never'],
    'vue/no-v-html': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
