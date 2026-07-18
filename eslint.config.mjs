import * as espree from 'espree';
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';

/**
 * Flat config (ESLint 9) for the whole pnpm workspace, run from the root as
 * `eslint .`. Next's config carries the React / React-Hooks / a11y / core-web-
 * vitals + TypeScript rules; `eslint-config-prettier` is last so formatting is
 * owned entirely by Prettier, never by lint rules.
 *
 * NB: ESLint is pinned to 9.x — 10.x is not yet supported by the bundled
 * typescript-eslint (its scope-manager lacks the API 10 expects). See README.
 */
const config = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/out/**',
      '**/coverage/**',
      '**/*.tsbuildinfo',
      'shopify/src/generated/**',
      'tests/test-results/**',
      'tests/playwright-report/**',
      // Vendored design-system export — not our code to lint.
      'design/**',
    ],
  },
  ...next,
  {
    settings: {
      // The Next app lives in frontend/, not the workspace root.
      next: { rootDir: 'frontend' },
      // React is a frontend dep; pin the major so root-level linting doesn't
      // warn that it can't auto-detect the version from the workspace root.
      react: { version: '19' },
    },
    rules: {
      // Obsolete under the App Router: there is no `pages/_document.js`;
      // `next/script` with `beforeInteractive` belongs in `app/layout.tsx`
      // (see components/layout/ThemeScript.tsx — the pre-paint theme script).
      '@next/next/no-before-interactive-script-outside-document': 'off',
    },
  },
  {
    // eslint-config-next routes every non-TS file through @babel/eslint-parser
    // with the 'next/babel' preset, which only resolves from frontend/. An
    // editor linting a plain .mjs config from the workspace root then fails with
    // "Cannot find module 'next/babel'". These files have no JSX, so parse them
    // with ESLint's default parser (espree) and drop the Babel path entirely.
    files: ['**/*.mjs'],
    languageOptions: {
      parser: espree,
      sourceType: 'module',
      ecmaVersion: 'latest',
      // Drop the inherited 'next/babel' preset entirely (espree ignores it, but
      // this keeps the resolved config free of any next/babel reference).
      parserOptions: { babelOptions: { presets: [] } },
    },
  },
  prettier,
];

export default config;
