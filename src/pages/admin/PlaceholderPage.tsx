import * as React from "react";
import { BadgeApp, TextApp, ButtonApp, SkeletonApp } from "@/packages/design-system";
import { useAuthStore } from "@/stores/useAuthStore";
import { ROLES } from "@/constants/roles";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  const { role } = useAuthStore();
  const activeRoleObj = ROLES.find((r) => r.id === role);
  const activeRoleLabel = activeRoleObj ? activeRoleObj.label : "User";

  return (
    <div className="flex flex-col gap-12 pb-24 select-none">
      {/* SECTION 1: Ringkasan - Skeleton Layout */}
      <section
        id="admin-panel-hero"
        data-scroll-section=""
        data-label="Ringkasan Utama"
        className="scroll-mt-12"
      >
        <div className="card p-6 bg-surface border border-hairline rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-left flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <BadgeApp id="admin-badge-loading" variant="neutral" className="select-none min-w-[140px] text-ink-secondary/60">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                  Sedang Memuat...
                </span>
              </BadgeApp>
              <SkeletonApp id="admin-hero-sub-skeleton" className="h-4 w-44" />
            </div>
            
            <TextApp id="admin-main-title" variant="h2" className="tracking-tight leading-tight mb-2 flex items-center gap-2">
              <span className="text-ink-secondary">Analisis:</span> {title}
            </TextApp>
            
            <div className="space-y-2 mt-4 max-w-2xl">
              <SkeletonApp id="admin-hero-desc-1" className="h-3.5 w-full" />
              <SkeletonApp id="admin-hero-desc-2" className="h-3.5 w-3/4" />
            </div>
          </div>
          <div className="flex items-center gap-3 self-end md:self-center">
            <ButtonApp id="admin-export-excel-skeleton" variant="secondary" className="text-xs h-10 px-4 opacity-70" disabled>
              <SkeletonApp id="btn-export-skeleton" className="h-3 w-16" />
            </ButtonApp>
            <ButtonApp id="admin-print-report-skeleton" variant="primary" className="text-xs h-10 px-4 opacity-70" disabled>
              <SkeletonApp id="btn-print-skeleton" className="h-3 w-20 bg-white/40 dark:bg-black/40" />
            </ButtonApp>
          </div>
        </div>
      </section>

      {/* SECTION 2: Kinerja Penerimaan - Skeleton Layout */}
      <section
        id="admin-panel-stats"
        data-scroll-section=""
        data-label="Kinerja Penerimaan"
        className="scroll-mt-12"
      >
        <div className="mb-6">
          <TextApp id="section-stats-title" variant="h3" className="font-semibold tracking-tight">
            Kinerja Penerimaan Anggaran
          </TextApp>
          <SkeletonApp id="stats-subtitle-skeleton" className="h-3 w-64 mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Target Card Skeleton */}
          <div className="card p-6 border border-hairline bg-surface rounded-3xl flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center justify-between mb-4">
              <SkeletonApp id="card-1-title" className="h-3 w-24" />
              <SkeletonApp id="card-1-icon" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <SkeletonApp id="card-1-val" className="h-7 w-36 mb-2" />
              <SkeletonApp id="card-1-sub" className="h-3.5 w-28" />
            </div>
          </div>

          {/* Realisasi Card Skeleton */}
          <div className="card p-6 border border-hairline bg-surface rounded-3xl flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center justify-between mb-4">
              <SkeletonApp id="card-2-title" className="h-3 w-28" />
              <SkeletonApp id="card-2-icon" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <SkeletonApp id="card-2-val" className="h-7 w-40 mb-2" />
              <SkeletonApp id="card-2-sub" className="h-3.5 w-24" />
            </div>
          </div>

          {/* Persentase Card Skeleton */}
          <div className="card p-6 border border-hairline bg-surface rounded-3xl flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center justify-between mb-4">
              <SkeletonApp id="card-3-title" className="h-3 w-20" />
              <SkeletonApp id="card-3-icon" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <SkeletonApp id="card-3-val" className="h-7 w-24 mb-2" />
              <div className="w-full bg-hairline-soft h-1.5 rounded-full overflow-hidden mt-3">
                <SkeletonApp id="card-3-bar" className="h-full w-2/3" />
              </div>
            </div>
          </div>

          {/* Wajib Pajak Card Skeleton */}
          <div className="card p-6 border border-hairline bg-surface rounded-3xl flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center justify-between mb-4">
              <SkeletonApp id="card-4-title" className="h-3 w-24" />
              <SkeletonApp id="card-4-icon" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <SkeletonApp id="card-4-val" className="h-7 w-20 mb-2" />
              <SkeletonApp id="card-4-sub" className="h-3.5 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Rincian Objek Pajak - Skeleton Layout */}
      <section
        id="admin-panel-breakdown"
        data-scroll-section=""
        data-label="Rincian Objek Pajak"
        className="scroll-mt-12"
      >
        <div className="mb-6">
          <TextApp id="section-breakdown-title" variant="h3" className="font-semibold tracking-tight">
            Rincian Objek Pajak Daerah
          </TextApp>
          <SkeletonApp id="breakdown-subtitle-skeleton" className="h-3 w-80 mt-2" />
        </div>

        <div className="card overflow-hidden border border-hairline bg-surface rounded-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-soft border-b border-hairline text-xs font-semibold uppercase text-ink-secondary">
                <th className="px-6 py-4">Kode Akun</th>
                <th className="px-6 py-4">Sub Objek Pajak</th>
                <th className="px-6 py-4 text-right">Target (APBD)</th>
                <th className="px-6 py-4 text-right">Realisasi</th>
                <th className="px-6 py-4 text-center">Status Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-soft">
              {[1, 2, 3].map((rowId) => (
                <tr key={rowId}>
                  <td className="px-6 py-5">
                    <SkeletonApp id={`row-${rowId}-col-1`} className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-5">
                    <SkeletonApp id={`row-${rowId}-col-2`} className="h-4 w-56" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <SkeletonApp id={`row-${rowId}-col-3`} className="h-4 w-20" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <SkeletonApp id={`row-${rowId}-col-4`} className="h-4 w-20" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <SkeletonApp id={`row-${rowId}-col-5`} className="h-4 w-16" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: Aktivitas Terakhir - Skeleton Layout */}
      <section
        id="admin-panel-activity"
        data-scroll-section=""
        data-label="Log Aktivitas & Audit"
        className="scroll-mt-12"
      >
        <div className="mb-6">
          <TextApp id="section-activity-title" variant="h3" className="font-semibold tracking-tight">
            Log Aktivitas & Audit Terakhir
          </TextApp>
          <SkeletonApp id="activity-subtitle-skeleton" className="h-3 w-72 mt-2" />
        </div>

        <div className="card p-6 border border-hairline bg-surface flex flex-col gap-4">
          {[1, 2].map((activityId) => (
            <div
              key={activityId}
              className="flex items-start gap-4 p-4 rounded-sm bg-surface-soft border border-hairline-soft"
            >
              <SkeletonApp id={`activity-${activityId}-avatar`} className="w-8 h-8 rounded-sm flex-shrink-0" />
              <div className="flex-1 space-y-2 text-left">
                <SkeletonApp id={`activity-${activityId}-tag`} className="h-3 w-28" />
                <SkeletonApp id={`activity-${activityId}-desc`} className="h-4 w-3/4" />
                <div className="flex gap-2 pt-1">
                  <SkeletonApp id={`activity-${activityId}-sub1`} className="h-3 w-40" />
                  <SkeletonApp id={`activity-${activityId}-sub2`} className="h-3 w-4" />
                  <SkeletonApp id={`activity-${activityId}-sub3`} className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
