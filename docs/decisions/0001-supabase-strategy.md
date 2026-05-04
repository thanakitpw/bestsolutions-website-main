# ADR 0001 — Supabase Strategy: Fresh Project

**Date:** 2026-05-05
**Status:** Accepted
**Deciders:** Founder (Thanakit Chaithong) + Lead

## Context

The current production site uses a Supabase project at `eeqlpvpmjcarqbivzbrr.supabase.co` for blog content storage and possibly more. Plan T0.7 required deciding whether to:

1. **Reuse** the existing project, applying additive migrations only and preserving live content; or
2. **Create a new** project, abandoning the old one and starting clean.

## Decision

**Create a new Supabase project. Abandon the old one.**

The new project is provisioned and confirmed:

- **Project ref:** `dhftyjnzqkyocfhtmjet`
- **API URL:** `https://dhftyjnzqkyocfhtmjet.supabase.co`
- **Publishable key:** `sb_publishable_to1K7qeiRwCXMbFnbUEA5A_ULWxeUkm` (safe to commit; new Supabase publishable-key format is designed for client-side exposure)
- **Service role key:** TBD (must be saved to `web/.env.local` only; never commit)

Old project (`eeqlpvpmjcarqbivzbrr`) is no longer referenced. Any blog cover images previously stored there will be re-uploaded to the new project's storage buckets in T3.5 / T3.6.

## Rationale

- The old project carried unknown legacy schema and incidental tables that would slow design of a clean v2 schema.
- Founder is also the dev — there is no third-party client whose live content would break, so starting fresh has no downside.
- Storage cost of re-uploading a handful of cover images is negligible.
- Schema can be designed greenfield with i18n columns from day 1 instead of being retrofitted.

## Consequences

- T0.6 (document existing schema) becomes N/A.
- T3.1 (initial migration) designs a full clean schema rather than diffing.
- T3.6 (seed) must include re-uploading old blog cover images (or generating mockup placeholders per ADR 0003).
- Old domain `bestsolutionscorp.com` will eventually point at the new Supabase-backed site (see ADR 0002).

## Related setup

Client SDK: `@supabase/ssr` (modern App Router-friendly). Pattern provided by founder uses three helpers:

- `web/utils/supabase/server.ts` — server components / route handlers
- `web/utils/supabase/client.ts` — client components
- `web/utils/supabase/middleware.ts` — session refresh in `middleware.ts`

Env var names (note: NEW Supabase naming, not legacy `_ANON_KEY`):

```
NEXT_PUBLIC_SUPABASE_URL=https://dhftyjnzqkyocfhtmjet.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_to1K7qeiRwCXMbFnbUEA5A_ULWxeUkm
SUPABASE_SERVICE_ROLE_KEY=…   # add when needed; never commit
```

Skill installed: `supabase` + `supabase-postgres-best-practices` (via `npx skills add supabase/agent-skills`).
