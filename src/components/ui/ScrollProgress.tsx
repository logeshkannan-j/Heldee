import { useEffect, useRef } from "react";

/** Thin glowing progress bar fixed to the top of the viewport, filling as
 * the visitor scrolls — a small cinematic UI touch, like a film timeline. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="scroll-progress" style={{ transform: "scaleX(0)" }} />;
}
