import { galleryNote } from "@/config";
import { Reveal } from "@/components/Reveal";
import gallery1 from "@/assets/img/gallery-1.jpg";
import gallery2 from "@/assets/img/gallery-2.jpg";
import gallery3 from "@/assets/img/gallery-3.jpg";
import gallery4 from "@/assets/img/gallery-4.jpg";

const items = [
  {
    src: gallery1,
    alt: "Профессиональный экстракторный аппарат очищает обивку дивана",
    caption: "Экстракторная чистка",
    ratio: "aspect-[4/5]",
  },
  {
    src: gallery2,
    alt: "Свежий чистый ворс ковра в мягком боковом свете",
    caption: "Ковры после чистки",
    ratio: "aspect-square",
  },
  {
    src: gallery3,
    alt: "Специалист наносит чистящий состав на кресло",
    caption: "Работа с пятнами",
    ratio: "aspect-square",
  },
  {
    src: gallery4,
    alt: "Светлая гостиная после профессиональной химчистки",
    caption: "Результат в интерьере",
    ratio: "aspect-[4/5]",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Галерея</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-xl max-w-2xl">Наши работы говорят сами за себя</h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {galleryNote}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <Reveal
              key={item.caption}
              delay={i * 80}
              className={i % 2 === 1 ? "md:translate-y-10" : ""}
            >
              <figure className="img-zoom-parent overflow-hidden rounded-[24px] bg-surface">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={`img-zoom w-full object-cover ${item.ratio}`}
                />
                <figcaption className="px-4 py-3 text-[13px] font-medium text-muted-foreground">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
