import * as React from "react";
import { AvatarApp, BadgeApp, ProgressListApp, TextApp } from "@/packages/design-system";
import { ListChecks, MapPin } from "lucide-react";
import { CHART_COLORS } from "@/constants/chartColors";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

const simpleItems = [
  { id: "mutasi", label: "Mutasi", value: "35%", segments: [{ percent: 35, color: CHART_COLORS.purple }] },
  { id: "pembetulan", label: "Pembetulan", value: "25%", segments: [{ percent: 25, color: CHART_COLORS.purple }] },
  { id: "pengurangan", label: "Pengurangan", value: "20%", segments: [{ percent: 20, color: CHART_COLORS.purple }] },
  { id: "keberatan", label: "Keberatan", value: "15%", segments: [{ percent: 15, color: CHART_COLORS.purple }] },
  { id: "pembatalan", label: "Pembatalan", value: "5%", segments: [{ percent: 5, color: CHART_COLORS.purple }] },
];

const stackedItems = [
  {
    id: "pbb",
    label: "PBB-P2",
    value: "70% Valid",
    segments: [
      { percent: 70, color: CHART_COLORS.emerald, label: "Valid" },
      { percent: 30, color: "#f43f5e", label: "Kritis" },
    ],
  },
  {
    id: "pbjt-resto",
    label: "PBJT Restoran",
    value: "50% Valid",
    segments: [
      { percent: 50, color: CHART_COLORS.emerald, label: "Valid" },
      { percent: 50, color: "#f43f5e", label: "Kritis" },
    ],
  },
  {
    id: "reklame",
    label: "Pajak Reklame",
    value: "60% Valid",
    segments: [
      { percent: 60, color: CHART_COLORS.emerald, label: "Valid" },
      { percent: 40, color: "#f43f5e", label: "Kritis" },
    ],
  },
];

const avatarItems = [
  {
    id: "budi",
    label: "Budi Santoso",
    secondaryLabel: "Petugas Pelayanan",
    leading: <AvatarApp id="pl-av-budi" name="Budi Santoso" size="sm" />,
    value: "100%",
    badge: (
      <BadgeApp id="pl-badge-budi" variant="solidRose" size="sm">
        OVERLOAD
      </BadgeApp>
    ),
    segments: [{ percent: 100, color: "#f43f5e" }],
  },
  {
    id: "ani",
    label: "Ani Wijaya",
    secondaryLabel: "Petugas Pelayanan",
    leading: <AvatarApp id="pl-av-ani" name="Ani Wijaya" size="sm" />,
    value: "85%",
    segments: [{ percent: 85, color: CHART_COLORS.amber }],
  },
  {
    id: "dian",
    label: "Dian Sastro",
    secondaryLabel: "Petugas Pelayanan",
    leading: <AvatarApp id="pl-av-dian" name="Dian Sastro" size="sm" />,
    value: "45%",
    segments: [{ percent: 45, color: CHART_COLORS.blue }],
  },
];

const iconItems = [
  {
    id: "umbulharjo",
    label: "Umbulharjo",
    leading: <MapPin className="h-4 w-4 text-rose-500" />,
    value: "450 WP",
    badge: (
      <BadgeApp id="pl-badge-umbulharjo" variant="solidRose" size="sm">
        Belum Registrasi
      </BadgeApp>
    ),
    segments: [{ percent: 90, color: "#f43f5e" }],
  },
  {
    id: "gondokusuman",
    label: "Gondokusuman",
    leading: <MapPin className="h-4 w-4 text-amber-500" />,
    value: "320 WP",
    badge: (
      <BadgeApp id="pl-badge-gondokusuman" variant="solidAmber" size="sm">
        Profil Tidak Lengkap
      </BadgeApp>
    ),
    segments: [{ percent: 64, color: CHART_COLORS.amber }],
  },
  {
    id: "tegalrejo",
    label: "Tegalrejo",
    leading: <MapPin className="h-4 w-4 text-ink-muted" />,
    value: "90 WP",
    badge: (
      <BadgeApp id="pl-badge-tegalrejo" variant="neutral" size="sm">
        Belum Tervalidasi
      </BadgeApp>
    ),
    segments: [{ percent: 18, color: "#94a3b8" }],
  },
];

export function ProgressListDisplayModule() {
  return (
    <ModuleCard
      id="uikit-progresslist-module"
      icon={<ListChecks className="h-5 w-5 text-vibrant-purple-dark" />}
      title="ProgressListApp"
      description="Daftar baris 'entitas + bar progres + penanda status'. Dipakai untuk komposisi kategori, peringkat wilayah, beban kerja petugas, dan kesehatan data per sektor."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="progresslist-showcase-variant-simple"
          title="Variant Simple"
          description="Satu segmen per baris — komposisi kategori atau peringkat"
          align="start"
          code={`<ProgressListApp
  id="komposisi-layanan"
  items={[
    { id: "mutasi", label: "Mutasi", value: "35%",
      segments: [{ percent: 35, color: CHART_COLORS.purple }] },
  ]}
/>`}
        >
          <div className="w-full rounded border border-hairline bg-surface p-3 shadow-inner">
            <ProgressListApp id="progresslist-simple" items={simpleItems} />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="progresslist-showcase-variant-stacked"
          title="Variant Stacked"
          description="Dua segmen per baris — komposisi Valid vs Kritis dalam satu bar"
          align="start"
          code={`<ProgressListApp
  id="kesehatan-data"
  items={[
    { id: "pbb", label: "PBB-P2", value: "70% Valid", segments: [
        { percent: 70, color: CHART_COLORS.emerald, label: "Valid" },
        { percent: 30, color: "#f43f5e", label: "Kritis" },
    ] },
  ]}
/>`}
        >
          <div className="w-full rounded border border-hairline bg-surface p-3 shadow-inner">
            <ProgressListApp id="progresslist-stacked" items={stackedItems} />
            <div className="mt-3 flex items-center gap-4 border-t border-hairline-soft pt-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS.emerald }} />
                <TextApp id="progresslist-legend-valid" variant="caption" className="text-ink-secondary">
                  Valid
                </TextApp>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <TextApp id="progresslist-legend-kritis" variant="caption" className="text-ink-secondary">
                  Kritis
                </TextApp>
              </span>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="progresslist-showcase-leading-avatar"
          title="Leading Avatar"
          description="Beban kerja per petugas — avatar inisial, sublabel peran, badge status"
          align="start"
          code={`<ProgressListApp
  id="beban-petugas"
  items={[
    { id: "budi", label: "Budi Santoso", secondaryLabel: "Petugas Pelayanan",
      leading: <AvatarApp id="av" name="Budi Santoso" size="sm" />,
      value: "100%",
      badge: <BadgeApp id="b" variant="solidRose" size="sm">OVERLOAD</BadgeApp>,
      segments: [{ percent: 100, color: "#f43f5e" }] },
  ]}
/>`}
        >
          <div className="w-full rounded border border-hairline bg-surface p-3 shadow-inner">
            <ProgressListApp id="progresslist-avatar" items={avatarItems} />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="progresslist-showcase-leading-icon"
          title="Leading Icon"
          description="Fokus penertiban spasial — ikon lokasi berwarna status, badge kategori isu"
          align="start"
          code={`<ProgressListApp
  id="fokus-spasial"
  items={[
    { id: "umbulharjo", label: "Umbulharjo",
      leading: <MapPin className="h-4 w-4 text-rose-500" />,
      value: "450 WP",
      badge: <BadgeApp id="b" variant="solidRose" size="sm">Belum Registrasi</BadgeApp>,
      segments: [{ percent: 90, color: "#f43f5e" }] },
  ]}
/>`}
        >
          <div className="w-full rounded border border-hairline bg-surface p-3 shadow-inner">
            <ProgressListApp id="progresslist-icon" items={iconItems} />
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
