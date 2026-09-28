import * as React from "react";
import {
  ScorecardApp,
  CardApp,
  BadgeApp,
  ButtonApp,
  TextApp,
  DataTableApp,
  ChartApp,
  useToastApp,
  DialogApp,
  SelectApp,
  TabsApp,
  TabsListApp,
  TabsTriggerApp,
  AdvanceFilterApp,
  FilterFieldConfig,
} from "@/packages/design-system";
import {
  TrendingUp,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Download,
  Calendar,
  Layers,
  Search,
  Filter,
  DollarSign,
  PieChart,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function TaxDashboardPage() {
  const { toast } = useToastApp();
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastUpdate, setLastUpdate] = React.useState("27 Juli 2026, 18:40:12 WIB");
  const [selectedPeriod, setSelectedPeriod] = React.useState("2026");
  const [selectedTaxType, setSelectedTaxType] = React.useState("semua");
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalData, setModalData] = React.useState<any>(null);

  const [advanceFilterValues, setAdvanceFilterValues] = React.useState<Record<string, any>>({
    kecamatan: "danurejan",
    jenisPajak: ["pbb", "bphtb", "pbjt"],
    statusKepatuhan: "lunas",
    rentangTanggal: { from: "2026-01-01", to: "2026-07-27" },
  });

  const filterFields: FilterFieldConfig[] = [
    {
      id: "kecamatan",
      label: "Wilayah Kecamatan",
      type: "select",
      placeholder: "-- Pilih Kecamatan --",
      colSpan: 1,
      options: [
        { label: "Kec. Danurejan", value: "danurejan" },
        { label: "Kec. Gondomanan", value: "gondomanan" },
        { label: "Kec. Jetis", value: "jetis" },
        { label: "Kec. Kotagede", value: "kotagede" },
        { label: "Kec. Kraton / Malioboro", value: "kraton" },
        { label: "Kec. Umbulharjo", value: "umbulharjo" },
      ],
    },
    {
      id: "statusKepatuhan",
      label: "Status Kepatuhan WP",
      type: "select",
      colSpan: 1,
      placeholder: "-- Pilih Status --",
      options: [
        { label: "Lunas / Tervalidasi", value: "lunas" },
        { label: "Proses Verifikasi", value: "proses" },
        { label: "Menunggak / Belum Lunas", value: "menunggak" },
      ],
    },
    {
      id: "jenisPajak",
      label: "Kategori Pajak Daerah (Multi Select)",
      type: "multi-select",
      colSpan: 2,
      options: [
        { label: "PBB-P2 Perkotaan & Pedesaan", value: "pbb" },
        { label: "BPHTB Bea Perolehan Hak", value: "bphtb" },
        { label: "PBJT (Resto, Hotel, Parkir, Hiburan)", value: "pbjt" },
        { label: "Pajak Reklame", value: "reklame" },
        { label: "Pajak Air Tanah (PAT)", value: "pat" },
      ],
    },
    {
      id: "rentangTanggal",
      label: "Rentang Tanggal Penetapan & Setoran APBD",
      type: "date-range",
      colSpan: 2,
    },
  ];

  // Trigger manual data sync simulator
  const handleSyncData = () => {
    setIsSyncing(true);
    toast.info("Sinkronisasi Data Dimulai", {
      description: "Mengambil data WP/OP dan realisasi terbaru dari SIMPATDA...",
    });

    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const formatted = `${now.getDate()} Juli 2026, ${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}:${now.getSeconds() < 10 ? "0" : ""}${now.getSeconds()} WIB`;
      setLastUpdate(formatted);
      toast.success("Sinkronisasi Berhasil", {
        description: "Data Target, Realisasi, dan Objek Pajak telah berhasil diperbarui.",
      });
    }, 1200);
  };

  // Sample data table for Recent Tax Transactions / Realisasi Pajak
  const recentTransactions = [
    {
      id: "NOP-00129",
      wpName: "PT Hotel Grand Malioboro",
      jenisPajak: "PBJT Makanan & Minuman",
      nominal: "Rp 125.400.000",
      tanggal: "27 Jul 2026 18:25",
      status: "Lunas",
      badgeVariant: "success" as const,
    },
    {
      id: "NOP-00130",
      wpName: "CV Resto Nusantara Jaya",
      jenisPajak: "PBJT Jasa Katering",
      nominal: "Rp 42.800.000",
      tanggal: "27 Jul 2026 17:50",
      status: "Diproses",
      badgeVariant: "warning" as const,
    },
    {
      id: "NOP-00131",
      wpName: "Bpk. H. Ahmad Sudirman",
      jenisPajak: "PBB-P2 Perkotaan",
      nominal: "Rp 8.750.000",
      tanggal: "27 Jul 2026 16:15",
      status: "Lunas",
      badgeVariant: "success" as const,
    },
    {
      id: "NOP-00132",
      wpName: "PT Sentosa Graha Properti",
      jenisPajak: "BPHTB Pemindahan Hak",
      nominal: "Rp 310.000.000",
      tanggal: "27 Jul 2026 15:40",
      status: "Verifikasi",
      badgeVariant: "info" as const,
    },
    {
      id: "NOP-00133",
      wpName: "Gedung Parkir Plaza Utama",
      jenisPajak: "PBJT Jasa Parkir",
      nominal: "Rp 18.250.000",
      tanggal: "27 Jul 2026 14:20",
      status: "Lunas",
      badgeVariant: "success" as const,
    },
  ];

  const transactionColumns = [
    {
      header: "Nomor NOP / BKU",
      accessorKey: "id",
      cell: (info: any) => (
        <span className="font-mono text-xs font-bold text-vibrant-purple-dark">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Nama Wajib Pajak",
      accessorKey: "wpName",
      cell: (info: any) => (
        <span className="font-semibold text-ink text-xs">{info.getValue()}</span>
      ),
    },
    {
      header: "Jenis Pajak Daerah",
      accessorKey: "jenisPajak",
      cell: (info: any) => (
        <span className="text-xs text-ink-secondary">{info.getValue()}</span>
      ),
    },
    {
      header: "Nominal Bayar",
      accessorKey: "nominal",
      cell: (info: any) => (
        <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Waktu Pembayaran",
      accessorKey: "tanggal",
      cell: (info: any) => (
        <span className="text-[11px] text-ink-muted">{info.getValue()}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const row = info.row.original;
        return (
          <BadgeApp id={`status-${row.id}`} variant={row.badgeVariant} size="sm">
            {row.status}
          </BadgeApp>
        );
      },
    },
  ];

  // Chart series for revenue monthly progress
  const chartMonthlyData = [
    { label: "Jan", target: 100, realisasi: 98 },
    { label: "Feb", target: 200, realisasi: 195 },
    { label: "Mar", target: 310, realisasi: 312 },
    { label: "Apr", target: 420, realisasi: 415 },
    { label: "Mei", target: 530, realisasi: 538 },
    { label: "Jun", target: 640, realisasi: 652 },
    { label: "Jul", target: 750, realisasi: 785 },
    { label: "Agu", target: 860, realisasi: 0 },
    { label: "Sep", target: 970, realisasi: 0 },
    { label: "Okt", target: 1080, realisasi: 0 },
    { label: "Nov", target: 1160, realisasi: 0 },
    { label: "Des", target: 1250, realisasi: 0 },
  ];

  const handleOpenDetail = (title: string, data: any) => {
    setModalTitle(title);
    setModalData(data);
    setDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 pb-20 text-left select-none max-w-[1600px] mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-hairline-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BadgeApp id="badge-tax-dashboard" variant="solidPurple" size="sm">
              Sistem Informasi Pendapatan Daerah
            </BadgeApp>
            <span className="text-xs text-ink-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-vibrant-purple" />
              Tahun Anggaran {selectedPeriod}
            </span>
          </div>
          <TextApp id="tax-dashboard-title" variant="h2" className="tracking-tight text-ink">
            Dashboard Pendapatan & Objek Pajak
          </TextApp>
          <TextApp id="tax-dashboard-subtitle" variant="body" className="text-ink-secondary text-xs">
            Ikhtisar real-time kinerja penerimaan pajak daerah, penetapan, pelayanan, dan basis data WP/OP.
          </TextApp>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <ButtonApp
            id="btn-sync-data"
            variant="secondary"
            size="sm"
            rounded="pill"
            onClick={handleSyncData}
            disabled={isSyncing}
            className="text-xs gap-2 border-hairline font-display"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-vibrant-purple" : ""}`} />
            {isSyncing ? "Menyinkronkan..." : "Sync Data"}
          </ButtonApp>

          <ButtonApp
            id="btn-export-tax-report"
            variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            className="text-xs gap-2 shadow-sm font-display cursor-pointer"
            onClick={() => {
              toast.success("Laporan Diunduh", {
                description: "Laporan Pendapatan Pajak Daerah (PDF/Excel) sedang diunduh.",
              });
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan
          </ButtonApp>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="bg-surface border border-hairline rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full text-xs flex-wrap">
          <div className="flex items-center gap-1.5 font-semibold text-ink-secondary shrink-0">
            <Filter className="w-4 h-4 text-vibrant-purple" />
            <span>Filter Kategori:</span>
          </div>

          <TabsApp
            id="filter-period-tabs"
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-fit shrink-0 self-start sm:self-auto"
          >
            <TabsListApp id="filter-period-tabs-list" variant="default" size="sm" fitContent>
              <TabsTriggerApp id="filter-period-2026" value="2026" size="sm">
                TA 2026
              </TabsTriggerApp>
              <TabsTriggerApp id="filter-period-2025" value="2025" size="sm">
                TA 2025
              </TabsTriggerApp>
            </TabsListApp>
          </TabsApp>

          <div className="w-full sm:w-64 shrink-0">
            <SelectApp
              id="select-tax-category"
              size="sm"
              rounded="pill"
              theme="playful"
              className="text-xs font-medium"
              value={selectedTaxType}
              onChange={(e) => setSelectedTaxType(e.target.value)}
              options={[
                { value: "semua", label: "Semua Jenis Pajak Daerah" },
                { value: "pbb", label: "PBB-P2 Perkotaan & Pedesaan" },
                { value: "bphtb", label: "BPHTB Bea Perolehan Hak" },
                { value: "pbjt", label: "PBJT (Resto, Hotel, Parkir, Hiburan)" },
                { value: "pat", label: "Pajak Air Tanah (PAT)" },
                { value: "reklame", label: "Pajak Reklame" },
              ]}
            />
          </div>

          {/* ADVANCE FILTER INTEGRATION */}
          <div className="shrink-0 self-start sm:self-auto">
            <AdvanceFilterApp
              id="tax-dashboard-advance-filter"
              displayMode="drawer"
              showActivePills={false}
              title="Filter Lanjutan Dashboard Pendapatan BPKAD"
              triggerLabel="Advance Filter"
              triggerVariant="purpleDark"
              triggerSize="sm"
              triggerRounded="pill"
              fields={filterFields}
              values={advanceFilterValues}
              onChange={setAdvanceFilterValues}
              onApply={(applied) => {
                toast.success("Filter Diterapkan", {
                  description: "Data dashboard telah disesuaikan berdasarkan kriteria pencarian.",
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* BENTO GRID: 9 SCORECARDS (KEY METRICS REQUIREMENT) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {/* 1. Target Pendapatan (Featured Col-Span-2 Clay Purple Card) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 flex flex-col h-full">
          <ScorecardApp
            id="card-target-pendapatan"
            variant="clayPurple"
            title="Target Pendapatan"
            value="Rp 1.250.000.000.000"
            unit="APBD 2026"
            description="Target Penerimaan Pokok Pajak Daerah berdasarkan Perda APBD Murni 2026"
            badge="Target Utama"
            icon={<DollarSign className="w-6 h-6 text-white" />}
            trend={{
              value: "+12.0%",
              label: "Kenaikan vs Target 2025",
              isPositive: true,
              direction: "up",
            }}
            infoTooltip="Total target penerimaan pendapatan daerah APBD Murni 2026"
            onClick={() =>
              handleOpenDetail("Detail Target Pendapatan APBD 2026", {
                targetMurni: "Rp 1.250.000.000.000",
                targetPerubahan: "Rp 1.300.000.000.000 (Rencana)",
                sektorUtama: [
                  "PBJT Resto/Hotel: Rp 450 M",
                  "BPHTB: Rp 380 M",
                  "PBB-P2: Rp 220 M",
                  "Lainnya: Rp 200 M",
                ],
              })
            }
          />
        </div>

        {/* 2. Realisasi Pendapatan (Clay Yellow Card) */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-realisasi-pendapatan"
            variant="clayYellow"
            title="Realisasi Pendapatan"
            value="Rp 985.420.000.000"
            unit="78.8%"
            description="Capaian penerimaan s/d Juli 2026"
            badge="Terverifikasi"
            icon={<TrendingUp className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            progress={{
              value: 78.8,
              max: 100,
              label: "Capaian Target",
              color: "#5c4300",
            }}
            trend={{
              value: "+8.4%",
              label: "Laju YoY",
              isPositive: true,
              direction: "up",
            }}
            infoTooltip="Jumlah kas negara/daerah yang sudah masuk ke Kas Daerah"
            onClick={() =>
              handleOpenDetail("Detail Realisasi Pendapatan", {
                realisasiTotal: "Rp 985.420.000.000",
                persentase: "78.83%",
                sisaTarget: "Rp 264.580.000.000",
                pembayaranTerakhir: "27 Juli 2026 18:25 WIB",
              })
            }
          />
        </div>

        {/* 3. Jumlah Wajib Pajak (Clay Blue Card) */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-wp"
            variant="clayBlue"
            title="Jumlah Wajib Pajak"
            value="148.920"
            unit="WP Terdaftar"
            description="132.100 WP Aktif | 16.820 WP Non-Aktif"
            badge="SIMPATDA"
            icon={<Users className="w-5 h-5 text-[#1e3a8a] dark:text-blue-100" />}
            trend={{
              value: "+2.450 WP",
              label: "Bulan ini",
              isPositive: true,
              direction: "up",
            }}
            infoTooltip="Jumlah seluruh badan usaha dan perseorangan terdaftar sebagai Wajib Pajak"
            onClick={() =>
              handleOpenDetail("Rincian Basis Wajib Pajak", {
                wpBadan: "42.150 WP",
                wpPerorangan: "106.770 WP",
                pendaftaranBaru2026: "8.420 WP",
              })
            }
          />
        </div>

        {/* 4. Jumlah Objek Pajak */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-op"
            variant="clay"
            title="Jumlah Objek Pajak"
            value="215.400"
            unit="OP Terdata"
            description="PBB-P2, BPHTB, PBJT, PAT, & Reklame"
            badge="GIS Ready"
            icon={<Building2 className="w-5 h-5 text-vibrant-purple" />}
            trend={{
              value: "+3.1%",
              label: "Pemutakhiran ZNT",
              isPositive: true,
              direction: "up",
            }}
            infoTooltip="Total unit tanah, bangunan, atau lokasi usaha terdaftar"
            onClick={() =>
              handleOpenDetail("Data Objek Pajak Daerah", {
                opPbb: "185.200 OP",
                opResto: "12.400 OP",
                opHotel: "3.100 OP",
                opParkir: "1.800 OP",
                opReklame: "12.900 OP",
              })
            }
          />
        </div>

        {/* 5. Jumlah Pelayanan */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-pelayanan"
            variant="clay"
            title="Jumlah Pelayanan"
            value="18.450"
            unit="Berkas Layanan"
            description="SLA Layanan Selesai Tepat Waktu 99.2%"
            badge="Online/Loket"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            trend={{
              value: "99.2%",
              label: "Tepat Waktu",
              isPositive: true,
              direction: "up",
            }}
            infoTooltip="Pelayanan mutasi NOP, salinan, validasi BPHTB, dan konsul pajak"
            onClick={() =>
              handleOpenDetail("Kinerja Pelayanan Pajak", {
                loketOnline: "14.200 Permohonan (77%)",
                loketDriveThru: "4.250 Permohonan (23%)",
                rataRataSla: "1.2 Hari kerja",
              })
            }
          />
        </div>

        {/* 6. Jumlah Penetapan */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-penetapan"
            variant="clay"
            title="Jumlah Penetapan"
            value="12.340"
            unit="SKPD/SPTPD"
            description="Total ketetapan pajak Rp 450.2 Miliar"
            badge="Masa Pajak"
            icon={<FileText className="w-5 h-5 text-vibrant-purple-dark" />}
            trend={{
              value: "+1.200 SKPD",
              label: "Jatuh Tempo Aug",
              isPositive: true,
              direction: "up",
            }}
            infoTooltip="Surat Ketetapan Pajak Daerah (SKPD) & SPTPD Terbit"
            onClick={() =>
              handleOpenDetail("Rincian Penetapan Pajak 2026", {
                skpdPbb: "Rp 210.000.000.000",
                sptpdSelfAssessment: "Rp 240.200.000.000",
                pemeriksaanPajak: "45 SKPDKB Terbit",
              })
            }
          />
        </div>

        {/* 7. Jumlah Permohonan */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-permohonan"
            variant="clay"
            title="Jumlah Permohonan"
            value="1.480"
            unit="Pengajuan"
            description="42 Berkas Perlu Verifikasi Lapangan"
            badge="In-Progress"
            icon={<Clock className="w-5 h-5 text-amber-500" />}
            trend={{
              value: "42 Verifikasi",
              label: "Antrean Tim",
              isPositive: false,
              direction: "neutral",
            }}
            infoTooltip="Permohonan keberatan, pengurangan PBB, dan koreksi NOP"
            onClick={() =>
              handleOpenDetail("Status Permohonan Wajib Pajak", {
                penguranganPbb: "820 Berkas",
                pembetulanData: "410 Berkas",
                keberatanNilai: "250 Berkas",
              })
            }
          />
        </div>

        {/* 8. Jumlah Piutang */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-piutang"
            variant="clay"
            title="Jumlah Piutang"
            value="Rp 45,2 M"
            unit="Piutang Pajak"
            description="128 WP Menunggak Teridentifikasi Penagihan"
            badge="Program Sampung"
            icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
            trend={{
              value: "-5.2%",
              label: "Penurunan Piutang",
              isPositive: true,
              direction: "down",
            }}
            infoTooltip="Tunggakan piutang pajak daerah yang sedang proses penagihan aktif"
            onClick={() =>
              handleOpenDetail("Manajemen Piutang & Penagihan", {
                piutangMacet: "Rp 12.4 M (Daluwarsa Audit)",
                piutangLancar: "Rp 32.8 M (Surat Teguran 1-3)",
                wpTunggakanTerbesar: "PT Properti Maju Bersama (Rp 2.1 M)",
              })
            }
          />
        </div>

        {/* 9. Last Update Data WP/OP */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col h-full">
          <CardApp id="card-last-update" variant="clay" size="sm" className="bg-surface border border-hairline">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-vibrant-purple/10 rounded-2xl text-vibrant-purple-dark">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-ink font-display">
                      9. Last Update Data WP/OP & Database Server
                    </span>
                    <BadgeApp id="badge-sync-status" variant="success" size="sm">
                      Realtime Sync Active
                    </BadgeApp>
                  </div>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Waktu Sinkronisasi Terakhir: <strong className="text-vibrant-purple-dark font-mono">{lastUpdate}</strong> | Terkoneksi dengan Database Pusat BPKAD / SIMPATDA
                  </p>
                </div>
              </div>

              <ButtonApp
                id="btn-view-logs"
                variant="secondary"
                size="sm"
                className="text-xs gap-1.5 self-end sm:self-center shrink-0"
                onClick={() => {
                  toast.success("Log Sistem Normal", {
                    description: "Database PostgreSQL & Leaflet Map Server berjalan 100% lancar.",
                  });
                }}
              >
                <span>Cek Health Server</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </ButtonApp>
            </div>
          </CardApp>
        </div>
      </div>

      {/* CHART & RECENT TRANSACTIONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Realisasi vs Target Monthly Progress Chart */}
        <div className="lg:col-span-2">
          <CardApp id="chart-revenue-card" variant="clay" className="p-6 bg-surface">
            <CardApp.Header className="flex flex-row items-center justify-between pb-2 border-b border-hairline-soft mb-4">
              <div>
                <CardApp.Title tooltip="Perbandingan Target Bulanan Akumulatif vs Realisasi Penerimaan Kas Daerah">
                  Proyeksi & Realisasi Bulanan TA 2026
                </CardApp.Title>
                <CardApp.Description>
                  Grafik pertumbuhan akumulatif penerimaan pajak daerah (Dalam Miliar Rupiah)
                </CardApp.Description>
              </div>
              <BadgeApp id="badge-chart-unit" variant="solidPurple" size="sm">
                Satuan: Miliar Rp
              </BadgeApp>
            </CardApp.Header>

            <ChartApp
              id="revenue-progress-chart"
              type="area"
              height={300}
              data={chartMonthlyData}
              xKey="label"
              series={[
                {
                  key: "target",
                  label: "Target Akumulatif (APBD)",
                  color: "#a78bfa",
                },
                {
                  key: "realisasi",
                  label: "Realisasi Penerimaan",
                  color: "#10b981",
                },
              ]}
              showGrid
              showLegend
              showTooltip
            />
          </CardApp>
        </div>

        {/* Distribution by Tax Type Mini Widget */}
        <div className="lg:col-span-1">
          <CardApp id="card-tax-distribution" variant="clay" className="p-6 bg-surface flex flex-col justify-between">
            <div>
              <CardApp.Header className="pb-2 border-b border-hairline-soft mb-4">
                <CardApp.Title>Komposisi Jenis Pajak</CardApp.Title>
                <CardApp.Description>
                  Kontribusi sektor pajak daerah terbesar TA 2026
                </CardApp.Description>
              </CardApp.Header>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                    <span>1. PBJT Makanan & Minuman</span>
                    <span className="font-mono text-vibrant-purple-dark">Rp 385.2 M (39%)</span>
                  </div>
                  <div className="w-full bg-surface-soft h-2 rounded-full overflow-hidden border border-hairline-soft">
                    <div className="bg-vibrant-purple h-full rounded-full w-[39%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                    <span>2. BPHTB Pemindahan Hak</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp 312.0 M (31%)</span>
                  </div>
                  <div className="w-full bg-surface-soft h-2 rounded-full overflow-hidden border border-hairline-soft">
                    <div className="bg-emerald-500 h-full rounded-full w-[31%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                    <span>3. PBB-P2 Perkotaan</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">Rp 195.4 M (20%)</span>
                  </div>
                  <div className="w-full bg-surface-soft h-2 rounded-full overflow-hidden border border-hairline-soft">
                    <div className="bg-amber-500 h-full rounded-full w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                    <span>4. Pajak Reklame & Air Tanah</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">Rp 92.8 M (10%)</span>
                  </div>
                  <div className="w-full bg-surface-soft h-2 rounded-full overflow-hidden border border-hairline-soft">
                    <div className="bg-blue-500 h-full rounded-full w-[10%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center justify-between text-xs text-ink-muted">
              <span>Total Realisasi: <strong>Rp 985.4 M</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">+8.4% YoY</span>
            </div>
          </CardApp>
        </div>
      </div>

      {/* RECENT REALISASI TRANSACTIONS TABLE */}
      <CardApp id="card-recent-transactions" variant="clay" className="p-6 bg-surface mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <TextApp id="table-transactions-title" variant="h3" className="font-bold text-ink">
              Transaksi Realisasi Pajak Masuk Hari Ini
            </TextApp>
            <TextApp id="table-transactions-subtitle" variant="body" className="text-xs text-ink-secondary">
              Daftar setoran pembayaran pajak terverifikasi dari Bank Persepsi / QRIS / Outlet BPD.
            </TextApp>
          </div>

          <div className="flex items-center gap-2">
            <BadgeApp id="badge-table-count" variant="solidPurple" size="sm">
              5 Transaksi Terakhir
            </BadgeApp>
          </div>
        </div>

        <DataTableApp
          id="data-table-pajak"
          columns={transactionColumns}
          data={recentTransactions}
        />
      </CardApp>

      {/* BOTTOM BENTO ROW: MINI WIDGETS (Sesuai HTML) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <ScorecardApp
          id="mini-monthly-revenue"
          layout="minimalist"
          variant="clay"
          title="Monthly Revenue"
          value="Rp 42.8M"
          unit="Penerimaan Bulanan"
          description="Aktivitas realisasi kas daerah terverifikasi"
          icon={<TrendingUp className="w-6 h-6 text-vibrant-purple-dark shrink-0" />}
          trend={{
            value: "+8.4%",
            label: "vs bulan lalu",
            isPositive: true,
          }}
        />

        <ScorecardApp
          id="mini-verified-shoppers"
          layout="minimalist"
          variant="clay"
          title="Wajib Pajak Patuh"
          value="12 Baru"
          unit="Minggu Ini"
          description="WP terverifikasi otomatis SIMPATDA"
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />}
          trend={{
            value: "+100% Patuh",
            label: "Kepatuhan pajak",
            isPositive: true,
          }}
        />

        <ScorecardApp
          id="mini-support-queue"
          layout="minimalist"
          variant="clay"
          title="Support Queue"
          value="3 Menunggu"
          unit="Permohonan"
          description="Antrean verifikasi penetapan SKPD/PBB"
          icon={<Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />}
          trend={{
            value: "SLA < 15 mnt",
            label: "Respon cepat",
            isPositive: true,
          }}
        />
      </div>

      {/* DETAIL MODAL DIALOG */}
      <DialogApp
        id="modal-tax-detail"
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={modalTitle}
        description="Rincian informasi audit metrik pendapatan daerah"
      >
        <div className="space-y-4 py-2 text-xs">
          {modalData && (
            <div className="bg-surface-soft border border-hairline p-4 rounded-2xl space-y-2">
              {Object.entries(modalData).map(([key, value]: [string, any]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-hairline-soft/60 last:border-none">
                  <span className="font-semibold text-ink-secondary capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-mono text-ink font-bold">
                    {Array.isArray(value) ? value.join(", ") : String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <ButtonApp
              id="btn-close-modal-detail"
              variant="vibrantPurple"
              size="sm"
              onClick={() => setDetailModalOpen(false)}
            >
              Tutup Rincian
            </ButtonApp>
          </div>
        </div>
      </DialogApp>
    </div>
  );
}
