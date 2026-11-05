import { Reveal } from "@/components/Reveal";
import { useOrderDialog } from "@/components/OrderDialog";
import ctaImg from "@/assets/img/cta.jpg";

export function CTA() {
  const { openDialog } = useOrderDialog();

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
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/35"
        />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-32 text-center md:px-8 md:py-48">
        <Reveal>
          <h2 className="display-xl text-white">
            Верните своей мебели свежесть
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 md:text-lg">
            Оставьте заявку — согласуем удобное время и приедем с нужным
            оборудованием.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <button
            type="button"
            onClick={() => openDialog()}
            className="btn-ghost-light mt-9"
          >
            Оставить заявку
          </button>
        </Reveal>
      </div>
    </section>
  );
}
