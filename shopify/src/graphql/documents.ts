import { graphql } from '../generated/gql';

/**
 * Every Storefront operation, in one place. Selection sets are kept to
 * fields mock.shop demonstrably supports, so the same documents run
 * unchanged against the mock store and a real one.
 */

export const MoneyPartsFragmentDoc = graphql(`
  fragment MoneyParts on MoneyV2 {
    amount
    currencyCode
  }
`);

export const ImagePartsFragmentDoc = graphql(`
  fragment ImageParts on Image {
    url
    altText
    width
    height
  }
`);

export const ProductCardPartsFragmentDoc = graphql(`
  fragment ProductCardParts on Product {
    id
    handle
    title
    availableForSale
    featuredImage {
      ...ImageParts
    }
    priceRange {
      minVariantPrice {
        ...MoneyParts
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyParts
      }
    }
  }
`);

export const ProductPartsFragmentDoc = graphql(`
  fragment ProductParts on Product {
    ...ProductCardParts
    description
    descriptionHtml
    productType
    images(first: 10) {
      nodes {
        ...ImageParts
      }
    }
    options {
      name
      values
    }
    variants(first: 50) {
      nodes {
        ...VariantParts
      }
    }
  }
`);

export const VariantPartsFragmentDoc = graphql(`
  fragment VariantParts on ProductVariant {
    id
    title
    availableForSale
    price {
      ...MoneyParts
    }
    compareAtPrice {
      ...MoneyParts
    }
    selectedOptions {
      name
      value
    }
    image {
      ...ImageParts
    }
  }
`);

export const CartPartsFragmentDoc = graphql(`
  fragment CartParts on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...MoneyParts
      }
      totalAmount {
        ...MoneyParts
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            ...MoneyParts
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            image {
              ...ImageParts
            }
            price {
              ...MoneyParts
            }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`);

export const GetProductsDocument = graphql(`
  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
      nodes {
        ...ProductCardParts
      }
    }
  }
`);

export const GetProductByHandleDocument = graphql(`
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductParts
    }
  }
`);

export const GetCollectionsDocument = graphql(`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        description
        image {
          ...ImageParts
        }
      }
    }
  }
`);

export const GetFeaturedCollectionDocument = graphql(`
  query GetFeaturedCollection($productsCount: Int!) {
    collections(first: 1) {
      nodes {
        id
        handle
        title
        products(first: $productsCount) {
          nodes {
            ...ProductCardParts
          }
        }
      }
    }
  }
`);

export const GetCartDocument = graphql(`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartParts
    }
  }
`);

export const CartCreateDocument = graphql(`
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartParts
      }
      userErrors {
        field
        message
      }
    }
  }
`);

export const CartLinesAddDocument = graphql(`
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartParts
      }
      userErrors {
        field
        message
      }
    }
  }
`);

export const CartLinesUpdateDocument = graphql(`
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartParts
      }
      userErrors {
        field
        message
      }
    }
  }
`);

export const CartLinesRemoveDocument = graphql(`
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartParts
      }
      userErrors {
        field
        message
      }
    }
  }
`);
