import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginReact from 'eslint-plugin-react';

export default defineConfig([
  /**
   * Ignore all non project files
   */
  globalIgnores([
    '**/*',
    '!admin/**',
    '!server/**',
  ]),
  /**
   * External Configs
   *
   * @eslint/js: Recommended
   * @see {@link https://eslint.org/docs/latest/rules/}
   *
   * typescript-eslint: Strict (with Type Checks)
   * typescript-eslint: Stylistic (with Type Checks)
   * @see {@link https://typescript-eslint.io/rules/}
   *
   * @stylistic/eslint-plugin: Custom Style
   * @see {@link https://eslint.style/rules}
   */
  eslint.configs.recommended,
  typescriptEslint.configs.strict,
  typescriptEslint.configs.stylistic,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    arrowParens: true,
    braceStyle: '1tbs',
  }),
  {
    files: ['admin/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['server/**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
    },
  },
]);
