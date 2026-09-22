import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

/**
 * Previously faded/rose content into view as you scrolled past it.
 * Simplified to a plain pass-through wrapper for a cleaner, non-animated
 * scroll experience — content just renders normally.
 */
export default function Reveal({ children, as: Tag = "div", className }: RevealProps) {
  return <Tag className={cn(className)}>{children}</Tag>;
}