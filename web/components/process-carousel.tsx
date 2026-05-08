"use client";

import { useRef, type ReactNode } from "react";

export type ProcessStep = {
  num: string;
  total: string;
  duration: string;
  title: string;
  description: string;
  icon: ReactNode;
};

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  steps: ProcessStep[];
};

export function ProcessCarousel({ eyebrow, title, description, steps }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ss-pc-card");
    const step = card ? card.offsetWidth + 24 : 360;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="ss-pc">
      <div className="ss-pc-side">
        <span className="eyebrow-chip is-blue">● {eyebrow}</span>
        <h2 className="ss-pc-title">{title}</h2>
        {description && <p className="ss-pc-desc-side">{description}</p>}
        <div className="ss-pc-controls" role="group" aria-label="เลื่อนการ์ดขั้นตอน">
          <button
            type="button"
            className="ss-pc-arrow"
            aria-label="ก่อนหน้า"
            onClick={() => scrollBy(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="ss-pc-arrow"
            aria-label="ถัดไป"
            onClick={() => scrollBy(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="ss-pc-track" ref={scrollerRef}>
        {steps.map((step) => (
          <article className="ss-pc-card" key={step.num}>
            <div className="ss-pc-icon" aria-hidden="true">
              {step.icon}
            </div>
            <div className="ss-pc-body">
              <h3 className="ss-pc-card-title">{step.title}</h3>
              <p className="ss-pc-desc">{step.description}</p>
            </div>
            <div className="ss-pc-foot">
              <span className="ss-pc-pill">{step.duration}</span>
              <span className="ss-pc-num" aria-hidden="true">
                <span className="ss-pc-num-active">{step.num}</span>
                <span className="ss-pc-num-total">/{step.total}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
