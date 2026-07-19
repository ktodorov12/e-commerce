'use client';

import type { ReactNode } from 'react';

import { ProductListingMachineContext } from '@/machines/productListingMachineContext';
import type { ProductListingMachineInput } from '@/machines/productListingMachine';

export interface ProductListingProviderProps extends ProductListingMachineInput {
  readonly children: ReactNode;
}

/**
 * Page-scoped provider for the listing's pagination machine, seeded with the
 * server-rendered first page. app/products/page.tsx mounts this under a
 * `key` derived from the sort/filter query, so a new query gets a fresh
 * actor instead of carrying over a stale item list.
 */
export const ProductListingProvider = ({
  children,
  items,
  endCursor,
  hasNextPage,
  query,
}: ProductListingProviderProps) => (
  <ProductListingMachineContext.Provider options={{ input: { items, endCursor, hasNextPage, query } }}>
    {children}
  </ProductListingMachineContext.Provider>
);
