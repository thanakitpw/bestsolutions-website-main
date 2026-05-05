-- =============================================================================
-- 0003_storage.sql — Storage buckets + policies
-- 4 public-read buckets for site assets. Auth users can upload/replace.
-- =============================================================================

insert into storage.buckets (id, name, public)
values
  ('blog-covers', 'blog-covers', true),
  ('portfolio',   'portfolio',   true),
  ('services',    'services',    true),
  ('og-images',   'og-images',   true)
on conflict (id) do nothing;

-- =============================================================================
-- Public READ on all 4 buckets
-- =============================================================================

create policy "storage: public read blog-covers"
  on storage.objects for select
  to public
  using (bucket_id = 'blog-covers');

create policy "storage: public read portfolio"
  on storage.objects for select
  to public
  using (bucket_id = 'portfolio');

create policy "storage: public read services"
  on storage.objects for select
  to public
  using (bucket_id = 'services');

create policy "storage: public read og-images"
  on storage.objects for select
  to public
  using (bucket_id = 'og-images');

-- =============================================================================
-- Auth users can INSERT/UPDATE/DELETE on all 4 buckets
-- =============================================================================

create policy "storage: auth write blog-covers"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'blog-covers')
  with check (bucket_id = 'blog-covers');

create policy "storage: auth write portfolio"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'portfolio')
  with check (bucket_id = 'portfolio');

create policy "storage: auth write services"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'services')
  with check (bucket_id = 'services');

create policy "storage: auth write og-images"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'og-images')
  with check (bucket_id = 'og-images');
