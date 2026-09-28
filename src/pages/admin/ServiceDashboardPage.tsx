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
  AdvanceFilterApp,
  FilterFieldConfig,
} from "@/packages/design-system";
import {
  Clock,
  Users,
  CheckCircle2,
  Activity,
  RefreshCw,
  Download,
  Calendar,
  Monitor,
  Building2,
  Zap,
} from "lucide-react";

// Types for Service Queue / Application Data
interface ServiceQueueItem {
  id: string;
  nomorAntrean: string;
  namaPemohon: string;
  jenisLayanan: string;
  kanal: "Online" | "Loket PTSP";
  waktuMasuk: string;
  durasiPelayanan: string;
  petugas: string;
  status: "Selesai" | "Dalam Proses" | "Menunggu SLA" | "Terlambat";
  slaTime: string;
}

export default function ServiceDashboardPage() {
  const { toast } = useToastApp();
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastUpdate, setLastUpdate] = React.useState("27 Juli 2026, 19:45:00 WIB");
  const [selectedPeriod, setSelectedPeriod] = React.useState("2026");

  // Detail Modal State
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalData, setModalData] = React.useState<any>(null);

  // Advance Filter State
  const [advanceFilterValues, setAdvanceFilterValues] = React.useState<Record<string, any>>({
    kanalPelayanan: "semua",
    jenisLayanan: ["pbb", "bphtb", "pbjt"],
    statusSla: "tepat",
    rentangTanggal: { from: "2026-07-01", to: "2026-07-27" },
  });

  // Filter fields configuration
  const filterFields: FilterFieldConfig[] = [
    {
      id: "kanalPelayanan",
      label: "Kanal Pelayanan",
      type: "select",
      placeholder: "-- Semua Kanal --",
      colSpan: 1,
      options: [
        { label: "Semua Kanal", value: "semua" },
        { label: "Online (E-Services)", value: "online" },
        { label: "Loket PTSP Tatap Muka", value: "loket" },
      ],
    },
    {
      id: "statusSla",
      label: "Status SLA Pelayanan",
      type: "select",
      colSpan: 1,
      placeholder: "-- Pilih Status SLA --",
      options: [
        { label: "Sesuai Target SLA (≤ 30 Menit)", value: "tepat" },
        { label: "Mendekati Batas SLA (20-30 Menit)", value: "warning" },
        { label: "Melebihi SLA (> 30 Menit)", value: "over" },
      ],
    },
    {
      id: "jenisLayanan",
      label: "Kategori Layanan Perpajakan & Retribusi",
      type: "multi-select",
      colSpan: 2,
      options: [
        { label: "Mutasi & Salinan PBB-P2", value: "pbb" },
        { label: "Validasi Setoran BPHTB", value: "bphtb" },
        { label: "Pendaftaran Pajak Barang & Jasa (PBJT)", value: "pbjt" },
        { label: "Permohonan Izin Pajak Reklame", value: "reklame" },
        { label: "Surat Keterangan Bebas Tunggakan Pajak", value: "skbt" },
      ],
    },
    {
      id: "rentangTanggal",
      label: "Rentang Tanggal Pelayanan",
      type: "date-range",
      colSpan: 2,
    },
  ];

  // Handler for Syncing Data
  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const formatted = `${now.getDate()} Juli ${now.getFullYear()}, ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")} WIB`;
      setLastUpdate(formatted);
      toast.vibrant("Sinkronisasi Berhasil", {
        description: "Data antrean dan SLA pelayanan publik BPKAD telah diperbarui secara real-time.",
      });
    }, 1200);
  };

  // Handler for Exporting Report
  const handleExportReport = () => {
    toast.vibrant("Laporan Pelayanan Diunduh", {
      description: "Berkas PDF Laporan SLA & Pelayanan Publik BPKAD BR-02 berhasil dirilis.",
    });
  };

  // Handler for Scorecard Info Modal
  const handleOpenMetricInfo = (title: string, data: any) => {
    setModalTitle(title);
    setModalData(data);
    setDetailModalOpen(true);
  };

  // -------------------------------------------------------------
  // CHART DATA DEFINITIONS (BR-02 Items 9, 10, 11)
  // -------------------------------------------------------------

  // Item 9: Trend Pelayanan (Line Chart Data)
  const trendPelayananData = [
    { name: "Jan", Online: 2100, Loket: 1450, Total: 3550 },
    { name: "Feb", Online: 2350, Loket: 1380, Total: 3730 },
    { name: "Mar", Online: 2580, Loket: 1520, Total: 4100 },
    { name: "Apr", Online: 2420, Loket: 1310, Total: 3730 },
    { name: "Mei", Online: 2890, Loket: 1600, Total: 4490 },
    { name: "Jun", Online: 3120, Loket: 1540, Total: 4660 },
    { name: "Jul", Online: 3460, Loket: 1430, Total: 4890 },
  ];

  // Item 10: Pie Pelayanan Online vs Loket (Pie/Donut Chart Data)
  const pieOnlineVsLoketData = [
    { name: "Pelayanan Online (E-Services)", value: 18420, fill: "#8b5cf6" },
    { name: "Pelayanan Loket PTSP", value: 10230, fill: "#3b82f6" },
  ];

  // Item 11: Jenis Layanan Terbanyak (Bar Chart Data)
  const jenisLayananTerbanyakData = [
    { name: "Mutasi PBB-P2", Jumlah: 8420, fill: "#8b5cf6" },
    { name: "Validasi BPHTB", Jumlah: 6850, fill: "#3b82f6" },
    { name: "Pendaftaran PBJT", Jumlah: 4120, fill: "#10b981" },
    { name: "Izin Reklame", Jumlah: 3240, fill: "#f59e0b" },
    { name: "Surat Bebas Pajak", Jumlah: 2680, fill: "#06b6d4" },
  ];

  // -------------------------------------------------------------
  // TABLE DATA (Daftar Antrean & Permohonan Pelayanan)
  // -------------------------------------------------------------
  const serviceQueueList: ServiceQueueItem[] = [
    {
      id: "SRV-2026-001",
      nomorAntrean: "A-014",
      namaPemohon: "Hendra Wijaya, S.E.",
      jenisLayanan: "Mutasi / Salinan PBB-P2",
      kanal: "Loket PTSP",
      waktuMasuk: "08:15:20 WIB",
      durasiPelayanan: "11 Menit",
      petugas: "Rina Setyowati (Loket 1)",
      status: "Selesai",
      slaTime: "Sesuai SLA (≤30m)",
    },
    {
      id: "SRV-2026-002",
      nomorAntrean: "E-892",
      namaPemohon: "PT Malioboro Perdana",
      jenisLayanan: "Validasi Setoran BPHTB",
      kanal: "Online",
      waktuMasuk: "08:30:10 WIB",
      durasiPelayanan: "8 Menit",
      petugas: "Sistem Verifikasi Otomatis",
      status: "Selesai",
      slaTime: "Sesuai SLA (≤15m)",
    },
    {
      id: "SRV-2026-003",
      nomorAntrean: "A-015",
      namaPemohon: "Siti Nurjanah",
      jenisLayanan: "Pendaftaran PBJT Restoran",
      kanal: "Loket PTSP",
      waktuMasuk: "09:02:45 WIB",
      durasiPelayanan: "18 Menit",
      petugas: "Budi Santoso (Loket 2)",
      status: "Dalam Proses",
      slaTime: "Sesuai SLA (≤30m)",
    },
    {
      id: "SRV-2026-004",
      nomorAntrean: "E-893",
      namaPemohon: "CV Jogja Kreatif Media",
      jenisLayanan: "Permohonan Izin Reklame",
      kanal: "Online",
      waktuMasuk: "09:12:00 WIB",
      durasiPelayanan: "14 Menit",
      petugas: "Tim Verifikasi E-Pajak",
      status: "Selesai",
      slaTime: "Sesuai SLA (≤30m)",
    },
    {
      id: "SRV-2026-005",
      nomorAntrean: "A-016",
      namaPemohon: "Dr. Agung Laksono",
      jenisLayanan: "Surat Keterangan Bebas Tunggakan",
      kanal: "Loket PTSP",
      waktuMasuk: "09:25:30 WIB",
      durasiPelayanan: "22 Menit",
      petugas: "Dewi Lestari (Loket 3)",
      status: "Menunggu SLA",
      slaTime: "Mendekati Batas SLA",
    },
    {
      id: "SRV-2026-006",
      nomorAntrean: "E-894",
      namaPemohon: "Bambang Susilo",
      jenisLayanan: "Mutasi / Salinan PBB-P2",
      kanal: "Online",
      waktuMasuk: "09:40:15 WIB",
      durasiPelayanan: "6 Menit",
      petugas: "Sistem Verifikasi Otomatis",
      status: "Selesai",
      slaTime: "Sesuai SLA (≤15m)",
    },
  ];

  const tableColumns = [
    {
      accessorKey: "nomorAntrean",
      header: "No. Antrean",
      cell: (info: any) => (
        <span
          onClick={() =>
            handleOpenMetricInfo(`Detail Permohonan ${info.row.original.id}`, {
              noAntrean: info.row.original.nomorAntrean,
              pemohon: info.row.original.namaPemohon,
              layanan: info.row.original.jenisLayanan,
              kanal: info.row.original.kanal,
              waktu: info.row.original.waktuMasuk,
              durasi: info.row.original.durasiPelayanan,
              petugas: info.row.original.petugas,
              status: info.row.original.status,
              slaTime: info.row.original.slaTime,
            })
          }
          className="font-mono font-bold text-xs text-vibrant-purple bg-vibrant-purple/10 hover:bg-vibrant-purple/20 px-2.5 py-1 rounded-md border border-vibrant-purple/20 inline-block cursor-pointer transition-colors"
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "namaPemohon",
      header: "Nama Pemohon",
      cell: (info: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-xs text-ink">{info.getValue()}</span>
          <span className="text-[10px] text-ink-muted">{info.row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "jenisLayanan",
      header: "Jenis Layanan",
      cell: (info: any) => (
        <span className="text-xs font-medium text-ink-secondary">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "kanal",
      header: "Kanal",
      cell: (info: any) => {
        const isOnline = info.getValue() === "Online";
        return (
          <BadgeApp
            id={`badge-kanal-${info.row.original.id}`}
            variant={isOnline ? "solidPurple" : "neutral"}
            size="sm"
            className="flex items-center gap-1.5"
          >
            {isOnline ? <Monitor className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
            {info.getValue()}
          </BadgeApp>
        );
      },
    },
    {
      accessorKey: "waktuMasuk",
      header: "Waktu Masuk",
      cell: (info: any) => (
        <span className="text-xs font-mono text-ink-secondary">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "durasiPelayanan",
      header: "Durasi / SLA",
      cell: (info: any) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-ink">{info.getValue()}</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            {info.row.original.slaTime}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Berkas",
      cell: (info: any) => {
        const val = info.getValue();
        let variant: "solidPurple" | "neutral" = "solidPurple";
        if (val === "Dalam Proses") variant = "neutral";
        return (
          <BadgeApp
            id={`badge-status-${info.row.original.id}`}
            variant={variant}
            size="sm"
          >
            {val}
          </BadgeApp>
        );
      },
    },
  ];

  return (
    <div id="service-dashboard-root" className="flex flex-col gap-6 pb-20 select-none">
      {/* ------------------------------------------------------------- */}
      {/* HEADER SECTION: Title, Subtitle, Quick Actions */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-hairline-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BadgeApp id="badge-service-dashboard" variant="solidPurple" size="sm">
              Dashboard Pelayanan Publik (BR-02)
            </BadgeApp>
            <span className="text-xs text-ink-muted flex items-center gap-1">
              <Clock className="w-3 h-3 text-ink-muted" />
              Real-time Feed ({lastUpdate})
            </span>
          </div>
          <TextApp id="title-service-dashboard" variant="h2" className="font-bold tracking-tight">
            Monitoring Pelayanan & SLA BPKAD
          </TextApp>
          <TextApp id="subtitle-service-dashboard" variant="body" className="text-ink-secondary mt-0.5">
            Integrasi Layanan Loket PTSP & Portal E-Services Perpajakan Daerah Kota Yogyakarta
          </TextApp>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-36">
            <SelectApp
              id="select-period-filter"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              options={[
                { label: "Tahun 2026", value: "2026" },
                { label: "Bulan Juli 2026", value: "juli" },
                { label: "Hari Ini", value: "today" },
              ]}
              size="sm"
            />
          </div>

          <ButtonApp
            id="btn-sync-service-data"
            variant="secondary"
            size="sm"
            onClick={handleSyncData}
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            Sync Data
          </ButtonApp>

          <ButtonApp
            id="btn-export-service-report"
          variant="purpleDark"
            theme="default"
            size="sm"
            rounded="pill"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <Download className="w-3.5 h-3.5" />
            Cetak Laporan
          </ButtonApp>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADVANCE FILTER SECTION */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-service-advance-filter" variant="clay" size="sm" className="bg-surface border border-hairline">
        <AdvanceFilterApp
          id="advance-filter-service"
          displayMode="drawer"
          showActivePills={false}
          triggerLabel="Advance Filter Pelayanan"
          triggerVariant="purpleDark"
          triggerSize="sm"
          triggerRounded="pill"
          fields={filterFields}
          values={advanceFilterValues}
          onChange={setAdvanceFilterValues}
          onApply={() => {
            toast.vibrant("Filter Berhasil Diterapkan", {
              description: "Menampilkan metrics pelayanan berdasarkan kriteria yang dipilih.",
            });
          }}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* BENTO GRID: 8 SCORECARDS (BR-02 METRICS 1 THROUGH 8) */}
      {/* STRICT RULE: NO PREFIXED NUMBERS IN CARD TITLES */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. Jumlah Pelayanan Hari Ini - Purple Clay */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-pelayanan-hari-ini"
            variant="clayPurple"
            title="Jumlah Pelayanan Hari Ini"
            value="1.248"
            unit="Berkas Masuk"
            description="Online: 812 | Loket PTSP: 436"
            trend={{
              value: "+14.2%",
              label: "vs Kemarin",
              isPositive: true,
              direction: "up",
            }}
            icon={<Activity className="w-5 h-5 text-white" />}
            infoTooltip="Total berkas pelayanan perpajakan dan retribusi yang diterima hari ini."
            onInfoClick={() =>
              handleOpenMetricInfo("Jumlah Pelayanan Hari Ini", {
                detail: "Statistik Pelayanan Hari Ini",
                online: 812,
                loket: 436,
                total: 1248,
                targetSla: "100% Selesai dalam Hari Kerja",
              })
            }
          />
        </div>

        {/* 2. Jumlah Pelayanan Online - Blue Clay */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-pelayanan-online"
            variant="clayBlue"
            title="Jumlah Pelayanan Online"
            value="18.420"
            unit="E-Services (64.3%)"
            description="Portal E-Pajak & Mobile Web"
            badge="E-Pajak Jogja"
            trend={{
              value: "+18.4%",
              label: "Pertumbuhan E-Services",
              isPositive: true,
              direction: "up",
            }}
            icon={<Monitor className="w-5 h-5 text-[#1e3a8a] dark:text-blue-200" />}
            infoTooltip="Jumlah transaksi/permohonan melalui portal online tanpa tatap muka."
            onInfoClick={() =>
              handleOpenMetricInfo("Jumlah Pelayanan Online", {
                detail: "Kanal Digital Portal E-Services",
                volume: 18420,
                share: "64.3%",
                kanalUtama: "E-Pajak & Mobile Web BPKAD",
              })
            }
          />
        </div>

        {/* 3. Jumlah Antrean - Yellow Clay */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-jumlah-antrean"
            variant="clayYellow"
            title="Jumlah Antrean Saat Ini"
            value="18"
            unit="Orang Menunggu"
            description="Loket 1: 4 | Loket 2: 5 | Loket 3: 3 | Loket 4: 6"
            badge="Live Antrean"
            icon={<Users className="w-5 h-5 text-[#5c4300] dark:text-amber-300" />}
            infoTooltip="Jumlah pemohon yang sedang menunggu antrean di ruang tunggu PTSP saat ini."
            onInfoClick={() =>
              handleOpenMetricInfo("Jumlah Antrean Saat Ini", {
                detail: "Monitoring Antrean PTSP Live",
                loket1: "4 Orang (PBB)",
                loket2: "5 Orang (BPHTB)",
                loket3: "3 Orang (PBJT)",
                loket4: "6 Orang (Reklame & Umum)",
              })
            }
          />
        </div>

        {/* 4. Jumlah Pelayanan Bulan Berjalan - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-pelayanan-bulan-berjalan"
            variant="default"
            title="Jumlah Pelayanan Bulan Berjalan"
            value="28.650"
            unit="Pemohon"
            description="Capaian 92% dari Target Bulanan"
            trend={{
              value: "+8.5%",
              label: "vs YoY",
              isPositive: true,
              direction: "up",
            }}
            icon={<Calendar className="w-5 h-5 text-amber-500" />}
            infoTooltip="Akumulasi pemohon yang dilayani selama bulan berjalan (Juli 2026)."
            onInfoClick={() =>
              handleOpenMetricInfo("Jumlah Pelayanan Bulan Berjalan", {
                detail: "Statistik Akumulasi Juli 2026",
                target: 31000,
                realisasi: 28650,
                persentase: "92.4%",
              })
            }
          />
        </div>

        {/* 5. Rata-rata Waktu Pelayanan - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-rata-waktu-pelayanan"
            variant="default"
            title="Rata-rata Waktu Pelayanan"
            value="14"
            unit="Menit / Berkas"
            description="Standar SLA: Maksimal 30 Menit"
            trend={{
              value: "-2.5m",
              label: "Lebih Cepat",
              isPositive: true,
              direction: "up",
            }}
            icon={<Clock className="w-5 h-5 text-emerald-500" />}
            infoTooltip="Rata-rata durasi penyelesaian per berkas dari pemanggilan hingga verifikasi selesai."
            onInfoClick={() =>
              handleOpenMetricInfo("Rata-rata Waktu Pelayanan", {
                detail: "Efisiensi Pelayanan Loket & Online",
                onlineAvg: "8 Menit",
                loketAvg: "18 Menit",
                standarSla: "30 Menit",
              })
            }
          />
        </div>

        {/* 6. Jumlah Pelayanan Loket - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-pelayanan-loket"
            variant="default"
            title="Jumlah Pelayanan Loket"
            value="10.230"
            unit="Tatap Muka (35.7%)"
            description="Loket 1 - 6 Gedung BPKAD"
            badge="PTSP BPKAD"
            icon={<Building2 className="w-5 h-5 text-blue-500" />}
            infoTooltip="Jumlah berkas yang diproses melalui tatap muka langsung di Kantor PTSP."
            onInfoClick={() =>
              handleOpenMetricInfo("Jumlah Pelayanan Loket", {
                detail: "Kanal Tatap Muka PTSP",
                volume: 10230,
                share: "35.7%",
                loketAktif: "6 Loket Operasional",
              })
            }
          />
        </div>

        {/* 7. SLA Pelayanan - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-sla-pelayanan"
            variant="default"
            title="SLA Pelayanan"
            value="98.4%"
            unit="Tepat Waktu"
            description="28.190 / 28.650 Berkas Sesuai SLA"
            trend={{
              value: "≥ 95%",
              label: "Target SLA Nasional",
              isPositive: true,
              direction: "up",
            }}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            infoTooltip="Persentase layanan yang diselesaikan sesuai Service Level Agreement standar."
            onInfoClick={() =>
              handleOpenMetricInfo("SLA Pelayanan", {
                detail: "Pencapaian Standard Operating Procedure",
                tepatWaktu: "28.190 Berkas (98.4%)",
                terlambat: "460 Berkas (1.6%)",
                targetNasional: "≥ 95%",
              })
            }
          />
        </div>

        {/* 8. Tingkat Penyelesaian Pelayanan - Default White */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full">
          <ScorecardApp
            id="card-tingkat-penyelesaian"
            variant="default"
            title="Tingkat Penyelesaian Pelayanan"
            value="96.2%"
            unit="Terselesaikan"
            description="27.561 Selesai | 1.089 Dalam Proses"
            trend={{
              value: "+2.1%",
              label: "vs Bulan Lalu",
              isPositive: true,
              direction: "up",
            }}
            icon={<Zap className="w-5 h-5 text-vibrant-purple" />}
            infoTooltip="Rasio permohonan yang telah terbit SK/bukti bayar dibanding total permohonan masuk."
            onInfoClick={() =>
              handleOpenMetricInfo("Tingkat Penyelesaian Pelayanan", {
                detail: "Rasio Progress Permohonan",
                selesai: 27561,
                proses: 1089,
                total: 28650,
              })
            }
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHARTS SECTION (BR-02 METRICS 9, 10, 11) */}
      {/* STRICT RULE: NO PREFIXED NUMBERS IN CARD TITLES */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mt-2">
        
        {/* 9. Trend Pelayanan (Line Chart - Spans 2 Cols on LG) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          <CardApp id="card-trend-pelayanan" variant="clay" size="sm" className="bg-surface border border-hairline flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-soft">
              <div>
                <TextApp id="title-trend-pelayanan" variant="h4" className="font-bold tracking-tight">
                  Trend Pelayanan
                </TextApp>
                <TextApp id="sub-trend-pelayanan" variant="caption" className="text-ink-muted">
                  Perbandingan Volume Pelayanan Online vs Loket (Januari - Juli 2026)
                </TextApp>
              </div>
              <BadgeApp id="badge-chart-trend" variant="solidPurple" size="sm">
                Line Chart
              </BadgeApp>
            </div>

            <div className="flex-1 w-full pt-2">
              <ChartApp
                id="chart-trend-pelayanan-line"
                type="line"
                variant="vibrant"
                data={trendPelayananData}
                xKey="name"
                height={260}
                showGrid={true}
                showLegend={true}
                series={[
                  { key: "Online", label: "Pelayanan Online", color: "#8b5cf6" },
                  { key: "Loket", label: "Pelayanan Loket PTSP", color: "#3b82f6" },
                  { key: "Total", label: "Total Pelayanan", color: "#f59e0b" },
                ]}
              />
            </div>
          </CardApp>
        </div>

        {/* 10. Pie Pelayanan Online vs Loket (Pie Chart) */}
        <div className="col-span-1 flex flex-col">
          <CardApp id="card-pie-online-loket" variant="clay" size="sm" className="bg-surface border border-hairline flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-soft">
              <div>
                <TextApp id="title-pie-online-loket" variant="h4" className="font-bold tracking-tight">
                  Pelayanan Online vs Loket
                </TextApp>
                <TextApp id="sub-pie-online-loket" variant="caption" className="text-ink-muted">
                  Proporsi Kanal Pelayanan
                </TextApp>
              </div>
              <BadgeApp id="badge-chart-pie" variant="solidPurple" size="sm">
                Donut Chart
              </BadgeApp>
            </div>

            <div className="flex-1 w-full flex items-center justify-center pt-1">
              <ChartApp
                id="chart-pie-online-vs-loket"
                type="pie"
                variant="purple"
                data={pieOnlineVsLoketData}
                xKey="name"
                yKey="value"
                height={260}
                innerRadius={55}
                outerRadius={85}
                showLegend={true}
              />
            </div>
          </CardApp>
        </div>

        {/* 11. Jenis Layanan Terbanyak (Bar Chart - Full Width) */}
        <div className="col-span-1 lg:col-span-3 flex flex-col">
          <CardApp id="card-jenis-layanan-terbanyak" variant="clay" size="sm" className="bg-surface border border-hairline">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-soft">
              <div>
                <TextApp id="title-jenis-layanan" variant="h4" className="font-bold tracking-tight">
                  Jenis Layanan Terbanyak
                </TextApp>
                <TextApp id="sub-jenis-layanan" variant="caption" className="text-ink-muted">
                  Top 5 Volume Layanan Perpajakan & Retribusi Daerah Kota Yogyakarta
                </TextApp>
              </div>
              <BadgeApp id="badge-chart-bar" variant="solidPurple" size="sm">
                Bar Chart
              </BadgeApp>
            </div>

            <div className="w-full pt-2">
              <ChartApp
                id="chart-jenis-layanan-bar"
                type="bar"
                variant="vibrant"
                data={jenisLayananTerbanyakData}
                xKey="name"
                height={240}
                showGrid={true}
                showLegend={false}
                series={[
                  { key: "Jumlah", label: "Jumlah Berkas Pelayanan", color: "#8b5cf6" },
                ]}
              />
            </div>
          </CardApp>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* DATA TABLE SECTION: Real-time Queue & Application Stream */}
      {/* ------------------------------------------------------------- */}
      <CardApp id="card-table-service-stream" variant="clay" size="sm" className="bg-surface border border-hairline mt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-hairline-soft">
          <div>
            <TextApp id="title-table-service" variant="h4" className="font-bold tracking-tight">
              Daftar Permohonan & Antrean Pelayanan Terbaru
            </TextApp>
            <TextApp id="sub-table-service" variant="caption" className="text-ink-muted">
              Monitoring Waktu Nyata Berkas Pelayanan PTSP & Portal Online
            </TextApp>
          </div>

          <div className="flex items-center gap-2">
            <BadgeApp id="badge-table-count-service" variant="solidPurple" size="sm">
              Live Feed
            </BadgeApp>
          </div>
        </div>

        <DataTableApp
          id="table-service-queue"
          data={serviceQueueList}
          columns={tableColumns}
          enablePagination={true}
          pageSize={5}
        />
      </CardApp>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL MODAL (DIALOG APP) */}
      {/* ------------------------------------------------------------- */}
      <DialogApp
        id="dialog-service-detail"
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={modalTitle || "Detail Informasi Pelayanan"}
        description="Rincian data metrik dan status operasional pelayanan publik BPKAD Kota Yogyakarta."
      >
        <div className="py-2 space-y-4">
          {modalData ? (
            <div className="bg-surface-soft border border-hairline p-4 rounded-2xl space-y-2">
              {Object.entries(modalData).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-xs border-b border-hairline-soft pb-2 last:border-0 last:pb-0">
                  <span className="font-semibold text-ink-secondary capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-mono font-bold text-ink text-right">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <TextApp id="modal-empty-text" variant="caption" className="text-ink-muted">
              Tidak ada data tambahan.
            </TextApp>
          )}

          <div className="flex justify-end pt-2">
            <ButtonApp
              id="btn-close-service-modal"
              variant="primary"
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
