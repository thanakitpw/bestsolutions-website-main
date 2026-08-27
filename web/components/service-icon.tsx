type Props = {
  name: string | null;
  className?: string;
};

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ServiceIcon({ name, className }: Props) {
  switch (name) {
    case "web":
      return (
        <svg {...svgProps} className={className}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 8h18M8 12h6" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...svgProps} className={className}>
          <path d="M3 11l18-7v16L3 13z" />
          <path d="M11 19c0 1.5-1 3-3 3s-3-1.5-3-3" />
        </svg>
      );
    case "search":
      return (
        <svg {...svgProps} className={className}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.5-4.5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...svgProps} className={className}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...svgProps} className={className}>
          <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...svgProps} className={className}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
  }
}
