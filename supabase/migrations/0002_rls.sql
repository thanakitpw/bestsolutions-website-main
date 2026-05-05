-- =============================================================================
-- 0002_rls.sql — Row Level Security
-- anon: public READ on published content; INSERT-only on leads (no SELECT)
-- authenticated: full CRUD (admin via Supabase Auth)
-- service_role: bypasses RLS (used by admin server-actions)
-- =============================================================================

alter table articles         enable row level security;
alter table portfolio_items  enable row level security;
alter table services         enable row level security;
alter table testimonials     enable row level security;
alter table leads            enable row level security;
alter table site_settings    enable row level security;

-- =============================================================================
-- Public READ (anon + authenticated): only published rows
-- =============================================================================

create policy "articles: public read published"
  on articles for select
  using (status = 'published');

create policy "portfolio: public read published"
  on portfolio_items for select
  using (status = 'published');

create policy "services: public read published"
  on services for select
  using (status = 'published');

create policy "testimonials: public read all"
  on testimonials for select
  using (true);

create policy "site_settings: public read all"
  on site_settings for select
  using (true);

-- =============================================================================
-- Authenticated full CRUD (admin role)
-- =============================================================================

create policy "articles: auth all"
  on articles for all
  to authenticated
  using (true) with check (true);

create policy "portfolio: auth all"
  on portfolio_items for all
  to authenticated
  using (true) with check (true);

create policy "services: auth all"
  on services for all
  to authenticated
  using (true) with check (true);

create policy "testimonials: auth all"
  on testimonials for all
  to authenticated
  using (true) with check (true);

create policy "site_settings: auth all"
  on site_settings for all
  to authenticated
  using (true) with check (true);

-- =============================================================================
-- Leads — anon INSERT only, auth full CRUD
-- =============================================================================

create policy "leads: anon insert"
  on leads for insert
  to anon
  with check (true);

create policy "leads: auth all"
  on leads for all
  to authenticated
  using (true) with check (true);
