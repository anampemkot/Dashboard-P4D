import * as React from "react";
import {
  SidebarApp,
  SidebarMenuGroup,
  SidebarVariant,
  SidebarSize,
  SidebarRounded,
  SidebarPosition,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
} from "@/packages/design-system";
import {
  LayoutDashboard,
  Users,
  Building2,
  Database,
  FileText,
  ShieldCheck,
  Settings,
  Layers,
  Sliders,
  Code,
  Check,
  Calculator,
  MapPin,
  TrendingUp,
  Clock,
  LogOut,
  Folder,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function SidebarDisplayModule() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [position, setPosition] = React.useState<SidebarPosition>("left");
  const [variant, setVariant] = React.useState<SidebarVariant>("default");
  const [size, setSize] = React.useState<SidebarSize>("md");
  const [rounded, setRounded] = React.useState<SidebarRounded>("md");
  const [copied, setCopied] = React.useState(false);

  // Sample menu groups for BPKAD Admin
  const sampleMenuGroups: SidebarMenuGroup[] = [
    {
      id: "grp-main",
      heading: "Utama & Ringkasan",
      items: [
        {
          id: "m-dashboard",
          label: "Dashboard Pajak P4D",
          path: "/admin",
          icon: <LayoutDashboard className="w-4 h-4" />,
          active: true,
        },
        {
          id: "m-pbb",
          label: "Pendataan & Penetapan PBB",
          path: "/pbb",
          icon: <Calculator className="w-4 h-4" />,
          badge: "12 Baru",
          badgeVariant: "solidPurple",
          children: [
            { id: "m-pbb-massal", label: "Penetapan Massal", path: "/pbb/massal" },
            { id: "m-pbb-individual", label: "Penetapan Individual", path: "/pbb/individual", active: true },
            { id: "m-pbb-njop", label: "Peta ZNT & NJOP", path: "/pbb/znt" },
          ],
        },
      ],
    },
    {
      id: "grp-audit",
      heading: "Pemeriksaan & GIS",
      items: [
        {
          id: "m-gis",
          label: "Peta Tematik GIS Jogja",
          path: "/gis",
          icon: <MapPin className="w-4 h-4" />,
        },
        {
          id: "m-audit",
          label: "Audit Kepatuhan PBJT",
          path: "/audit",
          icon: <ShieldCheck className="w-4 h-4" />,
          badge: 5,
        },
        {
          id: "m-laporan",
          label: "Laporan Potensi Pajak",
          path: "/laporan",
          icon: <TrendingUp className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "grp-sys",
      heading: "Pengaturan Sistem",
      items: [
        {
          id: "m-uikit",
          label: "UI Kit Foundation",
          path: "/admin/uikit",
          icon: <Folder className="w-4 h-4" />,
        },
        {
          id: "m-settings",
          label: "Pengaturan Akun",
          path: "/settings",
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ];

  const sampleUserProfile = {
    name: "Drs. Eko Prasetyo, M.Si",
    role: "Kabid Pajak Daerah BPKAD",
    onSettingsClick: () => alert("Membuka Pengaturan Profil User"),
    onLogoutClick: () => alert("Melakukan Logout..."),
  };

  const codeSnippet = `<SidebarApp
  id="app-main-sidebar"
  isCollapsed={${isCollapsed}}
  onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
  position="${position}"
  variant="${variant}"
  size="${size}"
  rounded="${rounded}"
  menuGroups={menuGroups}
  userProfile={userProfile}
  embedded={true}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-sidebar-module"
      icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
      title="SidebarApp (Sidebar / Navigation Drawer)"
      description="Organism navigasi utama admin BPKAD dengan dukungan mode Expanded 260px, Mini Collapsed Icon-Only 72px, Sub-menu Accordion Tree, serta User Profile Footer."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container) */}
      <CardApp id="sidebar-showcase-single-container" className="p-4 md:p-6 space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="sidebar-card-showcase-title" variant="h4" weight="bold">
              SidebarApp Variants &amp; Layout Showcase
            </TextApp>
          </div>

          <BadgeApp id="sidebar-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          {/* Sub-section 1: Expanded Full Width Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="sidebar-variant-1-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                1. Standard Expanded Sidebar (`isCollapsed={false}`)
              </TextApp>
              <BadgeApp id="sidebar-variant-1-tag" variant="neutral" size="sm" rounded="pill">
                expanded 260px
              </BadgeApp>
            </div>

            <div className="h-[480px] bg-vibrant-grey-bg/30 p-2 rounded-xl border border-hairline-soft flex items-center justify-center overflow-hidden">
              <SidebarApp
                id="demo-sidebar-expanded"
                isCollapsed={false}
                variant="default"
                size="md"
                rounded="md"
                embedded={true}
                menuGroups={sampleMenuGroups}
                userProfile={sampleUserProfile}
              />
            </div>
          </div>

          {/* Sub-section 2: Collapsed Mini Icon-Only Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="sidebar-variant-2-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                2. Mini Collapsed Icon-Only (`isCollapsed={true}`)
              </TextApp>
              <BadgeApp id="sidebar-variant-2-tag" variant="solidPurple" size="sm" rounded="pill">
                collapsed 72px
              </BadgeApp>
            </div>

            <div className="h-[480px] bg-vibrant-grey-bg/30 p-2 rounded-xl border border-hairline-soft flex items-center justify-center overflow-hidden">
              <SidebarApp
                id="demo-sidebar-collapsed"
                isCollapsed={true}
                variant="default"
                size="md"
                rounded="md"
                embedded={true}
                menuGroups={sampleMenuGroups}
                userProfile={sampleUserProfile}
              />
            </div>
          </div>

          {/* Sub-section 3: Dark Luxury Theme Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="sidebar-variant-3-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                3. Dark Theme Sidebar (`variant="dark"`)
              </TextApp>
              <BadgeApp id="sidebar-variant-3-tag" variant="neutral" size="sm" rounded="pill">
                dark variant
              </BadgeApp>
            </div>

            <div className="h-[480px] bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              <SidebarApp
                id="demo-sidebar-dark"
                isCollapsed={false}
                variant="dark"
                size="md"
                rounded="lg"
                embedded={true}
                menuGroups={sampleMenuGroups}
                userProfile={sampleUserProfile}
              />
            </div>
          </div>

          {/* Sub-section 4: Glassmorphism Theme Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="sidebar-variant-4-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                4. Glassmorphism Backdrop Blur (`variant="glassmorphism"`)
              </TextApp>
              <BadgeApp id="sidebar-variant-4-tag" variant="solidPurple" size="sm" rounded="pill">
                glassmorphism
              </BadgeApp>
            </div>

            <div className="h-[480px] bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200 p-2 rounded-xl border border-purple-200 flex items-center justify-center overflow-hidden">
              <SidebarApp
                id="demo-sidebar-glass"
                isCollapsed={false}
                variant="glassmorphism"
                size="md"
                rounded="xl"
                embedded={true}
                menuGroups={sampleMenuGroups}
                userProfile={sampleUserProfile}
              />
            </div>
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Sliders className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="sidebar-sec2-title" variant="h4" weight="bold">
            Live Interactive SidebarApp Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp
                  id="sidebar-play-mode-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Collapse State
                </TextApp>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsCollapsed(false)}
                    className={cn(
                      "flex-1 px-2 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer",
                      !isCollapsed
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline-soft"
                    )}
                  >
                    Expanded
                  </button>
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className={cn(
                      "flex-1 px-2 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer",
                      isCollapsed
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline-soft"
                    )}
                  >
                    Collapsed
                  </button>
                </div>
              </div>

              <div>
                <TextApp
                  id="sidebar-play-pos-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Position (`position`)
                </TextApp>
                <div className="flex gap-1">
                  {(["left", "right"] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setPosition(pos)}
                      className={cn(
                        "flex-1 px-2 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer capitalize",
                        position === pos
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp
                  id="sidebar-play-var-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Variant (`variant`)
                </TextApp>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1.5 text-ink"
                >
                  <option value="default">default</option>
                  <option value="dark">dark</option>
                  <option value="glassmorphism">glassmorphism</option>
                </select>
              </div>

              <div>
                <TextApp
                  id="sidebar-play-sz-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
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

            <div>
              <TextApp
                id="sidebar-play-rnd-label"
                variant="caption"
                weight="bold"
                className="text-ink uppercase tracking-wider block mb-1"
              >
                Rounded Corners (`rounded`)
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
          </div>

          {/* Live Preview & Code */}
          <div className="lg:col-span-7 space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp
              id="sidebar-play-preview-title"
              variant="caption"
              weight="bold"
              className="text-ink-muted uppercase tracking-wider block"
            >
              Live Interactive Result Preview
            </TextApp>

            <div className="h-[460px] bg-vibrant-grey-bg/20 p-2 rounded-xl border border-hairline-soft flex items-center justify-center overflow-hidden">
              <SidebarApp
                id="interactive-sidebar-demo"
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                position={position}
                variant={variant}
                size={size}
                rounded={rounded}
                embedded={true}
                menuGroups={sampleMenuGroups}
                userProfile={sampleUserProfile}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp
                  id="sidebar-play-code-title"
                  variant="caption"
                  weight="bold"
                  className="text-ink-muted uppercase tracking-wider flex items-center gap-1"
                >
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
