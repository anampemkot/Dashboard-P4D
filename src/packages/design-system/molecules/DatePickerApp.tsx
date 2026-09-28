import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  RotateCcw,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DatePickerMode = "single" | "range" | "monthYear";
export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerFormat = "DD/MM/YYYY" | "YYYY-MM-DD" | "DD MMMM YYYY" | "MM/YYYY";

export interface DateRangeValue {
  startDate: Date | null;
  endDate: Date | null;
}

export interface QuickPresetOption {
  label: string;
  getValue: () => DateRangeValue;
}

export interface DatePickerAppProps {
  /** Unique element ID for accessibility */
  id: string;
  /** Selection mode: single date, date range, or month/year */
  mode?: DatePickerMode;
  /** Single date value (for mode="single" or "monthYear") */
  value?: Date | null;
  /** Initial single date value for uncontrolled usage */
  defaultValue?: Date | null;
  /** Single date change handler */
  onChange?: (date: Date | null) => void;
  /** Range value object (for mode="range") */
  rangeValue?: DateRangeValue;
  /** Initial range value for uncontrolled usage */
  defaultRangeValue?: DateRangeValue;
  /** Range change handler */
  onRangeChange?: (range: DateRangeValue) => void;
  /** Display format pattern */
  format?: DatePickerFormat | string;
  /** Custom placeholder text */
  placeholder?: string;
  /** Input size metric */
  size?: DatePickerSize;
  /** Disabled component state */
  disabled?: boolean;
  /** Error flag or error message string */
  error?: boolean | string;
  /** Helper text displayed below input */
  helperText?: React.ReactNode;
  /** Min selectable date */
  minDate?: Date;
  /** Max selectable date */
  maxDate?: Date;
  /** Custom function to disable specific dates */
  isDateDisabled?: (date: Date) => boolean;
  /** Show quick range preset buttons on side/bottom (mode="range") */
  showPresets?: boolean;
  /** Show Action Buttons (Apply & Cancel) in popover footer */
  showActions?: boolean;
  /** Label text for Apply button */
  applyLabel?: string;
  /** Label text for Cancel button */
  cancelLabel?: string;
  /** Custom preset list for date range */
  presets?: QuickPresetOption[];
  /** Label text beside or above picker */
  label?: React.ReactNode;
  /** Container custom class name */
  className?: string;
}

// Indonesian locale month and day names
const MONTH_NAMES_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAY_NAMES_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// Default Quick Presets for Date Range
const DEFAULT_PRESETS: QuickPresetOption[] = [
  {
    label: "Hari Ini",
    getValue: () => {
      const today = new Date();
      return { startDate: today, endDate: today };
    },
  },
  {
    label: "7 Hari Terakhir",
    getValue: () => {
      const today = new Date();
      const past = new Date();
      past.setDate(today.getDate() - 6);
      return { startDate: past, endDate: today };
    },
  },
  {
    label: "30 Hari Terakhir",
    getValue: () => {
      const today = new Date();
      const past = new Date();
      past.setDate(today.getDate() - 29);
      return { startDate: past, endDate: today };
    },
  },
  {
    label: "Bulan Ini",
    getValue: () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: "Tahun Ini",
    getValue: () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      return { startDate: start, endDate: end };
    },
  },
];

// Helper to format date into readable text string
function formatDateToString(date: Date | null, format: string = "DD/MM/YYYY"): string {
  if (!date || isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const monthNum = String(date.getMonth() + 1).padStart(2, "0");
  const monthName = MONTH_NAMES_ID[date.getMonth()];
  const year = date.getFullYear();

  if (format === "DD/MM/YYYY") return `${day}/${monthNum}/${year}`;
  if (format === "YYYY-MM-DD") return `${year}-${monthNum}-${day}`;
  if (format === "DD MMMM YYYY") return `${day} ${monthName} ${year}`;
  if (format === "MM/YYYY") return `${monthNum}/${year}`;

  return date.toLocaleDateString("id-ID");
}

// Compare two dates ignoring time
function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isSameMonth(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const min = Math.min(s, e);
  const max = Math.max(s, e);
  return t >= min && t <= max;
}

export const DatePickerApp = React.forwardRef<HTMLDivElement, DatePickerAppProps>(
  (
    {
      id,
      mode = "single",
      value: controlledValue,
      defaultValue = null,
      onChange,
      rangeValue: controlledRangeValue,
      defaultRangeValue = { startDate: null, endDate: null },
      onRangeChange,
      format = "DD/MM/YYYY",
      placeholder,
      size = "md",
      disabled = false,
      error,
      helperText,
      minDate,
      maxDate,
      isDateDisabled,
      showPresets = true,
      showActions = true,
      applyLabel = "Terapkan",
      cancelLabel = "Batal",
      presets = DEFAULT_PRESETS,
      label,
      className,
    },
    ref
  ) => {
    // Single Date State
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(defaultValue);
    const isControlledValue = controlledValue !== undefined;
    const selectedDate = isControlledValue ? controlledValue : uncontrolledValue;

    // Range Date State
    const [uncontrolledRange, setUncontrolledRange] = React.useState<DateRangeValue>(defaultRangeValue);
    const isControlledRange = controlledRangeValue !== undefined;
    const selectedRange = isControlledRange ? controlledRangeValue : uncontrolledRange;

    // Pending Range State while popover is open
    const [pendingRange, setPendingRange] = React.useState<DateRangeValue>(selectedRange);
    const [pendingSingle, setPendingSingle] = React.useState<Date | null>(selectedDate);

    // Hover date for range preview
    const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

    // Popover visibility
    const [isOpen, setIsOpen] = React.useState(false);

    // Navigation state (view month and year)
    const initialViewDate = selectedDate || selectedRange.startDate || new Date();
    const [viewYear, setViewYear] = React.useState(initialViewDate.getFullYear());
    const [viewMonth, setViewMonth] = React.useState(initialViewDate.getMonth());

    // Month/Year view sub-panel toggle ("calendar" vs "monthPicker" vs "yearPicker")
    const [viewMode, setViewMode] = React.useState<"calendar" | "monthPicker" | "yearPicker">("calendar");

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const popoverRef = React.useRef<HTMLDivElement | null>(null);

    // Auto placement states to prevent viewport overflow
    const [placementY, setPlacementY] = React.useState<"bottom" | "top">("bottom");
    const [placementX, setPlacementX] = React.useState<"left" | "right">("left");

    // Dynamic placement detection on open, scroll, or resize
    React.useLayoutEffect(() => {
      if (!isOpen || !containerRef.current) return;

      const updatePosition = () => {
        if (!containerRef.current) return;
        const triggerRect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const popoverHeight = popoverRef.current
          ? popoverRef.current.offsetHeight
          : mode === "range" && showPresets
          ? 420
          : 360;

        const popoverWidth = popoverRef.current
          ? popoverRef.current.offsetWidth
          : mode === "range" && showPresets
          ? (viewportWidth >= 768 ? 540 : 340)
          : 320;

        // Vertical collision check (top vs bottom)
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        if (spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
          setPlacementY("top");
        } else {
          setPlacementY("bottom");
        }

        // Horizontal collision check (left vs right)
        const spaceRight = viewportWidth - triggerRect.left;
        if (spaceRight < popoverWidth && triggerRect.right >= popoverWidth) {
          setPlacementX("right");
        } else {
          setPlacementX("left");
        }
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen, mode, showPresets]);

    // Sync pending states when popover opens or controlled value changes
    React.useEffect(() => {
      setPendingSingle(selectedDate);
      setPendingRange(selectedRange);
    }, [selectedDate, selectedRange, isOpen]);

    // Close popover when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // Handle Month Navigation
    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      } else {
        setViewMonth(viewMonth - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      } else {
        setViewMonth(viewMonth + 1);
      }
    };

    // Check if a date is disabled
    const checkIsDisabled = (date: Date): boolean => {
      if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
        return true;
      }
      if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59)) {
        return true;
      }
      if (isDateDisabled && isDateDisabled(date)) {
        return true;
      }
      return false;
    };

    // Handle Day Click
    const handleDayClick = (date: Date) => {
      if (checkIsDisabled(date)) return;

      if (mode === "single") {
        setPendingSingle(date);
        if (!showActions) {
          if (!isControlledValue) setUncontrolledValue(date);
          onChange?.(date);
          setIsOpen(false);
        }
      } else if (mode === "range") {
        let newRange: DateRangeValue;
        if (!pendingRange.startDate || (pendingRange.startDate && pendingRange.endDate)) {
          // First click set start date
          newRange = { startDate: date, endDate: null };
        } else {
          // Second click set end date
          if (date < pendingRange.startDate) {
            newRange = { startDate: date, endDate: pendingRange.startDate };
          } else {
            newRange = { startDate: pendingRange.startDate, endDate: date };
          }
        }
        setPendingRange(newRange);

        if (!showActions && newRange.startDate && newRange.endDate) {
          if (!isControlledRange) setUncontrolledRange(newRange);
          onRangeChange?.(newRange);
          setIsOpen(false);
        }
      }
    };

    // Handle Month Select in monthYear mode or monthPicker view
    const handleMonthSelect = (monthIndex: number) => {
      setViewMonth(monthIndex);
      if (mode === "monthYear") {
        const date = new Date(viewYear, monthIndex, 1);
        setPendingSingle(date);
        if (!showActions) {
          if (!isControlledValue) setUncontrolledValue(date);
          onChange?.(date);
          setIsOpen(false);
        }
      } else {
        setViewMode("calendar");
      }
    };

    // Handle Year Select
    const handleYearSelect = (year: number) => {
      setViewYear(year);
      if (mode === "monthYear") {
        const date = new Date(year, viewMonth, 1);
        setPendingSingle(date);
        if (!showActions) {
          if (!isControlledValue) setUncontrolledValue(date);
          onChange?.(date);
          setIsOpen(false);
        }
      } else {
        setViewMode("calendar");
      }
    };

    // Apply action
    const handleApply = () => {
      if (mode === "single" || mode === "monthYear") {
        if (!isControlledValue) setUncontrolledValue(pendingSingle);
        onChange?.(pendingSingle);
      } else if (mode === "range") {
        if (!isControlledRange) setUncontrolledRange(pendingRange);
        onRangeChange?.(pendingRange);
      }
      setIsOpen(false);
    };

    // Cancel action
    const handleCancel = () => {
      setPendingSingle(selectedDate);
      setPendingRange(selectedRange);
      setIsOpen(false);
    };

    // Clear action
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (mode === "single" || mode === "monthYear") {
        if (!isControlledValue) setUncontrolledValue(null);
        onChange?.(null);
      } else if (mode === "range") {
        const emptyRange = { startDate: null, endDate: null };
        if (!isControlledRange) setUncontrolledRange(emptyRange);
        onRangeChange?.(emptyRange);
      }
    };

    // Quick Preset Click
    const handlePresetClick = (preset: QuickPresetOption) => {
      const val = preset.getValue();
      setPendingRange(val);
      if (val.startDate) {
        setViewYear(val.startDate.getFullYear());
        setViewMonth(val.startDate.getMonth());
      }
      if (!showActions) {
        if (!isControlledRange) setUncontrolledRange(val);
        onRangeChange?.(val);
        setIsOpen(false);
      }
    };

    // Format display string for trigger input
    const renderDisplayText = () => {
      if (mode === "single") {
        if (!selectedDate) return placeholder || "Pilih Tanggal";
        return formatDateToString(selectedDate, format);
      }
      if (mode === "monthYear") {
        if (!selectedDate) return placeholder || "Pilih Bulan/Tahun";
        return `${MONTH_NAMES_ID[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
      }
      if (mode === "range") {
        const start = selectedRange.startDate ? formatDateToString(selectedRange.startDate, format) : "";
        const end = selectedRange.endDate ? formatDateToString(selectedRange.endDate, format) : "";
        if (!start && !end) return placeholder || "Pilih Rentang Tanggal";
        if (start && !end) return `${start} - ...`;
        return `${start} - ${end}`;
      }
      return "";
    };

    // Generate Calendar Days Grid
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

    const calendarDays: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    // Prev month padding days
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      calendarDays.push({
        date: new Date(viewYear, viewMonth - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        date: new Date(viewYear, viewMonth, day),
        isCurrentMonth: true,
      });
    }

    // Next month padding days to make full 6-row grid (42 cells)
    const remainingCells = 42 - calendarDays.length;
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({
        date: new Date(viewYear, viewMonth + 1, day),
        isCurrentMonth: false,
      });
    }

    const today = new Date();
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : null;

    const sizeClasses = {
      sm: "h-8.5 text-xs px-2.5",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-3.5",
    }[size];

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block w-full flex-col gap-1.5", isOpen ? "z-40" : "z-10", className)}
      >
        {/* Label */}
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold text-ink mb-1 select-none">
            {label}
          </label>
        )}

        {/* Trigger Input Button */}
        <div
          id={id}
          data-ui-id={id}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "relative flex items-center justify-between w-full bg-surface border border-hairline rounded-input-custom cursor-pointer select-none transition-all duration-200",
            sizeClasses,
            isOpen && "border-vibrant-purple ring-2 ring-vibrant-purple/20 shadow-xs",
            hasError && "border-rose-500 ring-2 ring-rose-500/20 dark:border-rose-400",
            disabled && "opacity-50 cursor-not-allowed bg-surface-soft/60"
          )}
        >
          <div className="flex items-center gap-2.5 truncate">
            <CalendarIcon className="w-4 h-4 text-vibrant-purple-dark shrink-0" />
            <span
              className={cn(
                "truncate font-medium",
                (mode === "single" && !selectedDate) ||
                  (mode === "range" && !selectedRange.startDate) ||
                  (mode === "monthYear" && !selectedDate)
                  ? "text-ink-muted/70 font-normal"
                  : "text-ink"
              )}
            >
              {renderDisplayText()}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Clear 'X' button if value exists */}
            {((mode === "single" && selectedDate) ||
              (mode === "range" && (selectedRange.startDate || selectedRange.endDate)) ||
              (mode === "monthYear" && selectedDate)) &&
              !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded-full text-ink-muted hover:text-rose-500 hover:bg-surface-soft transition-colors cursor-pointer"
                  title="Hapus tanggal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
          </div>
        </div>

        {/* Helper or Error Message */}
        {(errorMessage || helperText) && (
          <div className="px-1 text-xs leading-tight mt-1">
            {errorMessage ? (
              <span className="text-rose-500 font-medium">{errorMessage}</span>
            ) : helperText ? (
              <span className="text-ink-muted">{helperText}</span>
            ) : null}
          </div>
        )}

        {/* POPOVER CALENDAR CONTAINER */}
        {isOpen && (
          <div
            ref={popoverRef}
            className={cn(
              "absolute z-50 p-4 bg-surface border border-hairline rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200 select-none max-w-[calc(100vw-2rem)]",
              placementY === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
              placementX === "right" ? "right-0 left-auto" : "left-0 right-auto",
              mode === "range" && showPresets ? "w-auto min-w-[320px] md:min-w-[540px]" : "w-[320px]"
            )}
          >
            <div className={cn("flex flex-col md:flex-row gap-4", mode === "range" && showPresets && "items-stretch")}>
              {/* Presets Sidebar for Range Mode */}
              {mode === "range" && showPresets && (
                <div className="w-full md:w-40 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-hairline-soft flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1 hidden md:block px-2">
                    Preset Cepat
                  </span>
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors whitespace-nowrap hover:bg-vibrant-purple/10 hover:text-vibrant-purple-dark text-ink-secondary"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Calendar Section */}
              <div className="flex-1 space-y-3">
                {/* Header (Month Navigation & View Mode Switcher) */}
                <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-soft transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setViewMode(viewMode === "monthPicker" ? "calendar" : "monthPicker")}
                      className="px-2 py-1 rounded-md text-xs font-bold text-ink hover:bg-vibrant-purple/10 hover:text-vibrant-purple-dark transition-colors"
                    >
                      {MONTH_NAMES_ID[viewMonth]}
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode(viewMode === "yearPicker" ? "calendar" : "yearPicker")}
                      className="px-2 py-1 rounded-md text-xs font-bold text-ink hover:bg-vibrant-purple/10 hover:text-vibrant-purple-dark transition-colors"
                    >
                      {viewYear}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-soft transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* MONTH PICKER VIEW */}
                {viewMode === "monthPicker" && (
                  <div className="grid grid-cols-3 gap-2 py-2">
                    {MONTH_NAMES_ID.map((mName, mIdx) => {
                      const isSelectedMonth = viewMonth === mIdx;
                      return (
                        <button
                          key={mIdx}
                          type="button"
                          onClick={() => handleMonthSelect(mIdx)}
                          className={cn(
                            "py-2 rounded-xl text-xs font-semibold transition-all",
                            isSelectedMonth
                              ? "bg-vibrant-purple text-white shadow-sm"
                              : "bg-surface-soft/60 text-ink hover:bg-vibrant-purple/15 hover:text-vibrant-purple-dark"
                          )}
                        >
                          {mName}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* YEAR PICKER VIEW */}
                {viewMode === "yearPicker" && (
                  <div className="grid grid-cols-3 gap-2 py-2 max-h-[220px] overflow-y-auto">
                    {Array.from({ length: 20 }, (_, i) => viewYear - 10 + i).map((yVal) => {
                      const isSelectedYear = viewYear === yVal;
                      return (
                        <button
                          key={yVal}
                          type="button"
                          onClick={() => handleYearSelect(yVal)}
                          className={cn(
                            "py-2 rounded-xl text-xs font-semibold transition-all",
                            isSelectedYear
                              ? "bg-vibrant-purple text-white shadow-sm"
                              : "bg-surface-soft/60 text-ink hover:bg-vibrant-purple/15 hover:text-vibrant-purple-dark"
                          )}
                        >
                          {yVal}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* DAYS CALENDAR GRID VIEW */}
                {viewMode === "calendar" && mode !== "monthYear" && (
                  <div>
                    {/* Day Names Header */}
                    <div className="grid grid-cols-7 mb-1 text-center">
                      {DAY_NAMES_ID.map((dName, dIdx) => (
                        <span key={dIdx} className="text-[11px] font-bold text-ink-muted py-1">
                          {dName}
                        </span>
                      ))}
                    </div>

                    {/* Days Cells */}
                    <div className="grid grid-cols-7 gap-1" onMouseLeave={() => setHoverDate(null)}>
                      {calendarDays.map(({ date, isCurrentMonth }, idx) => {
                        const disabledDay = checkIsDisabled(date);
                        const isToday = isSameDay(date, today);

                        // Single selection status
                        const isSingleSelected = mode === "single" && isSameDay(date, pendingSingle);

                        // Range selection status
                        const isRangeStart =
                          mode === "range" && pendingRange.startDate && isSameDay(date, pendingRange.startDate);
                        const isRangeEnd =
                          mode === "range" && pendingRange.endDate && isSameDay(date, pendingRange.endDate);

                        const activeRangeEnd = pendingRange.endDate || hoverDate;
                        const inRange =
                          mode === "range" &&
                          pendingRange.startDate &&
                          activeRangeEnd &&
                          isDateInRange(date, pendingRange.startDate, activeRangeEnd);

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={disabledDay}
                            onClick={() => handleDayClick(date)}
                            onMouseEnter={() => mode === "range" && pendingRange.startDate && setHoverDate(date)}
                            className={cn(
                              "h-8 w-full flex items-center justify-center rounded-lg text-xs font-medium transition-all relative cursor-pointer",
                              !isCurrentMonth && "text-ink-muted/40",
                              isCurrentMonth && "text-ink",
                              isToday && !isSingleSelected && !isRangeStart && !isRangeEnd && "border border-vibrant-purple font-bold text-vibrant-purple-dark",
                              disabledDay && "opacity-25 cursor-not-allowed pointer-events-none",

                              // Single Mode Highlight
                              isSingleSelected && "bg-vibrant-purple text-white font-bold shadow-xs rounded-lg z-10",

                              // Range Mode Highlight
                              inRange && !isRangeStart && !isRangeEnd && "bg-vibrant-purple/15 text-vibrant-purple-dark rounded-none",
                              isRangeStart && "bg-vibrant-purple text-white font-bold rounded-l-lg rounded-r-none z-10 shadow-xs",
                              isRangeEnd && "bg-vibrant-purple text-white font-bold rounded-r-lg rounded-l-none z-10 shadow-xs",
                              isRangeStart && isRangeEnd && "rounded-lg"
                            )}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Today & Quick Action Footer */}
                <div className="pt-2 border-t border-hairline-soft flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      setViewYear(now.getFullYear());
                      setViewMonth(now.getMonth());
                      if (mode === "single") handleDayClick(now);
                    }}
                    className="text-xs font-semibold text-vibrant-purple hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    Hari Ini
                  </button>

                  {showActions && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-ink-secondary hover:bg-surface-soft transition-colors cursor-pointer"
                      >
                        {cancelLabel}
                      </button>
                      <button
                        type="button"
                        onClick={handleApply}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-vibrant-purple hover:bg-vibrant-purple-dark transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {applyLabel}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePickerApp.displayName = "DatePickerApp";
