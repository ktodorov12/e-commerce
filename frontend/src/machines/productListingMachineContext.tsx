'use client';

import { createActorContext } from '@xstate/react';
import { fromPromise } from 'xstate';
import type { ProductListPage } from '@exclusive-wear/shopify';

import { loadMoreProductsAction } from '@/app/actions/products';
import { productListingMachine } from '@/machines/productListingMachine';
import type { ProductListingLoadMoreInput } from '@/machines/productListingMachine';

/**
 * The listing pagination machine, wired to the server action that fetches
 * the next page. Components consume this through the small hooks in
 * hooks/useProductListingMachine.ts only.
 */
export const ProductListingMachineContext = createActorContext(
  productListingMachine.provide({
    actors: {
      loadMoreProducts: fromPromise<ProductListPage, ProductListingLoadMoreInput>(({ input }) =>
        loadMoreProductsAction(input),
      ),
    },
  }),
);
