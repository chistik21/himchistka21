import { contacts } from "@/config";
import { Reveal } from "@/components/Reveal";
import { ContactLinks } from "@/components/ContactLinks";
import ctaImg from "@/assets/img/cta.jpg";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={ctaImg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-28 text-center md:px-8 md:py-40">
        <Reveal>
          <h2 className="display-xl text-white">
            Верните своей мебели свежесть
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 md:text-lg">
            Позвоните или напишите — согласуем удобное время и приедем с нужным
            оборудованием.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <a href={contacts.phone.href} className="btn-ghost-light mt-9">
            {contacts.phone.label}
          </a>
        </Reveal>
        <Reveal delay={240}>
          <ContactLinks
            className="mt-8 flex w-full flex-col items-center text-white"
            showPendingHint={false}
            tone="plain"
          />
        </Reveal>
      </div>
    </section>
  );
}
