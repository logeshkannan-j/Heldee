import type { ReactNode } from "react";
import { useTilt } from "@/lib/useTilt";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** A card with a subtle 3D tilt + spotlight-follow effect on mouse move. */
export default function TiltCard({ children, className, strength = 6 }: TiltCardProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("tilt-card relative overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
