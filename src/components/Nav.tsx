import { useEffect, useState } from "react";
import { contacts, nav } from "@/config";
import { useOrderDialog } from "@/components/OrderDialog";
import { Brand } from "@/components/Brand";
import { ContactLinks } from "@/components/ContactLinks";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openDialog } = useOrderDialog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "nav-blur shadow-[0_1px_0_hsl(var(--foreground)/0.07)]" : "nav-blur"
      }`}
    >
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8"
        aria-label="Основная навигация"
      >
        <a
          href="#top"
          className="transition-opacity hover:opacity-70"
          aria-label="Чистик21 — на главную"
        >
          <Brand />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[13px] font-normal text-foreground/80 transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={contacts.phone.href}
            className="hidden text-[14px] font-medium text-foreground/85 transition-colors hover:text-foreground md:inline-flex"
          >
            {contacts.phone.label}
          </a>
          <button
            type="button"
            onClick={() => openDialog()}
            className="hidden rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-hover sm:inline-flex"
            style={{ minHeight: 32 }}
          >
            Заказать
          </button>
          <a
            href={contacts.phone.href}
            aria-label={`Позвонить ${contacts.phone.label}`}
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h4l1.5 4L8 9.5a12 12 0 0 0 6.5 6.5l1.5-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-foreground/5 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 block h-[1.5px] w-full bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-[1.5px] w-full bg-foreground transition-all duration-300 ${
                  open ? "bottom-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>

    {/* Мобильное полноэкранное меню — вне шапки: backdrop-filter шапки
        создаёт containing block и ломает fixed-позиционирование */}
    <div
      className="mobile-menu nav-blur fixed inset-x-0 bottom-0 top-14 z-40 lg:hidden"
      data-open={open}
      aria-hidden={!open}
    >
      <nav aria-label="Мобильная навигация" className="px-8 pt-10">
        <ul className="flex flex-col gap-2">
          {nav.map((item, i) => (
            <li
              key={item.href}
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-3xl font-semibold tracking-tight text-foreground"
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={`mt-10 transition-all delay-300 duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              openDialog();
            }}
            className="btn-primary w-full"
          >
            Заказать химчистку
          </button>
          <a
            href={contacts.phone.href}
            tabIndex={open ? 0 : -1}
            className="mt-3 flex items-center justify-center gap-2 rounded-full py-3 text-[17px] font-medium text-foreground"
          >
            {contacts.phone.label}
          </a>
          <ContactLinks className="mt-6" showPendingHint={false} tone="plain" />
          <p className="mt-4 text-[13px] text-muted-foreground">
            Выездная химчистка · {contacts.schedule.label}
          </p>
        </div>
      </nav>
    </div>
    </>
  );
}
