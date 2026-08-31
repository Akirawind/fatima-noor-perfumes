import { Fragment } from "react";

/** Бесконечная бегущая строка — люксовый разделитель с названиями нот. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div
      className="relative overflow-hidden border-y border-gold-500/15 bg-ink-950 py-5"
      aria-hidden
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <Fragment key={item}>
                <span className="px-8 font-display text-2xl font-medium italic tracking-wide text-cream-200/35 sm:text-3xl">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-500/50" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
      {/* Мягкие края */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
