# 06 — Content Pipeline Architecture (spec สำหรับโปรเจคใหม่)

สถานะ: SPEC — 2026-05-16. ใช้เป็นแบบสร้าง **content-project** แยก. repo เว็บนี้เป็นเจ้าของ schema/migration + (option) ingest gate.

## หลักการ
- **website repo (นี้)** = presentation + schema + migration + render + JSON-LD/sitemap. ไม่ใส่ logic การผลิต content
- **content-project (ใหม่)** = research → draft (ไทย) → quality self-check → publish → repurpose FB. cadence รัว, tooling แยก (bsc-content-pipeline)
- **Supabase = API อยู่แล้ว** (PostgREST + RLS). ไม่สร้าง CRUD API ซ้ำ
- เขียนลง DB 2 ทาง: (A) Supabase service-role client ตรง [default] · (B) ingest API ที่ enforce SEO gate [option, แนะนำเพราะเป้า "เร่งแต่ปลอดภัย"]

## Data contract — ตาราง `articles` (ของจริง)

| column | type | required | หมายเหตุ content-project |
|---|---|---|---|
| `slug` | text | ✅ unique | ไทยได้ (URL-encoded). kebab/ไทย, ไม่ชน |
| `title_th` | text | ✅ | KW-front |
| `title_en` | text | – | เว้นได้ (เว็บ th-only ตอนนี้) |
| `excerpt_th` | text | ควรมี | ใช้เป็น meta desc fallback |
| `excerpt_en` | text | – | – |
| `body_md_th` | text | ✅ | Markdown, 1×H1, heading hierarchy |
| `body_md_en` | text | – | – |
| `cover_image` | text | – | URL (Supabase Storage) — รอ decision รูป |
| `category` | text | ✅ | ตรง taxonomy เว็บ (Digital Marketing ฯลฯ) |
| `tags` | text[] | – | default `{}` |
| `author_name` | text | – | default `'ทีม Best Solutions'` (decision ค้าง) |
| `reading_time` | int | – | default 5 — คำนวณจากความยาว |
| `published_at` | timestamptz | set เมื่อ publish | ISO; ใช้ใน sitemap/Article schema |
| `status` | content_status | ✅ | `draft`\|`published`\|`archived` (default draft) |
| `seo_title` | text | ควรมี | ≤43 (template +17 ≤60) |
| `seo_description` | text | ควรมี | ≤160 |
| `og_image` | text | – | ใช้ก่อน cover_image ใน meta (S1 A9) |
| `id/created_at/updated_at` | – | auto | อย่าส่ง |

RLS: anon SELECT เฉพาะ `status='published'`. เขียนต้อง **service-role** (server-side) หรือ auth user. **ห้าม** service-role ฝั่ง client.

## ทางเลือก A — เขียน Supabase ตรง (default, ง่ายสุด)
content-project มี server script:
```
@supabase/supabase-js createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
  .from('articles').upsert(row, { onConflict: 'slug' })
```
- `SERVICE_ROLE_KEY` อยู่ env ของ content-project เท่านั้น (ไม่เข้า git, ไม่เข้า website)
- upsert by `slug` = idempotent (rerun ไม่ซ้ำ)
- quality gate = วินัย/ self-check script ฝั่ง content-project

## ทางเลือก B — Ingest API + SEO gate (option, แนะนำ)
เพิ่มใน website repo: `web/app/api/ingest-article/route.ts` (POST)

**Auth:** header `x-ingest-secret: <INGEST_SECRET>` (env ทั้ง 2 ฝั่ง). ไม่ผ่าน → 401
**Body (Zod):** slug, title_th, body_md_th, category, status, excerpt_th?, seo_title?, seo_description?, og_image?, cover_image?, tags?, author_name?, published_at?
**Flow:** validate Zod → SEO gate → ถ้าผ่าน upsert ด้วย service-role (ฝั่ง server) by slug → 200 {id, slug, warnings[]}; ไม่ผ่าน → 422 {errors[]}
**Idempotent:** upsert onConflict slug

### SEO gate (validator — บังคับก่อน insert)

| rule | เงื่อนไข | fail |
|---|---|---|
| seo_title len | ≤ 43 (มี → ใช้, ไม่มี → title_th ≤ 60-17) | error |
| seo_description len | 70–160 | error (>160) / warn (<70) |
| slug | regex ปลอดภัย, ไม่มี space, ไม่ชนใน DB | error |
| body H1 | มี `#` H1 เดียว | error |
| heading order | ไม่ข้ามชั้น (H1→H2→H3) | warn |
| internal links | body มี ≥2 link ภายใน (≥1 = pillar `/services/...` หรือ `/contact`) | error |
| word count | ไทย ≥ ~600 คำ (กัน thin) | error |
| category | อยู่ใน whitelist taxonomy | error |
| cannibalization | ไม่มี article อื่น slug/title ใกล้เกิน (fuzzy) | warn |
| AI-pattern | heuristic (skill avoid-ai-writing) optional | warn |

validator แยกเป็น `web/lib/seo/article-gate.ts` (pure fn, unit-testable) — reuse ทั้ง API และ script ฝั่ง content-project (import ผ่าน package หรือ copy)

## Slug ไทย
- เก็บไทยได้ใน DB; route ใช้ `[slug]` + URL-encode. ตรวจ uniqueness ก่อน insert
- กำหนด convention: ไทยล้วนหรือ kebab-en — เลือกอันเดียวให้คงที่ (แนะนำ kebab-en สั้น อ่าน log/แชร์ง่าย, title ไทยได้)

## Repurpose FB (output ของ content-project)
1 บทความ → `content-project/fb-posts/<slug>/N.md` (hook + ค่าสั้น + CTA + link บทความ). โพสต์เพจ manual หรือ Graph API ภายหลัง (นอก scope แรก)

## Security checklist
- [ ] SERVICE_ROLE / INGEST_SECRET อยู่ env content-project + (B) website server env เท่านั้น
- [ ] ไม่มี secret ใน client bundle / git (gitignore ครอบ)
- [ ] ingest route = server route, rate-limit/secret, ไม่ public schema
- [ ] migration อยู่ repo นี้เท่านั้น = single contract; content-project อ้าง schema เป็น read-only knowledge

## แบ่งความรับผิดชอบ
| | website repo (นี้) | content-project |
|---|---|---|
| schema/migration | ✅ เจ้าของ | อ้างอิงเฉย |
| render/JSON-LD/sitemap | ✅ (มีแล้ว auto) | – |
| ingest API + gate (option B) | ✅ | เรียกใช้ |
| research/draft/repurpose | – | ✅ |
| publish ลง DB | (ผ่าน gate ถ้า B) | ✅ ทริกเกอร์ |
| FB posting | – | ✅ |

## Open decisions (กระทบ pipeline)
- รูป cover/OG: default OG / HTML→screenshot / AI API — ค้าง
- author_name: Admin / Thanakit / ทีม Best Solutions — ค้าง (กระทบ E-E-A-T + Person schema)
- ทางเลือก A vs B: ยืนยันก่อนเริ่มโปรเจคใหม่

## Build/verify (เมื่อ implement option B)
`pnpm lint && tsc --noEmit && pnpm build` ผ่าน · unit test `article-gate.ts` · POST ทดสอบ reject/accept · ตรวจ sitemap auto มี slug ใหม่ · Rich Results บทความ
