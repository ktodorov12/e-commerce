import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Unit-test config lives with the frontend package because that's where the
 * test toolchain (vitest, Testing Library, jsdom) is installed — pnpm's
 * isolated node_modules can't resolve them from a sibling `tests/` package.
 * End-to-end (Playwright) config stays in `tests/`.
 */
const frontendSrc = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': frontendSrc,
    },
  },
  // Vitest 4 runs on rolldown-vite (oxc, not esbuild). The frontend tsconfig
  // sets `jsx: preserve` for Next, so JSX must be transformed here explicitly
  // with React 19's automatic runtime — no Babel-based React plugin needed.
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'react',
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
});
