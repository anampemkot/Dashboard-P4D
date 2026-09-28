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
  Database,
  Users,
  Building2,
  CheckCircle2,
  CopyX,
  AlertTriangle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Download,
  Eye,
  TrendingUp,
  Filter,
  Layers,
  Sparkles,
  BarChart3,
  Search,
  CheckSquare,
} from "lucide-react";

// Filter Field Configuration for BR-06
const basisDataFilterFields = [
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
    id: "kategoriIsu",
    label: "Kategori Isu Kualitas Data",
    type: "select" as const,
    placeholder: "Semua Kategori Isu...",
    options: [
      { value: "all", label: "Semua Kategori Isu" },
      { value: "data_ganda", label: "Data Ganda (Duplicate NIK/NOP)" },
      { value: "tidak_valid", label: "Data Tidak Valid (NIK/Alamat)" },
      { value: "belum_verifikasi", label: "Belum Diverifikasi Lapangan" },
      { value: "data_incomplete", label: "Data Tidak Lengkap (Incomplete)" },
    ],
  },
  {
    id: "statusAudit",
    label: "Status Pembersihan / Cleansing",
    type: "select" as const,
    placeholder: "Semua Status Audit...",
    options: [
      { value: "all", label: "Semua Status Audit" },
      { value: "teridentifikasi", label: "Teridentifikasi Sistem" },
      { value: "proses_cleansing", label: "Dalam Proses Perbaikan" },
      { value: "diverifikasi", label: "Selesai Diverifikasi Valid" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Record Basis Data", values: { kategoriIsu: "all", statusAudit: "all" } },
  { label: "Anomali Data Ganda", values: { kategoriIsu: "data_ganda" } },
  { label: "Format NIK / NOP Invalid", values: { kategoriIsu: "tidak_valid" } },
  { label: "Pending Verifikasi", values: { kategoriIsu: "belum_verifikasi" } },
];

// Mock Data Quality Index Breakdown per Sektor (Bar Chart & Scorecards)
const qualityIndexBySektor = [
  { sektor: "PBB-P2", completeness: 95.2, validity: 92.8, uniqueness: 98.1, overallScore: 95.3 },
  { sektor: "PBJT Makanan", sektorLabel: "PBJT Makanan", completeness: 92.4, validity: 89.5, uniqueness: 96.8, overallScore: 92.9 },
  { sektor: "PBJT Hotel", sektorLabel: "PBJT Hotel", completeness: 96.8, validity: 94.2, uniqueness: 98.9, overallScore: 96.6 },
  { sektor: "PBJT Hiburan", sektorLabel: "PBJT Hiburan", completeness: 88.5, validity: 86.1, uniqueness: 95.2, overallScore: 89.9 },
  { sektor: "BPHTB", sektorLabel: "BPHTB", completeness: 97.4, validity: 96.8, uniqueness: 99.2, overallScore: 97.8 },
  { sektor: "Reklame", sektorLabel: "Pajak Reklame", completeness: 89.2, validity: 85.8, uniqueness: 94.5, overallScore: 89.8 },
  { sektor: "PAT", sektorLabel: "Air Tanah", completeness: 91.5, validity: 88.9, uniqueness: 97.0, overallScore: 92.4 },
];

// Mock Audit Flagged Records Table Data
const mockAuditRecords = [
  {
    id: "AUD-001",
    refID: "NPWPD-P.2.0034821.04.12",
    namaSubjek: "PT Kuliner Rasa Jogja",
    sektor: "PBJT Makanan & Minuman",
    jenisIsu: "Data Ganda",
    deskripsiIsu: "Terdeteksi 2 NPWPD aktif dengan NIK Direktur & Alamat Usaha persis sama",
    skorDQI: "68.5%",
    statusAudit: "Teridentifikasi Sistem",
    tglTemuan: "24 Jul 2026",
    petugasAudit: "Tim Quality Control BPKPAD",
    kecamatan: "Gondomanan",
  },
  {
    id: "AUD-002",
    refID: "NOP-34.71.010.002.015.0019",
    namaSubjek: "Tanah & Bangunan Malioboro",
    sektor: "PBB-P2",
    jenisIsu: "Data Tidak Valid",
    deskripsiIsu: "Format NIK Pemilik hanya 15 digit (Dukcapil Mismatch API)",
    skorDQI: "72.0%",
    statusAudit: "Dalam Proses Perbaikan",
    tglTemuan: "22 Jul 2026",
    petugasAudit: "Siti Rahmawati, S.E.",
    kecamatan: "Danurejan",
  },
  {
    id: "AUD-003",
    refID: "NPWPD-P.1.0019230.01.15",
    namaSubjek: "Hotel Grand Ambarrukmo Branch",
    sektor: "PBJT Jasa Perhotelan",
    jenisIsu: "Belum Diverifikasi",
    deskripsiIsu: "Pendaftaran Mandiri Web SIMPAD belum dilakukan Ground Check Lapangan",
    skorDQI: "81.4%",
    statusAudit: "Teridentifikasi Sistem",
    tglTemuan: "20 Jul 2026",
    petugasAudit: "Budi Santoso, S.STP",
    kecamatan: "Gondokusuman",
  },
  {
    id: "AUD-004",
    refID: "NOP-34.71.040.008.001.0082",
    namaSubjek: "Billboard Tugu Jogja Monument",
    sektor: "Pajak Reklame",
    jenisIsu: "Data Tidak Lengkap",
    deskripsiIsu: "Foto Objek Pajak & Titik Koordinat GPS Spasial belum diunggah",
    skorDQI: "64.0%",
    statusAudit: "Dalam Proses Perbaikan",
    tglTemuan: "18 Jul 2026",
    petugasAudit: "Agus Setiawan",
    kecamatan: "Jetis",
  },
  {
    id: "AUD-005",
    refID: "NPWPD-P.4.0081293.03.11",
    namaSubjek: "Resto Tradisional Raminten",
    sektor: "PBJT Makanan & Minuman",
    jenisIsu: "Data Ganda",
    deskripsiIsu: "Duplikasi NIB OSS dengan nama entitas usaha cabang",
    skorDQI: "75.2%",
    statusAudit: "Selesai Diverifikasi Valid",
    tglTemuan: "15 Jul 2026",
    petugasAudit: "Tim Verifikasi Wilayah",
    kecamatan: "Gondokusuman",
  },
];

export function TaxDatabaseDashboardPage() {
  const { toast } = useToastApp();

  // Detail Modal State
  const [selectedRecord, setSelectedRecord] = React.useState<typeof mockAuditRecords[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Active Filter state
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Direset", {
      description: "Semua kriteria filter basis data pajak telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Basis Data Diexport", {
      description: "Berkas PDF/XLSX Audit Kualitas Basis Data Pajak & Cleansing BR-06 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockAuditRecords[0]) => {
    setSelectedRecord(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for DataTableApp (Dashboard Kualitas Data Table)
  const tableColumns = [
    {
      accessorKey: "refID",
      header: "Ref Identitas / NOP",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.refID}
          </div>
          <div className="text-[10px] text-ink-secondary">Ref ID: {row.original.id}</div>
        </div>
      ),
    },
    {
      accessorKey: "namaSubjek",
      header: "Nama Subjek / Objek Pajak",
      cell: ({ row }: any) => (
        <div className="font-medium text-ink-primary text-xs">
          {row.original.namaSubjek}
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-aud-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "jenisIsu",
      header: "Kategori Anomali / Isu",
      cell: ({ row }: any) => {
        const val = row.original.jenisIsu;
        let badgeVariant: any = "solidRose";
        if (val === "Data Ganda") badgeVariant = "solidRose";
        if (val === "Data Tidak Valid") badgeVariant = "solidAmber";
        if (val === "Belum Diverifikasi") badgeVariant = "blue";
        if (val === "Data Tidak Lengkap") badgeVariant = "solidPurple";

        return <BadgeApp id={`badge-isu-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "skorDQI",
      header: "Skor DQI",
      cell: ({ row }: any) => (
        <span className="font-mono font-bold text-xs text-amber-700 dark:text-amber-400">
          {row.original.skorDQI}
        </span>
      ),
    },
    {
      accessorKey: "statusAudit",
      header: "Status Cleansing",
      cell: ({ row }: any) => {
        const val = row.original.statusAudit;
        let badgeVariant: any = "solidEmerald";
        if (val === "Selesai Diverifikasi Valid") badgeVariant = "solidEmerald";
        if (val === "Dalam Proses Perbaikan") badgeVariant = "solidAmber";
        if (val === "Teridentifikasi Sistem") badgeVariant = "solidRose";

        return <BadgeApp id={`badge-status-aud-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "tglTemuan",
      header: "Tgl Temuan",
      cell: ({ row }: any) => (
        <div className="text-xs font-mono text-ink-secondary">{row.original.tglTemuan}</div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-aud-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenDetailModal(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Audit
        </ButtonApp>
      ),
    },
  ];

  return (
    <div id="basis-data-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br06" variant="solidPurple" size="sm">
              BR-06 Dashboard Basis Data Pajak
            </BadgeApp>
            <BadgeApp id="hdr-badge-database" variant="solidAmber" size="sm">
              <Database className="w-3 h-3 mr-1 inline" />
              Master Data Governance & DQI
            </BadgeApp>
            <BadgeApp id="hdr-badge-tahun-basisdata" variant="solidEmerald" size="sm">
              TA 2026 Audit
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-basisdata" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Tata Kelola Basis Data Pajak & Quality Index
          </TextApp>
          <TextApp id="hdr-sub-basisdata" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring Master Wajib Pajak, Objek Pajak, Kelengkapan NIK/NIB, Rekonsiliasi Data Ganda, & Data Quality Index (DQI)
          </TextApp>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-basisdata"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Audit Basis Data Dijalankan", {
                description: "Proses validasi NIK Dukcapil & NOP SIMPAD selesai diperbarui secara otomatis.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Audit System
          </ButtonApp>

          <ButtonApp
            id="btn-export-basisdata-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Kualitas Data
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-basisdata-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-basis-data-pajak"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Basis Data"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Anomali Basis Data & Sektor Pajak"
          fields={basisDataFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Basis Data Berhasil Diterapkan", {
              description: "Menampilkan data anomali dan master record berdasarkan kriteria filter.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-06 Items 1 to 6)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Remainder default white. Clean titles without numbers.        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. Jumlah WP - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-wp-db"
            variant="clayPurple"
            title="Jumlah WP"
            value="34.090"
            unit="Wajib Pajak Terdaftar"
            description="Master Records NPWPD dalam Master DB"
            badge="Master WP"
            trend={{
              value: "+9.2%",
              label: "Pertumbuhan DB",
              isPositive: true,
              direction: "up",
            }}
            icon={<Users className="w-5 h-5 text-white" />}
            infoTooltip="Total entitas Wajib Pajak (WP) aktif dan terdata secara terpusat dalam database SIMPAD."
          />
        </div>

        {/* 2. Jumlah OP - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-op-db"
            variant="clayBlue"
            title="Jumlah OP"
            value="148.250"
            unit="Objek Pajak (NOP)"
            description="Seluruh Objek Pajak Spasial & Non-Spasial"
            badge="Master NOP"
            trend={{
              value: "+11.4%",
              label: "Validitas NOP",
              isPositive: true,
              direction: "up",
            }}
            icon={<Building2 className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Total seluruh Objek Pajak (NOP PBB, Reklame, PBJT) yang tercatat dalam sistem."
          />
        </div>

        {/* 3. Kelengkapan Data - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-kelengkapan-data"
            variant="clayYellow"
            title="Kelengkapan Data"
            value="94.2%"
            unit="Tingkat Kelengkapan Profil"
            description="Mandatory Fields (NIK, NIB, Telepon, GPS)"
            badge="Rata-Rata Profil"
            trend={{
              value: "+3.8%",
              label: "Completeness",
              isPositive: true,
              direction: "up",
            }}
            icon={<CheckCircle2 className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Persentase kelengkapan atribut wajib (Mandatory) pada profil Wajib Pajak & Objek Pajak."
          />
        </div>

        {/* 4. Data Ganda - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-data-ganda"
            variant="default"
            title="Data Ganda"
            value="142"
            unit="Potensi Duplikasi"
            description="NIK / NOP / NIB Terduplikasi Dalam DB"
            badge="Perlu Cleansing"
            trend={{
              value: "-18.5%",
              label: "Penurunan Duplikasi",
              isPositive: true,
              direction: "down",
            }}
            icon={<CopyX className="w-5 h-5 text-rose-600" />}
            infoTooltip="Jumlah entitas yang terdeteksi memiliki potensi duplikasi berdasarkan algoritma pencocokan NIK/NIB/Alamat."
          />
        </div>

        {/* 5. Data Tidak Valid - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-data-tidak-valid"
            variant="default"
            title="Data Tidak Valid"
            value="285"
            unit="Record Mismatch"
            description="Format Invalid atau Mismatch Dukcapil/OSS"
            badge="Validation Alert"
            trend={{
              value: "-12.0%",
              label: "Perbaikan Format",
              isPositive: true,
              direction: "down",
            }}
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
            infoTooltip="Record dengan format NIK tidak 16 digit, alamat kosong, atau gagal validasi API web-service Dukcapil."
          />
        </div>

        {/* 6. Data Belum Diverifikasi - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-data-belum-verifikasi"
            variant="default"
            title="Data Belum Diverifikasi"
            value="610"
            unit="Pending Field Check"
            description="Memerlukan Ground Check Lapangan / Survey"
            badge="Queue Verification"
            trend={{
              value: "-5.2%",
              label: "Antrean Field Check",
              isPositive: true,
              direction: "down",
            }}
            icon={<Clock className="w-5 h-5 text-purple-600" />}
            infoTooltip="Data registrasi atau permohonan mutasi baru yang belum disurvei dan disahkan petugas lapangan."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* METRIK 1: DATA QUALITY INDEX (DQI GAUGE & OVERVIEW SCORECARD) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* DQI Main Score Banner & Gauge Component */}
        <CardApp id="card-dqi-main-banner" className="lg:col-span-1 p-5 border-hairline-soft bg-gradient-to-br from-surface-card via-surface-card to-purple-50/40 dark:to-purple-950/20 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <BadgeApp id="badge-dqi-tag" variant="solidPurple" size="sm">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" />
                Data Quality Index
              </BadgeApp>
              <BadgeApp id="badge-dqi-grade" variant="solidEmerald" size="sm">
                Grade A (Sangat Baik)
              </BadgeApp>
            </div>
            
            <div>
              <TextApp id="title-dqi-governance" variant="h3" weight="bold" className="text-ink-primary">
                Indeks Kualitas Basis Data
              </TextApp>
              <TextApp id="sub-dqi-governance" variant="caption" className="text-ink-secondary mt-0.5">
                Skor Komposit Tata Kelola Master Data Pajak
              </TextApp>
            </div>

            {/* Compact Visual Gauge Representation */}
            <div className="p-4 bg-surface-subtle rounded-xl border border-hairline-soft relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono text-vibrant-purple tracking-tight">
                      92.8
                    </span>
                    <span className="text-xs font-semibold text-ink-secondary">/ 100</span>
                  </div>
                  <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+2.4 Poin YoY</span>
                  </div>
                </div>

                <div className="w-13 h-13 rounded-full bg-vibrant-purple/10 border-2 border-vibrant-purple flex items-center justify-center font-mono font-bold text-vibrant-purple text-xs">
                  92.8%
                </div>
              </div>

              {/* Quality Progress Meter */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-vibrant-purple h-full rounded-full transition-all duration-500"
                  style={{ width: "92.8%" }}
                />
              </div>

              <div className="flex justify-between w-full text-[10px] text-ink-secondary mt-1 font-mono">
                <span>Min: 0</span>
                <span>Target: 90.0</span>
                <span>Max: 100</span>
              </div>
            </div>

            {/* 4-Grid Quality Indicator Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-surface rounded-xl border border-hairline-soft">
                <span className="text-ink-secondary block text-[10px]">Akurasi NIK/NIB</span>
                <span className="font-mono font-bold text-ink-primary text-sm">94.8%</span>
                <span className="text-[10px] text-emerald-600 block">Dukcapil Valid</span>
              </div>
              <div className="p-2.5 bg-surface rounded-xl border border-hairline-soft">
                <span className="text-ink-secondary block text-[10px]">Bebas Duplikasi</span>
                <span className="font-mono font-bold text-ink-primary text-sm">98.2%</span>
                <span className="text-[10px] text-emerald-600 block">Uniqueness High</span>
              </div>
              <div className="p-2.5 bg-surface rounded-xl border border-hairline-soft">
                <span className="text-ink-secondary block text-[10px]">Kelengkapan Profil</span>
                <span className="font-mono font-bold text-ink-primary text-sm">94.2%</span>
                <span className="text-[10px] text-amber-600 block">Mandatory Fields</span>
              </div>
              <div className="p-2.5 bg-surface rounded-xl border border-hairline-soft">
                <span className="text-ink-secondary block text-[10px]">Validasi Lapangan</span>
                <span className="font-mono font-bold text-ink-primary text-sm">91.5%</span>
                <span className="text-[10px] text-blue-600 block">GIS & Survey</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-hairline-soft flex items-center justify-between text-[11px] text-ink-secondary">
            <span>Audit Terakhir: Hari ini 08:30 WIB</span>
            <span className="font-medium text-vibrant-purple">Otomatis DQI</span>
          </div>
        </CardApp>

        {/* METRIK 2: DASHBOARD KUALITAS DATA (Bar Chart per Sektor Pajak) */}
        <CardApp id="card-dqi-by-sektor-chart" className="lg:col-span-2 p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <TextApp id="title-chart-dqi-sektor" variant="h4" weight="bold" className="text-ink-primary">
                Dashboard Kualitas Data per Sektor Pajak
              </TextApp>
              <BadgeApp id="badge-chart-dqi-sektor" variant="solidAmber" size="sm">
                Skor DQI Sektor
              </BadgeApp>
            </div>
            <TextApp id="sub-chart-dqi-sektor" variant="caption" className="text-ink-secondary mb-4">
              Perbandingan Skor Kelengkapan (Completeness), Validitas Format, & Bebas Duplikasi
            </TextApp>
          </div>

          <div className="h-[280px] w-full">
            <ChartApp
              id="chart-bar-dqi-sektor"
              type="bar"
              data={qualityIndexBySektor}
              xKey="sektor"
              barSize={18}
              series={[
                { key: "completeness", label: "Kelengkapan (%)", color: "#7e22ce" },
                { key: "validity", label: "Validitas (%)", color: "#2563eb" },
                { key: "uniqueness", label: "Uniqueness (%)", color: "#f59e0b" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE DASHBOARD KUALITAS DATA & ANOMALI AUDIT             */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-audit-records" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-governance" variant="solidPurple" size="sm">Audit & Data Cleansing</BadgeApp>
              <BadgeApp id="badge-tbl-recent-aud" variant="solidAmber" size="sm">Temuan Anomali Terbaru</BadgeApp>
            </div>
            <TextApp id="title-tbl-aud" variant="h3" weight="bold" className="text-ink-primary">
              Master Table Anomali Basis Data & Action Plan Cleansing
            </TextApp>
            <TextApp id="sub-tbl-aud" variant="caption" className="text-ink-secondary">
              Daftar Record Wajib Pajak / Objek Pajak Terdeteksi Anomali Data Ganda, Mismatch NIK, dan Incomplete
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-audit-records"
          data={mockAuditRecords}
          columns={tableColumns}
          searchPlaceholder="Cari Ref ID, NPWPD/NOP, Nama Subjek, atau Petugas Audit..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL (Portalled by DialogApp)                   */}
      {/* ------------------------------------------------------------- */}
      {selectedRecord && (
        <DialogApp
          id="dialog-detail-audit-record"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Audit Record: ${selectedRecord.refID}`}
          description="Rincian temuan anomali data dan rekomendasi tindakan pembersihan (cleansing)."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Ref Identitas / NOP:</span>
                <span className="font-mono font-bold text-vibrant-purple">{selectedRecord.refID}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Nama Subjek / WP:</span>
                <span className="font-bold text-ink-primary">{selectedRecord.namaSubjek}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Kategori Isu:</span>
                <BadgeApp id="badge-dlg-isu" variant="solidRose" size="sm">{selectedRecord.jenisIsu}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Skor DQI Record:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{selectedRecord.skorDQI}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Deskripsi Anomali & Rencana Cleansing</span>
              </div>
              <p className="text-ink-secondary">
                Deskripsi Anomali: <span className="text-ink-primary font-medium">{selectedRecord.deskripsiIsu}</span>
              </p>
              <p className="text-ink-secondary">
                Wilayah Audit: <span className="text-ink-primary font-medium">Kecamatan {selectedRecord.kecamatan}</span> | Petugas: <span className="text-ink-primary font-medium">{selectedRecord.petugasAudit}</span>
              </p>
              <p className="text-ink-secondary">
                Status Cleansing: <BadgeApp id="badge-dlg-status-aud" variant="solidEmerald" size="sm">{selectedRecord.statusAudit}</BadgeApp>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-audit-dialog"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Tutup Audit
              </ButtonApp>
            </div>
          </div>
        </DialogApp>
      )}
    </div>
  );
}

export default TaxDatabaseDashboardPage;
