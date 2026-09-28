import * as React from "react";
import {
  TabsApp,
  TabsListApp,
  TabsTriggerApp,
  TabsContentApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  TabItem,
  TabsVariant,
  TabsOrientation,
  TabsSize,
  TabsRounded,
} from "@/packages/design-system";
import {
  Layers,
  User,
  Shield,
  Bell,
  Settings,
  Sparkles,
  LayoutGrid,
  CheckCircle2,
  Code,
  Check,
  Zap,
  Mail,
  FileText,
  HelpCircle,
  Sliders,
  SlidersHorizontal,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function TabsDisplayModule() {
  const [activeTab, setActiveTab] = React.useState("account");
  const [variant, setVariant] = React.useState<TabsVariant>("underline");
  const [size, setSize] = React.useState<TabsSize>("md");
  const [orientation, setOrientation] = React.useState<TabsOrientation>("horizontal");
  const [rounded, setRounded] = React.useState<TabsRounded>("lg");
  const [copied, setCopied] = React.useState(false);

  // Array of items for array-config items prop demo
  const sampleTabItems: TabItem[] = [
    {
      id: "account",
      label: "Akun",
      icon: <User className="w-4 h-4" />,
      badge: "Pribadi",
      badgeVariant: "neutral",
      content: (
        <CardApp id="card-tab-acc" variant="neutral" size="sm" rounded="card" className="space-y-2">
          <TextApp id="tab-acc-h" variant="h4" weight="bold" className="text-slate-900 dark:text-slate-100">
            Pengaturan Akun Pengguna
          </TextApp>
          <TextApp id="tab-acc-p" variant="body" color="secondary" className="text-xs">
            Atur nama lengkap, foto profil, zona waktu, dan preferensi bahasa aplikasi Anda di sini.
          </TextApp>
        </CardApp>
      ),
    },
    {
      id: "security",
      label: "Keamanan",
      icon: <Shield className="w-4 h-4" />,
      badge: "Aman",
      badgeVariant: "success",
      content: (
        <CardApp id="card-tab-sec" variant="neutral" size="sm" rounded="card" className="space-y-2">
          <TextApp id="tab-sec-h" variant="h4" weight="bold" className="text-slate-900 dark:text-slate-100">
            Keamanan &amp; Otentikasi
          </TextApp>
          <TextApp id="tab-sec-p" variant="body" color="secondary" className="text-xs">
            Status otentikasi 2-Langkah (2FA) aktif. Sesi login saat ini terenkripsi secara aman.
          </TextApp>
        </CardApp>
      ),
    },
    {
      id: "notifications",
      label: "Notifikasi",
      icon: <Bell className="w-4 h-4" />,
      badge: 12,
      badgeVariant: "vibrantPurple",
      content: (
        <CardApp id="card-tab-notif" variant="neutral" size="sm" rounded="card" className="space-y-2">
          <TextApp id="tab-notif-h" variant="h4" weight="bold" className="text-slate-900 dark:text-slate-100">
            Pemberitahuan Sistem
          </TextApp>
          <TextApp id="tab-notif-p" variant="body" color="secondary" className="text-xs">
            Anda memiliki 12 notifikasi baru yang belum dibaca dari aktivitas tim minggu ini.
          </TextApp>
        </CardApp>
      ),
    },
  ];

  const codeSnippet = `<TabsApp\n  id="my-navigation-tabs"\n  variant="${variant}"\n  orientation="${orientation}"\n  size="${size}"\n  rounded="${rounded}"\n  items={sampleTabItems}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-tabs-module"
      icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
      title="TabsApp (Tabs Navigation)"
      description="Organism/Molecule navigasi tab fleksibel dengan dukungan varian Underline, Pills, Enclosed, layout Horizontal/Vertical, Overflow Scrollable, serta animasi Motion."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container) */}
      <CardApp id="tabs-showcase-single-container" className="p-4 md:p-6 space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="tabs-card-showcase-title" variant="h4" weight="bold">
              TabsApp Variants &amp; Matrix Showcase
            </TextApp>
          </div>

          <BadgeApp id="tabs-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        <div className="space-y-8">
          {/* Sub-section 1: Horizontal Underline Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="tabs-variant-1-title" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
                1. Horizontal Underline Tabs (variant="underline")
              </TextApp>
              <BadgeApp id="tabs-variant-1-tag" variant="neutral" size="sm" rounded="pill">
                underline
              </BadgeApp>
            </div>

            <TabsApp defaultValue="profile" variant="underline" size="md">
              <TabsListApp variant="underline">
                <TabsTriggerApp value="profile" variant="underline" icon={<User className="w-4 h-4" />}>
                  Profil Saya
                </TabsTriggerApp>
                <TabsTriggerApp value="security" variant="underline" icon={<Shield className="w-4 h-4" />}>
                  Keamanan &amp; Akses
                </TabsTriggerApp>
                <TabsTriggerApp value="notifications" variant="underline" icon={<Bell className="w-4 h-4" />} badge="Hot" badgeVariant="danger">
                  Pemberitahuan
                </TabsTriggerApp>
              </TabsListApp>

              <TabsContentApp value="profile">
                <div className="p-4 bg-surface rounded-xl border border-hairline-soft text-sm text-ink-secondary">
                  Kelola identitas, alamat email utama, foto profil, dan informasi kontak Anda.
                </div>
              </TabsContentApp>
              <TabsContentApp value="security">
                <div className="p-4 bg-surface rounded-xl border border-hairline-soft text-sm text-ink-secondary">
                  Atur kunci 2FA, lihat riwayat sesi login aktif, dan perbarui kata sandi secara aman.
                </div>
              </TabsContentApp>
              <TabsContentApp value="notifications">
                <div className="p-4 bg-surface rounded-xl border border-hairline-soft text-sm text-ink-secondary">
                  Konfigurasi preferensi email pemberitahuan dan notifikasi aplikasi instant.
                </div>
              </TabsContentApp>
            </TabsApp>
          </div>

          {/* Sub-section 2: Pills Tabs dengan Icon & Badge */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="tabs-variant-2-title" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
                2. Pills Tabs with Icon &amp; Badge (variant="pills")
              </TextApp>
              <BadgeApp id="tabs-variant-2-tag" variant="solidPurple" size="sm" rounded="pill">
                pills
              </BadgeApp>
            </div>

            <TabsApp defaultValue="all" variant="pills" size="md" rounded="full">
              <TabsListApp variant="pills" rounded="full">
                <TabsTriggerApp value="all" variant="pills" rounded="full">
                  Semua Item
                </TabsTriggerApp>
                <TabsTriggerApp value="active" variant="pills" rounded="full" icon={<Zap className="w-4 h-4" />} badge={12} badgeVariant="blue">
                  Aktif
                </TabsTriggerApp>
                <TabsTriggerApp value="completed" variant="pills" rounded="full" icon={<CheckCircle2 className="w-4 h-4" />} badge={48} badgeVariant="success">
                  Selesai
                </TabsTriggerApp>
                <TabsTriggerApp value="archived" variant="pills" rounded="full" disabled>
                  Arsip
                </TabsTriggerApp>
              </TabsListApp>

              <TabsContentApp value="all">
                <div className="p-4 bg-surface-soft/80 rounded-xl border border-hairline-soft text-sm text-ink-secondary">
                  Menampilkan 60 total catatan dan tugas pekerjaan tanpa filter.
                </div>
              </TabsContentApp>
              <TabsContentApp value="active">
                <div className="p-4 bg-surface-soft/80 rounded-xl border border-hairline-soft text-sm text-ink-secondary">
                  Menampilkan 12 item pekerjaan yang saat ini sedang aktif berjalan.
                </div>
              </TabsContentApp>
              <TabsContentApp value="completed">
                <div className="p-4 bg-surface-soft/80 rounded-xl border border-hairline-soft text-sm text-ink-secondary">
                  Menampilkan 48 proyek yang telah berhasil diselesaikan oleh tim.
                </div>
              </TabsContentApp>
            </TabsApp>
          </div>

          {/* Sub-section 3: Vertical Tabs Layout */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="tabs-variant-3-title" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
                3. Vertical Sidebar Tabs Layout (orientation="vertical")
              </TextApp>
              <BadgeApp id="tabs-variant-3-tag" variant="neutral" size="sm" rounded="pill">
                vertical
              </BadgeApp>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-hairline-soft">
              <TabsApp defaultValue="general" orientation="vertical" variant="enclosed" size="md" rounded="lg">
                <TabsListApp variant="enclosed" rounded="lg" orientation="vertical">
                  <TabsTriggerApp value="general" variant="enclosed" rounded="lg" icon={<Settings className="w-4 h-4" />}>
                    Umum
                  </TabsTriggerApp>
                  <TabsTriggerApp value="billing" variant="enclosed" rounded="lg" icon={<Layers className="w-4 h-4" />} badge="Pro">
                    Langganan &amp; Billing
                  </TabsTriggerApp>
                  <TabsTriggerApp value="help" variant="enclosed" rounded="lg" icon={<HelpCircle className="w-4 h-4" />}>
                    Pusat Bantuan
                  </TabsTriggerApp>
                </TabsListApp>

                <div className="flex-1 p-2">
                  <TabsContentApp value="general">
                    <CardApp id="vert-card-gen" variant="neutral" size="sm" rounded="card" className="space-y-2">
                      <TextApp id="vert-gen-h" variant="h4" weight="bold">Konfigurasi Umum Sistem</TextApp>
                      <TextApp id="vert-gen-p" variant="body" color="secondary" className="text-xs">
                        Pengaturan nama organisasi, domain API, serta tema visual utama dashboard.
                      </TextApp>
                    </CardApp>
                  </TabsContentApp>

                  <TabsContentApp value="billing">
                    <CardApp id="vert-card-bill" variant="neutral" size="sm" rounded="card" className="space-y-2">
                      <TextApp id="vert-bill-h" variant="h4" weight="bold">Status Langganan Pro</TextApp>
                      <TextApp id="vert-bill-p" variant="body" color="secondary" className="text-xs">
                        Paket Anda aktif hingga 31 Desember 2026. Kuota API tak terbatas.
                      </TextApp>
                    </CardApp>
                  </TabsContentApp>

                  <TabsContentApp value="help">
                    <CardApp id="vert-card-help" variant="neutral" size="sm" rounded="card" className="space-y-2">
                      <TextApp id="vert-help-h" variant="h4" weight="bold">Bantuan &amp; Dokumentasi</TextApp>
                      <TextApp id="vert-help-p" variant="body" color="secondary" className="text-xs">
                        Hubungi tim dukungan teknis BPKAD 24/7 atau baca panduan resmi UI Kit.
                      </TextApp>
                    </CardApp>
                  </TabsContentApp>
                </div>
              </TabsApp>
            </div>
          </div>

          {/* Sub-section 4: Scrollable Overflow Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="tabs-variant-4-title" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
                4. Scrollable Overflow Tabs (Narrow Container / Mobile)
              </TextApp>
              <BadgeApp id="tabs-variant-4-tag" variant="neutral" size="sm" rounded="pill">
                overflow scroll
              </BadgeApp>
            </div>

            <div className="max-w-md p-3 bg-slate-100/80 dark:bg-slate-900/60 rounded-xl border border-hairline-soft">
              <TabsApp defaultValue="t1" variant="pills" size="sm" rounded="full">
                <TabsListApp variant="pills" rounded="full">
                  <TabsTriggerApp value="t1" variant="pills" rounded="full">
                    Tab 1: Ikhtisar
                  </TabsTriggerApp>
                  <TabsTriggerApp value="t2" variant="pills" rounded="full" badge="New">
                    Tab 2: Analitik
                  </TabsTriggerApp>
                  <TabsTriggerApp value="t3" variant="pills" rounded="full">
                    Tab 3: Transaksi
                  </TabsTriggerApp>
                  <TabsTriggerApp value="t4" variant="pills" rounded="full">
                    Tab 4: Audit Log
                  </TabsTriggerApp>
                  <TabsTriggerApp value="t5" variant="pills" rounded="full">
                    Tab 5: Ekspor Data
                  </TabsTriggerApp>
                  <TabsTriggerApp value="t6" variant="pills" rounded="full">
                    Tab 6: Integrasi API
                  </TabsTriggerApp>
                </TabsListApp>

                <TabsContentApp value="t1">
                  <div className="p-3 bg-surface rounded-lg text-xs text-ink-secondary mt-2">
                    Konten Tab 1: Ringkasan umum performa aplikasi.
                  </div>
                </TabsContentApp>
                <TabsContentApp value="t2">
                  <div className="p-3 bg-surface rounded-lg text-xs text-ink-secondary mt-2">
                    Konten Tab 2: Matriks statistik real-time.
                  </div>
                </TabsContentApp>
                <TabsContentApp value="t3">
                  <div className="p-3 bg-surface rounded-lg text-xs text-ink-secondary mt-2">
                    Konten Tab 3: Daftar transaksi keuangan terverifikasi.
                  </div>
                </TabsContentApp>
              </TabsApp>
            </div>
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Sliders className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="tabs-sec2-title" variant="h4" weight="bold">
            Live Interactive TabsApp Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="tabs-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Variant (`variant`)
                </TextApp>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1.5 text-ink"
                >
                  <option value="underline">underline</option>
                  <option value="pills">pills</option>
                  <option value="enclosed">enclosed</option>
                  <option value="default">default</option>
                  <option value="vibrant">vibrant</option>
                </select>
              </div>

              <div>
                <TextApp id="tabs-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Size (`size`)
                </TextApp>
                <div className="flex gap-1">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer uppercase",
                        size === s
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="tabs-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Rounded (`rounded`)
                </TextApp>
                <select
                  value={rounded}
                  onChange={(e) => setRounded(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1.5 text-ink"
                >
                  <option value="none">none</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                  <option value="full">full</option>
                </select>
              </div>

              <div>
                <TextApp id="tabs-play-ori-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Orientation (`orientation`)
                </TextApp>
                <div className="flex gap-1">
                  {(["horizontal", "vertical"] as const).map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={cn(
                        "flex-1 px-1.5 py-1 text-[11px] font-semibold rounded border transition-all cursor-pointer capitalize",
                        orientation === o
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview & Code */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="tabs-play-preview-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result Preview
            </TextApp>

            <div className="p-3 bg-vibrant-grey-bg/20 rounded-xl border border-hairline-soft min-h-[160px]">
              <TabsApp
                id="interactive-tabs-demo"
                variant={variant}
                size={size}
                orientation={orientation}
                rounded={rounded}
                items={sampleTabItems}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="tabs-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> JSX Snippet
                </TextApp>
                <button
                  onClick={copyCode}
                  className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    "Copy JSX"
                  )}
                </button>
              </div>
              <pre className="text-[10px] font-mono bg-vibrant-grey-bg/60 p-2.5 rounded border border-hairline-soft text-ink-muted overflow-x-auto">
                {codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
