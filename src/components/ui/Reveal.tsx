import type { ReactNode, ElementType } from "react";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

/** Wraps content so it fades/rises into view on scroll. See useReveal. */
export default function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
