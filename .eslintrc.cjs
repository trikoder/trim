/* eslint-disable import/no-commonjs */
module.exports = {
    root: true,
    env: {
        browser: true,
        mocha: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'standard'
    ],
    plugins: [
        'vue',
        'node',
        'import'
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['trim', './src/js'],
                    ['apiServer', './server/client.js']
                ]
            }
        }
    },
    rules: {
        'import/no-commonjs': 'error',
        'import/no-unresolved': 'error',
        'vue/no-deprecated-events-api': 'warn',
        'vue/multi-word-component-names': 'off',
        'node/file-extension-in-import': ['error', 'always'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'padded-blocks': 'off',
        'no-mixed-operators': 'off',
        indent: ['error', 4, {SwitchCase: 1}],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['error', {args: 'none'}],
        'array-bracket-spacing': 'error',
        'block-spacing': 'error',
        'brace-style': ['error', '1tbs', {allowSingleLine: true}],
        camelcase: 'error',
        'comma-spacing': 'error',
        'computed-property-spacing': 'error',
        curly: 'error',
        'eol-last': 'error',
        eqeqeq: 'error',
        'func-call-spacing': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'max-depth': ['error', 5],
        'max-nested-callbacks': ['error', 4],
        'new-cap': ['error', {capIsNew: false, newIsCapExceptions: ['default']}],
        'no-multiple-empty-lines': ['error', {max: 1}],
        'no-extra-bind': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-spacing': ['error', 'never'],
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': ['error'],
        'vue/no-use-v-if-with-v-for': 'off',
        'wrap-iife': 'error'
    }
};
