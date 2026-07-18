import { createStore } from 'zustand/vanilla';

import { createStoreHook } from '@/stores/createStoreHook';
import type { SliceCreator } from '@/stores/createStoreHook';
import { DataAttribute, StorageKey } from '@/types/keys';
import { ThemeMode } from '@/types/theme';
import type { ResolvedThemeMode } from '@/types/theme';

/**
 * Appearance preference (zustand — a UI preference is domain state).
 * Day/Night follow the design's dual palette; System follows the OS.
 * The inline no-flicker script (components/layout/ThemeScript.tsx) applies
 * the resolved mode before hydration; this store owns changes after that.
 */

export enum MediaQuery {
  PrefersDark = '(prefers-color-scheme: dark)',
}

const isThemeMode = (value: string | null): value is ThemeMode =>
  value !== null && (Object.values(ThemeMode) as string[]).includes(value);

export const readStoredPreference = (): ThemeMode => {
  try {
    const stored = window.localStorage.getItem(StorageKey.ThemePreference);
    return isThemeMode(stored) ? stored : ThemeMode.System;
  } catch {
    return ThemeMode.System;
  }
};

export const resolveThemeMode = (preference: ThemeMode): ResolvedThemeMode => {
  if (preference !== ThemeMode.System) return preference;
  return window.matchMedia(MediaQuery.PrefersDark).matches ? ThemeMode.Night : ThemeMode.Day;
};

/** 400ms crossfade around a switch (design), disabled for reduced motion. */
const CROSSFADE_MS = 400;
let crossfadeTimer: ReturnType<typeof setTimeout> | null = null;

const applyResolvedTheme = (resolved: ResolvedThemeMode): void => {
  const root = document.documentElement;
  root.setAttribute(DataAttribute.ThemeTransition, '');
  root.setAttribute(DataAttribute.Theme, resolved);
  if (crossfadeTimer !== null) clearTimeout(crossfadeTimer);
  crossfadeTimer = setTimeout(() => {
    root.removeAttribute(DataAttribute.ThemeTransition);
    crossfadeTimer = null;
  }, CROSSFADE_MS);
};

export interface ThemeSlice {
  readonly preference: ThemeMode;
  readonly setPreference: (preference: ThemeMode) => void;
}

export type ThemeStoreState = ThemeSlice;

const initialPreference = (): ThemeMode =>
  typeof window === 'undefined' ? ThemeMode.System : readStoredPreference();

export const createThemeSlice: SliceCreator<ThemeStoreState, ThemeSlice> = (set) => ({
  preference: initialPreference(),
  setPreference: (preference) => {
    set({ preference });
    try {
      window.localStorage.setItem(StorageKey.ThemePreference, preference);
    } catch {
      // private browsing / quota — preference simply won't persist
    }
    applyResolvedTheme(resolveThemeMode(preference));
  },
});

export const themeStore = createStore<ThemeStoreState>()((set, get) => ({
  ...createThemeSlice(set, get),
}));

export const useThemeStore = createStoreHook(themeStore);
