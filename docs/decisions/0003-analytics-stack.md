# ADR 0003 — Analytics Stack

**Date:** 2026-05-05
**Status:** Accepted
**Deciders:** Founder

## Decision

Install on the new site:

- **Google Analytics 4 (GA4)** — primary analytics
- **Google Tag Manager (GTM)** — tag orchestration (so future tags don't need code deploys)
- **Facebook Pixel** — Meta ad performance tracking

All accounts will be created fresh by founder (per Q8 answer "เดี๋ยวสร้างใหม่ทั้งหมด").

## Implementation notes

- Implement GTM as the only `<Script>` tag; GA4 + Pixel fired through GTM containers, not direct injection.
- Use `next/script` with `strategy="afterInteractive"` (default for analytics) to avoid blocking LCP.
- Cookie consent: not in scope for v1 (Thailand has no strict GDPR equivalent enforced currently). Revisit if expanding to EU traffic.
- Env vars:
  ```
  NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # if needed for direct fallback
  NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
  ```

## Consequences

- All conversion events (lead form submit, CTA click, scroll depth) fired via dataLayer push so GTM routes to GA + Pixel without code changes.
- Standard ecommerce events not relevant (no commerce). Custom events: `lead_submit`, `service_view`, `portfolio_view`, `blog_read`, `cta_click`.
- Vercel Analytics: not added (GA4 + GTM cover the need; reduce duplicate scripts).
