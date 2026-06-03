import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
            playwright: playwright,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,

            ...playwright.configs.recommended.rules,

            'playwright/no-focused-test': 'error', // Prevent committing .only tests
            'playwright/no-skipped-test': 'warn', // Warn about skipped tests
        },
    },
];
