import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";

export interface LightboxImage { src: string; alt: string; caption?: string; thumbnail?: string; }
export interface LightboxAppProps { id: string; isOpen: boolean; onClose: () => void; images: LightboxImage[]; initialIndex?: number; showThumbnails?: boolean; }

export function LightboxApp({ id, isOpen, onClose, images, initialIndex = 0, showThumbnails = true }: LightboxAppProps) {
  const [index, setIndex] = React.useState(initialIndex);
  const [zoom, setZoom] = React.useState(1);
  const [mounted, setMounted] = React.useState(false);
  const image = images[index];
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => { if (isOpen) { previousFocusRef.current = document.activeElement as HTMLElement | null; setIndex(Math.min(initialIndex, Math.max(0, images.length - 1))); setZoom(1); document.body.style.overflow = "hidden"; requestAnimationFrame(() => dialogRef.current?.focus()); } return () => { document.body.style.overflow = ""; previousFocusRef.current?.focus(); }; }, [isOpen, initialIndex, images.length]);
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + images.length) % images.length); if (event.key === "ArrowRight") setIndex((current) => (current + 1) % images.length); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, images.length, onClose]);

  if (!mounted || !isOpen || !image) return null;
  const select = (next: number) => { setIndex((next + images.length) % images.length); setZoom(1); };
  return createPortal(
    <div ref={dialogRef} tabIndex={-1} id={id} data-ui-id={id} role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[80] flex flex-col bg-overlay-scrim backdrop-blur-md outline-none">
      <div className="flex items-center justify-between gap-3 p-3">
        <div className="min-w-0 rounded-[var(--radius-md)] border border-hairline bg-surface/95 px-2.5 py-1.5 text-ink shadow-card backdrop-blur-md">
          <span className="block truncate text-xs font-semibold">{index + 1} / {images.length}{image.caption ? ` · ${image.caption}` : ""}</span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 rounded-[var(--radius-md)] border border-hairline bg-surface/95 p-1 text-ink shadow-card backdrop-blur-md">
          <ButtonApp id={`${id}-zoom-out`} variant="icon" size="iconSm" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} disabled={zoom <= 1} className="h-7 min-h-7 w-7 min-w-7 border-0 text-ink hover:bg-action-hover [&_svg]:h-3.5 [&_svg]:w-3.5" aria-label="Zoom out"><Minus /></ButtonApp>
          <span id={`${id}-zoom-value`} className="min-w-11 px-1 text-center text-[11px] font-semibold font-mono tabular-nums text-ink" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <ButtonApp id={`${id}-zoom-in`} variant="icon" size="iconSm" onClick={() => setZoom((value) => Math.min(3, value + 0.25))} disabled={zoom >= 3} className="h-7 min-h-7 w-7 min-w-7 border-0 text-ink hover:bg-action-hover [&_svg]:h-3.5 [&_svg]:w-3.5" aria-label="Zoom in"><Plus /></ButtonApp>
          <span className="mx-0.5 h-4 w-px bg-hairline" aria-hidden="true" />
          <ButtonApp id={`${id}-close`} variant="icon" size="iconSm" onClick={onClose} className="h-7 min-h-7 w-7 min-w-7 border-0 text-error hover:bg-error/10 [&_svg]:h-3.5 [&_svg]:w-3.5" aria-label="Close image viewer"><X /></ButtonApp>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-4">
        {images.length > 1 && <ButtonApp id={`${id}-previous`} variant="icon" size="iconMd" onClick={() => select(index - 1)} className="fixed left-3 z-10 h-9 min-h-9 w-9 min-w-9 border border-hairline bg-surface text-vibrant-purple-dark shadow-card hover:bg-action-hover [&_svg]:h-4 [&_svg]:w-4" aria-label="Previous image"><ChevronLeft /></ButtonApp>}
        <img src={image.src} alt={image.alt} className="max-h-full max-w-full rounded-[var(--radius-lg)] object-contain shadow-card transition-transform duration-200" style={{ transform: `scale(${zoom})` }} />
        {images.length > 1 && <ButtonApp id={`${id}-next`} variant="icon" size="iconMd" onClick={() => select(index + 1)} className="fixed right-3 z-10 h-9 min-h-9 w-9 min-w-9 border border-hairline bg-surface text-vibrant-purple-dark shadow-card hover:bg-action-hover [&_svg]:h-4 [&_svg]:w-4" aria-label="Next image"><ChevronRight /></ButtonApp>}
      </div>
      {showThumbnails && images.length > 1 && <div className="mx-auto mb-3 flex max-w-[calc(100vw-24px)] justify-center gap-2 overflow-x-auto rounded-[var(--radius-lg)] border border-hairline bg-surface/95 p-2 shadow-card backdrop-blur-md">{images.map((item, itemIndex) => <button key={item.src} type="button" onClick={() => select(itemIndex)} className={cn("h-14 w-20 shrink-0 overflow-hidden rounded-[var(--radius-md)] border-2 bg-surface transition-opacity", itemIndex === index ? "border-vibrant-purple-dark opacity-100" : "border-hairline opacity-60 hover:opacity-100")}><img src={item.thumbnail || item.src} alt={item.alt} className="h-full w-full object-cover" /></button>)}</div>}
    </div>, document.body
  );
}
