'use client';

import { useCallback } from 'react';
import type { ProductListItem } from '@exclusive-wear/shopify';

import { ListingOverlayMachineContext } from '@/machines/listingOverlayMachineContext';
import { ListingOverlayEventType, ListingOverlayState } from '@/types/machines';

/**
 * The only way components talk to the listing overlay machine — narrow
 * hooks so the bar, the grid cards and the sheets each re-render only
 * for the slice they read.
 */

export const useFiltersOpen = (): boolean =>
  ListingOverlayMachineContext.useSelector((snapshot) =>
    snapshot.matches(ListingOverlayState.Filters),
  );

export const useQuickPickOpen = (): boolean =>
  ListingOverlayMachineContext.useSelector((snapshot) =>
    snapshot.matches(ListingOverlayState.QuickPick),
  );

export const useQuickPickProduct = () =>
  ListingOverlayMachineContext.useSelector((snapshot) => snapshot.context.quickPickProduct);

export const useListingOverlayActions = () => {
  const actorRef = ListingOverlayMachineContext.useActorRef();
  const openFilters = useCallback(
    () => actorRef.send({ type: ListingOverlayEventType.OpenFilters }),
    [actorRef],
  );
  const closeFilters = useCallback(
    () => actorRef.send({ type: ListingOverlayEventType.CloseFilters }),
    [actorRef],
  );
  const openQuickPick = useCallback(
    (product: ProductListItem) =>
      actorRef.send({ type: ListingOverlayEventType.OpenQuickPick, product }),
    [actorRef],
  );
  const closeQuickPick = useCallback(
    () => actorRef.send({ type: ListingOverlayEventType.CloseQuickPick }),
    [actorRef],
  );
  return { openFilters, closeFilters, openQuickPick, closeQuickPick };
};
