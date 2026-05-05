import { createAdminClient } from "../../../utils/supabase/admin";
import { LeadRow } from "./lead-row";
import { CsvExportButton } from "./csv-export-button";

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const supabase = createAdminClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select(
      "id,name,email,phone,service,budget,message,status,source,created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const unread = (leads ?? []).filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">Best Solutions</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-600">Lead Inbox</span>
            {unread > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF5A1F] text-white text-xs font-bold">
                {unread}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <CsvExportButton />
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {!leads || leads.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-sm">ยังไม่มี lead เข้ามา</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-4 font-medium text-gray-500 w-8"></th>
                  <th className="px-6 py-4 font-medium text-gray-500">ชื่อ / อีเมล</th>
                  <th className="px-6 py-4 font-medium text-gray-500">บริการ</th>
                  <th className="px-6 py-4 font-medium text-gray-500">ข้อความ</th>
                  <th className="px-6 py-4 font-medium text-gray-500">สถานะ</th>
                  <th className="px-6 py-4 font-medium text-gray-500">วันที่</th>
                  <th className="px-6 py-4 font-medium text-gray-500 w-32"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
