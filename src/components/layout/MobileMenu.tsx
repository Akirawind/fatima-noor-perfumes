import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { NAV_LINKS, SITE } from "../../data/site";
import { useBodyLock } from "../../hooks/useBodyLock";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Мобильное меню: выезжающая панель слева. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const navigate = useNavigate();

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  function goTo(to: string) {
    navigate(to);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Меню">
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm cursor-pointer"
      />
      <nav className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ink-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gold-500/15 px-6 py-5">
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-cream-50">
            FATIMA NOOR
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream-100 transition-colors hover:text-gold-400 cursor-pointer"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-6 py-6">
          {NAV_LINKS.map((link, index) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => goTo(link.to)}
                className="flex w-full items-center justify-between border-b border-cream-100/8 py-4 text-left font-display text-xl font-medium text-cream-100 transition-colors hover:text-gold-300 cursor-pointer"
              >
                {link.label}
                <span className="text-xs tracking-luxe text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-gold-500/15 px-6 py-6">
          <p className="text-xs text-cream-200/50">{SITE.workingHours}</p>
          <a
            href={SITE.phoneHref}
            className="mt-2 block font-display text-lg text-gold-400 transition-colors hover:text-gold-300"
          >
            {SITE.phone}
          </a>
        </div>
      </nav>
    </div>
  );
}
