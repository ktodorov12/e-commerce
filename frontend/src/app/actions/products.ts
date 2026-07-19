'use server';

import { getProductByHandle, getProducts, isShopifyCursor, isShopifyHandle, ProductSort } from '@exclusive-wear/shopify';
import type { Product, ProductListPage } from '@exclusive-wear/shopify';

import {
  AvailabilityFilter,
  BrandFilter,
  GenderFilter,
  LISTING_LOAD_MORE_ITEM_COUNT,
  TypeFilter,
} from '@/types/catalog';
import type { ListingFilterSelection, ProductListingQuery } from '@/types/catalog';
import { buildProductListingQueryOptions } from '@/utils/listingQuery';

/**
 * Infinite-scroll page-N fetch. A public endpoint: the cursor is the one
 * opaque, server-issued value allowed to round-trip through the client (shape
 * validated, never forwarded as-is), and every enum in the query is
 * re-validated against its canonical domain — the same fail-closed discipline
 * as the page's own URL parsing (utils/queryParam.ts), since a caller could
 * invoke this action directly with arbitrary JSON.
 */

export interface LoadMoreProductsInput {
  readonly cursor: string;
  readonly query: ProductListingQuery;
}

const assertEnumMember = <TValue extends string>(
  value: unknown,
  allowed: readonly TValue[],
  label: string,
): TValue => {
  if (typeof value === 'string' && (allowed as readonly string[]).includes(value)) {
    return value as TValue;
  }
  throw new Error(`Invalid ${label}`);
};

const assertEnumMemberList = <TValue extends string>(
  value: unknown,
  allowed: readonly TValue[],
  label: string,
): readonly TValue[] => {
  if (!Array.isArray(value)) throw new Error(`Invalid ${label} list`);
  return value.map((entry) => assertEnumMember(entry, allowed, label));
};

const assertOptionalWholePrice = (value: unknown, label: string): number | null => {
  if (value === null) return null;
  if (typeof value === 'number' && Number.isInteger(value) && value >= 0) return value;
  throw new Error(`Invalid ${label}`);
};

const assertCursor = (value: unknown): string => {
  if (isShopifyCursor(value)) return value;
  throw new Error('Invalid cursor');
};

const assertShopifyHandle = (value: unknown): string => {
  if (isShopifyHandle(value)) return value;
  throw new Error('Invalid handle');
};

const assertListingFilterSelection = (value: unknown): ListingFilterSelection => {
  if (typeof value !== 'object' || value === null) throw new Error('Invalid filter selection');
  const selection = value as Record<string, unknown>;
  const minPrice = assertOptionalWholePrice(selection.minPrice, 'minimum price');
  const maxPrice = assertOptionalWholePrice(selection.maxPrice, 'maximum price');
  // Cross-field check mirroring the page's own URL parsing: an inverted range
  // is not a query we ever emit ourselves.
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    throw new Error('Invalid price range');
  }
  return {
    types: assertEnumMemberList(selection.types, Object.values(TypeFilter), 'type filter'),
    genders: assertEnumMemberList(selection.genders, Object.values(GenderFilter), 'gender filter'),
    brands: assertEnumMemberList(selection.brands, Object.values(BrandFilter), 'brand filter'),
    availability: assertEnumMember(
      selection.availability,
      Object.values(AvailabilityFilter),
      'availability filter',
    ),
    minPrice,
    maxPrice,
  };
};

export async function loadMoreProductsAction(input: LoadMoreProductsInput): Promise<ProductListPage> {
  const cursor = assertCursor(input.cursor);
  const sort = assertEnumMember(input.query.sort, Object.values(ProductSort), 'sort');
  const selection = assertListingFilterSelection(input.query.selection);

  return getProducts({
    first: LISTING_LOAD_MORE_ITEM_COUNT,
    after: cursor,
    ...buildProductListingQueryOptions({ sort, selection }),
  });
}

/**
 * Saved page fetch. `handles` come from the client's localStorage-backed
 * saved store — a public endpoint could invoke this with arbitrary JSON, so
 * every handle is shape-validated before it reaches Shopify. A handle whose
 * product no longer exists is dropped rather than failing the whole batch.
 */
export async function getSavedProductsAction(
  handles: readonly string[],
): Promise<readonly Product[]> {
  const validatedHandles = handles.map(assertShopifyHandle);
  const products = await Promise.all(validatedHandles.map((handle) => getProductByHandle(handle)));
  return products.filter((product): product is Product => product !== null);
}
