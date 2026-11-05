import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Задержка появления, мс — для стекированного ритма внутри секции */
  delay?: number;
  once?: boolean;
};

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ once });
  const merged: CSSProperties = { ...style };
  if (delay) merged.transitionDelay = `${delay}ms`;

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={merged}>
      {children}
    </Tag>
  );
}
