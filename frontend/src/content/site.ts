import { BrandFilter, GenderFilter, TypeFilter } from '@/types/catalog';
import { InfoTopic } from '@/types/routes';
import { CapsuleTone } from '@/types/ui';

/**
 * All user-facing copy, centralized. Wording comes from design/
 * ("Exclusive Wear — Mobile Concepts"). Keeping copy here keeps
 * components free of loose strings and makes a future i18n pass trivial.
 */
export const siteContent = {
  brand: {
    name: 'EXCLUSIVE WEAR',
    legalName: 'Exclusive Wear',
    description:
      'Contemporary luxury menswear and womenswear. Cut in Portugal, finished by hand.',
  },
  nav: {
    shopAll: 'Shop All',
    home: 'Home',
    search: 'Search',
    saved: 'Saved',
    bag: 'Bag',
    menuTitle: 'Menu',
    appearance: 'Appearance',
    appearanceNote: 'Follows system, one-tap override',
    day: 'DAY',
    night: 'NIGHT',
    auto: 'AUTO',
    currency: 'Currency',
    currencyNote: 'Display only, checkout uses store currency',
    currencyEur: '€ EUR',
    currencyUsd: '$ USD',
    currencyBgn: 'лв BGN',
  },
  hero: {
    headline: 'Quiet pieces, worn loud.',
    tagline: 'Premium, quiet essentials for a modern mindset.',
    ctaPrimary: 'For Him',
    ctaSecondary: 'For Her',
  },
  newArrivals: {
    title: 'New Arrivals',
    viewAll: 'VIEW ALL →',
  },
  atelier: {
    kicker: 'THE ATELIER',
    headline: 'Cut in Portugal. Finished by hand.',
    body: 'Every piece is produced in a single family-run atelier outside Porto: 40 people, no seasons rushed.',
  },
  collections: {
    title: 'Collections',
    /** Curated capsules shown next to the backend collections — they all
        route to the listing until per-collection pages exist. */
    curated: [
      { label: 'New Arrivals', note: 'Fresh from the atelier', tone: CapsuleTone.Fresh },
      { label: 'Winter Capsule', note: 'Layered for the cold', tone: CapsuleTone.Frost },
      { label: 'Promo', note: 'Up to −70%', tone: CapsuleTone.Sale },
      { label: 'Special Edition', note: 'One run, numbered', tone: CapsuleTone.Gold },
    ],
  },
  community: {
    kicker: 'THE PEOPLE',
    title: 'Worn out there',
    handle: '@EXCLUSIVEWEAR',
    captions: {
      portraitOne: 'Mara, Porto',
      portraitTwo: 'Theo, Copenhagen',
      portraitThree: 'Amira, Milan',
      portraitFour: 'Jonas, Antwerp',
    },
  },
  searchPage: {
    kicker: 'FIND A PIECE',
    title: 'Search',
    body: 'Search is being tailored. Browse the full collection meanwhile.',
    cta: 'Shop all pieces',
  },
  savedPage: {
    title: 'Saved',
    body: 'Nothing saved yet. Tap the heart on a piece to keep it here.',
    cta: 'Discover the drop',
  },
  notFoundPage: {
    kicker: '404',
    title: 'Page not found',
    body: 'This page does not exist or has moved. The collection is a tap away.',
    cta: 'Continue shopping',
  },
  footer: {
    customerService: 'Customer service',
    about: 'About us',
    follow: 'Follow',
    regionTitle: 'Region',
    region: 'BE · € · EN',
    serviceLinks: [
      { topic: InfoTopic.Shipping, label: 'Shipping' },
      { topic: InfoTopic.Returns, label: 'Returns' },
      { topic: InfoTopic.Payment, label: 'Payment' },
      { topic: InfoTopic.TrackOrder, label: 'Track order' },
    ],
    aboutLinks: [
      { topic: InfoTopic.Terms, label: 'Terms & conditions' },
      { topic: InfoTopic.Privacy, label: 'Privacy policy' },
      { topic: InfoTopic.LegalNotice, label: 'Legal notice' },
      { topic: InfoTopic.Contact, label: 'Contact' },
    ],
    socialInstagram: 'Instagram',
    socialTelegram: 'Telegram',
    payments: ['VISA', 'MASTERCARD', 'PAYPAL', 'KLARNA'],
  },
  info: {
    kicker: 'INFORMATION',
    cta: 'Continue shopping',
    topics: {
      [InfoTopic.Shipping]: {
        title: 'Shipping',
        body: '2–4 day delivery across Europe with tracked couriers. Orders placed before 14:00 CET leave the atelier the same day.',
      },
      [InfoTopic.Returns]: {
        title: 'Returns',
        body: 'Free returns within a 14-day window, unworn, tags attached. Register the return from your order email and drop the parcel at any pickup point.',
      },
      [InfoTopic.Payment]: {
        title: 'Payment',
        body: 'Visa, Mastercard, PayPal, Klarna and cash on delivery. Every payment runs through Shopify checkout. Card details never touch our servers.',
      },
      [InfoTopic.TrackOrder]: {
        title: 'Track order',
        body: 'A tracking link arrives by email the moment your parcel leaves the atelier, and updates within a few hours of courier pickup.',
      },
      [InfoTopic.Terms]: {
        title: 'Terms & conditions',
        body: 'The legal terms governing orders, delivery and returns. The full document ships with the launch release.',
      },
      [InfoTopic.Privacy]: {
        title: 'Privacy policy',
        body: 'We collect only what an order needs: no tracking pixels, no resold data. The full policy ships with the launch release.',
      },
      [InfoTopic.LegalNotice]: {
        title: 'Legal notice',
        body: 'Exclusive Wear, registered in Portugal. Full company details are published with the launch release.',
      },
      [InfoTopic.Contact]: {
        title: 'Contact',
        body: 'Write to hello@exclusivewear.example. We answer within one business day, Monday to Friday.',
      },
    },
  },
  loading: {
    label: 'Loading',
  },
  trust: [
    { title: '2–4 day delivery', note: 'Based in Europe' },
    { title: 'Free returns', note: '14-day window' },
    { title: 'Cash on delivery', note: 'Pay on receipt' },
    { title: 'Secure payment', note: 'Stripe' },
  ],
  listing: {
    title: 'All Pieces',
    pieceCountSingular: 'piece',
    pieceCountPlural: 'pieces',
    sortLabel: 'Sort',
    sortNewest: 'Newest',
    sortPriceAsc: 'Price ↑',
    sortPriceDesc: 'Price ↓',
    availabilityInStock: 'In stock',
    empty: 'Nothing here yet. Check back after the next drop.',
    badgeNew: 'NEW',
    /** "Men · Tops" heading composition (facet · value joiners). */
    headingFacetJoiner: ' · ',
    headingValueJoiner: ' & ',
    filters: {
      trigger: 'Filter',
      title: 'Filter',
      typeGroup: 'TYPE',
      genderGroup: 'GENDER',
      brandGroup: 'BRAND',
      priceGroup: 'PRICE',
      availabilityGroup: 'AVAILABILITY',
      priceFrom: 'From',
      priceTo: 'To',
      removeAll: 'Remove all',
      apply: 'Apply',
      typeLabels: {
        [TypeFilter.Tops]: 'Tops',
        [TypeFilter.Bottoms]: 'Bottoms',
        [TypeFilter.Shoes]: 'Shoes',
        [TypeFilter.Accessories]: 'Accessories',
      },
      genderLabels: {
        [GenderFilter.Men]: 'Men',
        [GenderFilter.Women]: 'Women',
      },
      brandLabels: {
        [BrandFilter.MockShop]: 'Mock.shop',
      },
    },
    quickPick: {
      title: 'Quick add',
      quantity: 'Quantity',
    },
  },
  pdp: {
    galleryHint: 'SWIPE →',
    optionsKicker: 'SELECT',
    soldOut: 'sold out',
    addToBag: 'Add to Bag',
    adding: 'Adding…',
    unavailable: 'Unavailable',
    detailsTitle: 'Details & composition',
    shippingTitle: 'Shipping & returns',
    shippingBody:
      '2–4 day delivery across Europe. Free returns within a 14-day window. Cash on delivery available.',
    careTitle: 'Care',
    careBody: 'Wash cold, inside out. Lay flat to dry. No tumble drying.',
    notFound: 'This piece is no longer available.',
  },
  cart: {
    title: 'Bag',
    empty: 'Your bag is empty.',
    emptyCta: 'Shop the drop',
    subtotal: 'Subtotal',
    checkout: 'Checkout',
    redirecting: 'Opening checkout…',
    remove: 'Remove',
    lineError: 'Something went wrong. Try again.',
    shippingNote: 'Shipping and taxes calculated at checkout.',
  },
  a11y: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    openCart: 'Open bag',
    closeCart: 'Close bag',
    openFilters: 'Open filters',
    closeFilters: 'Close filters',
    addToSaved: 'Save piece',
    removeFromSaved: 'Remove from saved',
    quickAdd: 'Quick add to bag',
    closeQuickAdd: 'Close quick add',
    increaseQuantity: 'Increase quantity',
    decreaseQuantity: 'Decrease quantity',
    productImage: 'Product image',
    galleryImage: 'Gallery image',
    themeSwitch: 'Appearance mode',
    currencySwitch: 'Display currency',
    mainNavigation: 'Main navigation',
    bottomNavigation: 'Primary',
  },
} as const;

export type SiteContent = typeof siteContent;
