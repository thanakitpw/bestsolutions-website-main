# `.env.local` template (Phase 2)

When `web/` is created in Phase 2, copy these to `web/.env.local` (which is git-ignored). `web/.env.example` will be committed without secrets.

```dotenv
# Supabase (project: dhftyjnzqkyocfhtmjet)
NEXT_PUBLIC_SUPABASE_URL=https://dhftyjnzqkyocfhtmjet.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_to1K7qeiRwCXMbFnbUEA5A_ULWxeUkm
SUPABASE_SERVICE_ROLE_KEY=                       # add when running server-side admin tasks; never commit

# Analytics
NEXT_PUBLIC_GTM_ID=                              # GTM-XXXXXX
NEXT_PUBLIC_GA_ID=                               # G-XXXXXXXXXX (fallback / direct)
NEXT_PUBLIC_FB_PIXEL_ID=                         # Meta Pixel ID

# Email (Q5 still open — defaulting to Resend)
RESEND_API_KEY=                                  # re_xxx; only used by lead-inbox notifier (T7.6)

# Site
NEXT_PUBLIC_SITE_URL=https://www.bestsolutionscorp.com
```

## Notes

- Publishable key is safe to commit (Supabase v2 publishable-key format is intended for client exposure under RLS) — but we still keep it in `.env.local` per convention.
- Service role key bypasses RLS — **never** expose, never commit, never include in `NEXT_PUBLIC_*`.
- Vercel Production environment will mirror these. Use Vercel dashboard, never check production keys into git.
