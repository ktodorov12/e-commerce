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

export interface Product extends ProductSummary {
  readonly description: string;
  readonly descriptionHtml: string;
  readonly productType: string;
  readonly images: readonly ShopImage[];
  readonly options: readonly ProductOption[];
  readonly variants: readonly ProductVariant[];
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
  readonly products: readonly ProductSummary[];
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
