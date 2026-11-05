import { services, type Service } from "@/config";
import { Reveal } from "@/components/Reveal";
import { useOrderDialog } from "@/components/OrderDialog";
import serviceSofa from "@/assets/img/service-sofa.jpg";
import serviceArmchair from "@/assets/img/service-armchair.jpg";
import serviceMattress from "@/assets/img/service-mattress.jpg";
import serviceCarpet from "@/assets/img/service-carpet.jpg";
import serviceChairs from "@/assets/img/service-chairs.jpg";
import serviceUpholstery from "@/assets/img/service-upholstery.jpg";

const images: Record<Service["image"], string> = {
  serviceSofa,
  serviceArmchair,
  serviceMattress,
  serviceCarpet,
  serviceChairs,
  serviceUpholstery,
};

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const { openDialog } = useOrderDialog();
  const reversed = index % 2 === 1;

  return (
    <div
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20`}
    >
      <Reveal
        className={`reveal-img ${reversed ? "md:order-2" : ""}`}
      >
        <button
          type="button"
          onClick={() => openDialog(service.title)}
          className="img-zoom-parent block w-full overflow-hidden rounded-[28px] bg-surface text-left"
          aria-label={`Заказать: ${service.title}`}
        >
          <img
            src={images[service.image]}
            alt={service.alt}
            className="img-zoom aspect-[3/2] w-full object-cover"
            loading="lazy"
          />
        </button>
      </Reveal>

      <div className={reversed ? "md:order-1" : ""}>
        <Reveal>
          <h3 className="title-md">{service.title}</h3>
        </Reveal>
        <Reveal delay={90}>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted-foreground">
            {service.description}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <button
            type="button"
            onClick={() => openDialog(service.title)}
            className="link-arrow mt-6"
          >
            Заказать <ArrowIcon />
          </button>
        </Reveal>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Услуги</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-xl max-w-3xl">
            Всё, что украшает ваш дом — может снова выглядеть достойно
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lead mt-6 max-w-2xl">
            Шесть направленных услуг. Одна цель — чтобы вещи, с которыми вы
            каждый день живёте, были чистыми и приятными.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-32">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
