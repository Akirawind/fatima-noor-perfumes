import { motion, useScroll, useSpring } from "framer-motion";

/** Тонкая золотая линия прогресса прокрутки под шапкой. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-700 via-gold-400 to-gold-600"
      style={{ scaleX }}
    />
  );
}
