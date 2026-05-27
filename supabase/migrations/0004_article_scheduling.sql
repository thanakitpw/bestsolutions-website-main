-- =============================================================================
-- Scheduled publishing for articles
-- =============================================================================
-- An article becomes public only when status='published' AND its published_at
-- has been reached. Setting status='published' with a future published_at in
-- Supabase Studio schedules the post — it goes live automatically at that time
-- with no cron job (public reads use the anon role, gated here by RLS; the app
-- queries mirror this with .lte('published_at', now())).
--
-- NOTE: published_at is timestamptz and Supabase Studio shows/enters UTC.
-- Thailand is UTC+7 — to publish at 09:00 Bangkok, set published_at to 02:00.

drop policy if exists "articles: public read published" on articles;

create policy "articles: public read published"
  on articles for select
  using (
    status = 'published'
    and published_at is not null
    and published_at <= now()
  );
