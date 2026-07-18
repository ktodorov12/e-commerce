import { assign, enqueueActions, fromPromise, setup } from 'xstate';
import type { Cart } from '@exclusive-wear/shopify';

import type { CartMutationInput } from '@/types/cart';
import {
  CartDrawerState,
  CartEventType,
  CartMutationKind,
  CartSyncState,
  MachineId,
} from '@/types/machines';

/**
 * Cart interaction state (XState) — what is clicked and what is in flight:
 * the drawer lifecycle, the add/update/remove flow, the checkout handoff.
 * Domain data (the cart itself) lives in the zustand cart store; this
 * machine commits to it through the provided `commitCart` action.
 *
 * The machine is pure: `syncCart` (the server call) and `commitCart` are
 * provided where the actor is created (machines/cartMachineContext.tsx)
 * and stubbed in tests.
 */

export type CartMachineEvent =
  | { readonly type: CartEventType.OpenDrawer }
  | { readonly type: CartEventType.CloseDrawer }
  | { readonly type: CartEventType.ToggleDrawer }
  | {
      readonly type: CartEventType.AddLines;
      readonly merchandiseId: string;
      readonly quantity: number;
    }
  | { readonly type: CartEventType.UpdateLine; readonly lineId: string; readonly quantity: number }
  | { readonly type: CartEventType.RemoveLine; readonly lineId: string }
  | { readonly type: CartEventType.BeginCheckout; readonly checkoutUrl: string };

export interface CartMachineContext {
  /** The mutation currently in flight (also drives per-line busy states). */
  readonly pending: CartMutationInput | null;
  readonly errorMessage: string | null;
}

type CartMutationEvent = Extract<
  CartMachineEvent,
  {
    readonly type:
      | CartEventType.AddLines
      | CartEventType.UpdateLine
      | CartEventType.RemoveLine;
  }
>;

const mutationInputFromEvent = (event: CartMutationEvent): CartMutationInput => {
  switch (event.type) {
    case CartEventType.AddLines:
      return {
        kind: CartMutationKind.AddLines,
        merchandiseId: event.merchandiseId,
        quantity: event.quantity,
      };
    case CartEventType.UpdateLine:
      return { kind: CartMutationKind.UpdateLine, lineId: event.lineId, quantity: event.quantity };
    case CartEventType.RemoveLine:
      return { kind: CartMutationKind.RemoveLine, lineId: event.lineId };
  }
};

const errorMessageFrom = (error: unknown): string =>
  error instanceof Error ? error.message : 'Cart update failed';

export const cartMachine = setup({
  types: {
    context: {} as CartMachineContext,
    events: {} as CartMachineEvent,
  },
  actors: {
    syncCart: fromPromise<Cart, CartMutationInput>(() => {
      throw new Error('cartMachine: provide the syncCart actor (machine.provide)');
    }),
  },
  actions: {
    commitCart: (_args, _params: { readonly cart: Cart }) => {
      throw new Error('cartMachine: provide the commitCart action (machine.provide)');
    },
    redirectToCheckout: (_args, params: { readonly url: string }) => {
      window.location.assign(params.url);
    },
  },
}).createMachine({
  id: MachineId.Cart,
  type: 'parallel',
  context: { pending: null, errorMessage: null },
  states: {
    drawer: {
      initial: CartDrawerState.Closed,
      states: {
        [CartDrawerState.Closed]: {
          on: {
            [CartEventType.OpenDrawer]: { target: CartDrawerState.Open },
            [CartEventType.ToggleDrawer]: { target: CartDrawerState.Open },
          },
        },
        [CartDrawerState.Open]: {
          on: {
            [CartEventType.CloseDrawer]: { target: CartDrawerState.Closed },
            [CartEventType.ToggleDrawer]: { target: CartDrawerState.Closed },
          },
        },
      },
    },
    sync: {
      initial: CartSyncState.Idle,
      states: {
        [CartSyncState.Idle]: {
          on: {
            [CartEventType.AddLines]: {
              target: CartSyncState.Mutating,
              actions: assign({
                pending: ({ event }) => mutationInputFromEvent(event),
                errorMessage: null,
              }),
            },
            [CartEventType.UpdateLine]: {
              target: CartSyncState.Mutating,
              actions: assign({
                pending: ({ event }) => mutationInputFromEvent(event),
                errorMessage: null,
              }),
            },
            [CartEventType.RemoveLine]: {
              target: CartSyncState.Mutating,
              actions: assign({
                pending: ({ event }) => mutationInputFromEvent(event),
                errorMessage: null,
              }),
            },
            [CartEventType.BeginCheckout]: {
              target: CartSyncState.Redirecting,
              actions: {
                type: 'redirectToCheckout',
                params: ({ event }) => ({ url: event.checkoutUrl }),
              },
            },
          },
        },
        [CartSyncState.Mutating]: {
          invoke: {
            src: 'syncCart',
            input: ({ context }) => {
              if (context.pending === null) {
                throw new Error('cartMachine: entered Mutating without a pending mutation');
              }
              return context.pending;
            },
            onDone: {
              target: CartSyncState.Idle,
              actions: enqueueActions(({ context, enqueue, event }) => {
                enqueue({ type: 'commitCart', params: { cart: event.output } });
                if (context.pending?.kind === CartMutationKind.AddLines) {
                  enqueue.raise({ type: CartEventType.OpenDrawer });
                }
                enqueue.assign({ pending: null });
              }),
            },
            onError: {
              target: CartSyncState.Idle,
              actions: assign({
                pending: null,
                errorMessage: ({ event }) => errorMessageFrom(event.error),
              }),
            },
          },
        },
        /** Terminal for this visit — the browser is navigating to Shopify checkout. */
        [CartSyncState.Redirecting]: {},
      },
    },
  },
});
