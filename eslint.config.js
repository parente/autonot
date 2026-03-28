import js from '@eslint/js';
import globals from 'globals';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.svelte-kit/**',
      '.tmp-tests/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'package/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: [
      'src/lib/utils/breadcrumb.ts',
      'src/lib/utils/breadcrumb.time.ts',
      'src/lib/utils/breadcrumb.money.ts',
      'src/lib/utils/navigate.ts',
    ],
    rules: {
      // Breadcrumb navigation uses dynamic URLs assembled from user inputs rather than static route ids.
      'svelte/no-navigation-without-resolve': 'off',
    },
  }
);
