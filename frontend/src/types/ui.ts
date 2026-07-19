/** Variants of the shared Button primitive (styles are token-driven). */
export enum ButtonVariant {
  /** Primary commerce CTA — ink-filled on day, accent-outlined on night. */
  Cta = 'cta',
  /** Secondary — hairline divider outline. */
  Outline = 'outline',
  /** Tertiary — accent text, no border. */
  Ghost = 'ghost',
  /** Bottom-dock item — quiet chrome, no own text color (caller sets it). */
  Dock = 'dock',
}

export enum ButtonSize {
  Md = 'md',
  Lg = 'lg',
  Icon = 'icon',
  /** Fills a dock cell: full height, equal flex share, stacked content. */
  Dock = 'dock',
}

export enum TagVariant {
  Accent = 'accent',
  Outline = 'outline',
  Neutral = 'neutral',
}

export enum DrawerSide {
  Right = 'right',
  Full = 'full',
  /** Bottom sheet (design 1d) — filter and quick-pick panels. */
  Bottom = 'bottom',
}

/** Visual treatments for curated collection capsules (CollectionsShowcase). */
export enum CapsuleTone {
  /** Light surface fading into the accent tint — new-in energy. */
  Fresh = 'fresh',
  /** Accent tint fading into the ground — cool and quiet. */
  Frost = 'frost',
  /** Accent-outlined tint flood — the one loud commerce moment. */
  Sale = 'sale',
  /** Ink flood with light type (indigo tint on night) — limited runs. */
  Gold = 'gold',
}
