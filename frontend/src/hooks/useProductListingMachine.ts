'use client';

import { useCallback } from 'react';
import type { ProductListItem } from '@exclusive-wear/shopify';

import { ProductListingMachineContext } from '@/machines/productListingMachineContext';
import { ProductListingEventType, ProductListingState } from '@/types/machines';

/**
 * The only way components talk to the listing pagination machine — narrow
 * hooks so the grid, the piece count and the sentinel each re-render only
 * for the slice they read.
 */

export const useProductListingItems = (): readonly ProductListItem[] =>
  ProductListingMachineContext.useSelector((snapshot) => snapshot.context.items);

export const useProductListingHasNextPage = (): boolean =>
  ProductListingMachineContext.useSelector((snapshot) => snapshot.context.hasNextPage);

export const useProductListingLoadingMore = (): boolean =>
  ProductListingMachineContext.useSelector((snapshot) =>
    snapshot.matches(ProductListingState.LoadingMore),
  );

export const useProductListingError = (): string | null =>
  ProductListingMachineContext.useSelector((snapshot) => snapshot.context.errorMessage);

export const useLoadMoreProducts = () => {
  const actorRef = ProductListingMachineContext.useActorRef();
  return useCallback(
    () => actorRef.send({ type: ProductListingEventType.LoadMore }),
    [actorRef],
  );
};
