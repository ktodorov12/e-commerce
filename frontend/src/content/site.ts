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
      'Contemporary luxury menswear and womenswear — cut in Portugal, finished by hand.',
  },
  announcements: [
    'FREE SHIPPING OVER €200',
    'SUMMER SALE UP TO −70%',
    'NEW DROP: LINEN CAPSULE',
  ],
  nav: {
    shopAll: 'Shop All',
    home: 'Home',
    menuTitle: 'Menu',
    appearance: 'Appearance',
    appearanceNote: 'Follows system, one-tap override',
    day: 'DAY',
    night: 'NIGHT',
    auto: 'AUTO',
  },
  hero: {
    kicker: 'SS26 — DROP 02',
    headline: 'Quiet pieces, worn loud.',
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
    body: 'Every piece is produced in a single family-run atelier outside Porto — 40 people, no seasons rushed.',
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
    empty: 'Nothing here yet — check back after the next drop.',
    badgeNew: 'NEW',
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
    lineError: 'Something went wrong — try again.',
    shippingNote: 'Shipping and taxes calculated at checkout.',
  },
  a11y: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    openCart: 'Open bag',
    closeCart: 'Close bag',
    increaseQuantity: 'Increase quantity',
    decreaseQuantity: 'Decrease quantity',
    productImage: 'Product image',
    announcement: 'Announcements',
    galleryImage: 'Gallery image',
    themeSwitch: 'Appearance mode',
    toggleTheme: 'Switch between day and night theme',
    mainNavigation: 'Main navigation',
  },
} as const;

export type SiteContent = typeof siteContent;
