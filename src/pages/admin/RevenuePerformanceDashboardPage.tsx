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
  useToastApp,
  useRealtimeValue,
  useRealtimeRows,
  QuickPreset,
} from "@/packages/design-system";
import {
  RefreshCw,
  Download,
  Filter,
  Calendar,
  LineChart,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { CHART_COLORS, CHART_TARGET_COLOR } from "@/constants/chartColors";

// Kontribusi per sektor pajak — nilai persis mengikuti acuan prototype.
const KONTRIBUSI_SEKTOR = [
  { name: "PBB-P2", value: 35, fill: CHART_COLORS.blue },
  { name: "PBJT", value: 40, fill: CHART_COLORS.emerald },
  { name: "Reklame", value: 15, fill: CHART_COLORS.amber },
  { name: "Lainnya", value: 10, fill: CHART_TARGET_COLOR },
];

// Tren penerimaan kas Jan-Ags 2026 — satuan Miliar Rp, persis acuan.
const TREN_PENERIMAAN_KAS = [
  { bulan: "Jan", nilaiM: 45 },
  { bulan: "Feb", nilaiM: 52 },
  { bulan: "Mar", nilaiM: 68 },
  { bulan: "Apr", nilaiM: 74 },
  { bulan: "Mei", nilaiM: 85 },
  { bulan: "Jun", nilaiM: 92 },
  { bulan: "Jul", nilaiM: 110 },
  { bulan: "Ags", nilaiM: 86 },
];

type StatusMutasi = "Berhasil" | "Pending";

interface MutasiKas {
  id: string;
  waktu: string;
  sektor: string;
  kanal: string;
  nominalRp: number;
  status: StatusMutasi;
}

const MUTASI_KAS_AWAL: MutasiKas[] = [
  { id: "TX-20260815-001", waktu: "15 Agu 2026, 09:12 WIB", sektor: "PBB-P2", kanal: "Bank BPD DIY", nominalRp: 12_500_000, status: "Berhasil" },
  { id: "TX-20260815-002", waktu: "15 Agu 2026, 10:45 WIB", sektor: "PBJT Hotel", kanal: "QRIS - Bank Mandiri", nominalRp: 45_750_000, status: "Berhasil" },
  { id: "TX-20260815-003", waktu: "15 Agu 2026, 11:20 WIB", sektor: "Pajak Reklame", kanal: "VA - BNI", nominalRp: 8_200_000, status: "Pending" },
  { id: "TX-20260815-004", waktu: "15 Agu 2026, 13:05 WIB", sektor: "Retribusi Parkir", kanal: "Tunai (Setor Kasda)", nominalRp: 3_150_000, status: "Berhasil" },
  { id: "TX-20260815-005", waktu: "15 Agu 2026, 14:30 WIB", sektor: "PBJT Restoran", kanal: "EDC - BCA", nominalRp: 18_900_000, status: "Berhasil" },
];

const SEKTOR_POOL = ["PBB-P2", "PBJT Hotel", "PBJT Restoran", "Pajak Reklame", "Retribusi Parkir", "BPHTB"];
const KANAL_POOL = ["Bank BPD DIY", "QRIS - Bank Mandiri", "VA - BNI", "Tunai (Setor Kasda)", "EDC - BCA"];

const performaFilterFields = [
  {
    id: "sektorPendapatan",
    label: "Sektor Pendapatan",
    type: "select" as const,
    placeholder: "Pilih Sektor...",
    options: [
      { value: "all", label: "Semua Sektor Pendapatan" },
      { value: "pbb_p2", label: "PBB-P2" },
      { value: "pbjt", label: "PBJT" },
      { value: "reklame", label: "Pajak Reklame" },
      { value: "lainnya", label: "Lainnya" },
    ],
  },
  {
    id: "kanalPembayaran",
    label: "Kanal Pembayaran",
    type: "select" as const,
    placeholder: "Pilih Kanal...",
    options: [
      { value: "all", label: "Semua Kanal Pembayaran" },
      { value: "bank", label: "Transfer Bank" },
      { value: "qris_va", label: "QRIS / Virtual Account" },
      { value: "tunai", label: "Tunai (Setor Kasda)" },
      { value: "edc", label: "EDC" },
    ],
  },
  {
    id: "statusMutasi",
    label: "Status Mutasi",
    type: "select" as const,
    placeholder: "Semua Status...",
    options: [
      { value: "all", label: "Semua Status Mutasi" },
      { value: "berhasil", label: "Berhasil" },
      { value: "pending", label: "Pending" },
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
  { label: "Semua Mutasi", values: { sektorPendapatan: "all", statusMutasi: "all" } },
  { label: "Sektor PBJT", values: { sektorPendapatan: "pbjt" } },
  { label: "Masih Pending", values: { statusMutasi: "pending" } },
  { label: "Via QRIS/VA", values: { kanalPembayaran: "qris_va" } },
];

const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const formatRupiahM = (valueInMiliar: number) => `Rp ${valueInMiliar.toFixed(1).replace(".", ",")} M`;

// Target APBD 2026 tetap dari Perda — dipakai untuk menurunkan persentase
// capaian & sisa defisit dari satu angka realisasi live, bukan tiga angka
// terpisah yang bisa saling tak sinkron.
const TARGET_APBD_M = 850.5;

export function RevenuePerformanceDashboardPage() {
  const { toast } = useToastApp();
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  // Realisasi kas bertambah setiap pembayaran masuk. Capaian% dan sisa
  // defisit diturunkan langsung darinya. Target APBD & pertumbuhan YoY
  // TIDAK di-live-kan: pagu tahunan tetap dari Perda dan angka pembanding
  // tahun lalu, bukan aliran transaksi.
  const liveRealisasiKasM = useRealtimeValue({
    initialValue: 612.3,
    update: (v) => Math.min(TARGET_APBD_M, v + Math.random() * 0.8),
    intervalMs: 7000,
  });
  const capaianPersen = (liveRealisasiKasM / TARGET_APBD_M) * 100;
  const sisaTargetM = Math.max(0, TARGET_APBD_M - liveRealisasiKasM);

  // Log mutasi kas — kandidat paling wajar untuk baris realtime: transaksi
  // pembayaran memang masuk terus sepanjang jam kas dibuka.
  const { rows: mutasiRows, newRowIds } = useRealtimeRows<MutasiKas>({
    initialRows: MUTASI_KAS_AWAL,
    getId: (row) => row.id,
    intervalMs: 11000,
    maxRows: 15,
    generate: () => {
      const seq = Math.floor(Math.random() * 900) + 100;
      const now = new Date();
      const jam = String(now.getHours()).padStart(2, "0");
      const menit = String(now.getMinutes()).padStart(2, "0");
      return {
        id: `TX-20260815-${seq}`,
        waktu: `15 Agu 2026, ${jam}:${menit} WIB`,
        sektor: SEKTOR_POOL[Math.floor(Math.random() * SEKTOR_POOL.length)],
        kanal: KANAL_POOL[Math.floor(Math.random() * KANAL_POOL.length)],
        nominalRp: (Math.floor(Math.random() * 400) + 20) * 100_000,
        status: Math.random() > 0.15 ? "Berhasil" : "Pending",
      };
    },
  });

  const handleResetFilter = () => {
    setFilterValues({});
    toast.info("Filter Performa Direset", {
      description: "Semua kriteria sektor, kanal pembayaran, dan status mutasi dikembalikan ke kondisi awal.",
    });
  };

  const trenChartData = TREN_PENERIMAAN_KAS.map((t) => ({ name: t.bulan, nilai: t.nilaiM }));

  const tableColumns = [
    {
      accessorKey: "id",
      header: "ID Transaksi",
      cell: ({ row }: any) => <span className="font-mono text-xs text-ink-muted">{row.original.id}</span>,
    },
    { accessorKey: "waktu", header: "Waktu Masuk" },
    {
      accessorKey: "sektor",
      header: "Sektor Pendapatan",
      cell: ({ row }: any) => (
        <BadgeApp id={`badge-sektor-${row.original.id}`} variant="neutral" size="sm">
          {row.original.sektor}
        </BadgeApp>
      ),
    },
    { accessorKey: "kanal", header: "Kanal Pembayaran" },
    {
      accessorKey: "nominalRp",
      header: "Nominal Masuk",
      cell: ({ row }: any) => (
        <span className="font-mono text-xs font-bold text-ink">{formatRupiah(row.original.nominalRp)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <BadgeApp
          id={`badge-status-${row.original.id}`}
          variant={row.original.status === "Berhasil" ? "solidEmerald" : "solidAmber"}
          size="sm"
        >
          {row.original.status}
        </BadgeApp>
      ),
    },
  ];

  return (
    <div id="performa-realisasi-dashboard-root" className="space-y-6 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* HEADER PAGE                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col justify-between gap-4 border-b border-hairline-soft pb-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <BadgeApp id="hdr-badge-br14" variant="solidPurple" size="sm">
              BR-14 · Dashboard Performa & Realisasi Pendapatan
            </BadgeApp>
            <span className="flex items-center gap-1 text-xs text-ink-muted">
              <LineChart className="h-3.5 w-3.5 text-vibrant-purple" />
              Sub Bidang Pengembangan Penerimaan Daerah P4
            </span>
            <span className="flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="h-3.5 w-3.5 text-vibrant-purple" />
              Tahun Anggaran 2026
            </span>
          </div>
          <TextApp id="hdr-title-performa" variant="h2" className="tracking-tight text-ink">
            Dashboard Performa & Realisasi Pendapatan Daerah
          </TextApp>
          <TextApp id="hdr-sub-performa" variant="body" className="text-xs text-ink-secondary">
            Monitoring Capaian Target APBD, Kontribusi Sektor, & Mutasi Kas Daerah
          </TextApp>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ButtonApp
            id="btn-refresh-performa"
            variant="secondary"
            size="sm"
            rounded="lg"
            onClick={() =>
              toast.info("Data Kas Disinkronkan", {
                description: "Mutasi kas daerah diperbarui dari sistem penerimaan bank & kanal digital.",
              })
            }
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Sync Data
          </ButtonApp>
          <ButtonApp
            id="btn-export-performa"
            variant="primary"
            size="sm"
            rounded="lg"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() =>
              toast.vibrant("Laporan Performa Diunduh", {
                description: "Berisi capaian target APBD, kontribusi sektor, dan log mutasi kas daerah.",
              })
            }
          >
            Unduh Laporan
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
            id="select-sektor-pendapatan"
            value={String(filterValues.sektorPendapatan ?? "all")}
            onChange={(value) => setFilterValues((prev) => ({ ...prev, sektorPendapatan: String(value) }))}
            options={[
              { label: "Semua Sektor Pendapatan", value: "all" },
              { label: "PBB-P2", value: "pbb_p2" },
              { label: "PBJT", value: "pbjt" },
              { label: "Pajak Reklame", value: "reklame" },
              { label: "Lainnya", value: "lainnya" },
            ]}
            size="sm"
            rounded="lg"
            menuPortal
          />
        </div>

        <div className="ml-auto shrink-0">
          <AdvanceFilterApp
            id="filter-performa-realisasi"
            displayMode="modal"
            showActivePills={false}
            className="w-auto"
            triggerLabel="Advance Filter Performa"
            triggerVariant="secondary"
            triggerSize="sm"
            triggerRounded="lg"
            title="Filter Sektor, Kanal, & Status Mutasi"
            fields={performaFilterFields}
            values={filterValues}
            onChange={setFilterValues}
            quickPresets={quickPresets}
            onReset={handleResetFilter}
            onApply={() => {
              toast.vibrant("Filter Performa Diterapkan", {
                description: "Menampilkan mutasi kas sesuai kriteria yang dipilih.",
              });
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCORECARD PERFORMA (BR-14)                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-2">
        <TextApp
          id="label-capaian-apbd-heading"
          variant="caption"
          weight="bold"
          className="uppercase tracking-widest text-ink-muted"
        >
          Capaian Target APBD
        </TextApp>
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ScorecardApp
            id="card-target-apbd"
            variant="clayPurple"
            title="Target APBD 2026"
            // Tidak di-live-kan: pagu tahunan tetap dari Perda APBD, bukan
            // angka yang berubah tiap transaksi.
            value={formatRupiahM(TARGET_APBD_M)}
            unit="Total Pendapatan Asli Daerah"
            description="Pagu penerimaan PAD yang ditetapkan Perda TA 2026"
            icon={<Wallet className="h-5 w-5 text-white" />}
            infoTooltip="Pagu total Pendapatan Asli Daerah yang ditetapkan dalam APBD TA 2026."
            infoContent={{
              formula: "Nilai pagu PAD sebagaimana ditetapkan Peraturan Daerah APBD TA 2026",
              period: "Tahun anggaran (tetap)",
              source: "Perda APBD Kota Yogyakarta TA 2026",
              lastUpdated: "Awal TA 2026",
            }}
            insight={{
              title: "Target APBD 2026",
              value: "Rp 850,5 Miliar",
              status: "sehat",
              meta: ["Target", "Pagu PAD", "TA 2026"],
              summary:
                "Angka acuan tetap sepanjang tahun anggaran. Tiga kartu di sebelahnya — realisasi, sisa target, dan pertumbuhan — semuanya diukur relatif terhadap angka ini.",
              current: ["Target Rp 850,5 M ditetapkan dalam Perda APBD TA 2026, tidak berubah sepanjang tahun."],
              insights: [
                "Karena target ini tetap, seluruh dinamika performa penerimaan tercermin di kartu Realisasi dan Sisa Target, bukan di sini.",
              ],
              tacticalRecs: [
                "Gunakan angka ini sebagai pembagi tetap saat menghitung capaian bulanan, jangan dihitung ulang tiap laporan.",
              ],
              strategicRecs: [
                "Evaluasi realisme target ini pada penyusunan APBD Perubahan bila tren realisasi jauh menyimpang.",
              ],
              dataNotes: ["Berubah hanya lewat mekanisme APBD Perubahan, bukan snapshot real-time."],
            }}
          />

          <ScorecardApp
            id="card-total-realisasi-kas"
            variant="emerald"
            title="Total Realisasi Kas"
            value={formatRupiahM(liveRealisasiKasM)}
            live
            unit={`${capaianPersen.toFixed(0)}% dari Target Tercapai`}
            description="Akumulasi penerimaan kas daerah tahun berjalan"
            trend={{ value: `${capaianPersen.toFixed(0)}%`, label: "Capaian Target", isPositive: true, direction: "up" }}
            icon={<ArrowUpRight className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />}
            infoTooltip="Akumulasi penerimaan kas daerah dari seluruh sektor sejak awal tahun anggaran."
            infoContent={{
              formula: "Jumlah seluruh mutasi kas masuk berstatus Berhasil sejak awal TA 2026",
              period: "Tahun anggaran berjalan (real-time)",
              source: "SIMPAD — Modul Kas Daerah",
              lastUpdated: "Baru saja",
            }}
            insight={{
              title: "Total Realisasi Kas",
              value: `Rp ${liveRealisasiKasM.toFixed(1).replace(".", ",")} Miliar`,
              status: capaianPersen >= 70 ? "sehat" : "waspada",
              meta: ["Realisasi", "Kas Daerah", "TA 2026"],
              summary:
                "Akumulasi seluruh penerimaan kas sejak awal tahun. Angka ini yang menentukan apakah target tahunan akan tercapai, bukan tren bulanan sesaat.",
              current: [`Realisasi mencapai ${capaianPersen.toFixed(0)}% dari target Rp 850,5 M.`],
              insights: [
                "Tren bulanan pada grafik di bawah sempat naik tajam pada Juli lalu turun di Agustus — realisasi kumulatif tetap naik karena sifatnya akumulatif, bukan bulanan.",
              ],
              tacticalRecs: [
                "Selidiki penurunan bulan Agustus pada grafik tren; kalau musiman, tak perlu tindakan tambahan.",
              ],
              strategicRecs: [
                "Tetapkan checkpoint capaian per triwulan agar keterlambatan terdeteksi sebelum akhir tahun anggaran.",
              ],
              dataNotes: ["Snapshot real-time; angka bertambah seiring pembayaran diterima kas daerah."],
            }}
          />

          <ScorecardApp
            id="card-sisa-target-defisit"
            variant="clayYellow"
            title="Sisa Target (Defisit)"
            // Diturunkan dari Target APBD dikurangi realisasi live — bukan
            // angka statis terpisah, supaya tidak pernah tak sinkron.
            value={formatRupiahM(sisaTargetM)}
            live
            unit="Harus Dicapai di Q3 & Q4"
            description="Selisih menuju target APBD tahun berjalan"
            icon={<AlertTriangle className="h-5 w-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Selisih antara target APBD dan realisasi kas kumulatif tahun berjalan."
            infoContent={{
              formula: "Target APBD 2026 dikurangi Total Realisasi Kas kumulatif",
              period: "Tahun anggaran berjalan (real-time)",
              source: "SIMPAD — Modul Kas Daerah",
              lastUpdated: "Baru saja",
            }}
            insight={{
              title: "Sisa Target (Defisit)",
              value: `Rp ${sisaTargetM.toFixed(1).replace(".", ",")} Miliar`,
              status: "waspada",
              meta: ["Target", "Sisa Capaian", "TA 2026"],
              summary:
                "Jarak yang masih harus ditempuh sebelum akhir tahun anggaran. Berbeda dari Sisa Target Pencairan di BR-13 — angka ini mencakup seluruh sektor PAD, bukan hanya piutang.",
              current: ["Sisa Rp 238,2 M harus terealisasi di Triwulan III dan IV."],
              insights: [
                "Dua kuartal terakhir historisnya menyumbang porsi penerimaan lebih besar (sektor PBJT musiman menjelang akhir tahun) — target ini tidak seberat kelihatannya di atas kertas.",
              ],
              tacticalRecs: [
                "Petakan sektor mana yang biasanya menyumbang lonjakan Q3-Q4 dan siapkan kapasitas layanannya lebih awal.",
              ],
              strategicRecs: [
                "Jangan menunggu Q4 untuk evaluasi — tinjau progres tiap bulan agar koreksi masih mungkin dilakukan.",
              ],
              dataNotes: ["Angka derivatif; berubah otomatis mengikuti realisasi kas."],
            }}
          />

          <ScorecardApp
            id="card-pertumbuhan-yoy"
            variant="blue"
            title="Pertumbuhan YoY"
            // Tidak di-live-kan: pembanding terhadap Agustus 2025, angka
            // historis tetap sampai periode berikutnya ditutup.
            value="+12,4%"
            unit="Dibanding Agustus 2025"
            description="Pertumbuhan realisasi kas tahun ke tahun"
            trend={{ value: "+12,4%", label: "vs Agustus 2025", isPositive: true, direction: "up" }}
            icon={<ArrowUpRight className="h-5 w-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Perbandingan realisasi kas periode berjalan terhadap periode yang sama tahun sebelumnya."
            infoContent={{
              formula: "((Realisasi Agustus 2026 - Realisasi Agustus 2025) / Realisasi Agustus 2025) x 100%",
              period: "Perbandingan tahunan (year-on-year)",
              source: "SIMPAD — Modul Kas Daerah",
              lastUpdated: "Awal bulan berjalan",
            }}
            insight={{
              title: "Pertumbuhan YoY",
              value: "+12,4%",
              status: "sehat",
              meta: ["Pertumbuhan", "Year on Year", "Agustus 2026"],
              summary:
                "Menjawab pertanyaan berbeda dari capaian target: bukan 'apakah sesuai rencana', tapi 'apakah lebih baik dari tahun lalu'. Keduanya bisa berbeda arah.",
              current: ["Realisasi Agustus 2026 tumbuh 12,4% dibanding Agustus 2025."],
              insights: [
                "Pertumbuhan YoY positif meski capaian target masih di bawah 100% — artinya kinerja membaik dari tahun ke tahun, tapi target tahunan memang dipatok lebih ambisius.",
              ],
              tacticalRecs: [
                "Gunakan angka YoY untuk laporan kinerja ke pimpinan; gunakan capaian target untuk perencanaan operasional.",
              ],
              strategicRecs: [
                "Bila pertumbuhan YoY konsisten dua digit, pertimbangkan menaikkan target APBD tahun berikutnya secara proporsional.",
              ],
              dataNotes: ["Pembanding tetap sampai laporan bulan berikutnya ditutup."],
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* KONTRIBUSI SEKTOR + TREN PENERIMAAN KAS (BR-14)                */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardApp
          id="card-kontribusi-sektor"
          className="flex flex-col border-hairline-soft p-5"
          insight={{
            title: "Kontribusi per Sektor Pajak",
            value: "PBJT 40% terbesar",
            status: "sehat",
            meta: ["Komposisi", "Sektor Pajak", "TA 2026"],
            summary:
              "Membagi realisasi kas menurut sumbernya. Menunjukkan sektor mana yang paling menentukan capaian target keseluruhan.",
            current: ["PBJT menyumbang 40% realisasi, disusul PBB-P2 35%."],
            insights: [
              "Dua sektor teratas menguasai 75% penerimaan — kinerja target tahunan sangat bergantung pada performa PBJT dan PBB-P2, bukan tersebar merata ke semua sektor.",
            ],
            tacticalRecs: [
              "Pantau realisasi PBJT dan PBB-P2 lebih ketat dibanding sektor lain — keduanya paling menentukan capaian akhir tahun.",
            ],
            strategicRecs: [
              "Kembangkan sektor 'Lainnya' (10%) sebagai diversifikasi jangka panjang, mengurangi ketergantungan pada dua sektor utama.",
            ],
            dataNotes: ["Persentase atas total realisasi kas periode berjalan."],
          }}
        >
          <div className="mb-3">
            <TextApp id="title-kontribusi-sektor" variant="h3" weight="bold" className="text-ink-primary">
              Kontribusi per Sektor Pajak
            </TextApp>
          </div>

          <div className="flex-1">
            <ChartApp
              id="chart-kontribusi-sektor"
              type="pie"
              data={KONTRIBUSI_SEKTOR}
              innerRadius={60}
              outerRadius={92}
              valueFormatter={(v) => `${v}%`}
              height={260}
              showLegend
            />
          </div>
        </CardApp>

        <CardApp
          id="card-tren-penerimaan-kas"
          className="flex flex-col border-hairline-soft p-5 lg:col-span-2"
          insight={{
            title: "Tren Penerimaan Kas",
            value: "Puncak Juli, Rp 110 M",
            status: "waspada",
            meta: ["Tren", "Penerimaan Bulanan", "Jan-Ags 2026"],
            summary:
              "Menunjukkan pergerakan penerimaan kas bulan ke bulan, bukan akumulasi. Pola musiman di sini membantu menentukan kapan lonjakan penerimaan biasa terjadi.",
            current: [
              "Penerimaan naik konsisten dari Rp 45 M (Januari) ke puncak Rp 110 M (Juli).",
              "Agustus turun ke Rp 86 M — perlu dicermati apakah musiman atau tanda perlambatan.",
            ],
            insights: [
              "Penurunan Agustus terjadi tepat setelah puncak Juli — pola ini konsisten dengan siklus jatuh tempo ketetapan yang memuncak pertengahan tahun, bukan berarti kinerja memburuk.",
            ],
            tacticalRecs: [
              "Bandingkan pola Agustus ini dengan Agustus tahun-tahun sebelumnya untuk memastikan ini musiman, bukan anomali baru.",
            ],
            strategicRecs: [
              "Jadikan pola musiman ini dasar penjadwalan kampanye penagihan supaya selaras dengan siklus alami penerimaan, bukan melawannya.",
            ],
            dataNotes: ["Nilai bulanan, bukan akumulasi — berbeda dari kartu Total Realisasi Kas di atas."],
          }}
        >
          <div className="mb-3">
            <TextApp id="title-tren-penerimaan-kas" variant="h3" weight="bold" className="text-ink-primary">
              Tren Penerimaan Kas (Jan - Ags 2026)
            </TextApp>
          </div>

          <div className="flex-1">
            <ChartApp
              id="chart-tren-penerimaan-kas"
              type="area"
              data={trenChartData}
              xKey="name"
              series={[{ key: "nilai", label: "Realisasi Bulanan", color: CHART_COLORS.blue }]}
              valueFormatter={(v) => `${v} M`}
              height={260}
              showGrid
              showTooltip
              showLegend={false}
            />
          </div>
        </CardApp>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LOG MUTASI KAS DAERAH (BR-14)                                  */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-mutasi-kas" className="border-hairline-soft p-5">
        <DataTableApp
          id="datatable-mutasi-kas"
          title="Log Mutasi Kas Daerah (Terbaru)"
          description="Transaksi penerimaan kas daerah dari seluruh kanal pembayaran. Transaksi baru muncul dari atas."
          toolbarLayout="singleRow"
          rightHeaderAction={
            <BadgeApp id="badge-mutasi-live" variant="solidEmerald" size="sm">
              Live Feed
            </BadgeApp>
          }
          data={mutasiRows}
          newRowIds={newRowIds}
          getRowId={(row) => row.id}
          columns={tableColumns}
          searchPlaceholder="Cari ID transaksi, sektor, atau kanal pembayaran..."
          pageSize={5}
        />
      </CardApp>
    </div>
  );
}

export default RevenuePerformanceDashboardPage;
