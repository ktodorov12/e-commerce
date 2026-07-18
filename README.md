# Exclusive Wear

A custom **headless Shopify storefront**. Shopify is the backend engine (products, cart, checkout,
orders, admin); this repo owns only the **frontend** (`frontend/`, Next.js App Router) and a **typed
Storefront API layer** (`shopify/`). Portfolio-grade: strict typing, clean architecture, readability
over cleverness.

> **Architecture and the coding standards live in [`CLAUDE.md`](./CLAUDE.md).** Read it before
> contributing — it is the source of truth for the golden rules, the store recipe, the security
> (query-boundary) rules, and the design-token system. This README is setup + operations only.

## Quick start

```bash
pnpm install          # bootstrap the workspace
pnpm codegen          # generate shopify/src/generated from the Storefront schema (mock.shop by default)
pnpm dev              # run the frontend at http://localhost:3000
```

No environment variables are required — with none set, everything runs against Shopify's public
**mock store** (`https://mock.shop`). Generated types are committed, so `pnpm codegen` is only needed
after you change the GraphQL documents in `shopify/src/graphql/`.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run the Next.js frontend (defaults to mock.shop) |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm typecheck` | `tsc --noEmit` across all packages |
| `pnpm lint` / `pnpm lint:fix` | ESLint (flat config) over the workspace |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm test:unit` | Vitest unit tests (colocated in `frontend/src`) |
| `pnpm test:e2e` | Playwright smoke suite (see below) |
| `pnpm codegen` | Regenerate the typed Storefront layer |

## Workspace layout

```
frontend/    Next.js App Router app (UI, stores, machines, types) — see CLAUDE.md
shopify/     Typed Storefront API layer — exposes domain functions, not raw GraphQL
tests/       Playwright config + e2e specs (unit tests colocate in frontend/src)
pipelines/   CI steps (pipelines/ci.sh), referenced by .github/workflows/ci.yml
design/      Design source of truth (Nocturne + Ivory & Gold token system)
```

## Switching mock.shop → a real store

The provider is **swappable via env only — zero code changes** (`shopify/src/config.ts`). Copy
`.env.example` and set:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-api-token
```

Resolution order: `SHOPIFY_STOREFRONT_ENDPOINT` (full override) → `SHOPIFY_STORE_DOMAIN` +
`SHOPIFY_STOREFRONT_ACCESS_TOKEN` (real store) → mock.shop (nothing set). After adding real
credentials, run `pnpm codegen` once to regenerate types from the real schema.

## Testing

- **Unit** (`pnpm test:unit`) — Vitest + Testing Library, config in `frontend/vitest.config.ts`.
  Covers `deepEqual`, the store-hook re-render behavior, the cart machine, the fail-closed query
  parser, the Shopify id/handle validators, and the theme-init drift guard.
- **E2E** (`pnpm test:e2e`) — Playwright smoke suite in `tests/e2e/` (home → product → add-to-bag →
  cart drawer, against mock.shop). Install the browser once before the first run:

  ```bash
  pnpm --filter @exclusive-wear/tests exec playwright install chromium
  ```

## CI

`.github/workflows/ci.yml` runs `pipelines/ci.sh` on push/PR: `install → typecheck → lint →
test:unit`. It runs offline (generated types are committed). E2E is not part of CI yet (it needs a
browser download + a dev server).

## Toolchain notes

- **TypeScript 5.9.3 (not TS 7-native).** TS 7 (the native `tsgo` compiler) typechecks fine, but its
  `require('typescript')` API is a stub, and `@typescript-eslint` (so ESLint on `.ts/.tsx`) crashes
  against it. Per the project brief's guidance, the workspace uses the latest **stable** TypeScript.
  Revisit TS 7 when the lint ecosystem supports it.
- **ESLint 9 (not 10).** ESLint 10 expects a newer `eslint-scope` API than the bundled
  `typescript-eslint` provides (`scopeManager.addGlobals`), so it fails at parse time. ESLint 9 is
  the supported line for `eslint-config-next@16` + `typescript-eslint@8`.
- **`!` in the repo path.** This project lives under `…/!e-commerce/…`. `@graphql-tools` treats `!`
  in an *absolute* path as a glob magic char, so GraphQL Codegen would find "no documents";
  `shopify/codegen.ts` sets `absolute: false` on the documents loader to keep paths relative. If you
  move the repo out from under a `!` directory this is harmless.

## Requirements

Node `>=22`, pnpm `11.11.0` (pinned via `packageManager`; `corepack enable` will provision it).
"# e-commerce" 
