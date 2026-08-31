import { motion } from "framer-motion";

interface GlowOrbProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

/** Светящийся орб для декоративных эффектов. */
export function GlowOrb({
  size = 200,
  color = "rgba(191, 161, 95, 0.15)",
  className = "",
  animate = true,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
      aria-hidden
    />
  );
}
