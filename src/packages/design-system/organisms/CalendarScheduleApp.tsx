import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeApp } from "../atoms/BadgeApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextApp } from "../atoms/TextApp";

export type CalendarScheduleView = "month" | "week" | "day";
export type CalendarEventVariant = "default" | "purple" | "success" | "warning" | "error" | "info";

export interface CalendarScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  variant?: CalendarEventVariant;
  description?: string;
  location?: string;
  disabled?: boolean;
}

export interface CalendarScheduleAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  events: CalendarScheduleEvent[];
  view?: CalendarScheduleView;
  defaultView?: CalendarScheduleView;
  onViewChange?: (view: CalendarScheduleView) => void;
  date?: Date;
  defaultDate?: Date;
  onDateChange?: (date: Date) => void;
  onEventClick?: (event: CalendarScheduleEvent) => void;
  showViewSwitcher?: boolean;
  showCurrentTime?: boolean;
  now?: Date;
  startHour?: number;
  endHour?: number;
  slotHeight?: number;
  emptyMessage?: string;
}

const DAY_NAMES = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });
const DAY_FORMATTER = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" });
const TIME_FORMATTER = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });

const eventVariantClasses: Record<CalendarEventVariant, string> = {
  default: "border-hairline-hard bg-surface-soft text-ink",
  purple: "border-vibrant-purple/40 bg-vibrant-purple/20 text-vibrant-purple-ink",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-vibrant-yellow/30 text-vibrant-yellow-ink",
  error: "border-error/30 bg-error/10 text-error",
  info: "border-info/30 bg-info/10 text-info",
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfWeek(date: Date) {
  const day = date.getDay();
  return addDays(startOfDay(date), day === 0 ? -6 : 1 - day);
}

function isSameDay(first: Date, second: Date) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

function formatTime(date: Date) {
  return `${TIME_FORMATTER.format(date).replace(".", ":")} WIB`;
}

export function CalendarScheduleApp({
  id,
  events,
  view: controlledView,
  defaultView = "month",
  onViewChange,
  date: controlledDate,
  defaultDate = new Date(),
  onDateChange,
  onEventClick,
  showViewSwitcher = true,
  showCurrentTime = true,
  now = new Date(),
  startHour = 7,
  endHour = 18,
  slotHeight = 56,
  emptyMessage = "Tidak ada jadwal pada periode ini",
  className,
  ...props
}: CalendarScheduleAppProps) {
  const [internalView, setInternalView] = React.useState<CalendarScheduleView>(defaultView);
  const [internalDate, setInternalDate] = React.useState(defaultDate);
  const activeView = controlledView ?? internalView;
  const activeDate = controlledDate ?? internalDate;
  const hours = Array.from({ length: Math.max(1, endHour - startHour) }, (_, index) => startHour + index);

  const setView = (nextView: CalendarScheduleView) => {
    if (controlledView === undefined) setInternalView(nextView);
    onViewChange?.(nextView);
  };

  const setDate = (nextDate: Date) => {
    if (controlledDate === undefined) setInternalDate(nextDate);
    onDateChange?.(nextDate);
  };

  const navigate = (direction: -1 | 1) => {
    const next = new Date(activeDate);
    if (activeView === "month") next.setMonth(next.getMonth() + direction);
    else next.setDate(next.getDate() + direction * (activeView === "week" ? 7 : 1));
    setDate(next);
  };

  const visibleDays = React.useMemo(() => {
    if (activeView === "day") return [startOfDay(activeDate)];
    const first = activeView === "week"
      ? startOfWeek(activeDate)
      : startOfWeek(new Date(activeDate.getFullYear(), activeDate.getMonth(), 1));
    return Array.from({ length: activeView === "month" ? 42 : 7 }, (_, index) => addDays(first, index));
  }, [activeDate, activeView]);

  const periodTitle = activeView === "month"
    ? MONTH_FORMATTER.format(activeDate)
    : activeView === "week"
      ? `${SHORT_DATE_FORMATTER.format(visibleDays[0])} - ${DAY_FORMATTER.format(visibleDays[6])}`
      : DAY_FORMATTER.format(activeDate);

  const visibleEvents = events.filter((event) => visibleDays.some((day) => isSameDay(day, event.start)));

  const renderEvent = (event: CalendarScheduleEvent, compact = false) => {
    const clickable = Boolean(onEventClick) && !event.disabled;
    return (
      <button
        key={event.id}
        type="button"
        disabled={!clickable}
        onClick={() => clickable && onEventClick?.(event)}
        className={cn(
          "w-full min-w-0 overflow-hidden rounded-md border text-left transition-colors",
          compact ? "px-1.5 py-1" : "p-2",
          eventVariantClasses[event.variant ?? "default"],
          clickable && "cursor-pointer hover:brightness-95",
          event.disabled && "opacity-50"
        )}
      >
        <span className={cn("block truncate font-semibold", compact ? "text-[10px]" : "text-xs")}>{event.title}</span>
        {!compact && <span className="mt-0.5 block truncate text-[10px] opacity-80">{formatTime(event.start)} - {formatTime(event.end)}</span>}
        {!compact && event.location && <span className="mt-1 block truncate text-[10px] opacity-70">{event.location}</span>}
      </button>
    );
  };

  const renderMonth = () => (
    <div className="min-w-[720px]">
      <div className="grid grid-cols-7 border-b border-hairline-soft bg-surface-soft">
        {DAY_NAMES.map((day) => (
          <div key={day} className="px-2 py-2 text-center text-xs font-bold uppercase tracking-wider text-ink-muted">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {visibleDays.map((day) => {
          const dayEvents = events.filter((event) => isSameDay(event.start, day));
          const currentMonth = day.getMonth() === activeDate.getMonth();
          const today = isSameDay(day, now);
          return (
            <div key={day.toISOString()} className={cn("min-h-28 border-b border-r border-hairline-soft p-2", !currentMonth && "bg-surface-soft/50 text-ink-muted")}>
              <button
                type="button"
                onClick={() => setDate(day)}
                className={cn(
                  "mb-1.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold",
                  today ? "bg-vibrant-purple-dark text-white" : "text-ink hover:bg-action-hover"
                )}
                aria-label={`Pilih ${DAY_FORMATTER.format(day)}`}
              >
                {day.getDate()}
              </button>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => renderEvent(event, true))}
                {dayEvents.length > 3 && <span className="block text-[10px] font-semibold text-ink-muted">+{dayEvents.length - 3} agenda</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTimeGrid = () => {
    const gridHeight = hours.length * slotHeight;
    const nowHour = now.getHours() + now.getMinutes() / 60;
    const showNowLine = showCurrentTime
      && visibleDays.some((day) => isSameDay(day, now))
      && nowHour >= startHour
      && nowHour <= endHour;

    return (
      <div className={cn("min-w-[760px]", activeView === "day" && "min-w-[520px]")}>
        <div className="grid border-b border-hairline-soft bg-surface-soft" style={{ gridTemplateColumns: `64px repeat(${visibleDays.length}, minmax(120px, 1fr))` }}>
          <div className="border-r border-hairline-soft" />
          {visibleDays.map((day) => (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => setDate(day)}
              className={cn("border-r border-hairline-soft px-2 py-2 text-center hover:bg-action-hover", isSameDay(day, now) && "text-vibrant-purple-dark")}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider">{DAY_NAMES[(day.getDay() + 6) % 7]}</span>
              <span className={cn("mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold", isSameDay(day, now) && "bg-vibrant-purple-dark text-white")}>{day.getDate()}</span>
            </button>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: `64px repeat(${visibleDays.length}, minmax(120px, 1fr))` }}>
          <div className="relative border-r border-hairline-soft" style={{ height: gridHeight }}>
            {hours.map((hour, index) => (
              <span key={hour} className="absolute right-2 -translate-y-1/2 text-[10px] font-mono text-ink-muted" style={{ top: index * slotHeight }}>
                {String(hour).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          {visibleDays.map((day) => {
            const dayEvents = events.filter((event) => isSameDay(event.start, day));
            return (
              <div key={day.toISOString()} className="relative border-r border-hairline-soft" style={{ height: gridHeight }}>
                {hours.map((hour, index) => (
                  <span key={hour} className="absolute inset-x-0 border-t border-hairline-soft" style={{ top: index * slotHeight }} />
                ))}
                {dayEvents.map((event) => {
                  const start = event.start.getHours() + event.start.getMinutes() / 60;
                  const end = event.end.getHours() + event.end.getMinutes() / 60;
                  const top = Math.max(0, start - startHour) * slotHeight;
                  const height = Math.max(28, (Math.min(end, endHour) - Math.max(start, startHour)) * slotHeight);
                  if (end <= startHour || start >= endHour) return null;
                  return (
                    <div key={event.id} className="absolute inset-x-1 z-10" style={{ top, height }}>
                      {renderEvent(event)}
                    </div>
                  );
                })}
                {showNowLine && isSameDay(day, now) && (
                  <div className="absolute inset-x-0 z-20 flex items-center" style={{ top: (nowHour - startHour) * slotHeight }}>
                    <span className="h-2 w-2 -translate-x-1/2 rounded-full bg-error" />
                    <span className="h-px flex-1 bg-error" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id={id} data-ui-id={id} className={cn("w-full overflow-hidden rounded-lg border border-hairline bg-surface shadow-vibrant-soft", className)} {...props}>
      <div className="flex flex-col gap-3 border-b border-hairline-soft p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays className="h-5 w-5 shrink-0 text-vibrant-purple-dark" />
          <TextApp id={`${id}-period-title`} variant="h4" weight="bold" className="min-w-0 flex-1 capitalize leading-tight">
            {periodTitle}
          </TextApp>
          <BadgeApp id={`${id}-event-count`} variant="solidPurple" size="sm">{visibleEvents.length} Agenda</BadgeApp>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <ButtonApp id={`${id}-previous`} variant="secondary" size="iconSm" onClick={() => navigate(-1)} aria-label="Periode sebelumnya">
              <ChevronLeft className="h-4 w-4" />
            </ButtonApp>
            <ButtonApp id={`${id}-today`} variant="secondary" size="sm" onClick={() => setDate(startOfDay(now))}>Hari Ini</ButtonApp>
            <ButtonApp id={`${id}-next`} variant="secondary" size="iconSm" onClick={() => navigate(1)} aria-label="Periode berikutnya">
              <ChevronRight className="h-4 w-4" />
            </ButtonApp>
          </div>
          {showViewSwitcher && (
            <div className="flex items-center rounded-md border border-hairline bg-surface-soft p-1">
              {(["month", "week", "day"] as const).map((viewOption) => (
                <button
                  key={viewOption}
                  type="button"
                  onClick={() => setView(viewOption)}
                  className={cn(
                    "rounded-sm px-2.5 py-1 text-xs font-semibold capitalize transition-colors",
                    activeView === viewOption ? "bg-vibrant-purple-dark text-white" : "text-ink-secondary hover:bg-action-hover hover:text-ink"
                  )}
                >
                  {viewOption === "month" ? "Bulan" : viewOption === "week" ? "Minggu" : "Hari"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        {activeView === "month" ? renderMonth() : renderTimeGrid()}
      </div>

      {visibleEvents.length === 0 && (
        <div className="border-t border-hairline-soft p-4 text-center">
          <TextApp id={`${id}-empty`} variant="caption" className="text-ink-muted">{emptyMessage}</TextApp>
        </div>
      )}
    </div>
  );
}
