import { nav, site } from "@/config";

export function Footer() {
  return (
    <footer className="bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[17px] font-semibold tracking-tight">
              {site.brand}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {site.brandSuffix}
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <ul className="flex flex-col gap-3 md:flex-row md:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[13px] text-foreground/70 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} «{site.brand}», {site.city}. Сайт
            находится в стадии наполнения: контактные данные и фотографии
            появятся после запуска.
          </p>
        </div>
      </div>
    </footer>
  );
}
