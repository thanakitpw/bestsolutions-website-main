# Best Solutions Corp — Website Redesign

Re-design ของเว็บ https://www.bestsolutionscorp.com — Digital Marketing Agency & Production House.

> Workflow: **Phase 1** static HTML/CSS/JS prototype ใน `prototype/` → ขอ approval → **Phase 2** Next.js 15 + Supabase ใน `web/`.
> ห้ามข้ามเฟส.

## Quick start

### Phase 1 — prototype
```bash
npx serve prototype
# open http://localhost:3000
```

### Phase 2 — Next.js (after Phase 1 approved)
```bash
cd web
pnpm install
pnpm dev
# open http://localhost:3000 → /th
```

## โครงสร้าง

```
.
├── CLAUDE.md            # Project guide (read first)
├── .claude/agents/      # Subagent role definitions (designer, seo-strategist, ...)
├── prototype/           # Phase 1 static prototype (HTML/CSS/JS)
├── web/                 # Phase 2 Next.js app (created later)
├── supabase/            # SQL migrations + seed
└── docs/
    ├── decisions/       # ADRs
    ├── phase1-review/   # Screenshots for founder review
    ├── redirect-map.csv # Old → new URL mapping (for SEO equity)
    └── open-questions.md
```

## Tech stack (locked)

Next.js 15 (App Router) · TypeScript strict · Tailwind v4 · shadcn/ui · Supabase · next-intl · Vercel

Visual: Aigocy-style (light theme), LINE Seed Sans Thai, Blue + Orange palette.

## Plan

ดู `~/.claude/plans/task-jaunty-meerkat.md` (Claude Code plan file) สำหรับ task breakdown ละเอียด T0–T9.

## Founder

Thanakit Chaithong — Best Solutions Corp · Bangkok, Thailand.
