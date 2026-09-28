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
  Calculator,
  Building2,
  TrendingUp,
  Percent,
  CheckCircle2,
  Clock,
  RefreshCw,
  Download,
  Eye,
  Layers,
  Sparkles,
  MapPin,
  CalendarCheck,
  FileSpreadsheet,
  AlertCircle,
  Compass,
} from "lucide-react";

// Filter Field Configuration for BR-14 Penilaian Individu PBB-P2
const pbbIndividualFilterFields = [
  {
    id: "klasifikasiObjekKhusus",
    label: "Klasifikasi Objek Khusus",
    type: "select" as const,
    placeholder: "Pilih Klasifikasi Objek...",
    options: [
      { value: "all", label: "Semua Objek Khusus" },
      { value: "hotel_resort", label: "Hotel & Resort Bintang" },
      { value: "mall_plaza", label: "Pusat Perbelanjaan / Mall / Plaza" },
      { value: "apartemen_kondominium", label: "Apartemen & Kondominium" },
      { value: "pabrik_gudang", label: "Kawasan Industri / Pabrik / Gudang" },
      { value: "rumah_mewah", label: "Hunian Mewah Standar Khusus" },
      { value: "spbu_stasiun", label: "SPBU & Fasilitas Khusus" },
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
    id: "statusPenilaian",
    label: "Status Penilaian Individu",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status Penilaian" },
      { value: "selesai", label: "Selesai Penilaian (LHP Terbit)" },
      { value: "verifikasi", label: "Dalam Proses Verifikasi Tim Penilai" },
      { value: "survey_lapangan", label: "Survei / Measurement Lapangan" },
      { value: "penetapan_sk", label: "Penetapan SK NJOP Individu" },
    ],
  },
  {
    id: "tahunPenilaian",
    label: "Tahun Penilaian",
    type: "select" as const,
    placeholder: "Pilih Tahun...",
    options: [
      { value: "2026", label: "Tahun Penilaian 2026" },
      { value: "2025", label: "Tahun Penilaian 2025" },
      { value: "2024", label: "Tahun Penilaian 2024" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Penilaian Individu 2026", values: { tahunPenilaian: "2026", klasifikasiObjekKhusus: "all" } },
  { label: "Hotel & Mall Mewah", values: { klasifikasiObjekKhusus: "hotel_resort" } },
  { label: "Penilaian Selesai LHP", values: { statusPenilaian: "selesai" } },
  { label: "Penilaian Gondomanan", values: { kecamatan: "gondomanan" } },
];

// Helper Formatter Currency
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

// Item 2 Chart Data: Tren Progres Penilaian Individu PBB-P2 per Bulan (Line Chart: Target vs Realisasi vs Compliance)
const chartDataTrenProgresPenilaian = [
  { bulan: "Jan 2026", targetCumulative: 50, realisasiCumulative: 42, percentComplete: 84.0 },
  { bulan: "Feb 2026", targetCumulative: 110, realisasiCumulative: 98, percentComplete: 89.1 },
  { bulan: "Mar 2026", targetCumulative: 180, realisasiCumulative: 165, percentComplete: 91.6 },
  { bulan: "Apr 2026", targetCumulative: 260, realisasiCumulative: 240, percentComplete: 92.3 },
  { bulan: "Mei 2026", targetCumulative: 340, realisasiCumulative: 318, percentComplete: 93.5 },
  { bulan: "Jun 2026", targetCumulative: 420, realisasiCumulative: 395, percentComplete: 94.0 },
  { bulan: "Jul 2026", targetCumulative: 500, realisasiCumulative: 472, percentComplete: 94.4 },
];

// Item 2 Progress Data per Klasifikasi Objek Khusus (Progress Bar Data)
const progressByKlasifikasi = [
  {
    kategori: "Hotel & Resort Bintang",
    icon: Building2,
    totalTarget: 180,
    selesai: 168,
    inProgress: 12,
    percent: 93.3,
    totalNJOP: "Rp 3,85 Triliun",
  },
  {
    kategori: "Pusat Perbelanjaan / Mall / Plaza",
    icon: Building2,
    totalTarget: 85,
    selesai: 81,
    inProgress: 4,
    percent: 95.3,
    totalNJOP: "Rp 2,45 Triliun",
  },
  {
    kategori: "Apartemen & Kondominium",
    icon: Building2,
    totalTarget: 110,
    selesai: 102,
    inProgress: 8,
    percent: 92.7,
    totalNJOP: "Rp 1,92 Triliun",
  },
  {
    kategori: "Kawasan Industri & Gudang",
    icon: Building2,
    totalTarget: 75,
    selesai: 71,
    inProgress: 4,
    percent: 94.7,
    totalNJOP: "Rp 1,15 Triliun",
  },
  {
    kategori: "Hunian Mewah Standar Khusus",
    icon: Building2,
    totalTarget: 50,
    selesai: 50,
    inProgress: 0,
    percent: 100.0,
    totalNJOP: "Rp 680 Miliar",
  },
];

// Master Table Data: List Penilaian Individu PBB-P2
const mockIndividualPBBList = [
  {
    id: "IND-PBB-2026-001",
    namaObjek: "Hotel Malioboro Grand Plaza",
    nop: "34.71.010.002.015-0088.0",
    pemohonWp: "PT Malioboro Performa Hotel",
    klasifikasi: "Hotel & Resort Bintang",
    njopLamaMassal: 180000000000,
    njopIndividuBaru: 245000000000,
    selisihNJOP: 65000000000,
    potensiKenaikanPBB: 130000000,
    timPenilai: "Tim Appraiser Penilai #1",
    status: "Selesai (LHP Terbit)",
    noLHP: "LHP-IND/PBB/2026/001",
    tglSelesai: "15 Jul 2026",
  },
  {
    id: "IND-PBB-2026-002",
    namaObjek: "Malioboro Fashion Plaza Center",
    nop: "34.71.010.003.011-0012.0",
    pemohonWp: "PT Jogja Retail Utama",
    klasifikasi: "Pusat Perbelanjaan / Mall",
    njopLamaMassal: 310000000000,
    njopIndividuBaru: 412000000000,
    selisihNJOP: 102000000000,
    potensiKenaikanPBB: 204000000,
    timPenilai: "Tim Appraiser Penilai #2",
    status: "Selesai (LHP Terbit)",
    noLHP: "LHP-IND/PBB/2026/004",
    tglSelesai: "18 Jul 2026",
  },
  {
    id: "IND-PBB-2026-003",
    namaObjek: "Royal Heritage Apartment Tugu",
    nop: "34.71.020.005.008-0045.0",
    pemohonWp: "PT Tugu Landmark Propertindo",
    klasifikasi: "Apartemen & Kondominium",
    njopLamaMassal: 125000000000,
    njopIndividuBaru: 168000000000,
    selisihNJOP: 43000000000,
    potensiKenaikanPBB: 86000000,
    timPenilai: "Tim Appraiser Penilai #1",
    status: "Verifikasi Tim",
    noLHP: "-",
    tglSelesai: "Target 05 Aug 2026",
  },
  {
    id: "IND-PBB-2026-004",
    namaObjek: "Kawasan Industri & Logistik Ringroad",
    nop: "34.71.040.009.002-0100.0",
    pemohonWp: "CV Mataram Logistik Express",
    klasifikasi: "Kawasan Industri & Gudang",
    njopLamaMassal: 85000000000,
    njopIndividuBaru: 110000000000,
    selisihNJOP: 25000000000,
    potensiKenaikanPBB: 50000000,
    timPenilai: "Tim Appraiser Penilai #3",
    status: "Survei Lapangan",
    noLHP: "-",
    tglSelesai: "Target 12 Aug 2026",
  },
  {
    id: "IND-PBB-2026-005",
    namaObjek: "Komp. Residence Mewah Cik Di Tiro",
    nop: "34.71.030.001.004-0018.0",
    pemohonWp: "Drs. H. Bambang Soedibyo",
    klasifikasi: "Hunian Mewah Khusus",
    njopLamaMassal: 35000000000,
    njopIndividuBaru: 48000000000,
    selisihNJOP: 13000000000,
    potensiKenaikanPBB: 26000000,
    timPenilai: "Tim Appraiser Penilai #2",
    status: "Selesai (LHP Terbit)",
    noLHP: "LHP-IND/PBB/2026/012",
    tglSelesai: "22 Jul 2026",
  },
];

export function IndividualPBBAssessmentDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal State
  const [selectedIndividualItem, setSelectedIndividualItem] = React.useState<typeof mockIndividualPBBList[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Penilaian Individu Direset", {
      description: "Semua kriteria filter penilaian individu PBB-P2 telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Penilaian Individu Diexport", {
      description: "Berkas PDF/XLSX Laporan & Hasil Penilaian Individu PBB-P2 BR-14 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockIndividualPBBList[0]) => {
    setSelectedIndividualItem(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for Master Table Individual PBB Assessment
  const individualColumns = [
    {
      accessorKey: "id",
      header: "Ref LHP / NOP",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.id}
          </div>
          <div className="text-[10px] text-ink-secondary font-mono">{row.original.nop}</div>
        </div>
      ),
    },
    {
      accessorKey: "namaObjek",
      header: "Nama Objek Pajak & Subjek WP",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.namaObjek}</div>
          <div className="text-[10px] text-ink-secondary">{row.original.pemohonWp}</div>
        </div>
      ),
    },
    {
      accessorKey: "klasifikasi",
      header: "Klasifikasi Objek",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-klas-pbb-${row.original.id}`} variant="solidPurple" size="sm">
          {row.original.klasifikasi}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "njopIndividuBaru",
      header: "NJOP Individu vs Massal",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-ink-primary">
            {formatCurrency(row.original.njopIndividuBaru)}
          </div>
          <div className="text-[10px] text-ink-secondary font-mono">
            Lama Massal: {formatCurrency(row.original.njopLamaMassal)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "potensiKenaikanPBB",
      header: "Delta NJOP & Kenaikan PBB",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
            +{formatCurrency(row.original.potensiKenaikanPBB)}
          </div>
          <div className="text-[10px] text-ink-secondary font-mono">
            Selisih NJOP: {formatCurrency(row.original.selisihNJOP)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Penilaian",
      cell: ({ row }: any) => {
        const val = row.original.status;
        let badgeVariant: any = "solidEmerald";
        if (val.includes("Selesai")) badgeVariant = "solidEmerald";
        if (val.includes("Verifikasi")) badgeVariant = "solidAmber";
        if (val.includes("Survei")) badgeVariant = "blue";

        return <BadgeApp id={`badge-status-ind-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-ind-${row.original.id}`}
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
    <div id="individual-pbb-assessment-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br14" variant="solidPurple" size="sm">
              BR-14 Dashboard Penilaian Individu PBB-P2
            </BadgeApp>
            <BadgeApp id="hdr-badge-appraisal" variant="solidAmber" size="sm">
              <Calculator className="w-3 h-3 mr-1 inline" />
              Individual Valuation Engine
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-ind" variant="solidEmerald" size="sm">
              Progres Penilaian 94.4%
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-ind" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Penilaian Individu PBB-P2 (Objek Khusus)
          </TextApp>
          <TextApp id="hdr-sub-ind" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring Penilaian Individu Objek Komersial/Khusus (Hotel, Mall, Apartemen, Pabrik, & Rumah Mewah) & Progres Penyelesaian LHP
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-ind-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Penilaian Individu Dibarui", {
                description: "Hasil LHP Penilaian Individu, NJOP Baru, & Potensi PBB-P2 telah disinkronkan secara live.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Appraiser
          </ButtonApp>

          <ButtonApp
            id="btn-export-ind-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Penilaian
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-ind-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-penilaian-individu"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Penilaian Individu"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Objek Khusus & Status Appraisal PBB-P2"
          fields={pbbIndividualFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Penilaian Individu Diterapkan", {
              description: "Menampilkan data statistik objek khusus sesuai kriteria filter.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-14 Items 1 & Supporting Metrics)     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Bottom 1 default white card. Clean titles without numbers.    */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. Total Jumlah WP yang dilakukan penilaian individu - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-total-wp-individu"
            variant="clayPurple"
            title="Total WP Penilaian Individu"
            value="500 WP Khusus"
            unit="Hotel, Mall, Apartemen, & Industri"
            description="472 Selesai LHP (94.4%), 28 Dalam Proses"
            badge="Total Individual WP"
            trend={{
              value: "+18.2%",
              label: "Kenaikan Objek Khusus",
              isPositive: true,
              direction: "up",
            }}
            icon={<Building2 className="w-5 h-5 text-white" />}
            infoTooltip="Total jumlah Wajib Pajak / Objek Pajak Khusus PBB-P2 yang dilakukan penilaian individu."
          />
        </div>

        {/* 2. Total NJOP Hasil Penilaian Individu - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-total-njop-individu"
            variant="clayBlue"
            title="Total NJOP Hasil Penilaian"
            value="Rp 10,05 Triliun"
            unit="NJOP Individual Appraisal"
            description="Kenaikan Rp 2.45 Triliun dari NJOP Massal"
            badge="Total NJOP Individu"
            trend={{
              value: "+32.1%",
              label: "Akurasi NJOP Komersial",
              isPositive: true,
              direction: "up",
            }}
            icon={<Calculator className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Total akumulasi NJOP hasil penilaian individu untuk seluruh objek pajak khusus terdaftar."
          />
        </div>

        {/* 3. Estimasi Potensi Kenaikan Pokok PBB-P2 - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-potensi-pbb-individu"
            variant="clayYellow"
            title="Potensi Kenaikan Pokok PBB-P2"
            value="Rp 20,10 Miliar"
            unit="Tambahan Penerimaan PBB-P2"
            description="Optimalisasi Pajak Objek Komersial Kota"
            badge="Potensi Delta PBB"
            trend={{
              value: "+24.5%",
              label: "Pertumbuhan Pokok PBB",
              isPositive: true,
              direction: "up",
            }}
            icon={<TrendingUp className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Estimasi kenaikan pokok penerimaan PBB-P2 yang diperoleh dari hasil penyesuaian NJOP Individu."
          />
        </div>

        {/* 4. Overall Progress Rate Penilaian - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-score-progres-overall-rate"
            variant="default"
            title="Tingkat Penyelesaian LHP"
            value="94.4%"
            unit="472 / 500 Objek Selesai"
            description="Sisa 28 Objek Target Akhir Bulan Ini"
            badge="Completion Rate"
            trend={{
              value: "94.4% Selesai",
              label: "On-Track Milestone",
              isPositive: true,
              direction: "up",
            }}
            icon={<Percent className="w-5 h-5 text-emerald-600" />}
            infoTooltip="Persentase tingkat penyelesaian penulisan LHP & penetapan SK NJOP Penilaian Individu PBB-P2."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ITEM 2: PROGRES PENILAIAN INDIVIDU PBB-P2 (PROGRESS CARDS)   */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-ind-progres-penilaian" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-p2-progres" variant="solidPurple" size="sm">Item 2 Progres Penilaian</BadgeApp>
              <BadgeApp id="badge-p2-status" variant="solidEmerald" size="sm">472 Selesai LHP / 500 Target</BadgeApp>
            </div>
            <TextApp id="title-p2-progres" variant="h3" weight="bold" className="text-ink-primary">
              Progres Penilaian Individu PBB-P2 berdasarkan Klasifikasi Objek Khusus
            </TextApp>
            <TextApp id="sub-p2-progres" variant="caption" className="text-ink-secondary">
              Status Penyelesaian Lapangan, Verifikasi Appraiser, & Total NJOP Hasil Penilaian Individu
            </TextApp>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressByKlasifikasi.map((item, idx) => {
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
                    <span className="font-bold text-xs text-ink-primary">{item.kategori}</span>
                  </div>
                  <BadgeApp id={`badge-p2-percent-${idx}`} variant="solidEmerald" size="sm">
                    {item.percent}%
                  </BadgeApp>
                </div>

                {/* Progress Bar Component */}
                <div className="space-y-1">
                  <div className="w-full bg-hairline-soft rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-vibrant-purple h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-secondary font-mono">
                    <span>Selesai: {item.selesai} Objek</span>
                    <span>Target: {item.totalTarget} Objek</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-hairline-soft">
                  <div className="text-vibrant-purple font-mono font-semibold">
                    NJOP: {item.totalNJOP}
                  </div>
                  <div className="text-amber-700 dark:text-amber-400 font-medium text-right">
                    Proses: {item.inProgress} Objek
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* ITEM 2: LINE CHART TREN PROGRES PENILAIAN PER BULAN           */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-chart-tren-progres-pbb-individu" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-chart-p2-tren" variant="solidPurple" size="sm">Item 2 Chart Progres</BadgeApp>
              <BadgeApp id="badge-chart-p2-val" variant="solidAmber" size="sm">Kumulatif Target vs Realisasi</BadgeApp>
            </div>
            <TextApp id="title-chart-p2-tren" variant="h3" weight="bold" className="text-ink-primary">
              Grafik Tren Progres Penilaian Individu PBB-P2 per Bulan
            </TextApp>
            <TextApp id="sub-chart-p2-tren" variant="caption" className="text-ink-secondary">
              Pertumbuhan Akumulasi Objek Pajak Khusus Selesai Penilaian vs Target Milestone 2026
            </TextApp>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ChartApp
            id="chart-line-progres-penilaian-individu"
            type="line"
            data={chartDataTrenProgresPenilaian}
            xKey="bulan"
            series={[
              { key: "realisasiCumulative", label: "Realisasi Objek Selesai", color: "#7e22ce" },
              { key: "targetCumulative", label: "Target Milestone", color: "#f59e0b" },
            ]}
            showGrid={true}
            showTooltip={true}
            showLegend={true}
          />
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE: MASTER LIST OBJEK PENILAIAN INDIVIDU PBB-P2       */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-individual-pbb" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-ind" variant="solidPurple" size="sm">Master Table Appraiser</BadgeApp>
              <BadgeApp id="badge-tbl-ind-lhp" variant="solidAmber" size="sm">LHP & SK NJOP Individu</BadgeApp>
            </div>
            <TextApp id="title-tbl-ind" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Objek Pajak Penilaian Individu PBB-P2 Real-Time
            </TextApp>
            <TextApp id="sub-tbl-ind" variant="caption" className="text-ink-secondary">
              Rincian NOP, Subjek WP, Klasifikasi Objek Khusus, NJOP Massal vs Individu Baru, & Potensi Kenaikan Pokok
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-individual-pbb"
          data={mockIndividualPBBList}
          columns={individualColumns}
          searchPlaceholder="Cari Ref LHP, NOP, Nama Objek, Pemohon WP, atau Klasifikasi..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {selectedIndividualItem && (
        <DialogApp
          id="dialog-detail-individual-pbb"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail Penilaian Individu: ${selectedIndividualItem.id}`}
          description="Informasi hasil valuation, perbandingan NJOP, potensi PBB-P2, dan tim appraiser."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Objek Pajak:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedIndividualItem.namaObjek}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">NOP PBB-P2:</span>
                <span className="font-mono font-medium text-vibrant-purple">{selectedIndividualItem.nop}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Klasifikasi Objek:</span>
                <BadgeApp id="badge-dlg-klas-ind" variant="solidPurple" size="sm">{selectedIndividualItem.klasifikasi}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Wajib Pajak / Pengelola:</span>
                <span className="font-medium text-ink-primary">{selectedIndividualItem.pemohonWp}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Rincian Hasil Valuation & Kenaikan Pokok PBB-P2</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="text-ink-secondary">
                  NJOP Massal Lama: <span className="font-bold text-ink-primary">{formatCurrency(selectedIndividualItem.njopLamaMassal)}</span>
                </div>
                <div className="text-ink-secondary">
                  NJOP Individu Baru: <span className="font-bold text-vibrant-purple">{formatCurrency(selectedIndividualItem.njopIndividuBaru)}</span>
                </div>
                <div className="text-ink-secondary">
                  Selisih Kenaikan NJOP: <span className="font-bold text-emerald-700 dark:text-emerald-400">+{formatCurrency(selectedIndividualItem.selisihNJOP)}</span>
                </div>
                <div className="text-ink-secondary">
                  Potensi Delta PBB: <span className="font-bold text-emerald-700 dark:text-emerald-400">+{formatCurrency(selectedIndividualItem.potensiKenaikanPBB)}</span>
                </div>
              </div>
              <p className="text-ink-secondary pt-1 border-t border-hairline-soft">
                Tim Appraiser Penilai: <span className="font-medium text-ink-primary">{selectedIndividualItem.timPenilai}</span>
              </p>
              <p className="text-ink-secondary">
                Nomor LHP Penilaian: <span className="font-mono font-bold text-vibrant-purple">{selectedIndividualItem.noLHP}</span>
              </p>
              <p className="text-ink-secondary">
                Status Penilaian: <BadgeApp id="badge-dlg-status-ind" variant="solidEmerald" size="sm">{selectedIndividualItem.status}</BadgeApp>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-ind-dialog"
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

export default IndividualPBBAssessmentDashboardPage;
