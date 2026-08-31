import { useEffect, useState, type ReactNode } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** Что показать, если файл недоступен (декоративный арт). */
  fallback: ReactNode;
}

/**
 * <img> с автоматическим fallback: если файла нет,
 * интерфейс не ломается — показывается переданный арт.
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  fallback,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
