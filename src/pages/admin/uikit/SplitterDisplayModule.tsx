import * as React from "react";
import { SplitterApp, TextApp } from "@/packages/design-system";
import { Columns2 } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

function PaneContent({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-surface-soft/50 p-4 text-center">
      <TextApp id={`splitter-pane-${label}`} variant="body2" weight="semibold" className="text-ink-secondary">{label}</TextApp>
    </div>
  );
}

export function SplitterDisplayModule() {
  return (
    <ModuleCard
      id="uikit-splitter-module"
      icon={<Columns2 className="w-5 h-5 text-vibrant-purple-dark" />}
      title="SplitterApp"
      description="Panel yang dapat di-resize horizontal & vertikal dengan drag handle, cursor berubah saat hover, garis menyala saat drag aktif, serta batas ukuran min/max."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="splitter-showcase-horizontal"
          title="Horizontal Split"
          description="Drag handle vertikal di tengah, dibatasi min 20% & maks 80%"
          code={`<SplitterApp id="splitter" orientation="horizontal" pane1Content={<Panel />} pane2Content={<Panel />} initialSplit={40} minSize={20} maxSize={80} />`}
        >
          <div className="h-56 w-full overflow-hidden rounded-xl border border-hairline-soft">
            <SplitterApp id="splitter-horizontal" orientation="horizontal" pane1Content={<PaneContent label="Panel Kiri" />} pane2Content={<PaneContent label="Panel Kanan" />} initialSplit={40} minSize={20} maxSize={80} />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="splitter-showcase-vertical"
          title="Vertical Split"
          description="Drag handle horizontal di tengah, mengubah proporsi tinggi panel"
          code={`<SplitterApp id="splitter" orientation="vertical" pane1Content={<Panel />} pane2Content={<Panel />} initialSplit={60} minSize={25} maxSize={75} />`}
        >
          <div className="h-72 w-full overflow-hidden rounded-xl border border-hairline-soft">
            <SplitterApp id="splitter-vertical" orientation="vertical" pane1Content={<PaneContent label="Panel Atas" />} pane2Content={<PaneContent label="Panel Bawah" />} initialSplit={60} minSize={25} maxSize={75} />
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
