import * as React from "react";
import {
  BadgeApp,
  CalendarScheduleApp,
  CalendarScheduleEvent,
  CalendarScheduleView,
  TextApp,
} from "@/packages/design-system";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

const DEMO_NOW = new Date(2026, 6, 31, 10, 35);

const scheduleEvents: CalendarScheduleEvent[] = [
  {
    id: "verification-1",
    title: "Verifikasi Berkas PBB-P2",
    start: new Date(2026, 6, 27, 8, 0),
    end: new Date(2026, 6, 27, 9, 30),
    variant: "success",
    location: "Ruang Pelayanan P4D",
  },
  {
    id: "assessment-1",
    title: "Pembahasan Penetapan NJOP",
    start: new Date(2026, 6, 28, 10, 0),
    end: new Date(2026, 6, 28, 12, 0),
    variant: "purple",
    location: "Ruang Rapat BPKAD",
  },
  {
    id: "field-check",
    title: "Uji Petik Objek Pajak",
    start: new Date(2026, 6, 29, 13, 0),
    end: new Date(2026, 6, 29, 15, 30),
    variant: "warning",
    location: "Kecamatan Umbulharjo",
  },
  {
    id: "audit-pbjt",
    title: "Audit Kepatuhan PBJT",
    start: new Date(2026, 6, 30, 9, 0),
    end: new Date(2026, 6, 30, 11, 0),
    variant: "error",
    location: "Bidang Penagihan",
  },
  {
    id: "coordination",
    title: "Koordinasi Target PAD",
    start: new Date(2026, 6, 31, 9, 30),
    end: new Date(2026, 6, 31, 11, 0),
    variant: "info",
    location: "Aula Utama BPKAD",
  },
  {
    id: "approval",
    title: "Persetujuan Ketetapan Pajak",
    start: new Date(2026, 6, 31, 13, 30),
    end: new Date(2026, 6, 31, 15, 0),
    variant: "purple",
    location: "Ruang Kepala Bidang",
  },
  {
    id: "reporting",
    title: "Rekonsiliasi Penerimaan Juli",
    start: new Date(2026, 7, 3, 8, 30),
    end: new Date(2026, 7, 3, 10, 0),
    variant: "default",
    location: "Bidang Akuntansi",
  },
];

export function CalendarScheduleDisplayModule() {
  const [view, setView] = React.useState<CalendarScheduleView>("month");
  const [date, setDate] = React.useState(DEMO_NOW);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarScheduleEvent | null>(null);

  return (
    <ModuleCard
      id="uikit-calendar-schedule-module"
      icon={<CalendarClock className="h-5 w-5 text-vibrant-purple-dark" />}
      title="CalendarScheduleApp"
      description="Kalender agenda data-driven dengan navigasi periode, time grid, event card semantic, current-time indicator, dan tampilan responsif untuk jadwal pelayanan BPKAD."
    >
      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="calendar-schedule-showcase-interactive"
          title="Month, Week & Day View"
          description="Navigasi periode dan switcher Bulan / Minggu / Hari, klik event card untuk melihat selected state"
          align="start"
          code={`<CalendarScheduleApp id="cal" events={events} view={view} date={date} startHour={7} endHour={18} onViewChange={setView} onDateChange={setDate} onEventClick={setSelectedEvent} />`}
        >
          <div className="w-full space-y-6">
            <CalendarScheduleApp
              id="calendar-schedule-interactive"
              events={scheduleEvents}
              view={view}
              date={date}
              now={DEMO_NOW}
              startHour={7}
              endHour={18}
              onViewChange={setView}
              onDateChange={setDate}
              onEventClick={setSelectedEvent}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-hairline-soft bg-surface-soft p-3">
              <div className="flex min-w-0 items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                <TextApp id="calendar-event-selection" variant="caption" className="truncate text-ink-secondary">
                  {selectedEvent
                    ? `Agenda dipilih: ${selectedEvent.title} · ${selectedEvent.location}`
                    : "Klik event card untuk melihat selected state."}
                </TextApp>
              </div>
              <div className="flex flex-wrap gap-2">
                <BadgeApp id="calendar-legend-service" variant="solidPurple" size="sm">Pelayanan</BadgeApp>
                <BadgeApp id="calendar-legend-success" variant="success" size="sm">Selesai</BadgeApp>
                <BadgeApp id="calendar-legend-warning" variant="yellow" size="sm">Lapangan</BadgeApp>
                <BadgeApp id="calendar-legend-error" variant="danger" size="sm">Audit</BadgeApp>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
