import * as React from "react";
import {
  ScorecardApp,
  CardApp,
  BadgeApp,
  ButtonApp,
  TextApp,
  AdvanceFilterApp,
  DataTableApp,
  ChartApp,
  DialogApp,
  useToastApp,
  QuickPreset,
} from "@/packages/design-system";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  Hourglass,
  RefreshCw,
  Download,
  Eye,
  TrendingUp,
  Layers,
  Sparkles,
  BarChart2,
  ShieldAlert,
  CalendarCheck,
} from "lucide-react";

// Filter Field Configuration for BR-10 SLA Pelayanan
const slaFilterFields = [
  {
    id: "jenisLayanan",
    label: "Jenis Layanan Pajak",
    type: "select" as const,
    placeholder: "Pilih Jenis Layanan...",
    options: [
      { value: "all", label: "Semua Layanan Pajak" },
      { value: "penerbitan_sppt", label: "Penerbitan SPPT PBB Baru" },
      { value: "mutasi_pbb", label: "Mutasi Subjek/Objek PBB" },
      { value: "pembetulan_sppt", label: "Pembetulan SPPT / SKPD" },
      { value: "pendaftaran_npwpd", label: "Pendaftaran NPWPD Usaha Baru" },
      { value: "pengurangan_pajak", label: "Pengurangan Ketetapan / Denda" },
      { value: "pemeriksaan_omzet", label: "Pemeriksaan Uji Petik PBJT" },
    ],
  },
  {
    id: "sektorPajak",
    label: "Sektor Pajak",
    type: "select" as const,
    placeholder: "Pilih Sektor...",
    options: [
      { value: "all", label: "Semua Sektor Pajak" },
      { value: "pbb_p2", label: "PBB-P2" },
      { value: "pbjt_makanan", label: "PBJT Makanan & Minuman" },
      { value: "pbjt_hotel", label: "PBJT Jasa Perhotelan" },
      { value: "reklame", label: "Pajak Reklame" },
      { value: "air_tanah", label: "Pajak Air Tanah (PAT)" },
    ],
  },
  {
    id: "statusSLA",
    label: "Status Kepatuhan SLA",
    type: "select" as const,
    placeholder: "Semua Status SLA...",
    options: [
      { value: "all", label: "Semua Status SLA" },
      { value: "terpenuhi", label: "SLA Terpenuhi (Tepat Waktu)" },
      { value: "terlambat", label: "SLA Terlambat (Overdue)" },
    ],
  },
  {
    id: "periodeMonitoring",
    label: "Periode Evaluasi",
    type: "select" as const,
    placeholder: "Pilih Periode...",
    options: [
      { value: "2026_q3", label: "Triwulan III 2026 (Berjalan)" },
      { value: "2026_q2", label: "Triwulan II 2026" },
      { value: "2026_q1", label: "Triwulan I 2026" },
      { value: "2025_all", label: "Tahun 2025 Full" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua SLA 2026", values: { statusSLA: "all", periodeMonitoring: "2026_q3" } },
  { label: "SLA Terlambat / Bottleneck", values: { statusSLA: "terlambat" } },
  { label: "PBB-P2 Layanan Paling Padat", values: { sektorPajak: "pbb_p2" } },
  { label: "Pengurangan & Keberatan SLA", values: { jenisLayanan: "pengurangan_pajak" } },
];

// Chart Data 1: SLA Terpenuhi vs SLA Terlambat (Pie / Bar Chart Combo)
const chartDataKepatuhanSLA = [
  { status: "SLA Terpenuhi (Tepat Waktu)", jumlahBerkas: 4850, persentase: 92.4, color: "#059669" },
  { status: "SLA Terlambat (Overdue)", jumlahBerkas: 398, persentase: 7.6, color: "#dc2626" },
];

// Chart Data 2: Tren Rata-rata Durasi Penyelesaian Layanan per Bulan (Line Chart)
const chartDataTrenDurasi = [
  { bulan: "Jan 2026", targetSLA: 3.0, rataDurasi: 2.8, SLACompliancePercent: 91.2 },
  { bulan: "Feb 2026", targetSLA: 3.0, rataDurasi: 2.5, SLACompliancePercent: 93.0 },
  { bulan: "Mar 2026", targetSLA: 3.0, rataDurasi: 2.3, SLACompliancePercent: 94.1 },
  { bulan: "Apr 2026", targetSLA: 3.0, rataDurasi: 2.1, SLACompliancePercent: 95.2 },
  { bulan: "Mei 2026", targetSLA: 3.0, rataDurasi: 2.4, SLACompliancePercent: 93.8 },
  { bulan: "Jun 2026", targetSLA: 3.0, rataDurasi: 2.0, SLACompliancePercent: 96.0 },
  { bulan: "Jul 2026", targetSLA: 3.0, rataDurasi: 1.8, SLACompliancePercent: 97.2 },
];

// Table Data 1: Layanan Tercepat (Item 4 Table)
const mockLayananTercepat = [
  {
    id: "FAST-01",
    namaLayanan: "Pendaftaran NPWPD Usaha Baru Online",
    sektor: "PBJT & Reklame",
    targetSLA: "1 Hari Kerja (24 Jam)",
    realisasiRata: "0.4 Hari (9.6 Jam)",
    totalBerkas: "1.240 Berkas",
    kepatuhan: "99.2%",
    unitPenanggungJawab: "Seksi Pelayanan & Pendataan",
  },
  {
    id: "FAST-02",
    namaLayanan: "Cetak Ulang SPPT PBB-P2 Digital",
    sektor: "PBB-P2",
    targetSLA: "1 Hari Kerja",
    realisasiRata: "0.5 Hari (12 Jam)",
    totalBerkas: "2.150 Berkas",
    kepatuhan: "98.8%",
    unitPenanggungJawab: "Loket Loket Pelayanan Terpadu",
  },
  {
    id: "FAST-03",
    namaLayanan: "Pembetulan Ejaan Nama / Alamat SPPT",
    sektor: "PBB-P2",
    targetSLA: "2 Hari Kerja",
    realisasiRata: "1.1 Hari Kerja",
    totalBerkas: "890 Berkas",
    kepatuhan: "97.5%",
    unitPenanggungJawab: "Sub Bagian Tata Usaha Pelayanan",
  },
  {
    id: "FAST-04",
    namaLayanan: "Validasi Setoran BPHTB Nihil",
    sektor: "BPHTB",
    targetSLA: "2 Hari Kerja",
    realisasiRata: "1.2 Hari Kerja",
    totalBerkas: "640 Berkas",
    kepatuhan: "96.9%",
    unitPenanggungJawab: "Seksi Penetapan & Pelayanan",
  },
];

// Table Data 2: Layanan Terlama (Item 5 Table)
const mockLayananTerlama = [
  {
    id: "SLOW-01",
    namaLayanan: "Permohonan Keberatan NJOP & Omzet Uji Petik",
    sektor: "PBB-P2 & PBJT Hotel",
    targetSLA: "14 Hari Kerja",
    realisasiRata: "13.2 Hari Kerja",
    totalBerkas: "310 Berkas",
    kepatuhan: "82.5%",
    kendalaUtama: "Verifikasi Lapangan Tim Penilai NJOP",
    unitPenanggungJawab: "Tim Ahli Keberatan & Banding",
  },
  {
    id: "SLOW-02",
    namaLayanan: "Mutasi Pecah Sertifikat / Pemecahan NOP",
    sektor: "PBB-P2",
    targetSLA: "7 Hari Kerja",
    realisasiRata: "6.8 Hari Kerja",
    totalBerkas: "520 Berkas",
    kepatuhan: "85.2%",
    kendalaUtama: "Menunggu Cek Peta GIS & Koordinat BPN",
    unitPenanggungJawab: "Seksi Geospasial & Pendataan",
  },
  {
    id: "SLOW-03",
    namaLayanan: "Pengurangan PBB Cagar Budaya & Pensiunan",
    sektor: "PBB-P2",
    targetSLA: "5 Hari Kerja",
    realisasiRata: "4.7 Hari Kerja",
    totalBerkas: "410 Berkas",
    kepatuhan: "88.0%",
    kendalaUtama: "Pemeriksaan Dokumen Pendukung Fisik",
    unitPenanggungJawab: "Seksi Penetapan Pajak Daerah",
  },
  {
    id: "SLOW-04",
    namaLayanan: "Penghapusan Piutang Kedaluwarsa > 10Th",
    sektor: "PBB-P2 & PAT",
    targetSLA: "10 Hari Kerja",
    realisasiRata: "9.1 Hari Kerja",
    totalBerkas: "240 Berkas",
    kepatuhan: "89.5%",
    kendalaUtama: "Audit Kearsipan Piutang Macet",
    unitPenanggungJawab: "Seksi Penagihan & Audit",
  },
];

export function SLAServiceDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal State
  const [selectedLayanan, setSelectedLayanan] = React.useState<typeof mockLayananTercepat[0] | typeof mockLayananTerlama[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
  const [dialogCategory, setDialogCategory] = React.useState<"tercepat" | "terlama">("tercepat");

  // Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter SLA Direset", {
      description: "Semua kriteria filter SLA pelayanan telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan SLA Pelayanan Diexport", {
      description: "Berkas PDF/XLSX Laporan Kepatuhan & Evaluasi SLA BR-10 berhasil diunduh.",
    });
  };

  const handleOpenTercepatDetail = (record: typeof mockLayananTercepat[0]) => {
    setSelectedLayanan(record);
    setDialogCategory("tercepat");
    setIsDetailDialogOpen(true);
  };

  const handleOpenTerlamaDetail = (record: typeof mockLayananTerlama[0]) => {
    setSelectedLayanan(record);
    setDialogCategory("terlama");
    setIsDetailDialogOpen(true);
  };

  // Columns for Layanan Tercepat Table
  const cepatColumns = [
    {
      accessorKey: "id",
      header: "Ref Kode",
      cell: ({ row }: any) => (
        <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "namaLayanan",
      header: "Nama Layanan Pajak",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.namaLayanan}</div>
          <div className="text-[10px] text-ink-secondary">{row.original.unitPenanggungJawab}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-fast-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "targetSLA",
      header: "Target Standard SLA",
      cell: ({ row }: any) => (
        <span className="font-mono text-xs text-ink-primary">
          {row.original.targetSLA}
        </span>
      ),
    },
    {
      accessorKey: "realisasiRata",
      header: "Rata-Rata Penyelesaian",
      cell: ({ row }: any) => (
        <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
          {row.original.realisasiRata}
        </span>
      ),
    },
    {
      accessorKey: "kepatuhan",
      header: "Kepatuhan SLA",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-kepatuhan-fast-${row.original.id}`} variant="solidEmerald" size="sm">
          {row.original.kepatuhan}
        </BadgeApp>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-fast-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenTercepatDetail(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Rincian
        </ButtonApp>
      ),
    },
  ];

  // Columns for Layanan Terlama Table
  const lamaColumns = [
    {
      accessorKey: "id",
      header: "Ref Kode",
      cell: ({ row }: any) => (
        <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "namaLayanan",
      header: "Nama Layanan Pajak",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.namaLayanan}</div>
          <div className="text-[10px] text-ink-secondary">{row.original.unitPenanggungJawab}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-slow-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "targetSLA",
      header: "Target Standard SLA",
      cell: ({ row }: any) => (
        <span className="font-mono text-xs text-ink-primary">
          {row.original.targetSLA}
        </span>
      ),
    },
    {
      accessorKey: "realisasiRata",
      header: "Rata-Rata Durasi",
      cell: ({ row }: any) => (
        <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
          {row.original.realisasiRata}
        </span>
      ),
    },
    {
      accessorKey: "kepatuhan",
      header: "Kepatuhan SLA",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-kepatuhan-slow-${row.original.id}`} variant="solidRose" size="sm">
          {row.original.kepatuhan}
        </BadgeApp>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-slow-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenTerlamaDetail(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Rincian
        </ButtonApp>
      ),
    },
  ];

  return (
    <div id="sla-service-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br10" variant="solidPurple" size="sm">
              BR-10 Dashboard SLA Pelayanan
            </BadgeApp>
            <BadgeApp id="hdr-badge-standar-layanan" variant="solidAmber" size="sm">
              <Clock className="w-3 h-3 mr-1 inline" />
              Service Level Agreement (SLA)
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-sla" variant="solidEmerald" size="sm">
              Kepatuhan Layanan 92.4%
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-sla" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Monitoring SLA & Kepatuhan Pelayanan
          </TextApp>
          <TextApp id="hdr-sub-sla" variant="caption" className="text-ink-secondary mt-0.5">
            Evaluasi SLA Terpenuhi, SLA Terlambat, Rata-rata Penyelesaian, Layanan Tercepat, & Bottleneck Layanan Terlama
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-sla-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data SLA Dibarui", {
                description: "Metrik durasi penyelesaian dan kepatuhan SLA telah disinkronkan dari SIMPAD.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync SLA
          </ButtonApp>

          <ButtonApp
            id="btn-export-sla-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan SLA
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-sla-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-sla-pelayanan"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter SLA Pelayanan"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Evaluasi Durasi & Kepatuhan Layanan"
          fields={slaFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter SLA Diterapkan", {
              description: "Menampilkan analisis performa standar pelayanan sesuai kriteria filter.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-10 Items 1 to 5)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Bottom 2 default white. Clean titles without numbers.          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. SLA Terpenuhi - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-sla-terpenuhi"
            variant="clayPurple"
            title="SLA Terpenuhi"
            value="4.850 Berkas"
            unit="Tepat Waktu (92.4% Compliance)"
            description="Layanan Diselesaikan Sesuai Standard SLA"
            badge="On-Time Success"
            trend={{
              value: "+4.2%",
              label: "Peningkatan Tepat Waktu",
              isPositive: true,
              direction: "up",
            }}
            icon={<CheckCircle2 className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah permohonan yang berhasil diselesaikan sebelum tenggat standar SLA."
          />
        </div>

        {/* 2. SLA Terlambat - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-sla-terlambat"
            variant="clayBlue"
            title="SLA Terlambat"
            value="398 Berkas"
            unit="Terlambat / Overdue (7.6%)"
            description="Terutama Permohonan Keberatan & Mutasi Pemecahan"
            badge="Bottleneck Overdue"
            trend={{
              value: "-2.1%",
              label: "Penurunan Keterlambatan",
              isPositive: true,
              direction: "down",
            }}
            icon={<AlertTriangle className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah berkas permohonan yang melewati batas standar SLA pelayanan."
          />
        </div>

        {/* 3. Rata-rata Penyelesaian - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-rata-penyelesaian"
            variant="clayYellow"
            title="Rata-rata Penyelesaian"
            value="1.8 Hari"
            unit="Standard Target: 3.0 Hari Kerja"
            description="Effisiensi Layanan Membaik 40% Dibanding TA 2025"
            badge="Avg Efficiency"
            trend={{
              value: "-0.6 Hari",
              label: "Lebih Cepat YoY",
              isPositive: true,
              direction: "down",
            }}
            icon={<Clock className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Rata-rata durasi waktu yang dibutuhkan dari pendaftaran berkas hingga penandatanganan SK."
          />
        </div>

        {/* 4. Layanan Tercepat - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-layanan-tercepat"
            variant="default"
            title="Layanan Tercepat"
            value="0.4 Hari"
            unit="NPWPD Online (9.6 Jam)"
            description="Pendaftaran Usaha Baru via Portal Self-Service"
            badge="Fastest Service"
            trend={{
              value: "99.2% SLA",
              label: "Tercepat #1",
              isPositive: true,
              direction: "up",
            }}
            icon={<Zap className="w-5 h-5 text-emerald-600" />}
            infoTooltip="Jenis layanan pajak daerah dengan rata-rata durasi penyelesaian paling singkat."
          />
        </div>

        {/* 5. Layanan Terlama - Default White */}
        <div className="col-span-1 flex flex-col h-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <ScorecardApp
            id="card-score-layanan-terlama"
            variant="default"
            title="Layanan Terlama"
            value="13.2 Hari"
            unit="Keberatan NJOP & Omzet"
            description="Memerlukan Inspeksi Lapangan & Sidang Tim Evaluasi"
            badge="Bottleneck Zone"
            trend={{
              value: "82.5% SLA",
              label: "Perlu Evaluasi Tim",
              isPositive: false,
              direction: "up",
            }}
            icon={<Hourglass className="w-5 h-5 text-rose-600" />}
            infoTooltip="Jenis layanan pajak daerah yang membutuhkan durasi penyelesaian paling lama karena kompleksitas verifikasi."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION: KEPATUHAN SLA & TREN RATA-RATA DURASI         */}
      {/* (BR-10 Items 1, 2, 3 Charts)                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visualisasi Items 1 & 2: SLA Terpenuhi vs SLA Terlambat (Bar / Pie Chart) */}
        <CardApp id="card-chart-kepatuhan-sla" className="lg:col-span-1 p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-kepatuhan" variant="solidPurple" size="sm">Persentase SLA</BadgeApp>
              <BadgeApp id="badge-chart-kepatuhan-val" variant="solidEmerald" size="sm">92.4% Tepat Waktu</BadgeApp>
            </div>
            <TextApp id="title-chart-kepatuhan" variant="h3" weight="bold" className="text-ink-primary">
              Proposi Kepatuhan SLA Pelayanan
            </TextApp>
            <TextApp id="sub-chart-kepatuhan" variant="caption" className="text-ink-secondary mb-4">
              Perbandingan Berkas Tepat Waktu vs Berkas Overdue
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-bar-kepatuhan-sla"
              type="bar"
              data={chartDataKepatuhanSLA}
              xKey="status"
              barSize={24}
              series={[
                { key: "jumlahBerkas", label: "Jumlah Berkas", color: "#7e22ce" },
              ]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

        {/* Visualisasi Item 3: Rata-rata Penyelesaian (Line Chart Tren Durasi) */}
        <CardApp id="card-chart-tren-durasi" className="lg:col-span-2 p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-durasi" variant="solidAmber" size="sm">Rata-rata Durasi (Hari)</BadgeApp>
              <BadgeApp id="badge-chart-durasi-target" variant="solidPurple" size="sm">Target SLA: 3.0 Hari</BadgeApp>
            </div>
            <TextApp id="title-chart-durasi" variant="h3" weight="bold" className="text-ink-primary">
              Tren Rata-rata Penyelesaian Layanan per Bulan
            </TextApp>
            <TextApp id="sub-chart-durasi" variant="caption" className="text-ink-secondary mb-4">
              Historis Rata-rata Durasi Hari Kerja vs Standard Target SLA
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-line-tren-durasi"
              type="line"
              data={chartDataTrenDurasi}
              xKey="bulan"
              series={[
                { key: "rataDurasi", label: "Rata-rata Durasi (Hari)", color: "#7e22ce" },
                { key: "targetSLA", label: "Target SLA Standard (Hari)", color: "#f59e0b" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* TABLES SECTION: LAYANAN TERCEPAT & LAYANAN TERLAMA            */}
      {/* (BR-10 Items 4 & 5 Tables)                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Visualisasi Item 4: Layanan Tercepat (Table) */}
        <CardApp id="card-table-layanan-tercepat" className="p-5 border-hairline-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BadgeApp id="badge-tbl-fast" variant="solidEmerald" size="sm">
                  <Zap className="w-3 h-3 mr-1 inline" />
                  Layanan Tercepat
                </BadgeApp>
                <BadgeApp id="badge-tbl-fast-top" variant="solidPurple" size="sm">Top Efficiency</BadgeApp>
              </div>
              <TextApp id="title-tbl-fast" variant="h3" weight="bold" className="text-ink-primary">
                Daftar Jenis Layanan Tercepat
              </TextApp>
              <TextApp id="sub-tbl-fast" variant="caption" className="text-ink-secondary">
                Layanan dengan Rata-rata Durasi Penyelesaian Di Bawah Target SLA
              </TextApp>
            </div>
          </div>

          <DataTableApp
            id="datatable-layanan-tercepat"
            data={mockLayananTercepat}
            columns={cepatColumns}
            searchPlaceholder="Cari Layanan Tercepat..."
            pageSize={4}
          />
        </CardApp>

        {/* Visualisasi Item 5: Layanan Terlama (Table) */}
        <CardApp id="card-table-layanan-terlama" className="p-5 border-hairline-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BadgeApp id="badge-tbl-slow" variant="solidRose" size="sm">
                  <Hourglass className="w-3 h-3 mr-1 inline" />
                  Layanan Terlama
                </BadgeApp>
                <BadgeApp id="badge-tbl-slow-alert" variant="solidAmber" size="sm">Bottleneck Area</BadgeApp>
              </div>
              <TextApp id="title-tbl-slow" variant="h3" weight="bold" className="text-ink-primary">
                Daftar Jenis Layanan Terlama & Bottleneck
              </TextApp>
              <TextApp id="sub-tbl-slow" variant="caption" className="text-ink-secondary">
                Layanan Membutuhkan Waktu Evaluasi Paling Lama & Kendala Lapangan
              </TextApp>
            </div>
          </div>

          <DataTableApp
            id="datatable-layanan-terlama"
            data={mockLayananTerlama}
            columns={lamaColumns}
            searchPlaceholder="Cari Layanan Terlama..."
            pageSize={4}
          />
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL FOR SLA TERCEPAT / TERLAMA                */}
      {/* ------------------------------------------------------------- */}
      {selectedLayanan && (
        <DialogApp
          id="dialog-detail-sla-layanan"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Evaluasi SLA: ${selectedLayanan.namaLayanan}`}
          description="Apresiasi performa dan analisis hambatan proses pelayanan."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Layanan:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedLayanan.namaLayanan}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor Pajak:</span>
                <BadgeApp id="badge-dlg-sektor-sla" variant="solidAmber" size="sm">{selectedLayanan.sektor}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Target Standard SLA:</span>
                <span className="font-mono font-medium text-ink-primary">{selectedLayanan.targetSLA}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Realisasi Rata-rata:</span>
                <span className="font-mono font-bold text-vibrant-purple text-sm">{selectedLayanan.realisasiRata}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Rincian Operasional & Unit Penanggung Jawab</span>
              </div>
              <p className="text-ink-secondary">
                Unit Penanggung Jawab: <span className="font-medium text-ink-primary">{selectedLayanan.unitPenanggungJawab}</span>
              </p>
              <p className="text-ink-secondary">
                Total Berkas Diproses: <span className="font-mono text-ink-primary">{selectedLayanan.totalBerkas}</span>
              </p>
              <p className="text-ink-secondary">
                Tingkat Kepatuhan SLA: <BadgeApp id="badge-dlg-kepatuhan-sla" variant="solidEmerald" size="sm">{selectedLayanan.kepatuhan}</BadgeApp>
              </p>
              {"kendalaUtama" in selectedLayanan && (
                <p className="text-ink-secondary">
                  Kendala / Bottleneck utama: <span className="font-medium text-rose-600">{(selectedLayanan as any).kendalaUtama}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-sla-dialog"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Tutup Rincian
              </ButtonApp>
            </div>
          </div>
        </DialogApp>
      )}
    </div>
  );
}

export default SLAServiceDashboardPage;
