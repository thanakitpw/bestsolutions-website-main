# ADR 0002 — Domain & Hosting

**Date:** 2026-05-05
**Status:** Accepted
**Deciders:** Founder

## Decision

- **Domain:** keep `bestsolutionscorp.com` (current production domain)
- **Hosting:** Vercel (current production host — same)

## Implications

- DNS cutover (T9.4) is in-place: change Vercel project that the existing domain points to, no registrar transfer required.
- Old deployment must be replaced atomically — short downtime acceptable, but plan a quick rollback (keep old project deployed until 24h post-cutover).
- Preview URLs available via Vercel auto for staging review (T9.2 / G3 founder review).
- All env vars (Supabase, GA4, GTM, FB Pixel, Resend) configured in Vercel Production environment per Phase 9.
