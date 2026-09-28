import * as React from "react";
import { MasonryGridApp, ButtonApp, MasonryItemData } from "@/packages/design-system";
import { LayoutGrid } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

const masonryItems: MasonryItemData[] = [
  { id: "m1", title: "Rekapitulasi PBB-P2 Gedongtengen", category: "PBB-P2", heightClass: "h-32" },
  { id: "m2", title: "Audit Reklame Jl. Sudirman — perlu verifikasi ulang dokumen izin dan pengukuran luas bidang papan iklan di lapangan", category: "Reklame", heightClass: "h-56" },
  { id: "m3", title: "Potensi BPHTB Umbulharjo", category: "BPHTB", heightClass: "h-40" },
  { id: "m4", title: "Catatan Lapangan Kraton", category: "PBB-P2", heightClass: "h-48" },
  { id: "m5", title: "Ringkasan PBJT Kotagede", category: "PBJT", heightClass: "h-28" },
  { id: "m6", title: "Verifikasi Objek Pajak Baru — hasil survei tim lapangan bulan ini di beberapa kecamatan prioritas", category: "PBB-P2", heightClass: "h-64" },
];

export function MasonryGridDisplayModule() {
  const [loading, setLoading] = React.useState(false);

  return (
    <ModuleCard
      id="uikit-masonry-grid-module"
      icon={<LayoutGrid className="w-5 h-5 text-vibrant-purple-dark" />}
      title="MasonryGridApp"
      description="Tata letak grid masonry 2-kolom, 3-kolom, dan responsive dengan gutter spacing, tinggi item dinamis menyesuaikan konten, serta skeleton loading per item."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="masonry-showcase-2col"
          title="2-Column (Gutter Small)"
          description="Grid 2 kolom dengan jarak antar item kecil (gap-2)"
          align="start"
          code={`<MasonryGridApp id="masonry" items={items} columns={2} gutter="sm" />`}
        >
          <MasonryGridApp id="masonry-2col" items={masonryItems} columns={2} gutter="sm" />
        </ShowcaseCard>

        <ShowcaseCard
          id="masonry-showcase-3col"
          title="3-Column Responsive (Gutter Medium)"
          description="1 kolom mobile → 2 kolom tablet → 3 kolom desktop"
          align="start"
          code={`<MasonryGridApp id="masonry" items={items} columns={3} gutter="md" />`}
        >
          <MasonryGridApp id="masonry-3col" items={masonryItems} columns={3} gutter="md" />
        </ShowcaseCard>

        <ShowcaseCard
          id="masonry-showcase-loading"
          title="Loading Skeleton per Item"
          description="Placeholder skeleton menyesuaikan ukuran grid saat data belum siap"
          align="start"
          className="md:col-span-2"
          code={`<MasonryGridApp id="masonry" items={items} columns={3} gutter="md" loading={loading} />`}
        >
          <div className="w-full">
            <div className="mb-3 flex justify-end">
              <ButtonApp id="masonry-loading-toggle" variant="secondary" size="sm" onClick={() => setLoading((v) => !v)}>
                {loading ? "Tampilkan Data" : "Simulasikan Loading"}
              </ButtonApp>
            </div>
            <MasonryGridApp id="masonry-loading" items={masonryItems} columns={3} gutter="md" loading={loading} />
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
