-- =============================================================================
-- seed.sql — Sample content matching the prototype HTML
-- Run after migrations 0001-0003. Idempotent via slug-based ON CONFLICT.
-- =============================================================================

-- =============================================================================
-- services (6 entries)
-- =============================================================================

insert into services (slug, name_th, name_en, summary_th, summary_en, icon, features_th, features_en, sort_order, status) values
  ('web-design',
   'รับทำเว็บไซต์', 'Web Design',
   'เว็บโหลดเร็ว ขายของได้ ผ่าน SEO ตั้งแต่วันแรก — ไม่ใช่แค่สวย',
   'Fast websites that sell — SEO-ready from day one, not just pretty',
   'web', array['ออกแบบ UX/UI ตามแบรนด์','SEO-ready โครงสร้างถูกต้อง','เปิดแอดมินแก้ content เองได้'],
   array['UX/UI designed from brand','SEO-ready structure','Edit content via admin'], 1, 'published'),

  ('seo',
   'SEO ติดอันดับ Google', 'SEO',
   'เนื้อหา Authority + Technical ที่ขึ้นแล้วอยู่ยาว',
   'Authority content + technical SEO that ranks and stays',
   'search', array['Keyword research ภาษาไทย','Technical audit + fix','Content writer ทีมไทย'],
   array['Thai keyword research','Technical audit + fix','Thai content writers'], 2, 'published'),

  ('paid-ads',
   'ทำโฆษณา Meta & Google', 'Paid Ads (Meta & Google)',
   'ปรับแคมเปญรายสัปดาห์ วัดผลทุกบาท ROAS ขึ้นจริง',
   'Weekly campaign tuning, every baht measured, ROAS that climbs',
   'megaphone', array['วาง funnel + audience','A/B test ครีเอทีฟ','รายงานรายสัปดาห์'],
   array['Funnel + audience setup','Creative A/B testing','Weekly reports'], 3, 'published'),

  ('social-media',
   'ดูแลโซเชียลมีเดีย', 'Social Media Management',
   'คอนเทนต์ + ตอบแอดมิน + รายงานรายเดือน ครบจบในที่เดียว',
   'Content + admin replies + monthly reports, all in one team',
   'chat', array['Content plan รายเดือน','Admin ตอบ inbox','Monthly performance report'],
   array['Monthly content plan','Inbox admin','Monthly performance report'], 4, 'published'),

  ('automation',
   'ระบบ Automation & AI', 'Automation & AI',
   'Workflow + Chatbot + ระบบหลังบ้านอัตโนมัติ ลดงานซ้ำซาก',
   'Workflows, chatbots, back-office automation — kill repetitive work',
   'sparkle', array['Chat bot ตอบลูกค้า 24/7','เชื่อม CRM อัตโนมัติ','Workflow n8n / Zapier'],
   array['24/7 chatbot','Auto CRM sync','n8n / Zapier workflows'], 5, 'published'),

  ('production',
   'Production · Video', 'Video Production',
   'ถ่าย ตัด ลง — โฆษณา / รีวิวสินค้า / คอนเทนต์โซเชียล',
   'Shoot, cut, post — ads, product reviews, social content',
   'video', array['วาง concept + scripting','ทีมถ่ายในกรุงเทพฯ','ตัด + ลง พร้อม caption'],
   array['Concept + scripting','Bangkok-based shoot crew','Edit + post with captions'], 6, 'published')
on conflict (slug) do nothing;

-- =============================================================================
-- portfolio_items — managed in Supabase Studio (twodesk-studio is the only live entry)
-- =============================================================================

-- =============================================================================
-- testimonials (3 featured)
-- =============================================================================

insert into testimonials (client_name, client_role, client_company, quote_th, quote_en, rating, featured, sort_order) values
  ('คุณนภา รุ่งเรือง', 'เจ้าของร้าน', 'SportLab',
   'ทีมเข้าใจธุรกิจเร็วมาก คุยรอบเดียวเข้าใจว่าเราขายอะไร แอดที่ออกมาเลยตรงกลุ่ม ROAS ขึ้นจาก 1.8 เป็น 4.2 ในเดือนเดียว',
   'They got our business quickly — one call and they nailed our targeting. ROAS jumped from 1.8 to 4.2 in a month',
   5, true, 1),

  ('คุณวิชัย ทองดี', 'กรรมการผู้จัดการ', 'ก.ก่อสร้างไทย',
   'เว็บใหม่โหลดเร็วกว่าเก่ามาก ลูกค้ากดเข้ามาแล้วไม่หลุด ลีดเข้าเพิ่มขึ้น 3 เท่าตั้งแต่เปิดใช้สัปดาห์แรก',
   'New site loads way faster — visitors don''t bounce. 3× more leads since launch week',
   5, true, 2),

  ('คุณพิมพ์ใจ เจริญสุข', 'เจ้าของร้าน', 'คาเฟ่ บ้านสวน',
   'ระบบ AI ตอบลูกค้าที่ทีมทำให้ ลดงานแอดมินไปวันละเกือบ 3 ชั่วโมง — ใช้เวลาที่เหลือคิดเรื่องผลิตภัณฑ์ใหม่ได้แทน',
   'The AI customer reply system saves us nearly 3 hours of admin work per day — time freed up for product R&D',
   5, true, 3);

-- =============================================================================
-- articles (3 sample posts)
-- =============================================================================

insert into articles (slug, title_th, title_en, excerpt_th, excerpt_en, body_md_th, category, tags, reading_time, published_at, status, author_name) values
  ('5-ways-ai-customer-reply-thai-sme',
   '5 วิธีใช้ AI ลดเวลาตอบลูกค้าใน SME ไทย — ทำได้จริงใน 2 สัปดาห์',
   '5 Ways to Use AI to Reduce Customer Response Time for Thai SMEs',
   'รวม use case ที่เราใช้กับลูกค้าจริง ปรับแล้วเห็นผลใน 2 สัปดาห์',
   'Real use cases from our clients — see results in 2 weeks',
   E'## เกริ่นนำ\n\nลูกค้า SME ที่มาหาเรา 8 ใน 10 ราย มี "ปัญหาตอบลูกค้าไม่ทัน"\n\n## 1. Chatbot ตอบ FAQ บน LINE OA + Facebook\n\nเคสที่เห็นผลเร็วที่สุด — ใช้กับร้านค้าที่มีคำถามซ้ำเดิมเยอะ\n\n## 2. AI ร่างคำตอบอีเมล\n\nทีม sales อ่านอีเมลใหม่ AI ร่างคำตอบให้\n',
   'AI', array['AI','automation','SME','case-study'], 8, '2026-05-05'::timestamptz, 'published', 'ทีม Best Solutions'),

  ('meta-ads-2026-thai',
   'ยิงแอด Meta ปี 2026 ต้องรู้อะไรบ้าง',
   'What You Need to Know About Meta Ads in 2026',
   'อัปเดตอัลกอริทึมล่าสุด พร้อมโครงสร้างแคมเปญที่ใช้ได้จริง',
   'Latest algorithm updates + actually-working campaign structures',
   E'## เกริ่นนำ\n\nMeta อัปเดตอัลกอริทึมในปี 2026 มีอะไรเปลี่ยนไปบ้าง?\n',
   'Digital Marketing', array['ads','meta','facebook'], 6, '2026-05-03'::timestamptz, 'published', 'ธนกิจ ใจทอง'),

  ('thai-seo-90-days',
   'ทำ SEO ภาษาไทยให้ติดหน้าแรกใน 90 วัน',
   'Rank Thai SEO on Page 1 in 90 Days',
   'checklist ที่ใช้กับลูกค้าจริง 30+ เคส — เน้นโครงสร้างก่อนเขียน',
   'Checklist from 30+ real client cases — structure before content',
   E'## เกริ่นนำ\n\nSEO ภาษาไทยให้ติดหน้าแรกใน 90 วัน เป็นไปได้จริงไหม?\n',
   'SEO', array['seo','thai','technical-seo'], 7, '2026-05-01'::timestamptz, 'published', 'SEO Team')
on conflict (slug) do nothing;

-- =============================================================================
-- site_settings — global config
-- =============================================================================

insert into site_settings (key, value, description) values
  ('contact', '{"phone":"095-385-7029","email":"info@bestsolutionscorp.com","line":"@bestsolutions","facebook":"@bestsolutionsagency","hours":"จันทร์-ศุกร์ 9:00-18:00"}'::jsonb, 'Contact channels shown in nav, footer, contact page'),
  ('hero',   '{"eyebrow_th":"Digital Marketing Agency","eyebrow_en":"Digital Marketing Agency","title_th":"วางระบบดิจิทัล ให้ธุรกิจเติบโตอย่างมั่นคง","title_en":"Build a digital system for steady business growth"}'::jsonb, 'Home hero copy'),
  ('stats',  '{"projects":"100+","years":"8","roas":"5.2×","seo_days":"90"}'::jsonb, 'Trust strip + stats band numbers'),
  ('founder','{"name":"ธนกิจ ใจทอง","role":"Founder & Lead Strategist","bio_th":"10 ปีในวงการ Digital Marketing"}'::jsonb, 'Founder bio for About page')
on conflict (key) do nothing;
