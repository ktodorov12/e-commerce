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
  PrefersReducedMotion = '(prefers-reduced-motion: reduce)',
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

/**
 * The mode currently painted on the page — read from the attribute the
 * pre-paint script (and this store) set on <html>. Client-only; call it from
 * an event handler, where "what is on screen right now" is the truth a toggle
 * needs. Anything that isn't Night reads as Day (the theme-init fallback).
 */
export const readAppliedTheme = (): ResolvedThemeMode => {
  const applied = document.documentElement.getAttribute(DataAttribute.Theme);
  return applied === ThemeMode.Night ? ThemeMode.Night : ThemeMode.Day;
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
  readonly hydratePreference: () => void;
  readonly setPreference: (preference: ThemeMode) => void;
}

export type ThemeStoreState = ThemeSlice;

export const createThemeSlice: SliceCreator<ThemeStoreState, ThemeSlice> = (set) => ({
  // SSR and the first client render must agree (hydration contract), so the
  // store boots on System everywhere; ThemeHydrator pulls the stored
  // preference in after mount. The *painted* theme never waits for this —
  // theme-init.js applies it pre-paint from the same storage key.
  preference: ThemeMode.System,
  hydratePreference: () => {
    set({ preference: readStoredPreference() });
  },
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
