import localFont from "next/font/local";

export const lineSeedSansThai = localFont({
  variable: "--font-line-seed",
  display: "swap",
  src: [
    { path: "../public/fonts/LINESeedSansTH-Regular.woff2",   weight: "400", style: "normal" },
    { path: "../public/fonts/LINESeedSansTH-Bold.woff2",      weight: "700", style: "normal" },
    { path: "../public/fonts/LINESeedSansTH-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/LINESeedSansTH-Black.woff2",     weight: "900", style: "normal" },
  ],
  preload: true,
  fallback: [
    "IBM Plex Sans Thai",
    "IBM Plex Sans",
    "system-ui",
    "-apple-system",
    "Helvetica Neue",
    "sans-serif",
  ],
});
