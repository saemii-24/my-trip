import * as prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(['next/core-web-vitals', 'next/typescript']),
  {
    plugins: {
      prettier: prettier.default || prettier, // Import 방식에 따라 선택
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          useTabs: false,
        },
      ],
    },
  },
  t,
];
