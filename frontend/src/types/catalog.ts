/**
 * Canonical filter domains for the product listing. Sort options come from
 * `ProductSort` in @exclusive-wear/shopify (single source, also used as the
 * URL parameter value) — never redefine them here.
 *
 * For {@link TypeFilter} and {@link GenderFilter} the enum value doubles as
 * both the URL parameter value and the Shopify product tag (mirroring how
 * `ProductSort` values double as URL values). {@link BrandFilter} is the one
 * facet whose backend value differs — see {@link BRAND_FILTER_VENDORS}.
 */

import type { ProductSort } from '@exclusive-wear/shopify';

export enum AvailabilityFilter {
  All = 'all',
  InStock = 'in-stock',
}

/** Garment type facet — backed by the store's type tags. */
export enum TypeFilter {
  Tops = 'tops',
  Bottoms = 'bottoms',
  Shoes = 'shoes',
  Accessories = 'accessories',
}

/** Gender facet — backed by the store's gender tags. Unisex is not a
    standalone choice: unisex pieces belong to both genders, so the
    {@link GenderSharedTag.Unisex} tag joins whichever gender is picked. */
export enum GenderFilter {
  Men = 'men',
  Women = 'women',
}

/** Tags shared across gender facet members (never shown as chips). */
export enum GenderSharedTag {
  Unisex = 'unisex',
}

/** Brand facet — the explicit allowlist of vendors we sell. */
export enum BrandFilter {
  MockShop = 'mock-shop',
}

/** Shopify `vendor` value behind each brand member. */
export const BRAND_FILTER_VENDORS: Readonly<Record<BrandFilter, string>> = {
  [BrandFilter.MockShop]: 'Mock.shop',
};

/** Upper bound accepted for a price filter value (whole store-currency units). */
export const PRICE_FILTER_MAX = 999_999;

/** The canonical listing filter state — the URL is a projection of this. */
export interface ListingFilterSelection {
  readonly types: readonly TypeFilter[];
  readonly genders: readonly GenderFilter[];
  readonly brands: readonly BrandFilter[];
  readonly availability: AvailabilityFilter;
  /** Whole amounts in the store currency; null = unbounded. */
  readonly minPrice: number | null;
  readonly maxPrice: number | null;
}

export const EMPTY_LISTING_FILTER_SELECTION: ListingFilterSelection = {
  types: [],
  genders: [],
  brands: [],
  availability: AvailabilityFilter.All,
  minPrice: null,
  maxPrice: null,
};

/** How many filter choices are active — drives the Filter tab's count badge. */
export const countSelectedFilters = (selection: ListingFilterSelection): number =>
  selection.types.length +
  selection.genders.length +
  selection.brands.length +
  (selection.availability === AvailabilityFilter.InStock ? 1 : 0) +
  (selection.minPrice !== null || selection.maxPrice !== null ? 1 : 0);

/** The canonical listing query (sort + filter selection) — the shape passed
    to the load-more server action so page N rebuilds the exact same
    Storefront filter as page 1 (utils/listingQuery.ts is the one mapping). */
export interface ProductListingQuery {
  readonly sort: ProductSort;
  readonly selection: ListingFilterSelection;
}

/**
 * Listing pagination sizes (infinite scroll). The grid is 2 columns on
 * mobile, so these read as row counts there: an 8-row first paint, 6-row
 * batches after — the initial fetch stays fast while later batches feel
 * substantial once scrolling starts.
 */
export const LISTING_INITIAL_ITEM_COUNT = 16;
export const LISTING_LOAD_MORE_ITEM_COUNT = 12;
