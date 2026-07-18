import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { MediaQuery } from '@/stores/themeStore';
import { DataAttribute, StorageKey } from '@/types/keys';
import { ThemeMode } from '@/types/theme';

/**
 * public/theme-init.js is a static asset (no bundler, so it can't import the
 * enums). This test is the drift guard: every value the script hard-codes must
 * still equal the enum it mirrors, or the pre-hydration script and the app
 * would silently disagree.
 */
// vitest runs with the frontend package as its root, so cwd is frontend/.
const themeInitScript = readFileSync(resolve(process.cwd(), 'public/theme-init.js'), 'utf8');

describe('public/theme-init.js', () => {
  it.each([
    ['storage key', StorageKey.ThemePreference],
    ['day mode', ThemeMode.Day],
    ['night mode', ThemeMode.Night],
    ['prefers-dark query', MediaQuery.PrefersDark],
    ['theme attribute', DataAttribute.Theme],
  ])('mirrors the %s enum value', (_label, value) => {
    expect(themeInitScript).toContain(value);
  });
});
