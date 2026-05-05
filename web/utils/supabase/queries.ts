import { cookies } from "next/headers";
import { createClient } from "./server";
import type { Article, PortfolioItem, Service, Testimonial, SiteSetting } from "./types";

/**
 * Read helpers for RSC pages. RLS guarantees only published rows are returned to anon.
 * Each helper awaits cookies() and passes to the server client per Supabase docs.
 */

async function db() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getServices(): Promise<Service[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPortfolioItems(opts: { featured?: boolean; limit?: number } = {}): Promise<PortfolioItem[]> {
  const supabase = await db();
  let query = supabase
    .from("portfolio_items")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("year", { ascending: false });
  if (opts.featured) query = query.eq("featured", true);
  if (opts.limit) query = query.limit(opts.limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as PortfolioItem[];
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data as unknown as PortfolioItem | null;
}

export async function getArticles(opts: { category?: string; limit?: number } = {}): Promise<Article[]> {
  const supabase = await db();
  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (opts.category) query = query.eq("category", opts.category);
  if (opts.limit) query = query.limit(opts.limit);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getSiteSetting<T = unknown>(key: string): Promise<T | null> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return (data as SiteSetting).value as T;
}
