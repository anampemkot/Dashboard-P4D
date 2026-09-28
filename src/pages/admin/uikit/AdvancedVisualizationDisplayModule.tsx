import * as React from "react";
import {
  BoxPlotApp,
  BulletChartApp,
  ChartApp,
  ChoroplethMapApp,
  FunnelChartApp,
  GaugeChartApp,
  HeatmapApp,
  MarqueeApp,
  SankeyDiagramApp,
  SparklineApp,
  TextApp,
  TreemapChartApp,
  WaterfallChartApp,
} from "@/packages/design-system";
import { Activity, BarChart3 } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

const chartData = [
  { name: "Jan", target: 80, actual: 68, growth: 7 },
  { name: "Feb", target: 90, actual: 84, growth: 9 },
  { name: "Mar", target: 100, actual: 96, growth: 12 },
  { name: "Apr", target: 110, actual: 118, growth: 15 },
];
const heatmapData = ["Sen", "Sel", "Rab", "Kam", "Jum"].flatMap((day, row) => ["PBB", "BPHTB", "PBJT", "PAT"].map((tax, col) => ({ x: tax, y: day, value: 20 + row * 12 + col * 9 })));
const calendarHeatmap = Array.from({ length: 35 }, (_, index) => ({ x: `W${Math.floor(index / 7) + 1}`, y: String(index % 7), date: `${index + 1} Juli`, value: (index * 17) % 100 }));
// Approximate kecamatan boundaries around Yogyakarta city center as real
// [lng, lat] GeoJSON polygons — placeholder shapes standing in for actual
// kecamatan survey data, but genuine geospatial geometry that renders on a
// real basemap (pan/zoom/tile) rather than a hand-drawn illustration.
const regions: { id: string; name: string; value: number; geometry: GeoJSON.Geometry }[] = [
  {
    id: "jetis",
    name: "Jetis",
    value: 72,
    geometry: {
      type: "Polygon",
      coordinates: [[[110.3455, -7.78698], [110.3709, -7.78581], [110.3673, -7.80442], [110.3482, -7.80674], [110.3455, -7.78698]]],
    },
  },
  {
    id: "gondokusuman",
    name: "Gondokusuman",
    value: 88,
    geometry: {
      type: "Polygon",
      coordinates: [[[110.3709, -7.78581], [110.3973, -7.78930], [110.3927, -7.80674], [110.3673, -7.80442], [110.3709, -7.78581]]],
    },
  },
  {
    id: "kraton",
    name: "Kraton",
    value: 55,
    geometry: {
      type: "Polygon",
      coordinates: [[[110.3482, -7.80674], [110.3673, -7.80442], [110.3700, -7.82767], [110.3500, -7.82884], [110.3482, -7.80674]]],
    },
  },
  {
    id: "umbulharjo",
    name: "Umbulharjo",
    value: 94,
    geometry: {
      type: "Polygon",
      coordinates: [[[110.3673, -7.80442], [110.3927, -7.80674], [110.4000, -7.82884], [110.3700, -7.82767], [110.3673, -7.80442]]],
    },
  },
];

export function AdvancedVisualizationDisplayModule() {
  return (
    <ModuleCard
      id="uikit-advanced-visualization-module"
      icon={<Activity className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Advanced Visualization Components"
      description="Visualisasi tambahan yang belum dicakup ChartApp dasar: scatter, bubble, stacked/horizontal bar, combo, heatmap, gauge, funnel, waterfall, bullet, treemap, choropleth, Sankey, sparklines, box plot, dan ticker."
    >
      <ShowcaseGrid cols={3}>
        <ShowcaseCard id="advviz-horizontal-bar" title="Bar Chart · Horizontal" description="Axes + Tooltip" code={`<ChartApp type="bar" barLayout="horizontal" data={data} xKey="name" series={[{ key: "actual", label: "Realisasi" }]} />`}>
          <ChartApp type="bar" data={chartData} xKey="name" series={[{ key: "actual", label: "Realisasi" }]} barLayout="horizontal" xAxisLabel="Nilai" height={250} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-stacked-bar" title="Bar Chart · Stacked" description="Legend" code={`<ChartApp type="bar" data={data} xKey="name" series={[{ key: "target", stackId: "total" }, { key: "actual", stackId: "total" }]} />`}>
          <ChartApp type="bar" data={chartData} xKey="name" series={[{ key: "target", label: "Target", stackId: "total" }, { key: "actual", label: "Realisasi", stackId: "total" }]} height={250} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-bubble" title="Scatter Plot · Basic & Bubble" code={`<ChartApp type="bubble" data={[{ x, y, z }]} series={[{ key: "value", label: "Objek Pajak" }]} />`}>
          <ChartApp type="bubble" data={[{ x: 20, y: 40, z: 30 }, { x: 35, y: 62, z: 80 }, { x: 50, y: 48, z: 50 }, { x: 70, y: 85, z: 120 }]} series={[{ key: "value", label: "Objek Pajak" }]} xAxisLabel="Potensi" yAxisLabel="Realisasi" height={250} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-combo" title="Combo Chart · Line & Bar" description="Dual Axis" code={`<ChartApp type="combo" data={data} series={[{ key: "actual", chartType: "bar", yAxisId: "left" }, { key: "growth", chartType: "line", yAxisId: "right" }]} />`}>
          <ChartApp type="combo" data={chartData} xKey="name" series={[{ key: "actual", label: "Realisasi", chartType: "bar", yAxisId: "left" }, { key: "growth", label: "Pertumbuhan", chartType: "line", yAxisId: "right" }]} height={250} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-basic-line" title="Line Chart · Basic" code={`<ChartApp type="line" data={data} xKey="name" series={[{ key: "actual", label: "Realisasi" }]} />`}>
          <ChartApp type="line" data={chartData} xKey="name" xAxisLabel="Bulan" yAxisLabel="Realisasi" series={[{ key: "actual", label: "Realisasi" }]} height={250} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-basic-scatter" title="Scatter Plot · Basic" code={`<ChartApp type="scatter" data={[{ x, y }]} series={[{ key: "value", label: "Objek Pajak" }]} />`}>
          <ChartApp type="scatter" data={[{ x: 20, y: 40 }, { x: 35, y: 62 }, { x: 50, y: 48 }, { x: 70, y: 85 }]} series={[{ key: "value", label: "Objek Pajak" }]} xAxisLabel="Potensi" yAxisLabel="Realisasi" height={250} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-basic-pie" title="Pie Chart · Basic" description="Sequential" code={`<ChartApp type="pie" variant="sequential" data={[{ name, value }]} />`}>
          <ChartApp type="pie" variant="sequential" data={[{ name: "PBB", value: 45 }, { name: "PBJT", value: 30 }, { name: "BPHTB", value: 25 }]} innerRadius={0} outerRadius={78} height={220} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-chart-loading" title="Chart · Loading State" code={`<ChartApp type="bar" data={[]} loading />`}>
          <ChartApp id="chart-loading-demo" type="bar" data={[]} loading height={220} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-chart-empty" title="Chart · Empty State" code={`<ChartApp type="line" data={[]} emptyMessage="Data periode ini belum tersedia" />`}>
          <ChartApp id="chart-empty-demo" type="line" data={[]} emptyMessage="Data periode ini belum tersedia" height={220} />
        </ShowcaseCard>

        <ShowcaseCard id="advviz-heatmap" title="Heatmap · Matrix" code={`<HeatmapApp id="heatmap" data={matrixData} />`}>
          <HeatmapApp id="heatmap-matrix-demo" data={heatmapData} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-calendar-heatmap" title="Heatmap · Calendar" code={`<HeatmapApp id="heatmap" data={calendarData} variant="calendar" />`}>
          <HeatmapApp id="heatmap-calendar-demo" data={calendarHeatmap} variant="calendar" />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-gauge-speedometer" title="Gauge · Speedometer" code={`<GaugeChartApp value={78} target={85} label="Capaian PAD" variant="speedometer" />`}>
          <GaugeChartApp id="gauge-speed-demo" value={78} target={85} label="Capaian PAD" variant="speedometer" valueFormatter={(value) => `${value}%`} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-gauge-arc" title="Gauge · Arc" code={`<GaugeChartApp value={64} target={75} label="Kepatuhan" variant="arc" />`}>
          <GaugeChartApp id="gauge-arc-demo" value={64} min={0} max={100} target={75} label="Kepatuhan" variant="arc" valueFormatter={(value) => `${value}%`} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-funnel" title="Funnel · Conversion" code={`<FunnelChartApp data={[{ label: "Terdaftar", value: 12000 }, ...]} />`}>
          <FunnelChartApp id="funnel-demo" data={[{ label: "Terdaftar", value: 12000 }, { label: "Terverifikasi", value: 9300 }, { label: "Ditetapkan", value: 7200 }, { label: "Lunas", value: 5900 }]} valueFormatter={(value) => value.toLocaleString("id-ID")} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-funnel-pipeline" title="Funnel · Alur Bertahap" description="Varian `steps` — data yang sama sebagai alur kiri-ke-kanan, dipakai saat angka tiap tahap itu sendiri yang dilaporkan dan tahap terakhir adalah hasilnya." className="md:col-span-2 xl:col-span-2" code={`<FunnelChartApp variant="steps" data={[{ label: "Hasil Survei", value: 450 }, ...]} />`}>
          <FunnelChartApp id="funnel-steps-demo" variant="steps" data={[{ label: "Hasil Survei", value: 450 }, { label: "Hasil Uji Petik", value: 200 }, { label: "OP Baru Ditetapkan", value: 150 }]} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-waterfall" title="Waterfall · Financial" code={`<WaterfallChartApp data={[{ label: "Awal", value: 450, type: "start" }, ...]} />`}>
          <WaterfallChartApp id="waterfall-demo" data={[{ label: "Awal", value: 450, type: "start" }, { label: "PBB", value: 85, type: "increase" }, { label: "PBJT", value: 64, type: "increase" }, { label: "Koreksi", value: -28, type: "decrease" }, { label: "Akhir", value: 571, type: "total" }]} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-bullet" title="Bullet · Qualitative" code={`<BulletChartApp data={[{ label: "PBB-P2", value: 78, target: 85, max: 100 }, ...]} />`}>
          <BulletChartApp id="bullet-demo" data={[{ label: "PBB-P2", value: 78, target: 85, max: 100 }, { label: "BPHTB", value: 92, target: 88, max: 100 }, { label: "PBJT", value: 67, target: 80, max: 100 }]} valueFormatter={(value) => `${value}%`} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-bullet-standard" title="Bullet · Standard" code={`<BulletChartApp variant="standard" data={[{ label: "PAD", value: 78, target: 85, max: 100 }]} />`}>
          <BulletChartApp id="bullet-standard-demo" variant="standard" data={[{ label: "PAD", value: 78, target: 85, max: 100 }]} valueFormatter={(value) => `${value}%`} />
        </ShowcaseCard>

        <ShowcaseCard id="advviz-treemap" title="Treemap · Hierarchical" code={`<TreemapChartApp data={[{ name, size, children: [...] }]} />`}>
          <TreemapChartApp id="treemap-demo" data={[{ name: "Official Assessment", size: 740, children: [{ name: "PBB-P2", size: 420 }, { name: "BPHTB", size: 320 }] }, { name: "Self Assessment", size: 370, children: [{ name: "PBJT", size: 260 }, { name: "Reklame", size: 110 }] }]} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-sankey" title="Sankey · Revenue Flow" code={`<SankeyDiagramApp nodes={[{ name }]} links={[{ source, target, value }]} />`}>
          <SankeyDiagramApp id="sankey-demo" nodes={[{ name: "WP" }, { name: "PBB" }, { name: "PBJT" }, { name: "Kasda" }]} links={[{ source: 0, target: 1, value: 60 }, { source: 0, target: 2, value: 40 }, { source: 1, target: 3, value: 58 }, { source: 2, target: 3, value: 37 }]} />
        </ShowcaseCard>
        <ShowcaseCard id="advviz-choropleth" title="Choropleth · Regions" code={`<ChoroplethMapApp regions={regions} valueLabel="Tingkat Kepatuhan" valueFormatter={(v) => \`\${v}%\`} />`}>
          <ChoroplethMapApp id="choropleth-demo" regions={regions} valueLabel="Tingkat Kepatuhan" valueFormatter={(value) => `${value}%`} />
        </ShowcaseCard>

        <ShowcaseCard id="advviz-sparklines" title="Sparklines · Line, Bar, Win/Loss" className="md:col-span-2 xl:col-span-2" code={`<SparklineApp data={[4, 7, 5, 9]} />\n<SparklineApp data={[4, 7, 5, 9]} type="bar" />\n<SparklineApp data={[1, -1, 1]} type="winLoss" />`}>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <TextApp id="spark-line-label" variant="micro" className="mb-2 text-ink-muted">Line</TextApp>
              <SparklineApp id="spark-line" data={[4, 7, 5, 9, 8, 12, 14]} className="w-full" />
            </div>
            <div>
              <TextApp id="spark-bar-label" variant="micro" className="mb-2 text-ink-muted">Bar</TextApp>
              <SparklineApp id="spark-bar" data={[4, 7, 5, 9, 8, 12, 14]} type="bar" className="w-full" />
            </div>
            <div>
              <TextApp id="spark-win-label" variant="micro" className="mb-2 text-ink-muted">Win/Loss</TextApp>
              <SparklineApp id="spark-win" data={[1, -1, 1, 1, -1, 1, -1]} type="winLoss" className="w-full" />
            </div>
          </div>
        </ShowcaseCard>
        <ShowcaseCard id="advviz-boxplot" title="Box Plot · Quartiles & Outliers" code={`<BoxPlotApp data={[{ label: "PBB", min, q1, median, q3, max, outliers: [94] }]} />`}>
          <BoxPlotApp id="boxplot-demo" data={[{ label: "PBB", min: 20, q1: 35, median: 52, q3: 68, max: 82, outliers: [94] }, { label: "PBJT", min: 28, q1: 42, median: 58, q3: 75, max: 90, outliers: [12] }, { label: "BPHTB", min: 18, q1: 30, median: 47, q3: 62, max: 79 }]} />
        </ShowcaseCard>

        <ShowcaseCard id="advviz-marquee-horizontal" title="Marquee · Horizontal Left" code={`<MarqueeApp duration={18} pauseOnHover>{items}</MarqueeApp>`}>
          <MarqueeApp id="marquee-horizontal-demo" duration={18} pauseOnHover className="rounded-md bg-surface-soft py-3">
            {["PBB-P2 +8,4%", "PBJT +12,1%", "BPHTB -2,3%", "Reklame +5,8%"].map((item) => (
              <span key={item} className="mx-2 inline-flex rounded-full border border-hairline bg-surface px-4 py-2 text-xs font-semibold text-ink">{item}</span>
            ))}
          </MarqueeApp>
        </ShowcaseCard>
        <ShowcaseCard id="advviz-marquee-horizontal-reverse" title="Marquee · Horizontal Right" code={`<MarqueeApp direction="right" duration={18} pauseOnHover>{items}</MarqueeApp>`}>
          <MarqueeApp id="marquee-horizontal-reverse-demo" direction="right" duration={18} pauseOnHover className="rounded-md bg-surface-soft py-3">
            {["Target PAD 78%", "SLA 98,4%", "Data Quality 94,8"].map((item) => (
              <span key={item} className="mx-2 inline-flex rounded-full border border-hairline bg-surface px-4 py-2 text-xs font-semibold text-ink">{item}</span>
            ))}
          </MarqueeApp>
        </ShowcaseCard>
        <ShowcaseCard id="advviz-marquee-vertical" title="Marquee · Vertical Up" code={`<MarqueeApp orientation="vertical" direction="up" duration={14} pauseOnHover>{items}</MarqueeApp>`}>
          <MarqueeApp id="marquee-vertical-demo" orientation="vertical" direction="up" duration={14} pauseOnHover className="rounded-md bg-surface-soft">
            {["Verifikasi PBB selesai", "Setoran PBJT diterima", "Audit BPHTB dijadwalkan", "Rekonsiliasi Kasda"].map((item) => (
              <div key={item} className="m-2 w-72 rounded-md border border-hairline bg-surface px-3 py-2 text-xs text-ink">{item}</div>
            ))}
          </MarqueeApp>
        </ShowcaseCard>
        <ShowcaseCard id="advviz-marquee-vertical-reverse" title="Marquee · Vertical Down" code={`<MarqueeApp orientation="vertical" direction="down" duration={14} pauseOnHover>{items}</MarqueeApp>`}>
          <MarqueeApp id="marquee-vertical-reverse-demo" orientation="vertical" direction="down" duration={14} pauseOnHover className="rounded-md bg-surface-soft">
            {["Agenda Penagihan", "Validasi BPHTB", "Pembayaran PBB", "Laporan PBJT"].map((item) => (
              <div key={item} className="m-2 w-72 rounded-md border border-hairline bg-surface px-3 py-2 text-xs text-ink">{item}</div>
            ))}
          </MarqueeApp>
        </ShowcaseCard>

        <ShowcaseCard id="advviz-states-note" title="Loading & Empty State" description="Catatan penggunaan" align="start" className="md:col-span-3">
          <div className="flex w-full items-center gap-2 rounded-lg border border-hairline-soft bg-surface-soft p-3">
            <BarChart3 className="h-4 w-4 text-vibrant-purple-dark" />
            <TextApp id="advanced-states-note" variant="caption" className="text-ink-secondary">
              ChartApp juga menyediakan loading dan empty state melalui props <code>loading</code> dan data kosong.
            </TextApp>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
