import Image from "next/image";

export type Brand = { name: string; logo: string; width: number; height: number };

/** Client logos live in web/public/brands/ — exported at 2x the tile height. */
export const BRANDS: Brand[] = [
  { name: "AIRA Leasing", logo: "/brands/aira-leasing.webp", width: 240, height: 120 },
  { name: "Blue Rich Material Products", logo: "/brands/blue-rich-material-products.webp", width: 135, height: 120 },
  { name: "De Beau Clinic", logo: "/brands/de-beau-clinic.webp", width: 296, height: 120 },
  { name: "HTC Home Tools Center", logo: "/brands/htc-home-tools-center.webp", width: 258, height: 120 },
  { name: "Infinite Material and Technology", logo: "/brands/infinite-material-technology.webp", width: 126, height: 120 },
  { name: "Natchaya Clinic", logo: "/brands/natchaya-clinic.webp", width: 371, height: 120 },
  { name: "Orange Smile Dental Clinic", logo: "/brands/orange-smile-dental-clinic.webp", width: 123, height: 120 },
  { name: "SUPP", logo: "/brands/supp.webp", width: 400, height: 114 },
  { name: "SUPP Space", logo: "/brands/supp-space.webp", width: 203, height: 120 },
  { name: "TFI", logo: "/brands/tfi.webp", width: 347, height: 120 },
  { name: "Uoneplus Group", logo: "/brands/uoneplus-group.webp", width: 120, height: 120 },
  { name: "TwoDesk Studio", logo: "/brands/twodesk-studio.svg", width: 554, height: 88 },
];

type Props = {
  className?: string;
  limit?: number;
};

export function ClientLogoStrip({ className, limit }: Props) {
  const brands = limit ? BRANDS.slice(0, limit) : BRANDS;
  return (
    <div className={className}>
      {brands.map((b) => (
        <Image
          key={b.name}
          src={b.logo}
          alt={`โลโก้ ${b.name}`}
          width={b.width}
          height={b.height}
          loading="lazy"
        />
      ))}
    </div>
  );
}
