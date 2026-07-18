import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Globals are off, so Testing Library's auto-cleanup is wired explicitly:
// unmount every render between specs to keep the jsdom tree isolated.
afterEach(() => {
  cleanup();
});
