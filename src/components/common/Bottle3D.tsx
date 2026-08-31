import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Bottle3DProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
}

/** 3D-модель флакона с интерактивным вращением за курсором. */
export function Bottle3D({ src, alt, name, className = "" }: Bottle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useTransform(
    springX,
    [-0.5, 0, 0.5],
    [0, 0.1, 0.2]
  );

  function handleMouseMove(event: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
    >
      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Основное изображение */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-ink-800 to-ink-950"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full object-cover"
            style={{ transform: "translateZ(30px)" }}
          />

          {/* Блик при наведении */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              x: glareX,
              opacity: glareOpacity,
            }}
          />

          {/* Отражение */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
            aria-hidden
          />
        </motion.div>

        {/* Тень под флаконом */}
        <motion.div
          className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/20 blur-xl"
          animate={{
            scale: isHovered ? 1.1 : 0.9,
            opacity: isHovered ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />

        {/* Свечение вокруг флакона */}
        <motion.div
          className="pointer-events-none absolute -inset-4 rounded-3xl"
          animate={{
            boxShadow: isHovered
              ? "0 0 60px rgba(191, 161, 95, 0.15), 0 0 120px rgba(191, 161, 95, 0.05)"
              : "0 0 0px rgba(191, 161, 95, 0)",
          }}
          transition={{ duration: 0.6 }}
          aria-hidden
        />
      </motion.div>

      {/* Название под флаконом */}
      <motion.p
        className="mt-6 text-center font-display text-lg font-medium text-ink-950"
        animate={{
          y: isHovered ? -5 : 0,
          textShadow: isHovered
            ? "0 0 20px rgba(191, 161, 95, 0.3)"
            : "0 0 0px rgba(191, 161, 95, 0)",
        }}
        transition={{ duration: 0.4 }}
      >
        {name}
      </motion.p>
    </div>
  );
}
