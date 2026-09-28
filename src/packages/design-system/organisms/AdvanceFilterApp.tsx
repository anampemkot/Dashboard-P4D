import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Filter,
  X,
  RotateCcw,
  Check,
  ChevronDown,
  Calendar,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { ButtonApp, ButtonAppProps } from "../atoms/ButtonApp";
import { InputApp } from "../atoms/InputApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { SelectApp } from "../atoms/SelectApp";
import { DrawerApp } from "../molecules/DrawerApp";

export type FilterFieldType =
  | "select"
  | "multi-select"
  | "date-range"
  | "text"
  | "number-range";

export interface FilterOption {
  label: string;
  value: string;
  badge?: string;
}

export interface FilterFieldConfig {
  id: string;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: any;
  colSpan?: 1 | 2; // For grid layout inside drawer
}

export interface QuickPreset {
  label: string;
  values: Record<string, any>;
}

export interface AdvanceFilterAppProps {
  id: string;
  fields: FilterFieldConfig[];
  values: Record<string, any>;
  onChange: (newValues: Record<string, any>) => void;
  onApply?: (values: Record<string, any>) => void;
  onReset?: () => void;
  displayMode?: "popover" | "drawer" | "inline";
  title?: string;
  description?: string;
  quickPresets?: QuickPreset[];
  showActivePills?: boolean;
  triggerLabel?: string;
  triggerVariant?: ButtonAppProps["variant"];
  triggerTheme?: ButtonAppProps["theme"];
  triggerSize?: ButtonAppProps["size"];
  triggerRounded?: ButtonAppProps["rounded"];
  triggerClassName?: string;
  renderTrigger?: (props: {
    isOpen: boolean;
    activeCount: number;
    onClick: () => void;
  }) => React.ReactNode;
  className?: string;
}

export function AdvanceFilterApp({
  id,
  fields,
  values,
  onChange,
  onApply,
  onReset,
  displayMode = "popover",
  title = "Filter Lanjutan",
  description = "Sesuaikan kriteria pencarian dan visualisasi data dashboard BPKAD",
  quickPresets,
  showActivePills = true,
  triggerLabel = "Filter Lanjutan",
  triggerVariant = "purple",
  triggerTheme = "default",
  triggerSize = "md",
  triggerRounded = "pill",
  triggerClassName,
  renderTrigger,
  className,
}: AdvanceFilterAppProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localValues, setLocalValues] = React.useState<Record<string, any>>(values);

  // Sync local values when prop values change or filter opens
  React.useEffect(() => {
    if (isOpen) {
      setLocalValues(values);
    }
  }, [values, isOpen]);

  // Ref to measure trigger button width for popover alignment
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  // Helper to check if a filter value is actually active
  const isValActive = (val: any): boolean => {
    if (val === undefined || val === null || val === "") return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object") {
      return Object.values(val).some((v) => v !== undefined && v !== null && v !== "");
    }
    if (typeof val === "boolean") return val;
    return true;
  };

  // Check if localValues differs from committed values prop
  const isChanged = React.useMemo(() => {
    const norm = (v: any) => {
      if (!isValActive(v)) return "";
      if (Array.isArray(v)) return JSON.stringify([...v].sort());
      if (typeof v === "object") return JSON.stringify(v);
      return String(v);
    };

    const allKeys = new Set([...Object.keys(values || {}), ...Object.keys(localValues || {})]);
    for (const key of allKeys) {
      if (norm(values?.[key]) !== norm(localValues?.[key])) {
        return true;
      }
    }
    return false;
  }, [values, localValues]);

  // Count active filters (ignoring empty arrays, empty objects, null, undefined, "")
  const activeCount = React.useMemo(() => {
    let count = 0;
    if (!values) return 0;
    Object.values(values).forEach((val) => {
      if (isValActive(val)) count++;
    });
    return count;
  }, [values]);

  const handleFieldChange = (fieldId: string, value: any) => {
    const updated = { ...localValues, [fieldId]: value };
    setLocalValues(updated);
    if (displayMode === "inline") {
      onChange(updated);
    }
  };

  const handleApply = () => {
    onChange(localValues);
    onApply?.(localValues);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalValues(values);
    setIsOpen(false);
  };

  const handleReset = () => {
    const emptyValues: Record<string, any> = {};
    fields.forEach((f) => {
      emptyValues[f.id] = f.type === "multi-select" ? [] : "";
    });
    setLocalValues(emptyValues);
    if (displayMode === "inline") {
      onChange(emptyValues);
      onReset?.();
    }
  };

  const handleResetAllCommitted = () => {
    const emptyValues: Record<string, any> = {};
    fields.forEach((f) => {
      emptyValues[f.id] = f.type === "multi-select" ? [] : "";
    });
    setLocalValues(emptyValues);
    onChange(emptyValues);
    onReset?.();
  };

  const handleRemoveSingleFilter = (fieldId: string) => {
    const updated = { ...values };
    const fieldConfig = fields.find((f) => f.id === fieldId);
    if (fieldConfig?.type === "multi-select") {
      updated[fieldId] = [];
    } else {
      delete updated[fieldId];
    }
    setLocalValues(updated);
    onChange(updated);
    onApply?.(updated);
  };

  const handlePresetSelect = (presetValues: Record<string, any>) => {
    const merged = { ...localValues, ...presetValues };
    setLocalValues(merged);
    if (displayMode === "inline") {
      onChange(merged);
      onApply?.(merged);
    }
  };

  // Helper to get friendly string representation for active pills
  const getDisplayValue = (field: FilterFieldConfig, val: any): string => {
    if (!isValActive(val)) return "";
    if (field.type === "select" && field.options) {
      const opt = field.options.find((o) => o.value === val);
      return opt ? opt.label : String(val);
    }
    if (field.type === "multi-select" && Array.isArray(val) && field.options) {
      const selectedLabels = val
        .map((v) => field.options?.find((o) => o.value === v)?.label)
        .filter(Boolean);
      return selectedLabels.join(", ");
    }
    if (field.type === "date-range" && typeof val === "object") {
      return `${val.from || "Awal"} s/d ${val.to || "Akhir"}`;
    }
    if (field.type === "number-range" && typeof val === "object") {
      return `Rp ${val.min || 0} - Rp ${val.max || "Max"}`;
    }
    return String(val);
  };

  // Render individual field inputs
  const renderFieldInput = (field: FilterFieldConfig) => {
    const val = localValues[field.id];

    switch (field.type) {
      case "select":
        return (
          <SelectApp
            id={`filter-field-${field.id}`}
            value={val || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder || `-- Pilih ${field.label} --`}
            options={field.options?.map((opt) => ({
              value: opt.value,
              label: opt.badge ? `${opt.label} (${opt.badge})` : opt.label,
            }))}
          />
        );

      case "multi-select": {
        const currentArr: string[] = Array.isArray(val) ? val : [];
        return (
          <div className="flex flex-wrap gap-1.5 p-2 bg-vibrant-grey-bg/50 border border-hairline-soft rounded-xl max-h-36 overflow-y-auto">
            {field.options?.map((opt) => {
              const isSelected = currentArr.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    const next = isSelected
                      ? currentArr.filter((item) => item !== opt.value)
                      : [...currentArr, opt.value];
                    handleFieldChange(field.id, next);
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1",
                    isSelected
                      ? "bg-vibrant-purple/15 text-vibrant-purple-dark border-vibrant-purple/40 font-bold shadow-xs"
                      : "bg-surface text-ink-secondary border-hairline-soft hover:bg-vibrant-purple/5"
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-vibrant-purple-dark shrink-0" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        );
      }

      case "date-range":
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <InputApp
                id={`filter-date-from-${field.id}`}
                type="date"
                value={val?.from || ""}
                onChange={(e) =>
                  handleFieldChange(field.id, { ...val, from: e.target.value })
                }
                className="text-xs h-9"
              />
            </div>
            <div className="relative">
              <InputApp
                id={`filter-date-to-${field.id}`}
                type="date"
                value={val?.to || ""}
                onChange={(e) =>
                  handleFieldChange(field.id, { ...val, to: e.target.value })
                }
                className="text-xs h-9"
              />
            </div>
          </div>
        );

      case "text":
      default:
        return (
          <InputApp
            id={`filter-text-${field.id}`}
            type="text"
            placeholder={field.placeholder || `Cari ${field.label}...`}
            value={val || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="text-xs h-9"
          />
        );
    }
  };

  // Filter form body
  const renderFilterBody = () => (
    <div className="space-y-4">
      {/* Quick Presets */}
      {quickPresets && quickPresets.length > 0 && (
        <div className="space-y-1.5 pb-2 border-b border-hairline-soft">
          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-vibrant-purple-dark" /> Preset Cepat
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset.values)}
                className="px-2.5 py-1 text-[11px] font-medium font-display rounded-full bg-vibrant-purple/10 text-vibrant-purple-dark border border-vibrant-purple/20 hover:bg-vibrant-purple/20 transition-all cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fields Grid */}
      <div
        className={cn(
          "grid gap-3.5",
          displayMode === "drawer" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        )}
      >
        {fields.map((field) => (
          <div
            key={field.id}
            className={cn(
              "space-y-1 text-left",
              field.colSpan === 2 && displayMode === "drawer" && "sm:col-span-2"
            )}
          >
            <label
              htmlFor={`filter-field-${field.id}`}
              className="text-xs font-bold font-display text-ink flex items-center justify-between"
            >
              <span>{field.label}</span>
              {localValues[field.id] && (
                <button
                  type="button"
                  onClick={() => handleFieldChange(field.id, field.type === "multi-select" ? [] : "")}
                  className="text-[10px] text-ink-muted hover:text-rose-500 underline font-normal"
                >
                  Clear
                </button>
              )}
            </label>
            {renderFieldInput(field)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div id={id} className={cn("inline-flex flex-col gap-2 w-full", className)}>
      {/* TRIGGER BAR */}
      <div className="flex items-center gap-2 flex-wrap max-w-full">
        {displayMode !== "inline" && (
          <div ref={triggerRef} className="relative inline-block max-w-full">
            {renderTrigger ? (
              renderTrigger({
                isOpen,
                activeCount,
                onClick: () => setIsOpen(!isOpen),
              })
            ) : (
              <ButtonApp
                id={`${id}-trigger-btn`}
                variant={activeCount > 0 ? "purpleDark" : (triggerVariant || "secondary")}
                theme={triggerTheme}
                size={triggerSize}
                rounded={triggerRounded}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "inline-flex items-center gap-2 font-display shadow-xs max-w-full",
                  triggerClassName
                )}
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-full">{triggerLabel}</span>
                {activeCount > 0 && (
                  <span className="w-5 h-5 text-[10px] font-bold font-mono bg-white text-vibrant-purple-dark rounded-full flex items-center justify-center shadow-xs shrink-0">
                    {activeCount}
                  </span>
                )}
              </ButtonApp>
            )}

            {/* POPOVER PANEL (Positioned directly below trigger button) */}
            {displayMode === "popover" && isOpen && (
              <>
                {/* Transparent click-away layer (No dark/blur overlay) */}
                <div
                  className="fixed inset-0 z-40 bg-transparent cursor-default"
                  onClick={handleCancel}
                />

                <div
                  style={{
                    minWidth: triggerWidth ? `${Math.max(triggerWidth, 280)}px` : "280px",
                  }}
                  className="absolute top-full mt-2 left-0 w-80 sm:w-96 max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto bg-surface text-ink border border-hairline-soft dark:border-vibrant-purple/50 rounded-2xl shadow-xl p-4 space-y-4 z-50 animate-in fade-in zoom-in-95 origin-top-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
                    <div>
                      <h4 className="text-sm font-bold font-display text-ink">{title}</h4>
                      <p className="text-[11px] text-ink-secondary">{description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="p-1 text-ink-muted hover:text-ink rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {renderFilterBody()}

                  <div className="flex items-center justify-between pt-3 border-t border-hairline-soft">
                    <ButtonApp
                      id={`${id}-popover-reset`}
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-xs text-ink-muted hover:text-rose-500 inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </ButtonApp>

                    <div className="flex items-center gap-2">
                      <ButtonApp
                        id={`${id}-popover-cancel`}
                        variant="secondary"
                        size="sm"
                        onClick={handleCancel}
                      >
                        Batal
                      </ButtonApp>
                      <ButtonApp
                        id={`${id}-popover-apply`}
                        variant={isChanged ? "purpleDark" : "secondary"}
                        size="sm"
                        disabled={!isChanged}
                        onClick={handleApply}
                        className={cn("shadow-md transition-all whitespace-nowrap shrink-0", isChanged && "ring-2 ring-vibrant-purple/40 font-bold")}
                      >
                        {isChanged ? "Simpan & Terapkan" : "Terapkan"}
                      </ButtonApp>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ACTIVE FILTER PILLS */}
        {showActivePills && activeCount > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.entries(values).map(([fieldId, val]) => {
              const field = fields.find((f) => f.id === fieldId);
              if (!field) return null;
              const displayVal = getDisplayValue(field, val);
              if (!displayVal) return null;

              return (
                <span
                  key={fieldId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-vibrant-purple/10 border border-vibrant-purple/30 text-vibrant-purple-dark animate-fade-in"
                >
                  <span className="font-bold">{field.label}:</span>
                  <span className="max-w-[120px] truncate">{displayVal}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSingleFilter(fieldId)}
                    className="hover:text-rose-500 p-0.5 rounded-full transition-colors cursor-pointer"
                    aria-label={`Hapus filter ${field.label}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}

            <button
              type="button"
              onClick={handleResetAllCommitted}
              className="text-xs text-ink-muted hover:text-rose-500 font-bold font-display underline px-1 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Semua</span>
            </button>
          </div>
        )}
      </div>

      {/* MODAL 2: DRAWER / SLIDE-OVER MODE using DrawerApp */}
      {displayMode === "drawer" && (
        <DrawerApp
          id={`${id}-drawer`}
          isOpen={isOpen}
          onClose={handleCancel}
          title={title}
          description={description}
          icon={<Filter className="w-5 h-5 text-vibrant-purple-dark" />}
          position="right"
          size="md"
          rounded="3xl"
          footer={
            <div className="flex items-center justify-between gap-3">
              <ButtonApp
                id={`${id}-drawer-reset`}
                variant="ghost"
                size="md"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-rose-500 whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" /> Reset Semua
              </ButtonApp>

              <div className="flex items-center gap-2">
                <ButtonApp
                  id={`${id}-drawer-cancel`}
                  variant="secondary"
                  size="md"
                  onClick={handleCancel}
                  className="whitespace-nowrap"
                >
                  Batal
                </ButtonApp>
                <ButtonApp
                  id={`${id}-drawer-apply`}
                  variant={isChanged ? "purpleDark" : "secondary"}
                  size="md"
                  disabled={!isChanged}
                  onClick={handleApply}
                  className={cn("shadow-md transition-all whitespace-nowrap shrink-0", isChanged && "ring-2 ring-vibrant-purple/50 font-bold")}
                >
                  {isChanged ? "Simpan & Terapkan" : "Terapkan Filter"}
                </ButtonApp>
              </div>
            </div>
          }
        >
          {renderFilterBody()}
        </DrawerApp>
      )}

      {/* MODAL 3: INLINE MODE */}
      {displayMode === "inline" && (
        <div className="p-4 bg-surface border border-hairline-soft dark:border-vibrant-purple/40 rounded-2xl space-y-4">
          {renderFilterBody()}
        </div>
      )}
    </div>
  );
}
