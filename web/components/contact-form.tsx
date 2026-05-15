"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitLead } from "@/app/[locale]/contact/actions";
import type { LeadFormData } from "@/app/[locale]/contact/actions";

const schema = z.object({
  name: z.string().min(2, "กรุณาใส่ชื่อ").max(100),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z.string().max(20).optional(),
  service: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "กรุณายืนยันการยินยอมก่อนส่งข้อมูล",
  }),
  website: z.string().max(0).optional(),
});

type Props = {
  lineHandle: string;
};

export function ContactForm({ lineHandle }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: LeadFormData) => {
    setServerError(null);
    const result = await submitLead(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error);
    }
  };

  if (submitted) {
    return (
      <div className="form card" style={{ padding: "var(--space-10)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--space-6)", textAlign: "center", minHeight: 400 }}>
        <div style={{ fontSize: "3rem" }} aria-hidden="true">✅</div>
        <h2 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>ได้รับข้อมูลแล้ว</h2>
        <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
          ทีมจะติดต่อกลับภายใน 1 วันทำการ<br />
          หรือทัก LINE <strong>{lineHandle}</strong> เพื่อคุยต่อได้เลย
        </p>
      </div>
    );
  }

  return (
    <form className="form card" style={{ padding: "var(--space-10)" }} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <span className="eyebrow-chip">● ฟอร์มติดต่อ</span>
        <h2 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--text-2xl)" }}>เล่าโจทย์ให้เราฟังก่อนได้</h2>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>ทีมจะติดต่อกลับภายใน 1 วันทำการ</p>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label form-label-required" htmlFor="lead-name">ชื่อ-นามสกุล</label>
          <input
            className={`form-input${errors.name ? " is-error" : ""}`}
            id="lead-name"
            type="text"
            placeholder="เช่น ธนกิจ ใจทอง"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && <span className="form-error" role="alert">{errors.name.message}</span>}
        </div>
        <div className="form-field">
          <label className="form-label form-label-required" htmlFor="lead-phone">เบอร์โทร</label>
          <input
            className="form-input"
            id="lead-phone"
            type="tel"
            placeholder="095-385-7029"
            autoComplete="tel"
            {...register("phone")}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label form-label-required" htmlFor="lead-email">อีเมล</label>
        <input
          className={`form-input${errors.email ? " is-error" : ""}`}
          id="lead-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <span className="form-error" role="alert">{errors.email.message}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-service">บริการที่สนใจ</label>
        <select className="form-select" id="lead-service" {...register("service")}>
          <option value="">ยังไม่แน่ใจ — ขอคำปรึกษา</option>
          <option value="web-design">ออกแบบเว็บไซต์</option>
          <option value="ads">ดูแลแคมเปญโฆษณา Meta &amp; Google</option>
          <option value="seo">SEO</option>
          <option value="social-media">ดูแลโซเชียลมีเดีย</option>
          <option value="ai-automation">Automation &amp; AI</option>
          <option value="production">Production (Video &amp; Content)</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-budget">งบประมาณคร่าว ๆ (ไม่บังคับ)</label>
        <select className="form-select" id="lead-budget" {...register("budget")}>
          <option value="">ยังไม่แน่ใจ</option>
          <option value="under-50k">ต่ำกว่า 50,000 บาท</option>
          <option value="50k-150k">50,000 - 150,000 บาท</option>
          <option value="150k-500k">150,000 - 500,000 บาท</option>
          <option value="over-500k">มากกว่า 500,000 บาท</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-message">รายละเอียดโจทย์</label>
        <textarea
          className="form-textarea"
          id="lead-message"
          placeholder="เล่าให้ฟังว่าธุรกิจของคุณกำลังเจอโจทย์อะไร อยากเริ่มจากตรงไหน หรือมีเป้าหมายแบบใด"
          {...register("message")}
        ></textarea>
        <span className="form-help">ไม่จำเป็นต้องกรอกให้ครบทุกอย่าง เริ่มจากข้อมูลที่มี แล้วเราจะช่วยถามต่อในการคุย</span>
      </div>

      <div className="form-field">
        <label className="form-checkbox-wrap">
          <input
            className="form-checkbox"
            type="checkbox"
            {...register("consent")}
          />
          <span>ยินยอมให้ Best Solutions เก็บข้อมูลตามนโยบายความเป็นส่วนตัว เพื่อใช้ติดต่อกลับเรื่องโปรเจกต์เท่านั้น</span>
        </label>
        {errors.consent && <span className="form-error" role="alert">{errors.consent.message}</span>}
      </div>

      {/* Honeypot — hidden from real users, filled by bots */}
      <div className="form-honeypot" aria-hidden="true">
        <label>
          เว็บไซต์
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {serverError && (
        <div className="form-field" role="alert">
          <span className="form-error">{serverError}</span>
        </div>
      )}

      <div className="form-actions">
        <button className="btn btn-primary btn-arrow" type="submit" disabled={isSubmitting}>
          <span className="btn-label">{isSubmitting ? "กำลังส่ง..." : "ส่งข้อมูล"}</span>
        </button>
        <span className="form-help" style={{ marginTop: 0 }}>
          หรือทัก LINE <strong>{lineHandle}</strong> ได้เช่นกัน
        </span>
      </div>
    </form>
  );
}
