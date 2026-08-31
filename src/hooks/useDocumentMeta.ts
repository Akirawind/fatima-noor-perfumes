import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description?: string;
}

function setMetaContent(selector: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [attr, value] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) ?? [];
    if (attr && value) tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** Управляет title/description/OG-метаданными текущей страницы. */
export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    document.title = title;
    if (description) {
      setMetaContent('meta[name="description"]', description);
      setMetaContent('meta[property="og:description"]', description);
    }
    setMetaContent('meta[property="og:title"]', title);
  }, [title, description]);
}
