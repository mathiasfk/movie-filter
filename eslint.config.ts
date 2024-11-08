module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['import', 'simple-import-sort', '@typescript-eslint', 'react'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    rules: {
        // Configurações específicas para React e TypeScript
        'react/react-in-jsx-scope': 'off', // Se usa React 17 ou superior (não precisa importar React em todos os arquivos .tsx)
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

        // Regras de importação e organização dos imports
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external', 'internal']],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
    },
    settings: {
        react: {
            version: 'detect', // Detecta a versão do React automaticamente
        },
    },
};
