"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ALLOWED_EMAIL = "agency.bestsolutions@gmail.com";

export async function signIn(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (email !== ALLOWED_EMAIL) {
    return { error: "ไม่มีสิทธิ์เข้าใช้งาน" };
  }

  const cookieStore = await cookies();
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

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
  }

  redirect("/admin/leads");
}
