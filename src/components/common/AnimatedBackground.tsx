import { useMemo } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
  variant?: "dark" | "light";
}

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

/** Анимированный фон с движущимися световыми орбами. */
export function AnimatedBackground({
  className = "",
  variant = "dark",
}: AnimatedBackgroundProps) {
  const orbs = useMemo<Orb[]>(() => {
    const colors =
      variant === "dark"
        ? [
            "rgba(191, 161, 95, 0.08)",
            "rgba(191, 161, 95, 0.05)",
            "rgba(191, 161, 95, 0.12)",
            "rgba(191, 161, 95, 0.03)",
          ]
        : [
            "rgba(191, 161, 95, 0.06)",
            "rgba(191, 161, 95, 0.04)",
            "rgba(191, 161, 95, 0.08)",
            "rgba(191, 161, 95, 0.02)",
          ];

    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 150 + Math.random() * 250,
      color: colors[i % colors.length],
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
  }, [variant]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
