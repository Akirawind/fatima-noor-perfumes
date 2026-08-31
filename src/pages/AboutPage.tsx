import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ActionButton } from "../components/common/ActionButton";
import { OrnamentDivider, Reveal, SectionHeading } from "../components/common/Section";
import { Newsletter } from "../components/common/Newsletter";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const VALUES = [
  {
    title: "Наследие Востока",
    text: "Композиции, вдохновлённые традициями арабской парфюмерии: уд, амбра, роза и пряности.",
  },
  {
    title: "Современная эстетика",
    text: "Классические восточные аккорды в актуальном, универсальном звучании — для города и путешествий.",
  },
  {
    title: "Характер",
    text: "Мы отбираем ароматы с выраженной индивидуальностью: те, что узнают и запоминают.",
  },
];

export function AboutPage() {
  useDocumentMeta({
    title: "О бренде — Fatima Noor | Искусство восточной парфюмерии",
    description:
      "Fatima Noor — восточная парфюмерия с характером. Философия бренда, подход к композициям и эстетике.",
  });

  return (
    <>
      <section className="texture-noise relative overflow-hidden bg-ink-950 pb-20 pt-32 sm:pt-40">
        <div className="glow-radial pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-500">
            О бренде
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-cream-50 sm:text-6xl">
            Роскошь, заключённая{" "}
            <em className="not-italic text-gold-400">во флаконе</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream-200/70 sm:text-base">
            Fatima Noor — это взгляд на парфюмерию через призму восточных традиций:
            глубокие материалы, щедрые композиции и уважение к тем, кто выбирает
            аромат как часть своего образа.
          </p>
        </div>
        <OrnamentDivider className="mt-14" />
      </section>

      <section aria-label="Философия бренда" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <article className="premium-card rounded-2xl border border-ink-950/10 bg-cream-100 p-8 transition-all duration-500 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-700/8">
                <span className="font-display text-3xl font-medium text-gold-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-2xl font-medium text-ink-950">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-graphite-400">{value.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <SectionHeading
            eyebrow="Подход"
            title="Композиции с историей"
            description="Каждый аромат в каталоге отобран по трём критериям: глубина звучания, стойкость и узнаваемость. Мы верим, что парфюмерия — это невидимый аксессуар, который завершает образ."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-ink-800 to-ink-950 px-7 py-12 text-center sm:px-12">
            <div className="glow-radial pointer-events-none absolute -left-20 -top-20 h-64 w-64 opacity-50" aria-hidden />
            <blockquote className="relative mx-auto max-w-2xl font-display text-2xl font-medium italic leading-snug text-cream-100 sm:text-3xl">
              «Аромат вашего характера — тот, который невозможно забыть»
            </blockquote>
            <OrnamentDivider className="mt-8" />
            <ActionButton to="/catalog" variant="gold" size="lg" className="relative mt-8">
              Открыть каталог
              <ArrowRight size={15} aria-hidden />
            </ActionButton>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-ink-950/8 bg-cream-50 py-16 text-center">
        <h2 className="font-display text-2xl font-medium text-ink-950 sm:text-3xl">
          Готовы найти свой аромат?
        </h2>
        <Link
          to="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-950/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950 transition-all hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-700"
        >
          Перейти в каталог
          <ArrowRight size={15} aria-hidden />
        </Link>
      </section>

      <Newsletter />
    </>
  );
}
