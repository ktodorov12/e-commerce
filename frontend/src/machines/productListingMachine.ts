import { assign, fromPromise, setup } from 'xstate';
import type { ProductListPage } from '@exclusive-wear/shopify';

import type { ProductListingQuery } from '@/types/catalog';
import { MachineId, ProductListingEventType, ProductListingState } from '@/types/machines';

/**
 * Listing pagination (infinite scroll) — what is in flight, not the fetched
 * data's cross-page identity: the growing item list lives here in context
 * (unlike the cart, nothing else in the app reads "the current filtered
 * listing", so there is no case for a zustand store — see CLAUDE.md → State).
 * The actual fetch is provided at the context boundary
 * (machines/productListingMachineContext.tsx) and stubbed here.
 */

export type ProductListingMachineEvent = { readonly type: ProductListingEventType.LoadMore };

export interface ProductListingLoadMoreInput {
  readonly cursor: string;
  readonly query: ProductListingQuery;
}

export interface ProductListingMachineContext {
  readonly items: ProductListPage['items'];
  readonly endCursor: string | null;
  readonly hasNextPage: boolean;
  readonly query: ProductListingQuery;
  readonly errorMessage: string | null;
}

export interface ProductListingMachineInput {
  readonly items: ProductListPage['items'];
  readonly endCursor: string | null;
  readonly hasNextPage: boolean;
  readonly query: ProductListingQuery;
}

const errorMessageFrom = (error: unknown): string =>
  error instanceof Error ? error.message : 'Failed to load more products';

export const productListingMachine = setup({
  types: {
    context: {} as ProductListingMachineContext,
    events: {} as ProductListingMachineEvent,
    input: {} as ProductListingMachineInput,
  },
  actors: {
    loadMoreProducts: fromPromise<ProductListPage, ProductListingLoadMoreInput>(() => {
      throw new Error(
        'productListingMachine: provide the loadMoreProducts actor (machine.provide)',
      );
    }),
  },
}).createMachine({
  id: MachineId.ProductListing,
  initial: ProductListingState.Idle,
  context: ({ input }) => ({
    items: input.items,
    endCursor: input.endCursor,
    hasNextPage: input.hasNextPage,
    query: input.query,
    errorMessage: null,
  }),
  states: {
    [ProductListingState.Idle]: {
      on: {
        [ProductListingEventType.LoadMore]: {
          guard: ({ context }) => context.hasNextPage && context.endCursor !== null,
          target: ProductListingState.LoadingMore,
        },
      },
    },
    [ProductListingState.LoadingMore]: {
      invoke: {
        src: 'loadMoreProducts',
        input: ({ context }) => {
          if (context.endCursor === null) {
            throw new Error('productListingMachine: entered LoadingMore without a cursor');
          }
          return { cursor: context.endCursor, query: context.query };
        },
        onDone: {
          target: ProductListingState.Idle,
          actions: assign({
            items: ({ context, event }) => [...context.items, ...event.output.items],
            endCursor: ({ event }) => event.output.endCursor,
            hasNextPage: ({ event }) => event.output.hasNextPage,
            errorMessage: null,
          }),
        },
        onError: {
          target: ProductListingState.Idle,
          actions: assign({
            errorMessage: ({ event }) => errorMessageFrom(event.error),
          }),
        },
      },
    },
  },
});
