import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AvatarApp,
  AdvanceFilterApp,
  BadgeApp,
  ButtonApp,
  CardApp,
  ChartApp,
  ColApp,
  ContainerApp,
  DataTableApp,
  DataTableColumnHeader,
  GridApp,
  ProgressIndicatorApp,
  SearchBarApp,
  ScorecardApp,
  SidebarApp,
  TextApp,
} from "@/packages/design-system";
import type { FilterFieldConfig } from "@/packages/design-system";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  Plus,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

interface ActivityItem {
  id: string;
  description: string;
  category: string;
  date: string;
  dateIso: string;
  amount: number;
  status: "Selesai" | "Diproses";
}

const chartData = [
  { month: "Jan", target: 68, actual: 61 },
  { month: "Feb", target: 72, actual: 70 },
  { month: "Mar", target: 78, actual: 75 },
  { month: "Apr", target: 82, actual: 86 },
  { month: "Mei", target: 88, actual: 84 },
  { month: "Jun", target: 92, actual: 96 },
];

const activities: ActivityItem[] = [
  { id: "TRX-2401", description: "Pembayaran PBB-P2", category: "Penerimaan", date: "31 Jul 2026", dateIso: "2026-07-31", amount: 12500000, status: "Selesai" },
  { id: "TRX-2402", description: "Validasi BPHTB", category: "Verifikasi", date: "31 Jul 2026", dateIso: "2026-07-31", amount: 8750000, status: "Diproses" },
  { id: "TRX-2403", description: "Setoran PBJT Hotel", category: "Penerimaan", date: "30 Jul 2026", dateIso: "2026-07-30", amount: 18200000, status: "Selesai" },
  { id: "TRX-2404", description: "Koreksi Reklame", category: "Penyesuaian", date: "30 Jul 2026", dateIso: "2026-07-30", amount: -1250000, status: "Selesai" },
  { id: "TRX-2405", description: "Pembayaran PBB-P2", category: "Penerimaan", date: "29 Jul 2026", dateIso: "2026-07-29", amount: 6800000, status: "Selesai" },
  { id: "TRX-2406", description: "Verifikasi Objek BPHTB", category: "Verifikasi", date: "29 Jul 2026", dateIso: "2026-07-29", amount: 15200000, status: "Diproses" },
  { id: "TRX-2407", description: "Setoran PBJT Restoran", category: "Penerimaan", date: "28 Jul 2026", dateIso: "2026-07-28", amount: 9450000, status: "Selesai" },
  { id: "TRX-2408", description: "Pembetulan Ketetapan", category: "Penyesuaian", date: "28 Jul 2026", dateIso: "2026-07-28", amount: -850000, status: "Diproses" },
  { id: "TRX-2409", description: "Pembayaran Pajak Reklame", category: "Penerimaan", date: "27 Jul 2026", dateIso: "2026-07-27", amount: 4250000, status: "Selesai" },
  { id: "TRX-2410", description: "Validasi NOP PBB-P2", category: "Verifikasi", date: "27 Jul 2026", dateIso: "2026-07-27", amount: 3200000, status: "Diproses" },
];

const menuGroups = [{ heading: "Workspace", items: [
  { id: "preview-dashboard", label: "Dashboard", icon: <LayoutDashboard />, active: true },
  { id: "preview-analytics", label: "Analytics", icon: <BarChart3 /> },
  { id: "preview-taxpayer", label: "Wajib Pajak", icon: <Users /> },
  { id: "preview-report", label: "Laporan", icon: <FileText /> },
  { id: "preview-settings", label: "Pengaturan", icon: <Settings /> },
]}];

const formatCurrency = (value: number) => `${value < 0 ? "-" : "+"} Rp ${Math.abs(value).toLocaleString("id-ID")}`;

const activityColumns: ColumnDef<ActivityItem>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aktivitas" />,
    cell: ({ row }) => <div><div className="text-xs font-semibold text-ink">{row.original.description}</div><div className="text-[10px] font-mono text-ink-muted">{row.original.id}</div></div>,
  },
  { accessorKey: "category", header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />, cell: ({ row }) => <BadgeApp id={`activity-category-${row.original.id}`} variant="neutral" size="sm">{row.original.category}</BadgeApp> },
  { accessorKey: "date", header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />, cell: ({ row }) => <span className="whitespace-nowrap text-xs text-ink-secondary">{row.original.date}</span> },
  {
    accessorKey: "amount",
    header: ({ column }) => <div className="flex justify-end"><DataTableColumnHeader column={column} title="Jumlah" /></div>,
    cell: ({ row }) => <div className={`whitespace-nowrap text-right text-xs font-semibold font-mono ${row.original.amount < 0 ? "text-error" : "text-success"}`}>{formatCurrency(row.original.amount)}</div>,
  },
  { accessorKey: "status", header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />, cell: ({ row }) => <BadgeApp id={`activity-status-${row.original.id}`} variant={row.original.status === "Selesai" ? "success" : "yellow"} size="sm">{row.original.status}</BadgeApp> },
];

const activityFilterFields: FilterFieldConfig[] = [
  {
    id: "category",
    label: "Kategori Aktivitas",
    type: "select",
    options: [
      { label: "Penerimaan", value: "Penerimaan" },
      { label: "Verifikasi", value: "Verifikasi" },
      { label: "Penyesuaian", value: "Penyesuaian" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Selesai", value: "Selesai" },
      { label: "Diproses", value: "Diproses" },
    ],
  },
  {
    id: "date",
    label: "Rentang Tanggal",
    type: "date-range",
    colSpan: 2,
  },
];

function RecentActivitiesPanel({ mode }: { mode: "admin" | "analytics" }) {
  const [filters, setFilters] = React.useState<Record<string, any>>({});
  const filteredActivities = activities.filter((activity) => {
    if (filters.category && activity.category !== filters.category) return false;
    if (filters.status && activity.status !== filters.status) return false;
    if (filters.date?.from && activity.dateIso < filters.date.from) return false;
    if (filters.date?.to && activity.dateIso > filters.date.to) return false;
    return true;
  });

  return (
    <div className="mt-3">
      <DataTableApp
      id={`dashboard-recent-activities-${mode}`}
      title="Aktivitas Penerimaan Terbaru"
      description="Transaksi, validasi, dan penyesuaian pajak terkini"
      data={filteredActivities}
      columns={activityColumns}
      enablePagination
      enableSearch
      searchPlaceholder="Cari aktivitas..."
      enableRowSelection
      pageSize={5}
      getRowId={(row) => row.id}
      striped
      toolbarLayout="singleRow"
      rightHeaderAction={
        <AdvanceFilterApp
          id={`activity-advance-filter-${mode}`}
          fields={activityFilterFields}
          values={filters}
          onChange={setFilters}
          onReset={() => setFilters({})}
          displayMode="drawer"
          title="Filter Aktivitas Penerimaan"
          description="Saring aktivitas berdasarkan kategori, status, dan rentang tanggal."
          triggerLabel="Filter Lanjutan"
          triggerVariant="secondary"
          triggerSize="sm"
          triggerRounded="md"
          showActivePills={false}
        />
      }
      />
    </div>
  );
}

function RevenueSummaryCard({ mode }: { mode: "admin" | "analytics" }) {
  return <CardApp id={`dashboard-balance-${mode}`} className="gap-5 p-5">
    <div className="flex items-start justify-between gap-3"><div><TextApp id={`balance-label-${mode}`} variant="caption" className="text-ink-muted">Realisasi PAD</TextApp><TextApp id={`balance-value-${mode}`} variant="h2" weight="bold" className="mt-1">Rp 985,4 M</TextApp><TextApp id={`balance-trend-${mode}`} variant="micro" className="mt-1 text-success">+8,4% dibanding tahun lalu</TextApp></div><div className="rounded-[var(--radius-lg)] bg-vibrant-purple/10 p-2.5 text-vibrant-purple-dark"><WalletCards className="h-5 w-5" /></div></div>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2"><ButtonApp id={`balance-transfer-${mode}`} variant="primary" size="sm" leftIcon={<FileText />}>Lihat Rekap</ButtonApp><ButtonApp id={`balance-request-${mode}`} variant="secondary" size="sm" leftIcon={<ArrowDownLeft />}>Input Setoran</ButtonApp></div>
    <div className="space-y-2 border-t border-hairline-soft pt-4">{[
      { code: "PBB", name: "PBB-P2", value: "Rp 412,8 M", color: "bg-vibrant-purple-dark" },
      { code: "BPH", name: "BPHTB", value: "Rp 328,6 M", color: "bg-vibrant-blue" },
      { code: "PBJ", name: "PBJT", value: "Rp 244,0 M", color: "bg-vibrant-yellow", darkText: true },
    ].map((tax) => <div key={tax.code} className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tax.color} text-[9px] font-bold ${tax.darkText ? "text-vibrant-yellow-ink" : "text-white"}`}>{tax.code}</span><div className="min-w-0"><TextApp id={`wallet-${mode}-${tax.code}`} variant="caption" weight="semibold" className="truncate">{tax.name}</TextApp><TextApp id={`wallet-code-${mode}-${tax.code}`} variant="micro" className="text-ink-muted">Jenis Pajak</TextApp></div></div><span className="shrink-0 text-xs font-semibold font-mono text-ink">{tax.value}</span></div>)}</div>
  </CardApp>;
}

function TargetCard({ mode }: { mode: "admin" | "analytics" }) {
  return <CardApp id={`dashboard-spending-${mode}`} className="gap-3 p-5"><div className="flex items-start justify-between gap-2"><div><TextApp id={`spending-title-${mode}`} variant="body2" weight="bold">Target PAD Bulanan</TextApp><TextApp id={`spending-caption-${mode}`} variant="micro" className="mt-0.5 text-ink-muted">Periode Juli 2026</TextApp></div><BadgeApp id={`spending-badge-${mode}`} variant="yellow" size="sm">78,8%</BadgeApp></div><ProgressIndicatorApp id={`spending-progress-${mode}`} value={78.8} color="purple" trackColor="purple" size="sm" /><div className="flex flex-wrap items-center justify-between gap-1 text-[11px]"><span className="font-semibold text-ink">Rp 82,4 M terealisasi</span><span className="text-ink-muted">target Rp 104,5 M</span></div></CardApp>;
}

function ComplianceCard({ mode }: { mode: "admin" | "analytics" }) {
  return <CardApp id={`dashboard-compliance-${mode}`} className="gap-3 p-5"><div className="flex items-start justify-between gap-3"><div><TextApp id={`compliance-title-${mode}`} variant="body2" weight="bold">Kepatuhan Pembayaran</TextApp><TextApp id={`compliance-caption-${mode}`} variant="micro" className="mt-0.5 text-ink-muted">Wajib pajak aktif bulan ini</TextApp></div><div className="rounded-[var(--radius-md)] bg-success/10 p-2 text-success"><Users className="h-4 w-4" /></div></div><div className="flex items-end justify-between gap-3"><div><TextApp id={`compliance-value-${mode}`} variant="h3" weight="bold">91,6%</TextApp><TextApp id={`compliance-total-${mode}`} variant="micro" className="mt-1 text-ink-muted">22.762 dari 24.850 WP</TextApp></div><BadgeApp id={`compliance-trend-${mode}`} variant="success" size="sm">+3,2%</BadgeApp></div></CardApp>;
}

function ChannelCard({ mode }: { mode: "admin" | "analytics" }) {
  return <CardApp id={`dashboard-my-cards-${mode}`} className="gap-4 p-5"><div className="flex items-center justify-between gap-2"><div><TextApp id={`my-cards-title-${mode}`} variant="body2" weight="bold">Kanal Pembayaran</TextApp><TextApp id={`my-cards-caption-${mode}`} variant="micro" className="text-ink-muted">Rekonsiliasi penerimaan aktif</TextApp></div><ButtonApp id={`my-cards-add-${mode}`} variant="ghost" size="sm" leftIcon={<Plus />}>Kelola</ButtonApp></div><div className="relative min-h-40 overflow-hidden rounded-[var(--radius-lg)] bg-vibrant-purple-dark p-5 text-white shadow-vibrant-soft"><div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10" /><div className="absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-vibrant-blue/20" /><div className="relative flex h-full flex-col justify-between gap-8"><div className="flex items-center justify-between"><CreditCard className="h-6 w-6" /><span className="text-xs font-semibold tracking-widest">P4D · HOST TO HOST</span></div><div><div className="text-xl font-bold font-display">12.480 transaksi</div><div className="mt-4 flex flex-wrap items-end justify-between gap-3"><div><div className="text-[9px] uppercase text-white/60">Kanal Utama</div><div className="text-xs font-semibold">Bank BPD DIY</div></div><div><div className="text-[9px] uppercase text-white/60">Status</div><div className="text-xs font-semibold text-vibrant-yellow">Tersinkron</div></div></div></div></div></div></CardApp>;
}

function DashboardPreview({ mode }: { mode: "admin" | "analytics" }) {
  return <div className="overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-canvas shadow-card">
    <div className="grid min-h-[820px] grid-cols-1 2xl:grid-cols-[200px_minmax(0,1fr)]">
      <div className="hidden border-r border-hairline 2xl:block"><SidebarApp id={`dashboard-preview-sidebar-${mode}`} embedded isCollapsed={false} size="sm" menuGroups={menuGroups} brand={{ logo: <Building2 className="h-5 w-5 text-vibrant-purple-dark" />, title: "BPKAD Admin", subtitle: mode === "admin" ? "Admin Panel" : "Analytics" }} userProfile={{ name: "Admin BPKAD", role: "Administrator" }} /></div>
      <div className="min-w-0">
        <header className="flex min-h-16 items-center justify-between gap-3 border-b border-hairline bg-surface px-3 py-2 md:px-5"><div className="flex min-w-0 items-center gap-2"><ButtonApp id={`dashboard-mobile-menu-${mode}`} variant="icon" size="iconSm" className="2xl:hidden" aria-label="Buka navigasi"><Menu /></ButtonApp><div className="min-w-0"><TextApp id={`dashboard-header-title-${mode}`} variant="body" weight="bold" className="truncate">Selamat pagi, Admin</TextApp><TextApp id={`dashboard-header-subtitle-${mode}`} variant="micro" className="truncate text-ink-muted">Ringkasan Pendapatan Asli Daerah</TextApp></div></div><div className="flex items-center gap-2"><SearchBarApp id={`dashboard-search-${mode}`} variant="standard" placeholder="Cari data PAD..." className="hidden w-44 xl:flex" /><ButtonApp id={`dashboard-notification-${mode}`} variant="icon" size="iconSm" aria-label="Notifikasi" className="relative"><Bell /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-error" /></ButtonApp><AvatarApp id={`dashboard-avatar-${mode}`} name="Admin BPKAD" size="sm" variant="vibrant" /></div></header>

        <ContainerApp id={`dashboard-content-${mode}`} as="main" fluid className="space-y-5 py-3 md:py-5">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><BadgeApp id={`dashboard-badge-${mode}`} variant="solidPurple" size="sm">{mode === "admin" ? "ADMIN PANEL PAD" : "ANALYTICS PAD"}</BadgeApp><TextApp id={`dashboard-page-title-${mode}`} variant="h2" weight="bold" className="mt-2">Monitoring Pendapatan Daerah</TextApp><TextApp id={`dashboard-page-desc-${mode}`} variant="caption" className="mt-1 text-ink-secondary">Pantau target, realisasi, transaksi, dan aktivitas pelayanan pajak.</TextApp></div><ButtonApp id={`dashboard-export-${mode}`} variant="secondary" size="sm">Unduh Laporan</ButtonApp></div>

          <GridApp id={`dashboard-main-grid-${mode}`} variant="full12" gap="md" cols={1} cols2Xl={12}>
            <ColApp id={`dashboard-left-column-${mode}`} span="full" span2Xl={4} as="aside" className="min-w-0">
              <GridApp id={`dashboard-left-stack-${mode}`} variant="cards" gap="sm" cols={1} colsSm={2} colsXl={3} cols2Xl={1}>
                <ColApp id={`dashboard-revenue-col-${mode}`} span="full" spanSm={2} spanXl={1} span2Xl="full"><RevenueSummaryCard mode={mode} /></ColApp>
                <ColApp id={`dashboard-target-col-${mode}`} span="full" spanSm={1} span2Xl="full" className="flex flex-col gap-4 2xl:gap-6"><TargetCard mode={mode} /><ComplianceCard mode={mode} /></ColApp>
                <ColApp id={`dashboard-channel-col-${mode}`} span="full" spanSm={1} span2Xl="full"><ChannelCard mode={mode} /></ColApp>
              </GridApp>
            </ColApp>

            {/* as="div" (not "section") — ScrollProgressApp auto-scans the whole page
                for section[id] to build its dot navigation; this is a nested demo
                panel inside the Dashboard Layout showcase, not a top-level section. */}
            <ColApp id={`dashboard-right-column-${mode}`} span="full" span2Xl={8} as="div" className="min-w-0 space-y-4 2xl:space-y-6">
              <GridApp id={`dashboard-top-row-${mode}`} variant="cards" gap="md" cols={1} colsXl={2}>
                <GridApp id={`dashboard-metrics-grid-${mode}`} variant="metrics" gap="sm" cols={1} colsSm={2} colsLg={2}>
                  <ScorecardApp id={`layout-card-earnings-${mode}`} title="Total Earnings" value="Rp 842 M" unit="YTD" icon={<TrendingUp className="h-4 w-4" />} variant="yellow" trend={{ value: "+12,4%", label: "vs last year", isPositive: true }} />
                  <ScorecardApp id={`layout-card-spending-${mode}`} title="Total Spending" value="Rp 184 M" unit="YTD" icon={<TrendingDown className="h-4 w-4" />} variant="default" trend={{ value: "-4,2%", label: "vs last year", isPositive: true }} />
                  <ScorecardApp id={`layout-card-income-${mode}`} title="Total Income" value="Rp 985 M" unit="78,8%" icon={<ArrowDownLeft className="h-4 w-4" />} variant="blue" />
                  <ScorecardApp id={`layout-card-revenue-${mode}`} title="Total Revenue" value="Rp 1,25 T" unit="Target" icon={<ArrowUpRight className="h-4 w-4" />} variant="emerald" />
                </GridApp>

                <CardApp id={`dashboard-income-chart-${mode}`} className="min-w-0 gap-3 p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><TextApp id={`income-chart-title-${mode}`} variant="body2" weight="bold">Tren Penerimaan PAD</TextApp><TextApp id={`income-chart-desc-${mode}`} variant="micro" className="text-ink-muted">Target dan realisasi bulanan</TextApp></div><BadgeApp id={`income-chart-filter-${mode}`} variant="neutral" size="sm">6 Bulan</BadgeApp></div><ChartApp id={`dashboard-income-chart-data-${mode}`} type="bar" data={chartData} xKey="month" series={[{ key: "target", label: "Target", stackId: mode === "admin" ? undefined : "income" }, { key: "actual", label: "Realisasi", stackId: mode === "admin" ? undefined : "income" }]} height={300} /></CardApp>
              </GridApp>

              <RecentActivitiesPanel mode={mode} />
            </ColApp>
          </GridApp>
        </ContainerApp>
      </div>
    </div>
  </div>;
}

export function DashboardLayoutDisplayModule({ mode }: { mode?: "admin" | "analytics" }) {
  const [activeMode, setActiveMode] = React.useState<"admin" | "analytics">(mode || "admin");
  const selectedMode = mode || activeMode;
  return <ModuleCard id="uikit-dashboard-layout" icon={<LayoutDashboard className="h-5 w-5 text-vibrant-purple-dark" />} title="Dashboard Layout Pattern" description="Dashboard PAD responsif: ringkasan realisasi, target bulanan, kanal pembayaran, metrics pajak, tren penerimaan, dan aktivitas transaksi.">
    <ShowcaseGrid cols={1}>
      <ShowcaseCard
        id="dashboard-layout-showcase-admin-analytics"
        title="Admin Panel & Analytics Dashboard"
        description="Sidebar, header, ringkasan realisasi, target, kanal pembayaran, metrics, tren penerimaan, dan aktivitas terbaru"
        align="start"
        code={`<SidebarApp id="sidebar" menuGroups={menuGroups} />\n<ScorecardApp id="earnings" title="Total Earnings" value="Rp 842 M" variant="yellow" />\n<ChartApp id="income-chart" type="bar" data={chartData} series={[{ key: "target" }, { key: "actual" }]} />\n<DataTableApp id="activities" data={activities} columns={activityColumns} enablePagination enableSearch />`}
      >
        <div className="w-full space-y-4">
          {!mode && <div className="flex gap-2"><ButtonApp id="dashboard-layout-admin-tab" variant={selectedMode === "admin" ? "primary" : "secondary"} size="sm" onClick={() => setActiveMode("admin")}>Admin Panel</ButtonApp><ButtonApp id="dashboard-layout-analytics-tab" variant={selectedMode === "analytics" ? "primary" : "secondary"} size="sm" onClick={() => setActiveMode("analytics")}>Analytics Dashboard</ButtonApp></div>}
          <DashboardPreview mode={selectedMode} />
        </div>
      </ShowcaseCard>
    </ShowcaseGrid>
  </ModuleCard>;
}
