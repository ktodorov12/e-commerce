#!/usr/bin/env bash
#
# CI verification pipeline. Kept here (not inline in the workflow) so the exact
# same steps run in CI and locally: `bash pipelines/ci.sh`.
#
# Generated Storefront types (shopify/src/generated) are committed, so this
# runs offline — no mock.shop hop. Regenerate locally with `pnpm codegen` when
# the GraphQL documents change. End-to-end (Playwright) runs separately; it
# needs a browser download and a dev server.
set -euo pipefail

pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test:unit
