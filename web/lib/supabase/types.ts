/**
 * Database types — manual stub matching supabase/migrations/0001-0003.
 * Regenerate with: `supabase gen types typescript --project-id dhftyjnzqkyocfhtmjet > web/lib/supabase/types.ts`
 * after migrations are applied.
 */

export type ContentStatus = "draft" | "published" | "archived";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";

export interface Article {
  id: string;
  slug: string;
  title_th: string;
  title_en: string | null;
  excerpt_th: string | null;
  excerpt_en: string | null;
  body_md_th: string;
  body_md_en: string | null;
  cover_image: string | null;
  category: string;
  tags: string[];
  author_name: string;
  reading_time: number;
  published_at: string | null;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioResult {
  metric: string;
  value: string;
  label: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  category: string;
  summary_th: string;
  summary_en: string | null;
  body_md_th: string | null;
  body_md_en: string | null;
  cover_image: string | null;
  gallery: string[];
  live_url: string | null;
  services: string[];
  tech_stack: string[];
  results: PortfolioResult[];
  testimonial_id: string | null;
  year: number | null;
  duration: string | null;
  featured: boolean;
  sort_order: number;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface Service {
  id: string;
  slug: string;
  name_th: string;
  name_en: string | null;
  summary_th: string;
  summary_en: string | null;
  body_md_th: string | null;
  body_md_en: string | null;
  icon: string | null;
  hero_image: string | null;
  features_th: string[];
  features_en: string[];
  pricing_tiers: PricingTier[];
  sort_order: number;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  client_company: string | null;
  client_avatar: string | null;
  quote_th: string;
  quote_en: string | null;
  rating: number;
  related_service_id: string | null;
  related_portfolio_id: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  source: string | null;
  ip_hash: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: unknown;
  description: string | null;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: Omit<Article, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Article>;
      };
      portfolio_items: {
        Row: PortfolioItem;
        Insert: Omit<PortfolioItem, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<PortfolioItem>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Service>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at"> & { id?: string };
        Update: Partial<Testimonial>;
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at"> & { id?: string };
        Update: Partial<Lead>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: SiteSetting;
        Update: Partial<SiteSetting>;
      };
    };
    Enums: {
      content_status: ContentStatus;
      lead_status: LeadStatus;
    };
  };
}
