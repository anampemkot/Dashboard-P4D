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
  MapPin,
  Users,
  Building2,
  Flame,
  AlertCircle,
  Crosshair,
  Layers,
  RefreshCw,
  Download,
  Eye,
  TrendingUp,
  Map as MapIcon,
  Search,
  Filter,
  Navigation,
  Sparkles,
  Compass,
} from "lucide-react";

// Filter Field Configuration for BR-07 GIS
const gisFilterFields = [
  {
    id: "sektorPajak",
    label: "Sektor Pajak Spasial",
    type: "select" as const,
    placeholder: "Pilih Sektor Pajak...",
    options: [
      { value: "all", label: "Semua Sektor Pajak" },
      { value: "pbb_p2", label: "PBB-P2 (Pedesaan & Perkotaan)" },
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
    id: "gisLayer",
    label: "Layer Peta GIS",
    type: "select" as const,
    placeholder: "Pilih Layer GIS...",
    options: [
      { value: "objek_pajak", label: "Sebaran Objek Pajak (NOP)" },
      { value: "wajib_pajak", label: "Sebaran Wajib Pajak (WP)" },
      { value: "potensi_heatmap", label: "Potensi Pajak (Heatmap)" },
      { value: "belum_terdata", label: "Wilayah Belum Terdata" },
      { value: "prioritas", label: "Wilayah Prioritas Pendataan" },
    ],
  },
  {
    id: "statusMapping",
    label: "Status Geotagging",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status Geotagging" },
      { value: "terkoordinat", label: "Terkoordinat Presisi GPS" },
      { value: "perlu_survey", label: "Memerlukan Survey Drone/Uji Petik" },
      { value: "unmapped", label: "Belum Punya Koordinat GPS" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Layer GIS", values: { gisLayer: "objek_pajak", statusMapping: "all" } },
  { label: "Heatmap Potensi Malioboro", values: { gisLayer: "potensi_heatmap", kecamatan: "gondomanan" } },
  { label: "Wilayah Belum Terdata", values: { gisLayer: "belum_terdata" } },
  { label: "Prioritas Pendataan 2026", values: { gisLayer: "prioritas" } },
];

// Mock Map Markers for different GIS Layers
const mockGISMarkers: Record<string, MapMarker[]> = {
  objek_pajak: [
    {
      id: "op-1",
      position: [-7.7926, 110.3658],
      title: "NOP PBB-P2: Mall Malioboro Plaza",
      description: "Sektor: PBB-P2 | Potensi: Rp 1.450.000.000/thn | Status: Terkoordinat Valid",
      color: "purple",
    },
    {
      id: "op-2",
      position: [-7.7972, 110.3688],
      title: "NOP PBJT: Resto Rasa Malioboro",
      description: "Sektor: PBJT Makanan | Potensi: Rp 320.000.000/thn | Status: Terkoordinat Valid",
      color: "blue",
    },
    {
      id: "op-3",
      position: [-7.7828, 110.3671],
      title: "NOP Reklame: Videotron Simpang Tugu",
      description: "Sektor: Pajak Reklame | Potensi: Rp 180.000.000/thn | Status: Terkoordinat Valid",
      color: "amber",
    },
    {
      id: "op-4",
      position: [-7.8122, 110.3639],
      title: "NOP PBJT: Boutique Hotel Prawirotaman",
      description: "Sektor: PBJT Hotel | Potensi: Rp 450.000.000/thn | Status: Terkoordinat Valid",
      color: "emerald",
    },
    {
      id: "op-5",
      position: [-7.7911, 110.3802],
      title: "NOP Air Tanah: Commercial Complex Terban",
      description: "Sektor: Air Tanah | Potensi: Rp 85.000.000/thn | Status: Terkoordinat Valid",
      color: "blue",
    },
  ],
  wajib_pajak: [
    {
      id: "wp-1",
      position: [-7.7932, 110.3662],
      title: "WP Badan: PT Malioboro Sentosa",
      description: "NPWPD: P.2.0031204.01.12 | Pemilik: Sugiarto | Status: WP Aktif",
      color: "blue",
    },
    {
      id: "wp-2",
      position: [-7.7980, 110.3695],
      title: "WP Perorangan: Toko Batik Jogja Asli",
      description: "NPWPD: P.1.0089123.04.10 | Pemilik: H. Suryono | Status: WP Aktif",
      color: "blue",
    },
    {
      id: "wp-3",
      position: [-7.7840, 110.3685],
      title: "WP Badan: PT Mediatron Advertising",
      description: "NPWPD: P.2.0045192.05.14 | Pemilik: Budi Karya | Status: WP Aktif",
      color: "blue",
    },
  ],
  potensi_heatmap: [
    {
      id: "pot-1",
      position: [-7.7956, 110.3695],
      title: "Zona Malioboro (Density High)",
      description: "Estimasi Potensi Pajak: Rp 120,5 M | Kepadatan: Sangat Tinggi",
      color: "red",
    },
    {
      id: "pot-2",
      position: [-7.7830, 110.3670],
      title: "Zona Tugu - Diponegoro",
      description: "Estimasi Potensi Pajak: Rp 68,2 M | Kepadatan: Tinggi",
      color: "amber",
    },
    {
      id: "pot-3",
      position: [-7.8130, 110.3640],
      title: "Zona Prawirotaman Tourist Hub",
      description: "Estimasi Potensi Pajak: Rp 45,8 M | Kepadatan: Sedang - Tinggi",
      color: "amber",
    },
  ],
  belum_terdata: [
    {
      id: "unmapped-1",
      position: [-7.8010, 110.3820],
      title: "Wilayah Belum Terdata: Umbulharjo Selatan",
      description: "Estimasi 420 NOP Belum Terkoordinat | Potensi Tersembunyi: Rp 8,5 M",
      color: "red",
    },
    {
      id: "unmapped-2",
      position: [-7.8150, 110.3950],
      title: "Wilayah Belum Terdata: Kotagede Kawasan Industri",
      description: "Estimasi 310 Objek Usaha Baru | Potensi Tersembunyi: Rp 6,2 M",
      color: "red",
    },
  ],
  prioritas: [
    {
      id: "prio-1",
      position: [-7.7950, 110.3680],
      title: "Prioritas 1: Koridor Bisnis Malioboro-Gondomanan",
      description: "Target Audit GIS: 580 NOP PBJT & Reklame | Skor Prioritas: 98.5/100",
      color: "purple",
    },
    {
      id: "prio-2",
      position: [-7.7890, 110.3750],
      title: "Prioritas 2: Danurejan - Stasiun Lempuyangan",
      description: "Target Audit GIS: 410 NOP Parkir & Resto | Skor Prioritas: 92.0/100",
      color: "purple",
    },
  ],
};

// Chart Data 1: Potensi Pajak Spasial per Kecamatan (Bar Chart)
const potensiPajakByKecamatan = [
  { kecamatan: "Gondomanan", realisasi: 98.4, potensiGIS: 112.5, selisih: 14.1 },
  { kecamatan: "Danurejan", realisasi: 64.2, potensiGIS: 72.8, selisih: 8.6 },
  { kecamatan: "Jetis", realisasi: 52.8, potensiGIS: 58.9, selisih: 6.1 },
  { kecamatan: "Gondokusuman", realisasi: 78.5, potensiGIS: 88.0, selisih: 9.5 },
  { kecamatan: "Umbulharjo", realisasi: 42.1, potensiGIS: 51.4, selisih: 9.3 },
  { kecamatan: "Mantrijeron", realisasi: 35.0, potensiGIS: 41.2, selisih: 6.2 },
  { kecamatan: "Kotagede", realisasi: 28.6, potensiGIS: 34.8, selisih: 6.2 },
];

// Table Data: Wilayah Prioritas Pendataan (Table)
const mockPrioritasWilayah = [
  {
    id: "PR-01",
    wilayah: "Kecamatan Gondomanan",
    kelurahan: "Ngupasan & Prawirodirjan",
    sektorUtama: "PBJT Makanan, Hotel, & Reklame",
    estNOPUnmapped: "185 NOP",
    potensiTambahan: "Rp 14,1 Miliar",
    skorPrioritas: "98.5 / 100",
    tingkatPrioritas: "High Priority",
    statusTim: "Tim Survei Lapangan Active",
  },
  {
    id: "PR-02",
    wilayah: "Kecamatan Danurejan",
    kelurahan: "Bausasran & Suryatmajan",
    sektorUtama: "PBB-P2 & PBJT Parkir",
    estNOPUnmapped: "240 NOP",
    potensiTambahan: "Rp 8,6 Miliar",
    skorPrioritas: "92.0 / 100",
    tingkatPrioritas: "High Priority",
    statusTim: "Jadwal Drone Mapping",
  },
  {
    id: "PR-03",
    wilayah: "Kecamatan Umbulharjo",
    kelurahan: "Giwangan & Sorosutan",
    sektorUtama: "PBB-P2 & Air Tanah",
    estNOPUnmapped: "420 NOP",
    potensiTambahan: "Rp 9,3 Miliar",
    skorPrioritas: "89.5 / 100",
    tingkatPrioritas: "Medium High",
    statusTim: "Penugasan Petugas Lapangan",
  },
  {
    id: "PR-04",
    wilayah: "Kecamatan Gondokusuman",
    kelurahan: "Terban & Demangan",
    sektorUtama: "PBJT Cafe / Resto & Kos",
    estNOPUnmapped: "310 NOP",
    potensiTambahan: "Rp 9,5 Miliar",
    skorPrioritas: "88.2 / 100",
    tingkatPrioritas: "Medium High",
    statusTim: "Dalam Verifikasi Data",
  },
  {
    id: "PR-05",
    wilayah: "Kecamatan Mantrijeron",
    kelurahan: "Suryodiningratan",
    sektorUtama: "PBJT Hotel & Cafe Tourism",
    estNOPUnmapped: "190 NOP",
    potensiTambahan: "Rp 6,2 Miliar",
    skorPrioritas: "84.0 / 100",
    tingkatPrioritas: "Medium Priority",
    statusTim: "Penjadwalan Survei",
  },
];

export function GISDashboardPage() {
  const { toast } = useToastApp();

  // Active Map Mode Tab State
  const [activeLayerMode, setActiveLayerMode] = React.useState<string>("objek_pajak");

  // Detail Modal Dialog State
  const [selectedWilayah, setSelectedWilayah] = React.useState<typeof mockPrioritasWilayah[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);

  // Active Filter State
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter GIS Direset", {
      description: "Semua kriteria filter spasial peta telah dikembalikan ke kondisi awal.",
    });
  };

  const handleExportGIS = () => {
    toast.success("Peta GIS & Data Spasial Diexport", {
      description: "File Shapefile/GeoJSON & Laporan Pemetaan GIS BR-07 berhasil diunduh.",
    });
  };

  const handleOpenDetailModal = (record: typeof mockPrioritasWilayah[0]) => {
    setSelectedWilayah(record);
    setIsDetailDialogOpen(true);
  };

  // Columns for Wilayah Prioritas Table
  const tableColumns = [
    {
      accessorKey: "wilayah",
      header: "Wilayah Kecamatan / Kelurahan",
      cell: ({ row }: any) => (
        <div>
          <div className="font-bold text-xs text-ink-primary">
            {row.original.wilayah}
          </div>
          <div className="text-[10px] text-ink-secondary">Kel. {row.original.kelurahan}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektorUtama",
      header: "Sektor Dominan",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-prio-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektorUtama}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "estNOPUnmapped",
      header: "Est. Unmapped NOP",
      cell: ({ row }: any) => (
        <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
          {row.original.estNOPUnmapped}
        </span>
      ),
    },
    {
      accessorKey: "potensiTambahan",
      header: "Potensi Tambahan",
      cell: ({ row }: any) => (
        <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
          {row.original.potensiTambahan}
        </span>
      ),
    },
    {
      accessorKey: "skorPrioritas",
      header: "Skor Prioritas",
      cell: ({ row }: any) => (
        <span className="font-mono font-bold text-xs text-vibrant-purple">
          {row.original.skorPrioritas}
        </span>
      ),
    },
    {
      accessorKey: "tingkatPrioritas",
      header: "Tingkat Prioritas",
      cell: ({ row }: any) => {
        const val = row.original.tingkatPrioritas;
        let badgeVariant: any = "solidRose";
        if (val === "High Priority") badgeVariant = "solidRose";
        if (val === "Medium High") badgeVariant = "solidAmber";
        if (val === "Medium Priority") badgeVariant = "blue";

        return <BadgeApp id={`badge-prio-lvl-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-prio-${row.original.id}`}
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
    <div id="gis-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br07" variant="solidPurple" size="sm">
              BR-07 Dashboard GIS
            </BadgeApp>
            <BadgeApp id="hdr-badge-spasial" variant="solidAmber" size="sm">
              <MapIcon className="w-3 h-3 mr-1 inline" />
              Sistem Geospatial Pajak Daerah
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-gis" variant="solidEmerald" size="sm">
              Yogyakarta Spatial 2026
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-gis" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Pemetaan GIS & Potensi Pajak Daerah
          </TextApp>
          <TextApp id="hdr-sub-gis" variant="caption" className="text-ink-secondary mt-0.5">
            Visualisasi Spasial Sebaran Objek Pajak, Wajib Pajak, Heatmap Potensi, Wilayah Belum Terdata, & Prioritas Pendataan
          </TextApp>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-gis-layers"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Layer GIS Disinkronkan", {
                description: "Map tiles dan koordinat GPS Objek Pajak berhasil diperbarui dari Server GIS.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Map
          </ButtonApp>

          <ButtonApp
            id="btn-export-gis-data"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportGIS}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Peta & GeoJSON
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-gis-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-gis-spasial"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Spasial GIS"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Layer Geospasial & Wilayah Pajak"
          fields={gisFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter GIS Berhasil Diterapkan", {
              description: "Menampilkan titik koordinat dan zona peta sesuai kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-07 Items 1 to 5)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Remainder default white. Clean titles without numbers.        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. Sebaran Objek Pajak - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-sebaran-objek-pajak"
            variant="clayPurple"
            title="Sebaran Objek Pajak"
            value="148.250"
            unit="NOP Terkoordinat GIS"
            description="Geotagging NOP PBB, PBJT, Reklame, & PAT"
            badge="Master GIS OP"
            trend={{
              value: "+11.2%",
              label: "Geotagging YoY",
              isPositive: true,
              direction: "up",
            }}
            icon={<Building2 className="w-5 h-5 text-white" />}
            infoTooltip="Total Objek Pajak yang telah dipeta dan dipasangi titik koordinat presisi GPS."
          />
        </div>

        {/* 2. Sebaran WP - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-sebaran-wp"
            variant="clayBlue"
            title="Sebaran WP"
            value="34.090"
            unit="Wajib Pajak Tervalidasi Spasial"
            description="Titik Lokasi Usaha & Domisili WP Terdata"
            badge="Master GIS WP"
            trend={{
              value: "+8.5%",
              label: "Validasi Alamat",
              isPositive: true,
              direction: "up",
            }}
            icon={<Users className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah Subjek/Wajib Pajak yang telah terpetakan lokasi fisik usahanya."
          />
        </div>

        {/* 3. Potensi Pajak - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-potensi-pajak-gis"
            variant="clayYellow"
            title="Potensi Pajak"
            value="Rp 485,2 M"
            unit="Estimasi Potensi GIS"
            description="Kalkulasi Spasial Berdasarkan Zona Kepadatan Usaha"
            badge="Estimasi Spasial"
            trend={{
              value: "+12.8%",
              label: "Potensi Teridentifikasi",
              isPositive: true,
              direction: "up",
            }}
            icon={<Flame className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Estimasi total potensi penerimaan pajak berdasarkan overlay data spasial dan aktivitas bisnis."
          />
        </div>

        {/* 4. Wilayah Belum Terdata - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-wilayah-belum-terdata"
            variant="default"
            title="Wilayah Belum Terdata"
            value="1.840 NOP"
            unit="Area Unmapped / Unverified"
            description="Kawasan Komersial Belum Terjangkau Survey"
            badge="Perlu Mapping"
            trend={{
              value: "-14.2%",
              label: "Penurunan Unmapped",
              isPositive: true,
              direction: "down",
            }}
            icon={<AlertCircle className="w-5 h-5 text-rose-600" />}
            infoTooltip="Jumlah estimasi Objek Pajak atau area bisnis yang belum memiliki titik koordinat resmi."
          />
        </div>

        {/* 5. Wilayah Prioritas Pendataan - Default White */}
        <div className="col-span-1 flex flex-col h-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <ScorecardApp
            id="card-wilayah-prioritas"
            variant="default"
            title="Wilayah Prioritas Pendataan"
            value="4 Kecamatan"
            unit="Target Prioritas Utama 2026"
            description="Gondomanan, Danurejan, Umbulharjo, & Gondokusuman"
            badge="Priority Target"
            trend={{
              value: "High Priority",
              label: "Gondomanan #1",
              isPositive: true,
              direction: "up",
            }}
            icon={<Crosshair className="w-5 h-5 text-purple-600" />}
            infoTooltip="Wilayah kecamatan dengan selisih potensi pajak tertinggi yang diprioritaskan untuk pemetaan intensif."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAPS INTERACTIVE VISUALIZATION (BR-07 Items 1 to 5 GIS Map)   */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-main-gis-map-container" className="p-5 border-hairline-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <BadgeApp id="badge-map-view-tag" variant="solidPurple" size="sm">
                <MapPin className="w-3 h-3 mr-1 inline" />
                Interactive GIS Viewer
              </BadgeApp>
              <BadgeApp id="badge-map-city" variant="solidAmber" size="sm">
                Kota Yogyakarta
              </BadgeApp>
            </div>
            <TextApp id="title-main-gis-map" variant="h3" weight="bold" className="text-ink-primary">
              Pemetaan Geospasial Interaktif
            </TextApp>
            <TextApp id="sub-main-gis-map" variant="caption" className="text-ink-secondary">
              Pilih layer tampilan spasial untuk melihat Sebaran OP, Sebaran WP, Heatmap Potensi, Wilayah Unmapped, atau Target Prioritas
            </TextApp>
          </div>

          {/* Layer Selector Tabs */}
          <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-full border border-hairline-soft flex-wrap">
            <button
              onClick={() => setActiveLayerMode("objek_pajak")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeLayerMode === "objek_pajak"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Sebaran OP
            </button>
            <button
              onClick={() => setActiveLayerMode("wajib_pajak")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeLayerMode === "wajib_pajak"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Sebaran WP
            </button>
            <button
              onClick={() => setActiveLayerMode("potensi_heatmap")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeLayerMode === "potensi_heatmap"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              <Flame className="w-3 h-3 inline mr-1" />
              Heatmap Potensi
            </button>
            <button
              onClick={() => setActiveLayerMode("belum_terdata")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeLayerMode === "belum_terdata"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Belum Terdata
            </button>
            <button
              onClick={() => setActiveLayerMode("prioritas")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeLayerMode === "prioritas"
                  ? "bg-vibrant-purple text-white shadow-xs"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Prioritas
            </button>
          </div>
        </div>

        {/* Map Rendering Container */}
        <div className="relative rounded-xl overflow-hidden border border-hairline-soft h-[450px]">
          <MapsApp
            id="map-gis-main"
            center={[-7.7956, 110.3695]}
            zoom={13}
            markers={mockGISMarkers[activeLayerMode] || []}
            tileProvider="openstreetmap"
            showControls={true}
            className="w-full h-full"
          />

          {/* Floating Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-[400] bg-surface-card/95 backdrop-blur-md p-3 rounded-xl border border-hairline-soft shadow-md max-w-xs text-xs space-y-1.5">
            <div className="font-semibold text-ink-primary text-xs flex items-center justify-between">
              <span>Legenda Layer Active</span>
              <BadgeApp id="badge-active-layer-mode" variant="solidAmber" size="sm">
                {activeLayerMode.replace("_", " ").toUpperCase()}
              </BadgeApp>
            </div>
            {activeLayerMode === "objek_pajak" && (
              <div className="space-y-1 text-[11px] text-ink-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span>NOP PBB-P2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>NOP PBJT Makanan & Hotel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  <span>NOP Reklame & Air Tanah</span>
                </div>
              </div>
            )}
            {activeLayerMode === "potensi_heatmap" && (
              <div className="space-y-1 text-[11px] text-ink-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span>Zona Merah (Potensi {">"} Rp 100 M)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Zona Oranye (Potensi Rp 50M - Rp 100M)</span>
                </div>
              </div>
            )}
            {activeLayerMode === "belum_terdata" && (
              <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                * Area bertanda merah menunjukkan estimasi Objek Pajak belum terkoordinat GPS
              </div>
            )}
          </div>
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* CHART SECTION: POTENSI PAJAK SPASIAL PER KECAMATAN            */}
      {/* (BR-07 Item 3: Potensi Pajak Bar Chart)                       */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-chart-potensi-gis-kecamatan" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-chart-potensi" variant="solidPurple" size="sm">Potensi GIS</BadgeApp>
              <BadgeApp id="badge-chart-gap" variant="solidAmber" size="sm">Selisih Potensi</BadgeApp>
            </div>
            <TextApp id="title-chart-potensi" variant="h3" weight="bold" className="text-ink-primary">
              Perbandingan Realisasi vs Estimasi Potensi Pajak GIS
            </TextApp>
            <TextApp id="sub-chart-potensi" variant="caption" className="text-ink-secondary">
              Analisis Selisih Potensi Penerimaan Pajak Spasial per Wilayah Kecamatan (Miliar Rp)
            </TextApp>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ChartApp
            id="chart-bar-potensi-kecamatan"
            type="bar"
            data={potensiPajakByKecamatan}
            xKey="kecamatan"
            barSize={20}
            series={[
              { key: "realisasi", label: "Realisasi Penetapan (Miliar)", color: "#7e22ce" },
              { key: "potensiGIS", label: "Estimasi Potensi GIS (Miliar)", color: "#f59e0b" },
            ]}
            showGrid={true}
            showTooltip={true}
            showLegend={true}
          />
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE: WILAYAH PRIORITAS PENDATAAN (BR-07 Item 5 Table)   */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-wilayah-prioritas" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-prio" variant="solidPurple" size="sm">Prioritas Pendataan</BadgeApp>
              <BadgeApp id="badge-tbl-prio-target" variant="solidAmber" size="sm">Action Plan 2026</BadgeApp>
            </div>
            <TextApp id="title-tbl-prio" variant="h3" weight="bold" className="text-ink-primary">
              Master Table Wilayah Prioritas Pendataan Spasial
            </TextApp>
            <TextApp id="sub-tbl-prio" variant="caption" className="text-ink-secondary">
              Daftar Kecamatan & Kelurahan dengan Estimasi Unmapped NOP & Potensi Tambahan Terbesar
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-wilayah-prioritas"
          data={mockPrioritasWilayah}
          columns={tableColumns}
          searchPlaceholder="Cari Kecamatan, Kelurahan, Sektor Utama, atau Tingkat Prioritas..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL (Portalled by DialogApp)                   */}
      {/* ------------------------------------------------------------- */}
      {selectedWilayah && (
        <DialogApp
          id="dialog-detail-wilayah-prio"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={`Prioritas Wilayah: ${selectedWilayah.wilayah}`}
          description="Rincian target pendataan spasial dan alokasi tim survei lapangan."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
              <div>
                <span className="text-ink-secondary block">Nama Kecamatan:</span>
                <span className="font-bold text-ink-primary text-sm">{selectedWilayah.wilayah}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Kelurahan Focus:</span>
                <span className="font-medium text-ink-primary">{selectedWilayah.kelurahan}</span>
              </div>
              <div>
                <span className="text-ink-secondary block">Sektor Dominan:</span>
                <BadgeApp id="badge-dlg-sektor-prio" variant="solidAmber" size="sm">{selectedWilayah.sektorUtama}</BadgeApp>
              </div>
              <div>
                <span className="text-ink-secondary block">Potensi Tambahan:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">{selectedWilayah.potensiTambahan}</span>
              </div>
            </div>

            <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
              <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Instruksi Penugasan Tim Survei Spasial</span>
              </div>
              <p className="text-ink-secondary">
                Estimasi NOP Unmapped: <span className="font-bold text-rose-600">{selectedWilayah.estNOPUnmapped}</span>
              </p>
              <p className="text-ink-secondary">
                Skor Prioritas Sistem: <span className="font-bold text-vibrant-purple">{selectedWilayah.skorPrioritas}</span>
              </p>
              <p className="text-ink-secondary">
                Status Operasional: <BadgeApp id="badge-dlg-status-prio" variant="solidEmerald" size="sm">{selectedWilayah.statusTim}</BadgeApp>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <ButtonApp
                id="btn-close-detail-gis-dialog"
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

export default GISDashboardPage;
