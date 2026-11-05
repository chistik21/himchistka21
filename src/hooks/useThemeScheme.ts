import { useEffect } from "react";

/**
 * Сайт следует системной теме устройства (prefers-color-scheme).
 *
 * CSS переключает палитру сам, без JS. Этот хук нужен только для
 * плавного перехода: при смене темы ОС он на 500 мс включает
 * `html.theme-transition`, чтобы цвета перетекали, а не «щёлкали».
 * Перезагрузка страницы не требуется — медиазапрос живёт и обновляется.
 */
export function useThemeScheme() {
  useEffect(() => {
    if (!window.matchMedia) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;
    let timer = 0;

    const onChange = () => {
      root.classList.add("theme-transition");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 520);
    };

    mq.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener("change", onChange);
    };
  }, []);
}
