import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Наблюдает за элементом и добавляет класс `is-visible`,
 * когда он попадает во viewport. Работает для `.reveal` и `.reveal-img`.
 *
 * Двойной механизм:
 * 1. IntersectionObserver — основной триггер появления;
 * 2. проверка по scroll/resize — страховка от «перепрыгивания» секции
 *    при быстрой прокрутке (когда элемент проскакивает viewport между
 *    кадрами и IO не успевает зафиксировать пересечение).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const once = options?.once ?? true;
  const threshold = options?.threshold ?? 0.18;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    let raf = 0;
    let ticking = false;

    const hasBeenReached = () => {
      // Верх элемента выше нижней границы viewport —
      // элемент на экране ИЛИ пользователь уже проскроллил его.
      // Второе покрывает мгновенные переходы по якорям.
      return el.getBoundingClientRect().top < window.innerHeight;
    };

    const markIfVisible = () => {
      ticking = false;
      if (hasBeenReached()) el.classList.add("is-visible");
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(markIfVisible);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, once, threshold]);

  return ref;
}
