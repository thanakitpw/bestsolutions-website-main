"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Base pixel injects fbq + init only. PageView is fired from the effect below so
// it also covers App Router client-side navigations (the base script runs once).
export function MetaPixelScript() {
  const pathname = usePathname();
  const ready = useRef(false);

  useEffect(() => {
    if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
    // Skip the very first run: PageView for the initial load is fired inline
    // right after init in the base script to avoid a race with hydration.
    if (!ready.current) {
      ready.current = true;
      return;
    }
    window.fbq("track", "PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    // lazyOnload, not afterInteractive: fbevents.js + its signals config is
    // ~145 KB and was landing inside the LCP window (mobile Perf 69–76, TBT
    // ~300 ms). PageView still fires — just after the page has painted.
    <Script id="meta-pixel-base" strategy="lazyOnload">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}

export function MetaPixelNoScript() {
  if (!PIXEL_ID) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
