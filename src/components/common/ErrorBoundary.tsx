import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Глобальная обработка ошибок рендера — аккуратный error state вместо белого экрана. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // В продакшене здесь может быть отправка в систему мониторинга
    void error;
    void info;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream-50 px-6 text-center">
          <p className="font-display text-5xl font-medium text-gold-600">Fatima Noor</p>
          <h1 className="mt-6 font-display text-3xl font-medium text-ink-950">
            Что-то пошло не так
          </h1>
          <p className="mt-3 max-w-md text-sm text-graphite-400">
            Произошла непредвиденная ошибка. Обновите страницу — обычно это помогает.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 rounded-full bg-ink-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 transition-colors hover:bg-ink-800 cursor-pointer"
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
