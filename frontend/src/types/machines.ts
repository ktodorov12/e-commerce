/** Machine ids (XState). */
export enum MachineId {
  Cart = 'cart',
  Menu = 'menu',
  ListingOverlay = 'listingOverlay',
  ProductListing = 'productListing',
}

/** Every event the cart machine understands. */
export enum CartEventType {
  OpenDrawer = 'cart.drawer.open',
  CloseDrawer = 'cart.drawer.close',
  ToggleDrawer = 'cart.drawer.toggle',
  AddLines = 'cart.lines.add',
  UpdateLine = 'cart.lines.update',
  RemoveLine = 'cart.lines.remove',
  BeginCheckout = 'cart.checkout.begin',
}

/** Cart machine state values, per parallel region. */
export enum CartDrawerState {
  Closed = 'closed',
  Open = 'open',
}

export enum CartSyncState {
  Idle = 'idle',
  Mutating = 'mutating',
  Redirecting = 'redirecting',
}

/** Which kind of cart mutation is in flight. */
export enum CartMutationKind {
  AddLines = 'addLines',
  UpdateLine = 'updateLine',
  RemoveLine = 'removeLine',
}

/** Listing overlays (filter sheet, quick-pick sheet) machine. */
export enum ListingOverlayEventType {
  OpenFilters = 'listing.filters.open',
  CloseFilters = 'listing.filters.close',
  OpenQuickPick = 'listing.quick-pick.open',
  CloseQuickPick = 'listing.quick-pick.close',
}

export enum ListingOverlayState {
  Idle = 'idle',
  Filters = 'filters',
  QuickPick = 'quickPick',
}

/** Listing pagination (infinite scroll) machine. */
export enum ProductListingEventType {
  LoadMore = 'productListing.loadMore',
}

export enum ProductListingState {
  Idle = 'idle',
  LoadingMore = 'loadingMore',
}

/** Menu (full-screen burger) machine. */
export enum MenuEventType {
  Open = 'menu.open',
  Close = 'menu.close',
  Toggle = 'menu.toggle',
}

export enum MenuState {
  Closed = 'closed',
  Open = 'open',
}
