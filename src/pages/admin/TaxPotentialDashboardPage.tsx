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
  TrendingUp,
  Sparkles,
  PlusCircle,
  Building2,
  MapPin,
  ClipboardCheck,
  SearchCheck,
  RefreshCw,
  Download,
  Eye,
  BarChart3,
  Layers,
  Flame,
  FileSpreadsheet,
} from "lucide-react";

// Filter Field Configuration for BR-08
const potensiFilterFields = [
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
    id: "metodeInvestigasi",
    label: "Metode Penemuan Potensi",
    type: "select" as const,
    placeholder: "Pilih Metode...",
    options: [
      { value: "all", label: "Semua Metode" },
      { value: "uji_petik", label: "Uji Petik Transaksi (Sampling)" },
      { value: "survei_lapangan", label: "Survei Ground Check / Drone" },
      { value: "rekonsiliasi_data", label: "Sanding Data OSS / BPN" },
    ],
  },
  {
    id: "statusTindakLanjut",
    label: "Status Tindak Lanjut",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status" },
      { value: "rekomendasi_skpd", label: "Terbit SKPD / NPWPD Baru" },
      { value: "proses_pemeriksaan", label: "Proses Uji Petik Lanjutan" },
      { value: "pending_survei", label: "Menunggu Jadwal Survei" },
    ],
  },
];

const quickPresets: QuickPreset[] = [
  { label: "Semua Potensi 2026", values: { metodeInvestigasi: "all", statusTindakLanjut: "all" } },
  { label: "Hasil Uji Petik Resto & Cafe", values: { sektorPajak: "pbjt_makanan", metodeInvestigasi: "uji_petik" } },
  { label: "Survei Lapangan Gondomanan", values: { kecamatan: "gondomanan", metodeInvestigasi: "survei_lapangan" } },
  { label: "OP Baru Siap Ditetapkan", values: { statusTindakLanjut: "rekomendasi_skpd" } },
];

// Map Markers for Wilayah Potensial
const mockPotensialMarkers: MapMarker[] = [
  {
    id: "pot-loc-1",
    position: [-7.7956, 110.3695],
    title: "Kawasan Malioboro Central",
    description: "Estimasi Potensi Baru: Rp 18,5 M/thn | 42 Resto/Cafe Baru Uji Petik",
    color: "purple",
  },
  {
    id: "pot-loc-2",
    position: [-7.7830, 110.3670],
    title: "Koridor Bisnis Simpang Tugu - Jetis",
    description: "Estimasi Potensi Baru: Rp 12,2 M/thn | 18 Media Reklame & Videotron Baru",
    color: "amber",
  },
  {
    id: "pot-loc-3",
    position: [-7.8130, 110.3640],
    title: "Kawasan Wisata Prawirotaman",
    description: "Estimasi Potensi Baru: Rp 8,7 M/thn | 15 Boutique Hotel & Homestay Baru",
    color: "purple",
  },
  {
    id: "pot-loc-4",
    position: [-7.7910, 110.3800],
    title: "Kawasan Kuliner & Jasa Terban - Gondokusuman",
    description: "Estimasi Potensi Baru: Rp 9,4 M/thn | 28 Usaha Kuliner Self Assessment",
    color: "emerald",
  },
];

// Chart Data 1: Potensi Pajak Baru per Sektor (Bar Chart - Visualisasi Item 1)
const potensiBaruBySektor = [
  { sektor: "PBJT Makanan", potensiBaruMiliar: 18.5, targetTambahan: 15.0 },
  { sektor: "PBB-P2", potensiBaruMiliar: 14.2, targetTambahan: 12.0 },
  { sektor: "PBJT Hotel", potensiBaruMiliar: 10.8, targetTambahan: 8.5 },
  { sektor: "Pajak Reklame", potensiBaruMiliar: 6.4, targetTambahan: 5.0 },
  { sektor: "PBJT Parkir", potensiBaruMiliar: 4.8, targetTambahan: 3.8 },
  { sektor: "Air Tanah", potensiBaruMiliar: 2.5, targetTambahan: 2.0 },
];

// Chart Data 2: Wilayah Potensial (Bar Chart - Visualisasi Item 3)
const wilayahPotensialChart = [
  { kecamatan: "Gondomanan", potensiMiliar: 18.5, opBaru: 142 },
  { kecamatan: "Danurejan", potensiMiliar: 12.8, opBaru: 98 },
  { kecamatan: "Gondokusuman", potensiMiliar: 11.4, opBaru: 110 },
  { kecamatan: "Jetis", potensiMiliar: 8.9, opBaru: 76 },
  { kecamatan: "Umbulharjo", potensiMiliar: 8.2, opBaru: 124 },
  { kecamatan: "Mantrijeron", potensiMiliar: 6.5, opBaru: 58 },
  { kecamatan: "Kotagede", potensiMiliar: 4.8, opBaru: 45 },
];

// Table Data 1: Hasil Uji Petik Transaksi (Table - Visualisasi Item 4)
const mockHasilUjiPetik = [
  {
    id: "UP-2026-001",
    namaSubjek: "Resto Steak & Cafe Malioboro",
    npwpd: "P.2.0084120.04.12",
    sektor: "PBJT Makanan & Minuman",
    omzetLaporan: "Rp 120.000.000 / bln",
    omzetUjiPetik: "Rp 280.000.000 / bln",
    selisihOmzet: "+133.3%",
    potensiPajakBulanan: "Rp 16.000.000",
    tglPelaksanaan: "18 - 22 Jul 2026",
    statusUjiPetik: "Selesai - Diterbitkan SKPDKB",
    kecamatan: "Gondomanan",
  },
  {
    id: "UP-2026-002",
    namaSubjek: "Hotel Boutique Heritage Prawirotaman",
    npwpd: "P.2.0019284.02.10",
    sektor: "PBJT Jasa Perhotelan",
    omzetLaporan: "Rp 85.000.000 / bln",
    omzetUjiPetik: "Rp 165.000.000 / bln",
    selisihOmzet: "+94.1%",
    potensiPajakBulanan: "Rp 8.000.000",
    tglPelaksanaan: "12 - 16 Jul 2026",
    statusUjiPetik: "Proses Verifikasi WP",
    kecamatan: "Mantrijeron",
  },
  {
    id: "UP-2026-003",
    namaSubjek: "Parkir Mandiri Plaza Malioboro",
    npwpd: "P.2.0091204.05.18",
    sektor: "PBJT Jasa Parkir",
    omzetLaporan: "Rp 40.000.000 / bln",
    omzetUjiPetik: "Rp 75.000.000 / bln",
    selisihOmzet: "+87.5%",
    potensiPajakBulanan: "Rp 3.500.000",
    tglPelaksanaan: "05 - 09 Jul 2026",
    statusUjiPetik: "Selesai - Diterbitkan SKPDKB",
    kecamatan: "Gondomanan",
  },
  {
    id: "UP-2026-004",
    namaSubjek: "Lounge & Live Music Tugu",
    npwpd: "P.2.0034102.01.11",
    sektor: "PBJT Kesenian & Hiburan",
    omzetLaporan: "Rp 150.000.000 / bln",
    omzetUjiPetik: "Rp 240.000.000 / bln",
    selisihOmzet: "+60.0%",
    potensiPajakBulanan: "Rp 9.000.000",
    tglPelaksanaan: "01 - 04 Jul 2026",
    statusUjiPetik: "Dalam Peninjauan Kembali",
    kecamatan: "Jetis",
  },
];

// Table Data 2: Hasil Survei Ground Check Lapangan (Table - Visualisasi Item 5)
const mockHasilSurvei = [
  {
    id: "SRV-2026-010",
    objekSurvei: "Bangunan Baru Komersial Terban",
    sektor: "PBB-P2 & PAT",
    alamatLokasi: "Jl. C. Simanjuntak No. 45, Terban",
    temuanSurvei: "Gedung 4 lantai belum terdaftar SPPT, ditemukan penggunaan Air Tanah tanpa meteran",
    estPotensiTahun: "Rp 85.000.000",
    tglSurvei: "21 Jul 2026",
    petugasSurvei: "Tim Survei Lapangan 1 (Budi & Eko)",
    statusSurvei: "Rekomendasi Terbit NOP/NPWPD",
    kecamatan: "Gondokusuman",
  },
  {
    id: "SRV-2026-011",
    objekSurvei: "Videotron LED Giant Tugu",
    sektor: "Pajak Reklame",
    alamatLokasi: "Simpang Tugu Jogja Sisi Timur",
    temuanSurvei: "Pemasangan media reklame digital baru durasi 24 jam belum terdaftar izin BPMA",
    estPotensiTahun: "Rp 180.000.000",
    tglSurvei: "19 Jul 2026",
    petugasSurvei: "Tim Survei Spasial Drone",
    statusSurvei: "Rekomendasi SKPD Jabatan",
    kecamatan: "Jetis",
  },
  {
    id: "SRV-2026-012",
    objekSurvei: "Pusat Oleh-Oleh Bakpia Pathok Branch",
    sektor: "PBJT Makanan & Minuman",
    alamatLokasi: "Jl. Bhayangkara No. 12, Ngupasan",
    temuanSurvei: "Pembukaan outlet cabang ke-3 belum mendaftarkan sub-NPWPD",
    estPotensiTahun: "Rp 42.000.000",
    tglSurvei: "15 Jul 2026",
    petugasSurvei: "Rina Astuti, S.E.",
    statusSurvei: "WP Diberikan Formulir Pendaftaran",
    kecamatan: "Gondomanan",
  },
  {
    id: "SRV-2026-013",
    objekSurvei: "Guest House Eksklusif Lempuyangan",
    sektor: "PBJT Jasa Perhotelan",
    alamatLokasi: "Jl. Bausasran No. 88, Bausasran",
    temuanSurvei: "Operasional 18 kamar kos harian dengan tarif hotel melati",
    estPotensiTahun: "Rp 36.000.000",
    tglSurvei: "10 Jul 2026",
    petugasSurvei: "Tim Uji Petik Wilayah II",
    statusSurvei: "Proses Klarifikasi Pemilik",
    kecamatan: "Danurejan",
  },
];

export function TaxPotentialDashboardPage() {
  const { toast } = useToastApp();

  // Dialog Detail Modal States
  const [selectedUjiPetik, setSelectedUjiPetik] = React.useState<typeof mockHasilUjiPetik[0] | null>(null);
  const [selectedSurvei, setSelectedSurvei] = React.useState<typeof mockHasilSurvei[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<"uji_petik" | "survei">("uji_petik");

  // Active Filter state
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Direset", {
      description: "Semua kriteria filter potensi pajak telah dikembalikan ke kondisi default.",
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Potensi Pajak Diexport", {
      description: "Berkas PDF/XLSX Potensi Pajak Baru, Hasil Uji Petik, & Survei BR-08 berhasil diunduh.",
    });
  };

  const handleOpenUjiPetikDetail = (record: typeof mockHasilUjiPetik[0]) => {
    setSelectedUjiPetik(record);
    setDialogType("uji_petik");
    setIsDetailDialogOpen(true);
  };

  const handleOpenSurveiDetail = (record: typeof mockHasilSurvei[0]) => {
    setSelectedSurvei(record);
    setDialogType("survei");
    setIsDetailDialogOpen(true);
  };

  // Columns for Hasil Uji Petik Table
  const ujiPetikColumns = [
    {
      accessorKey: "id",
      header: "Ref Uji Petik",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.id}
          </div>
          <div className="text-[10px] text-ink-secondary">Tgl: {row.original.tglPelaksanaan}</div>
        </div>
      ),
    },
    {
      accessorKey: "namaSubjek",
      header: "Nama Subjek / Usaha",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.namaSubjek}</div>
          <div className="text-[10px] text-ink-secondary font-mono">NPWPD: {row.original.npwpd}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-up-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "omzetUjiPetik",
      header: "Hasil Uji Petik",
      cell: ({ row }: any) => (
        <div className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
          {row.original.omzetUjiPetik}
        </div>
      ),
    },
    {
      accessorKey: "selisihOmzet",
      header: "Selisih Omzet",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-selisih-${row.original.id}`} variant="solidRose" size="sm">
          {row.original.selisihOmzet}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "statusUjiPetik",
      header: "Status Tindak Lanjut",
      cell: ({ row }: any) => {
        const val = row.original.statusUjiPetik;
        let badgeVariant: any = "solidEmerald";
        if (val.includes("Selesai")) badgeVariant = "solidEmerald";
        if (val.includes("Proses")) badgeVariant = "solidAmber";
        if (val.includes("Peninjauan")) badgeVariant = "blue";

        return <BadgeApp id={`badge-status-up-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-up-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenUjiPetikDetail(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Rincian
        </ButtonApp>
      ),
    },
  ];

  // Columns for Hasil Survei Table
  const surveiColumns = [
    {
      accessorKey: "id",
      header: "Ref Survei",
      cell: ({ row }: any) => (
        <div>
          <div className="font-mono text-xs font-bold text-vibrant-purple">
            {row.original.id}
          </div>
          <div className="text-[10px] text-ink-secondary">Tgl: {row.original.tglSurvei}</div>
        </div>
      ),
    },
    {
      accessorKey: "objekSurvei",
      header: "Objek / Lokasi Temuan",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-ink-primary text-xs">{row.original.objekSurvei}</div>
          <div className="text-[10px] text-ink-secondary">{row.original.alamatLokasi}</div>
        </div>
      ),
    },
    {
      accessorKey: "sektor",
      header: "Sektor Target",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-srv-${row.original.id}`} variant="solidAmber" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "estPotensiTahun",
      header: "Est. Potensi / Tahun",
      cell: ({ row }: any) => (
        <div className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
          {row.original.estPotensiTahun}
        </div>
      ),
    },
    {
      accessorKey: "statusSurvei",
      header: "Rekomendasi / Status",
      cell: ({ row }: any) => {
        const val = row.original.statusSurvei;
        let badgeVariant: any = "solidEmerald";
        if (val.includes("Rekomendasi")) badgeVariant = "solidEmerald";
        if (val.includes("Formulir")) badgeVariant = "solidAmber";
        if (val.includes("Klarifikasi")) badgeVariant = "blue";

        return <BadgeApp id={`badge-status-srv-${row.original.id}`} variant={badgeVariant} size="sm">{val}</BadgeApp>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-srv-${row.original.id}`}
          variant="purpleDark"
          theme="default"
          size="sm"
          rounded="pill"
          onClick={() => handleOpenSurveiDetail(row.original)}
          className="flex items-center gap-1 text-[11px] h-7 px-2.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Rincian
        </ButtonApp>
      ),
    },
  ];

  return (
    <div id="potensi-pajak-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card p-5 rounded-2xl border border-hairline-soft shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <BadgeApp id="hdr-badge-br08" variant="solidPurple" size="sm">
              BR-08 Dashboard Potensi Pajak
            </BadgeApp>
            <BadgeApp id="hdr-badge-intensifikasi" variant="solidAmber" size="sm">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              Intensifikasi & Ekstensifikasi Pajak
            </BadgeApp>
            <BadgeApp id="hdr-badge-ta-potensi" variant="solidEmerald" size="sm">
              TA 2026 Target
            </BadgeApp>
          </div>
          <TextApp id="hdr-title-potensi" variant="h2" weight="bold" className="text-ink-primary">
            Dashboard Analisis Potensi Pajak Daerah
          </TextApp>
          <TextApp id="hdr-sub-potensi" variant="caption" className="text-ink-secondary mt-0.5">
            Monitoring Potensi Pajak Baru, Pendaftaran OP Baru, Pemetaan Wilayah Potensial, Hasil Uji Petik Transaksi, & Hasil Survei Lapangan
          </TextApp>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <ButtonApp
            id="btn-refresh-potensi-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={() =>
              toast.info("Data Potensi Pajak Dibarui", {
                description: "Hasil rekapitulasi Uji Petik & Survei Lapangan telah disinkronkan secara real-time.",
              })
            }
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Potensi
          </ButtonApp>

          <ButtonApp
            id="btn-export-potensi-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan Potensi
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-potensi-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="filter-potensi-pajak"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Potensi"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          title="Filter Analisis Potensi Pajak & Hasil Survei"
          fields={potensiFilterFields}
          values={filterValues}
          onChange={setFilterValues}
          quickPresets={quickPresets}
          onReset={handleResetFilter}
          onApply={() => {
            toast.vibrant("Filter Potensi Berhasil Diterapkan", {
              description: "Menampilkan analisis data potensi berdasarkan kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD BENTO GRID (BR-08 Items 1 to 5)                     */}
      {/* Rules: Top 3 colored side-by-side (clayPurple, clayBlue, clayYellow) */}
      {/* Remainder default white. Clean titles without numbers.        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-stretch">
        
        {/* 1. Potensi Pajak Baru - Purple Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-potensi-pajak-baru"
            variant="clayPurple"
            title="Potensi Pajak Baru"
            value="Rp 59,1 M"
            unit="Estimasi Potensi Teridentifikasi"
            description="Hasil Uji Petik Transaksi & Ground Check"
            badge="Target Ekstensifikasi"
            trend={{
              value: "+18.4%",
              label: "Pertumbuhan Potensi",
              isPositive: true,
              direction: "up",
            }}
            icon={<TrendingUp className="w-5 h-5 text-white" />}
            infoTooltip="Total estimasi tambahan penerimaan pajak daerah baru yang ditemukan melalui survei dan uji petik."
          />
        </div>

        {/* 2. OP Baru - Blue Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-op-baru"
            variant="clayBlue"
            title="OP Baru"
            value="653 NOP"
            unit="Objek Pajak Baru Terdata"
            description="Penambahan NOP PBB, PBJT, Reklame, & PAT"
            badge="Pendataan 2026"
            trend={{
              value: "+14.2%",
              label: "Registrasi OP Baru",
              isPositive: true,
              direction: "up",
            }}
            icon={<PlusCircle className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah Objek Pajak baru yang berhasil didaftarkan ke dalam database SIMPAD."
          />
        </div>

        {/* 3. Wilayah Potensial - Yellow Clay */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-wilayah-potensial"
            variant="clayYellow"
            title="Wilayah Potensial"
            value="5 Kawasan"
            unit="Kawasan Aglomerasi Bisnis"
            description="Koridor Malioboro, Tugu, Terban, & Prawirotaman"
            badge="Priority Zone"
            trend={{
              value: "Gondomanan #1",
              label: "Kepadatan Usaha",
              isPositive: true,
              direction: "up",
            }}
            icon={<MapPin className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Kawasan atau wilayah kecamatan dengan tingkat potensi penambahan pajak tertinggi."
          />
        </div>

        {/* 4. Hasil Uji Petik - Default White */}
        <div className="col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-hasil-uji-petik"
            variant="default"
            title="Hasil Uji Petik"
            value="128 WP"
            unit="Telah Di-Sampling Transaksi"
            description="Rata-Rata Selisih Omzet +88.5% Dibanding Laporan"
            badge="Sampling Compliance"
            trend={{
              value: "+24.0%",
              label: "Peningkatan Omzet Real",
              isPositive: true,
              direction: "up",
            }}
            icon={<ClipboardCheck className="w-5 h-5 text-purple-600" />}
            infoTooltip="Jumlah Wajib Pajak yang telah diaudit transaksi riilnya menggunakan metode Uji Petik."
          />
        </div>

        {/* 5. Hasil Survei - Default White */}
        <div className="col-span-1 flex flex-col h-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <ScorecardApp
            id="card-hasil-survei"
            variant="default"
            title="Hasil Survei"
            value="342 Lokasi"
            unit="Kawasan Bisnis Disurvei"
            description="Penemuan Bangunan Baru, Reklame Unregistered, & Air Tanah"
            badge="Field Survey 2026"
            trend={{
              value: "+85% Validasi",
              label: "Tingkat Akurasi Lapangan",
              isPositive: true,
              direction: "up",
            }}
            icon={<SearchCheck className="w-5 h-5 text-emerald-600" />}
            infoTooltip="Total lokasi atau bangunan usaha yang telah diperiksa fisiknya oleh tim survei geospasial."
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION 1: POTENSI PAJAK BARU & WILAYAH POTENSIAL      */}
      {/* (BR-08 Visualisasi Items 1 & 3: Bar Charts & Interactive Map)  */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Visualisasi Item 1: Potensi Pajak Baru per Sektor (Bar Chart) */}
        <CardApp id="card-chart-potensi-baru-sektor" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <TextApp id="title-chart-potensi-sektor" variant="h4" weight="bold" className="text-ink-primary">
                Potensi Pajak Baru per Sektor Pajak
              </TextApp>
              <BadgeApp id="badge-chart-potensi-sektor" variant="solidPurple" size="sm">Miliar Rp</BadgeApp>
            </div>
            <TextApp id="sub-chart-potensi-sektor" variant="caption" className="text-ink-secondary mb-4">
              Perbandingan Estimasi Potensi Pajak Baru vs Target Ekstensifikasi TA 2026
            </TextApp>
          </div>

          <div className="h-[280px] w-full">
            <ChartApp
              id="chart-bar-potensi-sektor"
              type="bar"
              data={potensiBaruBySektor}
              xKey="sektor"
              barSize={20}
              series={[
                { key: "targetTambahan", label: "Target Ekstensifikasi", color: "#94a3b8" },
                { key: "potensiBaruMiliar", label: "Estimasi Potensi Baru", color: "#7e22ce" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

        {/* Visualisasi Item 3: Wilayah Potensial (Map & Bar Chart Combo) */}
        <CardApp id="card-chart-wilayah-potensial" className="p-5 border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <TextApp id="title-chart-wilayah-potensial" variant="h4" weight="bold" className="text-ink-primary">
                Kawasan Wilayah Potensial
              </TextApp>
              <BadgeApp id="badge-chart-wilayah" variant="solidAmber" size="sm">Peringkat Kecamatan</BadgeApp>
            </div>
            <TextApp id="sub-chart-wilayah" variant="caption" className="text-ink-secondary mb-4">
              Estimasi Total Potensi Baru (Miliar Rp) & Jumlah Penambahan OP Baru per Wilayah
            </TextApp>
          </div>

          <div className="h-[280px] w-full">
            <ChartApp
              id="chart-bar-wilayah-potensial"
              type="bar"
              data={wilayahPotensialChart}
              xKey="kecamatan"
              barSize={18}
              series={[
                { key: "potensiMiliar", label: "Potensi Baru (Miliar)", color: "#f59e0b" },
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>
        </CardApp>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAP INTERACTIVE VISUALIZATION FOR WILAYAH POTENSIAL           */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-map-potensial-container" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-map-pot-tag" variant="solidPurple" size="sm">Spatial Mapping</BadgeApp>
              <BadgeApp id="badge-map-pot-city" variant="solidAmber" size="sm">Kota Yogyakarta</BadgeApp>
            </div>
            <TextApp id="title-map-potensial" variant="h3" weight="bold" className="text-ink-primary">
              Peta Sebaran Titik Temuan Potensi Pajak Baru
            </TextApp>
            <TextApp id="sub-map-potensial" variant="caption" className="text-ink-secondary">
              Lokasi Titik Hasil Uji Petik Transaksi & Survei Ground Check
            </TextApp>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-hairline-soft h-[350px]">
          <MapsApp
            id="map-potensial-gis"
            center={[-7.7956, 110.3695]}
            zoom={13}
            markers={mockPotensialMarkers}
            tileProvider="openstreetmap"
            showControls={true}
            className="w-full h-full"
          />
        </div>
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* TABLE 1: HASIL UJI PETIK (BR-08 Visualisasi Item 4 Table)     */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-hasil-uji-petik" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-up" variant="solidPurple" size="sm">Audit Transaksi</BadgeApp>
              <BadgeApp id="badge-tbl-up-recent" variant="solidAmber" size="sm">Hasil Uji Petik Terbaru</BadgeApp>
            </div>
            <TextApp id="title-tbl-up" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Hasil Uji Petik Transaksi Wajib Pajak
            </TextApp>
            <TextApp id="sub-tbl-up" variant="caption" className="text-ink-secondary">
              Rekapitulasi Perbandingan Omzet Laporan SPTPD vs Omzet Riil Hasil Uji Petik
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-hasil-uji-petik"
          data={mockHasilUjiPetik}
          columns={ujiPetikColumns}
          searchPlaceholder="Cari Ref, Nama Subjek, NPWPD, atau Sektor..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* TABLE 2: HASIL SURVEI (BR-08 Visualisasi Item 5 Table)         */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-hasil-survei" className="p-5 border-hairline-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeApp id="badge-tbl-srv" variant="solidPurple" size="sm">Survei Lapangan</BadgeApp>
              <BadgeApp id="badge-tbl-srv-recent" variant="solidAmber" size="sm">Ground Check 2026</BadgeApp>
            </div>
            <TextApp id="title-tbl-srv" variant="h3" weight="bold" className="text-ink-primary">
              Daftar Hasil Survei Lapangan & Temuan Objek Pajak Baru
            </TextApp>
            <TextApp id="sub-tbl-srv" variant="caption" className="text-ink-secondary">
              Data Penemuan Bangunan Unregistered, Reklame Baru, & Penggunaan Air Tanah Komersial
            </TextApp>
          </div>
        </div>

        <DataTableApp
          id="datatable-hasil-survei"
          data={mockHasilSurvei}
          columns={surveiColumns}
          searchPlaceholder="Cari Ref, Objek Survei, Alamat, atau Sektor..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL DIALOG MODAL FOR UJI PETIK / SURVEI                    */}
      {/* ------------------------------------------------------------- */}
      {isDetailDialogOpen && (
        <DialogApp
          id="dialog-detail-potensi-item"
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          title={
            dialogType === "uji_petik"
              ? `Rincian Uji Petik: ${selectedUjiPetik?.id}`
              : `Rincian Survei: ${selectedSurvei?.id}`
          }
          description="Detail temuan potensi pajak dan rekomendasi penetapan resmi."
          size="lg"
        >
          {dialogType === "uji_petik" && selectedUjiPetik && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
                <div>
                  <span className="text-ink-secondary block">Nama Subjek Usaha:</span>
                  <span className="font-bold text-ink-primary text-sm">{selectedUjiPetik.namaSubjek}</span>
                </div>
                <div>
                  <span className="text-ink-secondary block">NPWPD:</span>
                  <span className="font-mono font-medium text-vibrant-purple">{selectedUjiPetik.npwpd}</span>
                </div>
                <div>
                  <span className="text-ink-secondary block">Sektor Pajak:</span>
                  <BadgeApp id="badge-dlg-sektor-up" variant="solidAmber" size="sm">{selectedUjiPetik.sektor}</BadgeApp>
                </div>
                <div>
                  <span className="text-ink-secondary block">Selisih Omzet:</span>
                  <BadgeApp id="badge-dlg-selisih-up" variant="solidRose" size="sm">{selectedUjiPetik.selisihOmzet}</BadgeApp>
                </div>
              </div>

              <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
                <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-vibrant-purple" />
                  <span>Kalkulasi Potensi Tambahan Pajak</span>
                </div>
                <p className="text-ink-secondary">
                  Omzet Laporan SPTPD: <span className="font-mono text-ink-primary">{selectedUjiPetik.omzetLaporan}</span>
                </p>
                <p className="text-ink-secondary">
                  Omzet Hasil Uji Petik: <span className="font-mono font-bold text-emerald-600">{selectedUjiPetik.omzetUjiPetik}</span>
                </p>
                <p className="text-ink-secondary">
                  Potensi Pajak Tambahan: <span className="font-mono font-bold text-vibrant-purple">{selectedUjiPetik.potensiPajakBulanan} / bulan</span>
                </p>
                <p className="text-ink-secondary">
                  Status: <BadgeApp id="badge-dlg-status-up" variant="solidEmerald" size="sm">{selectedUjiPetik.statusUjiPetik}</BadgeApp>
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <ButtonApp
                  id="btn-close-detail-up-dialog"
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
          )}

          {dialogType === "survei" && selectedSurvei && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-surface-subtle rounded-xl border border-hairline-soft">
                <div>
                  <span className="text-ink-secondary block">Objek / Bangunan Survei:</span>
                  <span className="font-bold text-ink-primary text-sm">{selectedSurvei.objekSurvei}</span>
                </div>
                <div>
                  <span className="text-ink-secondary block">Alamat Lokasi:</span>
                  <span className="font-medium text-ink-primary">{selectedSurvei.alamatLokasi}</span>
                </div>
                <div>
                  <span className="text-ink-secondary block">Sektor Target:</span>
                  <BadgeApp id="badge-dlg-sektor-srv" variant="solidAmber" size="sm">{selectedSurvei.sektor}</BadgeApp>
                </div>
                <div>
                  <span className="text-ink-secondary block">Est. Potensi / Tahun:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">{selectedSurvei.estPotensiTahun}</span>
                </div>
              </div>

              <div className="p-3 border border-hairline-soft rounded-xl space-y-2">
                <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-vibrant-purple" />
                  <span>Catatan Temuan Lapangan & Petugas</span>
                </div>
                <p className="text-ink-secondary">
                  Temuan Survei: <span className="text-ink-primary font-medium">{selectedSurvei.temuanSurvei}</span>
                </p>
                <p className="text-ink-secondary">
                  Petugas Survei: <span className="text-ink-primary font-medium">{selectedSurvei.petugasSurvei}</span> | Tgl: <span className="text-ink-primary font-medium">{selectedSurvei.tglSurvei}</span>
                </p>
                <p className="text-ink-secondary">
                  Rekomendasi Status: <BadgeApp id="badge-dlg-status-srv" variant="solidEmerald" size="sm">{selectedSurvei.statusSurvei}</BadgeApp>
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <ButtonApp
                  id="btn-close-detail-srv-dialog"
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
          )}
        </DialogApp>
      )}
    </div>
  );
}

export default TaxPotentialDashboardPage;
