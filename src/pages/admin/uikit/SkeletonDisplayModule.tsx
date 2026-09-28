import * as React from "react";
import { SkeletonApp, TextApp } from "@/packages/design-system";
import { Eye } from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function SkeletonDisplayModule() {
  return (
    <ModuleCard
      id="uikit-skeleton-module"
      icon={<Eye className="w-5 h-5 text-accent" />}
      title="SkeletonApp (CVA) — Kontras Diperbaiki!"
      description="Indikator pemuatan asynchronous. Memiliki warna soft slate yang terlihat solid di mode terang maupun gelap."
    >
      {/* Shape variants */}
      <div className="space-y-4">
        <TextApp id="skel-shapes-heading" variant="mono" className="text-[10px] font-bold text-accent uppercase">
          Preset Bentuk (Variant)
        </TextApp>
        <div className="space-y-4 text-left">
          {/* Card representation */}
          <div className="border border-hairline p-4 rounded-sm flex items-center gap-4 bg-surface-soft">
            <SkeletonApp id="skel-circle-demo" variant="circle" className="w-10 h-10 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonApp id="skel-line-1" variant="text" className="w-1/3" />
              <SkeletonApp id="skel-line-2" variant="text" className="w-full" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-start">
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[9px] font-semibold text-ink-muted">Rect (Square Block)</span>
              <SkeletonApp id="skel-rect-block" variant="rect" className="w-16 h-12" />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[9px] font-semibold text-ink-muted">Circle (Avatar)</span>
              <SkeletonApp id="skel-circle-block" variant="circle" className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Height sizes */}
      <div className="space-y-4">
        <TextApp id="skel-sizes-heading" variant="mono" className="text-[10px] font-bold text-accent uppercase">
          Ketinggian Baris (Size sm, md, lg)
        </TextApp>
        <div className="flex flex-col gap-3">
          <SkeletonApp id="skel-sm" variant="rect" size="sm" className="w-full" />
          <SkeletonApp id="skel-md" variant="rect" size="md" className="w-full" />
          <SkeletonApp id="skel-lg" variant="rect" size="lg" className="w-full" />
        </div>
      </div>
    </ModuleCard>
  );
}
