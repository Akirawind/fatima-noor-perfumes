import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FOOTER_SECTIONS, SITE } from "../../data/site";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block" aria-label="Fatima Noor — на главную">
              <span className="font-display text-2xl font-semibold tracking-[0.32em] text-cream-50">
                FATIMA NOOR
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/60">
              Магазин арабской парфюмерии. Восточные ароматы,
              современная эстетика, характер, который невозможно забыть.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={SITE.telegram} label="Telegram" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} aria-hidden />
              </SocialLink>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-luxe text-gold-500">
                {section.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream-200/70 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-luxe text-gold-500">
              Контакты
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream-200/70">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
                <a href={SITE.phoneHref} className="transition-colors hover:text-gold-300">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold-300">
                  {SITE.email}
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream-200/40">
            © {new Date().getFullYear()} Fatima Noor Perfumes
          </p>
          <div className="flex gap-6 text-xs text-cream-200/40">
            <span className="cursor-default transition-colors hover:text-gold-400">Политика конфиденциальности</span>
            <span className="cursor-default transition-colors hover:text-gold-400">Пользовательское соглашение</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
  target,
  rel,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={target}
      rel={rel}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-200/70 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-300"
    >
      {children}
    </a>
  );
}
