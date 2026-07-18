import { executeStorefront } from './client';
import type { ProductSortKeys } from './generated/graphql';
import {
  CartCreateDocument,
  CartLinesAddDocument,
  CartLinesRemoveDocument,
  CartLinesUpdateDocument,
  GetCartDocument,
  GetCollectionsDocument,
  GetFeaturedCollectionDocument,
  GetProductByHandleDocument,
  GetProductsDocument,
} from './graphql/documents';
import { toCart, toCollection, toFeaturedCollection, toProduct, toProductSummary } from './mappers';
import { ProductSort, StorefrontSearchQuery } from './types';
import type {
  Cart,
  CartLineDraft,
  CartLineUpdateDraft,
  Collection,
  FeaturedCollection,
  Product,
  ProductSummary,
} from './types';

/**
 * The domain surface of this package. The frontend imports these functions
 * and the types they return — never raw GraphQL.
 */

/** A cart mutation was rejected by Shopify (validation, stale line ids, …). */
export class CartUserError extends Error {
  constructor(messages: readonly string[]) {
    super(messages.join('; '));
    this.name = 'CartUserError';
  }
}

interface CartMutationPayload {
  readonly cart?: Parameters<typeof toCart>[0] | null;
  readonly userErrors: ReadonlyArray<{ readonly message: string }>;
}

const unwrapCartPayload = (payload: CartMutationPayload | null | undefined): Cart => {
  if (payload && payload.userErrors.length > 0) {
    throw new CartUserError(payload.userErrors.map((userError) => userError.message));
  }
  if (!payload?.cart) {
    throw new CartUserError(['Cart mutation returned no cart']);
  }
  return toCart(payload.cart);
};

// The `client` preset emits ProductSortKeys as a string-literal union type, not
// a runtime enum. `satisfies` validates each key against that union at compile
// time (a typo fails the build), while `as const` keeps the literal types so
// they stay assignable to the generated query variable.
const SORT_MAPPING = {
  [ProductSort.Newest]: { sortKey: 'CREATED_AT', reverse: true },
  [ProductSort.PriceAsc]: { sortKey: 'PRICE', reverse: false },
  [ProductSort.PriceDesc]: { sortKey: 'PRICE', reverse: true },
} as const satisfies Record<ProductSort, { sortKey: ProductSortKeys; reverse: boolean }>;

export interface GetProductsOptions {
  readonly first?: number;
  readonly sort?: ProductSort;
  readonly availableOnly?: boolean;
}

const DEFAULT_PAGE_SIZE = 24;

export const getProducts = async (options: GetProductsOptions = {}): Promise<ProductSummary[]> => {
  const { first = DEFAULT_PAGE_SIZE, sort = ProductSort.Newest, availableOnly = false } = options;
  const { sortKey, reverse } = SORT_MAPPING[sort];
  const data = await executeStorefront(GetProductsDocument, {
    first,
    sortKey,
    reverse,
    query: availableOnly ? StorefrontSearchQuery.AvailableForSale : null,
  });
  return data.products.nodes.map(toProductSummary);
};

export const getProductByHandle = async (handle: string): Promise<Product | null> => {
  const data = await executeStorefront(GetProductByHandleDocument, { handle });
  return data.product ? toProduct(data.product) : null;
};

export const getCollections = async (first = 10): Promise<Collection[]> => {
  const data = await executeStorefront(GetCollectionsDocument, { first });
  return data.collections.nodes.map(toCollection);
};

const FEATURED_PRODUCTS_COUNT = 8;

export const getFeaturedCollection = async (
  productsCount = FEATURED_PRODUCTS_COUNT,
): Promise<FeaturedCollection | null> => {
  const data = await executeStorefront(GetFeaturedCollectionDocument, { productsCount });
  const node = data.collections.nodes[0];
  return node ? toFeaturedCollection(node) : null;
};

export const getCart = async (cartId: string): Promise<Cart | null> => {
  const data = await executeStorefront(GetCartDocument, { cartId });
  return data.cart ? toCart(data.cart) : null;
};

export const cartCreate = async (lines: readonly CartLineDraft[]): Promise<Cart> => {
  const data = await executeStorefront(CartCreateDocument, {
    lines: lines.map((line) => ({ merchandiseId: line.merchandiseId, quantity: line.quantity })),
  });
  return unwrapCartPayload(data.cartCreate);
};

export const cartLinesAdd = async (
  cartId: string,
  lines: readonly CartLineDraft[],
): Promise<Cart> => {
  const data = await executeStorefront(CartLinesAddDocument, {
    cartId,
    lines: lines.map((line) => ({ merchandiseId: line.merchandiseId, quantity: line.quantity })),
  });
  return unwrapCartPayload(data.cartLinesAdd);
};

export const cartLinesUpdate = async (
  cartId: string,
  lines: readonly CartLineUpdateDraft[],
): Promise<Cart> => {
  const data = await executeStorefront(CartLinesUpdateDocument, {
    cartId,
    lines: lines.map((line) => ({ id: line.lineId, quantity: line.quantity })),
  });
  return unwrapCartPayload(data.cartLinesUpdate);
};

export const cartLinesRemove = async (
  cartId: string,
  lineIds: readonly string[],
): Promise<Cart> => {
  const data = await executeStorefront(CartLinesRemoveDocument, {
    cartId,
    lineIds: [...lineIds],
  });
  return unwrapCartPayload(data.cartLinesRemove);
};
