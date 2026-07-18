/**
 * Storefront endpoint resolution — swappable via env only.
 *
 * Priority:
 *  1. SHOPIFY_STOREFRONT_ENDPOINT  — full endpoint override (fixtures, staging gateways)
 *  2. SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN — the real store
 *  3. nothing set                  — Shopify's public mock store (mock.shop)
 *
 * Same interface in all three cases; zero code changes when the real
 * store credentials arrive. Documented in the repo-root .env.example.
 */

export enum ShopifyEnvVar {
  StoreDomain = 'SHOPIFY_STORE_DOMAIN',
  StorefrontAccessToken = 'SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  StorefrontEndpoint = 'SHOPIFY_STOREFRONT_ENDPOINT',
  /** Codegen only: introspect from a local schema file instead of the network. */
  SchemaPath = 'SHOPIFY_SCHEMA_PATH',
}

export enum StorefrontApiVersion {
  Current = '2026-01',
}

export enum StorefrontEndpoint {
  MockShop = 'https://mock.shop/api',
}

export enum StorefrontHeader {
  AccessToken = 'X-Shopify-Storefront-Access-Token',
}

export enum StorefrontProvider {
  MockShop = 'mock-shop',
  Shopify = 'shopify',
  Custom = 'custom',
}

export interface StorefrontConfig {
  readonly endpoint: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly provider: StorefrontProvider;
}

export const resolveStorefrontConfig = (
  env: Readonly<Record<string, string | undefined>> = process.env,
): StorefrontConfig => {
  const endpointOverride = env[ShopifyEnvVar.StorefrontEndpoint];
  if (endpointOverride) {
    return { endpoint: endpointOverride, headers: {}, provider: StorefrontProvider.Custom };
  }

  const domain = env[ShopifyEnvVar.StoreDomain];
  const token = env[ShopifyEnvVar.StorefrontAccessToken];
  if (domain && token) {
    return {
      endpoint: `https://${domain}/api/${StorefrontApiVersion.Current}/graphql.json`,
      headers: { [StorefrontHeader.AccessToken]: token },
      provider: StorefrontProvider.Shopify,
    };
  }

  return {
    endpoint: StorefrontEndpoint.MockShop,
    headers: {},
    provider: StorefrontProvider.MockShop,
  };
};
