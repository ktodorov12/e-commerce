/**
 * @exclusive-wear/shopify — the typed Storefront API layer.
 *
 * The frontend imports domain functions and domain types from here only.
 * GraphQL documents, generated types and transport are implementation
 * details of this package.
 */

export {
  CartUserError,
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  getCart,
  getCollections,
  getFeaturedCollection,
  getProductByHandle,
  getProducts,
} from './api';
export type { GetProductsOptions } from './api';
export { StorefrontRequestError } from './client';
export { isShopifyHandle, isShopifyId } from './ids';
export {
  resolveStorefrontConfig,
  ShopifyEnvVar,
  StorefrontApiVersion,
  StorefrontEndpoint,
  StorefrontHeader,
  StorefrontProvider,
} from './config';
export type { StorefrontConfig } from './config';
export { ProductSort, StorefrontSearchQuery } from './types';
// The client preset emits CurrencyCode as a union type (not a runtime enum).
export type { CurrencyCode } from './generated/graphql';
export type {
  Cart,
  CartLine,
  CartLineDraft,
  CartLineMerchandise,
  CartLineUpdateDraft,
  Collection,
  FeaturedCollection,
  Money,
  Product,
  ProductOption,
  ProductSummary,
  ProductVariant,
  SelectedOption,
  ShopImage,
} from './types';
