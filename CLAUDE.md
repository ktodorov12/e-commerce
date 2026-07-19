# CLAUDE.md — Exclusive Wear

A custom **headless Shopify storefront**. Shopify is the backend engine (products, cart,
checkout, orders, admin). We own only the **frontend** (`frontend/`) and a **typed Storefront
API layer** (`shopify/`). This is a portfolio-grade codebase: clean architecture, strict typing,
readability over cleverness. _Clarity in 2 years beats cleverness today._

This file is a **living document** — keep it concise and correct as the code evolves.

## Stack (fixed — never substitute, never add deps without asking)

| Concern         | Choice                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| Framework       | Next.js (latest stable, **App Router** — Next owns all routing)           |
| Language        | TypeScript **5.9.3** (stable), **strict** everywhere, `tsc --noEmit` per package. TS 7-native breaks the lint ecosystem — see README "Toolchain notes". |
| Styling         | Tailwind CSS v4 (**CSS-first** `@theme`), theme driven by design tokens   |
| Animation       | **GSAP or plain CSS** transitions/keyframes only — no framer-motion, etc. Respect `prefers-reduced-motion` |
| Domain state    | **Zustand** (mini-store per domain, slices to avoid cross-store imports)  |
| Interaction state | **XState** (drawers, add-to-cart flow, checkout steps, filter panels)    |
| Backend data    | **Shopify Storefront API** (GraphQL) with GraphQL Codegen types           |
| Package manager | **pnpm** workspaces                                                        |

Do not add dependencies beyond these without asking first.

---

## Golden rules (non-negotiable)

### 1. Never use plain strings

Every meaningful string — routes, query keys, storage/cookie keys, event names, statuses,
variant/option names, breakpoints, Shopify resource types/handles — lives in a **typed enum in
`types/`** (or the shared `shopify/` types) and is always referenced through the enum. If a
library API demands a string-literal union, **derive it** from the enum (`keyof typeof`, template
literal types) — never duplicate the value. This applies to **design values too**: components
consume Tailwind token classes, never raw hex/px/font names.

Existing sources of truth: `types/routes.ts`, `types/keys.ts`, `types/machines.ts`,
`types/catalog.ts`, `types/theme.ts`, `types/ui.ts`, `types/i18n.ts`, and `shopify` enums
(`ProductSort`, `ShopifyEnvVar`, `StorefrontProvider`, …).

### 2. Split components; minimize parent re-renders

Push state **down** to the leaf that needs it. Isolate heavy subtrees via composition / `children`.
Apply `React.memo` **only where it demonstrably prevents re-renders**. If a component both owns
state and renders heavy children, split it.

**Reuse components — one component per concept.** A concept renders through the same component
everywhere it appears; never grow a parallel variant per page. (The product card on the home rail
**is** the listing's `ListingProductCard`, the pickers everywhere are the one `SegmentedControl`.)
If a surface needs a different look, extend the shared component with a prop — don't fork it.

### 3. XState owns interaction state

_What is clicked, what is in flight, what step we're on_ — drawer open/close lifecycle,
add-to-cart flow, checkout steps, filter panels. Machines are fully typed, live in `machines/`,
and are consumed through small hooks (`hooks/useCartMachine.ts`, `hooks/useMenuMachine.ts`,
`hooks/useListingOverlayMachine.ts` — the listing's filter sheet + quick-pick sheet).

### 4. Zustand owns domain state

_Cart contents, product cache, UI preferences_ — as **mini stores per domain**. **No cross-store
imports, ever.** When stores would otherwise import each other, split them into **slices** — slices
exist specifically to avoid circular store dependencies. (`cartStore` is built slices-first.)

### 5. The store recipe (exact — every store, no ad-hoc `create()`)

1. Base store via vanilla `createStore` from `zustand/vanilla` (state + actions).
2. Wrap it in a typed hook via the generic factory `createStoreHook<TState>(store)` →
   `useXStore<TSelected>(selector)`.
3. Under the hood use `useStoreWithEqualityFn` from `zustand/traditional` with our custom
   `deepEqual` as the compare fn — re-renders are skipped when selectors return recreated but
   structurally unchanged arrays/objects.
4. Merge the selected result via `Object.assign` into a **stable container** per hook instance.
5. `deepEqual` lives in `utils/deepEqual.ts`, handles arrays / nested objects / Dates / NaN, is
   unit-tested, and is the **single** equality fn used by all store hooks.

Consequence (documented in `createStoreHook.ts`): the container identity is stable, so **do not**
put the selected object in dependency arrays or memo props — select the primitive fields you
depend on. Selectors must return a **consistent shape** (no conditionally-missing keys).

### 6. Typecheck & lint constantly — never leave the repo red

After every meaningful change: `pnpm typecheck` and `pnpm lint`, fix before moving on.

### 7. Routing & animation

Next **App Router only** (no custom router). Animations **GSAP or plain CSS only**, always gated by
`prefers-reduced-motion` (motion tokens live in `styles/tokens.css`).

---

## Naming — long, explicit, understandable

Prefer **long, self-explanatory names** over short or clever ones. A reader two years from now
should understand a name without chasing its definition.

- Functions read as verbs describing the full action: `resolveStorefrontConfig`, `buildProductRoute`,
  `persistCartId`, `unwrapCartPayload` — not `cfg`, `mk`, `handle2`.
- Booleans read as assertions: `availableOnly`, `isEmpty`, `hydrated`, `reducedMotion`.
- No unexplained abbreviations, no single letters except tight loop indices. Enum **members** are
  spelled out (`ProductSort.PriceDesc`, `CartEventType.BeginCheckout`).
- Clarity beats brevity every time. If a name needs a comment to explain what it holds, rename it.

**No em dashes in copy.** UI text in `content/site.ts`, alt text, and inline labels never uses an
em dash. Use a period, comma, or colon instead; a normal dash (`-`) is fine for short label/value
pairs, matching the footer's region line.

---

## Security — never trust user input at the query boundary

**We must not let users send anything to the backend that they authored.** Treat every value that
originates from the user — URL path segments, search params, form fields, request headers,
client-set cookies — as **untrusted**. Such a value **never reaches a Storefront query/mutation as-is.**

### Fail closed, not fail soft

For every user-supplied query value there is a **canonical internal domain** — an enum or an explicit
allowlist in `types/`. "Parsing" means **mapping the raw string onto a member of that domain**:

- **Absent** value → use the documented default. (The user sent nothing — that's fine.)
- **Present and maps** to a known member → use it.
- **Present and does _not_ map** → **throw a typed error.** Do **not** silently default, and do
  **not** forward it. If the URL carries a value we never emit, the internal query and the URL query
  **differ** — reject the request rather than letting it through.

Concretely: the app owns the **canonical** query state; the URL is a **projection** of it. When
reading the URL, reconstruct the canonical state and assert it **round-trips** (re-serializing the
parsed state equals the incoming param). If it doesn't round-trip, throw.

Implemented by `utils/queryParam.ts` (`parseEnumParam`, `parseEnumListParam`,
`parseWholeNumberParam`): absent → default, present-and-valid → the domain member, anything
non-canonical (unknown value, repeated param, duplicate/reordered list tokens, signed/zero-padded
numbers, an inverted price range) → `InvalidQueryParamError`. `app/products/page.tsx` uses them for
the whole listing query state (`sort`, `availability`, `type`, `gender`, `brand`,
`price-min`/`price-max`) and `utils/listingUrl.ts` is the one serializer emitting that projection.
Tradeoff (accepted): a hand-typed bad `?sort=` shows an error boundary instead of the default
listing.

### The only user-derived strings allowed near Shopify

Opaque identifiers **the server itself issued and stored server-side**, and even these are
**shape-validated** first:

- **Cart id** — read from an `httpOnly` cookie (`CookieKey.CartId`), never from the client body.
- **Merchandise / variant + line ids** — `isShopifyId` shape-validates the GID (`gid://shopify/…`)
  before use, not merely "non-empty string" (`app/actions/cart.ts` → `assertId`).
- **Product `handle`** — `isShopifyHandle` validates a strict handle format before
  `getProductByHandle`; a miss is `notFound()`, never a raw error surface.

(Same discipline off-Shopify: `app/info/[topic]` maps its segment onto the `InfoTopic` enum and
404s anything else — no user-authored string ever selects content by interpolation.)

(`isShopifyId` / `isShopifyHandle` live in the `shopify` package — the Shopify shapes stay in the
Shopify layer.)

### Never render un-sanitized HTML

**No `dangerouslySetInnerHTML`.** It is banned even for "trusted" content — an inline string is a
foot-gun and backend HTML is an XSS surface. The pre-paint theme script is a **static asset**
(`public/theme-init.js`) loaded via `next/script`, not an inline string. Backend rich text (e.g.
Shopify `descriptionHtml`) must be **sanitized** with a vetted sanitizer before it can be rendered —
until then, render the plain-text field. (The PDP "Details & composition" block is disabled pending
this; see `app/products/[handle]/page.tsx`.)

### Guard every boundary

Put a **guard** on every navigable boundary — route-segment params, search params, and (when auth
arrives) every authenticated-route and **login** transition. A guard **validates inputs and
authorization _before_ any data fetch**. Server Actions are **public endpoints**: they authenticate
and validate **every** input at the top of the action, not just at the call site (aligns with the
Vercel `server-auth-actions` rule). `app/actions/cart.ts` already validates quantity + id and keeps
the Storefront token server-side — extend that discipline to every new action and loader.

---

## Design tokens (source of truth: `design/`)

**Read everything in `design/` before building any UI.** Two runtime palettes, swapped by
`html[data-theme='day' | 'night']`:

- **Night — Nocturne**: near-neutral blue-grey ground `#161826`, ink `#e9e9ed`, single blurple
  accent `#9184d9` used as a **line and a glow, never a flood**. Outlined primary buttons.
- **Day — Ivory & Gold**: warm ivory ground, near-black warm ink, champagne gold as a line/kicker;
  the commerce CTA inverts to an ink-filled button.

Both are defined in `styles/tokens.css` and mapped into Tailwind via `@theme inline`, with Tailwind's
default palette **dropped** (`--color-*: initial`). Utilities are role-based and mode-aware:
`bg-ground`, `bg-surface`, `text-ink`, `text-ink-muted`, `text-accent`, `border-divider`,
`bg-cta`/`text-cta-text`/`border-cta-border`, `shadow-sm|md|lg`, `text-h1…h6`, `rounded-sm|md|lg`.
Density is **0.70×** (`--spacing: 2.8px`), radii 4/8/14 (+24 `xl`, reserved for the bottom
dock's wave), Inter (`--font-sans`) plus a script
accent face (Great Vibes, `--font-script` / `font-script`) reserved for the hero welcome line,
headings capped at weight 500 (hierarchy by size + space, never bolding). Icons: **lucide-react**, wrapped once in
`lib/shared/icons.tsx` — the **only** lucide import point; the wrapper pins the house style
(18px, 1.5 stroke, `aria-hidden`), so components never import lucide directly.

**Components consume tokens only — never a raw hex, px, or font name.** Rule 1 applies to design values.

**Concentric corners:** nested rounded boxes follow `R_inner + distance = R_outer` — never two radius
tokens picked by eye. The shell declares its geometry once (`concentric-shell-<padding-step>`, a
rounded-md box with the standard 1px border); children hugging its curve use `rounded-concentric`,
which derives the radius from the shell's variables (`globals.css`). SegmentedControl and the
quantity steppers are the references.

### Composition rules (mobile-first — apply to every screen)

- **Mobile first.** Style the ~390px layout first; `md:` only widens or relaxes it. Never design
  desktop-down.
- **Type runs small.** The fixed scale is deliberately compact (`text-h1` = 34px). Hierarchy comes
  from size steps, space and letterspacing — never from scaling text up. If a heading feels big, it
  is: step down.
- **Every element is inset.** Content never runs edge-to-edge: sections keep the `px-6` gutter,
  media and cards sit in **rounded wells inside it**, floating chrome is inset from the viewport
  edge. The page ground is the only full-bleed surface. No negative-margin "breakout" tricks.
  **One sanctioned exception:** the homepage campaign hero bleeds edge-to-edge and fills the
  viewport below the top bar — a **gif-like film** (autoplay · muted · loop, reduced-motion
  gated), overlaid with a script welcome line and two compact CTAs. The checked-in
  `public/campaign-film.webm` is a generated dummy; swap it for real footage, same filename.
- **Navigation (chosen pattern):** no announcement bar. The top bar carries the wordmark only
  (the wordmark is the Home link) and exists **only at the very top of the page** — scroll and it
  drops away for good (transform-only via `hooks/useScrollChrome.ts`, so nothing jitters).
  Primary wayfinding is the **bottom dock** (`components/layout/BottomDock.tsx`, design 1b/1i,
  YouTube-style): **full-width and flush to the bottom edge on every page**, icon-only Home /
  Shop / Search / Saved / Bag / Menu. Its top corners curve down into the screen edges (the
  "wave", `rounded-t-xl`) so the pill reads as spilling out to the edges, ground visible above
  the curves. Page content clears it via the `dock-clearance` body utility. The burger opens a
  full-screen menu of **grid tiles** — the four destinations plus the appearance and currency
  preference switches (currency is display-only until multi-market backends land).

---

## Architecture map (`frontend/src`)

```
app/            Routes (App Router). Thin — compose feature components, own loaders/guards.
  actions/      Server Actions (public endpoints: authenticate + validate every input).
lib/shared/     Wrapper primitives we own: Button, Input, Link, Price, ProductImage, Drawer,
                Skeleton, Accordion, SegmentedControl, Tag, EmptyState, icons. Feature code
                never uses raw <button>/<input>/<a> — always the typed wrapper.
components/     Feature folders: product/, cart/, collection/, home/, layout/.
stores/         Zustand: createStoreHook factory + typed hook, per-domain mini stores/slices.
machines/       XState machines (cart, menu) + their React context providers.
types/          Enums + shared types — enums are the ONLY source of string values.
hooks/ utils/ styles/ content/ fonts/
```

`shopify/` (workspace package) exposes **domain functions, not raw GraphQL**: `getProducts`,
`getProductByHandle`, `getCollections`, `getFeaturedCollection`, `getCart`, `cartCreate`,
`cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`. The frontend imports only these + their types.
Provider is **swappable via env only** (mock.shop → real store, zero code changes) — see
`shopify/src/config.ts` and root `.env.example`. Checkout = create cart, redirect to Shopify's
hosted `checkoutUrl`. **We build no payment UI.**

If a file has no obvious home, **propose one — don't dump.**

---

## React & Next.js performance (from Vercel `react-best-practices`, condensed)

Full detail: <https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices>.
Apply top-to-bottom by priority; the first two categories are **critical**.

**1. Eliminate waterfalls (CRITICAL)** — check cheap/sync conditions before awaiting; defer `await`
into the branch that uses it; start independent async work immediately and join with `Promise.all`;
don't chain independent fetches in API routes; use Suspense boundaries to stream wrapper UI first.

**2. Bundle size (CRITICAL)** — no barrel-file imports (import from source); load large modules/data
only when a feature activates; defer non-critical third-party libs until after hydration;
`next/dynamic` for heavy components; prefer statically analyzable import paths; preload on user
intent (hover/focus).

**3. Server-side (HIGH)** — authenticate/authorize **inside every Server Action**; minimize what
crosses the RSC boundary (only fields the client uses) and don't double-serialize; keep request data
out of module-level mutable state; `React.cache()` for per-request dedup; hoist static I/O to module
level; LRU for cross-request sharing; `after()` for non-blocking logging/analytics; parallelize
nested/independent fetches.

**4. Client data fetching (MEDIUM-HIGH)** — dedupe global listeners; passive touch/wheel listeners;
**version + minimize localStorage** keys (we already do: `StorageKey.ThemePreference = 'ew.theme.v1'`).
_(SWR guidance here is not adopted — see Conflicts.)_

**5. Re-render (MEDIUM)** — derive during render (not state/effects); read state at usage point;
no `useMemo` for trivial primitive expressions; **never define components inside components**;
extract non-primitive memo defaults to constants; narrow effect deps to primitives; put interaction
logic in event handlers; functional `setState`; lazy `useState` init; transitions / `useDeferredValue`
for non-urgent or expensive updates; `useRef` for transient values.

**6. Rendering (MEDIUM)** — animate an SVG **wrapper** for HW acceleration; `content-visibility:auto`
for long lists; hoist static JSX; prevent hydration flicker with an inline pre-hydration script (we
do this in `components/layout/ThemeScript.tsx`); `suppressHydrationWarning` only for known diffs;
`<Activity>` for frequently toggled subtrees; `defer`/`async` scripts; explicit ternaries (not `&&`)
to avoid rendering `0`; resource hints; prefer `useTransition` over manual loading flags.

**7. JavaScript (LOW-MEDIUM)** — batch DOM writes before reads; `Map`/`Set` for O(1) lookups and
index maps; cache property access / function results / storage reads; single-pass `filter+map`
(`flatMap`); early-return / early length checks; hoist `RegExp`; loop for min/max; `toSorted()` over
`sort()`.

**8. Advanced (LOW)** — keep effect events out of dep arrays (`useEffectEvent`); init app once at
module level; store handlers in refs for stable identity.

---

## Conflicts with the Vercel skill — **my standards win** (listed, not silently resolved)

1. **SWR / `useSWRSubscription` (rules `client-swr-dedup`, `client-event-listeners`)** — the skill
   recommends SWR for client-side fetching/dedup. **Not adopted**: the fixed stack is Zustand + XState
   with **no data-fetching library**. Fetch in **RSC / Server Actions**, hold domain data in Zustand,
   dedup server-side with `React.cache()`. Revisit only if a real client-fetch need appears — and ask first.
2. **`better-all` (rule `async-dependencies`)** — the skill's dependency-based parallelizer is an extra
   dependency. **Not adopted**: use native `Promise.all` / `Promise.allSettled`.
3. **Note, not a conflict:** our store recipe runs a `deepEqual` compare on every selection
   (Rule 5) — a deliberate project choice that trades a little compare cost for churn-free references.
   The skill's "select primitive slices" advice still applies _inside_ that: prefer primitive selectors.

---

## Workflow & commands

```bash
pnpm install            # bootstrap workspace
pnpm codegen            # generate shopify/src/generated from the Storefront schema
pnpm dev                # run the frontend (defaults to mock.shop with no env)
pnpm typecheck          # tsc --noEmit across all packages (run constantly)
pnpm lint               # eslint . (run constantly)
pnpm test               # unit (vitest) + e2e (playwright)
```

**Definition of done (phase 1):** `pnpm typecheck`, `pnpm lint`, `pnpm test` green; `pnpm dev` runs
home → product → add-to-cart → drawer → `checkoutUrl` redirect against mock.shop. **No plain strings**
anywhere — self-audit against Rule 1 before finishing.

**Ask before:** adding dependencies, deleting anything, or deviating from the brief. When in doubt,
choose smaller and cleaner.
