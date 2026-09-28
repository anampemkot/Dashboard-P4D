import * as React from "react";
import { BadgeApp, TextApp, ButtonApp } from "@/packages/design-system";
import {
  Palette,
  Layers,
  FileText,
  Navigation as NavIcon,
  Layout,
  Table as TableIcon,
  BarChart3,
  Bell,
  Sparkles,
  LayoutTemplate,
  Package,
  CheckCircle2,
  ListTodo,
  Search,
  Filter,
} from "lucide-react";

import { CategorySectionCard } from "./uikit/CategorySectionCard";
import { UI_KIT_CATEGORIES, UiCategoryConfig } from "./uikit/uikitCategoriesData";
import { PaletteItem } from "./uikit/ModuleCard";

// Live Modules
import { FoundationsDisplayModule } from "./uikit/FoundationsDisplayModule";
import { ButtonDisplayModule } from "./uikit/ButtonDisplayModule";
import { BadgeDisplayModule } from "./uikit/BadgeDisplayModule";
import { CardDisplayModule } from "./uikit/CardDisplayModule";
import { InputDisplayModule } from "./uikit/InputDisplayModule";
import { TextAreaDisplayModule } from "./uikit/TextAreaDisplayModule";
import { SkeletonDisplayModule } from "./uikit/SkeletonDisplayModule";
import { AlertDisplayModule } from "./uikit/AlertDisplayModule";
import { ChartDisplayModule } from "./uikit/ChartDisplayModule";
import { FormCompositionModule } from "./uikit/FormCompositionModule";
import { DialogDisplayModule } from "./uikit/DialogDisplayModule";
import { ScorecardDisplayModule } from "./uikit/ScorecardDisplayModule";
import { AdvanceFilterDisplayModule } from "./uikit/AdvanceFilterDisplayModule";
import { DataTableDisplayModule } from "./uikit/DataTableDisplayModule";
import { CheckboxDisplayModule } from "./uikit/CheckboxDisplayModule";
import { RadioDisplayModule } from "./uikit/RadioDisplayModule";
import { SliderDisplayModule } from "./uikit/SliderDisplayModule";
import { FileUploadDisplayModule } from "./uikit/FileUploadDisplayModule";
import { OtpInputDisplayModule } from "./uikit/OtpInputDisplayModule";
import { TradingInputDisplayModule } from "./uikit/TradingInputDisplayModule";
import { CheckboxRadioDisplayModule } from "./uikit/CheckboxRadioDisplayModule";
import { ToastDisplayModule } from "./uikit/ToastDisplayModule";
import { TabsDisplayModule } from "./uikit/TabsDisplayModule";
import { BreadcrumbDisplayModule } from "./uikit/BreadcrumbDisplayModule";
import { SidebarDisplayModule } from "./uikit/SidebarDisplayModule";
import { CommandPaletteDisplayModule } from "./uikit/CommandPaletteDisplayModule";
import { AvatarDisplayModule } from "./uikit/AvatarDisplayModule";
import { ChipsDisplayModule } from "./uikit/ChipsDisplayModule";
import { SeparatorDisplayModule } from "./uikit/SeparatorDisplayModule";
import { TooltipDisplayModule } from "./uikit/TooltipDisplayModule";
import { ToggleDisplayModule } from "./uikit/ToggleDisplayModule";
import { SearchBarDisplayModule } from "./uikit/SearchBarDisplayModule";
import { DatePickerDisplayModule } from "./uikit/DatePickerDisplayModule";
import { DropdownDisplayModule } from "./uikit/DropdownDisplayModule";
import { FabDisplayModule } from "./uikit/FabDisplayModule";
import { MapsDisplayModule } from "./uikit/MapsDisplayModule";

// Map string icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Navigation: <NavIcon className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Table: <TableIcon className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Bell: <Bell className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  LayoutTemplate: <LayoutTemplate className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
};

export default function UiKitPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState<string>("all");

  // Calculate global stats
  const totalItems = UI_KIT_CATEGORIES.reduce((acc, cat) => acc + cat.todoItems.length, 0);
  const totalReady = UI_KIT_CATEGORIES.reduce(
    (acc, cat) => acc + cat.todoItems.filter((i) => i.status === "ready").length,
    0
  );
  const totalPlanned = totalItems - totalReady;
  const progressPercent = Math.round((totalReady / totalItems) * 100);

  // Filter categories by search
  const filteredCategories = UI_KIT_CATEGORIES.filter((cat) => {
    if (activeCategoryFilter !== "all" && cat.id !== activeCategoryFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchCategory =
      cat.title.toLowerCase().includes(q) ||
      cat.number.includes(q) ||
      cat.description.toLowerCase().includes(q);
    const matchItems = cat.todoItems.some(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q))
    );
    return matchCategory || matchItems;
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-24 text-left">
      {/* Intro Hero Header Section */}
      <section id="admin-panel-hero" data-label="Ringkasan Utama" className="scroll-mt-12">
        <div className="card p-6 md:p-8 bg-surface border border-hairline rounded-3xl flex flex-col gap-6 relative overflow-hidden shadow-xs">
          <div className="absolute right-0 top-0 h-48 w-48 bg-vibrant-purple/10 rounded-full blur-3xl pointer-events-none" />

          {/* Title & Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <BadgeApp id="uikit-tag" variant="solidPurple" size="sm">
                  DESIGN SYSTEM P4D v2.0
                </BadgeApp>
                <span className="text-[11px] font-mono tracking-wider text-ink-muted uppercase bg-surface-soft px-2.5 py-1 rounded-full border border-hairline-soft">
                  11 Kategori Terstruktur
                </span>
              </div>
              <TextApp id="uikit-main-title" variant="h1" className="font-bold tracking-tight mb-2">
                Katalog Komponen UI Kit P4D
              </TextApp>
              <TextApp id="uikit-desc" variant="body" className="text-ink-secondary max-w-3xl text-sm leading-relaxed">
                Pustaka antarmuka pengguna Badan Pengelolaan Keuangan dan Aset Daerah (BPKAD) Kota Yogyakarta.
                Dikelompokkan secara rinci ke dalam 11 seksi standar industri dengan status inventaris UI dan demo komponen interaktif.
              </TextApp>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-surface-soft border border-hairline-soft p-4 rounded-2xl flex flex-col gap-2 min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-ink-secondary flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Keterisian UI Kit
                </span>
                <span className="text-vibrant-purple-dark dark:text-purple-300 font-mono font-bold">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-hairline-soft rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-vibrant-purple to-vibrant-purple-dark transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted pt-1">
                <span>{totalReady} Siap Pakai</span>
                <span>{totalPlanned} Rencana (TODO)</span>
              </div>
            </div>
          </div>

          {/* Category Shortcut Pills */}
          <div className="border-t border-hairline-soft pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                <ListTodo className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                Pintas Seksi Kategori (11 Seksi):
              </span>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="text"
                  placeholder="Cari komponen atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-surface border border-hairline focus:outline-none focus:ring-2 focus:ring-vibrant-purple/40 text-ink"
                />
              </div>
            </div>

            {/* 11 Pills Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  activeCategoryFilter === "all"
                    ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-2xs"
                    : "bg-surface text-ink-secondary hover:text-ink border-hairline hover:bg-surface-soft"
                }`}
              >
                Semua Seksi (11)
              </button>

              {UI_KIT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryFilter("all");
                    scrollToSection(cat.id);
                  }}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap bg-surface hover:bg-surface-soft text-ink-secondary hover:text-ink border border-hairline flex items-center gap-1.5 transition-all"
                >
                  <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-vibrant-purple/10 text-vibrant-purple-dark font-bold">
                    {cat.number}
                  </span>
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RENDER ALL 11 CATEGORY SECTIONS */}
      <div className="flex flex-col gap-10">
        {filteredCategories.map((cat) => {
          let liveContent: React.ReactNode = null;

          // Attach existing live demo modules to their corresponding category
          if (cat.id === "uikit-01-foundations") {
            liveContent = <FoundationsDisplayModule />;
          } else if (cat.id === "uikit-02-core-ui") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <ButtonDisplayModule />
                <FabDisplayModule />
                <BadgeDisplayModule />
                <ChipsDisplayModule />
                <SeparatorDisplayModule />
                <TooltipDisplayModule />
                <AvatarDisplayModule />
                <SkeletonDisplayModule />
              </div>
            );
          } else if (cat.id === "uikit-03-forms-inputs") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <InputDisplayModule />
                <TextAreaDisplayModule />
                <CheckboxDisplayModule />
                <RadioDisplayModule />
                <SliderDisplayModule />
                <FileUploadDisplayModule />
                <OtpInputDisplayModule />
                <TradingInputDisplayModule />
                <DropdownDisplayModule />
                <DatePickerDisplayModule />
                <CheckboxRadioDisplayModule />
                <ToggleDisplayModule />
                <FormCompositionModule />
              </div>
            );
          } else if (cat.id === "uikit-04-navigation") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <TabsDisplayModule />
                <BreadcrumbDisplayModule />
                <CommandPaletteDisplayModule />
              </div>
            );
          } else if (cat.id === "uikit-05-layouts-structure") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <CardDisplayModule />
              </div>
            );
          } else if (cat.id === "uikit-06-data-tables-lists") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <SearchBarDisplayModule />
                <AdvanceFilterDisplayModule />
                <DataTableDisplayModule />
              </div>
            );
          } else if (cat.id === "uikit-07-data-visualization") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <ScorecardDisplayModule />
                <ChartDisplayModule />
                <MapsDisplayModule />
              </div>
            );
          } else if (cat.id === "uikit-08-feedback-overlays") {
            liveContent = (
              <div className="flex flex-col gap-8">
                <AlertDisplayModule />
                <ToastDisplayModule />
                <DialogDisplayModule />
              </div>
            );
          } else if (cat.id === "uikit-09-advanced-ai") {
            liveContent = (
              <div className="p-6 bg-gradient-to-r from-vibrant-purple/10 to-brand/10 border border-vibrant-purple/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-vibrant-purple-dark text-white">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-ink">AI Tax Recommendation Engine</h4>
                    <p className="text-xs text-ink-secondary">Modul kecerdasan buatan untuk analisis potensi dan estimasi otomatis target penerimaan.</p>
                  </div>
                </div>
                <BadgeApp id="uikit-ai-badge" variant="accent" size="sm">
                  PROTOTYPE IN DEV
                </BadgeApp>
              </div>
            );
          } else if (cat.id === "uikit-10-templates-patterns") {
            liveContent = (
              <div className="p-5 bg-surface-soft border border-hairline-soft rounded-2xl text-xs text-ink-secondary flex flex-col gap-2">
                <span className="font-bold text-ink">Pola Hero Banner & Layout Dashboard Standard</span>
                <p>Template struktur layout responsif (Hero Header + Scorecards + Recharts + DataTable + Sidebar) terverifikasi standar BPKAD.</p>
              </div>
            );
          } else if (cat.id === "uikit-11-misc") {
            liveContent = (
              <div className="p-5 bg-surface-soft border border-hairline-soft rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-ink">ScrollProgressApp & Status Helpers Active</span>
                </div>
                <span className="text-ink-muted font-mono">Dot Sidebar drawer pada tepi kanan aktif.</span>
              </div>
            );
          }

          return (
            <CategorySectionCard
              key={cat.id}
              id={cat.id}
              number={cat.number}
              title={cat.title}
              dataLabel={cat.dataLabel}
              description={cat.description}
              icon={iconMap[cat.iconName] || <Package className="w-5 h-5" />}
              todoItems={cat.todoItems}
            >
              {liveContent}
            </CategorySectionCard>
          );
        })}
      </div>
    </div>
  );
}
