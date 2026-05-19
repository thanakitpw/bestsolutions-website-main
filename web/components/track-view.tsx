"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/gtm";

type Props = {
  event: "service_view" | "portfolio_view" | "blog_read";
  slug: string;
};

export function TrackView({ event, slug }: Props) {
  useEffect(() => {
    pushEvent({ event, slug });
  }, [event, slug]);

  return null;
}
