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
  MapsApp,
  DialogApp,
  useToastApp,
  MapMarker,
  QuickPreset,
} from "@/packages/design-system";
import {
  FileText,
  MapPin,
  CheckCircle2,
  CheckSquare,
  Map as MapIcon,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Download,
  Flame,
  Layers,
  Eye,
  Crosshair,
} from "lucide-react";

// Filter Field Configuration for BR-03
const pendataanFilterFields = [
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
      { value: "terban", label: "Kecamatan Gondokusuman" },
    ],
  },
  {
    id: "statusPendataan",
    label: "Status Pendataan",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status Pendataan" },
      { value: "terdata", label: "Terdata (NOP Aktif)" },
      { value: "objek_baru", label: "Objek Baru (2026)" },
      { value: "tervalidasi", label: "Validasi Selesai" },
      { value: "survei_lapangan", label: "Survei Lapangan Pending" },
      { value: "uji_petik", label: "Uji Petik Audit" },
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
  { label: "Semua Objek", values: { sektorPajak: "all", statusPendataan: "all" } },
  { label: "Objek Baru 2026", values: { statusPendataan: "objek_baru" } },
  { label: "Validasi Selesai", values: { statusPendataan: "tervalidasi" } },
  { label: "Butuh Survei Lapangan", values: { statusPendataan: "survei_lapangan" } },
];

// Mock Map Markers (Jogja Coordinates)
const mockSpatialMarkers: MapMarker[] = [
  {
    id: "m-1",
    position: [-7.8012, 110.3648],
    title: "NOP 34.71.010.002.015-0 - Malioboro Mall",
    description: "PBJT Makanan & Hiburan - Status Tervalidasi (Survei 14 Jul 2026)",
    color: "purple",
  },
  {
    id: "m-2",
    position: [-7.8085, 110.3629],
    title: "NOP 34.71.020.005.011-0 - Hotel Royal Ambarrukmo Branch",
    description: "PBJT Perhotelan - Objek Baru Terdata (Survei 20 Jul 2026)",
    color: "blue",
  },
  {
    id: "m-3",
    position: [-7.8124, 110.3789],
    title: "NOP 34.71.040.012.003-0 - Resto House of Raminten",
    description: "PBJT Makanan & Minuman - Ground Check Selesai",
    color: "emerald",
  },
  {
    id: "m-4",
    position: [-7.7925, 110.3672],
    title: "NOP 34.71.030.008.022-0 - Reklame LED Simpang Tugu",
    description: "Pajak Reklame Bando - Uji Petik Tim Audit BPKAD",
    color: "amber",
  },
  {
    id: "m-5",
    position: [-7.8210, 110.3812],
    title: "NOP 34.71.050.018.009-0 - Wisma Umbulharjo",
    description: "PBB-P2 Komersial - Objek Baru (Perlu Validasi)",
    color: "red",
  },
];

// Mock Progress Monthly Data
const progressPendataanData = [
  { month: "Jan", target: 12000, realisasi: 11800, objekBaru: 240 },
  { month: "Feb", target: 12500, realisasi: 12450, objekBaru: 280 },
  { month: "Mar", target: 13000, realisasi: 13100, objekBaru: 310 },
  { month: "Apr", target: 13000, realisasi: 12900, objekBaru: 290 },
  { month: "Mei", target: 13500, realisasi: 13800, objekBaru: 350 },
  { month: "Jun", target: 14000, realisasi: 14250, objekBaru: 390 },
  { month: "Jul", target: 14500, realisasi: 14850, objekBaru: 420 },
  { month: "Agt", target: 14500, realisasi: 13900, objekBaru: 310 },
  { month: "Sep", target: 15000, realisasi: 14200, objekBaru: 290 },
  { month: "Okt", target: 15000, realisasi: 13800, objekBaru: 270 },
  { month: "Nov", target: 15500, realisasi: 13200, objekBaru: 230 },
  { month: "Des", target: 16000, realisasi: 12900, objekBaru: 200 },
];

// Ranking Kecamatan Data
const rankingKecamatanData = [
  { name: "Umbulharjo", totalNOP: 22450, tervalidasi: 20100 },
  { name: "Gondokusuman", totalNOP: 18920, tervalidasi: 17200 },
  { name: "Mergangsan", totalNOP: 15400, tervalidasi: 14100 },
  { name: "Danurejan", totalNOP: 14850, tervalidasi: 13200 },
  { name: "Gondomanan", totalNOP: 13900, tervalidasi: 12850 },
  { name: "Jetis", totalNOP: 12600, tervalidasi: 11400 },
  { name: "Mantrijeron", totalNOP: 11200, tervalidasi: 9900 },
  { name: "Kotagede", totalNOP: 10800, tervalidasi: 9600 },
];

// Ranking Kelurahan Data
const rankingKelurahanData = [
  { name: "Sosromenduran", totalNOP: 4850, percentage: 94.2, fill: "#7e22ce" }, // Ungu
  { name: "Suryatmajan", totalNOP: 4210, percentage: 92.8, fill: "#2563eb" },  // Biru
  { name: "Terban", totalNOP: 3950, percentage: 91.5, fill: "#f59e0b" },       // Orange
  { name: "Muja Muju", totalNOP: 3820, percentage: 90.1, fill: "#7e22ce" },    // Ungu
  { name: "Prawirodirjan", totalNOP: 3640, percentage: 89.4, fill: "#2563eb" }, // Biru
  { name: "Bausasran", totalNOP: 3410, percentage: 88.2, fill: "#f59e0b" },    // Orange
  { name: "Ngupasan", totalNOP: 3290, percentage: 87.6, fill: "#7e22ce" },     // Ungu
  { name: "Tahunan", totalNOP: 3120, percentage: 86.0, fill: "#2563eb" },      // Biru
];

// Mock Table Records
const mockPendataanRecords = [
  {
    id: "REC-001",
    nop: "34.71.010.002.015-0",
    namaWajibPajak: "PT Hotel Jogja Utama (Malioboro)",
    sektor: "PBJT Perhotelan",
    kecamatan: "Gondomanan",
    kelurahan: "Ngupasan",
    status: "Tervalidasi",
    tglSurvei: "14 Jul 2026",
    petugas: "Budi Santoso, S.STP",
    ujiPetik: "Ya",
    koordinat: "-7.8012, 110.3648",
  },
  {
    id: "REC-002",
    nop: "34.71.020.005.011-0",
    namaWajibPajak: "CV Kuliner Malioboro Resto",
    sektor: "PBJT Makanan & Minuman",
    kecamatan: "Danurejan",
    kelurahan: "Suryatmajan",
    status: "Objek Baru",
    tglSurvei: "20 Jul 2026",
    petugas: "Rina Wijaya, A.Md",
    ujiPetik: "Tidak",
    koordinat: "-7.8085, 110.3629",
  },
  {
    id: "REC-003",
    nop: "34.71.040.012.003-0",
    namaWajibPajak: "Gedung Komersial Malioboro Plaza",
    sektor: "PBB-P2",
    kecamatan: "Gondomanan",
    kelurahan: "Ngupasan",
    status: "Survei Lapangan",
    tglSurvei: "22 Jul 2026",
    petugas: "Eko Prasetyo",
    ujiPetik: "Tidak",
    koordinat: "-7.8124, 110.3789",
  },
  {
    id: "REC-004",
    nop: "34.71.030.008.022-0",
    namaWajibPajak: "Billboard LED Simpang Tugu Jogja",
    sektor: "Pajak Reklame",
    kecamatan: "Jetis",
    kelurahan: "Gowongan",
    status: "Uji Petik",
    tglSurvei: "18 Jul 2026",
    petugas: "Tim Audit BPKAD",
    ujiPetik: "Ya",
    koordinat: "-7.7925, 110.3672",
  },
  {
    id: "REC-005",
    nop: "34.71.050.018.009-0",
    namaWajibPajak: "Wisma Dewaruci Umbulharjo",
    sektor: "PAT (Air Tanah)",
    kecamatan: "Umbulharjo",
    kelurahan: "Muja Muju",
    status: "Terdata",
    tglSurvei: "10 Jul 2026",
    petugas: "Agus Setiawan",
    ujiPetik: "Tidak",
    koordinat: "-7.8210, 110.3812",
  },
];

export function DataCollectionDashboardPage() {
  const { toast } = useToastApp();

  // Active Map View Mode
  const [mapViewMode, setMapViewMode] = React.useState<"markers" | "heatmap" | "boundary">("markers");
  
  // Selected Detail Record for Dialog
  const [selectedRecord, setSelectedRecord] = React.useState<typeof mockPendataanRecords[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Active Filters state
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Direset", {
      description: "Semua kriteria filter pendataan telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Pendataan Diexport", {
      description: "Berkas PDF/XLSX Rekapitulasi Pendataan Objek Pajak BR-03 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockPendataanRecords[0]) => {
    setSelectedRecord(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for DataTableApp
  const tableColumns = [
    {
      accessorKey: "nop",
      header: "Nomor Objek Pajak (NOP)",
      cell: ({ row }: any) => (
        <div className="font-mono text-xs font-bold text-vibrant-purple">
          {row.original.nop}
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
      accessorKey: "sektor",
      header: "Sektor Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-${row.original.id}`} variant="solidPurple" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "kecamatan",
      header: "Kecamatan / Kelurahan",
      cell: ({ row }: any) => (
        <div className="text-xs text-ink-secondary">
          {row.original.kecamatan} ({row.original.kelurahan})
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Pendataan",
      cell: ({ row }: any) => {
        const val = row.original.status;
        let badgeVariant: any = "solidPurple";
        if (val === "Objek Baru") badgeVariant = "blue";
        if (val === "Tervalidasi") badgeVariant = "solidEmerald";
        if (val === "Survei Lapangan") badgeVariant = "solidAmber";
        if (val === "Uji Petik") badgeVariant = "solidPurple";

        return <BadgeApp id={`badge-status-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      accessorKey: "tglSurvei",
      header: "Tgl Survei",
      cell: ({ row }: any) => (
        <div className="text-xs font-mono text-ink-secondary">{row.original.tglSurvei}</div>
      ),
    },
    {
      accessorKey: "petugas",
      header: "Petugas Lapangan",
      cell: ({ row }: any) => (
        <div className="text-xs text-ink-primary">{row.original.petugas}</div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-nop-${row.original.id}`}
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
    <div id="pendataan-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br03" variant="solidPurple" size="sm">
              BR-03 Dashboard Pendataan
            </BadgeApp>
            <BadgeApp id="hdr-badge-gis" variant="solidAmber" size="sm">
              <MapPin className="w-3 h-3 mr-1 inline" />
              GIS Spasial Yogyakarta
            </BadgeApp>
            <BadgeApp id="hdr-badge-tahun" variant="solidEmerald" size="sm">
              Tahun Anggaran 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-pendataan" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Pendataan Objek Pajak
          </TextApp>
          <TextApp id="hdr-sub-pendataan" variant="caption" className="text-ink-secondary mt-0.5">
            Integrasi Pemetaan Spasial, Registrasi Objek Baru, Validasi Lapangan, & Analysis Uji Petik
          </TextApp>
        </div>

        {/* Action Header Buttons with variant="purpleDark" and rounded="pill" */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-pendataan-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Disinkronisasi", {
                description: "Map GIS dan database pendataan NOP telah diperbarui secara live.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </ButtonApp>

          <ButtonApp
            id="btn-export-pendataan-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Pendataan
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-pendataan-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-pendataan-objek"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Pendataan"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Objek Pajak & Wilayah Pendataan"
          fields={pendataanFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Pendataan Berhasil Diterapkan", {
              description: "Menampilkan data pendataan objek pajak berdasarkan kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-03 Items 1 to 6)                     */}
      {/* Rules: Top 3 colored side-by-side; remainder default white.   */}
      {/* Clean titles without prefixed numbers.                        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. Jumlah Objek Pajak Terdata - Purple Clay */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-objek-pajak-terdata"
            variant="clayPurple"
            title="Jumlah Objek Pajak Terdata"
            value="148.520"
            unit="NOP Terdaftar"
            description="Total Objek Pajak Daerah Kota Yogyakarta"
            badge="Target 155.000"
            trend={{
              value: "+8.2%",
              label: "Pertumbuhan YTD",
              isPositive: true,
              direction: "up",
            }}
            icon={<FileText className="w-5 h-5 text-white" />}
            infoTooltip="Jumlah seluruh Objek Pajak (NOP) yang telah masuk dalam master database BPKAD."
          />
        </div>

        {/* 2. Jumlah Objek Baru - Blue Clay */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-objek-baru"
            variant="clayBlue"
            title="Jumlah Objek Baru"
            value="3.240"
            unit="NOP Baru 2026"
            description="Penambahan dari hasil pendataan aktif"
            badge="Registrasi 2026"
            trend={{
              value: "+12.4%",
              label: "Dibanding 2025",
              isPositive: true,
              direction: "up",
            }}
            icon={<Sparkles className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="NOP baru yang terdaftar hasil pendataan mandiri dan survei wilayah."
          />
        </div>

        {/* 3. Jumlah Validasi - Yellow Clay */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-validasi"
            variant="clayYellow"
            title="Jumlah Validasi"
            value="14.890"
            unit="Berkas Validated"
            description="Tervalidasi oleh Petugas & Tim Evaluasi"
            badge="Tim Validasi"
            trend={{
              value: "+15.1%",
              label: "Laju Validasi",
              isPositive: true,
              direction: "up",
            }}
            icon={<CheckCircle2 className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Berkas pendataan yang telah lulus pemeriksaan administratif dan data teknis."
          />
        </div>

        {/* 4. Jumlah Survei Lapangan - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-survei-lapangan"
            variant="default"
            title="Jumlah Survei Lapangan"
            value="1.850"
            unit="Titik Field Check"
            description="Pemeriksaan fisik & koordinat lokasi NOP"
            badge="Geotagging GIS"
            trend={{
              value: "+5.8%",
              label: "Bulan Berjalan",
              isPositive: true,
              direction: "up",
            }}
            icon={<MapPin className="w-5 h-5 text-purple-600" />}
            infoTooltip="Hasil peninjauan lapangan langsung oleh tim surveyor BPKAD dengan tagging koordinat."
          />
        </div>

        {/* 5. Jumlah Uji Petik - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-uji-petik"
            variant="default"
            title="Jumlah Uji Petik"
            value="620"
            unit="Sample Potensi"
            description="Sampling verifikasi omzet & luas tanah/bangunan"
            badge="Audit BPKAD"
            trend={{
              value: "+4.2%",
              label: "Target 700 Sample",
              isPositive: true,
              direction: "up",
            }}
            icon={<CheckSquare className="w-5 h-5 text-amber-500" />}
            infoTooltip="Prosedur uji petik audit untuk memastikan kesesuaian omzet nyata dengan data pelaporan."
          />
        </div>

        {/* 6. Persentase Penyelesaian Pendataan - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3 flex flex-col h-full">
          <ScorecardApp
            id="card-persentase-penyelesaian"
            variant="default"
            title="Persentase Penyelesaian Pendataan"
            value="88.4%"
            unit="Penyelesaian Target 2026"
            description="Capaian 131.291 dari 148.520 NOP Terdata"
            badge="On Schedule"
            progress={{
              value: 88.4,
              max: 100,
              label: "Capaian Target",
              color: "#7e22ce",
            }}
            trend={{
              value: "+3.2%",
              label: "Kenaikan Bulan Ini",
              isPositive: true,
              direction: "up",
            }}
            icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
            infoTooltip="Rasio Objek Pajak yang telah selesai dipetakan, divalidasi, dan dimasukkan ke SIMPAD."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAPS & SPATIAL HEATMAP (BR-03 Items 7 & 8)                     */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-map-sebaran-heatmap" className="p-5 border-hairline-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-gis-map" variant="solidPurple" size="sm">
                <MapIcon className="w-3 h-3 mr-1 inline" />
                GIS Map System
              </BadgeApp>
              <BadgeApp id="badge-city-jogja" variant="solidAmber" size="sm">
                Kota Yogyakarta
              </BadgeApp>
            </div>
            <TextApp id="title-map-section" variant="h3" weight="bold" className="text-ink-primary">
              Sebaran Objek Pajak & Heatmap Spasial
            </TextApp>
            <TextApp id="sub-map-section" variant="caption" className="text-ink-secondary">
              Pemetaan Geospasial Titik NOP, Tingkat Kepadatan Objek Pajak, & Ground Check Lapangan
            </TextApp>
          </div>

          {/* Map View Mode Controls */}
          <div className="flex items-center gap-1.5 bg-surface-subtle p-1 rounded-full border border-hairline-soft">
            <button
              onClick={() => setMapViewMode("markers")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mapViewMode === "markers"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 inline mr-1" />
              Sebaran Objek
            </button>
            <button
              onClick={() => setMapViewMode("heatmap")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mapViewMode === "heatmap"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Flame className="w-3.5 h-3.5 inline mr-1" />
              Heatmap Kepadatan
            </button>
            <button
              onClick={() => setMapViewMode("boundary")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mapViewMode === "boundary"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1" />
              Batas Kecamatan
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden border border-hairline-soft h-[420px]">
          <MapsApp
            id="map-pendataan-spasial"
            center={[-7.7956, 110.3695]}
            zoom={13}
            markers={mapViewMode === "heatmap" ? [] : mockSpatialMarkers}
            tileProvider="openstreetmap"
            showControls={true}
            className="w-full h-full"
          />

          {/* Overlay Legend */}
          <div className="absolute bottom-4 left-4 z-[400] bg-surface-card/95 backdrop-blur-md p-3 rounded-lg border border-hairline-soft shadow-md max-w-xs text-xs space-y-1.5">
            <div className="font-semibold text-ink-primary text-xs flex items-center justify-between">
              <span>Legenda Spasial</span>
              <BadgeApp id="badge-map-mode" variant="solidAmber" size="sm">{mapViewMode.toUpperCase()}</BadgeApp>
            </div>
            {mapViewMode === "markers" && (
              <div className="space-y-1 text-[11px] text-ink-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span>Tervalidasi Selesai</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Objek Baru 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>Ground Check Field</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Sampel Uji Petik</span>
                </div>
              </div>
            )}
            {mapViewMode === "heatmap" && (
              <div className="space-y-1 text-[11px] text-ink-secondary">
                <div className="flex items-center justify-between">
                  <span>Kepadatan Rendah</span>
                  <span>Kepadatan Tinggi</span>
                </div>
                <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-rose-600 w-full" />
                <p className="text-[10px] text-ink-secondary">Klaster tertinggi: Kawasan Malioboro & Umbulharjo</p>
              </div>
            )}
            {mapViewMode === "boundary" && (
              <div className="space-y-1 text-[11px] text-ink-secondary">
                <p>Menampilkan 14 Polygon Batas Administrasi Kecamatan di Kota Yogyakarta.</p>
              </div>
            )}
          </div>
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION (BR-03 Items 9, 10, 11)                        */}
      {/* Clean titles, thick bars for ranking charts                   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Item 9: Progress Pendataan Bulanan */}
        <div className="lg:col-span-1 flex flex-col">
          <CardApp id="card-chart-progress-pendataan" className="p-5 border-hairline-soft h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TextApp id="title-chart-progress" variant="h4" weight="bold" className="text-ink-primary">
                  Progress Pendataan Bulanan
                </TextApp>
                <BadgeApp id="badge-chart-progress" variant="solidPurple" size="sm">Jan - Des 2026</BadgeApp>
              </div>
              <TextApp id="sub-chart-progress" variant="caption" className="text-ink-secondary mb-4">
                Perbandingan Target vs Realisasi Pendataan NOP
              </TextApp>
            </div>

            <div className="h-[280px] w-full">
              <ChartApp
                id="chart-progress-pendataan"
                type="area"
                data={progressPendataanData}
                xKey="month"
                series={[
                  { key: "target", label: "Target NOP", color: "#2563eb" },
                  { key: "realisasi", label: "Realisasi NOP", color: "#7e22ce" },
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={true}
              />
            </div>
          </CardApp>
        </div>

        {/* Item 10: Ranking Kecamatan (Thick bars) */}
        <div className="lg:col-span-1 flex flex-col">
          <CardApp id="card-chart-ranking-kecamatan" className="p-5 border-hairline-soft h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TextApp id="title-chart-kecamatan" variant="h4" weight="bold" className="text-ink-primary">
                  Ranking Kecamatan
                </TextApp>
                <BadgeApp id="badge-chart-kecamatan" variant="solidAmber" size="sm">Volume NOP</BadgeApp>
              </div>
              <TextApp id="sub-chart-kecamatan" variant="caption" className="text-ink-secondary mb-4">
                Kecamatan dengan Jumlah Objek Pajak Terdata
              </TextApp>
            </div>

            <div className="h-[280px] w-full">
              <ChartApp
                id="chart-ranking-kecamatan"
                type="bar"
                data={rankingKecamatanData}
                xKey="name"
                barSize={24}
                series={[
                  { key: "totalNOP", label: "Total NOP", color: "#7e22ce" },
                  { key: "tervalidasi", label: "Tervalidasi", color: "#f59e0b" },
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={true}
              />
            </div>
          </CardApp>
        </div>

        {/* Item 11: Ranking Kelurahan (Thick bars) */}
        <div className="lg:col-span-1 flex flex-col">
          <CardApp id="card-chart-ranking-kelurahan" className="p-5 border-hairline-soft h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TextApp id="title-chart-kelurahan" variant="h4" weight="bold" className="text-ink-primary">
                  Ranking Kelurahan
                </TextApp>
                <BadgeApp id="badge-chart-kelurahan" variant="solidAmber" size="sm">% Penyelesaian</BadgeApp>
              </div>
              <TextApp id="sub-chart-kelurahan" variant="caption" className="text-ink-secondary mb-4">
                Top Kelurahan dengan Capaian Pendataan Tertinggi
              </TextApp>
            </div>

            <div className="h-[280px] w-full">
              <ChartApp
                id="chart-ranking-kelurahan"
                type="bar"
                data={rankingKelurahanData}
                xKey="name"
                barSize={24}
                series={[
                  { key: "totalNOP", label: "Jumlah NOP", color: "#7e22ce" },
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={false}
              />
            </div>
          </CardApp>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE REKAPITULASI OBJEK PAJAK                           */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-pendataan-objek" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-master" variant="solidPurple" size="sm">Data Master NOP</BadgeApp>
              <BadgeApp id="badge-tbl-recent" variant="solidAmber" size="sm">5 Record Terbaru</BadgeApp>
            </div>
            <TextApp id="title-tbl-nop" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Objek Pajak Hasil Pendataan & Ground Check
            </TextApp>
            <TextApp id="sub-tbl-nop" variant="caption" className="text-ink-secondary">
              Detail Rekam Pendataan Objek Pajak, Koordinat GIS, Status Validasi, & Tim Field Check
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-pendataan-objek"
          data={mockPendataanRecords}
          columns={tableColumns}
          searchPlaceholder="Cari NOP, Wajib Pajak, Petugas, atau Kelurahan..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL (Portalled by DialogApp)                   */}
      {/* ------------------------------------------------------------- */}
      {selectedRecord && (
        <DialogApp
          id="dialog-detail-pendataan-nop"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Detail Objek Pajak: ${selectedRecord.nop}`}
          description="Informasi hasil pendataan geospasial dan status verifikasi lapangan."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Wajib Pajak:</span>
                <span className="font-bold text-ink-primary">{selectedRecord.namaWajibPajak}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor Pajak:</span>
                <BadgeApp id="badge-dlg-sektor" variant="solidPurple" size="sm">{selectedRecord.sektor}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Wilayah Administratif:</span>
                <span className="font-medium text-ink-primary">Kec. {selectedRecord.kecamatan}, Kel. {selectedRecord.kelurahan}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Status Pendataan:</span>
                <BadgeApp id="badge-dlg-status" variant="solidEmerald" size="sm">{selectedRecord.status}</BadgeApp>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-vibrant-purple" />
                <span>Geotagging Spasial GIS</span>
              </div>
              <p className="text-ink-secondary font-mono">
                Koordinat Lat/Lng: <span className="text-ink-primary font-bold">{selectedRecord.koordinat}</span>
              </p>
              <p className="text-ink-secondary">
                Petugas Field Check: <span className="text-ink-primary font-medium">{selectedRecord.petugas}</span> ({selectedRecord.tglSurvei})
              </p>
              <p className="text-ink-secondary">
                Status Sampling Uji Petik: <span className="font-semibold text-purple-700">{selectedRecord.ujiPetik}</span>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-dialog"
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

export default DataCollectionDashboardPage;
