import { contacts, nav, site } from "@/config";
import { ContactIcons } from "@/components/ContactLinks";

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
            <a
              href={contacts.phone.href}
              className="mt-4 inline-block text-[15px] font-medium text-foreground transition-colors hover:text-primary"
            >
              {contacts.phone.label}
            </a>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {contacts.schedule.label}
            </p>
            <ContactIcons className="mt-4" />
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

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} {site.brand}, {site.city}. Выездная
            химчистка мебели и ковров.
          </p>
          <a
            href={contacts.phone.href}
            className="text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {contacts.phone.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
