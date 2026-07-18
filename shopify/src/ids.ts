/**
 * Shape validators for the only user-derived strings allowed near Shopify:
 * opaque ids the server issued (GIDs) and product handles read from the URL.
 * These are the "fail closed" gate — validate the shape before a value is ever
 * forwarded to a Storefront query/mutation (see CLAUDE.md → Security).
 */

/** Every Storefront resource id is a GID: `gid://shopify/<Type>/<id>`. */
const SHOPIFY_GID_PREFIX = 'gid://shopify/';

export const isShopifyId = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.startsWith(SHOPIFY_GID_PREFIX) &&
  value.length > SHOPIFY_GID_PREFIX.length;

/** Shopify handles are lowercase alphanumeric words joined by single hyphens. */
const SHOPIFY_HANDLE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SHOPIFY_HANDLE_MAX_LENGTH = 255;

export const isShopifyHandle = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.length > 0 &&
  value.length <= SHOPIFY_HANDLE_MAX_LENGTH &&
  SHOPIFY_HANDLE_PATTERN.test(value);
