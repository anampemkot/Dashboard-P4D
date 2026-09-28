import * as React from "react";
import { BadgeApp, TextApp, ButtonApp } from "@/packages/design-system";
import { CheckCircle2, Clock, Sparkles, ChevronDown, ChevronUp, Layers } from "lucide-react";

export interface UiTodoItem {
  id: string;
  name: string;
  status: "ready" | "in-progress" | "planned";
  description: string;
  tag?: string;
}

export interface CategorySectionCardProps {
  id: string;
  number: string;
  title: string;
  dataLabel: string;
  description: string;
  icon: React.ReactNode;
  todoItems: UiTodoItem[];
  children?: React.ReactNode;
}

export function CategorySectionCard({
  id,
  number,
  title,
  dataLabel,
  description,
  icon,
  todoItems,
  children,
}: CategorySectionCardProps) {
  const [showInventory, setShowInventory] = React.useState(true);
  const [filterStatus, setFilterStatus] = React.useState<"all" | "ready" | "planned">("all");

  const readyCount = todoItems.filter((item) => item.status === "ready").length;
  const inProgressCount = todoItems.filter((item) => item.status === "in-progress").length;
  const plannedCount = todoItems.filter((item) => item.status === "planned").length;
  const totalCount = todoItems.length;

  const filteredItems = todoItems.filter((item) => {
    if (filterStatus === "ready") return item.status === "ready";
    if (filterStatus === "planned") return item.status === "planned" || item.status === "in-progress";
    return true;
  });

  return (
    <section
      id={id}
      data-label={dataLabel}
      className="scroll-mt-12 flex flex-col gap-6"
    >
      {/* Category Card Container */}
      <div
        id={`${id}-header-card`}
        className="card p-6 md:p-8 bg-surface border border-hairline rounded-3xl shadow-xs relative overflow-hidden flex flex-col gap-6"
      >
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline-soft pb-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-vibrant-purple/10 border border-vibrant-purple/20 flex items-center justify-center shrink-0 text-vibrant-purple-dark dark:text-purple-300 shadow-xs">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-vibrant-purple-dark text-white text-[11px] font-mono font-bold tracking-wide">
                  {number}
                </span>
                <BadgeApp id={`${id}-badge-count`} variant="solidPurple" size="sm">
                  {readyCount}/{totalCount} Komponen Selesai
                </BadgeApp>
                {inProgressCount > 0 && (
                  <BadgeApp id={`${id}-badge-dev`} variant="accent" size="sm">
                    {inProgressCount} Dalam Dev
                  </BadgeApp>
                )}
              </div>
              <TextApp id={`${id}-title`} variant="h2" className="font-bold tracking-tight text-ink">
                {number} - {title}
              </TextApp>
              <TextApp id={`${id}-desc`} variant="body" className="text-ink-secondary text-xs sm:text-sm mt-1 max-w-3xl">
                {description}
              </TextApp>
            </div>
          </div>

          {/* Right Action: Toggle Inventory */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <ButtonApp
              id={`${id}-toggle-inventory-btn`}
              variant="secondary"
              size="sm"
              onClick={() => setShowInventory(!showInventory)}
              className="gap-1.5 text-xs font-medium"
            >
              <Layers className="w-3.5 h-3.5 text-vibrant-purple-dark" />
              {showInventory ? "Sembunyikan Checklist UI" : "Lihat Checklist UI"}
              {showInventory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </ButtonApp>
          </div>
        </div>

        {/* UI Inventory / TODO Matrix */}
        {showInventory && (
          <div className="flex flex-col gap-4 bg-surface-soft/60 border border-hairline-soft rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-secondary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                  Daftar Inventaris & Roadmap UI ({filteredItems.length}/{totalCount})
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-surface border border-hairline p-1 rounded-xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setFilterStatus("all")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterStatus === "all"
                      ? "bg-vibrant-purple-dark text-white"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Semua ({totalCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("ready")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterStatus === "ready"
                      ? "bg-vibrant-purple-dark text-white"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Siap ({readyCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("planned")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterStatus === "planned"
                      ? "bg-vibrant-purple-dark text-white"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Rencana ({plannedCount + inProgressCount})
                </button>
              </div>
            </div>

            {/* Todo Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    item.status === "ready"
                      ? "bg-surface border-vibrant-purple/20 shadow-2xs"
                      : item.status === "in-progress"
                      ? "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30"
                      : "bg-surface/50 border-hairline-soft opacity-85"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-ink flex items-center gap-1.5">
                      {item.status === "ready" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : item.status === "in-progress" ? (
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-muted/40 shrink-0" />
                      )}
                      {item.name}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-soft border border-hairline text-ink-muted shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-ink-secondary leading-normal line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-1 border-t border-hairline-soft/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-ink-muted">
                      ID: {item.id}
                    </span>
                    {item.status === "ready" ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        ✓ Ready
                      </span>
                    ) : item.status === "in-progress" ? (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        In Progress
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-ink-muted">
                        Planned
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Interactive Component Preview Section */}
        {children && (
          <div className="flex flex-col gap-5 pt-4 border-t border-hairline-soft">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vibrant-purple-dark animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                Demo Komponen Interaktif (Live Preview)
              </span>
            </div>
            <div className="flex flex-col gap-6">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
