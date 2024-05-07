const tsOverride = {
    extends: ['plugin:@typescript-eslint/recommended', 'love', 'prettier'],
    rules: {
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: true
            }
        ]
    }
}

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
            ...tsOverride,
            files: ['packages/docker-config-tool-js/src/**/__tests__/**/*.ts'],
            env: {
                jest: true
            }
        },
        {
            ...tsOverride,
            files: ['packages/docker-config-tool-js/src/**/*.js', 'packages/docker-config-tool-js/src/**/*.ts']
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-sequences': ['error', { allowInParentheses: true }]
    }
}
