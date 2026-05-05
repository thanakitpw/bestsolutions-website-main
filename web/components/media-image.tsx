import Image from "next/image";
import type { CSSProperties } from "react";

type Props = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** Gradient or solid color CSS value used when `src` is falsy. */
  gradient?: string | undefined;
  /** Pass-through to next/image. */
  sizes?: string | undefined;
  priority?: boolean | undefined;
  /** Inline style for the wrapper. Use sparingly — prefer className. */
  style?: CSSProperties | undefined;
};

const DEFAULT_SIZES = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";

export function MediaImage({
  src,
  alt,
  className,
  gradient,
  sizes = DEFAULT_SIZES,
  priority = false,
  style,
}: Props) {
  if (!src) {
    return (
      <div
        className={className}
        role="img"
        aria-label={alt}
        style={{ ...(gradient ? { background: gradient } : {}), ...style }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
