import { advantages } from "@/config";
import { Reveal } from "@/components/Reveal";

export function Advantages() {
  return (
    <section id="advantages" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow mb-4">Почему мы</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-xl max-w-md">
                Качество видно в деталях
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="lead mt-6 max-w-md">
                Мы не обещаем чуда. Мы аккуратно и последовательно делаем свою
                работу — и это заметно.
              </p>
            </Reveal>
          </div>

          <div>
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="border-t border-border py-8 last:border-b md:py-10">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
