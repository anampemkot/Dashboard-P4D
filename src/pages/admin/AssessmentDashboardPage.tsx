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
  FileText,
  DollarSign,
  Landmark,
  UtensilsCrossed,
  Home,
  RefreshCw,
  Download,
  Eye,
  TrendingUp,
  Target,
  Calendar,
  Layers,
  Sparkles,
  PieChart,
} from "lucide-react";

// Filter Field Configuration for BR-05
const penetapanFilterFields = [
  {
    id: "sektorPajak",
    label: "Sektor Pajak",
    type: "select" as const,
    placeholder: "Pilih Sektor Pajak...",
    options: [
      { value: "all", label: "Semua Sektor Pajak" },
      { value: "pbb_p2", label: "PBB-P2 (Pedesaan & Perkotaan)" },
      { value: "pbjt_makanan", label: "PBJT Makanan & Minuman" },
      { value: "pbjt_hotel", label: "PBJT Jasa Perhotelan" },
      { value: "pbjt_hiburan", label: "PBJT Jasa Kesenian & Hiburan" },
      { value: "pbjt_parkir", label: "PBJT Jasa Parkir" },
      { value: "pbjt_ppj", label: "PBJT Tenaga Listrik (PPJ)" },
      { value: "bphtb", label: "BPHTB (Bea Perolehan Hak)" },
      { value: "reklame", label: "Pajak Reklame" },
      { value: "air_tanah", label: "Pajak Air Tanah (PAT)" },
    ],
  },
  {
    id: "kecamatan",
    label: "Wilayah Kecamatan",
    type: "select" as const,
    placeholder: "Pilih Kecamatan...",
    options: [
      { value: "all", label: "Semua Kecamatan (14 Wilayah)" },
      { value: "gondomanan", label: "Kecamatan Gondomanan" },
      { value: "danurejan", label: "Kecamatan Danurejan" },
      { value: "kraton", label: "Kecamatan Kraton" },
      { value: "jetis", label: "Kecamatan Jetis" },
      { value: "umbulharjo", label: "Kecamatan Umbulharjo" },
      { value: "mantrijeron", label: "Kecamatan Mantrijeron" },
      { value: "kotagede", label: "Kecamatan Kotagede" },
      { value: "gondokusuman", label: "Kecamatan Gondokusuman" },
    ],
  },
  {
    id: "jenisKetetapan",
    label: "Jenis Dokumen Penetapan",
    type: "select" as const,
    placeholder: "Pilih Jenis Dokumen...",
    options: [
      { value: "all", label: "Semua Jenis SKP" },
      { value: "skpd_jabatan", label: "SKPD Off-Official / Jabatan" },
      { value: "sptpd_self", label: "SPTPD Self-Assessment" },
      { value: "skpdkb", label: "SKPDKB (Kurang Bayar)" },
      { value: "skpdt", label: "SKPDT (Tambahan)" },
      { value: "skpd_nihil", label: "SKPDN (Nihil)" },
    ],
  },
  {
    id: "bulanPenetapan",
    label: "Bulan Penetapan",
    type: "select" as const,
    placeholder: "Pilih Bulan...",
    options: [
      { value: "all", label: "Semua Bulan (Jan - Des)" },
      { value: "07", label: "Juli 2026 (Berjalan)" },
      { value: "06", label: "Juni 2026" },
      { value: "05", label: "Mei 2026" },
      { value: "04", label: "April 2026" },
      { value: "03", label: "Maret 2026" },
    ],
  },
  {
    id: "tahunAnggaran",
    label: "Tahun Anggaran",
    type: "select" as const,
    placeholder: "Tahun...",
    options: [
      { value: "2026", label: "Tahun 2026 (Berjalan)" },
      { value: "2025", label: "Tahun 2025" },
      { value: "2024", label: "Tahun 2024" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Penetapan 2026", values: { jenisKetetapan: "all", bulanPenetapan: "all" } },
  { label: "PBB Masa 2026", values: { sektorPajak: "pbb_p2" } },
  { label: "PBJT Self Assessment", values: { jenisKetetapan: "sptpd_self" } },
  { label: "Penetapan Juli 2026", values: { bulanPenetapan: "07" } },
];

// Mock Daily Penetapan Data (BR-05 Visualisasi Item 6: Ketetapan Harian)
const dailyPenetapanData = Array.from({ length: 28 }, (_, index) => {
  const day = index + 1;
  const skpd = Math.floor(1200 + Math.sin(day / 2) * 400 + Math.random() * 200);
  const nominalJuta = Math.floor(1800 + Math.cos(day / 3) * 600 + Math.random() * 300);
  return {
    day: `Tgl ${day}`,
    skpdCount: skpd,
    nilaiMiliar: Number((nominalJuta / 1000).toFixed(2)),
  };
});

// Mock Monthly Penetapan Data (BR-05 Visualisasi Item 7 & Metrik 2: Ketetapan Bulanan & Tren Penetapan)
const monthlyPenetapanData = [
  { month: "Jan", penetapan2025: 28.4, penetapan2026: 31.2, skpdCount: 11200 },
  { month: "Feb", penetapan2025: 29.8, penetapan2026: 33.5, skpdCount: 11800 },
  { month: "Mar", penetapan2025: 32.1, penetapan2026: 36.8, skpdCount: 12900 },
  { month: "Apr", penetapan2025: 30.5, penetapan2026: 34.2, skpdCount: 12100 },
  { month: "Mei", penetapan2025: 35.2, penetapan2026: 39.4, skpdCount: 13800 },
  { month: "Jun", penetapan2025: 42.0, penetapan2026: 46.5, skpdCount: 15400 },
  { month: "Jul", penetapan2025: 38.4, penetapan2026: 42.8, skpdCount: 14200 },
  { month: "Agt", penetapan2025: 36.0, penetapan2026: 39.1, skpdCount: 13100 },
  { month: "Sep", penetapan2025: 34.5, penetapan2026: 37.8, skpdCount: 12600 },
  { month: "Okt", penetapan2025: 33.0, penetapan2026: 36.2, skpdCount: 12200 },
  { month: "Nov", penetapan2025: 31.8, penetapan2026: 34.9, skpdCount: 11900 },
  { month: "Des", penetapan2025: 35.0, penetapan2026: 38.0, skpdCount: 12800 },
];

// Mock Target vs Realisasi Penetapan Data (BR-05 Metrik 1: Bullet / Bar Chart)
const targetVsRealisasiData = [
  { sektor: "PBB-P2", targetAPBD: 120.0, realisasiPenetapan: 112.5, persen: 93.8 },
  { sektor: "PBJT Makanan", targetAPBD: 95.0, realisasiPenetapan: 88.4, persen: 93.1 },
  { sektor: "PBJT Hotel", targetAPBD: 55.0, realisasiPenetapan: 52.1, persen: 94.7 },
  { sektor: "PBJT PPJ", targetAPBD: 35.0, realisasiPenetapan: 32.8, persen: 93.7 },
  { sektor: "BPHTB", targetAPBD: 90.0, realisasiPenetapan: 88.7, persen: 98.5 },
  { sektor: "Reklame", targetAPBD: 18.0, realisasiPenetapan: 16.4, persen: 91.1 },
  { sektor: "Air Tanah", targetAPBD: 8.0, realisasiPenetapan: 7.2, persen: 90.0 },
];

// Mock Record Table for SKPD Penetapan
const mockPenetapanRecords = [
  {
    id: "SKP-2026-001",
    noSKPD: "SKPD/2026/PBB/008921",
    npwpd: "P.3.0041209.08.22",
    namaWajibPajak: "Gedung Plaza Malioboro Utama",
    sektor: "PBB-P2",
    jenisDokumen: "SKPD Jabatan",
    nilaiMasa: "Rp 1.450.000.000",
    tglPenetapan: "24 Jul 2026",
    jatuhTempo: "31 Agu 2026",
    status: "Ditetapkan",
    kecamatan: "Gondomanan",
  },
  {
    id: "SKP-2026-002",
    noSKPD: "SKPD/2026/PBJT/004312",
    npwpd: "P.2.0034821.04.12",
    namaWajibPajak: "PT Kuliner Rasa Jogja",
    sektor: "PBJT Makanan & Minuman",
    jenisDokumen: "SPTPD Self Assessment",
    nilaiMasa: "Rp 325.400.000",
    tglPenetapan: "22 Jul 2026",
    jatuhTempo: "15 Agu 2026",
    status: "Ditetapkan",
    kecamatan: "Danurejan",
  },
  {
    id: "SKP-2026-003",
    noSKPD: "SKPD/2026/BPHTB/001209",
    npwpd: "P.1.0019230.01.15",
    namaWajibPajak: "CV Ambarrukmo Hotel Branch",
    sektor: "BPHTB",
    jenisDokumen: "SKPDKB Kurang Bayar",
    nilaiMasa: "Rp 890.000.000",
    tglPenetapan: "20 Jul 2026",
    jatuhTempo: "20 Agu 2026",
    status: "Proses Verifikasi",
    kecamatan: "Gondokusuman",
  },
  {
    id: "SKP-2026-004",
    noSKPD: "SKPD/2026/PBJT/008819",
    npwpd: "P.2.0091204.05.18",
    namaWajibPajak: "Billboard Simpang Tugu Jogja",
    sektor: "Pajak Reklame",
    jenisDokumen: "SKPD Jabatan",
    nilaiMasa: "Rp 185.000.000",
    tglPenetapan: "18 Jul 2026",
    jatuhTempo: "18 Agu 2026",
    status: "Ditetapkan",
    kecamatan: "Jetis",
  },
  {
    id: "SKP-2026-005",
    noSKPD: "SKPD/2026/PAT/000412",
    npwpd: "P.5.0012941.02.10",
    namaWajibPajak: "Hotel Tentrem Spa & Pool",
    sektor: "Pajak Air Tanah",
    jenisDokumen: "SKPD Jabatan",
    nilaiMasa: "Rp 42.800.000",
    tglPenetapan: "15 Jul 2026",
    jatuhTempo: "15 Agu 2026",
    status: "Ditetapkan",
    kecamatan: "Jetis",
  },
];

export function AssessmentDashboardPage() {
  const { toast } = useToastApp();

  // Detail Modal Dialog State
  const [selectedRecord, setSelectedRecord] = React.useState<typeof mockPenetapanRecords[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Active Filter state
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Direset", {
      description: "Semua kriteria filter penetapan telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Penetapan Diexport", {
      description: "Berkas PDF/XLSX Rekapitulasi SKPD & Nilai Ketetapan Pajak BR-05 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockPenetapanRecords[0]) => {
    setSelectedRecord(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for DataTableApp
  const tableColumns = [
    {
      accessorKey: "noSKPD",
      header: "No. SKPD / Dokumen",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.noSKPD}
          </div>
          <div className="text-[10px] text-ink-secondary">NPWPD: {row.original.npwpd}</div>
        </div>
      ),
    },
    {
      accessorKey: "namaWajibPajak",
      header: "Wajib Pajak / Subjek",
      cell: ({ row }: any) => (
        <div className="font-medium text-ink-primary text-xs">
          {row.original.namaWajibPajak}
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-skp-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "jenisDokumen",
      header: "Jenis SKP",
      cell: ({ row }: any) => (
        <span className="text-xs text-ink-secondary font-medium">
          {row.original.jenisDokumen}
        </span>
      ),
    },
    {
      accessorKey: "nilaiMasa",
      header: "Nilai Ketetapan",
      cell: ({ row }: any) => (
        <div className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
          {row.original.nilaiMasa}
        </div>
      ),
    },
    {
      accessorKey: "tglPenetapan",
      header: "Tgl Penetapan",
      cell: ({ row }: any) => (
        <div className="text-xs font-mono text-ink-secondary">{row.original.tglPenetapan}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status SKPD",
      cell: ({ row }: any) => {
        const val = row.original.status;
        let badgeVariant: any = "solidEmerald";
        if (val === "Ditetapkan") badgeVariant = "solidEmerald";
        if (val === "Proses Verifikasi") badgeVariant = "blue";

        return <BadgeApp id={`badge-status-skp-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-skp-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenDetailModal(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Detail
        </ButtonApp>
      ),
    },
  ];

  return (
    <div id="penetapan-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br05" variant="solidPurple" size="sm">
              BR-05 Dashboard Penetapan
            </BadgeApp>
            <BadgeApp id="hdr-badge-skpd" variant="solidAmber" size="sm">
              <FileText className="w-3 h-3 mr-1 inline" />
              SKPD & Ketetapan Pajak Daerah
            </BadgeApp>
            <BadgeApp id="hdr-badge-tahun- penetapan" variant="solidEmerald" size="sm">
              Tahun Anggaran 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-penetapan" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Penetapan Pajak Daerah
          </TextApp>
          <TextApp id="hdr-sub-penetapan" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring Jumlah SKPD, Nilai Ketetapan, PBB-P2, PBJT, BPHTB, serta Ketetapan Harian & Bulanan
          </TextApp>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-penetapan-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Penetapan Disinkronisasi", {
                description: "Database SKPD & Ketetapan Pajak Daerah telah diperbarui secara terpadu.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </ButtonApp>

          <ButtonApp
            id="btn-export-penetapan-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Penetapan
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-penetapan-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-penetapan-skpd"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Penetapan"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Penetapan SKPD & Sektor Pajak"
          fields={penetapanFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Penetapan Berhasil Diterapkan", {
              description: "Menampilkan data ketetapan berdasarkan kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-05 Items 1 to 5)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Remainder default white. Clean titles without numbers.        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. Jumlah SKPD - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-skpd"
            variant="clayPurple"
            title="Jumlah SKPD"
            value="142.850"
            unit="Dokumen SKPD Diterbitkan"
            description="Total Surat Ketetapan Pajak Daerah TA 2026"
            badge="Tahun 2026"
            trend={{
              value: "+8.5%",
              label: "Vol. SKPD YoY",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileText className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah seluruh dokumen SKPD, SPTPD, dan SKPDKB yang diterbitkan dalam TA 2026."
          />
        </div>

        {/* 2. Nilai Ketetapan - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-nilai-ketetapan"
            variant="clayBlue"
            title="Nilai Ketetapan"
            value="Rp 385,4 M"
            unit="Total Pokok Ketetapan"
            description="Nominal Keseluruhan Ketetapan Pajak"
            badge="Tahun 2026"
            trend={{
              value: "+11.2%",
              label: "Nilai Ketetapan YoY",
              isPositive: true,
              direction: "up",
            }}
            icon={<DollarSign className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Total nominal rupiah dari seluruh SKPD dan ketetapan resmi yang telah ditetapkan."
          />
        </div>

        {/* 3. PBB - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-pbb-ketetapan"
            variant="clayYellow"
            title="PBB-P2"
            value="Rp 112,5 M"
            unit="Ketetapan PBB-P2"
            description="102.400 NOP PBB Terbit SPPT"
            badge="PBB-P2 2026"
            trend={{
              value: "+5.4%",
              label: "Ketetapan PBB",
              isPositive: true,
              direction: "up",
            }}
            icon={<Landmark className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Ketetapan Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBB-P2) TA 2026."
          />
        </div>

        {/* 4. PBJT - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-pbjt-ketetapan"
            variant="default"
            title="PBJT"
            value="Rp 184,2 M"
            unit="Ketetapan PBJT Terpadu"
            description="Makanan/Minuman, Hotel, Hiburan, Parkir, & PPJ"
            badge="PBJT Self & Official"
            trend={{
              value: "+14.1%",
              label: "Ketetapan PBJT",
              isPositive: true,
              direction: "up",
            }}
            icon={<UtensilsCrossed className="w-5 h-5 text-purple-600" />}
            infoTooltip="Nilai ketetapan Pajak Barang dan Jasa Pertentu (PBJT) gabungan seluruh sektor usaha."
          />
        </div>

        {/* 5. BPHTB - Default White */}
        <div className="col-span-1 flex flex-col h-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <ScorecardApp
            id="card-bphtb-ketetapan"
            variant="default"
            title="BPHTB"
            value="Rp 88,7 M"
            unit="Ketetapan BPHTB Transaksi"
            description="Bea Perolehan Hak atas Tanah dan Bangunan"
            badge="BPHTB 2026"
            trend={{
              value: "+9.8%",
              label: "Ketetapan BPHTB",
              isPositive: true,
              direction: "up",
            }}
            icon={<Home className="w-5 h-5 text-emerald-600" />}
            infoTooltip="Ketetapan Bea Perolehan Hak atas Tanah dan Bangunan dari transaksi peralihan hak."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION 1: KETETAPAN HARIAN & KETETAPAN BULANAN         */}
      {/* (BR-05 Visualisasi Items 6 & 7)                                */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Item 6: Ketetapan Harian (Line Chart) */}
        <CardApp id="card-chart-ketetapan-harian" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <TextApp id="title-chart-harian" variant="h4" weight="bold" className="text-ink-primary">
                Ketetapan Harian
              </TextApp>
              <BadgeApp id="badge-chart-harian" variant="solidPurple" size="sm">Bulan Juli 2026</BadgeApp>
            </div>
            <TextApp id="sub-chart-harian" variant="caption" className="text-ink-secondary mb-4">
              Fluktuasi Nominal Ketetapan Harian (Miliar Rp) & Volume SKPD
            </TextApp>
          </div>

          <div className="h-[300px] w-full">
            <ChartApp
              id="chart-ketetapan-harian"
              type="line"
              data={dailyPenetapanData}
              xKey="day"
              series={[
                { key: "nilaiMiliar", label: "Nilai Ketetapan (Miliar Rp)", color: "#7e22ce" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Item 7 & Metrik 2: Ketetapan Bulanan & Tren Penetapan (Line Chart) */}
        <CardApp id="card-chart-ketetapan-bulanan" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <TextApp id="title-chart-bulanan" variant="h4" weight="bold" className="text-ink-primary">
                Ketetapan Bulanan & Tren Penetapan
              </TextApp>
              <BadgeApp id="badge-chart-bulanan" variant="solidAmber" size="sm">Perbandingan YoY</BadgeApp>
            </div>
            <TextApp id="sub-chart-bulanan" variant="caption" className="text-ink-secondary mb-4">
              Tren Akumulasi Penetapan per Bulan: TA 2026 vs TA 2025 (Miliar Rp)
            </TextApp>
          </div>

          <div className="h-[300px] w-full">
            <ChartApp
              id="chart-ketetapan-bulanan"
              type="line"
              data={monthlyPenetapanData}
              xKey="month"
              series={[
                { key: "penetapan2026", label: "Penetapan 2026 (Miliar)", color: "#7e22ce" },
                { key: "penetapan2025", label: "Penetapan 2025 (Miliar)", color: "#2563eb" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION 2: TARGET VS REALISASI PENETAPAN               */}
      {/* (BR-05 Metrik 1: Bullet / Bar Chart)                           */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-chart-target-vs-realisasi" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-target-realisasi" variant="solidPurple" size="sm">Metrik Penetapan</BadgeApp>
              <BadgeApp id="badge-apbd-2026" variant="solidAmber" size="sm">Target APBD 2026</BadgeApp>
            </div>
            <TextApp id="title-chart-target" variant="h3" weight="bold" className="text-ink-primary">
              Target APBD vs Realisasi Nilai Ketetapan
            </TextApp>
            <TextApp id="sub-chart-target" variant="caption" className="text-ink-secondary">
              Perbandingan Target Anggaran Penetapan vs Nilai Ketetapan Terbit per Sektor Pajak (Miliar Rp)
            </TextApp>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ChartApp
            id="chart-bar-target-vs-realisasi"
            type="bar"
            data={targetVsRealisasiData}
            xKey="sektor"
            barSize={22}
            series={[
              { key: "targetAPBD", label: "Target APBD (Miliar)", color: "#94a3b8" },
              { key: "realisasiPenetapan", label: "Nilai Ketetapan (Miliar)", color: "#7e22ce" },
            ]}
            showGrid={true}
            showTooltip={true}
            showLegend={true}
          />
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE REKAPITULASI PENETAPAN SKPD                        */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-penetapan-records" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-penetapan" variant="solidPurple" size="sm">Data SKPD & Ketetapan</BadgeApp>
              <BadgeApp id="badge-tbl-recent-skp" variant="solidAmber" size="sm">Penetapan Terbaru</BadgeApp>
            </div>
            <TextApp id="title-tbl-skp" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Ketetapan Pajak Daerah & Surat Ketetapan (SKPD)
            </TextApp>
            <TextApp id="sub-tbl-skp" variant="caption" className="text-ink-secondary">
              Rekapitulasi Dokumen SKPD Jabatan, SPTPD Self Assessment, & SKPDKB Kurang Bayar
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-penetapan-records"
          data={mockPenetapanRecords}
          columns={tableColumns}
          searchPlaceholder="Cari No. SKPD, NPWPD, Wajib Pajak, atau Sektor..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL (Portalled by DialogApp)                   */}
      {/* ------------------------------------------------------------- */}
      {selectedRecord && (
        <DialogApp
          id="dialog-detail-penetapan-skp"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail SKPD: ${selectedRecord.noSKPD}`}
          description="Rincian penetapan pajak daerah dan jadwal jatuh tempo pembayaran."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">No. SKPD Dokumen:</span>
                <span className="font-mono font-bold text-vibrant-purple">{selectedRecord.noSKPD}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Nama Wajib Pajak:</span>
                <span className="font-bold text-ink-primary">{selectedRecord.namaWajibPajak}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor Pajak:</span>
                <BadgeApp id="badge-dlg-sektor-skp" variant="solidAmber" size="sm">{selectedRecord.sektor}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Nilai Ketetapan:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{selectedRecord.nilaiMasa}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Informasi Tanggal & Status Dokumen</span>
              </div>
              <p className="text-ink-secondary">
                Jenis Dokumen: <span className="text-ink-primary font-medium">{selectedRecord.jenisDokumen}</span>
              </p>
              <p className="text-ink-secondary">
                Tanggal Penetapan: <span className="text-ink-primary font-medium">{selectedRecord.tglPenetapan}</span> | Jatuh Tempo: <span className="text-rose-600 font-medium">{selectedRecord.jatuhTempo}</span>
              </p>
              <p className="text-ink-secondary">
                Status Dokumen: <BadgeApp id="badge-dlg-status-skp" variant="solidEmerald" size="sm">{selectedRecord.status}</BadgeApp>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-penetapan-dialog"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Tutup Detail
              </ButtonApp>
            </div>
          </div>
        </DialogApp>
      )}
    </div>
  );
}

export default AssessmentDashboardPage;
