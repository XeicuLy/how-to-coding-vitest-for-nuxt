// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vueEslintParser from 'vue-eslint-parser';
import { includeIgnoreFile } from '@eslint/compat';
import tsEslintParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import vuePrettierConfig from '@vue/eslint-config-prettier';
import globals from 'globals';
import withNuxt from './.nuxt/eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default withNuxt([
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['.cz-config.cts'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsEslintParser,
        project: path.resolve(__dirname, './tsconfig.json'),
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js組み込みモジュール (node:pathなど)
            'external', // npm外部パッケージ
            'internal', // プロジェクト内モジュール
            'parent', // 親ディレクトリからのインポート
            'sibling', // 同じディレクトリからのインポート
            'index', // インデックスファイルからのインポート
            'object', // オブジェクトインポート
            'type', // 型定義のインポート
          ],
          pathGroups: [
            // Nuxtモジュールを最優先
            {
              pattern: 'nuxt',
              group: 'external',
              position: 'before',
            },
            // Vue関連ライブラリを優先
            {
              pattern: 'vue*',
              group: 'external',
              position: 'before',
            },
            // Composablesを内部モジュールとして扱う
            {
              pattern: '~/composables/**',
              group: 'internal',
              position: 'before',
            },
            // Nuxtのエイリアスパスを内部モジュールとして扱う
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '~/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true, // 大文字小文字を区別しない
          },
          'newlines-between': 'never', // グループ間に空行を入れない
          warnOnUnassignedImports: true, // 副作用のみのインポートに警告
        },
      ],
    },
  },
  {
    files: ['**/__test__/**', '**/__tests__/**', '**/tests/**', '**/test/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
      'vitest/no-conditional-expect': 'error',
      'vitest/no-conditional-in-test': 'error',
      'vitest/no-conditional-tests': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-mock-promise-shorthand': 'error',
      'vitest/require-hook': 'error',
      'vitest/require-to-throw-message': 'error',
      'vitest/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 2 }],
    },
  },
  vuePrettierConfig,
]);
