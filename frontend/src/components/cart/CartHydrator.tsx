'use client';

import { useEffect } from 'react';

import { fetchCartAction } from '@/app/actions/cart';
import { cartStore } from '@/stores/cartStore';

/**
 * Loads the cookie-referenced cart once per app load (module-level guard —
 * effects can re-run on remount, app init must not). Renders nothing;
 * the header badge and drawer read from the store.
 */
let hydrationStarted = false;

export const CartHydrator = () => {
  useEffect(() => {
    if (hydrationStarted) return;
    hydrationStarted = true;

    void fetchCartAction()
      .then((cart) => {
        const { setCart, markHydrated } = cartStore.getState();
        if (cart !== null) setCart(cart);
        markHydrated();
      })
      .catch(() => {
        cartStore.getState().markHydrated();
      });
  }, []);

  return null;
};
