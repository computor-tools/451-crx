module.exports = {
    env: {
        browser: true,
        es2021: true,
        webextensions: true,
    },
    extends: ['eslint:recommended', 'plugin:solid/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs,jsx}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {},
};
