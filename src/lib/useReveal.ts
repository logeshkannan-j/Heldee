import { useEffect, useRef } from "react";

/**
 * Adds the "reveal" class to an element and flips it to "is-visible" the
 * first time it scrolls into view, using IntersectionObserver. Purely a
 * progressive-enhancement animation — content is fully readable without it.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
