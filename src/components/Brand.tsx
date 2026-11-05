import { site } from "@/config";
import { cn } from "@/lib/utils";

/**
 * Текстовый логотип «Чистик21»: знак-капля с бликом + аккуратный
 * «21» в фирменном цвете. Не зависит от темы — использует токены.
 */
export function LogoMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-[10px] bg-foreground text-background",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1.6c2.1 2.9 4.4 5.3 4.4 8a4.4 4.4 0 1 1-8.8 0c0-2.7 2.3-5.1 4.4-8Z"
          fill="currentColor"
        />
        <path
          d="M6.3 9.1a1.9 1.9 0 0 0 1.9 1.9"
          stroke="hsl(var(--primary))"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Brand({
  className,
  showCity = true,
  size = 28,
}: {
  className?: string;
  showCity?: boolean;
  size?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      <span className="text-[19px] font-semibold tracking-[-0.03em]">
        Чистик<span className="text-primary">21</span>
      </span>
      {showCity && (
        <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:inline">
          {site.city}
        </span>
      )}
    </span>
  );
}
