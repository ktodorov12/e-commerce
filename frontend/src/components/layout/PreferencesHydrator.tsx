'use client';

import { useEffect } from 'react';

import { currencyStore } from '@/stores/currencyStore';
import { themeStore } from '@/stores/themeStore';

/**
 * Syncs stored UI preferences (appearance, currency) into their stores
 * once per app load (module-level guard, mirroring CartHydrator). SSR
 * and the first client render both show the defaults so the menu's
 * switches hydrate cleanly; the real preferences land here right after
 * mount. The painted theme never waits for this — theme-init.js applies
 * it pre-paint.
 */
let hydrationStarted = false;

export const PreferencesHydrator = () => {
  useEffect(() => {
    if (hydrationStarted) return;
    hydrationStarted = true;
    themeStore.getState().hydratePreference();
    currencyStore.getState().hydratePreference();
  }, []);

  return null;
};
