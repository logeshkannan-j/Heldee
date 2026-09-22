import { useRef, type MouseEvent } from "react";

/**
 * Lightweight 3D tilt + spotlight-follow effect for cards. Sets CSS custom
 * properties consumed by the .tilt-card class in index.css, so no extra
 * libraries and it degrades gracefully (card just doesn't tilt).
 */
export function useTilt<T extends HTMLElement>(strength = 8) {
  const ref = useRef<T | null>(null);

  function handleMouseMove(e: MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * strength * 2;
    const rx = -(py - 0.5) * strength * 2;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return { ref, handleMouseMove, handleMouseLeave };
}
