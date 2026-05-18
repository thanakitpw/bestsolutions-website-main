---
# ===== required =====
slug: thaifutureinc                       # kebab-case, = path /portfolio/<slug>
title: Thai Future Inc.
category: เว็บไซต์องค์กร บริษัท             # free text TH — ใช้ชื่อให้ตรงหมวดเดิมถ้าหมวดเดียวกัน
                                          # (filter หน้า /portfolio สร้างจากค่านี้ตรง ๆ)
summary_th: |
  เว็บไซต์องค์กรสำหรับบริษัทที่ปรึกษาธุรกิจ — เน้นความน่าเชื่อถือ โครงสร้างชัด
  และโหลดไว รองรับสองภาษา

# ===== optional =====
summary_en: |
  Corporate website for a business consulting firm — built for trust,
  clear structure, fast load, bilingual.
client: Thai Future Inc.
year: 2026
duration: 4 สัปดาห์
featured: false                           # true = ขึ้นเด่นหน้า portfolio
status: draft                             # draft | published

# ปุ่ม "เข้าชมเว็บจริง" — ลบ 2 บรรทัดนี้ออก ถ้าอยากให้ skill ถามทุกครั้ง
show_live_button: true                    # true = มีปุ่ม / false = ไม่มี
live_url: https://thaifutureinc.com       # ใช้เมื่อ show_live_button: true

services:
  - Website Design
  - Website Development
tech_stack:
  - Next.js 15
  - TypeScript
  - Tailwind CSS

results:                                  # การ์ดผลลัพธ์ใน hero (เว้นว่างได้)
  - label: ความเร็วโหลดหน้า
    value: "< 1.5s"
  - label: คะแนน SEO
    value: "98"
  - label: รองรับภาษา
    value: "TH / EN"

seo_title:                                # ว่าง = ใช้ default ของระบบ
seo_description:
---

<!-- body_md_th : เนื้อหา case study ภาษาไทย (markdown) — ทั้งบล็อกนี้ลบได้ถ้าไม่มี -->

## โจทย์

อธิบายปัญหา/เป้าหมายของลูกค้า

## สิ่งที่เราทำ

- ข้อ 1
- ข้อ 2

## ผลลัพธ์

สรุปผลที่ได้

<!--EN-->

<!-- body_md_en : เนื้อหาภาษาอังกฤษ (optional) — ใส่ใต้ marker นี้ -->

## The Challenge

...
