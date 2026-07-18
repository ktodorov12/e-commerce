'use client';

import { useSyncExternalStore } from 'react';

import { MediaQuery } from '@/stores/themeStore';

/**
 * Live `prefers-reduced-motion` subscription. CSS gates animations on
 * its own; this hook exists for behavior CSS cannot gate (e.g. video
 * autoplay). The server snapshot reports reduced so no moving media is
 * server-rendered — the client upgrades after hydration.
 */
const subscribeToReducedMotion = (onChange: () => void) => {
  const mediaQueryList = window.matchMedia(MediaQuery.PrefersReducedMotion);
  mediaQueryList.addEventListener('change', onChange);
  return () => mediaQueryList.removeEventListener('change', onChange);
};

const readReducedMotion = (): boolean =>
  window.matchMedia(MediaQuery.PrefersReducedMotion).matches;

const readReducedMotionOnServer = (): boolean => true;

export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(subscribeToReducedMotion, readReducedMotion, readReducedMotionOnServer);
