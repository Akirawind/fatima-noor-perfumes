import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useStore } from "../../store/StoreContext";

const SUBSCRIBERS_KEY = "fatimanoor.subscribers.v1";

function saveSubscriber(email: string) {
  try {
    const raw = window.localStorage.getItem(SUBSCRIBERS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) {
      list.push(email);
      window.localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(list));
    }
  } catch {
    /* localStorage may be unavailable */
  }
}

function isAlreadySubscribed(email: string): boolean {
  try {
    const raw = window.localStorage.getItem(SUBSCRIBERS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(email);
  } catch {
    return false;
  }
}

export function Newsletter() {
  const { showToast } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      showToast("Введите корректный e-mail", "heart-off");
      return;
    }
    if (isAlreadySubscribed(email)) {
      showToast("Вы уже подписаны!", "check");
      setSubscribed(true);
      return;
    }
    saveSubscriber(email);
    setSubscribed(true);
    showToast("Подписка оформлена!", "check");
  }

  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-400">
          Рассылка
        </p>
        <h2
          id="newsletter-title"
          className="mt-3 font-display text-3xl font-medium text-cream-50 sm:text-4xl"
        >
          Первым узнавайте о новинках
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream-200/70">
          Подпишитесь, чтобы получать анонсы новых ароматов и закрытые предложения.
        </p>

        {subscribed ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-xl border border-gold-500/30 bg-gold-500/10 px-6 py-4">
            <CheckCircle2 size={20} className="shrink-0 text-gold-400" aria-hidden />
            <p className="text-sm text-cream-100">
              Спасибо! Вы подписались на рассылку.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-mail для подписки
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Ваш e-mail"
              className="h-12 flex-1 rounded-xl border border-cream-100/15 bg-ink-800/60 px-4 text-sm text-cream-100 placeholder:text-graphite-400 focus:border-gold-500/60 focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-gold-500 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950 transition-colors hover:bg-gold-400 cursor-pointer"
            >
              Подписаться
            </button>
          </form>
        )}

        <p className="mt-5 text-xs text-cream-200/40">
          Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности.
          Мы не передаём ваши данные третьим лицам.
        </p>
      </div>
    </section>
  );
}
