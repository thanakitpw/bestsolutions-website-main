import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main" style={{ padding: "200px 24px 120px", textAlign: "center" }}>
      <span className="eyebrow-pill">
        <span className="star">✦</span>
        <span>Phase 2 · bootstrap verified</span>
      </span>
      <h1 style={{ maxWidth: "22ch", margin: "24px auto 32px" }}>
        ทำการตลาดออนไลน์ที่วัดผลได้จริง
      </h1>
      <p
        style={{
          maxWidth: 640,
          margin: "0 auto",
          fontSize: "var(--text-xl)",
          color: "var(--color-text-muted)",
          lineHeight: "var(--leading-normal)",
        }}
      >
        Tokens loaded · LINE Seed Sans Thai · next-intl ({locale}) · Tailwind v4 — page port
        ตามมาเป๊ะ ๆ ตาม <code>prototype/index.html</code> ใน T4.2
      </p>
    </main>
  );
}
