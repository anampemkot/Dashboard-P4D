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
  AlertCircle,
  UserX,
  FileQuestion,
  FileClock,
  RefreshCw,
  Download,
  Eye,
  TrendingDown,
  Layers,
  Sparkles,
  ShieldAlert,
  Send,
  Building2,
} from "lucide-react";

// Filter Field Configuration for BR-11
const kepatuhanFilterFields = [
  {
    id: "kategoriKepatuhan",
    label: "Kategori Kepatuhan Administrasi",
    type: "select" as const,
    placeholder: "Pilih Kategori...",
    options: [
      { value: "all", label: "Semua Kategori Non-Kepatuhan" },
      { value: "wp_data_incomplete", label: "1. WP Belum Melengkapi Data Profil" },
      { value: "wp_unregistered", label: "2. WP Belum Registrasi (Unregistered)" },
      { value: "op_unvalidated", label: "3. OP Belum Tervalidasi Spasial" },
      { value: "berkas_incomplete", label: "4. Berkas Permohonan Belum Lengkap" },
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
    id: "kecamatan",
    label: "Wilayah Kecamatan",
    type: "select" as const,
    placeholder: "Pilih Kecamatan...",
    options: [
      { value: "all", label: "Semua Kecamatan (14 Wilayah)" },
      { value: "gondomanan", label: "Kecamatan Gondomanan" },
      { value: "danurejan", label: "Kecamatan Danurejan" },
      { value: "gondokusuman", label: "Kecamatan Gondokusuman" },
      { value: "jetis", label: "Kecamatan Jetis" },
      { value: "umbulharjo", label: "Kecamatan Umbulharjo" },
    ],
  },
  {
    id: "statusTeguran",
    label: "Status Surat Himbauan / Teguran",
    type: "select" as const,
    placeholder: "Semua Status Teguran...",
    options: [
      { value: "all", label: "Semua Status Himbauan" },
      { value: "surat_1", label: "Surat Himbauan Kelengkapan #1" },
      { value: "surat_2", label: "Surat Teguran Resmi #2" },
      { value: "pemeriksaan", label: "Rekomendasi Survey / Uji Petik" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Temuan Non-Patu", values: { kategoriKepatuhan: "all", statusTeguran: "all" } },
  { label: "WP Belum Registrasi PBJT", values: { kategoriKepatuhan: "wp_unregistered", sektorPajak: "pbjt_makanan" } },
  { label: "OP PBB Unvalidated", values: { kategoriKepatuhan: "op_unvalidated", sektorPajak: "pbb_p2" } },
  { label: "Berkas Menggantung Gondomanan", values: { kategoriKepatuhan: "berkas_incomplete", kecamatan: "gondomanan" } },
];

// Chart Data 1: WP Belum Melengkapi Data per Sektor (Item 1 Bar Chart)
const chartWPDataIncomplete = [
  { sektor: "PBJT Makanan", jumlahWP: 420, targetTerselesaikan: 350 },
  { sektor: "PBB-P2", jumlahWP: 380, targetTerselesaikan: 300 },
  { sektor: "PBJT Hotel", jumlahWP: 185, targetTerselesaikan: 150 },
  { sektor: "Pajak Reklame", jumlahWP: 140, targetTerselesaikan: 110 },
  { sektor: "Air Tanah", jumlahWP: 95, targetTerselesaikan: 80 },
];

// Chart Data 2: WP Belum Registrasi per Kecamatan (Item 2 Bar Chart)
const chartWPUnregistered = [
  { kecamatan: "Gondomanan", unmappedUsaha: 185, potensiMiliar: 4.8 },
  { kecamatan: "Danurejan", unmappedUsaha: 142, potensiMiliar: 3.5 },
  { kecamatan: "Gondokusuman", unmappedUsaha: 130, potensiMiliar: 3.2 },
  { kecamatan: "Umbulharjo", unmappedUsaha: 115, potensiMiliar: 2.9 },
  { kecamatan: "Jetis", unmappedUsaha: 98, potensiMiliar: 2.1 },
];

// Chart Data 3: OP Belum Tervalidasi Spasial per Sektor (Item 3 Bar Chart)
const chartOPUnvalidated = [
  { sektor: "PBB-P2", opBelumValid: 850, validasiTarget: 700 },
  { sektor: "Pajak Reklame", opBelumValid: 310, validasiTarget: 250 },
  { sektor: "PBJT Parkir", opBelumValid: 180, validasiTarget: 140 },
  { sektor: "Air Tanah", opBelumValid: 125, validasiTarget: 100 },
  { sektor: "PBJT Hiburan", opBelumValid: 85, validasiTarget: 70 },
];

// Chart Data 4: Berkas Belum Lengkap per Jenis Permohonan (Item 4 Bar Chart)
const chartBerkasIncomplete = [
  { jenisPermohonan: "Pengurangan PBB", berkasIncomplete: 240, pendingDaysAvg: 4.5 },
  { jenisPermohonan: "Mutasi Pecah NOP", berkasIncomplete: 195, pendingDaysAvg: 5.2 },
  { jenisPermohonan: "Keberatan Omzet", berkasIncomplete: 128, pendingDaysAvg: 8.1 },
  { jenisPermohonan: "Pembetulan SPPT", berkasIncomplete: 95, pendingDaysAvg: 2.8 },
  { jenisPermohonan: "Penghapusan Denda", berkasIncomplete: 72, pendingDaysAvg: 3.5 },
];

// Master Table Data: Audit Kepatuhan Administrasi
const mockAuditComplianceList = [
  {
    id: "ADM-2026-0101",
    subjekUsaha: "Resto Rasa Nusantara",
    npwpdNop: "P.2.0084120.04.12",
    kategori: "WP Belum Lengkap Data",
    rincianMasalah: "NIK Pemilik Belum Verifikasi Dukcapil & Surat Izin Usaha Kedaluwarsa",
    sektor: "PBJT Makanan",
    kecamatan: "Gondomanan",
    statusSurat: "Surat Himbauan #1 Terkirim",
    tglDeteksi: "15 Jul 2026",
  },
  {
    id: "ADM-2026-0102",
    subjekUsaha: "Gedung Komersial Simpang Tugu",
    npwpdNop: "34.71.010.002.015-0090.0",
    kategori: "OP Belum Tervalidasi",
    rincianMasalah: "Perubahan Bangunan 3 Lantai Belum Diupdate SPPT (Selisih Luas 240m2)",
    sektor: "PBB-P2",
    kecamatan: "Jetis",
    statusSurat: "Jadwal Ground Check GIS",
    tglDeteksi: "18 Jul 2026",
  },
  {
    id: "ADM-2026-0103",
    subjekUsaha: "Cafe & Lounge Heritage",
    npwpdNop: "Belum Punya NPWPD",
    kategori: "WP Belum Registrasi",
    rincianMasalah: "Operasional Usaha 6 Bulan Tanpa Registrasi NPWPD (Temuan Uji Petik)",
    sektor: "PBJT Makanan & Minuman",
    kecamatan: "Gondokusuman",
    statusSurat: "Surat Teguran Pendaftaran #2",
    tglDeteksi: "20 Jul 2026",
  },
  {
    id: "ADM-2026-0104",
    subjekUsaha: "Boutique Hotel Prawirotaman",
    npwpdNop: "P.2.0019284.02.10",
    kategori: "Berkas Belum Lengkap",
    rincianMasalah: "Permohonan Pengurangan Pajak Kurang Laporan Keuangan Audited 2025",
    sektor: "PBJT Jasa Perhotelan",
    kecamatan: "Mantrijeron",
    statusSurat: "Pending Kelengkapan WP",
    tglDeteksi: "21 Jul 2026",
  },
  {
    id: "ADM-2026-0105",
    subjekUsaha: "Videotron Digital Malioboro",
    npwpdNop: "34.71.020.005.012-0040.0",
    kategori: "OP Belum Tervalidasi",
    rincianMasalah: "Reklame LED Baru Belum Memiliki Titik Koordinat Presisi BPMA",
    sektor: "Pajak Reklame",
    kecamatan: "Danurejan",
    statusSurat: "Surat Himbauan #1 Terkirim",
    tglDeteksi: "22 Jul 2026",
  },
];

export function AdministrativeComplianceDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal State
  const [selectedComplianceItem, setSelectedComplianceItem] = React.useState<typeof mockAuditComplianceList[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Kepatuhan Direset", {
      description: "Semua kriteria filter kepatuhan administrasi telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Kepatuhan Administrasi Diexport", {
      description: "Berkas PDF/XLSX Laporan Kepatuhan & Daftar Himbauan WP BR-11 berhasil diunduh.",
    });
  };

  const handleSendReminderNotice = (id: string, name: string) => {
    toast.success(`Surat Himbauan Diterbitkan`, {
      description: `Surat Himbauan Kelengkapan Administrasi otomatis dikirimkan ke email/alamat ${name} (${id}).`,
    });
  };

  const handleOpenDetailModal = (record: typeof mockAuditComplianceList[0]) => {
    setSelectedComplianceItem(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for Master Audit Table
  const auditColumns = [
    {
      accessorKey: "id",
      header: "Ref Audit",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.id}
          </div>
          <div className="text-[10px] text-ink-secondary">Deteksi: {row.original.tglDeteksi}</div>
        </div>
      ),
    },
    {
      accessorKey: "subjekUsaha",
      header: "Subjek / Objek Usaha",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.subjekUsaha}</div>
          <div className="text-[10px] text-ink-secondary font-mono">{row.original.npwpdNop}</div>
        </div>
      ),
    },
    {
      accessorKey: "kategori",
      header: "Kategori Temuan",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-kat-adm-${row.original.id}`} variant="solidPurple" size="sm">
          {row.original.kategori}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor / Kecamatan",
      cell: ({ row }: any) => (
        <div>
          <BadgeApp id={`badge-sektor-adm-${row.original.id}`} variant="solidAmber" size="sm">
            {row.original.sektor}
          </BadgeApp>
          <div className="text-[10px] text-ink-secondary mt-0.5">Kec. {row.original.kecamatan}</div>
        </div>
      ),
    },
    {
      accessorKey: "statusSurat",
      header: "Status Tindakan",
      cell: ({ row }: any) => {
        const val = row.original.statusSurat;
        let badgeVariant: any = "solidAmber";
        if (val.includes("Teguran")) badgeVariant = "solidRose";
        if (val.includes("Himbauan")) badgeVariant = "solidAmber";
        if (val.includes("Ground Check")) badgeVariant = "blue";
        if (val.includes("Pending")) badgeVariant = "solidPurple";

        return <BadgeApp id={`badge-status-adm-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5">
          <ButtonApp
            id={`btn-detail-adm-${row.original.id}`}
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={() => handleOpenDetailModal(row.original)}
            className="flex items-center gap-1 text-[11px] h-7 px-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Detail
          </ButtonApp>

          <ButtonApp
            id={`btn-notice-adm-${row.original.id}`}
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() => handleSendReminderNotice(row.original.id, row.original.subjekUsaha)}
            className="flex items-center gap-1 text-[11px] h-7 px-2"
          >
            <Send className="w-3 h-3 text-vibrant-purple" />
            Kirim Himbauan
          </ButtonApp>
        </div>
      ),
    },
  ];

  return (
    <div id="administrative-compliance-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br11" variant="solidPurple" size="sm">
              BR-11 Dashboard Kepatuhan Administrasi
            </BadgeApp>
            <BadgeApp id="hdr-badge-audit-adm" variant="solidAmber" size="sm">
              <ShieldAlert className="w-3 h-3 mr-1 inline" />
              Quality Assurance & Compliance
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-adm" variant="solidEmerald" size="sm">
              Akurasi Master Data 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-adm" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Monitoring Kepatuhan Administrasi Pajak
          </TextApp>
          <TextApp id="hdr-sub-adm" variant="caption" className="text-ink-secondary mt-0.5">
            Pengawasan 4 Pilar Administrasi: WP Belum Melengkapi Data, WP Belum Registrasi, OP Belum Tervalidasi, & Berkas Permohonan Belum Lengkap
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-adm-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Kepatuhan Dibarui", {
                description: "Hasil audit kepatuhan profil WP & kelengkapan berkas telah disinkronkan secara live.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Audit
          </ButtonApp>

          <ButtonApp
            id="btn-export-adm-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Kepatuhan
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-adm-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-kepatuhan-administrasi"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Kepatuhan"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Audit Kepatuhan & Status Himbauan"
          fields={kepatuhanFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Kepatuhan Diterapkan", {
              description: "Menampilkan data temuan audit administrasi berdasarkan kriteria filter.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-11 Items 1 to 4)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Bottom 1 default white. Clean titles without numbers.          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. WP belum melengkapi data - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-wp-data-incomplete"
            variant="clayPurple"
            title="WP belum melengkapi data"
            value="1.220 WP"
            unit="Profil & Kontak Belum Valid"
            description="Perlu Pembaruan NIK, Email, & Telp"
            badge="Profil Incomplete"
            trend={{
              value: "-8.4%",
              label: "Perbaikan Profil",
              isPositive: true,
              direction: "down",
            }}
            icon={<AlertCircle className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah Wajib Pajak terdaftar yang belum melengkapi elemen data wajib (NIK/NIB/Email/No. Telp)."
          />
        </div>

        {/* 2. WP belum registrasi - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-wp-unregistered"
            variant="clayBlue"
            title="WP belum registrasi"
            value="665 Usaha"
            unit="Terdeteksi Beroperasi Tanpa NPWPD"
            description="Temuan Survei & Sanding Data OSS"
            badge="Unregistered WP"
            trend={{
              value: "-12.1%",
              label: "Penurunan Unregistered",
              isPositive: true,
              direction: "down",
            }}
            icon={<UserX className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah pelaku usaha/subjek pajak potensial yang belum mendaftarkan diri secara resmi ke Benda."
          />
        </div>

        {/* 3. OP belum tervalidasi - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-op-unvalidated"
            variant="clayYellow"
            title="OP belum tervalidasi"
            value="1.550 NOP"
            unit="Belum Cek GIS & Fisik Bangunan"
            description="PBB-P2 & Reklame Menunggu Ground Check"
            badge="Unvalidated OP"
            trend={{
              value: "-15.0%",
              label: "Progres Validasi",
              isPositive: true,
              direction: "down",
            }}
            icon={<FileQuestion className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Jumlah Objek Pajak yang belum tervalidasi kesesuaian fisik bangunan/media reklame dengan data SIMPAD."
          />
        </div>

        {/* 4. Berkas belum lengkap - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-berkas-incomplete"
            variant="default"
            title="Berkas belum lengkap"
            value="730 Permohonan"
            unit="Menggantung > 3 Hari Kerja"
            description="Permohonan Pengurangan & Mutasi Tertunda"
            badge="Pending Document"
            trend={{
              value: "-5.2%",
              label: "Penurunan Berkas Incomplete",
              isPositive: true,
              direction: "down",
            }}
            icon={<FileClock className="w-5 h-5 text-purple-600" />}
            infoTooltip="Jumlah berkas permohonan pelayanan Wajib Pajak yang terhenti karena persyaratan belum lengkap."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 CHARTS SECTION: BAR CHARTS FOR ALL 4 CATEGORIES             */}
      {/* (BR-11 Visualisasi Items 1, 2, 3, 4 Bar Charts)                */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visualisasi Item 1: WP belum melengkapi data (Bar Chart) */}
        <CardApp id="card-chart-wp-data-incomplete" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p1-adm" variant="solidPurple" size="sm">Profil Incomplete</BadgeApp>
              <BadgeApp id="badge-chart-p1-total" variant="solidAmber" size="sm">Total: 1.220 WP</BadgeApp>
            </div>
            <TextApp id="title-chart-p1-adm" variant="h3" weight="bold" className="text-ink-primary">
              1. WP Belum Melengkapi Data per Sektor Pajak
            </TextApp>
            <TextApp id="sub-chart-p1-adm" variant="caption" className="text-ink-secondary mb-4">
              Perbandingan Jumlah WP Belum Melengkapi Data vs Target Penyelesaian
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-bar-wp-data-incomplete"
              type="bar"
              data={chartWPDataIncomplete}
              xKey="sektor"
              barSize={18}
              series={[
                { key: "jumlahWP", label: "Jumlah WP Belum Lengkap", color: "#7e22ce" },
                { key: "targetTerselesaikan", label: "Target Perbaikan", color: "#94a3b8" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Visualisasi Item 2: WP belum registrasi (Bar Chart) */}
        <CardApp id="card-chart-wp-unregistered" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p2-adm" variant="solidAmber" size="sm">Unregistered Zone</BadgeApp>
              <BadgeApp id="badge-chart-p2-total" variant="solidPurple" size="sm">Total: 665 Usaha</BadgeApp>
            </div>
            <TextApp id="title-chart-p2-adm" variant="h3" weight="bold" className="text-ink-primary">
              2. WP Belum Registrasi per Wilayah Kecamatan
            </TextApp>
            <TextApp id="sub-chart-p2-adm" variant="caption" className="text-ink-secondary mb-4">
              Jumlah Temuan Objek Usaha Belum Ber-NPWPD & Estimasi Potensi Pajak (Miliar Rp)
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-bar-wp-unregistered"
              type="bar"
              data={chartWPUnregistered}
              xKey="kecamatan"
              barSize={18}
              series={[
                { key: "unmappedUsaha", label: "Jumlah Usaha Unregistered", color: "#f59e0b" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Visualisasi Item 3: OP belum tervalidasi (Bar Chart) */}
        <CardApp id="card-chart-op-unvalidated" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p3-adm" variant="solidEmerald" size="sm">Unvalidated OP</BadgeApp>
              <BadgeApp id="badge-chart-p3-total" variant="solidPurple" size="sm">Total: 1.550 NOP</BadgeApp>
            </div>
            <TextApp id="title-chart-p3-adm" variant="h3" weight="bold" className="text-ink-primary">
              3. OP Belum Tervalidasi Spasial per Sektor Pajak
            </TextApp>
            <TextApp id="sub-chart-p3-adm" variant="caption" className="text-ink-secondary mb-4">
              Jumlah NOP Memerlukan Audit Fisik Lapangan & GIS Overlapping
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-bar-op-unvalidated"
              type="bar"
              data={chartOPUnvalidated}
              xKey="sektor"
              barSize={18}
              series={[
                { key: "opBelumValid", label: "NOP Belum Tervalidasi", color: "#059669" },
                { key: "validasiTarget", label: "Target Validasi", color: "#94a3b8" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Visualisasi Item 4: Berkas belum lengkap (Bar Chart) */}
        <CardApp id="card-chart-berkas-incomplete" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-p4-adm" variant="solidRose" size="sm">Pending Documents</BadgeApp>
              <BadgeApp id="badge-chart-p4-total" variant="solidAmber" size="sm">Total: 730 Berkas</BadgeApp>
            </div>
            <TextApp id="title-chart-p4-adm" variant="h3" weight="bold" className="text-ink-primary">
              4. Berkas Belum Lengkap per Jenis Permohonan
            </TextApp>
            <TextApp id="sub-chart-p4-adm" variant="caption" className="text-ink-secondary mb-4">
              Jumlah Permohonan Tertunda Persyaratan & Rata-rata Hari Tertunda
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-bar-berkas-incomplete"
              type="bar"
              data={chartBerkasIncomplete}
              xKey="jenisPermohonan"
              barSize={18}
              series={[
                { key: "berkasIncomplete", label: "Jumlah Berkas Pending", color: "#dc2626" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE: AUDIT KEPATUHAN ADMINISTRASI MASTER LIST           */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-audit-compliance" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-audit" variant="solidPurple" size="sm">Audit Trail Administrasi</BadgeApp>
              <BadgeApp id="badge-tbl-audit-action" variant="solidAmber" size="sm">Surat Himbauan Automation</BadgeApp>
            </div>
            <TextApp id="title-tbl-audit" variant="h3" weight="bold" className="text-ink-primary">
              Master Table Temuan Audit Kepatuhan Administrasi
            </TextApp>
            <TextApp id="sub-tbl-audit" variant="caption" className="text-ink-secondary">
              Daftar Subjek/Objek Pajak Non-Patu Administrasi & Status Penerbitan Surat Himbauan / Teguran
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-audit-compliance"
          data={mockAuditComplianceList}
          columns={auditColumns}
          searchPlaceholder="Cari Ref Audit, Subjek Usaha, NOP/NPWPD, Kategori, atau Status..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {selectedComplianceItem && (
        <DialogApp
          id="dialog-detail-compliance-item"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail Temuan Audit: ${selectedComplianceItem.id}`}
          description="Rincian kendala kepatuhan administrasi dan opsi penerbitan surat himbauan."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Subjek / Usaha:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedComplianceItem.subjekUsaha}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">NOP / NPWPD:</span>
                <span className="font-mono font-medium text-vibrant-purple">{selectedComplianceItem.npwpdNop}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Kategori Temuan:</span>
                <BadgeApp id="badge-dlg-kat-adm" variant="solidPurple" size="sm">{selectedComplianceItem.kategori}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor / Kecamatan:</span>
                <span className="font-medium text-ink-primary">{selectedComplianceItem.sektor} (Kec. {selectedComplianceItem.kecamatan})</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Rincian Masalah Administrasi & Tindakan</span>
              </div>
              <p className="text-ink-secondary">
                Rincian Masalah: <span className="font-medium text-rose-600">{selectedComplianceItem.rincianMasalah}</span>
              </p>
              <p className="text-ink-secondary">
                Tanggal Deteksi Sistem: <span className="font-mono text-ink-primary">{selectedComplianceItem.tglDeteksi}</span>
              </p>
              <p className="text-ink-secondary">
                Status Tindakan Terakhir: <BadgeApp id="badge-dlg-status-adm" variant="solidAmber" size="sm">{selectedComplianceItem.statusSurat}</BadgeApp>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-send-notice-from-dlg"
                variant="secondary"
                size="sm"
                rounded="pill"
                onClick={() => {
                  handleSendReminderNotice(selectedComplianceItem.id, selectedComplianceItem.subjekUsaha);
                  setIsDetailDialogOpen(false);
                }}
              >
                <Send className="w-3 h-3 mr-1 inline" />
                Kirim Surat Himbauan Now
              </ButtonApp>

              <ButtonApp
                id="btn-close-detail-adm-dialog"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Tutup
              </ButtonApp>
            </div>
          </div>
        </DialogApp>
      )}
    </div>
  );
}

export default AdministrativeComplianceDashboardPage;
