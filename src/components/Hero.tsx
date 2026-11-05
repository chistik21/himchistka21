import { site } from "@/config";
import { Reveal } from "@/components/Reveal";
import { useParallax } from "@/hooks/useParallax";
import { useOrderDialog } from "@/components/OrderDialog";
import heroImg from "@/assets/img/hero.jpg";

export function Hero() {
  const { openDialog } = useOrderDialog();
  const parallaxRef = useParallax<HTMLDivElement>(48);

  return (
    <section id="top" className="bg-background pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 text-center md:px-8 md:pt-24">
        <Reveal>
          <p className="eyebrow mb-5">
            Химчистка мебели и ковров · {site.city}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display-hero mx-auto max-w-4xl">
            {site.tagline}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="lead mx-auto mt-6 max-w-2xl">{site.description}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => openDialog()} className="btn-primary w-full sm:w-auto">
              Заказать химчистку
            </button>
            <a href="#services" className="btn-secondary w-full sm:w-auto">
              Наши услуги
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <Reveal className="reveal-img">
          <div
            ref={parallaxRef}
            className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-surface md:aspect-[21/9]"
          >
            <img
              src={heroImg}
              alt="Специалист проводит профессиональную химчистку светлого дивана в просторной светлой комнате"
              className="parallax-media h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
