import { contacts, site } from "@/config";
import { Reveal } from "@/components/Reveal";
import { ContactLinks } from "@/components/ContactLinks";

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

function CarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 16v-3.2c0-.5.15-1 .43-1.4L6.6 8.2A2 2 0 0 1 8.25 7.3h7.5a2 2 0 0 1 1.65.9l2.17 3.2c.28.4.43.9.43 1.4V16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M4.5 12.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7.8" cy="14.6" r="0.9" fill="currentColor" />
      <circle cx="16.2" cy="14.6" r="0.9" fill="currentColor" />
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
  return (
    <section id="contacts" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Контакты</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-xl max-w-3xl">{contacts.visitNote.label}</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lead mt-6 max-w-2xl">
            Чистим мебель и ковры прямо у вас дома. Офиса и пункта приёма нет —
            специалист приезжает к вам в {site.city} в согласованное время.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
          <Reveal>
            <div className="flex h-full flex-col rounded-[24px] bg-card p-7 md:p-9">
              <span className="text-muted-foreground"><PhoneIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Телефон</h3>
              <a
                href={contacts.phone.href}
                className="mt-2 inline-block text-[24px] font-semibold tracking-tight text-primary hover:underline md:text-[28px]"
              >
                {contacts.phone.label}
              </a>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {contacts.phone.hint}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-[24px] bg-card p-7 md:p-9">
              <span className="text-muted-foreground"><ChatIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{site.messageCardTitle}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                MAX или ВКонтакте — удобно отправить фото мебели и коротко
                описать задачу.
              </p>
              <ContactLinks className="mt-5" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-[24px] bg-card p-7 md:p-9">
              <span className="text-muted-foreground"><CarIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{site.visitCardTitle}</h3>
              <p className="mt-2 text-[17px] font-medium">{contacts.visitNote.label}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {contacts.visitNote.hint}
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex h-full flex-col rounded-[24px] bg-card p-7 md:p-9">
              <span className="text-muted-foreground"><ClockIcon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">График работы</h3>
              <p className="mt-2 text-[17px] font-medium">{contacts.schedule.label}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {contacts.schedule.hint}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
