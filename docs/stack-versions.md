# Stack Versions (locked)

> Pin these versions when installing in Phase 2. Update only via deliberate ADR.

## Runtime

| Tool | Version target | Currently installed | Notes |
|---|---|---|---|
| Node.js | **22 LTS** (≥ 22.11) | v22.22.2 ✓ | Next.js 15 supports 18.18+; pinning 22 for longest LTS window |
| pnpm | **9.x** | not installed (`npm i -g pnpm@9`) | preferred package manager — better disk usage + workspaces |
| npm | (built-in) | 10.9.7 ✓ | fallback if pnpm unavailable |

## Phase 1 (prototype) — no installs needed

`prototype/` is plain HTML/CSS/JS served via `npx serve`. Zero deps.

## Phase 2 (`web/`) — to be installed

| Package | Version target | Why |
|---|---|---|
| `next` | **15.x** (latest stable) | App Router, server components, OG image edge runtime |
| `react`, `react-dom` | **19.x** | Comes with Next 15 |
| `typescript` | **5.6+** | Latest stable |
| `tailwindcss` | **4.x** | `@theme` directive, CSS-first config, faster builds |
| `@tailwindcss/postcss` | match Tailwind | required for v4 |
| `next-intl` | **3.x** (latest) | App Router-compatible i18n |
| `@supabase/supabase-js` | **2.x** (latest) | Server + client + admin clients |
| `@supabase/ssr` | latest | App Router cookie handling |
| shadcn/ui | latest registry tag | install per-component, not as a package |
| `react-hook-form` | **7.x** | forms |
| `zod` | **3.x** | env + schemas |
| `framer-motion` | **11.x** (latest) | sparingly — only where prototype uses motion |
| `@vercel/og` | latest | OG image generation |
| `lucide-react` | latest | icons |

## Dev / tooling

| Package | Version target | Why |
|---|---|---|
| `eslint` | **9.x** flat config | latest stable |
| `prettier` | **3.x** | with `prettier-plugin-tailwindcss` |
| `husky` | **9.x** | pre-commit hooks |
| `lint-staged` | latest | with husky |
| `@playwright/test` | latest | e2e |
| `@axe-core/playwright` | latest | a11y in tests |
| `@lhci/cli` | latest | Lighthouse CI |
| `@next/bundle-analyzer` | latest | bundle audit |

## Supabase CLI

| Tool | Version target | Why |
|---|---|---|
| `supabase` (CLI) | latest stable | local dev, type generation, migrations |

## Versioning policy

- **Patch** updates: auto-merge via Renovate / Dependabot post-launch
- **Minor** updates: review PR, run full test suite
- **Major** updates: open ADR before upgrading

## Why Node 22 (not 20)?

Plan originally pinned Node 20 LTS but Node 22 is already installed on the dev machine and is the current Active LTS. Both are fully supported by Next.js 15. No reason to downgrade.
