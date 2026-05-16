import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Best Solutions — Digital Marketing Agency",
    short_name: "Best Solutions",
    description:
      "เอเจนซีดิจิทัลมาร์เก็ตติ้งกรุงเทพฯ — ออกแบบเว็บ ทำโฆษณา SEO ดูแลโซเชียล AI Automation",
    start_url: "/th",
    display: "standalone",
    background_color: "#F5F3EE",
    theme_color: "#F5F3EE",
    lang: "th",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
