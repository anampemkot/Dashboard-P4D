import * as React from "react";
import {
  ChartApp,
  CHART_PALETTES,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/packages/design-system";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  LineChart as LineIcon,
  AreaChart as AreaIcon,
  PieChart as PieIcon,
  Activity,
  Compass,
  Code,
  Check,
  Info,
  Eye,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";

// ==========================================
// MOCK DATA & DESIGN SYSTEM PALETTE CONFIGS
// ==========================================

// 1. Area Chart (Realisasi vs Target)
const revenueData = [
  { month: "Jan", target: 450, realisasi: 420 },
  { month: "Feb", target: 480, realisasi: 490 },
  { month: "Mar", target: 510, realisasi: 530 },
  { month: "Apr", target: 540, realisasi: 510 },
  { month: "Mei", target: 580, realisasi: 620 },
  { month: "Jun", target: 620, realisasi: 650 },
  { month: "Jul", target: 680, realisasi: 710 },
];

const revenueSeries = [
  { key: "target", label: "Target Anggaran", color: CHART_PALETTES.vibrant.p2, fillOpacity: 0.15 },
  { key: "realisasi", label: "Realisasi Penerimaan", color: CHART_PALETTES.vibrant.p1, fillOpacity: 0.25 },
];

// 2. Bar Chart (Kepatuhan per Wilayah)
const complianceData = [
  { region: "Yogyakarta", hotel: 92, resto: 88, hiburan: 75 },
  { region: "Sleman", hotel: 88, resto: 82, hiburan: 80 },
  { region: "Bantul", hotel: 85, resto: 80, hiburan: 70 },
  { region: "Kulon Progo", hotel: 78, resto: 75, hiburan: 65 },
  { region: "Gunungkidul", hotel: 82, resto: 78, hiburan: 60 },
];

const complianceSeries = [
  { key: "hotel", label: "Pajak Hotel (%)", color: CHART_PALETTES.vibrant.p1 },
  { key: "resto", label: "Pajak Restoran (%)", color: CHART_PALETTES.vibrant.p2 },
  { key: "hiburan", label: "Pajak Hiburan (%)", color: CHART_PALETTES.vibrant.p3 },
];

// 3. Line Chart (Proyeksi Denda Pajak)
const dendaProjectionData = [
  { month: "Jan", proyeksi: 120, realita: 110 },
  { month: "Feb", proyeksi: 140, realita: 150 },
  { month: "Mar", proyeksi: 180, realita: 175 },
  { month: "Apr", proyeksi: 160, realita: 165 },
  { month: "Mei", proyeksi: 210, realita: 220 },
  { month: "Jun", proyeksi: 250, realita: 240 },
  { month: "Jul", proyeksi: 280, realita: 295 },
];

const lineSeries = [
  { key: "proyeksi", label: "Proyeksi Tren", color: CHART_PALETTES.vibrant.p3 },
  { key: "realita", label: "Realisasi Aktual", color: CHART_PALETTES.vibrant.p4, strokeDasharray: "4 4" },
];

// 4. Pie Chart (Distribusi Pajak)
const taxContributionData = [
  { name: "Pajak Hotel", value: 350, fill: CHART_PALETTES.vibrant.p1 },
  { name: "Pajak Restoran", value: 280, fill: CHART_PALETTES.vibrant.p2 },
  { name: "Pajak Hiburan", value: 180, fill: CHART_PALETTES.vibrant.p3 },
  { name: "Pajak Parkir", value: 120, fill: CHART_PALETTES.vibrant.p4 },
  { name: "Pajak Reklame", value: 90, fill: CHART_PALETTES.vibrant.p5 },
];

// 5. Radar Chart (Kepatuhan Multi-Sektoral)
const complianceSectorsData = [
  { sector: "Pelaporan SPTD", sleman: 85, yogyakarta: 92, bantul: 78 },
  { sector: "Akurasi Nominal", sleman: 90, yogyakarta: 88, bantul: 82 },
  { sector: "Ketepatan Waktu", sleman: 75, yogyakarta: 85, bantul: 80 },
  { sector: "E-Billing Adopsi", sleman: 95, yogyakarta: 90, bantul: 75 },
  { sector: "Respon Audit", sleman: 80, yogyakarta: 94, bantul: 70 },
];

const radarSeries = [
  { key: "yogyakarta", label: "Kota Yogyakarta", color: CHART_PALETTES.vibrant.p1 },
  { key: "sleman", label: "Kab. Sleman", color: CHART_PALETTES.vibrant.p2 },
];

// 6. Radial Chart (Pencapaian Target Sektoral)
const radialProgressData = [
  { name: "hotel", value: 85, fill: CHART_PALETTES.vibrant.p1 },
  { name: "resto", value: 70, fill: CHART_PALETTES.vibrant.p2 },
  { name: "hiburan", value: 55, fill: CHART_PALETTES.vibrant.p3 },
];

// ==========================================
// CODE SAMPLES FOR COPY-PASTE
// ==========================================
const areaCode = `// 1. Custom Area Chart dengan ChartApp Component
<ChartApp
  id="area-chart-preview"
  type="area"
  variant="vibrant"
  data={revenueData}
  xKey="month"
  series={[
    { key: "target", label: "Target Anggaran", color: CHART_PALETTES.vibrant.p2, fillOpacity: 0.15 },
    { key: "realisasi", label: "Realisasi Penerimaan", color: CHART_PALETTES.vibrant.p1, fillOpacity: 0.25 },
  ]}
  valueFormatter={(val) => \`Rp\${val}M\`}
/>`;

const barCode = `// 2. Custom Bar Chart dengan ChartApp Component
<ChartApp
  id="bar-chart-preview"
  type="bar"
  variant="vibrant"
  data={complianceData}
  xKey="region"
  series={[
    { key: "hotel", label: "Pajak Hotel (%)", color: CHART_PALETTES.vibrant.p1 },
    { key: "resto", label: "Pajak Restoran (%)", color: CHART_PALETTES.vibrant.p2 },
    { key: "hiburan", label: "Pajak Hiburan (%)", color: CHART_PALETTES.vibrant.p3 },
  ]}
  valueFormatter={(val) => \`\${val}%\`}
/>`;

const lineCode = `// 3. Custom Line Chart dengan ChartApp Component
<ChartApp
  id="line-chart-preview"
  type="line"
  variant="vibrant"
  data={dendaProjectionData}
  xKey="month"
  series={[
    { key: "proyeksi", label: "Proyeksi Tren", color: CHART_PALETTES.vibrant.p3 },
    { key: "realita", label: "Realisasi Aktual", color: CHART_PALETTES.vibrant.p4, strokeDasharray: "4 4" },
  ]}
  valueFormatter={(val) => \`Rp\${val}Jt\`}
/>`;

const pieCode = `// 4. Custom Pie/Donut Chart dengan ChartApp Component
<ChartApp
  id="pie-chart-preview"
  type="pie"
  variant="vibrant"
  data={taxContributionData}
  innerRadius={50}
  outerRadius={75}
/>`;

const radarCode = `// 5. Custom Radar Chart dengan ChartApp Component
<ChartApp
  id="radar-chart-preview"
  type="radar"
  variant="vibrant"
  data={complianceSectorsData}
  xKey="sector"
  series={[
    { key: "yogyakarta", label: "Kota Yogyakarta", color: CHART_PALETTES.vibrant.p1 },
    { key: "sleman", label: "Kab. Sleman", color: CHART_PALETTES.vibrant.p2 },
  ]}
/>`;

const radialCode = `// 6. Custom Radial Bar Chart dengan ChartApp Component
<ChartApp
  id="radial-chart-preview"
  type="radial"
  variant="vibrant"
  data={radialProgressData}
/>`;

export function ChartDisplayModule() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <ModuleCard
      id="uikit-chart-module"
      icon={<BarChart3 className="w-5 h-5 text-vibrant-purple-dark" />}
      title="Chart / Grafik Cerdas (Modular Design System)"
      description="Visualisasi data interaktif menggunakan komponen terstruktur ChartApp yang terintegrasi langsung dengan warna palet Design System tanpa ketergantungan pada inline var(--)."
    >
      {/* PALETTE SHOWCASE */}
      <div className="bg-vibrant-grey-bg/30 border border-hairline-soft/80 p-5 rounded-card-custom mb-8 text-left space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-vibrant-purple-dark" />
          <span className="text-xs font-bold font-display uppercase tracking-wider text-ink">
            Design System Chart Palette Tokens
          </span>
        </div>
        <p className="text-xs text-ink-secondary max-w-4xl">
          Sistem grafik menggunakan warna bertema yang konsisten dengan identitas UI Kit Jogja (Vibrant Purple, Blue, Yellow/Amber, Emerald, Rose, Cyan). 
          Semua komponen grafik menerima parameter <code className="mx-1 px-1 py-0.5 bg-surface border border-hairline rounded text-[10px] font-mono text-vibrant-purple-dark">variant="vibrant" | "purple" | "blue" | "yellow"</code> untuk penyesuaian visual instan.
        </p>

        {/* Colors grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
          {[
            { color: CHART_PALETTES.vibrant.p1, label: "Vibrant Purple", token: "CHART_PALETTES.vibrant.p1" },
            { color: CHART_PALETTES.vibrant.p2, label: "Vibrant Blue", token: "CHART_PALETTES.vibrant.p2" },
            { color: CHART_PALETTES.vibrant.p3, label: "Vibrant Amber", token: "CHART_PALETTES.vibrant.p3" },
            { color: CHART_PALETTES.vibrant.p4, label: "Emerald Green", token: "CHART_PALETTES.vibrant.p4" },
            { color: CHART_PALETTES.vibrant.p5, label: "Rose Pink", token: "CHART_PALETTES.vibrant.p5" },
            { color: CHART_PALETTES.vibrant.p6, label: "Cyan Blue", token: "CHART_PALETTES.vibrant.p6" },
          ].map((c, idx) => (
            <div key={idx} className="bg-surface p-3 rounded border border-hairline text-left flex flex-col justify-between space-y-2 shadow-xs">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div
                    className="w-3.5 h-3.5 rounded-sm border border-hairline-soft"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-[10px] font-mono font-bold text-ink">{c.label}</span>
                </div>
                <p className="text-[9px] font-mono text-ink-secondary truncate">{c.color}</p>
              </div>
              <div className="pt-2 border-t border-hairline-soft">
                <span className="text-[8px] font-mono text-ink-muted block truncate">{c.token}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHARTS CONTAINER GRID - 1 COLUMN 1 ROW PER CHART */}
      <div className="grid grid-cols-1 gap-6 text-left">
        
        {/* CHART 1: AREA CHART */}
        <div className="space-y-4 bg-vibrant-grey-bg/10 p-5 rounded-card-custom border border-hairline-soft flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
              <div className="flex items-center gap-2">
                <AreaIcon className="w-4 h-4 text-vibrant-purple-dark" />
                <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
                  1. Area Chart (Tren Realisasi)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard("area", areaCode)}
                className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
              >
                {copiedId === "area" ? (
                  <>
                    <Check className="w-3 h-3 text-success" /> Copied!
                  </>
                ) : (
                  <>
                    <Code className="w-3 h-3" /> Code
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary leading-normal">
              Area chart modular dengan gradien adaptif menggunakan <code className="font-mono text-[10px]">ChartApp type="area"</code>.
            </p>
          </div>

          <div className="bg-surface p-3 rounded border border-hairline shadow-inner">
            <ChartApp
              id="area-chart-module"
              type="area"
              variant="vibrant"
              data={revenueData}
              xKey="month"
              series={revenueSeries}
              valueFormatter={(val) => `Rp${val}M`}
              height={240}
            />
          </div>
        </div>

        {/* CHART 2: BAR CHART */}
        <div className="space-y-4 bg-vibrant-grey-bg/10 p-5 rounded-card-custom border border-hairline-soft flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-vibrant-purple-dark" />
                <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
                  2. Bar Chart (Komparasi Sektoral)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard("bar", barCode)}
                className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
              >
                {copiedId === "bar" ? (
                  <>
                    <Check className="w-3 h-3 text-success" /> Copied!
                  </>
                ) : (
                  <>
                    <Code className="w-3 h-3" /> Code
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary leading-normal">
              Bar chart komparatif antar wilayah dengan pembulatan sudut bar radius modern.
            </p>
          </div>

          <div className="bg-surface p-3 rounded border border-hairline shadow-inner">
            <ChartApp
              id="bar-chart-module"
              type="bar"
              variant="vibrant"
              data={complianceData}
              xKey="region"
              series={complianceSeries}
              valueFormatter={(v) => `${v}%`}
              height={240}
            />
          </div>
        </div>

        {/* CHART 3: LINE CHART */}
        <div className="space-y-4 bg-vibrant-grey-bg/10 p-5 rounded-card-custom border border-hairline-soft flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
              <div className="flex items-center gap-2">
                <LineIcon className="w-4 h-4 text-vibrant-purple-dark" />
                <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
                  3. Line Chart (Proyeksi &amp; Aktual)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard("line", lineCode)}
                className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
              >
                {copiedId === "line" ? (
                  <>
                    <Check className="w-3 h-3 text-success" /> Copied!
                  </>
                ) : (
                  <>
                    <Code className="w-3 h-3" /> Code
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary leading-normal">
              Line chart garis putus-putus untuk proyeksi vs realisasi aktual.
            </p>
          </div>

          <div className="bg-surface p-3 rounded border border-hairline shadow-inner">
            <ChartApp
              id="line-chart-module"
              type="line"
              variant="vibrant"
              data={dendaProjectionData}
              xKey="month"
              series={lineSeries}
              valueFormatter={(v) => `Rp${v}Jt`}
              height={240}
            />
          </div>
        </div>

        {/* CHART 4: PIE CHART */}
        <div className="space-y-4 bg-vibrant-grey-bg/10 p-5 rounded-card-custom border border-hairline-soft flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-vibrant-purple-dark" />
                <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
                  4. Donut/Pie Chart (Distribusi Kontribusi)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard("pie", pieCode)}
                className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
              >
                {copiedId === "pie" ? (
                  <>
                    <Check className="w-3 h-3 text-success" /> Copied!
                  </>
                ) : (
                  <>
                    <Code className="w-3 h-3" /> Code
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary leading-normal">
              Pie/donut chart interaktif dengan pembagian segmen warna palet design system.
            </p>
          </div>

          <div className="bg-surface p-3 rounded border border-hairline shadow-inner flex justify-center items-center">
            <ChartApp
              id="pie-chart-module"
              type="pie"
              variant="vibrant"
              data={taxContributionData}
              innerRadius={55}
              outerRadius={85}
              height={240}
            />
          </div>
        </div>

        {/* CHART 5: RADAR CHART */}
        <div className="space-y-4 bg-vibrant-grey-bg/10 p-5 rounded-card-custom border border-hairline-soft flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-vibrant-purple-dark" />
                <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
                  5. Radar Chart (Kinerja Multidimensi)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard("radar", radarCode)}
                className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
              >
                {copiedId === "radar" ? (
                  <>
                    <Check className="w-3 h-3 text-success" /> Copied!
                  </>
                ) : (
                  <>
                    <Code className="w-3 h-3" /> Code
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary leading-normal">
              Radar chart untuk perbandingan kualitatif multi-variabel sektoral.
            </p>
          </div>

          <div className="bg-surface p-3 rounded border border-hairline shadow-inner flex justify-center items-center">
            <ChartApp
              id="radar-chart-module"
              type="radar"
              variant="vibrant"
              data={complianceSectorsData}
              xKey="sector"
              series={radarSeries}
              height={240}
            />
          </div>
        </div>

        {/* CHART 6: RADIAL CHART */}
        <div className="space-y-4 bg-vibrant-grey-bg/10 p-5 rounded-card-custom border border-hairline-soft flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-vibrant-purple-dark" />
                <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
                  6. Radial Chart (Pencapaian Target)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard("radial", radialCode)}
                className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
              >
                {copiedId === "radial" ? (
                  <>
                    <Check className="w-3 h-3 text-success" /> Copied!
                  </>
                ) : (
                  <>
                    <Code className="w-3 h-3" /> Code
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary leading-normal">
              Radial bar chart melingkar untuk metrik progress pencapaian target.
            </p>
          </div>

          <div className="bg-surface p-3 rounded border border-hairline shadow-inner flex justify-center items-center">
            <ChartApp
              id="radial-chart-module"
              type="radial"
              variant="vibrant"
              data={radialProgressData}
              height={240}
            />
          </div>
        </div>

      </div>

      {/* TOOLTIPS & ACCESSIBILITY DEEP DIVE */}
      <div className="mt-8 bg-surface border border-hairline p-5 rounded-card-custom text-left space-y-4">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Eye className="w-4 h-4 text-success animate-pulse" />
          <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
            7. Modular ChartApp Component Usage
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-ink-secondary">
          <div className="space-y-2">
            <p className="font-semibold text-ink">Keunggulan Komponen ChartApp:</p>
            <ul className="list-disc pl-4 space-y-1.5">
              <li>
                <strong className="text-ink">Tanpa Raw var(--):</strong> Warna diatur secara deklaratif melalui prop <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">variant</code> atau objek token <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">CHART_PALETTES</code>.
              </li>
              <li>
                <strong className="text-ink">Multi-Type Support:</strong> Mendukung tipe <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">area</code>, <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">bar</code>, <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">line</code>, <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">pie</code>, <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">radar</code>, dan <code className="px-1 py-0.5 bg-vibrant-grey-bg rounded text-[10px] font-mono text-ink">radial</code>.
              </li>
              <li>
                <strong className="text-ink">Solid Background Tooltips:</strong> Tooltip bebas dari efek transparansi mengganggu yang menembus garis grid Recharts.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-ink">Cara Import dan Pakai:</p>
            <pre className="p-2.5 bg-vibrant-grey-bg/50 rounded border border-hairline text-[10px] font-mono text-ink overflow-x-auto">
{`import { ChartApp, CHART_PALETTES } from "@/packages/design-system";

<ChartApp
  type="bar"
  variant="vibrant"
  data={data}
  xKey="month"
  series={[
    { key: "sales", label: "Penjualan", color: CHART_PALETTES.vibrant.p1 }
  ]}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
