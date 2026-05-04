# ADR 0004 — Content & Asset Strategy

**Date:** 2026-05-05
**Status:** Accepted (with Q5 still open)
**Deciders:** Founder

## Decisions

### Content (blog + portfolio + services)
- **Start fresh.** Old blog content can be pulled as reference but new copy will be written by content-writer agent for tone consistency.
- Old Thai-slug URLs (`/blog/ai-automation-คืออะไร`, `/blog/n8n-คืออะไร`) get 301 redirects; new posts use English slugs going forward (per Q11).
- Duplicate articles `/blog/ai-automation` and `/blog/ai-automation-คืออะไร` collapsed into one canonical English-slug post (per Q12).

### Pricing display
- **Don't show prices on service pages** — use "ปรึกษาฟรี" CTA only (per Q7 "ไม่ดี"). Aligns with current site behavior.

### Client logos & testimonials
- **Use mockup placeholders** for v1 (per Q5/Q8 "ใช้เป็นรูป mockup ไว้ก่อน"). Designer creates abstract or stylized brand-strip placeholders. Real logos can be swapped in once consents are confirmed post-launch.

### Admin scope
- **Admin minimum** (per Q4 "แสดงเป็นแค่ขั้นต่ำก็พอ"). v1 ships:
  - Lead inbox (T7.6) — view + mark read + CSV export
  - Founder uses **Supabase Studio** for content edits (no custom editor)
- Defer custom article/portfolio/service editors to post-launch v2.

### Service pages structure
- Slug `/services/web-design` (per Q9 — rename from old `/services/website-design`; old URL gets 301).
- Expand all 4 anchor-only services (#ads, #social-media, #seo, #production) into full detail pages (per Q10 recommendation accepted).
- Final 7 service detail routes:
  ```
  /services/web-design
  /services/ads
  /services/social-media
  /services/seo
  /services/ai-automation
  /services/ai-email
  /services/production
  ```

## Still open

### Q5 — Email sender for lead notifications
Founder did not explicitly answer. Needs decision before T7.6 (lead inbox).

Options:
- **Resend** (free tier 3k/mo; recommended)
- Supabase Auth SMTP (built-in but limited)
- LINE Notify (founder uses LINE heavily — could push lead alerts to LINE chat)
- None — check leads via Supabase Studio only

**Default if no answer:** Resend.
