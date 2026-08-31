import type { CategoryLink } from "../../types";

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  fill: "none",
} as const;

/** Линейный восточный орнамент для карточек категорий. */
export function CategoryArt({
  variant,
  className,
}: {
  variant: CategoryLink["variant"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "arch" && (
        <g {...strokeProps}>
          <path d="M30 96 V52 a30 30 0 0 1 60 0 V96" />
          <path d="M40 96 V54 a20 20 0 0 1 40 0 V96" opacity="0.5" />
          <line x1="24" y1="96" x2="96" y2="96" />
          <path d="M60 34 l3 6 6 1 -4.5 4.5 1 6.5 -5.5 -3 -5.5 3 1 -6.5 -4.5 -4.5 6 -1 z" fill="currentColor" stroke="none" opacity="0.9" />
        </g>
      )}
      {variant === "crescent" && (
        <g {...strokeProps}>
          <path d="M74 22 a38 38 0 1 0 0 76 a30 30 0 1 1 0 -76 z" />
          <path d="M84 46 l2.2 4.8 4.8 2.2 -4.8 2.2 -2.2 4.8 -2.2 -4.8 -4.8 -2.2 4.8 -2.2 z" fill="currentColor" stroke="none" />
        </g>
      )}
      {variant === "star" && (
        <g {...strokeProps}>
          {[0, 45, 90, 135].map((angle) => (
            <rect
              key={angle}
              x="56"
              y="26"
              width="8"
              height="68"
              rx="4"
              transform={`rotate(${angle} 60 60)`}
              opacity={angle % 90 === 0 ? 0.9 : 0.55}
            />
          ))}
          <circle cx="60" cy="60" r="10" />
        </g>
      )}
      {variant === "drop" && (
        <g {...strokeProps}>
          <path d="M60 18 c18 26 28 38 28 54 a28 28 0 1 1 -56 0 c0 -16 10 -28 28 -54 z" />
          <path d="M48 74 a14 14 0 0 0 12 16" opacity="0.6" strokeLinecap="round" />
        </g>
      )}
      {variant === "flame" && (
        <g {...strokeProps}>
          <path d="M60 16 c6 14 22 22 22 42 a22 22 0 1 1 -44 0 c0 -12 6 -18 10 -26 3 7 7 9 12 8 -3 -8 -3 -16 0 -24 z" />
          <path d="M60 66 a10 10 0 1 0 10 10" opacity="0.6" strokeLinecap="round" />
        </g>
      )}
      {variant === "gift" && (
        <g {...strokeProps}>
          <rect x="26" y="50" width="68" height="46" rx="4" />
          <rect x="20" y="36" width="80" height="18" rx="4" />
          <line x1="60" y1="36" x2="60" y2="96" />
          <path d="M60 36 c-14 0 -20 -6 -20 -12 0 -5 4 -8 9 -8 7 0 11 8 11 20 z" />
          <path d="M60 36 c14 0 20 -6 20 -12 0 -5 -4 -8 -9 -8 -7 0 -11 8 -11 20 z" />
        </g>
      )}
    </svg>
  );
}
