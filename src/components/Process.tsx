import { processSteps } from "@/config";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="process" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Как мы работаем</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-xl max-w-3xl">
            Пять шагов — и ваша мебель как новая
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {processSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 50}>
              <div className="process-row group grid grid-cols-[auto_1fr] items-start gap-6 border-t border-border px-2 py-9 last:border-b md:grid-cols-[120px_280px_1fr] md:items-baseline md:gap-10 md:px-4 md:py-12">
                <span
                  aria-hidden="true"
                  className="text-4xl font-semibold tracking-tight text-border transition-colors duration-300 group-hover:text-foreground/25 md:text-6xl"
                >
                  {item.step}
                </span>
                <h3 className="pt-1 text-xl font-semibold tracking-tight md:pt-0 md:text-2xl">
                  {item.title}
                </h3>
                <p className="col-span-2 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:col-span-1 md:justify-self-end">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
