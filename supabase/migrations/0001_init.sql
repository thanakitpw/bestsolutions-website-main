-- =============================================================================
-- 0001_init.sql — core tables + i18n columns
-- Per CLAUDE.md schema. Column-per-locale i18n (title_th/title_en) chosen over
-- join table for solo-dev simplicity.
-- =============================================================================

create extension if not exists "pgcrypto";

-- =============================================================================
-- Enums
-- =============================================================================

create type content_status as enum ('draft', 'published', 'archived');
create type lead_status    as enum ('new', 'contacted', 'qualified', 'closed', 'lost');

-- =============================================================================
-- updated_at trigger
-- =============================================================================

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================================================
-- articles — blog posts (markdown body, per-locale)
-- =============================================================================

create table articles (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title_th        text not null,
  title_en        text,
  excerpt_th      text,
  excerpt_en      text,
  body_md_th      text not null,
  body_md_en      text,
  cover_image     text,
  category        text not null,
  tags            text[] default '{}',
  author_name     text default 'ทีม Best Solutions',
  reading_time    int default 5,
  published_at    timestamptz,
  status          content_status not null default 'draft',
  seo_title       text,
  seo_description text,
  og_image        text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index articles_status_published_at_idx on articles (status, published_at desc);
create index articles_category_idx on articles (category) where status = 'published';
create index articles_slug_idx on articles (slug);

create trigger articles_set_updated_at before update on articles
  for each row execute function set_updated_at();

-- =============================================================================
-- portfolio_items — case studies
-- =============================================================================

create table portfolio_items (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  client          text,
  category        text not null,
  summary_th      text not null,
  summary_en      text,
  body_md_th      text,
  body_md_en      text,
  cover_image     text,
  gallery         text[] default '{}',
  live_url        text,
  services        text[] default '{}',
  tech_stack      text[] default '{}',
  results         jsonb default '[]',
  testimonial_id  uuid,
  year            int,
  duration        text,
  featured        boolean default false,
  sort_order      int default 0,
  status          content_status not null default 'draft',
  seo_title       text,
  seo_description text,
  og_image        text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index portfolio_status_sort_idx on portfolio_items (status, sort_order, year desc);
create index portfolio_category_idx on portfolio_items (category) where status = 'published';
create index portfolio_featured_idx on portfolio_items (featured) where status = 'published' and featured = true;
create index portfolio_slug_idx on portfolio_items (slug);

create trigger portfolio_set_updated_at before update on portfolio_items
  for each row execute function set_updated_at();

-- =============================================================================
-- services
-- =============================================================================

create table services (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name_th         text not null,
  name_en         text,
  summary_th      text not null,
  summary_en      text,
  body_md_th      text,
  body_md_en      text,
  icon            text,
  hero_image      text,
  features_th     text[] default '{}',
  features_en     text[] default '{}',
  pricing_tiers   jsonb default '[]',
  sort_order      int default 0,
  status          content_status not null default 'published',
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index services_status_sort_idx on services (status, sort_order);
create index services_slug_idx on services (slug);

create trigger services_set_updated_at before update on services
  for each row execute function set_updated_at();

-- =============================================================================
-- testimonials
-- =============================================================================

create table testimonials (
  id                    uuid primary key default gen_random_uuid(),
  client_name           text not null,
  client_role           text,
  client_company        text,
  client_avatar         text,
  quote_th              text not null,
  quote_en              text,
  rating                int default 5 check (rating >= 1 and rating <= 5),
  related_service_id    uuid references services(id) on delete set null,
  related_portfolio_id  uuid references portfolio_items(id) on delete set null,
  featured              boolean default false,
  sort_order            int default 0,
  created_at            timestamptz not null default now()
);

alter table portfolio_items
  add constraint portfolio_testimonial_fk
  foreign key (testimonial_id) references testimonials(id) on delete set null;

create index testimonials_featured_idx on testimonials (featured, sort_order) where featured = true;

-- =============================================================================
-- leads — contact form submissions
-- =============================================================================

create table leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  service     text,
  budget      text,
  message     text,
  source      text,
  ip_hash     text,
  status      lead_status not null default 'new',
  notes       text,
  created_at  timestamptz not null default now()
);

create index leads_status_created_idx on leads (status, created_at desc);

-- =============================================================================
-- site_settings — global config (contact info, social, hero CTA, etc.)
-- =============================================================================

create table site_settings (
  key         text primary key,
  value       jsonb not null,
  description text,
  updated_at  timestamptz not null default now()
);

create trigger site_settings_set_updated_at before update on site_settings
  for each row execute function set_updated_at();
