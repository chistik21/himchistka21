import { contacts, site } from "@/config";
import { Reveal } from "@/components/Reveal";
import { useOrderDialog } from "@/components/OrderDialog";

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h4l1.5 4L8 9.5a12 12 0 0 0 6.5 6.5l1.5-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Contacts() {
  const { openDialog } = useOrderDialog();
  const phoneHref = contacts.phone.href;

  return (
    <section id="contacts" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Контакты</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-xl max-w-2xl">Мы рядом с вами</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lead mt-6 max-w-2xl">
            Работаем в {site.city} ({site.region}). Выезд на дом — по
            предварительной договорённости.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
          <Reveal>
            <div className="flex h-full flex-col rounded-[24px] bg-white p-7 md:p-9">
              <span className="text-muted-foreground"><PhoneIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Телефон</h3>
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="mt-2 text-[17px] font-medium text-primary hover:underline"
                >
                  {contacts.phone.label}
                </a>
              ) : (
                <p className="mt-2 text-[17px] font-medium">{contacts.phone.label}</p>
              )}
              <p className="mt-2 text-[13px] text-muted-foreground">
                {contacts.phone.hint}
              </p>
              <button
                type="button"
                onClick={() => openDialog()}
                className="link-arrow mt-auto pt-6 text-[15px]"
              >
                Или оставьте заявку на сайте
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-[24px] bg-white p-7 md:p-9">
              <span className="text-muted-foreground"><PinIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Адрес</h3>
              <p className="mt-2 text-[17px] font-medium">{contacts.address.label}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {contacts.address.hint}
              </p>
              {/* Заглушка карты: заменить на встраиваемую карту после уточнения адреса */}
              <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-input bg-surface px-6 py-10 text-center">
                <PinIcon />
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  Интерактивная карта появится здесь после уточнения адреса
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-[24px] bg-white p-7 md:p-9">
              <span className="text-muted-foreground"><ClockIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">График работы</h3>
              <p className="mt-2 text-[17px] font-medium">{contacts.schedule.label}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {contacts.schedule.hint}
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex h-full flex-col rounded-[24px] bg-white p-7 md:p-9">
              <span className="text-muted-foreground"><ChatIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Мессенджеры</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {contacts.messengers.map((m) => (
                  <span
                    key={m.name}
                    className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[14px] font-medium text-foreground/70"
                  >
                    {m.name}
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {m.status}
                    </span>
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                Каналы подключатся вместе с запуском — следите за обновлениями
                сайта.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
