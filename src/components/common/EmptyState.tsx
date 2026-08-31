import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";

/** Единое пустое состояние для каталога, избранного и корзины. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/30 bg-cream-100 text-gold-600">
        {icon ?? <PackageSearch size={30} strokeWidth={1.4} aria-hidden />}
      </span>
      <h2 className="font-display text-2xl font-medium text-ink-950 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite-400">
          {description}
        </p>
      )}
      {action && (
        <Link
          to={action.to}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream-50 transition-all duration-300 hover:bg-ink-800 hover:shadow-lg hover:shadow-gold-500/15"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
