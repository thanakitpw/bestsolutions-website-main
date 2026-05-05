import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";

export const alt = "Best Solutions — Digital Agency · Bangkok";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_DIR = "public/fonts/og";

async function loadFont(name: string) {
  return readFile(join(process.cwd(), FONT_DIR, name));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  const [regular, bold, extraBold] = await Promise.all([
    loadFont("LINESeedSansTH-Regular.ttf"),
    loadFont("LINESeedSansTH-Bold.ttf"),
    loadFont("LINESeedSansTH-ExtraBold.ttf"),
  ]);

  const title = t("metaTitle");
  const description = t("metaDescription");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5F3EE",
          padding: "72px",
          position: "relative",
          fontFamily: "LINE Seed",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #FFB088 0%, #FF5A1F 55%, #C2410C 100%)",
            opacity: 0.85,
            filter: "blur(2px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#FF5A1F",
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1F2937",
              letterSpacing: -0.4,
            }}
          >
            Best Solutions
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#6B7280",
              marginLeft: 8,
            }}
          >
            · {locale === "en" ? "Bangkok Digital Agency" : "เอเจนซีดิจิทัล กรุงเทพฯ"}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#FF5A1F",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {locale === "en" ? "Full-Service · Measurable" : "ครบทุกบริการ · วัดผลได้จริง"}
          </span>

          <span
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            {title}
          </span>

          <span
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "#475569",
              lineHeight: 1.45,
              maxWidth: 940,
            }}
          >
            {description}
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 12,
            }}
          >
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                backgroundColor: "#0F172A",
                color: "#F5F3EE",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              bestsolutionscorp.com
            </div>
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid #1E40AF",
                color: "#1E40AF",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {locale === "en" ? "Web · Ads · SEO · AI" : "เว็บ · แอด · SEO · AI"}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "LINE Seed", data: regular, style: "normal", weight: 400 },
        { name: "LINE Seed", data: bold, style: "normal", weight: 700 },
        { name: "LINE Seed", data: extraBold, style: "normal", weight: 900 },
      ],
    },
  );
}
