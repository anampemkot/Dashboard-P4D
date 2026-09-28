import * as React from "react";
import { TextApp } from "@/packages/design-system";

interface ModuleCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ModuleCard({ id, icon, title, description, children }: ModuleCardProps) {
  return (
    <div id={id} data-ui-id={id} className="card p-6 md:p-8 bg-surface border border-hairline rounded-3xl flex flex-col gap-5 text-left shadow-xs">
      <div className="flex items-start gap-3 border-b border-hairline-soft pb-4">
        <div className="p-3 rounded-full bg-surface-soft border border-hairline-soft flex-shrink-0">
          {icon}
        </div>
        <div>
          <TextApp id={`${id}-title`} variant="h3" className="font-semibold tracking-tight text-ink">
            {title}
          </TextApp>
          <TextApp id={`${id}-desc`} variant="caption" className="text-ink-secondary block mt-1">
            {description}
          </TextApp>
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

interface PaletteItemProps {
  name: string;
  bg: string;
  desc: string;
}

export function PaletteItem({ name, bg, desc }: PaletteItemProps) {
  return (
    <div className="flex flex-col gap-2 p-2.5 bg-surface-soft border border-hairline-soft rounded-2xl">
      <div className={`h-12 w-full rounded-xl flex items-center justify-center font-semibold text-xs select-none ${bg}`}>
        Aa
      </div>
      <div className="leading-tight text-left">
        <span className="text-xs font-semibold text-ink block truncate">{name}</span>
        <span className="text-[10px] text-ink-muted font-mono block truncate mt-0.5">{desc}</span>
      </div>
    </div>
  );
}
