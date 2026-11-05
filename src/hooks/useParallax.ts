import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Мягкий вертикальный параллакс: задаёт элементу CSS-переменную
 * `--parallax-y` в зависимости от положения секции относительно viewport.
 * Используется совместно с классом `.parallax-media`.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  intensity = 40,
) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Прогресс: 0 — секция только вошла снизу, 1 — ушла наверх
      const progress = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
      const y = (progress - 0.5) * intensity;
      el.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, intensity]);

  return ref;
}
