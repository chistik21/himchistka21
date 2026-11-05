import { contacts } from "@/config";
import { cn } from "@/lib/utils";
import { MaxIcon, VkIcon } from "@/components/MessengerIcons";

type LinksProps = {
  className?: string;
  /** Текст-подсказка под кнопками, когда ссылка ещё не задана */
  showPendingHint?: boolean;
  /** «tinted» — для светлых карточек, «plain» — для фото-баннера */
  tone?: "tinted" | "plain";
};

/**
 * MAX и ВКонтакте.
 *
 * Реального URL пока нет (см. `contacts.max.href` / `contacts.vk.href`),
 * поэтому вместо нерабочей ссылки показывается неактивная кнопка со
 * статусом «скоро». Как только в конфиге появится адрес — та же кнопка
 * автоматически станет рабочей ссылкой.
 */
export function ContactLinks({
  className,
  showPendingHint = true,
  tone = "tinted",
}: LinksProps) {
  const pending = [contacts.max, contacts.vk].filter((c) => !c.href);

  return (
    <div className={className}>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
        <LinkButton
          icon={<MaxIcon size={18} />}
          label="Написать в MAX"
          href={contacts.max.href}
          tone={tone}
        />
        <LinkButton
          icon={<VkIcon size={18} />}
          label="ВКонтакте"
          href={contacts.vk.href}
          tone={tone}
        />
      </div>

      {showPendingHint && pending.length > 0 && (
        <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
          Аккаунты в {pending.map((p) => p.name).join(" и ")} скоро появятся.
          Позвоните — ответим сразу.
        </p>
      )}
    </div>
  );
}

function LinkButton({
  icon,
  label,
  href,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  href: string | null | undefined;
  tone: "tinted" | "plain";
}) {
  const base = cn(
    "inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-medium transition-colors duration-200",
  );

  const activeStyle =
    tone === "tinted"
      ? "bg-surface text-foreground hover:bg-border"
      : "border border-white/40 text-foreground hover:bg-white/10";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, activeStyle)}
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <span
      aria-disabled="true"
      title={`${label} — скоро`}
      className={cn(
        base,
        "cursor-default border border-dashed text-muted-foreground",
        tone === "plain" ? "border-white/30" : "border-input",
      )}
    >
      {icon}
      {label}
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-80">
        скоро
      </span>
    </span>
  );
}

/** Компактная текстовая версия для футера. */
export function ContactIcons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconLink href={contacts.max.href} label="Написать в MAX" icon={<MaxIcon size={16} />} />
      <IconLink href={contacts.vk.href} label="ВКонтакте" icon={<VkIcon size={16} />} />
    </div>
  );
}

function IconLink({
  href,
  label,
  icon,
}: {
  href: string | null | undefined;
  label: string;
  icon: React.ReactNode;
}) {
  const cls =
    "flex h-11 w-11 items-center justify-center rounded-full bg-surface text-foreground/75 transition-colors hover:bg-border hover:text-foreground";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title={`${label} — скоро`}
        className={cn(
          cls,
          "cursor-default text-muted-foreground/50 hover:bg-surface hover:text-muted-foreground/50",
        )}
      >
        {icon}
        <span className="sr-only">{label} — скоро</span>
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={cls}>
      {icon}
    </a>
  );
}
