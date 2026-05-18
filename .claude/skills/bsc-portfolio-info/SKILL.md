---
name: bsc-portfolio-info
description: สร้างโฟลเดอร์ staging + info.md สำหรับผลงานใหม่ของเว็บ Best Solutions — ถาม URL เว็บ, เข้าไปดึงข้อมูลจากเว็บจริง, สร้าง portfolio/<url>/info.md ที่กรอกข้อมูลมาให้แล้ว (ผู้ใช้เอารูปมาใส่เองทีหลัง). ใช้เมื่อผู้ใช้พูดถึง "สร้างโฟลเดอร์ผลงาน", "เตรียม info ผลงาน", "เพิ่มเว็บใหม่จาก url", "ทำ portfolio info", "bsc-portfolio-info". ห้ามใช้ copy รูป/insert DB — นั่นเป็นงานของ bsc-portfolio-migration.
---

# bsc-portfolio-info

Skill เฉพาะโปรเจค — เตรียม staging folder + info.md จาก URL เว็บ (ขั้นก่อน migration)

## ขั้นตอน

1. **ถาม URL เว็บ** ถ้าผู้ใช้ยังไม่ให้ — เช่น `https://thaifutureinc.com`
2. ดึงโดเมนจาก URL → ชื่อโฟลเดอร์ = โดเมน (เอา `https://`, `www.`, path, trailing slash ออก) เช่น `thaifutureinc.com`
   - slug = โดเมนเอา TLD/จุดออกเป็น kebab เช่น `thaifutureinc.com` → `thaifutureinc`, `acme.co.th` → `acme`
3. **เข้าไปหาข้อมูลจากเว็บจริง** ด้วย WebFetch (โหลด ToolSearch `select:WebFetch` ก่อนถ้ายังไม่มี schema)
   - ดู: ชื่อบริษัท/แบรนด์, สิ่งที่ธุรกิจทำ, อุตสาหกรรม, ภาษาที่รองรับ, จุดเด่นเว็บ, tech ถ้าเดาได้
   - กรอก field ที่ดึงได้จริง: `title`, `client`, `category`, `summary_th`, `summary_en`, `services`, `tech_stack`, `year` (ปีปัจจุบันถ้าไม่รู้), `live_url`
   - field ที่เดาไม่ได้ (`results`, `duration`, `featured`, `body`) → ใส่ placeholder + คอมเมนต์ `# TODO ผู้ใช้กรอก` อย่ามั่วตัวเลขผลลัพธ์
   - `category`: free text ไทย — เช็คหมวดที่ใช้อยู่ใน DB ก่อน (Supabase MCP: `select distinct category from portfolio_items`) ถ้าเข้าหมวดเดิมให้ใช้ชื่อเป๊ะ ๆ ไม่งั้นเสนอใหม่
   - `show_live_button`: ใส่ comment ไว้ว่าให้ผู้ใช้/ขั้น migration ตัดสิน — อย่า default
4. สร้างโฟลเดอร์ `portfolio/<โดเมน>/` (Bash `mkdir -p`)
5. เขียน `portfolio/<โดเมน>/info.md` ตามฟอร์แมตเดียวกับที่ `bsc-portfolio-migration` parse ได้
   (frontmatter keys: slug,title,category,summary_th,summary_en,client,year,duration,featured,status,
   show_live_button,live_url,services,tech_stack,results,seo_title,seo_description + body_md_th / `<!--EN-->` / body_md_en)
6. รายงาน: path โฟลเดอร์ + field ไหนดึงมาได้ / field ไหนเป็น TODO ให้ผู้ใช้เติม
   แจ้งผู้ใช้: เอา `cover.png` + `screenshot.png` มาใส่ในโฟลเดอร์นี้ แล้วสั่ง bsc-portfolio-migration ต่อ

## ข้อห้าม

- ห้าม copy รูป / insert-update Supabase / แตะ web/public — นั่นเป็นงาน bsc-portfolio-migration
- ห้ามมั่ว results/ตัวเลข/คำรับรองที่ไม่ได้อยู่บนเว็บจริง — ใส่ TODO แทน
- ห้ามทับ info.md เดิมถ้ามีอยู่แล้ว — เตือนผู้ใช้ก่อน
- status default `draft`
