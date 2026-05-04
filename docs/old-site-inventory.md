# Old Site Inventory — bestsolutionscorp.com

**Crawled:** 2026-05-05
**Source:** Playwright crawl of all 6 top-level routes + sitemap.xml + robots.txt

## Top-level routes (6)

| Path | Lastmod (sitemap) | Priority |
|---|---|---|
| `/` | 2026-04-06 | 1.0 |
| `/about` | 2026-04-06 | 0.8 |
| `/services` | 2026-04-06 | 0.8 |
| `/portfolio` | 2026-04-06 | 0.8 |
| `/blog` | 2026-04-06 | 0.8 |
| `/contact` | 2026-04-06 | 0.8 |

⚠️ Sitemap.xml lists ONLY top-level routes — detail pages are missing. We must regenerate the sitemap properly in T5.3.

## Service detail pages found (3 of expected 7)

| Path | Notes |
|---|---|
| `/services/ai-automation` | OK |
| `/services/ai-email` | OK |
| `/services/website-design` | ⚠️ slug uses `website-design` not `web-design` — confirm preference |

The other 4 services advertised on `/services` (ยิงแอดโฆษณา, ดูแลเพจโซเชียล, รับทำ SEO, Production) appear to be section anchors (`#ads`, `#social-media`, `#seo`, `#production`) on `/services` rather than dedicated detail pages. Decide in Phase 4 whether to give each service its own page (recommended for SEO).

## Portfolio items (2 found)

| Path |
|---|
| `/portfolio/luxe-store-ecommerce` |
| `/portfolio/luxury-automotive-showcase` |

⚠️ Plan referenced "6 portfolio categories" but only 2 detail pages exist. Possibly more demo/case items are linked only on cards within the portfolio page that don't navigate. Verify against Supabase row count in T0.6.

## Blog posts (5 found)

| Path | Notes |
|---|---|
| `/blog/ai-automation` | English slug |
| `/blog/ai-automation-คืออะไร` | Thai slug — URL-encoded as `%E0%B8%...` |
| `/blog/ai-automation-ecommerce` | English slug |
| `/blog/n8n-คืออะไร` | Thai slug — URL-encoded |
| `/blog/online-marketing-for-business-digital-getting-started-increase-sales` | Very long English slug; consider shortening on new site |

⚠️ Mix of English and Thai slugs is inconsistent — discuss naming policy. Recommendation: English slugs for SEO predictability, Thai title in `<title>`/`h1`.

⚠️ Possible content duplication: `/blog/ai-automation` vs `/blog/ai-automation-คืออะไร` may be the same article under two slugs. Verify in T0.6.

## robots.txt

```
User-Agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
Sitemap: https://www.bestsolutionscorp.com/sitemap.xml
```

⚠️ `/admin/` is disallowed but no `/admin/*` route was returned by crawl — admin likely behind auth (good). Maintain disallow on new site.

## Note on Supabase storage

The old site's blog covers were hosted at `eeqlpvpmjcarqbivzbrr.supabase.co/storage/v1/object/public/images/blog-covers/`. **This project has been retired.** The redesign uses a fresh project (`dhftyjnzqkyocfhtmjet.supabase.co`). Image assets need to be re-uploaded to the new project's storage buckets in T3.5 / T3.6.

## Action items lifted into plan

- [ ] T0.6 — N/A (new Supabase project = empty; no existing schema to inventory)
- [ ] T4.4 — decide whether to expand 4 anchor-only services into proper detail pages
- [ ] T4.6 — naming policy: English slugs vs Thai slugs (recommend English)
- [ ] T4.6 — verify duplication between `/blog/ai-automation` and `/blog/ai-automation-คืออะไร`
- [ ] T4.9 — Thai-slug URLs in `next.config.ts` redirects must use `encodeURI` correctly
- [ ] T8.7 — every row in `redirect-map.csv` tested with Playwright (including encoded Thai slugs)
