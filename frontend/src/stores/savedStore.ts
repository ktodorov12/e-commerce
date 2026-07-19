import { isShopifyHandle } from '@exclusive-wear/shopify';
import { createStore } from 'zustand/vanilla';

import { createStoreHook } from '@/stores/createStoreHook';
import type { SliceCreator } from '@/stores/createStoreHook';
import { StorageKey } from '@/types/keys';

/**
 * Saved pieces (the grid's heart button, the Saved page) — domain state in
 * zustand, persisted per device under a versioned localStorage key. SSR and
 * the first client render show an empty list (hydration contract);
 * PreferencesHydrator pulls the stored handles in after mount.
 */

const readStoredSavedHandles = (): readonly string[] => {
  try {
    const storedJson = window.localStorage.getItem(StorageKey.SavedProducts);
    if (storedJson === null) return [];
    const parsed: unknown = JSON.parse(storedJson);
    if (!Array.isArray(parsed)) return [];
    // Stored data is client-writable — keep only values shaped like handles.
    return parsed.filter(
      (entry): entry is string => typeof entry === 'string' && isShopifyHandle(entry),
    );
  } catch {
    return [];
  }
};

const persistSavedHandles = (handles: readonly string[]): void => {
  try {
    window.localStorage.setItem(StorageKey.SavedProducts, JSON.stringify(handles));
  } catch {
    // private browsing / quota — saved pieces simply won't persist
  }
};

export interface SavedSlice {
  readonly savedProductHandles: readonly string[];
  readonly hydrateSaved: () => void;
  readonly toggleSaved: (productHandle: string) => void;
}

export type SavedStoreState = SavedSlice;

export const createSavedSlice: SliceCreator<SavedStoreState, SavedSlice> = (set, get) => ({
  savedProductHandles: [],
  hydrateSaved: () => {
    set({ savedProductHandles: readStoredSavedHandles() });
  },
  toggleSaved: (productHandle) => {
    const current = get().savedProductHandles;
    const next = current.includes(productHandle)
      ? current.filter((handle) => handle !== productHandle)
      : [...current, productHandle];
    set({ savedProductHandles: next });
    persistSavedHandles(next);
  },
});

export const savedStore = createStore<SavedStoreState>()((set, get) => ({
  ...createSavedSlice(set, get),
}));

export const useSavedStore = createStoreHook(savedStore);
