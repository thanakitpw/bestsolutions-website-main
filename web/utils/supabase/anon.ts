import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Cookie-free anon client for public page reads.
 *
 * Reading `cookies()` in an RSC opts the whole route out of static rendering,
 * which killed every `export const revalidate` on the site: all 12 public routes
 * were served `no-store` with `x-vercel-cache: MISS` and a 0.6–1.1s TTFB, and
 * hit Supabase once per pageview. Public content is anon-readable through RLS
 * (`status='published'`), so no session is needed — this client passes empty
 * cookie handlers and lets the routes prerender + ISR normally.
 *
 * Authenticated reads must NOT use this: admin goes through `createAdminClient`.
 */
export function createAnonClient() {
  return createServerClient<Database>(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}
