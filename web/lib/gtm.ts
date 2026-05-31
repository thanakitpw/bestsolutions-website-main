// dataLayer events routed by GTM to GA4; the same events also fire the Meta
// Pixel directly via fbq (see docs/decisions/0003-analytics.md + meta-pixel.tsx).

type GtmEvent =
  | { event: "lead_submit"; service?: string | undefined; budget?: string | undefined }
  | { event: "service_view"; slug: string }
  | { event: "portfolio_view"; slug: string }
  | { event: "blog_read"; slug: string }
  | { event: "cta_click"; channel: string; location: string };

type Fbq = (
  method: "track" | "trackCustom",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: Fbq & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
  }
}

// Maps an internal event to the matching Meta Pixel call. Lead/Contact are
// standard Meta events; the view events stay custom so they don't pollute
// standard-event optimization in Ads Manager.
function trackPixel(payload: GtmEvent) {
  if (typeof window === "undefined" || !window.fbq) return;

  switch (payload.event) {
    case "lead_submit":
      window.fbq("track", "Lead", {
        content_category: payload.service,
        budget: payload.budget,
      });
      break;
    case "cta_click":
      window.fbq("track", "Contact", {
        channel: payload.channel,
        location: payload.location,
      });
      break;
    case "service_view":
      window.fbq("trackCustom", "ServiceView", { slug: payload.slug });
      break;
    case "portfolio_view":
      window.fbq("trackCustom", "PortfolioView", { slug: payload.slug });
      break;
    case "blog_read":
      window.fbq("trackCustom", "BlogRead", { slug: payload.slug });
      break;
  }
}

export function pushEvent(payload: GtmEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  trackPixel(payload);
}
