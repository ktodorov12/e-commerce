import { createStore } from 'zustand/vanilla';
import type { Cart, CartLine, Money } from '@exclusive-wear/shopify';

import { createStoreHook } from '@/stores/createStoreHook';
import type { SliceCreator } from '@/stores/createStoreHook';

/**
 * Cart domain state (zustand). Interaction state — what is clicked, what is
 * in flight — lives in the cart machine (machines/cartMachine.ts); this
 * store only holds the data the shop agrees on: the cart Shopify returned.
 *
 * Built slices-first: future domains (e.g. recently-viewed) compose into
 * this store as sibling slices instead of importing each other.
 */

export interface CartSlice {
  readonly cart: Cart | null;
  /** True once the initial cookie-based cart lookup has settled. */
  readonly hydrated: boolean;
  readonly setCart: (cart: Cart | null) => void;
  readonly markHydrated: () => void;
}

export type CartStoreState = CartSlice;

export const createCartSlice: SliceCreator<CartStoreState, CartSlice> = (set) => ({
  cart: null,
  hydrated: false,
  setCart: (cart) => set({ cart }),
  markHydrated: () => set({ hydrated: true }),
});

export const cartStore = createStore<CartStoreState>()((set, get) => ({
  ...createCartSlice(set, get),
}));

export const useCartStore = createStoreHook(cartStore);

/* ── Selectors (pure, reusable — keep components free of shape knowledge) ── */

export const selectTotalQuantity = (state: CartStoreState): number =>
  state.cart?.totalQuantity ?? 0;

const NO_LINES: readonly CartLine[] = [];

export const selectLines = (state: CartStoreState): readonly CartLine[] =>
  state.cart?.lines ?? NO_LINES;

export const selectSubtotal = (state: CartStoreState): Money | null =>
  state.cart?.subtotal ?? null;

export const selectCheckoutUrl = (state: CartStoreState): string | null =>
  state.cart?.checkoutUrl ?? null;

export const selectIsEmpty = (state: CartStoreState): boolean => selectTotalQuantity(state) === 0;
