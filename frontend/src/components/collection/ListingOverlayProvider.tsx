'use client';

import type { ReactNode } from 'react';

import { ListingOverlayMachineContext } from '@/machines/listingOverlayMachineContext';

/** Page-scoped provider for the listing's overlay machine (filter sheet,
    quick-pick sheet) — mounted by the products page only. */
export const ListingOverlayProvider = ({ children }: { readonly children: ReactNode }) => (
  <ListingOverlayMachineContext.Provider>{children}</ListingOverlayMachineContext.Provider>
);
