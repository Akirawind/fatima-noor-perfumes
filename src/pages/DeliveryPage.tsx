import { CreditCard, MessageCircle, Package, Phone, Truck } from "lucide-react";
import { OrnamentDivider, Reveal, SectionHeading } from "../components/common/Section";
import { SITE } from "../data/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const DELIVERY_OPTIONS = [
  {
    icon: Truck,
    title: "Курьер по городу",
    price: "350 ₽",
    time: "1–2 дня",
    text: "Заказы от 5 000 ₽ доставляем бесплатно.",
  },
  {
    icon: Package,
    title: "Пункты выдачи",
    price: "от 200 ₽",
    time: "2–4 дня",
    text: "Более 30 000 пунктов по всей России.",
  },
  {
    icon: Truck,
    title: "Почта России",
    price: "по тарифам",
    time: "5–10 дней",
    text: "Доставка в любой населённый пункт.",
  },
];

const FAQ = [
  {
    question: "Можно ли вернуть аромат?",
    answer:
      "Парфюмерия надлежащего качества возврату не подлежит (закон «О защите прав потребителей»). Если флакон повреждён при доставке — заменим бесплатно.",
  },
  {
    question: "Продукция оригинальная?",
    answer:
      "Да. Мы работаем с проверенными поставщиками и проверяем каждую партию перед отправкой.",
  },
  {
    question: "Как выбрать аромат, если не пробовал?",
    answer:
      "Начните с бестселлеров — они универсальны и нравятся большинству. Или напишите нам: поможем подобрать под ваш вкус и повод.",
  },
  {
    question: "Есть ли подарочная упаковка?",
    answer:
      "Да, добавим элегантную упаковку к любому заказу бесплатно — просто отметьте это в комментарии.",
  },
];

export function DeliveryPage() {
  useDocumentMeta({
    title: "Доставка и оплата — Fatima Noor",
    description:
      "Условия доставки арабской парфюмерии: курьер, пункты выдачи, почта. Способы оплаты и ответы на частые вопросы.",
  });

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
          Покупателям
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink-950 sm:text-5xl">
          Доставка и оплата
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-graphite-400 sm:text-base">
          Отправляем заказы ежедневно. Все флаконы упаковываются в защитную
          тару — аромат доедет целым.
        </p>
      </header>

      {/* Способы доставки */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {DELIVERY_OPTIONS.map((option, index) => (
          <Reveal key={option.title} delay={index * 0.07}>
            <article className="flex h-full flex-col rounded-2xl border border-ink-950/10 bg-cream-100 p-7 transition-all duration-500 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-700/8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 text-gold-600">
                <option.icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-xl font-medium text-ink-950">{option.title}</h2>
              <p className="mt-1 text-sm font-semibold text-gold-700">
                {option.price} · {option.time}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-graphite-400">{option.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Оплата */}
      <Reveal className="mt-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-gold-500/25 bg-gradient-to-r from-cream-100 to-cream-200/60 p-7 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-600">
            <CreditCard size={20} strokeWidth={1.5} aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-xl font-medium text-ink-950">Способы оплаты</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite-400">
              Наличными курьеру, картой при получении или переводом.
              По вопросам оплаты свяжитесь с нами в Telegram.
            </p>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="mt-20 scroll-mt-28">
        <SectionHeading eyebrow="Вопросы" title={<span id="faq-title">Частые вопросы</span>} />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-ink-950/10 bg-cream-100 px-6 py-5 transition-colors open:border-gold-500/40"
            >
              <summary className="cursor-pointer list-none font-medium text-ink-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden
                    className="shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-graphite-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" aria-labelledby="contacts-title" className="mt-20 scroll-mt-28">
        <OrnamentDivider />
        <SectionHeading
          eyebrow="Связь"
          title={<span id="contacts-title">Контакты</span>}
          description="Ответим на вопросы о выборе аромата, заказе и доставке."
        />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <ContactCard
            label="Телефон"
            value={SITE.phone}
            href={SITE.phoneHref}
            icon={<Phone size={18} className="text-gold-600" aria-hidden />}
          />
          <ContactCard
            label="Telegram"
            value={SITE.telegramHandle}
            href={SITE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle size={18} className="text-gold-600" aria-hidden />}
          />
          <ContactCard label="Часы работы" value={SITE.workingHours} />
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  label,
  value,
  href,
  icon,
  target,
  rel,
}: {
  label: string;
  value: string;
  href?: string;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  const content = (
    <>
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <dt className="text-[11px] uppercase tracking-luxe text-graphite-400">{label}</dt>
      <dd className="mt-2 font-display text-lg font-medium text-ink-950 transition-colors group-hover:text-gold-700">
        {value}
      </dd>
    </>
  );

  return (
    <div className="rounded-2xl border border-ink-950/10 bg-cream-100 p-6 text-center transition-colors hover:border-gold-500/40">
      <dl>
        {href ? (
          <a href={href} className="group block" target={target} rel={rel}>
            {content}
          </a>
        ) : (
          content
        )}
      </dl>
    </div>
  );
}
