import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th"],
  defaultLocale: "th",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
