"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { MediaImage } from "@/components/media-image";
import { Reveal } from "@/components/reveal";
import type { PortfolioItem } from "@/utils/supabase/types";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-orange-300), var(--color-orange-500))",
  "linear-gradient(135deg, var(--color-blue-300), var(--color-blue-500))",
  "linear-gradient(135deg, #5C1A02, var(--color-orange-700))",
  "linear-gradient(135deg, var(--color-blue-700), var(--color-text))",
  "linear-gradient(135deg, var(--color-peach), var(--color-orange-300))",
  "linear-gradient(135deg, var(--color-orange-500), var(--color-blue-500))",
];

type Props = {
  items: PortfolioItem[];
  categories: string[];
};

export function PortfolioFilter({ items, categories }: Props) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((p) => p.category === active);
  }, [items, active]);

  return (
    <div className="portfolio-layout">
      <aside className="filter-side" aria-label="กรองตามหมวดหมู่">
        <h3 className="filter-side-heading">หมวดหมู่</h3>
        <div className="filter-side-list" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={active === "all"}
            className={`filter-side-item ${active === "all" ? "is-active" : ""}`}
            onClick={() => setActive("all")}
          >
            ทั้งหมด
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              className={`filter-side-item ${active === c ? "is-active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </aside>

      <Reveal className="grid-portfolio">
        {filtered.map((p, i) => {
          const bg = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
          return (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card card-portfolio">
              <MediaImage
                className="card-media"
                src={p.cover_image}
                alt={`ภาพผลงาน ${p.title}`}
                gradient={bg}
                sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                priority={i < 3}
              />
              <div className="card-body">
                <span className="card-meta">
                  <span>{p.category}</span>
                  {p.year ? (
                    <>
                      <span className="card-meta-dot"></span>
                      <span>{p.year}</span>
                    </>
                  ) : null}
                </span>
                <h3 className="card-title">{p.title}</h3>
              </div>
            </Link>
          );
        })}
      </Reveal>
    </div>
  );
}
