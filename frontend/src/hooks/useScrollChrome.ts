'use client';

import { useSyncExternalStore } from 'react';

/**
 * Scroll-driven visibility for the top bar. The bar exists only at the
 * very top of the page — once you move, the fixed bottom dock is the
 * navigation. Snapshot-based (the boolean flips only at the threshold),
 * so scrolling stays re-render-quiet.
 */

/** Within this distance of the top the page counts as "at the top". */
const TOP_EDGE_PX = 40;

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};

const readTopBarHidden = (): boolean => window.scrollY > TOP_EDGE_PX;

const readTopBarHiddenOnServer = (): boolean => false;

export const useTopBarHidden = (): boolean =>
  useSyncExternalStore(subscribeToScroll, readTopBarHidden, readTopBarHiddenOnServer);
