import * as React from "react";
import { ButtonApp } from "@/packages/design-system";
import { cn } from "@/lib/utils";

export interface PlaygroundChipProps {
  id: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

// Standard selector chip for UI Kit playground controls — a thin ButtonApp
// wrapper so every playground uses design-system controls (aturan #2 catatan
// desain) instead of hand-rolled <button> elements.
export function PlaygroundChip({ id, active, onClick, className, children }: PlaygroundChipProps) {
  return (
    <ButtonApp
      id={id}
      variant={active ? "primary" : "secondary"}
      size="sm"
      rounded="md"
      onClick={onClick}
      className={cn("h-7 min-h-7 px-2.5 text-[11px]", className)}
    >
      {children}
    </ButtonApp>
  );
}
