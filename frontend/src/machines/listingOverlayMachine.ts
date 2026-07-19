import { assign, setup } from 'xstate';
import type { ProductListItem } from '@exclusive-wear/shopify';

import { ListingOverlayEventType, ListingOverlayState, MachineId } from '@/types/machines';

/**
 * Listing overlays — which panel is up (filter sheet or quick-pick sheet)
 * and which product the quick-pick is for. The product stays in context
 * after closing so the sheet keeps its content through the exit animation.
 */

export type ListingOverlayEvent =
  | { readonly type: ListingOverlayEventType.OpenFilters }
  | { readonly type: ListingOverlayEventType.CloseFilters }
  | { readonly type: ListingOverlayEventType.OpenQuickPick; readonly product: ProductListItem }
  | { readonly type: ListingOverlayEventType.CloseQuickPick };

export interface ListingOverlayContext {
  readonly quickPickProduct: ProductListItem | null;
}

export const listingOverlayMachine = setup({
  types: {
    context: {} as ListingOverlayContext,
    events: {} as ListingOverlayEvent,
  },
}).createMachine({
  id: MachineId.ListingOverlay,
  initial: ListingOverlayState.Idle,
  context: { quickPickProduct: null },
  states: {
    [ListingOverlayState.Idle]: {
      on: {
        [ListingOverlayEventType.OpenFilters]: { target: ListingOverlayState.Filters },
        [ListingOverlayEventType.OpenQuickPick]: {
          target: ListingOverlayState.QuickPick,
          actions: assign({ quickPickProduct: ({ event }) => event.product }),
        },
      },
    },
    [ListingOverlayState.Filters]: {
      on: {
        [ListingOverlayEventType.CloseFilters]: { target: ListingOverlayState.Idle },
      },
    },
    [ListingOverlayState.QuickPick]: {
      on: {
        [ListingOverlayEventType.CloseQuickPick]: { target: ListingOverlayState.Idle },
      },
    },
  },
});
