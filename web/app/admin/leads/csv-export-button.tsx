"use client";

import { useTransition } from "react";
import { exportLeadsCsv } from "./actions";

export function CsvExportButton() {
  const [pending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      const csv = await exportLeadsCsv();
      const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <button
      onClick={handleExport}
      disabled={pending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-xl transition-colors disabled:opacity-40"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {pending ? "กำลัง export..." : "Export CSV"}
    </button>
  );
}
