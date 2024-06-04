module.exports = {
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    embeddedLanguageFormatting: 'auto',
    singleAttributePerLine: false,
    plugins: ['prettier-plugin-sh'],
    overrides: [
        {
            files: ['*.sh', 'git-config', '.editorconfig', 'Dockerfile', 'Dockerfile.*']
        }
    ]
}
