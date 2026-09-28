import * as React from "react";
import { BottomNavigationApp, BottomNavItem } from "@/packages/design-system";
import { LayoutDashboard, Building, FileText, Bell, User, Smartphone } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

export function BottomNavDisplayModule() {
  const sampleItems5: BottomNavItem[] = [
    { id: "b-home", label: "Beranda", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "b-pajak", label: "Objek Pajak", icon: <Building className="w-5 h-5" />, badge: "3", badgeVariant: "solidPurple" },
    { id: "b-laporan", label: "Laporan", icon: <FileText className="w-5 h-5" /> },
    { id: "b-notif", label: "Notifikasi", icon: <Bell className="w-5 h-5" />, badge: "9+", badgeVariant: "danger" },
    { id: "b-profil", label: "Profil", icon: <User className="w-5 h-5" /> },
  ];

  const sampleItems3 = sampleItems5.slice(0, 3);
  const sampleItems4 = sampleItems5.slice(0, 4);

  return (
    <ModuleCard
      id="uikit-bottomnav-module"
      icon={<Smartphone className="w-5 h-5 text-vibrant-purple-dark" />}
      title="BottomNavigationApp"
      description="Bilah navigasi bawah gaya aplikasi mobile (3-item, 4-item, 5-item) dengan kontainer fixed/floating, indikator titik/garis/glow aktif, serta dukungan lencana notifikasi BadgeApp."
    >
      <ShowcaseGrid cols={3}>
        <ShowcaseCard
          id="bottomnav-showcase-3item"
          title="3-Item Compact Nav"
          description='indicatorStyle="dot" · size="sm"'
          align="start"
          code={`<BottomNavigationApp id="bnav" items={items} activeId="b-home" indicatorStyle="dot" size="sm" />`}
        >
          <div className="w-full rounded-xl overflow-hidden border border-hairline-soft">
            <BottomNavigationApp id="demo-bnav-3" items={sampleItems3} activeId="b-home" indicatorStyle="dot" size="sm" />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="bottomnav-showcase-4item-line"
          title="4-Item Line Indicator"
          description='indicatorStyle="line" · size="md"'
          align="start"
          code={`<BottomNavigationApp id="bnav" items={items} activeId="b-pajak" indicatorStyle="line" size="md" />`}
        >
          <div className="w-full rounded-xl overflow-hidden border border-hairline-soft">
            <BottomNavigationApp id="demo-bnav-4" items={sampleItems4} activeId="b-pajak" indicatorStyle="line" size="md" />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="bottomnav-showcase-4item-floating"
          title="4-Item Floating Pill"
          description='variant="floating" · indicatorStyle="background" · rounded="full"'
          align="start"
          code={`<BottomNavigationApp id="bnav" items={items} activeId="b-notif" variant="floating" indicatorStyle="background" size="md" rounded="full" />`}
        >
          <div className="w-full rounded-2xl bg-vibrant-purple/10 p-1.5 border border-vibrant-purple/20 flex items-center justify-center">
            <BottomNavigationApp id="demo-bnav-5" items={sampleItems4} activeId="b-notif" variant="floating" indicatorStyle="background" size="md" rounded="full" />
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
