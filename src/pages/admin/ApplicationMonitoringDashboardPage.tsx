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
  FileMinus,
  FileX,
  FileCheck2,
  FileDiff,
  Trash2,
  RefreshCw,
  Download,
  Eye,
  TrendingUp,
  PieChart as PieChartIcon,
  Layers,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Filter Field Configuration for BR-09
const permohonanFilterFields = [
  {
    id: "jenisPermohonan",
    label: "Jenis Permohonan",
    type: "select" as const,
    placeholder: "Pilih Jenis Permohonan...",
    options: [
      { value: "all", label: "Semua 6 Jenis Permohonan" },
      { value: "pengurangan", label: "Permohonan Pengurangan" },
      { value: "keberatan", label: "Permohonan Keberatan" },
      { value: "pembetulan", label: "Permohonan Pembetulan" },
      { value: "mutasi", label: "Permohonan Mutasi Subjek/Objek" },
      { value: "pembatalan", label: "Permohonan Pembatalan Ketetapan" },
      { value: "penghapusan", label: "Permohonan Penghapusan Piutang/Sanksi" },
    ],
  },
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
      { value: "reklame", label: "Pajak Reklame" },
      { value: "air_tanah", label: "Pajak Air Tanah (PAT)" },
    ],
  },
  {
    id: "statusPermohonan",
    label: "Status Berkas",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status Permohonan" },
      { value: "disetujui", label: "Disetujui (Terbit SK)" },
      { value: "ditolak", label: "Ditolak / Tidak Memenuhi Syarat" },
      { value: "proses", label: "Dalam Proses Verifikasi Tim Teknis" },
      { value: "pending_doc", label: "Menunggu Kelengkapan Berkas WP" },
    ],
  },
  {
    id: "tahunPajak",
    label: "Tahun Pajak",
    type: "select" as const,
    placeholder: "Pilih Tahun...",
    options: [
      { value: "2026", label: "Tahun Pajak 2026" },
      { value: "2025", label: "Tahun Pajak 2025" },
      { value: "2024", label: "Tahun Pajak 2024" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Permohonan 2026", values: { jenisPermohonan: "all", statusPermohonan: "all" } },
  { label: "Permohonan Dalam Proses", values: { statusPermohonan: "proses" } },
  { label: "Pengurangan PBB-P2", values: { jenisPermohonan: "pengurangan", sektorPajak: "pbb_p2" } },
  { label: "Keberatan Disetujui", values: { jenisPermohonan: "keberatan", statusPermohonan: "disetujui" } },
];

// Data Charts for 6 Categories
// 1. Jenis Permohonan Pengurangan (Pie Chart & Bar Chart)
const chartDataPengurangan = [
  { name: "Pengurangan PBB Cagar Budaya / Veteran", value: 450, color: "#7e22ce" },
  { name: "Pengurangan PBB Kurang Mampu / Pensiunan", value: 320, color: "#2563eb" },
  { name: "Pengurangan Denda PBJT Covid/Bencana", value: 180, color: "#f59e0b" },
  { name: "Pengurangan Sanksi Bunga Reklame", value: 95, color: "#059669" },
];

// 2. Jenis Permohonan Keberatan (Pie Chart & Bar Chart)
const chartDataKeberatan = [
  { name: "Keberatan NJOP PBB Terlalu Tinggi", value: 280, color: "#7e22ce" },
  { name: "Keberatan Omzet PBJT Hasil Pemeriksaan", value: 145, color: "#f59e0b" },
  { name: "Keberatan Klasifikasi Kategori Hotel", value: 90, color: "#2563eb" },
  { name: "Keberatan Luas Reklame / Durasi", value: 62, color: "#dc2626" },
];

// 3. Jenis Permohonan Pembetulan (Pie Chart & Bar Chart)
const chartDataPembetulan = [
  { name: "Pembetulan Salah Nama / Alamat WP", value: 510, color: "#2563eb" },
  { name: "Pembetulan Salah NIK / NPWPD", value: 380, color: "#7e22ce" },
  { name: "Pembetulan Salah Ketik Luas Tanah/Bumi", value: 240, color: "#059669" },
  { name: "Pembetulan Tarif / Kode Rekening", value: 115, color: "#f59e0b" },
];

// 4. Jenis Permohonan Mutasi (Pie Chart & Bar Chart)
const chartDataMutasi = [
  { name: "Mutasi Penuh Jual Beli / Waris", value: 680, color: "#059669" },
  { name: "Mutasi Pecah Sertifikat / NOP Baru", value: 420, color: "#2563eb" },
  { name: "Mutasi Penggabungan NOP (Peleburan)", value: 190, color: "#7e22ce" },
  { name: "Mutasi Alih Fungsi Lahan (Sawah ke Ruko)", value: 135, color: "#f59e0b" },
];

// 5. Jenis Permohonan Pembatalan (Pie Chart & Bar Chart)
const chartDataPembatalan = [
  { name: "Pembatalan NOP Ganda / Tumpuk", value: 185, color: "#dc2626" },
  { name: "Pembatalan SKPD Objek Pajak Musnah", value: 110, color: "#f59e0b" },
  { name: "Pembatalan Ketetapan Kadaluarsa", value: 75, color: "#7e22ce" },
  { name: "Pembatalan SKPD Salah Objek", value: 48, color: "#2563eb" },
];

// 6. Jenis Permohonan Penghapusan (Pie Chart & Bar Chart)
const chartDataPenghapusan = [
  { name: "Penghapusan Piutang WP Tidak Ditemukan", value: 240, color: "#dc2626" },
  { name: "Penghapusan Sanksi Denda Administrasi", value: 310, color: "#059669" },
  { name: "Penghapusan Piutang PBB Kedaluwarsa 10Th", value: 165, color: "#7e22ce" },
  { name: "Penghapusan Bunga Keterlambatan", value: 120, color: "#f59e0b" },
];

// Master Table Data: Monitoring Permohonan Real-time
const mockPermohonanList = [
  {
    id: "PMH-2026-0891",
    pemohon: "H. Bambang Sugiarto",
    nopNpwpd: "34.71.010.002.015-0089.0",
    jenis: "Pengurangan",
    subJenis: "Pengurangan PBB Pensiunan (50%)",
    sektor: "PBB-P2",
    tglMasuk: "22 Jul 2026",
    slaDays: "3 Hari lagi",
    status: "Disetujui",
    noSK: "SK.PENG/2026/0412",
  },
  {
    id: "PMH-2026-0892",
    pemohon: "PT Malioboro Hotel Utama",
    nopNpwpd: "P.2.0019284.02.10",
    jenis: "Keberatan",
    subJenis: "Keberatan Hasil Omzet Uji Petik",
    sektor: "PBJT Jasa Perhotelan",
    tglMasuk: "20 Jul 2026",
    slaDays: "12 Hari lagi",
    status: "Dalam Proses",
    noSK: "-",
  },
  {
    id: "PMH-2026-0893",
    pemohon: "Siti Rahmawati",
    nopNpwpd: "34.71.020.005.012-0102.0",
    jenis: "Pembetulan",
    subJenis: "Pembetulan Ejaan Nama & Subjek",
    sektor: "PBB-P2",
    tglMasuk: "19 Jul 2026",
    slaDays: "Selesai",
    status: "Disetujui",
    noSK: "SK.BETUL/2026/0891",
  },
  {
    id: "PMH-2026-0894",
    pemohon: "Drs. Hendra Wijaya",
    nopNpwpd: "34.71.030.001.008-0045.0",
    jenis: "Mutasi",
    subJenis: "Mutasi Penuh Jual Beli / Hibah",
    sektor: "PBB-P2",
    tglMasuk: "18 Jul 2026",
    slaDays: "1 Hari lagi",
    status: "Dalam Proses",
    noSK: "-",
  },
  {
    id: "PMH-2026-0895",
    pemohon: "CV Mediatron Advertising",
    nopNpwpd: "P.2.0045192.05.14",
    jenis: "Pembatalan",
    subJenis: "Pembatalan SKPD Reklame Ganda",
    sektor: "Pajak Reklame",
    tglMasuk: "15 Jul 2026",
    slaDays: "Ditolak",
    status: "Ditolak",
    noSK: "SK.BATAL-TOLAK/2026/012",
  },
  {
    id: "PMH-2026-0896",
    pemohon: "PD BPR Bank Jogja",
    nopNpwpd: "34.71.040.009.001-0002.0",
    jenis: "Penghapusan",
    subJenis: "Penghapusan Sanksi Denda Administrasi",
    sektor: "PBB-P2 & PAT",
    tglMasuk: "12 Jul 2026",
    slaDays: "Selesai",
    status: "Disetujui",
    noSK: "SK.HAPUS/2026/0045",
  },
];

export function ApplicationMonitoringDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal State
  const [selectedPermohonan, setSelectedPermohonan] = React.useState<typeof mockPermohonanList[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Direset", {
      description: "Semua kriteria filter permohonan telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Permohonan Diexport", {
      description: "Berkas PDF/XLSX Monitoring Permohonan Pajak BR-09 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockPermohonanList[0]) => {
    setSelectedPermohonan(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for Master Table Monitoring
  const permohonanColumns = [
    {
      accessorKey: "id",
      header: "No. Permohonan",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.id}
          </div>
          <div className="text-[10px] text-ink-secondary">Tgl: {row.original.tglMasuk}</div>
        </div>
      ),
    },
    {
      accessorKey: "pemohon",
      header: "Nama Pemohon & NOP / NPWPD",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.pemohon}</div>
          <div className="text-[10px] text-ink-secondary font-mono">{row.original.nopNpwpd}</div>
        </div>
      ),
    },
    {
      accessorKey: "jenis",
      header: "Jenis Permohonan",
      cell: ({ row }: any) => (
        <div>
          <BadgeApp id={`badge-jenis-pmh-${row.original.id}`} variant="solidPurple" size="sm">
            {row.original.jenis}
          </BadgeApp>
          <div className="text-[10px] text-ink-secondary mt-0.5">{row.original.subJenis}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-pmh-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Berkas",
      cell: ({ row }: any) => {
        const val = row.original.status;
        let badgeVariant: any = "solidEmerald";
        if (val === "Disetujui") badgeVariant = "solidEmerald";
        if (val === "Dalam Proses") badgeVariant = "solidAmber";
        if (val === "Ditolak") badgeVariant = "solidRose";

        return <BadgeApp id={`badge-status-pmh-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "slaDays",
      header: "SLA / Terbit SK",
      cell: ({ row }: any) => (
        <div>
          <span className="font-mono text-xs text-ink-primary font-medium">{row.original.slaDays}</span>
          <div className="text-[10px] text-ink-secondary font-mono">{row.original.noSK}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-pmh-${row.original.id}`}
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
    <div id="application-monitoring-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br09" variant="solidPurple" size="sm">
              BR-09 Dashboard Monitoring Permohonan
            </BadgeApp>
            <BadgeApp id="hdr-badge-pelayanan" variant="solidAmber" size="sm">
              <FileText className="w-3 h-3 mr-1 inline" />
              Layanan Pelayanan Pajak Daerah
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-pmh" variant="solidEmerald" size="sm">
              Real-time SLA 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-pmh" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Monitoring Permohonan Pajak Daerah
          </TextApp>
          <TextApp id="hdr-sub-pmh" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring 6 Jenis Permohonan: Pengurangan, Keberatan, Pembetulan, Mutasi, Pembatalan, & Penghapusan
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-pmh-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Permohonan Dibarui", {
                description: "Berkas dan status permohonan pelayanan Wajib Pajak telah disinkronkan secara live.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync SLA
          </ButtonApp>

          <ButtonApp
            id="btn-export-pmh-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Permohonan
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-pmh-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-monitoring-permohonan"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Permohonan"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Layanan Permohonan Wajib Pajak"
          fields={permohonanFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Permohonan Diterapkan", {
              description: "Menampilkan data statistik permohonan sesuai kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-09 Items 1 to 6)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Bottom 3 default white. Clean titles without numbers.          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. Jenis Permohonan Pengurangan - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pengurangan"
            variant="clayPurple"
            title="Jenis Permohonan Pengurangan"
            value="1.045 Berkas"
            unit="Pengurangan PBB, PBJT, & Reklame"
            description="82.4% Disetujui (Cagar Budaya / Veteran / Pensiunan)"
            badge="Pengurangan SK"
            trend={{
              value: "+12.5%",
              label: "Vol. Permohonan",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileMinus className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah total permohonan pengurangan ketetapan pajak atau sanksi denda."
          />
        </div>

        {/* 2. Jenis Permohonan Keberatan - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-keberatan"
            variant="clayBlue"
            title="Jenis Permohonan Keberatan"
            value="577 Berkas"
            unit="Keberatan NJOP & Omzet Pemeriksaan"
            description="64.5% Dalam Evaluasi Tim Tim Ahli Penilai"
            badge="Sengketa Ketetapan"
            trend={{
              value: "-5.2%",
              label: "Penurunan Sengketa",
              isPositive: true,
              direction: "down",
            }}
            icon={<FileX className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah permohonan keberatan atas surat ketetapan pajak (SKPD / SPPT)."
          />
        </div>

        {/* 3. Jenis Permohonan Pembetulan - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pembetulan"
            variant="clayYellow"
            title="Jenis Permohonan Pembetulan"
            value="1.245 Berkas"
            unit="Pembetulan Nama, NIK, & Luas"
            description="SLA Rata-rata 1.8 Hari Kerja"
            badge="Koreksi Administrative"
            trend={{
              value: "+8.1%",
              label: "Penyelesaian Cepat",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileCheck2 className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Jumlah permohonan pembetulan kekeliruan cetak nama, NIK, alamat, atau tarif."
          />
        </div>

        {/* 4. Jenis Permohonan Mutasi - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-mutasi"
            variant="default"
            title="Jenis Permohonan Mutasi"
            value="1.425 Berkas"
            unit="Mutasi Penuh, Pecah, & Penggabungan NOP"
            description="Validasi Integrasi BPN & Sertifikat Tanah"
            badge="Mutasi NOP"
            trend={{
              value: "+15.2%",
              label: "Transaksi Peralihan",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileDiff className="w-5 h-5 text-purple-600" />}
            infoTooltip="Jumlah permohonan mutasi subjek/objek pajak karena jual beli, waris, atau pemecahan lahan."
          />
        </div>

        {/* 5. Jenis Permohonan Pembatalan - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-pembatalan"
            variant="default"
            title="Jenis Permohonan Pembatalan"
            value="418 Berkas"
            unit="Pembatalan NOP Ganda & SKPD Musnah"
            description="Verifikasi Hasil Field Check GIS"
            badge="Pembersihan NOP"
            trend={{
              value: "-18.5%",
              label: "Penurunan Ganda",
              isPositive: true,
              direction: "down",
            }}
            icon={<FileX className="w-5 h-5 text-rose-600" />}
            infoTooltip="Jumlah permohonan pembatalan ketetapan atau NOP ganda yang tidak valid."
          />
        </div>

        {/* 6. Jenis Permohonan Penghapusan - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-penghapusan"
            variant="default"
            title="Jenis Permohonan Penghapusan"
            value="835 Berkas"
            unit="Penghapusan Piutang Kedaluwarsa & Denda"
            description="Kepatuhan Penghapusan Piutang Macet > 10Th"
            badge="Penghapusan Piutang"
            trend={{
              value: "+22.4%",
              label: "Pembersihan Piutang",
              isPositive: true,
              direction: "up",
            }}
            icon={<Trash2 className="w-5 h-5 text-amber-600" />}
            infoTooltip="Jumlah permohonan penghapusan sanksi denda administrasi atau piutang kadaluarsa."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6 CHARTS SECTION: PIE / BAR CHARTS FOR ALL 6 CATEGORIES       */}
      {/* (BR-08 Visualisasi Items 1 to 6 Charts)                        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Permohonan Pengurangan (Bar Chart) */}
        <CardApp id="card-chart-pengurangan" className="p-4 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p1" variant="solidPurple" size="sm">
                <FileMinus className="w-3 h-3 mr-1 inline" />
                Pengurangan
              </BadgeApp>
              <span className="text-[11px] font-mono font-bold text-ink-secondary">Total: 1.045</span>
            </div>
            <TextApp id="title-chart-p1" variant="h4" weight="bold" className="text-ink-primary">
              Jenis Permohonan Pengurangan
            </TextApp>
            <TextApp id="sub-chart-p1" variant="caption" className="text-ink-secondary mb-3">
              Rincian Kategori Pengurangan Pokok & Sanksi Pajak
            </TextApp>
          </div>

          <div className="h-[220px] w-full">
            <ChartApp
              id="chart-bar-pengurangan"
              type="bar"
              data={chartDataPengurangan}
              xKey="name"
              barSize={16}
              series={[{ key: "value", label: "Jumlah Berkas", color: "#7e22ce" }]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

        {/* Chart 2: Permohonan Keberatan (Pie / Bar Chart) */}
        <CardApp id="card-chart-keberatan" className="p-4 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p2" variant="solidAmber" size="sm">
                <FileX className="w-3 h-3 mr-1 inline" />
                Keberatan
              </BadgeApp>
              <span className="text-[11px] font-mono font-bold text-ink-secondary">Total: 577</span>
            </div>
            <TextApp id="title-chart-p2" variant="h4" weight="bold" className="text-ink-primary">
              Jenis Permohonan Keberatan
            </TextApp>
            <TextApp id="sub-chart-p2" variant="caption" className="text-ink-secondary mb-3">
              Proporsi Sengketa Ketetapan NJOP & Omzet
            </TextApp>
          </div>

          <div className="h-[220px] w-full">
            <ChartApp
              id="chart-bar-keberatan"
              type="bar"
              data={chartDataKeberatan}
              xKey="name"
              barSize={16}
              series={[{ key: "value", label: "Jumlah Berkas", color: "#f59e0b" }]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

        {/* Chart 3: Permohonan Pembetulan (Bar Chart) */}
        <CardApp id="card-chart-pembetulan" className="p-4 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p3" variant="solidEmerald" size="sm">
                <FileCheck2 className="w-3 h-3 mr-1 inline" />
                Pembetulan
              </BadgeApp>
              <span className="text-[11px] font-mono font-bold text-ink-secondary">Total: 1.245</span>
            </div>
            <TextApp id="title-chart-p3" variant="h4" weight="bold" className="text-ink-primary">
              Jenis Permohonan Pembetulan
            </TextApp>
            <TextApp id="sub-chart-p3" variant="caption" className="text-ink-secondary mb-3">
              Koreksi Administrasi Identitas & Objek
            </TextApp>
          </div>

          <div className="h-[220px] w-full">
            <ChartApp
              id="chart-bar-pembetulan"
              type="bar"
              data={chartDataPembetulan}
              xKey="name"
              barSize={16}
              series={[{ key: "value", label: "Jumlah Berkas", color: "#059669" }]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

        {/* Chart 4: Permohonan Mutasi (Bar Chart) */}
        <CardApp id="card-chart-mutasi" className="p-4 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p4" variant="solidPurple" size="sm">
                <FileDiff className="w-3 h-3 mr-1 inline" />
                Mutasi
              </BadgeApp>
              <span className="text-[11px] font-mono font-bold text-ink-secondary">Total: 1.425</span>
            </div>
            <TextApp id="title-chart-p4" variant="h4" weight="bold" className="text-ink-primary">
              Jenis Permohonan Mutasi
            </TextApp>
            <TextApp id="sub-chart-p4" variant="caption" className="text-ink-secondary mb-3">
              Peralihan Hak, Pemecahan, & Penggabungan NOP
            </TextApp>
          </div>

          <div className="h-[220px] w-full">
            <ChartApp
              id="chart-bar-mutasi"
              type="bar"
              data={chartDataMutasi}
              xKey="name"
              barSize={16}
              series={[{ key: "value", label: "Jumlah Berkas", color: "#2563eb" }]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

        {/* Chart 5: Permohonan Pembatalan (Bar Chart) */}
        <CardApp id="card-chart-pembatalan" className="p-4 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p5" variant="solidRose" size="sm">
                <FileX className="w-3 h-3 mr-1 inline" />
                Pembatalan
              </BadgeApp>
              <span className="text-[11px] font-mono font-bold text-ink-secondary">Total: 418</span>
            </div>
            <TextApp id="title-chart-p5" variant="h4" weight="bold" className="text-ink-primary">
              Jenis Permohonan Pembatalan
            </TextApp>
            <TextApp id="sub-chart-p5" variant="caption" className="text-ink-secondary mb-3">
              Pembatalan NOP Ganda & Ketetapan Tidak Sah
            </TextApp>
          </div>

          <div className="h-[220px] w-full">
            <ChartApp
              id="chart-bar-pembatalan"
              type="bar"
              data={chartDataPembatalan}
              xKey="name"
              barSize={16}
              series={[{ key: "value", label: "Jumlah Berkas", color: "#dc2626" }]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

        {/* Chart 6: Permohonan Penghapusan (Bar Chart) */}
        <CardApp id="card-chart-penghapusan" className="p-4 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p6" variant="solidAmber" size="sm">
                <Trash2 className="w-3 h-3 mr-1 inline" />
                Penghapusan
              </BadgeApp>
              <span className="text-[11px] font-mono font-bold text-ink-secondary">Total: 835</span>
            </div>
            <TextApp id="title-chart-p6" variant="h4" weight="bold" className="text-ink-primary">
              Jenis Permohonan Penghapusan
            </TextApp>
            <TextApp id="sub-chart-p6" variant="caption" className="text-ink-secondary mb-3">
              Penghapusan Sanksi & Piutang Kadaluarsa
            </TextApp>
          </div>

          <div className="h-[220px] w-full">
            <ChartApp
              id="chart-bar-penghapusan"
              type="bar"
              data={chartDataPenghapusan}
              xKey="name"
              barSize={16}
              series={[{ key: "value", label: "Jumlah Berkas", color: "#f59e0b" }]}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE: MONITORING BERKAS PERMOHONAN REALTIME             */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-monitoring-permohonan" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-pmh" variant="solidPurple" size="sm">Monitoring Berkas</BadgeApp>
              <BadgeApp id="badge-tbl-pmh-sla" variant="solidAmber" size="sm">Standar Layanan SLA</BadgeApp>
            </div>
            <TextApp id="title-tbl-pmh" variant="h3" weight="bold" className="text-ink-primary">
              Master Table Monitoring Berkas Permohonan Wajib Pajak
            </TextApp>
            <TextApp id="sub-tbl-pmh" variant="caption" className="text-ink-secondary">
              Daftar Real-time Permohonan Masuk, Progress Verifikasi Teknis, & Terbit Surat Keputusan (SK)
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-monitoring-permohonan"
          data={mockPermohonanList}
          columns={permohonanColumns}
          searchPlaceholder="Cari No. Permohonan, Pemohon, NOP/NPWPD, atau Jenis..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {selectedPermohonan && (
        <DialogApp
          id="dialog-detail-permohonan"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail Permohonan: ${selectedPermohonan.id}`}
          description="Informasi pemohon, jenis pelayanan, status berkas, dan nomor SK resmi."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Pemohon:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedPermohonan.pemohon}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">NOP / NPWPD:</span>
                <span className="font-mono font-medium text-vibrant-purple">{selectedPermohonan.nopNpwpd}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Jenis Permohonan:</span>
                <BadgeApp id="badge-dlg-jenis-pmh" variant="solidPurple" size="sm">{selectedPermohonan.jenis}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Sub-Kategori:</span>
                <span className="font-medium text-ink-primary">{selectedPermohonan.subJenis}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Status Proses & Keputusan Official</span>
              </div>
              <p className="text-ink-secondary">
                Sektor Pajak: <BadgeApp id="badge-dlg-sektor-pmh" variant="solidAmber" size="sm">{selectedPermohonan.sektor}</BadgeApp>
              </p>
              <p className="text-ink-secondary">
                Tanggal Masuk Berkas: <span className="font-medium text-ink-primary">{selectedPermohonan.tglMasuk}</span>
              </p>
              <p className="text-ink-secondary">
                Status Berkas: <BadgeApp id="badge-dlg-status-pmh" variant="solidEmerald" size="sm">{selectedPermohonan.status}</BadgeApp>
              </p>
              <p className="text-ink-secondary">
                Nomor Surat Keputusan (SK): <span className="font-mono font-bold text-vibrant-purple">{selectedPermohonan.noSK}</span>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-pmh-dialog"
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

export default ApplicationMonitoringDashboardPage;
