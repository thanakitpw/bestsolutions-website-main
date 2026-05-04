# Open Decisions — Best Solutions Redesign

**Last updated:** 2026-05-05

Most questions resolved by founder on 2026-05-05. See `docs/decisions/000{1..4}-*.md` for ADRs.

## Resolved

| # | Question | Decision | Recorded in |
|---|---|---|---|
| Q1 | Reuse existing Supabase or new? | **NEW project** `dhftyjnzqkyocfhtmjet` | ADR 0001 |
| Q2 | Migrate blog content? | **No** — start fresh; old content can be reference | ADR 0004 |
| Q3 | Domain + hosting? | **Keep `bestsolutionscorp.com` on Vercel** | ADR 0002 |
| Q4 | Admin v1 scope? | **Minimum** — lead inbox only; use Supabase Studio for content | ADR 0004 |
| Q6 | Analytics stack? | **GA4 + GTM + Facebook Pixel** | ADR 0003 |
| Q7 | Show pricing on service pages? | **No** — "ปรึกษาฟรี" CTA only | ADR 0004 |
| Q8 | Client logos cleared? | **Use mockup placeholders** for v1 | ADR 0004 |
| Q9 | Service slug `/services/web-design` vs `website-design`? | **`web-design`** (old URL → 301) | ADR 0004 |
| Q10 | Expand 4 anchor-only services to detail pages? | **Yes** — 7 total service detail routes | ADR 0004 |
| Q11 | Blog slug policy? | **English going forward**; preserve old Thai slugs via 301 | ADR 0004 |
| Q12 | `/blog/ai-automation` vs `/blog/ai-automation-คืออะไร`? | **Dedupe to one** canonical English-slug post | ADR 0004 |

## Resolved (cont.)

| Q5 | Email sender for lead notifications? | **Defer** — handle in v2 / post-launch | (this file) |

## Still open

— none —

### Discovered later (any)

— none yet —
