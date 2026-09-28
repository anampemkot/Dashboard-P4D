import * as React from "react";
import { MapPin, Navigation, Search, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeApp } from "../atoms/BadgeApp";
import { InputApp } from "../atoms/InputApp";
import { TextApp } from "../atoms/TextApp";
import { MapsApp, MapMarker } from "./MapsApp";

export type LocationPickerMode = "static" | "interactive";
export interface LocationPickerAppProps extends React.HTMLAttributes<HTMLDivElement> { id: string; mode?: LocationPickerMode; value?: [number, number] | null; defaultLocation?: [number, number] | null; onValueChange?: (value: [number, number]) => void; markers?: MapMarker[]; height?: number; label?: string; }

export function LocationPickerApp({ id, mode = "interactive", value, defaultLocation = null, onValueChange, markers = [], height = 360, label = "Lokasi terpilih", className, ...props }: LocationPickerAppProps) {
  const [internalValue, setInternalValue] = React.useState<[number, number] | null>(defaultLocation);
  const [query, setQuery] = React.useState("");
  const currentValue = value === undefined ? internalValue : value;
  const setValue = (next: [number, number]) => { if (value === undefined) setInternalValue(next); onValueChange?.(next); };
  const filtered = markers.filter((marker) => !query || marker.title.toLowerCase().includes(query.toLowerCase()) || marker.address?.toLowerCase().includes(query.toLowerCase()));

  if (mode === "static") return <div id={id} data-ui-id={id} className={cn("overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface", className)} {...props}><div className="relative overflow-hidden bg-[radial-gradient(circle_at_center,var(--color-vibrant-purple)_1px,transparent_1px)] [background-size:20px_20px]" style={{ height }}><div className="absolute inset-0 bg-gradient-to-br from-vibrant-blue/10 via-transparent to-vibrant-purple/15" /><div className="absolute inset-x-0 top-1/2 h-px bg-hairline-soft" /><div className="absolute inset-y-0 left-1/2 w-px bg-hairline-soft" />{markers.slice(0, 5).map((marker, index) => <div key={marker.id} title={marker.title} className="absolute z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-vibrant-purple-dark text-white shadow-card" style={{ left: `${24 + (index * 23) % 62}%`, top: `${25 + (index * 19) % 48}%` }}><MapPin className="h-3.5 w-3.5" /></div>)}<div className="absolute inset-0 grid place-items-center"><div className="relative flex flex-col items-center"><MapPin className="h-10 w-10 fill-vibrant-purple text-vibrant-purple-dark" /><TextApp id={`${id}-static-title`} variant="caption" weight="bold" className="mt-2">Static Map Preview</TextApp><span className="mt-1 font-mono text-[11px] text-ink-muted">{(currentValue || [-7.7956, 110.3695]).map((item) => item.toFixed(5)).join(", ")}</span></div></div><div className="absolute bottom-3 right-3 flex gap-1 rounded-[var(--radius-md)] border border-hairline bg-surface/90 p-1 text-ink-muted shadow-card"><ZoomIn className="h-4 w-4" /><ZoomOut className="h-4 w-4" /></div></div></div>;

  return <div id={id} data-ui-id={id} className={cn("space-y-3", className)} {...props}>
    <div className="relative"><MapsApp id={`${id}-map`} center={currentValue || [-7.7956, 110.3695]} markers={filtered} height={height} showSearch={false} showCategoryFilter={false} showDetailCard={false} showControls enableClickAdd onMapClick={setValue} onCurrentLocation={setValue} /><div className="absolute left-3 right-16 top-3 z-20 max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-ink-muted" /><InputApp id={`${id}-search`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari alamat atau lokasi..." className="bg-surface/95 pl-9 shadow-card backdrop-blur-md" /></div></div>
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] border border-hairline-soft bg-surface-soft p-3"><div className="flex items-center gap-2"><Navigation className="h-4 w-4 text-vibrant-purple-dark" /><div><TextApp id={`${id}-label`} variant="micro" weight="bold">{label}</TextApp><span className="block font-mono text-[11px] text-ink-muted">{currentValue ? `${currentValue[0].toFixed(6)}, ${currentValue[1].toFixed(6)}` : "Klik peta untuk menaruh pin"}</span></div></div><BadgeApp id={`${id}-mode`} variant="solidPurple" size="sm">Pin Drop</BadgeApp></div>
  </div>;
}
