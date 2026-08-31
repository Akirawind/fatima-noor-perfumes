import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";
import { canUseAdvancedMotion } from "../../utils/motionPrefs";

/** Лёгкий 3D-наклон карточки за курсором. Работает только на desktop. */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 24, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 24, mass: 0.6 });

  function handleMove(event: React.MouseEvent) {
    const el = ref.current;
    if (!el || !canUseAdvancedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/** Магнитная кнопка: тянется к курсору в небольшом радиусе. */
export function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.5 });

  function handleMove(event: React.MouseEvent) {
    const el = ref.current;
    if (!el || !canUseAdvancedMotion()) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
