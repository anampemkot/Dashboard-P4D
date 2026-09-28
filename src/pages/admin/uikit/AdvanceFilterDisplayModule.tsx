import * as React from "react";
import { AdvanceFilterApp, FilterFieldConfig, QuickPreset } from "@/packages/design-system";
import { ModuleCard } from "./ModuleCard";
import { SlidersHorizontal, Check, Code, Search } from "lucide-react";

export function AdvanceFilterDisplayModule() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Popover State Demo
  const [popoverValues, setPopoverValues] = React.useState<Record<string, any>>({
    jenisPajak: "pbjt",
    status: "",
  });

  // Drawer State Demo (Complex filters)
  const [drawerValues, setDrawerValues] = React.useState<Record<string, any>>({
    kecamatan: "danurejan",
    jenisPajak: ["pbb", "bphtb"],
    dateRange: { from: "2026-01-01", to: "2026-07-22" },
    statusVal: "verified",
  });

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Field configurations for BPKAD Dashboard filters
  const simpleFields: FilterFieldConfig[] = [
    {
      id: "jenisPajak",
      label: "Jenis Pajak Daerah",
      type: "select",
      placeholder: "-- Semua Jenis Pajak --",
      options: [
        { label: "PBJT (Makanan, Hotel, Parkir)", value: "pbjt" },
        { label: "PBB-P2 (Bumi & Bangunan)", value: "pbb" },
        { label: "BPHTB (Hak Tanah & Bangunan)", value: "bphtb" },
        { label: "PAT (Air Tanah)", value: "pat" },
        { label: "Pajak Reklame", value: "reklame" },
      ],
    },
    {
      id: "status",
      label: "Status Kepatuhan",
      type: "select",
      placeholder: "-- Semua Status --",
      options: [
        { label: "Lunas / Selesai", value: "lunas" },
        { label: "Proses Verifikasi", value: "proses" },
        { label: "Tunggakan / Menunggak", value: "menunggak" },
      ],
    },
  ];

  const complexFields: FilterFieldConfig[] = [
    {
      id: "kecamatan",
      label: "Wilayah Kecamatan",
      type: "select",
      placeholder: "-- Pilih Kecamatan --",
      colSpan: 1,
      options: [
        { label: "Kec. Danurejan", value: "danurejan" },
        { label: "Kec. Gondomanan", value: "gondomanan" },
        { label: "Kec. Jetis", value: "jetis" },
        { label: "Kec. Kotagede", value: "kotagede" },
        { label: "Kec. Malioboro / Kraton", value: "kraton" },
        { label: "Kec. Umbulharjo", value: "umbulharjo" },
      ],
    },
    {
      id: "statusVal",
      label: "Status Validasi",
      type: "select",
      colSpan: 1,
      options: [
        { label: "Tervalidasi (Dukcapil/Agraria)", value: "verified" },
        { label: "Perlu Uji Petik", value: "ujipetik" },
        { label: "Data Ganda / Belum Cocok", value: "ganda" },
      ],
    },
    {
      id: "jenisPajak",
      label: "Kategori Pajak (Multi Select)",
      type: "multi-select",
      colSpan: 2,
      options: [
        { label: "PBB-P2", value: "pbb" },
        { label: "PBJT", value: "pbjt" },
        { label: "BPHTB", value: "bphtb" },
        { label: "Reklame", value: "reklame" },
        { label: "Air Tanah", value: "pat" },
      ],
    },
    {
      id: "dateRange",
      label: "Rentang Tanggal Penetapan / Pelayanan",
      type: "date-range",
      colSpan: 2,
    },
  ];

  const quickPresets: QuickPreset[] = [
    {
      label: "Hari Ini",
      values: {
        dateRange: { from: "2026-07-22", to: "2026-07-22" },
      },
    },
    {
      label: "Bulan Ini (Juli 2026)",
      values: {
        dateRange: { from: "2026-07-01", to: "2026-07-31" },
      },
    },
    {
      label: "Tahun Ini (TA 2026)",
      values: {
        dateRange: { from: "2026-01-01", to: "2026-12-31" },
      },
    },
  ];

  const filterCodeExample = `// Penggunaan AdvanceFilterApp (Drawer Mode & State)
const [filterValues, setFilterValues] = useState({
  kecamatan: "danurejan",
  jenisPajak: ["pbb", "bphtb"]
});

<AdvanceFilterApp
  id="filter-dashboard-p4d"
  displayMode="drawer" // atau "popover"
  title="Filter Data BPKAD"
  fields={complexFields}
  values={filterValues}
  quickPresets={quickPresets}
  onChange={(newVal) => setFilterValues(newVal)}
  onApply={(applied) => fetchDashboardData(applied)}
/>`;

  return (
    <ModuleCard
      id="uikit-filter-module"
      icon={<SlidersHorizontal className="w-5 h-5 text-vibrant-purple-dark" />}
      title="Advance Filter Component (Popover & Drawer)"
      description="Komponent filter pencarian multi-kriteria untuk 14 modul Dashboard BPKAD. Menyediakan opsi Popover (untuk filter ringkas) dan Drawer/Slide-over (untuk filter kompleks wilayah, rentang tanggal, & jenis pajak)."
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold font-display uppercase tracking-wider text-ink">
          Demo Interaktif Mode Popover & Drawer
        </span>
        <button
          onClick={() => copyToClipboard("filter-code", filterCodeExample)}
          className="px-2.5 py-1 text-[10px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          {copiedId === "filter-code" ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" /> Copied!
            </>
          ) : (
            <>
              <Code className="w-3.5 h-3.5" /> Salin Contoh Kode
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {/* DEMO 1: POPOVER MODE */}
        <div className="p-5 bg-surface border border-hairline-soft dark:border-vibrant-purple/30 rounded-card-custom space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-ink">
                1. Mode Popover
              </h4>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-vibrant-blue/15 text-vibrant-blue-ink rounded-full">
                Ringkas
              </span>
            </div>
            <p className="text-xs text-ink-secondary mt-1">
              Penyaringan cepat langsung di atas konten tanpa menutup layar.
            </p>
          </div>

          <div className="pt-2">
            <AdvanceFilterApp
              id="filter-popover-demo"
              displayMode="popover"
              triggerLabel="Filter Jenis Pajak"
              triggerVariant="purple"
              triggerTheme="default"
              fields={simpleFields}
              values={popoverValues}
              onChange={setPopoverValues}
            />
          </div>

          {/* Current State Output JSON */}
          <div className="p-3 bg-vibrant-grey-bg rounded-xl border border-hairline-soft font-mono text-[11px] space-y-1">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              Active Filter State (JSON):
            </span>
            <pre className="text-vibrant-purple-dark dark:text-purple-300 font-bold overflow-x-auto">
              {JSON.stringify(popoverValues, null, 2)}
            </pre>
          </div>
        </div>

        {/* DEMO 2: DRAWER / SLIDE-OVER MODE (Using DrawerApp) */}
        <div className="p-5 bg-surface border border-hairline-soft dark:border-vibrant-purple/30 rounded-card-custom space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-ink">
                2. Mode Drawer (DrawerApp)
              </h4>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-vibrant-purple/15 text-vibrant-purple-dark rounded-full">
                DrawerApp + Rounded
              </span>
            </div>
            <p className="text-xs text-ink-secondary mt-1">
              Menggunakan molekul <code className="text-vibrant-purple-dark font-bold">DrawerApp</code> dengan sudut rounded 3xl & tombol close.
            </p>
          </div>

          <div className="pt-2">
            <AdvanceFilterApp
              id="filter-drawer-demo"
              displayMode="drawer"
              title="Filter Lanjutan Dashboard BPKAD"
              triggerLabel="Filter Drawer (Kecamatan)"
              triggerVariant="purple"
              triggerTheme="default"
              triggerRounded="pill"
              fields={complexFields}
              values={drawerValues}
              quickPresets={quickPresets}
              onChange={setDrawerValues}
            />
          </div>

          {/* Current State Output JSON */}
          <div className="p-3 bg-vibrant-grey-bg rounded-xl border border-hairline-soft font-mono text-[11px] space-y-1">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              Active Filter State (JSON):
            </span>
            <pre className="text-vibrant-purple-dark dark:text-purple-300 font-bold overflow-x-auto">
              {JSON.stringify(drawerValues, null, 2)}
            </pre>
          </div>
        </div>

        {/* DEMO 3: CUSTOM TRIGGER BUTTON STYLING */}
        <div className="p-5 bg-surface border border-hairline-soft dark:border-vibrant-purple/30 rounded-card-custom space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-ink">
                3. Custom Trigger Style
              </h4>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 rounded-full">
                ButtonApp Custom
              </span>
            </div>
            <p className="text-xs text-ink-secondary mt-1">
              Gaya trigger dapat disesuaikan menggunakan props ButtonApp atau render function khusus.
            </p>
          </div>

          <div className="pt-2">
            <AdvanceFilterApp
              id="filter-custom-trigger-demo"
              displayMode="drawer"
              title="Filter Kepatuhan Wajib Pajak"
              triggerLabel="Kustom Trigger (Purple Dark)"
              triggerVariant="purpleDark"
              triggerSize="lg"
              triggerRounded="pill"
              triggerClassName="w-full justify-center shadow-md hover:scale-[1.01]"
              fields={complexFields}
              values={drawerValues}
              quickPresets={quickPresets}
              onChange={setDrawerValues}
            />
          </div>

          <div className="p-3 bg-vibrant-grey-bg rounded-xl border border-hairline-soft font-mono text-[11px] space-y-1">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              Props Trigger Disertakan:
            </span>
            <code className="text-vibrant-purple-dark dark:text-purple-300 block text-[10px]">
              triggerVariant="purpleDark"<br />
              triggerSize="lg"<br />
              triggerRounded="pill"
            </code>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
