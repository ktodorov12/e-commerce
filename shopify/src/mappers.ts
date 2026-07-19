import type {
  CartPartsFragment,
  ImagePartsFragment,
  ListingProductPartsFragment,
  MoneyPartsFragment,
  ProductCardPartsFragment,
  ProductPartsFragment,
  VariantPartsFragment,
} from './generated/graphql';
import type {
  Cart,
  CartLine,
  Collection,
  FeaturedCollection,
  Money,
  Product,
  ProductListItem,
  ProductSummary,
  ProductVariant,
  ShopImage,
} from './types';

/**
 * Generated GraphQL shapes → domain types. All nullability and connection
 * unwrapping is handled here, once, so the frontend never sees a Maybe<>.
 */

export const toMoney = (money: MoneyPartsFragment): Money => ({
  amount: money.amount,
  currencyCode: money.currencyCode,
});

export const toImage = (image: ImagePartsFragment | null | undefined): ShopImage | null =>
  image
    ? {
        url: image.url,
        altText: image.altText ?? null,
        width: image.width ?? null,
        height: image.height ?? null,
      }
    : null;

/** Shopify reports "0.0" compare-at ranges when unset — only keep real markdowns. */
const toCompareAtPrice = (
  price: MoneyPartsFragment,
  compareAt: MoneyPartsFragment | null | undefined,
): Money | null => {
  if (!compareAt) return null;
  return Number.parseFloat(compareAt.amount) > Number.parseFloat(price.amount)
    ? toMoney(compareAt)
    : null;
};

export const toProductSummary = (product: ProductCardPartsFragment): ProductSummary => ({
  id: product.id,
  handle: product.handle,
  title: product.title,
  available: product.availableForSale,
  image: toImage(product.featuredImage),
  price: toMoney(product.priceRange.minVariantPrice),
  compareAtPrice: toCompareAtPrice(
    product.priceRange.minVariantPrice,
    product.compareAtPriceRange.minVariantPrice,
  ),
});

const toVariant = (variant: VariantPartsFragment): ProductVariant => ({
  id: variant.id,
  title: variant.title,
  available: variant.availableForSale,
  price: toMoney(variant.price),
  compareAtPrice: toCompareAtPrice(variant.price, variant.compareAtPrice),
  selectedOptions: variant.selectedOptions.map((option) => ({
    name: option.name,
    value: option.value,
  })),
  image: toImage(variant.image),
});

export const toProductListItem = (product: ListingProductPartsFragment): ProductListItem => ({
  ...toProductSummary(product),
  images: product.images.nodes
    .map((node) => toImage(node))
    .filter((img): img is ShopImage => img !== null),
  options: product.options.map((option) => ({ name: option.name, values: option.values })),
  variants: product.variants.nodes.map(toVariant),
});

export const toProduct = (product: ProductPartsFragment): Product => ({
  ...toProductListItem(product),
  description: product.description,
  descriptionHtml: product.descriptionHtml,
  productType: product.productType,
});

type CartLineNode = CartPartsFragment['lines']['nodes'][number];

const toCartLine = (line: CartLineNode): CartLine | null => {
  const merchandise = line.merchandise;
  if (!('id' in merchandise)) return null; // future non-variant merchandise
  return {
    id: line.id,
    quantity: line.quantity,
    cost: toMoney(line.cost.totalAmount),
    merchandise: {
      variantId: merchandise.id,
      variantTitle: merchandise.title,
      selectedOptions: merchandise.selectedOptions.map((option) => ({
        name: option.name,
        value: option.value,
      })),
      image: toImage(merchandise.image),
      price: toMoney(merchandise.price),
      productTitle: merchandise.product.title,
      productHandle: merchandise.product.handle,
    },
  };
};

export const toCart = (cart: CartPartsFragment): Cart => ({
  id: cart.id,
  checkoutUrl: cart.checkoutUrl,
  totalQuantity: cart.totalQuantity,
  subtotal: toMoney(cart.cost.subtotalAmount),
  total: toMoney(cart.cost.totalAmount),
  lines: cart.lines.nodes.map(toCartLine).filter((line): line is CartLine => line !== null),
});

export interface CollectionNode {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  readonly description: string;
  readonly image: ImagePartsFragment | null;
}

export const toCollection = (collection: CollectionNode): Collection => ({
  id: collection.id,
  handle: collection.handle,
  title: collection.title,
  description: collection.description,
  image: toImage(collection.image),
});

export interface FeaturedCollectionNode {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  readonly products: { readonly nodes: readonly ListingProductPartsFragment[] };
}

export const toFeaturedCollection = (collection: FeaturedCollectionNode): FeaturedCollection => ({
  id: collection.id,
  handle: collection.handle,
  title: collection.title,
  products: collection.products.nodes.map(toProductListItem),
});
