"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

const ALLOWED_EMAIL = "agency.bestsolutions@gmail.com";

export async function sendMagicLink(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const email = formData.get("email")?.toString().trim().toLowerCase();

  if (!email || email !== ALLOWED_EMAIL) {
    return { error: "ไม่มีสิทธิ์เข้าใช้งาน" };
  }

  const cookieStore = await cookies();
  const headersList = await headers();
  const origin = headersList.get("origin") ?? "http://localhost:3000";

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
