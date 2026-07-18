/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/**
 * A custom key-value pair that stores additional information on a [cart](https://shopify.dev/docs/api/storefront/current/objects/Cart) or [cart line](https://shopify.dev/docs/api/storefront/current/objects/CartLine). Attributes capture additional information like gift messages, special instructions, or custom order details. Learn more about [managing carts with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).
 *
 */
export type AttributeInput = {
  /** Key or name of the attribute. */
  key: string;
  /** Value of the attribute. */
  value: string;
};

/**
 * The input fields for adding a merchandise line to a cart. Each line represents a [`ProductVariant`](https://shopify.dev/docs/api/storefront/current/objects/ProductVariant) the buyer intends to purchase, along with the quantity and optional [`SellingPlan`](https://shopify.dev/docs/api/storefront/current/objects/SellingPlan) for subscriptions.
 *
 * Used by the [`cartCreate`](https://shopify.dev/docs/api/storefront/current/mutations/cartCreate) mutation when creating a cart with initial items, and the [`cartLinesAdd`](https://shopify.dev/docs/api/storefront/current/mutations/cartLinesAdd) mutation when adding items to an existing cart.
 *
 */
export type CartLineInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: Array<AttributeInput> | null | undefined;
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: string | number;
  /** The parent line item of the cart line. */
  parent?: CartLineParentInput | null | undefined;
  /** The quantity of the merchandise. */
  quantity?: number | null | undefined;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: string | number | null | undefined;
};

/** The parent line item of the cart line. */
export type CartLineParentInput = {
  /** The id of the parent line item. */
  lineId?: string | number | null | undefined;
  /** The ID of the parent line merchandise. */
  merchandiseId?: string | number | null | undefined;
};

/**
 * The input fields for updating a merchandise line in a cart. Used by the [`cartLinesUpdate`](https://shopify.dev/docs/api/storefront/current/mutations/cartLinesUpdate) mutation.
 *
 * Specify the line item's [`id`](https://shopify.dev/docs/api/storefront/current/input-objects/CartLineUpdateInput#fields-id) along with any fields to modify. You can change the quantity, swap the merchandise, update custom attributes, or associate a different selling plan.
 *
 */
export type CartLineUpdateInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: Array<AttributeInput> | null | undefined;
  /** The ID of the merchandise line. */
  id: string | number;
  /** The ID of the merchandise for the line item. */
  merchandiseId?: string | number | null | undefined;
  /** The quantity of the line item. */
  quantity?: number | null | undefined;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: string | number | null | undefined;
};

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares Soberanos (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/**
 * Sorting options for the [`products`](https://shopify.dev/docs/api/storefront/current/queries/products) query. Supports sorting products by criteria such as best-selling and price, and by product attributes such as type, and vendor.
 *
 * > Note: Use the [`RELEVANCE`](https://shopify.dev/docs/api/storefront/current/enums/ProductSortKeys#enums-RELEVANCE) key only when a search query is specified.
 *
 */
export type ProductSortKeys =
  /** Sort by the `best_selling` value. */
  | 'BEST_SELLING'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `price` value. */
  | 'PRICE'
  /** Sort by the `product_type` value. */
  | 'PRODUCT_TYPE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT'
  /** Sort by the `vendor` value. */
  | 'VENDOR';

export type MoneyPartsFragment = { amount: string, currencyCode: CurrencyCode };

export type ImagePartsFragment = { url: string, altText: string | null, width: number | null, height: number | null };

export type ProductCardPartsFragment = { id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null, width: number | null, height: number | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } };

export type ProductPartsFragment = { description: string, descriptionHtml: string, productType: string, id: string, handle: string, title: string, availableForSale: boolean, images: { nodes: Array<{ url: string, altText: string | null, width: number | null, height: number | null }> }, options: Array<{ name: string, values: Array<string> }>, variants: { nodes: Array<{ id: string, title: string, availableForSale: boolean, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice: { amount: string, currencyCode: CurrencyCode } | null, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null }> }, featuredImage: { url: string, altText: string | null, width: number | null, height: number | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } };

export type VariantPartsFragment = { id: string, title: string, availableForSale: boolean, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice: { amount: string, currencyCode: CurrencyCode } | null, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null };

export type CartPartsFragment = { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
      | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
      | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
    > } };

export type GetProductsQueryVariables = Exact<{
  first: number;
  sortKey?: ProductSortKeys | null | undefined;
  reverse?: boolean | null | undefined;
  query?: string | null | undefined;
}>;


export type GetProductsQuery = { products: { nodes: Array<{ id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null, width: number | null, height: number | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } }> } };

export type GetProductByHandleQueryVariables = Exact<{
  handle: string;
}>;


export type GetProductByHandleQuery = { product: { description: string, descriptionHtml: string, productType: string, id: string, handle: string, title: string, availableForSale: boolean, images: { nodes: Array<{ url: string, altText: string | null, width: number | null, height: number | null }> }, options: Array<{ name: string, values: Array<string> }>, variants: { nodes: Array<{ id: string, title: string, availableForSale: boolean, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice: { amount: string, currencyCode: CurrencyCode } | null, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null }> }, featuredImage: { url: string, altText: string | null, width: number | null, height: number | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } } | null };

export type GetCollectionsQueryVariables = Exact<{
  first: number;
}>;


export type GetCollectionsQuery = { collections: { nodes: Array<{ id: string, handle: string, title: string, description: string, image: { url: string, altText: string | null, width: number | null, height: number | null } | null }> } };

export type GetFeaturedCollectionQueryVariables = Exact<{
  productsCount: number;
}>;


export type GetFeaturedCollectionQuery = { collections: { nodes: Array<{ id: string, handle: string, title: string, products: { nodes: Array<{ id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null, width: number | null, height: number | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } }> } }> } };

export type GetCartQueryVariables = Exact<{
  cartId: string | number;
}>;


export type GetCartQuery = { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
        | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
        | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
      > } } | null };

export type CartCreateMutationVariables = Exact<{
  lines?: Array<CartLineInput> | CartLineInput | null | undefined;
}>;


export type CartCreateMutation = { cartCreate: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
        > } } | null, userErrors: Array<{ field: Array<string> | null, message: string }> } | null };

export type CartLinesAddMutationVariables = Exact<{
  cartId: string | number;
  lines: Array<CartLineInput> | CartLineInput;
}>;


export type CartLinesAddMutation = { cartLinesAdd: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
        > } } | null, userErrors: Array<{ field: Array<string> | null, message: string }> } | null };

export type CartLinesUpdateMutationVariables = Exact<{
  cartId: string | number;
  lines: Array<CartLineUpdateInput> | CartLineUpdateInput;
}>;


export type CartLinesUpdateMutation = { cartLinesUpdate: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
        > } } | null, userErrors: Array<{ field: Array<string> | null, message: string }> } | null };

export type CartLinesRemoveMutationVariables = Exact<{
  cartId: string | number;
  lineIds: Array<string | number> | string | number;
}>;


export type CartLinesRemoveMutation = { cartLinesRemove: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, selectedOptions: Array<{ name: string, value: string }>, image: { url: string, altText: string | null, width: number | null, height: number | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { title: string, handle: string } } }
        > } } | null, userErrors: Array<{ field: Array<string> | null, message: string }> } | null };

export const ImagePartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<ImagePartsFragment, unknown>;
export const MoneyPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}}]} as unknown as DocumentNode<MoneyPartsFragment, unknown>;
export const ProductCardPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCardParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPriceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}}]} as unknown as DocumentNode<ProductCardPartsFragment, unknown>;
export const VariantPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VariantParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<VariantPartsFragment, unknown>;
export const ProductPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCardParts"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"descriptionHtml"}},{"kind":"Field","name":{"kind":"Name","value":"productType"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VariantParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCardParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPriceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VariantParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}}]}}]} as unknown as DocumentNode<ProductPartsFragment, unknown>;
export const CartPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchandise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<CartPartsFragment, unknown>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSortKeys"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reverse"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"reverse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reverse"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCardParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCardParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPriceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductByHandleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductByHandle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCardParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPriceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VariantParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCardParts"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"descriptionHtml"}},{"kind":"Field","name":{"kind":"Name","value":"productType"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VariantParts"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductByHandleQuery, GetProductByHandleQueryVariables>;
export const GetCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetFeaturedCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsCount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCardParts"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCardParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"availableForSale"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"compareAtPriceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minVariantPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedCollectionQuery, GetFeaturedCollectionQueryVariables>;
export const GetCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchandise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const CartCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lines"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartLineInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lines"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lines"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchandise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CartCreateMutation, CartCreateMutationVariables>;
export const CartLinesAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartLinesAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lines"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartLineInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLinesAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lines"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lines"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchandise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CartLinesAddMutation, CartLinesAddMutationVariables>;
export const CartLinesUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartLinesUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lines"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartLineUpdateInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLinesUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lines"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lines"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchandise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CartLinesUpdateMutation, CartLinesUpdateMutationVariables>;
export const CartLinesRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartLinesRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLinesRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoneyParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchandise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"selectedOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoneyParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CartLinesRemoveMutation, CartLinesRemoveMutationVariables>;