import { useState, type FormEvent } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { addReview } from "../../data/reviews";
import { useStore } from "../../store/StoreContext";

export function ReviewForm({ productSlug }: { productSlug?: string }) {
  const { showToast } = useStore();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      showToast("Введите имя", "heart-off");
      return;
    }
    if (text.trim().length < 10) {
      showToast("Напишите отзыв (минимум 10 символов)", "heart-off");
      return;
    }

    addReview({
      productSlug: productSlug ?? null,
      authorName: name.trim(),
      rating,
      text: text.trim(),
    });

    setSubmitted(true);
    showToast("Отзыв опубликован!", "check");
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-gold-500/30 bg-gold-500/10 px-6 py-5">
        <CheckCircle2 size={20} className="shrink-0 text-gold-400" aria-hidden />
        <p className="text-sm text-cream-100">
          Спасибо за ваш отзыв! Он опубликован и будет виден другим покупателям.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="review-name" className="mb-2 block text-[11px] font-semibold uppercase tracking-luxe text-graphite-400">
          Ваше имя
        </label>
        <input
          id="review-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как вас зовут?"
          className="w-full rounded-xl border border-ink-950/15 bg-cream-100 px-4 py-3 text-sm text-ink-950 placeholder:text-graphite-400 focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-luxe text-graphite-400">
          Оценка
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="cursor-pointer transition-transform hover:scale-110"
              aria-label={`${star} из 5`}
            >
              <Star
                size={24}
                className={
                  star <= (hoveredStar || rating)
                    ? "fill-gold-500 text-gold-500"
                    : "text-graphite-400/40"
                }
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-text" className="mb-2 block text-[11px] font-semibold uppercase tracking-luxe text-graphite-400">
          Отзыв
        </label>
        <textarea
          id="review-text"
          required
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Расскажите о вашем опыте..."
          className="w-full resize-none rounded-xl border border-ink-950/15 bg-cream-100 px-4 py-3 text-sm text-ink-950 placeholder:text-graphite-400 focus:border-gold-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-ink-950 px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 transition-all hover:bg-ink-800 hover:shadow-lg cursor-pointer"
      >
        Оставить отзыв
      </button>
    </form>
  );
}
