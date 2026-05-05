"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { createAdminClient } from "@/utils/supabase/admin";

const leadSchema = z.object({
  name: z.string().min(2, "กรุณาใส่ชื่อ").max(100),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z.string().max(20).optional(),
  service: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "กรุณายืนยันการยินยอมก่อนส่งข้อมูล",
  }),
  website: z.string().max(0).optional(), // honeypot — must stay empty
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type LeadFormResult = { success: true } | { success: false; error: string };

export async function submitLead(data: LeadFormData): Promise<LeadFormResult> {
  // Honeypot: bots fill this, humans don't
  if (data.website) return { success: false, error: "Invalid submission" };

  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" };
  }

  // IP hash for rate limiting — never store raw IP
  const headerStore = await headers();
  const rawIp = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = createHash("sha256")
    .update(rawIp + (process.env.IP_HASH_SALT ?? "bs-2026"))
    .digest("hex")
    .slice(0, 20);

  const supabase = createAdminClient();

  // Rate limit: max 3 submissions per IP per hour
  const oneHourAgo = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= 3) {
    return { success: false, error: "ส่งข้อมูลบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่" };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;

  const { error } = await supabase.from("leads").insert({
    name: fields.name,
    email: fields.email,
    phone: fields.phone ?? null,
    service: fields.service ?? null,
    budget: fields.budget ?? null,
    message: fields.message ?? null,
    ip_hash: ipHash,
    source: "contact-form",
  });

  if (error) {
    console.error("[submitLead] Supabase error:", error.message);
    return { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
  }

  return { success: true };
}
