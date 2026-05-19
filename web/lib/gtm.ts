// dataLayer events routed by GTM to GA4 + FB Pixel (see docs/decisions/0003-analytics.md)

type GtmEvent =
  | { event: "lead_submit"; service?: string | undefined; budget?: string | undefined }
  | { event: "service_view"; slug: string }
  | { event: "portfolio_view"; slug: string }
  | { event: "blog_read"; slug: string }
  | { event: "cta_click"; channel: string; location: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushEvent(payload: GtmEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
