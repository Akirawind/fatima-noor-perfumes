import { useMemo } from "react";
import type { ProductArt } from "../../types";
import { hashString } from "../../utils/cn";

interface PerfumeArtProps {
  /** Название аромата — из него детерминированно выводятся пропорции. */
  seed: string;
  palette?: ProductArt;
  className?: string;
}

const DEFAULT_PALETTE: ProductArt = {
  base: "#16120c",
  liquid: "#8a6a35",
  glow: "#bfa15f",
};

/**
 * Декоративный векторный «флакон» — premium-placeholder вместо фотографии.
 * Используется автоматически, когда файл изображения отсутствует,
 * поэтому каталог никогда не выглядит сломанным.
 */
export function PerfumeArt({ seed, palette, className }: PerfumeArtProps) {
  const p = palette ?? DEFAULT_PALETTE;
  const variant = useMemo(() => {
    const h = hashString(seed);
    return {
      width: 150 + ((h % 5) * 9),
      capH: 30 + ((h >> 3) % 4) * 6,
      level: 0.52 + ((h >> 6) % 5) * 0.03,
      sparkleCount: 3 + ((h >> 9) % 3),
    };
  }, [seed]);

  const cx = 150;
  const bodyW = variant.width;
  const bodyX = cx - bodyW / 2;
  const bodyY = 130;
  const bodyH = 210;
  const radius = 16;
  const neckW = 34;
  const neckY = bodyY - 34;
  const capW = 46;
  const liquidY = bodyY + bodyH * (1 - variant.level);

  return (
    <svg
      viewBox="0 0 300 400"
      role="img"
      aria-label={`Декоративная иллюстрация флакона ${seed}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`glow-${variant.width}-${p.glow.slice(1)}`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.28" />
          <stop offset="55%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`liquid-${p.liquid.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.liquid} />
          <stop offset="100%" stopColor={p.base} />
        </linearGradient>
        <linearGradient id={`glass-${p.base.slice(1)}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="82%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Свечение */}
      <rect width="300" height="400" fill={`url(#glow-${variant.width}-${p.glow.slice(1)})`} />

      {/* Тень */}
      <ellipse cx={cx} cy={352} rx={bodyW / 2 + 26} ry={14} fill="#000" opacity="0.45" />

      {/* Горлышко */}
      <rect x={cx - neckW / 2} y={neckY} width={neckW} height={36} fill={p.base} stroke={p.glow} strokeOpacity="0.35" strokeWidth="1.5" />

      {/* Крышка */}
      <rect
        x={cx - capW / 2}
        y={neckY - variant.capH}
        width={capW}
        height={variant.capH - 2}
        rx="7"
        fill={p.glow}
        fillOpacity="0.85"
      />
      <rect
        x={cx - capW / 2 + 6}
        y={neckY - variant.capH + 5}
        width={capW - 12}
        height={4}
        rx="2"
        fill="#000"
        opacity="0.25"
      />

      {/* Корпус */}
      <rect
        x={bodyX}
        y={bodyY}
        width={bodyW}
        height={bodyH}
        rx={radius}
        fill={`url(#glass-${p.base.slice(1)})`}
        stroke={p.glow}
        strokeOpacity="0.55"
        strokeWidth="1.8"
      />

      {/* Жидкость */}
      <rect
        x={bodyX + 8}
        y={liquidY}
        width={bodyW - 16}
        height={bodyY + bodyH - liquidY - 8}
        rx={radius - 6}
        fill={`url(#liquid-${p.liquid.slice(1)})`}
        opacity="0.92"
      />

      {/* Блики */}
      <rect x={bodyX + 14} y={bodyY + 14} width={7} height={bodyH - 40} rx="4" fill="#fff" opacity="0.10" />
      <rect x={bodyX + 27} y={bodyY + 22} width={3} height={bodyH - 70} rx="2" fill="#fff" opacity="0.07" />

      {/* Искры */}
      {Array.from({ length: variant.sparkleCount }, (_, index) => {
        const sx = 48 + ((hashString(seed + index) % 9) * 24);
        const sy = 56 + ((hashString(seed + "y" + index) % 6) * 22);
        const s = 3 + (index % 3);
        return (
          <g key={index} opacity={0.5 - index * 0.1}>
            <path
              d={`M ${sx} ${sy - s} L ${sx + s * 0.28} ${sy - s * 0.28} L ${sx + s} ${sy} L ${sx + s * 0.28} ${sy + s * 0.28} L ${sx} ${sy + s} L ${sx - s * 0.28} ${sy + s * 0.28} L ${sx - s} ${sy} L ${sx - s * 0.28} ${sy - s * 0.28} Z`}
              fill={p.glow}
            />
          </g>
        );
      })}

      {/* Гравировка названия */}
      <text
        x={cx}
        y={330}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="15"
        letterSpacing="3"
        fill="#fff"
        opacity="0.65"
      >
        {seed.toUpperCase().slice(0, 14)}
      </text>
      <line x1={cx - 26} y1={340} x2={cx + 26} y2={340} stroke={p.glow} strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}
