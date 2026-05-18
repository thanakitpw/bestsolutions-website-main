---
name: bsc-portfolio-migration
description: เอาข้อมูลในโฟลเดอร์ผลงาน portfolio/<url>/ (info.md + cover.png + screenshot.png ที่เตรียมไว้แล้ว) เพิ่มเข้าเว็บ Best Solutions — copy รูปไป web/public/portfolio/<slug>/, parse info.md, upsert เข้า Supabase แบบ idempotent (by slug). ใช้เมื่อผู้ใช้พูดถึง "เพิ่มผลงานเข้าเว็บ", "migrate portfolio", "ลงผลงานใหม่", "import เคส" หรือชี้โฟลเดอร์ใน portfolio/ ที่พร้อมแล้ว. ห้ามใช้สร้างโฟลเดอร์/info.md ใหม่ (ใช้ bsc-portfolio-info) หรือแก้ schema portfolio_items.
---

# bsc-portfolio-migration

Skill เฉพาะโปรเจคนี้ — เอาข้อมูลในโฟลเดอร์ staging ที่เตรียมไว้แล้ว เพิ่มเข้า DB + public assets

ก่อนหน้านี้: `bsc-portfolio-info` สร้างโฟลเดอร์ + info.md ให้ → ผู้ใช้เอารูปมาใส่ → skill นี้เอาเข้าเว็บ

## Input layout (ผู้ใช้เตรียมให้)

```
portfolio/<folder>/          # <folder> = โดเมน/URL เว็บ เช่น thaifutureinc.com
  cover.png                  # ภาพแนวนอน → cover_image (ใช้ในการ์ด/grid/OG)
  screenshot.png             # ภาพหน้าเว็บเต็มแบบยาว → gallery[0] (เลื่อนในกรอบ browser ได้)
  info.md                    # metadata (ดูฟอร์แมตด้านล่าง)
```

cover.png แนะนำให้มี, screenshot.png มีก็ต่อเมื่ออยากให้กรอบ browser เลื่อนดูเว็บได้
ถ้าไม่มี screenshot.png → กรอบจะ fallback ใช้ cover.png (เลื่อนไม่ได้ ก็ถือว่าปกติ)

## info.md format

YAML frontmatter + body markdown (ดูตัวอย่างจริงที่ `portfolio/thaifutureinc.com/info.md`)

Map → คอลัมน์ `portfolio_items`:

| info.md key | DB column | required | หมายเหตุ |
|---|---|---|---|
| `slug` | slug | ✅ | kebab-case, = path `/portfolio/<slug>` |
| `title` | title | ✅ | |
| `category` | category | ✅ | free text TH — filter หน้า /portfolio สร้างจากค่านี้ตรงๆ ใช้ชื่อให้ตรงหมวดเดิม |
| `summary_th` | summary_th | ✅ | 1–2 ประโยค |
| `summary_en` | summary_en | – | |
| `client` | client | – | |
| `services` (list) | services (text[]) | – | |
| `tech_stack` (list) | tech_stack (text[]) | – | |
| `results` (list label/value) | results (jsonb) | – | การ์ดผลลัพธ์ใน hero |
| `year` | year (int) | – | |
| `duration` | duration | – | |
| `featured` | featured (bool) | – | true = ขึ้นเด่น |
| `status` | status | – | default `draft` |
| `seo_title` / `seo_description` | seo_* | – | ว่าง = ใช้ default |
| `live_url` | live_url | – | ดู show_live_button |
| `show_live_button` | (control) | – | true → set live_url / false → live_url = NULL (ไม่มีปุ่ม "เข้าชมเว็บจริง") |
| body หลัง `---` ก่อน `<!--EN-->` | body_md_th | – | markdown |
| body หลัง `<!--EN-->` | body_md_en | – | markdown |

assets: รูปทุกไฟล์ **แปลงเป็น .webp ก่อนเสมอ** แล้วเก็บชื่อ .webp →
`cover.(png|jpg)` → `cover.webp` → `cover_image = /portfolio/<slug>/cover.webp`,
`screenshot.(png|jpg)` → `screenshot.webp` → `gallery = ['/portfolio/<slug>/screenshot.webp']`

## ขั้นตอน (ทำตามนี้)

1. หาโฟลเดอร์เป้าหมายใน `portfolio/` (ผู้ใช้ชี้ หรือไล่ทุกโฟลเดอร์ที่มี info.md และยังไม่มีใน DB)
2. อ่าน `info.md` — ถ้าไม่มี/ไม่ครบ field required → หยุด ถามผู้ใช้
3. **ปุ่มดูเว็บจริง**: ถ้า `show_live_button` ไม่ได้ระบุใน info.md → **ถามผู้ใช้ก่อน** ว่าเว็บนี้ให้มีปุ่ม "เข้าชมเว็บจริง" ไหม
   - มี → `live_url` = ค่าใน info.md หรือ default `https://<folder>`
   - ไม่มี → `live_url = NULL`
4. **แปลงรูปเป็น .webp** แล้วเขียนผลไป `web/public/portfolio/<slug>/` (Bash `mkdir -p`)
   - ใช้ `cwebp` ถ้ามี (`cwebp -q 82 src -o dest.webp`) ไม่งั้น fallback `sips -s format webp src --out dest.webp` (มากับ macOS) — ตรวจ tool ก่อนด้วย `command -v cwebp`
   - `cover.*` → `cover.webp` (cover_image), `screenshot.*` → `screenshot.webp` (gallery[0] — กรอบ browser เลื่อนได้)
   - ไม่ copy ไฟล์ .png/.jpg ดิบไป web/public — เก็บเฉพาะ .webp; ถ้าไม่มี screenshot → ไม่ใส่ gallery, CaseFrame fallback cover เอง
   - ยืนยันไฟล์ .webp สร้างจริง (มีอยู่ + ขนาด > 0) ก่อนไป step ถัดไป
5. Upsert เข้า Supabase ผ่าน MCP `mcp__supabase__execute_sql` — **idempotent by slug**:
   `insert ... on conflict (slug) do update set ...` รวมทุกคอลัมน์ที่ map
   - `sort_order`: ถ้าไม่ระบุ ใช้ max(sort_order)+1
   - escape single-quote ใน text, results เป็น jsonb (`'[...]'::jsonb`)
6. **Dry-run ก่อนจริง**: โชว์ค่าที่จะ insert/update (slug, title, category, live_url=มี/ไม่มี, จำนวนรูป) ให้ผู้ใช้ยืนยัน แล้วค่อย execute
7. ตรวจ: `select` row กลับมายืนยัน + เตือนว่า `revalidate=300` (prod รอ revalidate / dev เห็นทันที) → ให้เปิด `/portfolio/<slug>` ใน browser จริงเช็ค desktop+mobile

## ข้อห้าม

- ห้าม destructive (delete row, drop) โดยไม่ confirm
- ห้ามเดา category/summary/results เอง — ต้องมาจาก info.md หรือถามผู้ใช้
- ห้ามแก้ schema `portfolio_items` (skill นี้แค่ insert/update data)
- รูปไป `web/public/portfolio/` เท่านั้น — โฟลเดอร์ `portfolio/` ที่ root เป็น staging อย่าแก้
