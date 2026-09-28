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
  UserPlus,
  Building2,
  FileEdit,
  UserX,
  UserCheck,
  UserMinus,
  RefreshCw,
  Download,
  TrendingUp,
  Eye,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

// Filter Field Configuration for BR-04
const pendaftaranFilterFields = [
  {
    id: "sektorPajak",
    label: "Sektor Pajak",
    type: "select" as const,
    placeholder: "Pilih Sektor Pajak...",
    options: [
      { value: "all", label: "Semua Sektor Pajak" },
      { value: "pbb_p2", label: "PBB-P2 (Pedesaan & Perkotaan)" },
      { value: "bphtb", label: "BPHTB (Bea Perolehan Hak)" },
      { value: "pbjt_makanan", label: "PBJT Makanan & Minuman" },
      { value: "pbjt_hotel", label: "PBJT Jasa Perhotelan" },
      { value: "pbjt_hiburan", label: "PBJT Jasa Kesenian & Hiburan" },
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
    id: "jenisPermohonan",
    label: "Jenis Pendaftaran / Permohonan",
    type: "select" as const,
    placeholder: "Pilih Jenis...",
    options: [
      { value: "all", label: "Semua Permohonan" },
      { value: "wp_baru", label: "Wajib Pajak (WP) Baru" },
      { value: "op_baru", label: "Objek Pajak (OP) Baru" },
      { value: "perubahan_data", label: "Perubahan Data / Mutasi" },
      { value: "penutupan_usaha", label: "Penutupan Usaha / Non-Aktif" },
    ],
  },
  {
    id: "statusAkun",
    label: "Status Akun / Permohonan",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status" },
      { value: "disetujui", label: "Disetujui / NPWPD Aktif" },
      { value: "dalam_proses", label: "Proses Verifikasi" },
      { value: "butuh_perbaikan", label: "Perbaikan Berkas" },
      { value: "ditolak", label: "Ditolak" },
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
  { label: "Semua Pendaftaran", values: { jenisPermohonan: "all", statusAkun: "all" } },
  { label: "WP Baru 2026", values: { jenisPermohonan: "wp_baru" } },
  { label: "OP Baru 2026", values: { jenisPermohonan: "op_baru" } },
  { label: "Perubahan Data", values: { jenisPermohonan: "perubahan_data" } },
  { label: "Penutupan Usaha", values: { jenisPermohonan: "penutupan_usaha" } },
];

// Mock Monthly Growth WP Data
const growthWPData = [
  { month: "Jan", wpBaru: 280, kumulatif: 28400 },
  { month: "Feb", wpBaru: 320, kumulatif: 28720 },
  { month: "Mar", wpBaru: 410, kumulatif: 29130 },
  { month: "Apr", wpBaru: 350, kumulatif: 29480 },
  { month: "Mei", wpBaru: 460, kumulatif: 29940 },
  { month: "Jun", wpBaru: 510, kumulatif: 30450 },
  { month: "Jul", wpBaru: 490, kumulatif: 30940 },
  { month: "Agt", wpBaru: 430, kumulatif: 31370 },
  { month: "Sep", wpBaru: 380, kumulatif: 31750 },
  { month: "Okt", wpBaru: 410, kumulatif: 32160 },
  { month: "Nov", wpBaru: 360, kumulatif: 32520 },
  { month: "Des", wpBaru: 330, kumulatif: 32850 },
];

// Mock Monthly Growth OP Data
const growthOPData = [
  { month: "Jan", opBaru: 390, kumulatif: 142000 },
  { month: "Feb", opBaru: 420, kumulatif: 142420 },
  { month: "Mar", opBaru: 510, kumulatif: 142930 },
  { month: "Apr", opBaru: 480, kumulatif: 143410 },
  { month: "Mei", opBaru: 580, kumulatif: 143990 },
  { month: "Jun", opBaru: 640, kumulatif: 144630 },
  { month: "Jul", opBaru: 620, kumulatif: 145250 },
  { month: "Agt", opBaru: 550, kumulatif: 145800 },
  { month: "Sep", opBaru: 490, kumulatif: 146290 },
  { month: "Okt", opBaru: 520, kumulatif: 146810 },
  { month: "Nov", opBaru: 460, kumulatif: 147270 },
  { month: "Des", opBaru: 410, kumulatif: 147680 },
];

// Mock Registrasi per Bulan Data (Multi Series Column Chart)
const registrasiPerBulanData = [
  { month: "Jan", wpBaru: 280, opBaru: 390, perubahan: 140, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Feb", wpBaru: 320, opBaru: 420, perubahan: 160, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Mar", wpBaru: 410, opBaru: 510, perubahan: 210, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Apr", wpBaru: 350, opBaru: 480, perubahan: 180, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Mei", wpBaru: 460, opBaru: 580, perubahan: 230, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Jun", wpBaru: 510, opBaru: 640, perubahan: 260, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Jul", wpBaru: 490, opBaru: 620, perubahan: 240, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Agt", wpBaru: 430, opBaru: 550, perubahan: 210, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Sep", wpBaru: 380, opBaru: 490, perubahan: 190, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Okt", wpBaru: 410, opBaru: 520, perubahan: 200, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Nov", wpBaru: 360, opBaru: 460, perubahan: 170, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
  { month: "Des", wpBaru: 330, opBaru: 410, perubahan: 150, fillWP: "#7e22ce", fillOP: "#2563eb", fillPerubahan: "#f59e0b" },
];

// Mock Registration Table Records
const mockPendaftaranRecords = [
  {
    id: "REG-001",
    npwpd: "P.2.0034821.04.12",
    namaWajibPajak: "PT Kuliner Rasa Jogja",
    jenisPermohonan: "WP Baru",
    sektor: "PBJT Makanan & Minuman",
    kecamatan: "Gondomanan",
    kelurahan: "Ngupasan",
    status: "Disetujui",
    tglDaftar: "24 Jul 2026",
    petugas: "Siti Rahmawati, S.E.",
    noBerkas: "BR04-2026-0841",
  },
  {
    id: "REG-002",
    npwpd: "P.1.0019230.01.15",
    namaWajibPajak: "CV Ambarrukmo Hotel Branch",
    jenisPermohonan: "OP Baru",
    sektor: "PBJT Jasa Perhotelan",
    kecamatan: "Danurejan",
    kelurahan: "Suryatmajan",
    status: "Proses Verifikasi",
    tglDaftar: "22 Jul 2026",
    petugas: "Budi Santoso, S.STP",
    noBerkas: "BR04-2026-0839",
  },
  {
    id: "REG-003",
    npwpd: "P.3.0041209.08.22",
    namaWajibPajak: "Gedung Plaza Malioboro Utama",
    jenisPermohonan: "Perubahan Data",
    sektor: "PBB-P2",
    kecamatan: "Gondomanan",
    kelurahan: "Ngupasan",
    status: "Disetujui",
    tglDaftar: "20 Jul 2026",
    petugas: "Agus Setiawan",
    noBerkas: "BR04-2026-0820",
  },
  {
    id: "REG-004",
    npwpd: "P.4.0081293.03.11",
    namaWajibPajak: "Resto Tradisional Raminten",
    jenisPermohonan: "Penutupan Usaha",
    sektor: "PBJT Makanan & Minuman",
    kecamatan: "Gondokusuman",
    kelurahan: "Terban",
    status: "Disetujui",
    tglDaftar: "18 Jul 2026",
    petugas: "Tim Verifikasi Wilayah",
    noBerkas: "BR04-2026-0805",
  },
  {
    id: "REG-005",
    npwpd: "P.2.0091204.05.18",
    namaWajibPajak: "Billboard Simpang Tugu Jogja",
    jenisPermohonan: "OP Baru",
    sektor: "Pajak Reklame",
    kecamatan: "Jetis",
    kelurahan: "Gowongan",
    status: "Perbaikan Berkas",
    tglDaftar: "15 Jul 2026",
    petugas: "Rina Wijaya, A.Md",
    noBerkas: "BR04-2026-0792",
  },
];

export function RegistrationDashboardPage() {
  const { toast } = useToastApp();

  // Selected Detail Record for Dialog
  const [selectedRecord, setSelectedRecord] = React.useState<typeof mockPendaftaranRecords[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Active Filters state
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Direset", {
      description: "Semua kriteria filter pendaftaran telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Pendaftaran Diexport", {
      description: "Berkas PDF/XLSX Rekapitulasi Registration & Growth Wajib Pajak BR-04 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockPendaftaranRecords[0]) => {
    setSelectedRecord(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for DataTableApp
  const tableColumns = [
    {
      accessorKey: "npwpd",
      header: "NPWPD / Identitas",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.npwpd}
          </div>
          <div className="text-[10px] text-ink-secondary">No. Berkas: {row.original.noBerkas}</div>
        </div>
      ),
    },
    {
      accessorKey: "namaWajibPajak",
      header: "Nama Wajib Pajak / Subjek",
      cell: ({ row }: any) => (
        <div className="font-medium text-ink-primary text-xs">
          {row.original.namaWajibPajak}
        </div>
      ),
    },
    {
      accessorKey: "jenisPermohonan",
      header: "Jenis Permohonan",
      cell: ({ row }: any) => {
        const val = row.original.jenisPermohonan;
        let badgeVariant: any = "solidPurple";
        if (val === "WP Baru") badgeVariant = "solidPurple";
        if (val === "OP Baru") badgeVariant = "blue";
        if (val === "Perubahan Data") badgeVariant = "solidAmber";
        if (val === "Penutupan Usaha") badgeVariant = "solidRose";

        return <BadgeApp id={`badge-jenis-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "sektor",
      header: "Sektor Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "kecamatan",
      header: "Wilayah Administrative",
      cell: ({ row }: any) => (
        <div className="text-xs text-ink-secondary">
          Kec. {row.original.kecamatan} ({row.original.kelurahan})
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Permohonan",
      cell: ({ row }: any) => {
        const val = row.original.status;
        let badgeVariant: any = "solidEmerald";
        if (val === "Disetujui") badgeVariant = "solidEmerald";
        if (val === "Proses Verifikasi") badgeVariant = "blue";
        if (val === "Perbaikan Berkas") badgeVariant = "solidAmber";

        return <BadgeApp id={`badge-status-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "tglDaftar",
      header: "Tgl Permohonan",
      cell: ({ row }: any) => (
        <div className="text-xs font-mono text-ink-secondary">{row.original.tglDaftar}</div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-reg-${row.original.id}`}
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
    <div id="pendaftaran-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br04" variant="solidPurple" size="sm">
              BR-04 Dashboard Pendaftaran
            </BadgeApp>
            <BadgeApp id="hdr-badge-pendaftaran" variant="solidAmber" size="sm">
              <UserPlus className="w-3 h-3 mr-1 inline" />
              Wajib Pajak & Objek Pajak
            </BadgeApp>
            <BadgeApp id="hdr-badge-tahun" variant="solidEmerald" size="sm">
              Tahun Anggaran 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-pendaftaran" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Pendaftaran Wajib Pajak & Objek Pajak
          </TextApp>
          <TextApp id="hdr-sub-pendaftaran" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring Pertumbuhan Wajib Pajak (WP), Objek Pajak (OP), Mutasi Perubahan Data, & Status Keaktifan
          </TextApp>
        </div>

        {/* Action Header Buttons with variant="purpleDark" and rounded="pill" */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-pendaftaran-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Disinkronisasi", {
                description: "Database pendaftaran Wajib Pajak & Objek Pajak telah diperbarui secara live.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </ButtonApp>

          <ButtonApp
            id="btn-export-pendaftaran-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Pendaftaran
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-pendaftaran-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-pendaftaran-wp-op"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Pendaftaran"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Pendaftaran Wajib Pajak & Objek Pajak"
          fields={pendaftaranFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Pendaftaran Berhasil Diterapkan", {
              description: "Menampilkan data pendaftaran berdasarkan kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-04 Items 1 to 6)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Remainder default white. Clean titles without numbers.        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. WP Baru - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-wp-baru"
            variant="clayPurple"
            title="WP Baru"
            value="4.520"
            unit="Wajib Pajak Baru"
            description="Registrasi Wajib Pajak Baru TA 2026"
            badge="Tahun 2026"
            trend={{
              value: "+12.8%",
              label: "Pertumbuhan YoY",
              isPositive: true,
              direction: "up",
            }}
            icon={<UserPlus className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah Wajib Pajak (WP) baru yang diterbitkan NPWPD pada tahun anggaran berjalan."
          />
        </div>

        {/* 2. OP Baru - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-op-baru"
            variant="clayBlue"
            title="OP Baru"
            value="5.680"
            unit="Objek Pajak Baru"
            description="Penambahan Objek Pajak Baru (NOP)"
            badge="Tahun 2026"
            trend={{
              value: "+14.2%",
              label: "Pertumbuhan YoY",
              isPositive: true,
              direction: "up",
            }}
            icon={<Building2 className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah Objek Pajak (OP) baru yang didaftarkan dan diberikan NOP baru."
          />
        </div>

        {/* 3. Perubahan Data - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-perubahan-data"
            variant="clayYellow"
            title="Perubahan Data"
            value="2.140"
            unit="Berkas Mutasi"
            description="Perubahan Subjek, Alamat, & Legalitas"
            badge="Mutasi Data"
            trend={{
              value: "+6.5%",
              label: "Laju Perubahan",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileEdit className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Jumlah permohonan pemutakhiran data Wajib Pajak atau Objek Pajak yang disetujui."
          />
        </div>

        {/* 4. Penutupan Usaha - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-penutupan-usaha"
            variant="default"
            title="Penutupan Usaha"
            value="310"
            unit="Permohonan Tutup"
            description="Penutupan Usaha / Non-Aktif Permanen"
            badge="Inaktifasi"
            trend={{
              value: "-4.1%",
              label: "Penurunan Kasus",
              isPositive: true,
              direction: "down",
            }}
            icon={<UserX className="w-5 h-5 text-rose-600" />}
            infoTooltip="Wajib Pajak yang mengajukan atau diputus penutupan usaha secara administratif."
          />
        </div>

        {/* 5. WP Aktif - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-wp-aktif"
            variant="default"
            title="WP Aktif"
            value="32.850"
            unit="NPWPD Aktif"
            description="Wajib Pajak dengan Status Aktif Membayar"
            badge="Status Aktif"
            trend={{
              value: "+9.4%",
              label: "Keaktifan WP",
              isPositive: true,
              direction: "up",
            }}
            icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
            infoTooltip="Jumlah total Wajib Pajak terdaftar yang memiliki status aktif dalam sistem SIMPAD."
          />
        </div>

        {/* 6. WP Nonaktif - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-wp-nonaktif"
            variant="default"
            title="WP Nonaktif"
            value="1.240"
            unit="NPWPD Nonaktif"
            description="Wajib Pajak Pasif / Pembekuan Sementara"
            badge="Pasif / Suspend"
            trend={{
              value: "-2.8%",
              label: "Penurunan Pasif",
              isPositive: true,
              direction: "down",
            }}
            icon={<UserMinus className="w-5 h-5 text-amber-600" />}
            infoTooltip="Wajib Pajak dalam status non-aktif sementara karena tidak ada kegiatan usaha atau pembekuan."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION (BR-04 Metrics 1, 2, 3)                         */}
      {/* Colors match cards: Purple (#7e22ce), Blue (#2563eb), Orange (#f59e0b) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric 1: Growth WP (Line Chart) - Purple Theme */}
        <div className="lg:col-span-1 flex flex-col">
          <CardApp id="card-chart-growth-wp" className="p-5 border-hairline-soft h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TextApp id="title-chart-growth-wp" variant="h4" weight="bold" className="text-ink-primary">
                  Growth WP
                </TextApp>
                <BadgeApp id="badge-chart-growth-wp" variant="solidPurple" size="sm">Trend Line</BadgeApp>
              </div>
              <TextApp id="sub-chart-growth-wp" variant="caption" className="text-ink-secondary mb-4">
                Pertumbuhan Kumulatif Wajib Pajak Baru per Bulan
              </TextApp>
            </div>

            <div className="h-[280px] w-full">
              <ChartApp
                id="chart-growth-wp"
                type="line"
                data={growthWPData}
                xKey="month"
                series={[
                  { key: "wpBaru", label: "WP Baru", color: "#7e22ce" },
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={true}
              />
            </div>
          </CardApp>
        </div>

        {/* Metric 2: Growth OP (Line Chart) - Blue Theme */}
        <div className="lg:col-span-1 flex flex-col">
          <CardApp id="card-chart-growth-op" className="p-5 border-hairline-soft h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TextApp id="title-chart-growth-op" variant="h4" weight="bold" className="text-ink-primary">
                  Growth OP
                </TextApp>
                <BadgeApp id="badge-chart-growth-op" variant="blue" size="sm">Trend Line</BadgeApp>
              </div>
              <TextApp id="sub-chart-growth-op" variant="caption" className="text-ink-secondary mb-4">
                Pertumbuhan Objek Pajak (NOP) Baru per Bulan
              </TextApp>
            </div>

            <div className="h-[280px] w-full">
              <ChartApp
                id="chart-growth-op"
                type="line"
                data={growthOPData}
                xKey="month"
                series={[
                  { key: "opBaru", label: "OP Baru", color: "#2563eb" },
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={true}
              />
            </div>
          </CardApp>
        </div>

        {/* Metric 3: Registrasi per Bulan (Column / Bar Chart) - Multi-color */}
        <div className="lg:col-span-1 flex flex-col">
          <CardApp id="card-chart-registrasi-bulanan" className="p-5 border-hairline-soft h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TextApp id="title-chart-registrasi" variant="h4" weight="bold" className="text-ink-primary">
                  Registrasi per Bulan
                </TextApp>
                <BadgeApp id="badge-chart-registrasi" variant="solidAmber" size="sm">Volume Registrasi</BadgeApp>
              </div>
              <TextApp id="sub-chart-registrasi" variant="caption" className="text-ink-secondary mb-4">
                Perbandingan WP Baru, OP Baru, & Perubahan Data
              </TextApp>
            </div>

            <div className="h-[280px] w-full">
              <ChartApp
                id="chart-registrasi-per-bulan"
                type="bar"
                data={registrasiPerBulanData}
                xKey="month"
                barSize={18}
                series={[
                  { key: "wpBaru", label: "WP Baru", color: "#7e22ce" },
                  { key: "opBaru", label: "OP Baru", color: "#2563eb" },
                  { key: "perubahan", label: "Perubahan", color: "#f59e0b" },
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={true}
              />
            </div>
          </CardApp>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE REKAPITULASI PENDAFTARAN                           */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-pendaftaran-records" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-pendaftaran" variant="solidPurple" size="sm">Data Pendaftaran WP & OP</BadgeApp>
              <BadgeApp id="badge-tbl-recent-reg" variant="solidAmber" size="sm">Permohonan Terbaru</BadgeApp>
            </div>
            <TextApp id="title-tbl-reg" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Permohonan Pendaftaran & Pemutakhiran Data
            </TextApp>
            <TextApp id="sub-tbl-reg" variant="caption" className="text-ink-secondary">
              Rekapitulasi Registrasi Wajib Pajak Baru, Objek Pajak Baru, Mutasi Data, & Penutupan Usaha
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-pendaftaran-records"
          data={mockPendaftaranRecords}
          columns={tableColumns}
          searchPlaceholder="Cari NPWPD, Nama Wajib Pajak, Petugas, atau Berkas..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL (Portalled by DialogApp)                   */}
      {/* ------------------------------------------------------------- */}
      {selectedRecord && (
        <DialogApp
          id="dialog-detail-pendaftaran-reg"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail Permohonan: ${selectedRecord.noBerkas}`}
          description="Rincian permohonan pendaftaran Wajib Pajak / Objek Pajak."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">NPWPD / Identitas:</span>
                <span className="font-mono font-bold text-vibrant-purple">{selectedRecord.npwpd}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Nama Wajib Pajak:</span>
                <span className="font-bold text-ink-primary">{selectedRecord.namaWajibPajak}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Jenis Permohonan:</span>
                <BadgeApp id="badge-dlg-jenis" variant="solidPurple" size="sm">{selectedRecord.jenisPermohonan}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor Pajak:</span>
                <BadgeApp id="badge-dlg-sektor-pendaftaran" variant="solidAmber" size="sm">{selectedRecord.sektor}</BadgeApp>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Informasi Verifikasi & Wilayah</span>
              </div>
              <p className="text-ink-secondary">
                Wilayah Administratif: <span className="text-ink-primary font-medium">Kec. {selectedRecord.kecamatan}, Kel. {selectedRecord.kelurahan}</span>
              </p>
              <p className="text-ink-secondary">
                Petugas Verifikator: <span className="text-ink-primary font-medium">{selectedRecord.petugas}</span> ({selectedRecord.tglDaftar})
              </p>
              <p className="text-ink-secondary">
                Status Akhir Permohonan: <BadgeApp id="badge-dlg-status-pendaftaran" variant="solidEmerald" size="sm">{selectedRecord.status}</BadgeApp>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-pendaftaran-dialog"
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

export default RegistrationDashboardPage;
