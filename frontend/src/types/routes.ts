/** Every navigable path in the app. Routes are never written as plain strings. */
export enum AppRoute {
  Home = '/',
  Products = '/products',
  Search = '/search',
  Saved = '/saved',
  Info = '/info',
}

/** Dynamic product detail route, derived from {@link AppRoute.Products}. */
export type ProductRoute = `${AppRoute.Products}/${string}`;

export const buildProductRoute = (handle: string): ProductRoute => `${AppRoute.Products}/${handle}`;

/** Informational pages reachable from the footer. The dynamic segment is
    guarded: anything that doesn't map onto a member 404s (fail closed). */
export enum InfoTopic {
  Shipping = 'shipping',
  Returns = 'returns',
  Payment = 'payment',
  TrackOrder = 'track-order',
  Terms = 'terms',
  Privacy = 'privacy',
  LegalNotice = 'legal-notice',
  Contact = 'contact',
}

export type InfoRoute = `${AppRoute.Info}/${InfoTopic}`;

export const buildInfoRoute = (topic: InfoTopic): InfoRoute => `${AppRoute.Info}/${topic}`;

/** Destinations outside the app (footer socials). Link opens these in a
    new tab with a safe rel — never written as plain strings either. */
export enum ExternalUrl {
  Instagram = 'https://instagram.com/exclusivewear',
  Telegram = 'https://t.me/exclusivewear',
}

/** Anything our shared Link primitive accepts as an internal href. */
export type NavigableRoute = AppRoute | ProductRoute | InfoRoute;

/** Static assets served from `frontend/public/`. */
export enum AssetRoute {
  ThemeInit = '/theme-init.js',
  /** Gif-like hero film (autoplay · muted · loop). The checked-in file is a
      generated dummy — swap it for real campaign footage, same filename. */
  CampaignFilm = '/campaign-film.webm',
  /** Mock community photography (Unsplash) — swap for real campaign shots. */
  CommunityPortraitOne = '/people/community-01.jpg',
  CommunityPortraitTwo = '/people/community-02.jpg',
  CommunityPortraitThree = '/people/community-03.jpg',
  CommunityPortraitFour = '/people/community-04.jpg',
}
