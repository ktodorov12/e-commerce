import type { CurrencyCode } from './generated/graphql';

/**
 * Domain types — what the frontend actually consumes. The raw GraphQL
 * shapes (nullable edges, unions, connection wrappers) stay behind
 * src/mappers.ts; nothing outside this package touches generated types
 * except through these.
 */

export interface Money {
  readonly amount: string;
  readonly currencyCode: CurrencyCode;
}

export interface ShopImage {
  readonly url: string;
  readonly altText: string | null;
  readonly width: number | null;
  readonly height: number | null;
}

export interface ProductSummary {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  readonly available: boolean;
  readonly image: ShopImage | null;
  readonly price: Money;
  /** Present only when there is a real markdown (compare-at > price). */
  readonly compareAtPrice: Money | null;
}

export interface SelectedOption {
  readonly name: string;
  readonly value: string;
}

export interface ProductOption {
  readonly name: string;
  readonly values: readonly string[];
}

export interface ProductVariant {
  readonly id: string;
  readonly title: string;
  readonly available: boolean;
  readonly price: Money;
  readonly compareAtPrice: Money | null;
  readonly selectedOptions: readonly SelectedOption[];
  readonly image: ShopImage | null;
}

/**
 * A listing-grid product: summary plus everything the grid's swipe
 * gallery and quick-pick flow need (photos, options, variants) —
 * without the PDP-only prose fields.
 */
export interface ProductListItem extends ProductSummary {
  readonly images: readonly ShopImage[];
  readonly options: readonly ProductOption[];
  readonly variants: readonly ProductVariant[];
}

/** One page of the product listing connection — the cursor and flag the
    frontend needs to fetch the next page, alongside this page's items. */
export interface ProductListPage {
  readonly items: readonly ProductListItem[];
  readonly hasNextPage: boolean;
  readonly endCursor: string | null;
}

export interface Product extends ProductListItem {
  readonly description: string;
  readonly descriptionHtml: string;
  readonly productType: string;
}

export interface Collection {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  readonly description: string;
  readonly image: ShopImage | null;
}

export interface FeaturedCollection {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  /** Full listing items — the home rail reuses the listing's product card. */
  readonly products: readonly ProductListItem[];
}

export interface CartLineMerchandise {
  readonly variantId: string;
  readonly variantTitle: string;
  readonly selectedOptions: readonly SelectedOption[];
  readonly image: ShopImage | null;
  readonly price: Money;
  readonly productTitle: string;
  readonly productHandle: string;
}

export interface CartLine {
  readonly id: string;
  readonly quantity: number;
  readonly cost: Money;
  readonly merchandise: CartLineMerchandise;
}

export interface Cart {
  readonly id: string;
  readonly checkoutUrl: string;
  readonly totalQuantity: number;
  readonly subtotal: Money;
  readonly total: Money;
  readonly lines: readonly CartLine[];
}

/** A line to create/add — the only write shape the frontend needs. */
export interface CartLineDraft {
  readonly merchandiseId: string;
  readonly quantity: number;
}

export interface CartLineUpdateDraft {
  readonly lineId: string;
  readonly quantity: number;
}

/**
 * Catalog sort options. Values double as URL query parameter values in the
 * frontend — single source, derived everywhere else.
 */
export enum ProductSort {
  Newest = 'newest',
  PriceAsc = 'price-asc',
  PriceDesc = 'price-desc',
}

/** Shopify search query syntax fragments used by this layer. */
export enum StorefrontSearchQuery {
  AvailableForSale = 'available_for_sale:true',
}

/** Searchable fields this layer filters on (Shopify search syntax). */
export enum StorefrontSearchField {
  Tag = 'tag',
  Vendor = 'vendor',
  VariantsPrice = 'variants.price',
}

/** Connectives of the Shopify search syntax. */
export enum StorefrontSearchConnective {
  And = ' AND ',
  Or = ' OR ',
}

/**
 * Structured catalog filters. Callers pass canonical values from their own
 * typed domains (never raw user input); this layer still quotes/escapes every
 * value before it enters the search query string. Prices are whole amounts in
 * the store currency.
 */
export interface ProductListFilter {
  /** Tag facets: values within a group OR together, groups AND together —
      `[[tops, bottoms], [men]]` → `(tops OR bottoms) AND men`. */
  readonly tagGroups?: ReadonlyArray<readonly string[]>;
  readonly vendors?: readonly string[];
  readonly minPrice?: number;
  readonly maxPrice?: number;
}
