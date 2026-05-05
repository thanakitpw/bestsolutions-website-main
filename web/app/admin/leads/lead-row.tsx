"use client";

import { useTransition } from "react";
import type { Tables } from "../../../utils/supabase/types";
import { markLeadStatus } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  new: "ใหม่",
  contacted: "ติดต่อแล้ว",
  qualified: "คุ้มค่า",
  closed: "ปิดดีล",
  lost: "ไม่ผ่าน",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-orange-100 text-orange-700",
  contacted: "bg-blue-100 text-blue-700",
  qualified: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
  lost: "bg-red-100 text-red-700",
};

type Lead = Pick<
  Tables<"leads">,
  | "id"
  | "name"
  | "email"
  | "phone"
  | "service"
  | "budget"
  | "message"
  | "status"
  | "source"
  | "created_at"
>;

export function LeadRow({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();
  const isNew = lead.status === "new";

  const handleMarkContacted = () => {
    startTransition(() => {
      markLeadStatus(lead.id, "contacted");
    });
  };

  const date = new Date(lead.created_at).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isNew ? "bg-orange-50/30" : ""}`}>
      {/* Unread dot */}
      <td className="px-6 py-4">
        {isNew && (
          <span className="block w-2 h-2 rounded-full bg-[#FF5A1F]" />
        )}
      </td>

      {/* Name / email */}
      <td className="px-6 py-4">
        <p className={`font-medium text-gray-900 ${isNew ? "font-semibold" : ""}`}>
          {lead.name}
        </p>
        <p className="text-gray-500 text-xs mt-0.5">{lead.email}</p>
        {lead.phone && (
          <p className="text-gray-400 text-xs">{lead.phone}</p>
        )}
      </td>

      {/* Service */}
      <td className="px-6 py-4">
        <p className="text-gray-700">{lead.service ?? "—"}</p>
        {lead.budget && (
          <p className="text-gray-400 text-xs mt-0.5">{lead.budget}</p>
        )}
      </td>

      {/* Message */}
      <td className="px-6 py-4 max-w-xs">
        <p className="text-gray-600 line-clamp-2 text-xs leading-relaxed">
          {lead.message ?? "—"}
        </p>
      </td>

      {/* Status badge */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-700"}`}
        >
          {STATUS_LABELS[lead.status] ?? lead.status}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
        {date}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        {isNew && (
          <button
            onClick={handleMarkContacted}
            disabled={pending}
            className="text-xs text-[#FF5A1F] hover:text-[#e84f1a] font-medium transition-colors disabled:opacity-40"
          >
            {pending ? "..." : "ทำเครื่องหมาย"}
          </button>
        )}
      </td>
    </tr>
  );
}
