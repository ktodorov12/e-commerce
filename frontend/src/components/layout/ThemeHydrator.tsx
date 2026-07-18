'use client';

import { useEffect } from 'react';

import { themeStore } from '@/stores/themeStore';

/**
 * Syncs the stored appearance preference into the store once per app
 * load (module-level guard, mirroring CartHydrator). SSR and the first
 * client render both show the System default so the menu's switch
 * hydrates cleanly; the real preference lands here right after mount.
 */
let hydrationStarted = false;

export const ThemeHydrator = () => {
  useEffect(() => {
    if (hydrationStarted) return;
    hydrationStarted = true;
    themeStore.getState().hydratePreference();
  }, []);

  return null;
};
