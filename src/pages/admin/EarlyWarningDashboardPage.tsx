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
  AlertTriangle,
  Clock,
  FileMinus,
  CheckCircle2,
  CopyX,
  Layers,
  RefreshCw,
  Download,
  Eye,
  ShieldAlert,
  Zap,
  TrendingUp,
  Database,
  FileSpreadsheet,
  Building,
  Siren,
  BellRing,
} from "lucide-react";

// Filter Field Configuration for BR-12 Early Warning
const earlyWarningFilterFields = [
  {
    id: "tingkatAnomali",
    label: "Tingkat Peringatan (Severity)",
    type: "select" as const,
    placeholder: "Pilih Severity...",
    options: [
      { value: "all", label: "Semua Tingkat Warning" },
      { value: "critical", label: "Critical (Perlu Penanganan < 24 Jam)" },
      { value: "warning", label: "Warning (Batas Terlampaui)" },
      { value: "caution", label: "Caution (Potensi Bottleneck)" },
    ],
  },
  {
    id: "kategoriWarning",
    label: "Kategori Early Warning",
    type: "select" as const,
    placeholder: "Pilih Kategori...",
    options: [
      { value: "all", label: "Semua 7 Indikator Warning" },
      { value: "sla_exceeded", label: "1. Pelayanan Melebihi SLA" },
      { value: "pendataan_late", label: "2. Pendataan Terlambat" },
      { value: "penetapan_pending", label: "3. Penetapan Belum Diterbitkan" },
      { value: "validasi_incomplete", label: "4. Validasi Belum Selesai" },
      { value: "data_ganda_spike", label: "5. Data Ganda Meningkat" },
      { value: "permohonan_stuck", label: "6. Permohonan Menumpuk" },
      { value: "db_incomplete", label: "7. Basis Data Belum Lengkap" },
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
    id: "kecamatan",
    label: "Wilayah Kecamatan",
    type: "select" as const,
    placeholder: "Pilih Wilayah...",
    options: [
      { value: "all", label: "Semua Wilayah" },
      { value: "gondomanan", label: "Gondomanan" },
      { value: "danurejan", label: "Danurejan" },
      { value: "gondokusuman", label: "Gondokusuman" },
      { value: "jetis", label: "Jetis" },
      { value: "umbulharjo", label: "Umbulharjo" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Warning Critical", values: { tingkatAnomali: "critical" } },
  { label: "Pelayanan SLA & Permohonan Stuck", values: { kategoriWarning: "sla_exceeded" } },
  { label: "Sengketa Data Ganda & Database", values: { kategoriWarning: "data_ganda_spike" } },
  { label: "PBB-P2 Pending Penetapan", values: { sektorPajak: "pbb_p2", kategoriWarning: "penetapan_pending" } },
];

// Line Chart Data 1: Item 5 Tren Peningkatan Data Ganda
const chartDataDataGandaTrend = [
  { bulan: "Jan 2026", totalGanda: 120, gandaPBB: 80, gandaNPWPD: 40 },
  { bulan: "Feb 2026", totalGanda: 145, gandaPBB: 95, gandaNPWPD: 50 },
  { bulan: "Mar 2026", totalGanda: 180, gandaPBB: 110, gandaNPWPD: 70 },
  { bulan: "Apr 2026", totalGanda: 210, gandaPBB: 135, gandaNPWPD: 75 },
  { bulan: "Mei 2026", totalGanda: 245, gandaPBB: 155, gandaNPWPD: 90 },
  { bulan: "Jun 2026", totalGanda: 280, gandaPBB: 175, gandaNPWPD: 105 },
  { bulan: "Jul 2026", totalGanda: 310, gandaPBB: 190, gandaNPWPD: 120 },
];

// Line Chart Data 2: Item 6 Tren Permohonan Menumpuk (Bottleneck Stack)
const chartDataPermohonanMenumpukTrend = [
  { bulan: "Jan 2026", berkasMenumpuk: 180, slaThreshold: 100, durasiTertundaAvg: 3.2 },
  { bulan: "Feb 2026", berkasMenumpuk: 220, slaThreshold: 100, durasiTertundaAvg: 4.1 },
  { bulan: "Mar 2026", berkasMenumpuk: 290, slaThreshold: 100, durasiTertundaAvg: 5.5 },
  { bulan: "Apr 2026", berkasMenumpuk: 340, slaThreshold: 100, durasiTertundaAvg: 6.8 },
  { bulan: "Mei 2026", berkasMenumpuk: 390, slaThreshold: 100, durasiTertundaAvg: 7.2 },
  { bulan: "Jun 2026", berkasMenumpuk: 430, slaThreshold: 100, durasiTertundaAvg: 8.5 },
  { bulan: "Jul 2026", berkasMenumpuk: 480, slaThreshold: 100, durasiTertundaAvg: 9.4 },
];

// Master Table Data: Detail Anomali & Early Warning Action Items
const mockEarlyWarningLog = [
  {
    id: "EW-2026-001",
    kategori: "1. Pelayanan melebihi SLA",
    deskripsi: "142 Berkas Mutasi & Pengurangan Melewati SLA > 5 Hari",
    sektor: "PBB-P2 & PBJT Hotel",
    lokasi: "Kec. Gondomanan & Danurejan",
    severity: "Critical",
    dampak: "Potensi Komplain Publik & Penundaan SK",
    statusTindakan: "Delegasi Tim Reaksi Cepat",
    tglAnomali: "25 Jul 2026",
  },
  {
    id: "EW-2026-002",
    kategori: "2. Pendataan terlambat",
    deskripsi: "85 Objek Pajak Reklame & Resto Baru Belum Terdata Field Survey",
    sektor: "Pajak Reklame & PBJT Makanan",
    lokasi: "Kec. Gondokusuman",
    severity: "Warning",
    dampak: "Potensi Loss Revenue Rp 1.2 M/Bulan",
    statusTindakan: "Terbit Surat Tugas Pendataan",
    tglAnomali: "24 Jul 2026",
  },
  {
    id: "EW-2026-003",
    kategori: "3. Penetapan belum diterbitkan",
    deskripsi: "1.240 Draft SKPD PBB-P2 Belum Di-Otorisasi Kepala Badan",
    sektor: "PBB-P2",
    lokasi: "Seluruh 14 Kecamatan",
    severity: "Critical",
    dampak: "Keterlambatan Pencetakan SPPT Massal",
    statusTindakan: "Antrean Batch E-Sign TTE",
    tglAnomali: "23 Jul 2026",
  },
  {
    id: "EW-2026-004",
    kategori: "4. Validasi belum selesai",
    deskripsi: "520 NOP PBB Hasil Pecah Lahan Belum Tervalidasi GIS Spasial",
    sektor: "PBB-P2",
    lokasi: "Kec. Umbulharjo & Mantrijeron",
    severity: "Warning",
    dampak: "NOP Tumpuk di Peta Digital Benda",
    statusTindakan: "Gis Layering Processing",
    tglAnomali: "22 Jul 2026",
  },
  {
    id: "EW-2026-005",
    kategori: "5. Data ganda meningkat",
    deskripsi: "Spike 310 NOP Ganda Terdeteksi Algoritma AI Matching",
    sektor: "PBB-P2 & PAT",
    lokasi: "Kec. Jetis & Kotagede",
    severity: "Critical",
    dampak: "Double Tagihan SPPT ke Wajib Pajak",
    statusTindakan: "Proses Cleansing & Purging Data",
    tglAnomali: "20 Jul 2026",
  },
  {
    id: "EW-2026-006",
    kategori: "6. Permohonan menumpuk",
    deskripsi: "480 Berkas Permohonan Keberatan Terhenti di Verifikasi Administrasi",
    sektor: "PBJT Jasa Perhotelan",
    lokasi: "Kec. Ngampil & Wirobrajan",
    severity: "Critical",
    dampak: "SLA Compliance Turun ke 82%",
    statusTindakan: "Penambahan Verifikator Teknis",
    tglAnomali: "19 Jul 2026",
  },
  {
    id: "EW-2026-007",
    kategori: "7. Basis data belum lengkap",
    deskripsi: "890 Profil WP Badan Usaha Belum Memiliki NIK Pengurus & NIB",
    sektor: "PBJT & Pajak Reklame",
    lokasi: "Seluruh Wilayah Kota",
    severity: "Caution",
    dampak: "Penagihan Terhambat Kontak Valid",
    statusTindakan: "Kirim Pop-up Reminder WP App",
    tglAnomali: "18 Jul 2026",
  },
];

export function EarlyWarningDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal State
  const [selectedWarningItem, setSelectedWarningItem] = React.useState<typeof mockEarlyWarningLog[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Early Warning Direset", {
      description: "Semua kriteria filter peringatan dini telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Early Warning Diexport", {
      description: "Berkas PDF/XLSX Matriks Warning & Log Anomali BR-12 berhasil diunduh.",
    });
  };

  const handleExecuteQuickAction = (id: string, category: string) => {
    toast.vibrant(`Tindakan Cepat Dieksekusi`, {
      description: `Eskalasi darurat untuk warning ${id} (${category}) telah dikirimkan ke Penanggung Jawab Sektor.`,
    });
  };

  const handleOpenDetailModal = (record: typeof mockEarlyWarningLog[0]) => {
    setSelectedWarningItem(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for Master Table Early Warning
  const warningColumns = [
    {
      accessorKey: "id",
      header: "Kode Warning",
      cell: ({ row }: any) => (
        <div>
          <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
            {row.original.id}
          </span>
          <div className="text-[10px] text-ink-secondary">{row.original.tglAnomali}</div>
        </div>
      ),
    },
    {
      accessorKey: "kategori",
      header: "Indikator Early Warning",
      cell: ({ row }: any) => (
        <div>
          <BadgeApp id={`badge-kat-ew-${row.original.id}`} variant="solidPurple" size="sm">
            {row.original.kategori}
          </BadgeApp>
          <div className="text-[10px] text-ink-secondary mt-0.5 font-medium">{row.original.deskripsi}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor & Wilayah",
      cell: ({ row }: any) => (
        <div>
          <BadgeApp id={`badge-sektor-ew-${row.original.id}`} variant="solidAmber" size="sm">
            {row.original.sektor}
          </BadgeApp>
          <div className="text-[10px] text-ink-secondary mt-0.5">{row.original.lokasi}</div>
        </div>
      ),
    },
    {
      accessorKey: "severity",
      header: "Severity Level",
      cell: ({ row }: any) => {
        const val = row.original.severity;
        let badgeVariant: any = "solidRose";
        if (val === "Critical") badgeVariant = "solidRose";
        if (val === "Warning") badgeVariant = "solidAmber";
        if (val === "Caution") badgeVariant = "solidPurple";

        return <BadgeApp id={`badge-severity-ew-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "statusTindakan",
      header: "Status Penanganan",
      cell: ({ row }: any) => (
        <div>
          <span className="font-mono text-xs text-ink-primary font-medium">{row.original.statusTindakan}</span>
          <div className="text-[10px] text-rose-600 font-medium">{row.original.dampak}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Aksi Emergency",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5">
          <ButtonApp
            id={`btn-detail-ew-${row.original.id}`}
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={() => handleOpenDetailModal(row.original)}
            className="flex items-center gap-1 text-[11px] h-7 px-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Rincian
          </ButtonApp>

          <ButtonApp
            id={`btn-action-ew-${row.original.id}`}
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() => handleExecuteQuickAction(row.original.id, row.original.kategori)}
            className="flex items-center gap-1 text-[11px] h-7 px-2 text-rose-600 hover:bg-rose-50 border-rose-200"
          >
            <Zap className="w-3 h-3" />
            Eskalasi
          </ButtonApp>
        </div>
      ),
    },
  ];

  return (
    <div id="early-warning-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br12" variant="solidPurple" size="sm">
              BR-12 Dashboard Early Warning
            </BadgeApp>
            <BadgeApp id="hdr-badge-alert-matrix" variant="solidRose" size="sm">
              <Siren className="w-3 h-3 mr-1 inline animate-pulse" />
              Real-time High Alert Matrix
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-ew" variant="solidAmber" size="sm">
              7 Indikator Anomali 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-ew" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Early Warning & Deteksi Anomali System
          </TextApp>
          <TextApp id="hdr-sub-ew" variant="caption" className="text-ink-secondary mt-0.5">
            Peringatan Dini 7 Pilar: Pelayanan Melebihi SLA, Pendataan Terlambat, Penetapan Pending, Validasi, Data Ganda, Penumpukan Permohonan, & DB Incomplete
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-ew-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Anomali System Re-Scanned", {
                description: "Pemindaian indikator early warning dan kemacetan layanan telah diperbarui.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-scan Alert
          </ButtonApp>

          <ButtonApp
            id="btn-export-ew-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Warning
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-ew-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-early-warning"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Early Warning"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Alert & Tingkat Anomali Layanan"
          fields={earlyWarningFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Early Warning Diterapkan", {
              description: "Menampilkan analisis indikator warning sesuai parameter severity yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-12 Items 1 to 7 Alert Scorecards)    */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Bottom 4 default white. Clean titles without numbers.          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. Pelayanan melebihi SLA - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-ew-sla"
            variant="clayPurple"
            title="Pelayanan melebihi SLA"
            value="142 Berkas"
            unit="Tenggat Waktu Terlampaui > 5 Hari"
            description="Layanan Mutasi & Pengurangan Terlambat"
            badge="SLA Exceeded"
            trend={{
              value: "+14 Berkas",
              label: "Overdue Minggu Ini",
              isPositive: false,
              direction: "up",
            }}
            icon={<Clock className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah permohonan yang durasi penyelesaiannya telah melampaui batas standar SLA resmi."
          />
        </div>

        {/* 2. Pendataan terlambat - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-ew-pendataan"
            variant="clayBlue"
            title="Pendataan terlambat"
            value="85 Objek"
            unit="Potensi Usaha Baru Belum Terdata"
            description="Pajak Reklame & Resto Tanpa Survey"
            badge="Survey Overdue"
            trend={{
              value: "+5.8%",
              label: "Keterlambatan Survey",
              isPositive: false,
              direction: "up",
            }}
            icon={<AlertTriangle className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah objek pajak potensial baru yang keterlambatan survei pendataan lapangannya melebihi jadwal."
          />
        </div>

        {/* 3. Penetapan belum diterbitkan - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-ew-penetapan"
            variant="clayYellow"
            title="Penetapan belum diterbitkan"
            value="1.240 SKPD"
            unit="Draft SKPD/SPPT Tertahan E-Sign"
            description="Keterlambatan Penandatanganan TTE"
            badge="Pending SKPD"
            trend={{
              value: "+12.4%",
              label: "Penumpukan Draft",
              isPositive: false,
              direction: "up",
            }}
            icon={<FileMinus className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Jumlah ketetapan pajak daerah yang sudah selesai verifikasi tetapi SKPD/SPPT-nya belum resmi diterbitkan."
          />
        </div>

        {/* 4. Validasi belum selesai - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-ew-validasi"
            variant="default"
            title="Validasi belum selesai"
            value="520 NOP"
            unit="NOP PBB Pecah Lahan Unvalidated"
            description="Menunggu Layering Peta Geospasial"
            badge="Validation Lag"
            trend={{
              value: "+8.2%",
              label: "Belum Tervalidasi",
              isPositive: false,
              direction: "up",
            }}
            icon={<Layers className="w-5 h-5 text-purple-600" />}
            infoTooltip="Jumlah data pendaftaran/mutasi objek/subjek yang verifikasi validasi teknisnya belum tuntas."
          />
        </div>

        {/* 5. Data ganda meningkat - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-ew-ganda"
            variant="default"
            title="Data ganda meningkat"
            value="310 Record"
            unit="Terdeteksi NOP / NPWPD Ganda"
            description="Kenaikan +18.4% YoY Akibat Migrasi"
            badge="Duplicate Spike"
            trend={{
              value: "+18.4%",
              label: "Spike Anomali",
              isPositive: false,
              direction: "up",
            }}
            icon={<CopyX className="w-5 h-5 text-rose-600" />}
            infoTooltip="Indikator kenaikan jumlah catatan data ganda (double NOP/NPWPD) yang dapat menimbulkan sengketa ketetapan."
          />
        </div>

        {/* 6. Permohonan menumpuk - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-ew-menumpuk"
            variant="default"
            title="Permohonan menumpuk"
            value="480 Berkas"
            unit="Antrean Keberatan & Pengurangan"
            description="Kapasitas Verifikator Terlampaui 240%"
            badge="Bottleneck Queue"
            trend={{
              value: "+24.1%",
              label: "Penumpukan Queue",
              isPositive: false,
              direction: "up",
            }}
            icon={<BellRing className="w-5 h-5 text-amber-600" />}
            infoTooltip="Kondisi penumpukan berkas permohonan di loket/sistem yang melampaui kapasitas harian tim verifikasi."
          />
        </div>

        {/* 7. Basis data belum lengkap - Default White */}
        <div className="col-span-1 flex flex-col h-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <ScorecardApp
            id="card-score-ew-database"
            variant="default"
            title="Basis data belum lengkap"
            value="890 Record"
            unit="Profil WP Badan Usaha Tanpa NIB/NIK"
            description="Menghambat Integrasi Penagihan & Surat Himbauan E-Tax"
            badge="DB Incomplete"
            trend={{
              value: "-3.5%",
              label: "Progres Lengkap",
              isPositive: true,
              direction: "down",
            }}
            icon={<Database className="w-5 h-5 text-blue-600" />}
            infoTooltip="Jumlah entitas master data Wajib Pajak atau Objek Pajak yang elemen data utamanya belum lengkap."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* LINE CHARTS SECTION FOR ITEMS 5 & 6                           */}
      {/* (BR-12 Visualisasi Items 5 & 6 Line Charts)                   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Item 5 Visualisasi: Data ganda meningkat (Line Chart) */}
        <CardApp id="card-chart-data-ganda-trend" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-ganda" variant="solidRose" size="sm">Anomali Data Ganda</BadgeApp>
              <BadgeApp id="badge-chart-ganda-val" variant="solidPurple" size="sm">Total: 310 Record</BadgeApp>
            </div>
            <TextApp id="title-chart-ganda" variant="h3" weight="bold" className="text-ink-primary">
              5. Tren Peningkatan Data Ganda per Bulan
            </TextApp>
            <TextApp id="sub-chart-ganda" variant="caption" className="text-ink-secondary mb-4">
              Grafik Historis Pertumbuhan NOP & NPWPD Ganda Terdeteksi AI
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-line-data-ganda"
              type="line"
              data={chartDataDataGandaTrend}
              xKey="bulan"
              series={[
                { key: "totalGanda", label: "Total Record Ganda", color: "#dc2626" },
                { key: "gandaPBB", label: "NOP PBB Ganda", color: "#7e22ce" },
                { key: "gandaNPWPD", label: "NPWPD Ganda", color: "#f59e0b" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Item 6 Visualisasi: Permohonan menumpuk (Line Chart) */}
        <CardApp id="card-chart-permohonan-menumpuk-trend" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <BadgeApp id="badge-chart-menumpuk" variant="solidAmber" size="sm">Bottleneck Antrean</BadgeApp>
              <BadgeApp id="badge-chart-menumpuk-val" variant="solidRose" size="sm">480 Berkas Queue</BadgeApp>
            </div>
            <TextApp id="title-chart-menumpuk" variant="h3" weight="bold" className="text-ink-primary">
              6. Tren Penumpukan Permohonan vs Threshold Capacity
            </TextApp>
            <TextApp id="sub-chart-menumpuk" variant="caption" className="text-ink-secondary mb-4">
              Grafik Volume Permohonan Menumpuk Dibanding Batas Toleransi SLA
            </TextApp>
          </div>

          <div className="h-[250px] w-full">
            <ChartApp
              id="chart-line-permohonan-menumpuk"
              type="line"
              data={chartDataPermohonanMenumpukTrend}
              xKey="bulan"
              series={[
                { key: "berkasMenumpuk", label: "Permohonan Menumpuk", color: "#f59e0b" },
                { key: "slaThreshold", label: "Batas Toleransi Safe", color: "#059669" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE: MASTER LIST ANOMALI & EARLY WARNING ACTION LOG    */}
      {/* (BR-12 Visualisasi Items 1, 2, 3, 4, 7 Tables)              */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-early-warning-log" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-ew" variant="solidRose" size="sm">Action Log Emergency</BadgeApp>
              <BadgeApp id="badge-tbl-ew-eskalasi" variant="solidPurple" size="sm">Tindakan Cepat System</BadgeApp>
            </div>
            <TextApp id="title-tbl-ew" variant="h3" weight="bold" className="text-ink-primary">
              Master Table Log Peringatan Dini & Anomali Sistem Layanan
            </TextApp>
            <TextApp id="sub-tbl-ew" variant="caption" className="text-ink-secondary">
              Daftar Temuan Anomali Pelayanan, Sengketa Data, Penetapan Pending, & Status Eskalasi Penanganan
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-early-warning-log"
          data={mockEarlyWarningLog}
          columns={warningColumns}
          searchPlaceholder="Cari Kode Warning, Indikator, Deskripsi, Sektor, atau Severity..."
          pageSize={7}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {selectedWarningItem && (
        <DialogApp
          id="dialog-detail-warning-item"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail Warning Emergency: ${selectedWarningItem.id}`}
          description="Eskalasi darurat, penyebab utama anomali, dan rekomendasi solusi cepat."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Indikator Early Warning:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedWarningItem.kategori}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Severity Level:</span>
                <BadgeApp id="badge-dlg-sev-ew" variant="solidRose" size="sm">{selectedWarningItem.severity}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor & Wilayah:</span>
                <span className="font-medium text-ink-primary">{selectedWarningItem.sektor} ({selectedWarningItem.lokasi})</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Tanggal Deteksi:</span>
                <span className="font-mono font-medium text-vibrant-purple">{selectedWarningItem.tglAnomali}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Anomali System & Potensi Resiko</span>
              </div>
              <p className="text-ink-secondary">
                Deskripsi Peringatan: <span className="font-medium text-ink-primary">{selectedWarningItem.deskripsi}</span>
              </p>
              <p className="text-ink-secondary">
                Dampak Terhadap Layanan / Pendapatan: <span className="font-medium text-rose-600">{selectedWarningItem.dampak}</span>
              </p>
              <p className="text-ink-secondary">
                Rekomendasi Tindakan: <span className="font-medium text-emerald-700 dark:text-emerald-400">{selectedWarningItem.statusTindakan}</span>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-execute-eskalasi-from-dlg"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                onClick={() => {
                  handleExecuteQuickAction(selectedWarningItem.id, selectedWarningItem.kategori);
                  setIsDetailDialogOpen(false);
                }}
              >
                <Zap className="w-3 h-3 mr-1 inline" />
                Eskalasi Darurat Sekarang
              </ButtonApp>

              <ButtonApp
                id="btn-close-detail-ew-dialog"
                variant="secondary"
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

export default EarlyWarningDashboardPage;
