import { useEffect } from "react";

/** Внедряет JSON-LD разметку (например, Product schema) и убирает её при размонтировании. */
export function useJsonLd(data: object | null, id: string): void {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [data, id]);
}
