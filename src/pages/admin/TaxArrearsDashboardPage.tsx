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
  DropdownApp,
  DialogApp,
  ProgressListApp,
  useToastApp,
  useRealtimeValue,
  QuickPreset,
} from "@/packages/design-system";
import {
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Receipt,
  Wallet,
  HandCoins,
  Target,
  Eye,
} from "lucide-react";
import { CHART_COLORS, CHART_TARGET_COLOR } from "@/constants/chartColors";

const COLOR_KRITIS = "#f43f5e";

// Aging piutang — warna eskalasi keparahan seiring umur tunggakan, bukan
// warna literal acuan (navy/amber/oranye muda/merah tak berurutan). Skala
// blue -> amber -> rose pudar -> rose penuh membaca lebih jelas sebagai
// "makin lama makin berisiko".
const AGING_PIUTANG = [
  { id: "kurang-1th", label: "< 1 Tahun", nilaiM: 12.5, color: CHART_COLORS.blue },
  { id: "1-3th", label: "1-3 Tahun", nilaiM: 18.2, color: CHART_COLORS.amber },
  { id: "3-5th", label: "3-5 Tahun", nilaiM: 9.5, color: `color-mix(in srgb, ${COLOR_KRITIS} 60%, transparent)` },
  { id: "lebih-5th", label: "> 5 Tahun", nilaiM: 5.0, color: COLOR_KRITIS },
];
const AGING_MAKS = 20;

// Efektivitas penagihan — donut dengan nilai tengah, pola sama dengan
// "Kepatuhan SLA Keseluruhan" BR-10.
const EFEKTIVITAS_PENAGIHAN = [
  { name: "Belum Merespons", value: 40, fill: CHART_TARGET_COLOR },
  { name: "Proses Cicilan", value: 22, fill: CHART_COLORS.amber },
  { name: "Lunas/Cair", value: 38, fill: CHART_COLORS.emerald },
];

// Prioritas penagihan (Top 5 nominal) — nilai mengikuti acuan prototype.
const PRIORITAS_PENAGIHAN = [
  { id: "prio-1", nama: "PT Hotel Nusantara", jenis: "PBJT", nominalJt: 850 },
  { id: "prio-2", nama: "Kawasan Komersial X", jenis: "PBB-P2", nominalJt: 620 },
  { id: "prio-3", nama: "Restoran Mega Jaya", jenis: "PBJT", nominalJt: 340 },
  { id: "prio-4", nama: "CV Bangun Karya", jenis: "Reklame", nominalJt: 120 },
  { id: "prio-5", nama: "Toko Makmur Sentosa", jenis: "PBB-P2", nominalJt: 85 },
];

type StatusTindakan = "Surat Paksa" | "Teguran 1" | "Belum Ditindak";

interface TargetEksekusi {
  id: string;
  nop: string;
  nama: string;
  jenis: string;
  umur: string;
  tunggakanRp: number;
  status: StatusTindakan;
}

// Lima baris pertama bersumber dari daftar "Prioritas Penagihan" di atas,
// dilengkapi NOP & status tindakan — dua sumber data acuan disatukan supaya
// tabel benar-benar mencerminkan kelima entri prioritas, bukan hanya 3.
const TARGET_EKSEKUSI: TargetEksekusi[] = [
  {
    id: "tgt-1",
    nop: "34.71.010.001.002-0010.0",
    nama: "PT Hotel Nusantara",
    jenis: "PBJT",
    umur: "3 Tahun",
    tunggakanRp: 850_000_000,
    status: "Surat Paksa",
  },
  {
    id: "tgt-2",
    nop: "34.71.040.015.011-0021.0",
    nama: "Kawasan Komersial X",
    jenis: "PBB-P2",
    umur: "1,5 Tahun",
    tunggakanRp: 620_000_000,
    status: "Teguran 1",
  },
  {
    id: "tgt-3",
    nop: "34.71.020.005.003-0105.0",
    nama: "Restoran Mega Jaya",
    jenis: "PBJT",
    umur: "8 Bulan",
    tunggakanRp: 340_000_000,
    status: "Belum Ditindak",
  },
  {
    id: "tgt-4",
    nop: "34.71.030.008.019-0044.0",
    nama: "CV Bangun Karya",
    jenis: "Reklame",
    umur: "2 Tahun",
    tunggakanRp: 120_000_000,
    status: "Teguran 1",
  },
  {
    id: "tgt-5",
    nop: "34.71.050.012.007-0033.0",
    nama: "Toko Makmur Sentosa",
    jenis: "PBB-P2",
    umur: "5 Bulan",
    tunggakanRp: 85_000_000,
    status: "Belum Ditindak",
  },
];

const piutangFilterFields = [
  {
    id: "jenisPajak",
    label: "Jenis Pajak",
    type: "select" as const,
    placeholder: "Pilih Jenis Pajak...",
    options: [
      { value: "all", label: "Semua Jenis Pajak" },
      { value: "pbb_p2", label: "PBB-P2" },
      { value: "pbjt", label: "PBJT" },
      { value: "reklame", label: "Pajak Reklame" },
    ],
  },
  {
    id: "statusTindakan",
    label: "Status Tindakan",
    type: "select" as const,
    placeholder: "Pilih Status...",
    options: [
      { value: "all", label: "Semua Status Tindakan" },
      { value: "surat_paksa", label: "Surat Paksa" },
      { value: "teguran_1", label: "Teguran 1" },
      { value: "belum_ditindak", label: "Belum Ditindak" },
    ],
  },
  {
    id: "umurPiutang",
    label: "Umur Piutang",
    type: "select" as const,
    placeholder: "Semua Umur...",
    options: [
      { value: "all", label: "Semua Umur Piutang" },
      { value: "kurang_1", label: "< 1 Tahun" },
      { value: "1_3", label: "1 - 3 Tahun" },
      { value: "3_5", label: "3 - 5 Tahun" },
      { value: "lebih_5", label: "> 5 Tahun" },
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
  { label: "Semua Piutang", values: { jenisPajak: "all", statusTindakan: "all" } },
  { label: "Siap Surat Paksa", values: { statusTindakan: "surat_paksa" } },
  { label: "Belum Ditindak", values: { statusTindakan: "belum_ditindak" } },
  { label: "Piutang > 5 Tahun", values: { umurPiutang: "lebih_5" } },
];

const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const formatJutaan = (nilaiJt: number) => `Rp ${nilaiJt.toLocaleString("id-ID")} Juta`;
const formatRupiahM = (valueInMiliar: number) => `Rp ${valueInMiliar.toFixed(1).replace(".", ",")} M`;

// Target pencairan triwulan = realisasi Rp 4,8 M yang sudah masuk + sisa
// Rp 7,2 M yang masih harus dikejar, persis nilai acuan.
const TARGET_PENCAIRAN_TRIWULAN_M = 12.0;

export function TaxArrearsDashboardPage() {
  const { toast } = useToastApp();
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});
  const [selectedTarget, setSelectedTarget] = React.useState<TargetEksekusi | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  // Total piutang aktif berkurang seiring penagihan berhasil — nilai awal
  // & pola penurunannya sengaja sama dengan kartu "Total Piutang" di
  // Executive Dashboard (BR-01), karena keduanya merujuk agregat yang sama;
  // halaman ini hanya membedahnya lebih rinci.
  const livePiutangAktifM = useRealtimeValue({
    initialValue: 45.2,
    update: (v) => Math.max(38, v - Math.random() * 0.3),
    intervalMs: 9000,
  });
  // Realisasi penagihan bertambah tiap petugas menutup satu kasus; Sisa
  // Target diturunkan langsung darinya (bukan angka statis terpisah) supaya
  // kedua kartu tidak pernah saling bertentangan.
  const liveRealisasiPenagihanM = useRealtimeValue({
    initialValue: 4.8,
    update: (v) => Math.min(TARGET_PENCAIRAN_TRIWULAN_M, v + Math.random() * 0.15),
    intervalMs: 9000,
  });
  const sisaTargetPencairanM = Math.max(0, TARGET_PENCAIRAN_TRIWULAN_M - liveRealisasiPenagihanM);

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Piutang Direset", {
      description: "Semua kriteria jenis pajak, status tindakan, dan umur piutang dikembalikan ke kondisi awal.",
    });
  };

  const agingItems = AGING_PIUTANG.map((a) => ({
    id: a.id,
    label: a.label,
    value: `Rp ${a.nilaiM.toLocaleString("id-ID")} M`,
    segments: [{ percent: (a.nilaiM / AGING_MAKS) * 100, color: a.color }],
  }));

  // Tanpa bar: nominal sudah mencerminkan besarannya sendiri sebagai
  // peringkat, dan acuan menampilkan daftar ini sebagai list polos.
  const prioritasItems = PRIORITAS_PENAGIHAN.map((p) => ({
    id: p.id,
    label: p.nama,
    secondaryLabel: p.jenis,
    value: <span className="text-rose-600 dark:text-rose-400">{formatJutaan(p.nominalJt)}</span>,
    segments: [],
  }));

  const handleOpenDetail = (row: TargetEksekusi) => {
    setSelectedTarget(row);
    setIsDetailOpen(true);
  };

  const statusBadgeVariant = (status: StatusTindakan) => {
    if (status === "Surat Paksa") return "solidRose" as const;
    if (status === "Teguran 1") return "solidAmber" as const;
    return "error" as const;
  };

  const tableColumns = [
    {
      accessorKey: "nama",
      header: "NOP/NPWPD & Nama Wajib Pajak",
      cell: ({ row }: any) => (
        <div>
          <TextApp id={`nama-${row.original.id}`} variant="caption" weight="bold" className="block text-ink">
            {row.original.nama}
          </TextApp>
          <span className="font-mono text-[11px] text-ink-muted">{row.original.nop}</span>
        </div>
      ),
    },
    {
      accessorKey: "jenis",
      header: "Jenis Pajak",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-jenis-${row.original.id}`} variant="neutral" size="sm">
          {row.original.jenis}
        </BadgeApp>
      ),
    },
    { accessorKey: "umur", header: "Umur Piutang" },
    {
      accessorKey: "tunggakanRp",
      header: "Nominal Tunggakan",
      cell: ({ row }: any) => (
        <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
          {formatRupiah(row.original.tunggakanRp)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Tindakan",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-status-${row.original.id}`} variant={statusBadgeVariant(row.original.status)} size="sm">
          {row.original.status}
        </BadgeApp>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <ButtonApp
          id={`btn-detail-${row.original.id}`}
          variant="secondary"
          size="sm"
          rounded="lg"
          leftIcon={<Eye className="h-3.5 w-3.5" />}
          onClick={() => handleOpenDetail(row.original)}
        >
          Detail
        </ButtonApp>
      ),
    },
  ];

  return (
    <div id="piutang-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col justify-between gap-4 border-b border-hairline-soft pb-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <BadgeApp id="hdr-badge-br13" variant="solidPurple" size="sm">
              BR-13 · Dashboard Pengelolaan Piutang & Penagihan
            </BadgeApp>
            <span className="flex items-center gap-1 text-xs text-ink-muted">
              <Receipt className="h-3.5 w-3.5 text-vibrant-purple" />
              Sub Bidang Pengembangan Penerimaan Daerah P4
            </span>
            <span className="flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="h-3.5 w-3.5 text-vibrant-purple" />
              Tahun Anggaran 2026
            </span>
          </div>
          <TextApp id="hdr-title-piutang" variant="h2" className="tracking-tight text-ink">
            Dashboard Pengelolaan Piutang & Penagihan Pajak Daerah
          </TextApp>
          <TextApp id="hdr-sub-piutang" variant="body" className="text-xs text-ink-secondary">
            Monitoring Umur Piutang, Efektivitas Penagihan, & Prioritas Eksekusi Tunggakan
          </TextApp>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ButtonApp
            id="btn-refresh-piutang"
            variant="secondary"
            size="sm"
            rounded="lg"
            onClick={() =>
              toast.info("Data Piutang Disinkronkan", {
                description: "Saldo piutang direkonsiliasi ulang terhadap SPPT/SKPD yang jatuh tempo.",
              })
            }
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Sync Data
          </ButtonApp>
          <ButtonApp
            id="btn-export-piutang"
            variant="primary"
            size="sm"
            rounded="lg"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() =>
              toast.vibrant("Laporan Piutang Diunduh", {
                description: "Berisi daftar target eksekusi penagihan beserta status tindakannya.",
              })
            }
          >
            Cetak Laporan Piutang
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex w-full min-w-0 flex-nowrap items-center gap-2 overflow-x-auto rounded-2xl border border-hairline bg-surface px-3 py-3 shadow-xs">
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-ink-secondary">
          <Filter className="h-4 w-4 text-vibrant-purple" />
          Filter:
        </span>

        {/* Shortcut inline utk field yang paling sering dipakai — nilainya
            dibagi dgn AdvanceFilterApp supaya tidak jadi kontrol kosmetik. */}
        <div className="w-56 shrink-0">
          <DropdownApp
            id="select-status-tindakan"
            value={String(filterValues.statusTindakan ?? "all")}
            onChange={(value) => setFilterValues((prev) => ({ ...prev, statusTindakan: String(value) }))}
            options={[
              { label: "Semua Status Tindakan", value: "all" },
              { label: "Surat Paksa", value: "surat_paksa" },
              { label: "Teguran 1", value: "teguran_1" },
              { label: "Belum Ditindak", value: "belum_ditindak" },
            ]}
            size="sm"
            rounded="lg"
            menuPortal
          />
        </div>

        <div className="ml-auto shrink-0">
          <AdvanceFilterApp
            id="filter-piutang-penagihan"
            displayMode="modal"
            showActivePills={false}
            className="w-auto"
            triggerLabel="Advance Filter Piutang"
            triggerVariant="secondary"
            triggerSize="sm"
            triggerRounded="lg"
            title="Filter Periode & Wilayah Piutang"
            fields={piutangFilterFields}
            values={filterValues}
            onChange={setFilterValues}
            quickPresets={quickPresets}
            onReset={handleResetFilter}
            onApply={() => {
              toast.vibrant("Filter Piutang Diterapkan", {
                description: "Menampilkan daftar piutang sesuai kriteria yang dipilih.",
              });
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD PIUTANG (BR-13)                                      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-2">
        <TextApp
          id="label-ringkasan-piutang-heading"
          variant="caption"
          weight="bold"
          className="uppercase tracking-widest text-ink-muted"
        >
          Ringkasan Piutang & Penagihan
        </TextApp>
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ScorecardApp
            id="card-total-piutang-aktif"
            variant="alert"
            title="Total Piutang Aktif"
            value={formatRupiahM(livePiutangAktifM)}
            live
            unit="Dari 12.450 SPPT/SKPD"
            description="Saldo tunggakan aktif seluruh sektor pajak daerah"
            trend={{ value: "12.450 Berkas", label: "SPPT/SKPD Tertunggak", isPositive: false, direction: "up" }}
            icon={<Receipt className="h-5 w-5 text-rose-600" />}
            infoTooltip="Total saldo piutang pajak daerah yang masih berstatus aktif/belum lunas."
            infoContent={{
              formula: "Jumlah nilai SPPT/SKPD yang telah jatuh tempo namun belum dibayar lunas",
              period: "Rekonsiliasi periodik (bulanan)",
              source: "SIMPAD — Modul Piutang & Penagihan",
              lastUpdated: "Awal bulan berjalan",
            }}
            insight={{
              title: "Total Piutang Aktif",
              value: "Rp 45,2 Miliar",
              status: "kritis",
              meta: ["Piutang", "Saldo Aktif", "TA 2026"],
              summary:
                "Akumulasi seluruh SPPT/SKPD yang sudah jatuh tempo tapi belum lunas. Angka ini adalah dasar seluruh kartu lain di halaman ini — realisasi penagihan dan sisa target dihitung darinya.",
              current: [
                "Rp 45,2 M tertunggak dari 12.450 dokumen ketetapan.",
                "Rata-rata per dokumen sekitar Rp 3,6 juta, tapi sebarannya timpang — lihat Prioritas Penagihan.",
              ],
              insights: [
                "Jumlah dokumen besar tapi nominal per dokumen kecil menunjukkan piutang tersebar luas, bukan terkonsentrasi pada beberapa wajib pajak besar saja.",
              ],
              tacticalRecs: [
                "Pisahkan strategi penagihan bernilai besar (surat paksa) dari bernilai kecil (pengingat otomatis) supaya biaya penagihan tidak melebihi nilai piutangnya.",
              ],
              strategicRecs: [
                "Bangun mekanisme peringatan dini sebelum SPPT jatuh tempo, supaya piutang baru tidak terus menambah saldo ini.",
              ],
              glossary: [
                { term: "SPPT", expansion: "Surat Pemberitahuan Pajak Terutang", definition: "dokumen ketetapan pajak yang wajib dibayar wajib pajak." },
              ],
              dataNotes: ["Saldo direkonsiliasi bulanan terhadap sistem ketetapan."],
            }}
          />

          <ScorecardApp
            id="card-piutang-baru"
            variant="clayBlue"
            title="Piutang Baru (Tahun Berjalan)"
            value="Rp 12,5 M"
            unit="Jatuh Tempo Tahun Ini"
            description="Ketetapan baru yang jatuh tempo pada TA 2026"
            trend={{ value: "27,7%", label: "dari Total Piutang Aktif", isPositive: false, direction: "up" }}
            icon={<Wallet className="h-5 w-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Piutang yang muncul dari ketetapan baru pada tahun anggaran berjalan."
            infoContent={{
              formula: "Jumlah SPPT/SKPD terbit TA 2026 yang sudah melewati batas jatuh tempo",
              period: "Tahun anggaran berjalan",
              source: "SIMPAD — Modul Piutang & Penagihan",
              lastUpdated: "Awal bulan berjalan",
            }}
            insight={{
              title: "Piutang Baru (Tahun Berjalan)",
              value: "Rp 12,5 Miliar",
              status: "waspada",
              meta: ["Piutang", "Ketetapan Baru", "TA 2026"],
              summary:
                "Piutang yang lahir dari ketetapan tahun ini, terpisah dari tunggakan lama. Membedakan ini penting: piutang lama butuh penagihan, piutang baru butuh pencegahan.",
              current: ["Rp 12,5 M atau sekitar 28% dari total piutang aktif berasal dari ketetapan TA 2026."],
              insights: [
                "Porsi piutang baru yang cukup besar berarti sebagian wajib pajak masih terlambat membayar meski sistem pengingat sudah berjalan.",
              ],
              tacticalRecs: [
                "Kirim pengingat H-7 sebelum jatuh tempo untuk seluruh SPPT bernilai di atas rata-rata.",
              ],
              strategicRecs: [
                "Evaluasi efektivitas kanal pembayaran — piutang baru yang tinggi bisa juga menandakan kanal bayar kurang mudah diakses.",
              ],
              dataNotes: ["Hanya mencakup ketetapan yang terbit pada TA 2026."],
            }}
          />

          <ScorecardApp
            id="card-realisasi-penagihan"
            variant="emerald"
            title="Realisasi Penagihan"
            value={formatRupiahM(liveRealisasiPenagihanM)}
            live
            unit="Piutang Tercairkan"
            description="Piutang yang berhasil dicairkan bulan berjalan"
            trend={{ value: "+15%", label: "dari Bulan Lalu", isPositive: true, direction: "up" }}
            icon={<HandCoins className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />}
            infoTooltip="Nilai piutang yang berhasil dicairkan lewat penagihan aktif bulan ini."
            infoContent={{
              formula: "Jumlah pembayaran piutang yang diterima kas daerah pada bulan berjalan",
              period: "Bulan berjalan (real-time)",
              source: "SIMPAD — Modul Piutang & Penagihan",
              lastUpdated: "Baru saja",
            }}
            insight={{
              title: "Realisasi Penagihan",
              value: "Rp 4,8 Miliar",
              status: "sehat",
              meta: ["Penagihan", "Realisasi Bulanan", "Agustus 2026"],
              summary:
                "Satu-satunya angka di halaman ini yang bergerak dari hasil kerja penagihan aktif, bukan dari akumulasi pasif. Naik berarti tim penagihan sedang efektif.",
              current: ["Rp 4,8 M dicairkan bulan ini, naik 15% dari bulan lalu."],
              insights: [
                "Kenaikan 15% konsisten dengan naiknya porsi 'Lunas/Cair' pada donut Efektivitas Penagihan — dua ukuran ini saling menguatkan.",
              ],
              tacticalRecs: [
                "Pertahankan komposisi tim penagihan bulan ini; laju realisasi sedang berada di titik terbaiknya.",
              ],
              strategicRecs: [
                "Jadikan Rp 4,8 M/bulan sebagai baseline target minimal triwulan berikutnya.",
              ],
              dataNotes: ["Snapshot real-time; angka bertambah seiring pembayaran diterima kas daerah."],
            }}
          />

          <ScorecardApp
            id="card-sisa-target-pencairan"
            variant="clayYellow"
            title="Sisa Target Pencairan"
            // Diturunkan dari target dikurangi realisasi live di atas —
            // bukan angka statis terpisah, supaya kedua kartu tidak pernah
            // saling bertentangan (lihat komentar di deklarasi state).
            value={formatRupiahM(sisaTargetPencairanM)}
            live
            unit="Target Triwulan III 2026"
            description="Selisih menuju target pencairan Q3 2026"
            trend={{ value: "40%", label: "dari Target Triwulan", isPositive: false, direction: "up" }}
            icon={<Target className="h-5 w-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Selisih antara target pencairan triwulan berjalan dengan realisasi kumulatifnya."
            infoContent={{
              formula: "Target pencairan Triwulan III 2026 dikurangi realisasi kumulatif triwulan berjalan",
              period: "Target triwulanan",
              source: "Rencana Kerja Penagihan BPKAD TA 2026",
              lastUpdated: "Awal triwulan berjalan",
            }}
            insight={{
              title: "Sisa Target Pencairan",
              value: "Rp 7,2 Miliar",
              status: "waspada",
              meta: ["Target", "Triwulan III", "TA 2026"],
              summary:
                "Jarak yang masih harus ditempuh untuk menutup target pencairan triwulan ini. Beda dengan Piutang Baru — angka ini soal kecepatan mengejar target, bukan besaran tunggakan baru.",
              current: ["Rp 7,2 M harus dicairkan lagi sebelum akhir Q3 2026."],
              insights: [
                "Dengan laju realisasi Rp 4,8 M/bulan, target ini realistis tercapai dalam waktu kurang dari dua bulan bila laju bertahan.",
              ],
              tacticalRecs: [
                "Fokuskan surat paksa pada lima wajib pajak prioritas untuk mempercepat pencapaian target triwulan.",
              ],
              strategicRecs: [
                "Tinjau ulang target triwulan berikutnya berdasarkan laju realisasi aktual, bukan target seragam tiap triwulan.",
              ],
              dataNotes: ["Angka target, bukan realisasi yang sudah masuk kas."],
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* AGING + EFEKTIVITAS + PRIORITAS PENAGIHAN (BR-13)              */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardApp
          id="card-aging-piutang"
          className="flex flex-col border-hairline-soft p-5"
          insight={{
            title: "Analisis Umur Piutang (Aging)",
            value: "1-3 Tahun terbesar",
            status: "waspada",
            meta: ["Aging", "Umur Piutang", "TA 2026"],
            summary:
              "Membagi total piutang berdasarkan berapa lama sudah menunggak. Semakin tua umurnya, semakin kecil peluang tertagih penuh — itulah mengapa distribusinya, bukan hanya totalnya, yang menentukan strategi penagihan.",
            current: [
              "Kelompok 1-3 tahun terbesar dengan Rp 18,2 M.",
              "Kelompok di atas 5 tahun tersisa Rp 5,0 M — biasanya butuh tindakan hukum, bukan sekadar teguran.",
            ],
            insights: [
              "Konsentrasi terbesar masih di rentang 1-3 tahun — jendela waktu ini paling efektif untuk ditagih sebelum berpindah ke kelompok yang lebih sulit.",
            ],
            tacticalRecs: [
              "Prioritaskan surat paksa pada kelompok 1-3 tahun sebelum berpindah ke kelompok >5 tahun yang mekanismenya lebih rumit.",
            ],
            strategicRecs: [
              "Pertimbangkan kebijakan penghapusan piutang macet untuk kelompok >5 tahun yang sudah gagal ditagih berulang kali.",
            ],
            dataNotes: ["Skala bar dibandingkan terhadap batas Rp 20 M per kelompok umur."],
          }}
        >
          <div className="mb-4">
            <TextApp id="title-aging-piutang" variant="h3" weight="bold" className="text-ink-primary">
              Analisis Umur Piutang (Aging)
            </TextApp>
            <TextApp id="sub-aging-piutang" variant="caption" className="text-ink-secondary">
              Distribusi saldo piutang menurut lama tunggakan.
            </TextApp>
          </div>

          <ProgressListApp id="list-aging-piutang" items={agingItems} />
        </CardApp>

        <CardApp
          id="card-efektivitas-penagihan"
          className="flex flex-col border-hairline-soft p-5"
          insight={{
            title: "Efektivitas Penagihan",
            value: "38% Lunas/Cair",
            status: "waspada",
            meta: ["Efektivitas", "Status Respons", "Agustus 2026"],
            summary:
              "Menunjukkan bagaimana wajib pajak merespons upaya penagihan: sudah lunas, sedang mencicil, atau belum merespons sama sekali. Ini ukuran proses, bukan nilai uang.",
            current: [
              "38% piutang yang ditagih sudah lunas atau cair.",
              "40% masih belum merespons sama sekali upaya penagihan.",
            ],
            insights: [
              "Porsi 'belum merespons' yang lebih besar dari 'lunas/cair' menandakan tahap awal penagihan (kontak pertama) adalah titik lemah utama, bukan proses pelunasannya.",
            ],
            tacticalRecs: [
              "Uji kanal kontak alternatif (WhatsApp, SMS) untuk kelompok yang belum merespons surat konvensional.",
            ],
            strategicRecs: [
              "Bangun skor risiko wajib pajak berdasarkan riwayat respons untuk menentukan kanal penagihan yang paling efektif per individu.",
            ],
            dataNotes: ["Persentase atas jumlah kasus penagihan aktif periode berjalan."],
          }}
        >
          <div className="mb-3">
            <TextApp id="title-efektivitas-penagihan" variant="h3" weight="bold" className="text-ink-primary">
              Efektivitas Penagihan
            </TextApp>
          </div>

          {/* Donut penuh dengan angka di tengah — pola sama dengan "Kepatuhan
              SLA Keseluruhan" BR-10. */}
          <div className="relative flex flex-1 items-center justify-center">
            <ChartApp
              id="chart-efektivitas-penagihan"
              type="pie"
              data={EFEKTIVITAS_PENAGIHAN}
              innerRadius={70}
              outerRadius={94}
              valueFormatter={(v) => `${v}%`}
              height={220}
              showLegend={false}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <TextApp id="donut-efektivitas-value" variant="h2" weight="bold" className="text-emerald-600 dark:text-emerald-400">
                38%
              </TextApp>
              <TextApp
                id="donut-efektivitas-label"
                variant="caption"
                weight="bold"
                className="uppercase tracking-widest text-ink-muted"
              >
                Cair
              </TextApp>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-1.5 border-t border-hairline-soft pt-3">
            {EFEKTIVITAS_PENAGIHAN.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.fill }} />
                <TextApp id={`legend-efektivitas-${s.name}`} variant="caption" className="text-[11px] text-ink-secondary">
                  {s.name} ({s.value}%)
                </TextApp>
              </span>
            ))}
          </div>
        </CardApp>

        <CardApp
          id="card-prioritas-penagihan"
          className="flex flex-col border-hairline-soft p-5"
          insight={{
            title: "Prioritas Penagihan (Top 5 Nominal)",
            value: "PT Hotel Nusantara tertinggi",
            status: "kritis",
            meta: ["Peringkat", "Nominal Tunggakan", "TA 2026"],
            summary:
              "Lima wajib pajak dengan tunggakan bernilai terbesar. Menagih kelima entri ini akan mengurangi total piutang jauh lebih cepat daripada menagih ratusan wajib pajak bernilai kecil.",
            current: [
              "PT Hotel Nusantara menunggak Rp 850 Juta, tertinggi pada daftar.",
              "Kelima entri bersama menyumbang Rp 2,015 Miliar dari total piutang aktif.",
            ],
            insights: [
              "Lima wajib pajak ini setara dengan sekitar 4,5% total piutang aktif — proporsi kecil dari jumlah dokumen tapi besar dari sisi nilai.",
            ],
            tacticalRecs: [
              "Jadwalkan surat paksa untuk kelima entri ini di minggu pertama, sebelum menyebar ke daftar yang lebih panjang.",
            ],
            strategicRecs: [
              "Tetapkan ambang nominal yang otomatis memicu eskalasi ke surat paksa, tanpa menunggu peninjauan manual satu per satu.",
            ],
            dataNotes: ["Daftar diperbarui tiap kali ada perubahan status pembayaran."],
          }}
        >
          <div className="mb-4">
            <TextApp id="title-prioritas-penagihan" variant="h3" weight="bold" className="text-ink-primary">
              Prioritas Penagihan (Top 5 Nominal)
            </TextApp>
          </div>

          <ProgressListApp id="list-prioritas-penagihan" items={prioritasItems} />
        </CardApp>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DAFTAR TARGET EKSEKUSI (BR-13)                                 */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-target-eksekusi" className="border-hairline-soft p-5">
        <DataTableApp
          id="datatable-target-eksekusi"
          title="Daftar Target Eksekusi Penagihan Aktif"
          description="Wajib pajak dengan tunggakan aktif beserta umur piutang dan status tindakan penagihan."
          toolbarLayout="singleRow"
          data={TARGET_EKSEKUSI}
          columns={tableColumns}
          getRowId={(row) => row.id}
          searchPlaceholder="Cari NOP, nama wajib pajak, atau jenis pajak..."
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DIALOG DETAIL TARGET EKSEKUSI                                  */}
      {/* ------------------------------------------------------------- */}
      {selectedTarget && (
        <DialogApp
          id="dialog-detail-target-eksekusi"
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Target Eksekusi: ${selectedTarget.nama}`}
          description="Ringkasan tunggakan sebelum tindakan penagihan dijalankan."
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-2">
              <TextApp id="detail-label-nop" variant="caption" className="text-ink-secondary">
                NOP/NPWPD
              </TextApp>
              <TextApp id="detail-value-nop" variant="caption" weight="bold" className="font-mono text-ink">
                {selectedTarget.nop}
              </TextApp>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-2">
              <TextApp id="detail-label-jenis" variant="caption" className="text-ink-secondary">
                Jenis Pajak
              </TextApp>
              <TextApp id="detail-value-jenis" variant="caption" weight="bold" className="text-ink">
                {selectedTarget.jenis}
              </TextApp>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-2">
              <TextApp id="detail-label-umur" variant="caption" className="text-ink-secondary">
                Umur Piutang
              </TextApp>
              <TextApp id="detail-value-umur" variant="caption" weight="bold" className="text-ink">
                {selectedTarget.umur}
              </TextApp>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-2">
              <TextApp id="detail-label-tunggakan" variant="caption" className="text-ink-secondary">
                Nominal Tunggakan
              </TextApp>
              <TextApp id="detail-value-tunggakan" variant="caption" weight="bold" className="font-mono text-rose-600 dark:text-rose-400">
                {formatRupiah(selectedTarget.tunggakanRp)}
              </TextApp>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-2">
              <TextApp id="detail-label-status" variant="caption" className="text-ink-secondary">
                Status Tindakan
              </TextApp>
              <BadgeApp id="detail-value-status" variant={statusBadgeVariant(selectedTarget.status)} size="sm">
                {selectedTarget.status}
              </BadgeApp>
            </div>
          </div>
        </DialogApp>
      )}
    </div>
  );
}

export default TaxArrearsDashboardPage;
