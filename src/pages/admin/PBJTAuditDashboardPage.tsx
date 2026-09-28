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
  SearchCheck,
  FileCheck2,
  FileMinus2,
  Hourglass,
  DollarSign,
  TrendingUp,
  Percent,
  AlertCircle,
  RefreshCw,
  Download,
  Eye,
  Utensils,
  Hotel,
  Car,
  Tv,
  Zap,
  Layers,
  Sparkles,
} from "lucide-react";

// Filter Field Configuration for BR-13 Pemeriksaan PBJT
const pbjtAuditFilterFields = [
  {
    id: "jenisPBJT",
    label: "Jenis PBJT (Barang & Jasa Tertentu)",
    type: "select" as const,
    placeholder: "Pilih Jenis PBJT...",
    options: [
      { value: "all", label: "Seluruh PBJT (Semua Subjek)" },
      { value: "pbjt_makanan", label: "PBJT Makanan dan/atau Minuman" },
      { value: "pbjt_hotel", label: "PBJT Jasa Perhotelan" },
      { value: "pbjt_parkir", label: "PBJT Jasa Parkir" },
      { value: "pbjt_hiburan", label: "PBJT Jasa Kesenian & Hiburan" },
      { value: "pbjt_listrik", label: "PBJT Tenaga Listrik" },
    ],
  },
  {
    id: "hasilPemeriksaan",
    label: "Hasil Audit / SKPKB",
    type: "select" as const,
    placeholder: "Semua Hasil...",
    options: [
      { value: "all", label: "Semua Hasil Pemeriksaan" },
      { value: "kurang_bayar", label: "Kurang Bayar (SKPKB Terbit)" },
      { value: "nihil", label: "Nihil (SKPN Terbit / Sesuai)" },
      { value: "in_progress", label: "Dalam Proses Audit Uji Petik" },
    ],
  },
  {
    id: "tahunPemeriksaan",
    label: "Tahun Audit",
    type: "select" as const,
    placeholder: "Pilih Tahun...",
    options: [
      { value: "2026", label: "Tahun Pemeriksaan 2026" },
      { value: "2025", label: "Tahun Pemeriksaan 2025" },
      { value: "2024", label: "Tahun Pemeriksaan 2024" },
    ],
  },
  {
    id: "timPemeriksa",
    label: "Tim Fungsional Pemeriksa",
    type: "select" as const,
    placeholder: "Pilih Tim...",
    options: [
      { value: "all", label: "Semua Tim Pemeriksa" },
      { value: "tim_1", label: "Tim Audit PBJT Resto & Culinary" },
      { value: "tim_2", label: "Tim Audit Perhotelan & Hospitality" },
      { value: "tim_3", label: "Tim Audit Parkir & Hiburan" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Audit PBJT 2026", values: { tahunPemeriksaan: "2026", jenisPBJT: "all" } },
  { label: "Hasil Kurang Bayar (SKPKB)", values: { hasilPemeriksaan: "kurang_bayar" } },
  { label: "Pemeriksaan PBJT Makanan", values: { jenisPBJT: "pbjt_makanan" } },
  { label: "Audit Hotel Dalam Proses", values: { jenisPBJT: "pbjt_hotel", hasilPemeriksaan: "in_progress" } },
];

// Helper Formatter
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

// Item 10 Chart Data: Grafik Hasil Pemeriksaan (Bar Chart: Kurang Bayar vs Nihil vs Dalam Proses per Jenis PBJT)
const chartDataHasilPemeriksaan = [
  { jenis: "PBJT Makanan", kurangBayar: 210, nihil: 145, inProgress: 45, totalWP: 400 },
  { jenis: "PBJT Hotel", kurangBayar: 125, nihil: 85, inProgress: 30, totalWP: 240 },
  { jenis: "PBJT Parkir", kurangBayar: 95, nihil: 60, inProgress: 20, totalWP: 175 },
  { jenis: "PBJT Hiburan", kurangBayar: 65, nihil: 40, inProgress: 15, totalWP: 120 },
  { jenis: "PBJT Listrik", kurangBayar: 25, nihil: 35, inProgress: 5, totalWP: 65 },
];

// Item 11 Chart Data: Sebaran Pemeriksaan Berdasarkan Jenis PBJT (Pie / Bar Chart Data)
const chartDataSebaranPBJT = [
  { name: "PBJT Makanan & Minuman", totalAudit: 400, porsi: "40.0%", color: "#7e22ce" },
  { name: "PBJT Jasa Perhotelan", totalAudit: 240, porsi: "24.0%", color: "#2563eb" },
  { name: "PBJT Jasa Parkir", totalAudit: 175, porsi: "17.5%", color: "#059669" },
  { name: "PBJT Kesenian & Hiburan", totalAudit: 120, porsi: "12.0%", color: "#f59e0b" },
  { name: "PBJT Tenaga Listrik", totalAudit: 65, porsi: "6.5%", color: "#dc2626" },
];

// Item 9 Data Progres Pemeriksaan per Sektor PBJT
const progressDataAudit = [
  {
    jenis: "PBJT Makanan & Minuman",
    icon: Utensils,
    totalTarget: 450,
    selesai: 355,
    inProgress: 45,
    pending: 50,
    percent: 78.8,
  },
  {
    jenis: "PBJT Jasa Perhotelan",
    icon: Hotel,
    totalTarget: 270,
    selesai: 210,
    inProgress: 30,
    pending: 30,
    percent: 77.8,
  },
  {
    jenis: "PBJT Jasa Parkir",
    icon: Car,
    totalTarget: 200,
    selesai: 155,
    inProgress: 20,
    pending: 25,
    percent: 77.5,
  },
  {
    jenis: "PBJT Kesenian & Hiburan",
    icon: Tv,
    totalTarget: 140,
    selesai: 105,
    inProgress: 15,
    pending: 20,
    percent: 75.0,
  },
  {
    jenis: "PBJT Tenaga Listrik",
    icon: Zap,
    totalTarget: 70,
    selesai: 60,
    inProgress: 5,
    pending: 5,
    percent: 85.7,
  },
];

// Master Table Data: Detail Berkas Examination PBJT
const mockAuditPBJTList = [
  {
    id: "AUD-PBJT-2026-001",
    namaWP: "Resto Malioboro Heritage",
    npwpd: "P.2.0084120.04.12",
    jenisPBJT: "PBJT Makanan & Minuman",
    hasil: "Kurang Bayar",
    pokok: 125000000,
    bunga: 15000000,
    denda: 25000000,
    totalKekurangan: 165000000,
    statusSK: "SKPKB Diterbitkan",
    noLHP: "LHP/PBJT/2026/012",
    tglSelesai: "18 Jul 2026",
  },
  {
    id: "AUD-PBJT-2026-002",
    namaWP: "Grand Palace Hotel Jogja",
    npwpd: "P.2.0019284.02.10",
    jenisPBJT: "PBJT Jasa Perhotelan",
    hasil: "Kurang Bayar",
    pokok: 340000000,
    bunga: 40800000,
    denda: 68000000,
    totalKekurangan: 448800000,
    statusSK: "SKPKB Diterbitkan",
    noLHP: "LHP/PBJT/2026/015",
    tglSelesai: "20 Jul 2026",
  },
  {
    id: "AUD-PBJT-2026-003",
    namaWP: "Jaya Parkir Tugu Center",
    npwpd: "P.2.0033102.08.05",
    jenisPBJT: "PBJT Jasa Parkir",
    hasil: "Nihil",
    pokok: 0,
    bunga: 0,
    denda: 0,
    totalKekurangan: 0,
    statusSK: "SKPN Diterbitkan",
    noLHP: "LHP/PBJT/2026/018",
    tglSelesai: "22 Jul 2026",
  },
  {
    id: "AUD-PBJT-2026-004",
    namaWP: "Cinema XXI Malioboro",
    npwpd: "P.2.0055190.11.02",
    jenisPBJT: "PBJT Kesenian & Hiburan",
    hasil: "Dalam Proses",
    pokok: 0,
    bunga: 0,
    denda: 0,
    totalKekurangan: 0,
    statusSK: "Uji Petik Lapangan",
    noLHP: "-",
    tglSelesai: "Target 10 Aug 2026",
  },
  {
    id: "AUD-PBJT-2026-005",
    namaWP: "PLN Area Kota Jogja (PJJ)",
    npwpd: "P.2.0001002.01.01",
    jenisPBJT: "PBJT Tenaga Listrik",
    hasil: "Nihil",
    pokok: 0,
    bunga: 0,
    denda: 0,
    totalKekurangan: 0,
    statusSK: "SKPN Diterbitkan",
    noLHP: "LHP/PBJT/2026/008",
    tglSelesai: "12 Jul 2026",
  },
];

export function PBJTAuditDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal State
  const [selectedAuditItem, setSelectedAuditItem] = React.useState<typeof mockAuditPBJTList[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Audit PBJT Direset", {
      description: "Semua kriteria filter pemeriksaan PBJT telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Audit PBJT Diexport", {
      description: "Berkas PDF/XLSX Laporan Pemeriksaan & SKPKB PBJT BR-13 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockAuditPBJTList[0]) => {
    setSelectedAuditItem(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for Master Table PBJT Examination
  const auditColumns = [
    {
      accessorKey: "id",
      header: "Ref LHP / Audit",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.id}
          </div>
          <div className="text-[10px] text-ink-secondary">LHP: {row.original.noLHP}</div>
        </div>
      ),
    },
    {
      accessorKey: "namaWP",
      header: "Wajib Pajak & NPWPD",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.namaWP}</div>
          <div className="text-[10px] text-ink-secondary font-mono">{row.original.npwpd}</div>
        </div>
      ),
    },
    {
      accessorKey: "jenisPBJT",
      header: "Jenis PBJT",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-jenis-pbjt-${row.original.id}`} variant="solidPurple" size="sm">
          {row.original.jenisPBJT}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "hasil",
      header: "Hasil Audit",
      cell: ({ row }: any) => {
        const val = row.original.hasil;
        let badgeVariant: any = "solidEmerald";
        if (val === "Kurang Bayar") badgeVariant = "solidRose";
        if (val === "Nihil") badgeVariant = "solidEmerald";
        if (val === "Dalam Proses") badgeVariant = "solidAmber";

        return <BadgeApp id={`badge-hasil-pbjt-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "totalKekurangan",
      header: "Kekurangan PBJT (SKPKB)",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-ink-primary">
            {formatCurrency(row.original.totalKekurangan)}
          </div>
          <div className="text-[10px] text-ink-secondary font-mono">
            Pokok: {formatCurrency(row.original.pokok)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "statusSK",
      header: "Status Surat Ketetapan",
      cell: ({ row }: any) => (
        <div>
          <span className="font-mono text-xs text-ink-primary font-medium">{row.original.statusSK}</span>
          <div className="text-[10px] text-ink-secondary">{row.original.tglSelesai}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-pbjt-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenDetailModal(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Rincian
        </ButtonApp>
      ),
    },
  ];

  return (
    <div id="pbjt-audit-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br13" variant="solidPurple" size="sm">
              BR-13 Dashboard Pemeriksaan PBJT
            </BadgeApp>
            <BadgeApp id="hdr-badge-audit-pbjt" variant="solidAmber" size="sm">
              <SearchCheck className="w-3 h-3 mr-1 inline" />
              Audit PBJT & SKPKB
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-pbjt" variant="solidEmerald" size="sm">
              Progres Audit 78.5%
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-pbjt" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Pemeriksaan PBJT (Pajak Barang & Jasa Tertentu)
          </TextApp>
          <TextApp id="hdr-sub-pbjt" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring Audit PBJT Makanan, Hotel, Parkir, Hiburan, & Listrik: Hasil Kurang Bayar, Nihil, Pokok, Bunga, Denda, Progres, & Sebaran
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-pbjt-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Audit PBJT Dibarui", {
                description: "Hasil LHP, Pokok, Bunga, & Denda pemeriksaan PBJT telah disinkronkan secara live.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync LHP
          </ButtonApp>

          <ButtonApp
            id="btn-export-pbjt-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Audit PBJT
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-pbjt-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-pemeriksaan-pbjt"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Audit PBJT"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Pemeriksaan & Hasil Audit PBJT"
          fields={pbjtAuditFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Audit PBJT Diterapkan", {
              description: "Menampilkan analisis pemeriksaan PBJT sesuai parameter yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-13 Items 1 to 8)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Bottom 5 default white cards. Clean titles without numbers.   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. Total WP yang diperiksa - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-total-wp"
            variant="clayPurple"
            title="Total WP yang diperiksa"
            value="1.000 WP"
            unit="Seluruh 5 Sektor PBJT"
            description="885 Selesai LHP, 115 Dalam Proses Audit"
            badge="Total Audit WP"
            trend={{
              value: "+15.2%",
              label: "Kenaikan Objek Audit",
              isPositive: true,
              direction: "up",
            }}
            icon={<SearchCheck className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah seluruh Wajib Pajak PBJT yang masuk dalam Surat Perintah Pemeriksaan (SPP)."
          />
        </div>

        {/* 2. Total WP hasil Nihil - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-nihil"
            variant="clayBlue"
            title="Total WP hasil Nihil"
            value="365 WP"
            unit="SKPN (36.5% Compliance Rate)"
            description="Pelaporan Omzet Sesuai Hasil Uji Petik"
            badge="SKPN Compliant"
            trend={{
              value: "+5.1%",
              label: "WP Taat Omzet",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileCheck2 className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah Wajib Pajak yang hasil pemeriksaannya sesuai dengan pelaporan Omzet (Nihil)."
          />
        </div>

        {/* 3. Total WP hasil Kurang Bayar - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-kurang-bayar"
            variant="clayYellow"
            title="Total WP hasil Kurang Bayar"
            value="520 WP"
            unit="SKPKB (52.0% Temuan Under-report)"
            description="Ditemukan Selisih Omzet Hasil Sampling"
            badge="SKPKB Finding"
            trend={{
              value: "+8.4%",
              label: "Temuan Kurang Bayar",
              isPositive: false,
              direction: "up",
            }}
            icon={<AlertCircle className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Jumlah Wajib Pajak yang terbukti melakukan under-reporting omzet dan diterbitkan SKPKB."
          />
        </div>

        {/* 4. Total WP belum selesai diperiksa - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-belum-selesai"
            variant="default"
            title="Total WP belum selesai diperiksa"
            value="115 WP"
            unit="On-going Field Check (11.5%)"
            description="Target Penyelesaian LHP Akhir Bulan Ini"
            badge="Audit In-Progress"
            trend={{
              value: "-3.2%",
              label: "Penyelesaian LHP",
              isPositive: true,
              direction: "down",
            }}
            icon={<Hourglass className="w-5 h-5 text-purple-600" />}
            infoTooltip="Jumlah Wajib Pajak yang saat ini masih dalam proses pemeriksaan/uji petik teknis."
          />
        </div>

        {/* 5. Total Pokok PBJT Kurang bayar - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-pokok"
            variant="default"
            title="Total Pokok PBJT Kurang bayar"
            value="Rp 12,85 M"
            unit="Pokok Pajak Hasil Audit"
            description="PBJT Makanan & Hotel Menyumbang 72%"
            badge="Pokok SKPKB"
            trend={{
              value: "+18.2%",
              label: "Peningkatan Temuan Pokok",
              isPositive: true,
              direction: "up",
            }}
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            infoTooltip="Total nilai rupiah pokok kekurangan PBJT yang ditemukan dari hasil pemeriksaan LHP."
          />
        </div>

        {/* 6. Total Bunga hasil pemeriksaan - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-bunga"
            variant="default"
            title="Total Bunga hasil pemeriksaan"
            value="Rp 1,54 M"
            unit="Bunga Sanksi Keterlambatan 2%/Bln"
            description="Sesuai Ketentuan UU HKPD / Perda Tax"
            badge="Bunga Sanksi"
            trend={{
              value: "+12.1%",
              label: "Sanksi Bunga",
              isPositive: true,
              direction: "up",
            }}
            icon={<Percent className="w-5 h-5 text-amber-600" />}
            infoTooltip="Total akumulasi nilai sanksi bunga atas keterlambatan/pembayaran kurang bayar PBJT."
          />
        </div>

        {/* 7. Total Denda hasil pemeriksaan - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pbjt-denda"
            variant="default"
            title="Total Denda hasil pemeriksaan"
            value="Rp 2,57 M"
            unit="Sanksi Denda Administrasi LHP"
            description="Sanksi Tidak Melaporkan SPTPD Tepat Waktu"
            badge="Denda Sanksi"
            trend={{
              value: "+14.5%",
              label: "Sanksi Denda",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileMinus2 className="w-5 h-5 text-rose-600" />}
            infoTooltip="Total nilai sanksi denda administrasi dari pemeriksaan seluruh jenis PBJT."
          />
        </div>

        {/* 8. Total Kekurangan PBJT yang Harus dibayar - Default White (Wide 2 Col if needed or 1 col) */}
        <div className="col-span-1 flex flex-col h-full sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <ScorecardApp
            id="card-score-pbjt-total-kekurangan"
            variant="default"
            title="Total Kekurangan PBJT Harus Dibayar"
            value="Rp 16,96 M"
            unit="Pokok + Bunga + Denda SKPKB"
            description="Potensi Penerimaan Tambahan Hasil Audit"
            badge="Total SKPKB Net"
            trend={{
              value: "+16.8%",
              label: "Total Tagihan SKPKB",
              isPositive: true,
              direction: "up",
            }}
            icon={<TrendingUp className="w-5 h-5 text-vibrant-purple" />}
            infoTooltip="Jumlah total tagihan SKPKB (Pokok + Bunga + Denda) yang harus dilunasi oleh Wajib Pajak."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ITEM 9: PROGRES PEMERIKSAAN PROGRESS CARDS & METRICS          */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-pbjt-progres-pemeriksaan" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-p9-progres" variant="solidPurple" size="sm">Item 9 Progres Audit</BadgeApp>
              <BadgeApp id="badge-p9-compliance" variant="solidEmerald" size="sm">Overall: 78.5% Completed</BadgeApp>
            </div>
            <TextApp id="title-p9-progres" variant="h3" weight="bold" className="text-ink-primary">
              Progres Pemeriksaan Per Sektor PBJT
            </TextApp>
            <TextApp id="sub-p9-progres" variant="caption" className="text-ink-secondary">
              Realisasi Penyelesaian Audit Lapangan vs Target Surat Perintah Pemeriksaan (SPP)
            </TextApp>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressDataAudit.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-hairline-soft bg-surface-subtle hover:bg-surface-hover transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-vibrant-purple/10 text-vibrant-purple">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-ink-primary">{item.jenis}</span>
                  </div>
                  <BadgeApp id={`badge-p9-percent-${idx}`} variant="solidEmerald" size="sm">
                    {item.percent}%
                  </BadgeApp>
                </div>

                {/* Custom Styled Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-hairline-soft rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-vibrant-purple h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-secondary font-mono">
                    <span>Selesai: {item.selesai} WP</span>
                    <span>Target: {item.totalTarget} WP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-hairline-soft">
                  <div className="text-amber-700 dark:text-amber-400 font-medium">
                    Proses: {item.inProgress} WP
                  </div>
                  <div className="text-ink-secondary text-right">
                    Pending: {item.pending} WP
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* ITEMS 10 & 11: CHARTS SECTION (GRAFIK HASIL & SEBARAN PBJT)   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Item 10: Grafik Hasil Pemeriksaan (Bar / Column Chart) */}
        <CardApp id="card-chart-grafik-hasil-pbjt" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p10" variant="solidPurple" size="sm">Item 10 Hasil Audit</BadgeApp>
              <BadgeApp id="badge-chart-p10-total" variant="solidAmber" size="sm">520 Kurang Bayar vs 365 Nihil</BadgeApp>
            </div>
            <TextApp id="title-chart-p10" variant="h3" weight="bold" className="text-ink-primary">
              Grafik Hasil Pemeriksaan per Jenis PBJT
            </TextApp>
            <TextApp id="sub-chart-p10" variant="caption" className="text-ink-secondary mb-4">
              Perbandingan WP Kurang Bayar (SKPKB), Nihil (SKPN), & Dalam Proses
            </TextApp>
          </div>

          <div className="h-[260px] w-full">
            <ChartApp
              id="chart-bar-grafik-hasil-pbjt"
              type="bar"
              data={chartDataHasilPemeriksaan}
              xKey="jenis"
              barSize={18}
              series={[
                { key: "kurangBayar", label: "Kurang Bayar (SKPKB)", color: "#dc2626" },
                { key: "nihil", label: "Nihil (SKPN)", color: "#059669" },
                { key: "inProgress", label: "Dalam Proses", color: "#f59e0b" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Item 11: Sebaran Pemeriksaan berdasarkan jenis PBJT (Pie / Bar Chart) */}
        <CardApp id="card-chart-sebaran-pbjt" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p11" variant="solidAmber" size="sm">Item 11 Sebaran PBJT</BadgeApp>
              <BadgeApp id="badge-chart-p11-total" variant="solidPurple" size="sm">Total: 1.000 WP</BadgeApp>
            </div>
            <TextApp id="title-chart-p11" variant="h3" weight="bold" className="text-ink-primary">
              Sebaran Pemeriksaan berdasarkan Jenis PBJT
            </TextApp>
            <TextApp id="sub-chart-p11" variant="caption" className="text-ink-secondary mb-4">
              Proporsi Berkas Audit Lapangan per Sektor Barang & Jasa Tertentu
            </TextApp>
          </div>

          <div className="h-[260px] w-full">
            <ChartApp
              id="chart-bar-sebaran-pbjt"
              type="bar"
              data={chartDataSebaranPBJT}
              xKey="name"
              barSize={20}
              series={[
                { key: "totalAudit", label: "Jumlah Berkas Audit", color: "#7e22ce" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE: MASTER LIST BERKAS PEMERIKSAAN PBJT               */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-audit-pbjt" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-pbjt" variant="solidPurple" size="sm">Master Table Audit PBJT</BadgeApp>
              <BadgeApp id="badge-tbl-pbjt-lhp" variant="solidAmber" size="sm">SKPKB & LHP Verifier</BadgeApp>
            </div>
            <TextApp id="title-tbl-pbjt" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Pemeriksaan Wajib Pajak PBJT Real-Time
            </TextApp>
            <TextApp id="sub-tbl-pbjt" variant="caption" className="text-ink-secondary">
              Daftar LHP, Pokok Kekurangan, Bunga, Denda, & Penerbitan Surat Ketetapan Pajak Kurang Bayar (SKPKB)
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-audit-pbjt"
          data={mockAuditPBJTList}
          columns={auditColumns}
          searchPlaceholder="Cari Ref Audit, Wajib Pajak, NPWPD, Jenis PBJT, atau Status..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {selectedAuditItem && (
        <DialogApp
          id="dialog-detail-audit-pbjt"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail LHP Audit: ${selectedAuditItem.id}`}
          description="Informasi hasil uji petik, rincian pokok, sanksi bunga, denda, dan SKPKB."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Wajib Pajak:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedAuditItem.namaWP}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">NPWPD:</span>
                <span className="font-mono font-medium text-vibrant-purple">{selectedAuditItem.npwpd}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Jenis PBJT:</span>
                <BadgeApp id="badge-dlg-jenis-pbjt" variant="solidPurple" size="sm">{selectedAuditItem.jenisPBJT}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Hasil Pemeriksaan:</span>
                <BadgeApp id="badge-dlg-hasil-pbjt" variant="solidRose" size="sm">{selectedAuditItem.hasil}</BadgeApp>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Rincian Tagihan SKPKB Hasil Audit</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="text-ink-secondary">
                  Pokok PBJT: <span className="font-bold text-ink-primary">{formatCurrency(selectedAuditItem.pokok)}</span>
                </div>
                <div className="text-ink-secondary">
                  Bunga Sanksi: <span className="font-bold text-amber-600">{formatCurrency(selectedAuditItem.bunga)}</span>
                </div>
                <div className="text-ink-secondary">
                  Denda Sanksi: <span className="font-bold text-rose-600">{formatCurrency(selectedAuditItem.denda)}</span>
                </div>
                <div className="text-ink-secondary">
                  Total Kekurangan: <span className="font-bold text-vibrant-purple">{formatCurrency(selectedAuditItem.totalKekurangan)}</span>
                </div>
              </div>
              <p className="text-ink-secondary pt-1 border-t border-hairline-soft">
                Nomor LHP Official: <span className="font-mono font-bold text-ink-primary">{selectedAuditItem.noLHP}</span>
              </p>
              <p className="text-ink-secondary">
                Status Surat Ketetapan: <span className="font-medium text-emerald-700 dark:text-emerald-400">{selectedAuditItem.statusSK}</span>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-pbjt-dialog"
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

export default PBJTAuditDashboardPage;
