import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/** Тонкий декоративный разделитель в восточном стиле. */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/70 sm:w-20" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
      <span className="h-1 w-1 rotate-45 bg-gold-500/60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/70 sm:w-20" />
    </div>
  );
}

/** Заголовок секции с надзаголовком и описанием. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-luxe text-gold-600 dark:text-gold-400">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-tight font-medium sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-cream-50" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed sm:text-base",
            dark ? "text-cream-200/70" : "text-graphite-400",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Плавное появление блока при прокрутке. */
export function Reveal({
  children,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
