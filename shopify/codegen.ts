import type { CodegenConfig } from '@graphql-codegen/cli';

import { resolveStorefrontConfig, ShopifyEnvVar } from './src/config';

/**
 * GraphQL Codegen — types are generated from the Storefront schema and
 * committed (src/generated), so the repo typechecks without a network hop.
 *
 * Schema source:
 *  - default: introspection from the resolved endpoint (mock.shop unless
 *    real-store env vars are set — see src/config.ts)
 *  - offline:  set SHOPIFY_SCHEMA_PATH to a local introspection JSON
 */
const schemaPath = process.env[ShopifyEnvVar.SchemaPath];
const storefront = resolveStorefrontConfig();

const config: CodegenConfig = {
  schema: schemaPath ?? [
    {
      [storefront.endpoint]: {
        headers: { ...storefront.headers },
      },
    },
  ],
  // `absolute: false` keeps the document loader on relative paths. The repo
  // lives under a directory whose name starts with "!" (…/!e-commerce/…), and
  // @graphql-tools' isValidPath treats "!" in an *absolute* path as a glob
  // magic char, so the resolved file is rejected and codegen finds "no
  // documents". Relative paths avoid the "!" prefix and load correctly.
  documents: [
    {
      'src/graphql/**/*.ts': {
        // @ts-expect-error — `absolute` is a real @graphql-tools loader option
        // honored at runtime, but codegen's CustomDocumentLoaderOptions type
        // doesn't model it.
        absolute: false,
      },
    },
  ],
  generates: {
    'src/generated/': {
      preset: 'client',
      presetConfig: {
        // Domain mappers consume plain fragment types; masking would only
        // add friction between the generated layer and src/mappers.ts.
        fragmentMasking: false,
      },
      config: {
        // `verbatimModuleSyntax` is on repo-wide: generated type imports must
        // be `import type`.
        useTypeImports: true,
        // NB: the `client` preset always emits GraphQL enums as string-literal
        // union *types* (it ignores enumsAsTypes/enumsAsConst). The domain layer
        // therefore treats them as types and bridges to them with `satisfies`
        // (see src/api.ts SORT_MAPPING) rather than referencing enum members as
        // runtime values.
        scalars: {
          Color: 'string',
          DateTime: 'string',
          Decimal: 'string',
          HTML: 'string',
          ISO8601DateTime: 'string',
          JSON: 'unknown',
          UnsignedInt64: 'string',
          URL: 'string',
        },
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
