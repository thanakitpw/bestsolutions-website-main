"use client";

import { useLenis } from "lenis/react";

type Props = {
  targetId: string;
  ariaLabel: string;
  children: React.ReactNode;
};

export function HeroScrollLink({ targetId, ariaLabel, children }: Props) {
  const lenis = useLenis();

  return (
    <a
      href={`#${targetId}`}
      className="hero-scroll"
      aria-label={ariaLabel}
      onClick={(e) => {
        const el = document.getElementById(targetId);
        if (!el) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.2, offset: -20 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </a>
  );
}
