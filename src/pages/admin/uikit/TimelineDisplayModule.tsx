import * as React from "react";
import {
  BadgeApp,
  DropdownApp,
  TextApp,
  TimelineApp,
  TimelineAlignment,
  TimelineConnector,
  TimelineIndicator,
  TimelineItem,
  TimelineOrientation,
  TimelineSize,
} from "@/packages/design-system";
import {
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  History,
  Landmark,
  SearchCheck,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

const timelineItems: TimelineItem[] = [
  {
    id: "submitted",
    timestamp: "28 Juli 2026 · 08.15 WIB",
    title: "Permohonan diterima",
    description: "Berkas pendaftaran objek pajak diterima melalui portal pelayanan P4D.",
    metadata: <BadgeApp id="timeline-meta-submitted" variant="neutral" size="sm">REG-2026-0718</BadgeApp>,
    icon: <FileCheck2 />,
    status: "completed",
  },
  {
    id: "verified",
    timestamp: "28 Juli 2026 · 10.40 WIB",
    title: "Verifikasi dokumen selesai",
    description: "NIK, NOP, kepemilikan, dan kelengkapan lampiran telah diverifikasi petugas.",
    metadata: "Petugas: Seksi Pendataan dan Pendaftaran",
    icon: <SearchCheck />,
    status: "success",
  },
  {
    id: "assessment",
    timestamp: "29 Juli 2026 · 09.00 WIB",
    title: "Penetapan nilai pajak",
    description: "Proses penghitungan dasar pengenaan dan ketetapan pajak sedang berlangsung.",
    metadata: <BadgeApp id="timeline-meta-active" variant="solidPurple" size="sm">Sedang diproses</BadgeApp>,
    icon: <CircleDollarSign />,
    status: "active",
  },
  {
    id: "approval",
    timestamp: "Estimasi 30 Juli 2026",
    title: "Persetujuan pejabat berwenang",
    description: "Ketetapan menunggu pemeriksaan dan persetujuan akhir sebelum diterbitkan.",
    icon: <Landmark />,
    status: "warning",
  },
  {
    id: "published",
    timestamp: "Belum tersedia",
    title: "Dokumen ketetapan diterbitkan",
    description: "Dokumen digital akan tersedia setelah seluruh tahapan dinyatakan selesai.",
    icon: <CalendarCheck />,
    status: "default",
  },
];

export function TimelineDisplayModule() {
  const [orientation, setOrientation] = React.useState<TimelineOrientation>("vertical");
  const [alignment, setAlignment] = React.useState<TimelineAlignment>("left");
  const [connector, setConnector] = React.useState<TimelineConnector>("solid");
  const [indicator, setIndicator] = React.useState<TimelineIndicator>("icon");
  const [size, setSize] = React.useState<TimelineSize>("md");
  const [selectedItem, setSelectedItem] = React.useState(timelineItems[2].id);

  return (
    <ModuleCard
      id="uikit-timeline-module"
      icon={<History className="h-5 w-5 text-vibrant-purple-dark" />}
      title="TimelineApp"
      description="Timeline data-driven untuk riwayat layanan dan aktivitas, dengan orientasi vertical/horizontal, alignment left/right/alternating, indicator dot/icon, serta connector solid/dashed."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="timeline-showcase-vertical-left"
          title="Vertical · Left · Solid"
          description="Indicator icon"
          align="start"
          code={`<TimelineApp id="tl" items={items} orientation="vertical" alignment="left" connector="solid" indicator="icon" />`}
        >
          <TimelineApp
            id="timeline-vertical-left"
            items={timelineItems.slice(0, 4)}
            orientation="vertical"
            alignment="left"
            connector="solid"
            indicator="icon"
            size="md"
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="timeline-showcase-vertical-alternating"
          title="Vertical · Alternating · Dashed"
          description="Indicator dot, responsif"
          align="start"
          code={`<TimelineApp id="tl" items={items} orientation="vertical" alignment="alternating" connector="dashed" indicator="dot" />`}
        >
          <TimelineApp
            id="timeline-vertical-alternating"
            items={timelineItems.slice(0, 4)}
            orientation="vertical"
            alignment="alternating"
            connector="dashed"
            indicator="dot"
            size="sm"
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="timeline-showcase-horizontal"
          title="Horizontal · Scroll Responsive"
          description="5 events, scrollable pada layar sempit"
          align="start"
          className="md:col-span-2"
          code={`<TimelineApp id="tl" items={items} orientation="horizontal" connector="solid" indicator="icon" />`}
        >
          <TimelineApp
            id="timeline-horizontal"
            items={timelineItems}
            orientation="horizontal"
            connector="solid"
            indicator="icon"
            size="md"
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="timeline-showcase-playground"
          title="Live Interactive Playground"
          description="Konfigurasi orientation, alignment, connector, indicator, dan size"
          align="start"
          className="md:col-span-2"
        >
          <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-hairline-soft bg-surface-soft p-4 lg:col-span-4">
              <div className="space-y-1.5">
                <label htmlFor="timeline-control-orientation" className="text-xs font-semibold text-ink">Orientation</label>
                <DropdownApp
                  id="timeline-control-orientation"
                  size="sm"
                  value={orientation}
                  onChange={(value) => setOrientation(value as TimelineOrientation)}
                  options={[{ value: "vertical", label: "Vertical" }, { value: "horizontal", label: "Horizontal" }]}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="timeline-control-alignment" className="text-xs font-semibold text-ink">Alignment</label>
                <DropdownApp
                  id="timeline-control-alignment"
                  size="sm"
                  value={alignment}
                  disabled={orientation === "horizontal"}
                  onChange={(value) => setAlignment(value as TimelineAlignment)}
                  options={[
                    { value: "left", label: "Left" },
                    { value: "right", label: "Right" },
                    { value: "alternating", label: "Alternating" },
                  ]}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="timeline-control-connector" className="text-xs font-semibold text-ink">Connector</label>
                <DropdownApp
                  id="timeline-control-connector"
                  size="sm"
                  value={connector}
                  onChange={(value) => setConnector(value as TimelineConnector)}
                  options={[{ value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" }]}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="timeline-control-indicator" className="text-xs font-semibold text-ink">Indicator</label>
                <DropdownApp
                  id="timeline-control-indicator"
                  size="sm"
                  value={indicator}
                  onChange={(value) => setIndicator(value as TimelineIndicator)}
                  options={[{ value: "dot", label: "Dot" }, { value: "icon", label: "Icon" }]}
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <label htmlFor="timeline-control-size" className="text-xs font-semibold text-ink">Size</label>
                <DropdownApp
                  id="timeline-control-size"
                  size="sm"
                  value={size}
                  onChange={(value) => setSize(value as TimelineSize)}
                  options={[{ value: "sm", label: "Small" }, { value: "md", label: "Medium" }, { value: "lg", label: "Large" }]}
                />
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-hairline-soft bg-surface p-4 lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <TextApp id="timeline-result-title" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                  Live Result Preview
                </TextApp>
                <BadgeApp id="timeline-selected-badge" variant="solidPurple" size="sm">
                  Selected: {selectedItem}
                </BadgeApp>
              </div>
              <div className="max-h-[560px] overflow-auto rounded-lg border border-hairline-soft bg-surface-soft p-4">
                <TimelineApp
                  id="timeline-interactive-preview"
                  items={timelineItems}
                  orientation={orientation}
                  alignment={alignment}
                  connector={connector}
                  indicator={indicator}
                  size={size}
                  onItemClick={(item) => setSelectedItem(item.id)}
                />
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] text-ink-muted">
                <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-success" /> Completed</span>
                <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3 text-warning" /> Pending</span>
                <span className="inline-flex items-center gap-1"><CircleDollarSign className="h-3 w-3 text-vibrant-purple-dark" /> Active</span>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
