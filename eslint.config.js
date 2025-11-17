// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'

const reactHooksFlatConfig = {
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: reactHooks.configs.recommended.rules,
}
const reactRefreshFlatConfig = {
  plugins: {
    'react-refresh': reactRefresh,
  },
  rules: reactRefresh.configs.vite.rules,
}

export default defineConfig([
  globalIgnores([
    'dist',
    'node_modules',
    'storybook-static',
    '.storybook',
    'public',
    'coverage',
  ]),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tslint.configs.recommended,
      reactHooksFlatConfig,
      reactRefreshFlatConfig,
      storybook.configs['flat/recommended'],
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
