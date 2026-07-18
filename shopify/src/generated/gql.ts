/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment MoneyParts on MoneyV2 {\n    amount\n    currencyCode\n  }\n": typeof types.MoneyPartsFragmentDoc,
    "\n  fragment ImageParts on Image {\n    url\n    altText\n    width\n    height\n  }\n": typeof types.ImagePartsFragmentDoc,
    "\n  fragment ProductCardParts on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      ...ImageParts\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n  }\n": typeof types.ProductCardPartsFragmentDoc,
    "\n  fragment ProductParts on Product {\n    ...ProductCardParts\n    description\n    descriptionHtml\n    productType\n    images(first: 10) {\n      nodes {\n        ...ImageParts\n      }\n    }\n    options {\n      name\n      values\n    }\n    variants(first: 50) {\n      nodes {\n        ...VariantParts\n      }\n    }\n  }\n": typeof types.ProductPartsFragmentDoc,
    "\n  fragment VariantParts on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      ...MoneyParts\n    }\n    compareAtPrice {\n      ...MoneyParts\n    }\n    selectedOptions {\n      name\n      value\n    }\n    image {\n      ...ImageParts\n    }\n  }\n": typeof types.VariantPartsFragmentDoc,
    "\n  fragment CartParts on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        ...MoneyParts\n      }\n      totalAmount {\n        ...MoneyParts\n      }\n    }\n    lines(first: 50) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            ...MoneyParts\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            image {\n              ...ImageParts\n            }\n            price {\n              ...MoneyParts\n            }\n            product {\n              title\n              handle\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.CartPartsFragmentDoc,
    "\n  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {\n    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...ProductCardParts\n      }\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProductByHandle($handle: String!) {\n    product(handle: $handle) {\n      ...ProductParts\n    }\n  }\n": typeof types.GetProductByHandleDocument,
    "\n  query GetCollections($first: Int!) {\n    collections(first: $first) {\n      nodes {\n        id\n        handle\n        title\n        description\n        image {\n          ...ImageParts\n        }\n      }\n    }\n  }\n": typeof types.GetCollectionsDocument,
    "\n  query GetFeaturedCollection($productsCount: Int!) {\n    collections(first: 1) {\n      nodes {\n        id\n        handle\n        title\n        products(first: $productsCount) {\n          nodes {\n            ...ProductCardParts\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFeaturedCollectionDocument,
    "\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartParts\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  mutation CartCreate($lines: [CartLineInput!]) {\n    cartCreate(input: { lines: $lines }) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartCreateDocument,
    "\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartLinesAddDocument,
    "\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartLinesUpdateDocument,
    "\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartLinesRemoveDocument,
};
const documents: Documents = {
    "\n  fragment MoneyParts on MoneyV2 {\n    amount\n    currencyCode\n  }\n": types.MoneyPartsFragmentDoc,
    "\n  fragment ImageParts on Image {\n    url\n    altText\n    width\n    height\n  }\n": types.ImagePartsFragmentDoc,
    "\n  fragment ProductCardParts on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      ...ImageParts\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n  }\n": types.ProductCardPartsFragmentDoc,
    "\n  fragment ProductParts on Product {\n    ...ProductCardParts\n    description\n    descriptionHtml\n    productType\n    images(first: 10) {\n      nodes {\n        ...ImageParts\n      }\n    }\n    options {\n      name\n      values\n    }\n    variants(first: 50) {\n      nodes {\n        ...VariantParts\n      }\n    }\n  }\n": types.ProductPartsFragmentDoc,
    "\n  fragment VariantParts on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      ...MoneyParts\n    }\n    compareAtPrice {\n      ...MoneyParts\n    }\n    selectedOptions {\n      name\n      value\n    }\n    image {\n      ...ImageParts\n    }\n  }\n": types.VariantPartsFragmentDoc,
    "\n  fragment CartParts on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        ...MoneyParts\n      }\n      totalAmount {\n        ...MoneyParts\n      }\n    }\n    lines(first: 50) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            ...MoneyParts\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            image {\n              ...ImageParts\n            }\n            price {\n              ...MoneyParts\n            }\n            product {\n              title\n              handle\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CartPartsFragmentDoc,
    "\n  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {\n    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...ProductCardParts\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProductByHandle($handle: String!) {\n    product(handle: $handle) {\n      ...ProductParts\n    }\n  }\n": types.GetProductByHandleDocument,
    "\n  query GetCollections($first: Int!) {\n    collections(first: $first) {\n      nodes {\n        id\n        handle\n        title\n        description\n        image {\n          ...ImageParts\n        }\n      }\n    }\n  }\n": types.GetCollectionsDocument,
    "\n  query GetFeaturedCollection($productsCount: Int!) {\n    collections(first: 1) {\n      nodes {\n        id\n        handle\n        title\n        products(first: $productsCount) {\n          nodes {\n            ...ProductCardParts\n          }\n        }\n      }\n    }\n  }\n": types.GetFeaturedCollectionDocument,
    "\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartParts\n    }\n  }\n": types.GetCartDocument,
    "\n  mutation CartCreate($lines: [CartLineInput!]) {\n    cartCreate(input: { lines: $lines }) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": types.CartCreateDocument,
    "\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": types.CartLinesAddDocument,
    "\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": types.CartLinesUpdateDocument,
    "\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": types.CartLinesRemoveDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MoneyParts on MoneyV2 {\n    amount\n    currencyCode\n  }\n"): (typeof documents)["\n  fragment MoneyParts on MoneyV2 {\n    amount\n    currencyCode\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ImageParts on Image {\n    url\n    altText\n    width\n    height\n  }\n"): (typeof documents)["\n  fragment ImageParts on Image {\n    url\n    altText\n    width\n    height\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCardParts on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      ...ImageParts\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductCardParts on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      ...ImageParts\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductParts on Product {\n    ...ProductCardParts\n    description\n    descriptionHtml\n    productType\n    images(first: 10) {\n      nodes {\n        ...ImageParts\n      }\n    }\n    options {\n      name\n      values\n    }\n    variants(first: 50) {\n      nodes {\n        ...VariantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductParts on Product {\n    ...ProductCardParts\n    description\n    descriptionHtml\n    productType\n    images(first: 10) {\n      nodes {\n        ...ImageParts\n      }\n    }\n    options {\n      name\n      values\n    }\n    variants(first: 50) {\n      nodes {\n        ...VariantParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment VariantParts on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      ...MoneyParts\n    }\n    compareAtPrice {\n      ...MoneyParts\n    }\n    selectedOptions {\n      name\n      value\n    }\n    image {\n      ...ImageParts\n    }\n  }\n"): (typeof documents)["\n  fragment VariantParts on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      ...MoneyParts\n    }\n    compareAtPrice {\n      ...MoneyParts\n    }\n    selectedOptions {\n      name\n      value\n    }\n    image {\n      ...ImageParts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartParts on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        ...MoneyParts\n      }\n      totalAmount {\n        ...MoneyParts\n      }\n    }\n    lines(first: 50) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            ...MoneyParts\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            image {\n              ...ImageParts\n            }\n            price {\n              ...MoneyParts\n            }\n            product {\n              title\n              handle\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CartParts on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        ...MoneyParts\n      }\n      totalAmount {\n        ...MoneyParts\n      }\n    }\n    lines(first: 50) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            ...MoneyParts\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            image {\n              ...ImageParts\n            }\n            price {\n              ...MoneyParts\n            }\n            product {\n              title\n              handle\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {\n    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...ProductCardParts\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {\n    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...ProductCardParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductByHandle($handle: String!) {\n    product(handle: $handle) {\n      ...ProductParts\n    }\n  }\n"): (typeof documents)["\n  query GetProductByHandle($handle: String!) {\n    product(handle: $handle) {\n      ...ProductParts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollections($first: Int!) {\n    collections(first: $first) {\n      nodes {\n        id\n        handle\n        title\n        description\n        image {\n          ...ImageParts\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCollections($first: Int!) {\n    collections(first: $first) {\n      nodes {\n        id\n        handle\n        title\n        description\n        image {\n          ...ImageParts\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFeaturedCollection($productsCount: Int!) {\n    collections(first: 1) {\n      nodes {\n        id\n        handle\n        title\n        products(first: $productsCount) {\n          nodes {\n            ...ProductCardParts\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFeaturedCollection($productsCount: Int!) {\n    collections(first: 1) {\n      nodes {\n        id\n        handle\n        title\n        products(first: $productsCount) {\n          nodes {\n            ...ProductCardParts\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartParts\n    }\n  }\n"): (typeof documents)["\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartParts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartCreate($lines: [CartLineInput!]) {\n    cartCreate(input: { lines: $lines }) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartCreate($lines: [CartLineInput!]) {\n    cartCreate(input: { lines: $lines }) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartParts\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;