module.exports = {
    env: {
        es2021: true,
        node: true
    },
    overrides: [
        {
            files: ['.eslintrc.{js,cjs}', 'eslint.config.{js,cjs}'],
            extends: ['prettier'],
            env: {
                node: true
            },
            parserOptions: {
                sourceType: 'script'
            }
        },
        {
            files: ['packages/docker-config-tool-js/src/**/*.js', 'packages/docker-config-tool-js/src/**/*.ts'],
            extends: ['plugin:@typescript-eslint/recommended', 'love', 'prettier']
        },
        {
            files: ['packages/docker-config-tool-js/tests/**/*'],
            extends: ['plugin:@typescript-eslint/recommended', 'love', 'prettier'],
            env: {
                jest: true
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-sequences': ['error', { allowInParentheses: true }],
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }]
    }
}
