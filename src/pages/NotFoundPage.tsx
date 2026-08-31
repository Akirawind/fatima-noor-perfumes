import { ActionButton } from "../components/common/ActionButton";
import { OrnamentDivider } from "../components/common/Section";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function NotFoundPage() {
  useDocumentMeta({
    title: "Страница не найдена — Fatima Noor",
    description: "Такой страницы не существует. Вернитесь на главную или в каталог ароматов.",
  });

  return (
    <main className="texture-noise relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-ink-950 px-4 py-32 text-center">
      <div className="glow-radial pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2" aria-hidden />
      <div className="relative">
        <p className="font-display text-[7rem] font-semibold leading-none tracking-tight text-gold-500 sm:text-[10rem]">
          404
        </p>
        <OrnamentDivider className="my-8" />
        <h1 className="font-display text-3xl font-medium text-cream-50 sm:text-4xl">
          Эта страница улетучилась
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream-200/60">
          Как тонкий шлейф — её здесь больше нет. Зато в каталоге всё на месте.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ActionButton to="/" variant="gold" size="lg" className="w-full sm:w-auto">
            На главную
          </ActionButton>
          <ActionButton
            to="/catalog"
            variant="outline"
            size="lg"
            className="w-full border-cream-100/25 sm:w-auto"
          >
            В каталог
          </ActionButton>
        </div>
      </div>
    </main>
  );
}
