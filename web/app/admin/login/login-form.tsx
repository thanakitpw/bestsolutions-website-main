"use client";

import { use, useActionState } from "react";
import { sendMagicLink } from "./actions";

export function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = use(searchParams);
  const [state, action, pending] = useActionState(sendMagicLink, null);

  if (state?.success) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-semibold text-gray-900 mb-1">เช็คอีเมลได้เลย</h2>
        <p className="text-sm text-gray-500">
          ส่ง magic link ไปที่อีเมลแล้ว คลิกลิงก์เพื่อเข้าสู่ระบบ
        </p>
      </div>
    );
  }

  const errorMsg =
    state?.error ?? (params.error === "callback_failed" ? "ลิงก์หมดอายุหรือใช้งานแล้ว กรุณาขอใหม่" : null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          อีเมล
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue="agency.bestsolutions@gmail.com"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-colors"
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 px-4 bg-[#FF5A1F] hover:bg-[#e84f1a] text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "กำลังส่ง..." : "ส่ง Magic Link"}
      </button>
    </form>
  );
}
