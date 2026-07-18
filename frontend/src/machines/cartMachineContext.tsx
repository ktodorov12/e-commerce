'use client';

import { createActorContext } from '@xstate/react';
import { fromPromise } from 'xstate';
import type { Cart } from '@exclusive-wear/shopify';

import { syncCartAction } from '@/app/actions/cart';
import { cartMachine } from '@/machines/cartMachine';
import { cartStore } from '@/stores/cartStore';
import type { CartMutationInput } from '@/types/cart';

/**
 * The cart machine, wired to the world: the server action performs the
 * mutation, the zustand store receives the committed cart. Components
 * consume this through the small hooks in hooks/useCartMachine.ts only.
 */
export const CartMachineContext = createActorContext(
  cartMachine.provide({
    actors: {
      syncCart: fromPromise<Cart, CartMutationInput>(({ input }) => syncCartAction(input)),
    },
    actions: {
      commitCart: (_args, params: { readonly cart: Cart }) => {
        cartStore.getState().setCart(params.cart);
      },
    },
  }),
);
