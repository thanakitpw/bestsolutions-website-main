import { Link } from "@/i18n/navigation";

type Tier = {
  name: string;
  price: string;
  unit?: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "9,900",
    unit: "บาท/เดือน",
    tagline: "เริ่มต้น 1 บริการ — เหมาะกับธุรกิจที่เพิ่งเริ่ม",
    features: [
      "1 บริการ (เลือกได้)",
      "รายงานรายเดือน",
      "Slack / LINE คุยกับทีม",
    ],
    cta: "เริ่มกับ Starter",
    href: "/contact?plan=starter",
  },
  {
    name: "Growth",
    price: "29,900",
    unit: "บาท/เดือน",
    tagline: "2-3 บริการ + Sprint รายสัปดาห์ — ธุรกิจที่พร้อมเร่งโต",
    features: [
      "2-3 บริการรวมกัน",
      "Sprint รายสัปดาห์ + รายงาน",
      "ทีมเฉพาะกิจ 3-4 คน",
      "Strategy review รายไตรมาส",
    ],
    cta: "เริ่มกับ Growth",
    href: "/contact?plan=growth",
    highlight: true,
  },
  {
    name: "Custom",
    price: "ติดต่อ",
    tagline: "Full-service · เอเจนซีในมือคุณ — สำหรับ enterprise",
    features: [
      "ครบทุกบริการ",
      "ทีมเฉพาะกิจขนาดใหญ่",
      "SLA + แผนระยะยาว",
      "Account manager เฉพาะ",
    ],
    cta: "ขอใบเสนอราคา",
    href: "/contact?plan=custom",
  },
];

export function ServicesPricing() {
  return (
    <div className="services-pricing">
      {TIERS.map((tier) => (
        <article
          key={tier.name}
          className={`pricing-card${tier.highlight ? " pricing-card-highlight" : ""}`}
        >
          {tier.highlight && <span className="pricing-badge">แนะนำ</span>}
          <h3 className="pricing-name">{tier.name}</h3>
          <div className="pricing-price">
            {tier.price !== "ติดต่อ" ? (
              <>
                <span className="pricing-price-prefix">เริ่มต้น</span>
                <span className="pricing-price-num tabular">{tier.price}</span>
                <span className="pricing-price-unit">{tier.unit}</span>
              </>
            ) : (
              <span className="pricing-price-num">{tier.price}</span>
            )}
          </div>
          <p className="pricing-tagline">{tier.tagline}</p>
          <ul className="pricing-features">
            {tier.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link
            href={tier.href}
            className={`btn ${tier.highlight ? "btn-primary" : "btn-secondary"} btn-arrow pricing-cta`}
          >
            <span className="btn-label">{tier.cta}</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
