"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createAdminClient } from "../../../utils/supabase/admin";
import type { LeadStatus } from "../../../utils/supabase/types";

export async function markLeadStatus(id: string, status: LeadStatus) {
  // Verify we have a session (middleware already guards, but double-check)
  void cookies();

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function exportLeadsCsv(): Promise<string> {
  void cookies();

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id,name,email,phone,service,budget,message,status,source,created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const headers = ["ID", "ชื่อ", "อีเมล", "โทร", "บริการ", "งบ", "ข้อความ", "สถานะ", "แหล่งที่มา", "วันที่"];
  const rows = (data ?? []).map((r) => [
    r.id,
    r.name,
    r.email,
    r.phone ?? "",
    r.service ?? "",
    r.budget ?? "",
    (r.message ?? "").replace(/"/g, '""'),
    r.status,
    r.source ?? "",
    r.created_at,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  return csv;
}
