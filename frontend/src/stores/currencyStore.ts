import { createStore } from 'zustand/vanilla';

import { createStoreHook } from '@/stores/createStoreHook';
import type { SliceCreator } from '@/stores/createStoreHook';
import { CurrencyPreference } from '@/types/i18n';
import { StorageKey } from '@/types/keys';

/**
 * Display-currency preference (zustand — a UI preference is domain
 * state, mirroring themeStore). A preference only for now: prices keep
 * rendering in the store currency until multi-market backends land, and
 * checkout always uses the store currency.
 */

const isCurrencyPreference = (value: string | null): value is CurrencyPreference =>
  value !== null && (Object.values(CurrencyPreference) as string[]).includes(value);

export const readStoredCurrencyPreference = (): CurrencyPreference => {
  try {
    const stored = window.localStorage.getItem(StorageKey.CurrencyPreference);
    return isCurrencyPreference(stored) ? stored : CurrencyPreference.Eur;
  } catch {
    return CurrencyPreference.Eur;
  }
};

export interface CurrencySlice {
  readonly preference: CurrencyPreference;
  readonly hydratePreference: () => void;
  readonly setPreference: (preference: CurrencyPreference) => void;
}

export type CurrencyStoreState = CurrencySlice;

export const createCurrencySlice: SliceCreator<CurrencyStoreState, CurrencySlice> = (set) => ({
  // SSR and the first client render must agree (hydration contract);
  // PreferencesHydrator pulls the stored preference in after mount.
  preference: CurrencyPreference.Eur,
  hydratePreference: () => {
    set({ preference: readStoredCurrencyPreference() });
  },
  setPreference: (preference) => {
    set({ preference });
    try {
      window.localStorage.setItem(StorageKey.CurrencyPreference, preference);
    } catch {
      // private browsing / quota — preference simply won't persist
    }
  },
});

export const currencyStore = createStore<CurrencyStoreState>()((set, get) => ({
  ...createCurrencySlice(set, get),
}));

export const useCurrencyStore = createStoreHook(currencyStore);
