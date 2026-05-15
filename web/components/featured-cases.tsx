import { Link } from "@/i18n/navigation";
import { MediaImage } from "@/components/media-image";
import { pickLocale } from "@/utils/format";
import type { PortfolioItem } from "@/utils/supabase/types";

const GRADIENTS = [
  "linear-gradient(135deg, var(--color-orange-500), var(--color-peach))",
  "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))",
  "linear-gradient(135deg, var(--color-text), var(--color-orange-700))",
];

type Props = {
  items: PortfolioItem[];
  locale: string;
};

export function FeaturedCases({ items, locale }: Props) {
  if (!items.length) return null;
  return (
    <div className="grid-3 services-cases">
      {items.map((p, i) => {
        const summary = pickLocale(locale, p.summary_th, p.summary_en ?? p.summary_th);
        return (
          <Link key={p.id} href={`/portfolio/${p.slug}`} className="card card-portfolio">
            <MediaImage
              className="card-media"
              src={p.cover_image}
              alt={`ภาพผลงาน ${p.title}`}
              gradient={GRADIENTS[i % GRADIENTS.length]}
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
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
              <p className="card-desc">{summary}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
