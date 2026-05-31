"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/gtm";

// Maps a link's href to a contact channel. Returns null for links that aren't
// a direct contact action (internal nav etc.) so we don't over-fire cta_click.
function channelFromHref(href: string): string | null {
  const h = href.toLowerCase();
  if (h.startsWith("tel:")) return "phone";
  if (h.startsWith("mailto:")) return "email";
  if (h.includes("lin.ee") || h.includes("line.me")) return "line";
  if (h.includes("m.me") || h.includes("messenger.com")) return "messenger";
  if (h.includes("wa.me") || h.includes("whatsapp")) return "whatsapp";
  return null;
}

// Site-wide delegated tracker: fires cta_click -> Meta `Contact` for every
// in-content LINE/tel/Messenger link, including the ad landing page. The
// floating FAB fires its own cta_click, so links inside `.fab-contact` are
// skipped to avoid double-counting. Set `data-cta-location` on a link to
// label where it sits; otherwise the current pathname is used.
export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.closest(".fab-contact")) return;

      const channel = channelFromHref(anchor.getAttribute("href") ?? "");
      if (!channel) return;

      pushEvent({
        event: "cta_click",
        channel,
        location: anchor.dataset.ctaLocation ?? window.location.pathname,
      });
    };

    // Capture phase so it runs before any stopPropagation / navigation.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
