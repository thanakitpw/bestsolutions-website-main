"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

type AccordionItem = {
  id: string;
  href: string;
  title: string;
  summary: string;
  features: string[];
};

export function ServicesAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="services-accordion">
      {items.map((item, i) => {
        const isOpen = i === openIndex;
        return (
          <div
            key={item.id}
            className={`acc-item ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              className="acc-item-head"
              aria-expanded={isOpen}
              aria-controls={`acc-body-${item.id}`}
              onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
            >
              <h3 className="acc-item-title">{item.title}</h3>
              <span className="acc-item-num" aria-hidden="true">
                ({String(i + 1).padStart(2, "0")})
              </span>
            </button>
            <div
              id={`acc-body-${item.id}`}
              className="acc-item-body"
              role="region"
            >
              <div className="acc-item-body-inner">
                <p className="acc-item-desc">{item.summary}</p>
                {item.features.length > 0 ? (
                  <ul className="acc-features">
                    {item.features.slice(0, 3).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                ) : null}
                <Link href={item.href} className="acc-item-link">
                  ดูรายละเอียด <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
