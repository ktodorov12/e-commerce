'use client';

import { useEffect } from 'react';

import { currencyStore } from '@/stores/currencyStore';
import { savedStore } from '@/stores/savedStore';
import { themeStore } from '@/stores/themeStore';

/**
 * Syncs client-persisted state (appearance, currency, saved pieces) into
 * its stores once per app load (module-level guard, mirroring CartHydrator).
 * SSR and the first client render both show the defaults so everything
 * hydrates cleanly; the real values land here right after mount. The
 * painted theme never waits for this — theme-init.js applies it pre-paint.
 */
let hydrationStarted = false;

export const PreferencesHydrator = () => {
  useEffect(() => {
    if (hydrationStarted) return;
    hydrationStarted = true;
    themeStore.getState().hydratePreference();
    currencyStore.getState().hydratePreference();
    savedStore.getState().hydrateSaved();
  }, []);

  return null;
};
