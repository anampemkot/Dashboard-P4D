import * as React from "react";
import { ArrowDown, Check, RefreshCw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { ProgressIndicatorApp } from "../molecules/ProgressIndicatorApp";
import { TextApp } from "../atoms/TextApp";

export type PullToRefreshState = "idle" | "pulling" | "ready" | "refreshing" | "success" | "error";

export interface PullToRefreshAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  maxPull?: number;
  disabled?: boolean;
  pullingLabel?: string;
  releaseLabel?: string;
  refreshingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  showDesktopTrigger?: boolean;
  contentClassName?: string;
  onStateChange?: (state: PullToRefreshState) => void;
}

export function PullToRefreshApp({
  id,
  onRefresh,
  threshold = 72,
  maxPull = 120,
  disabled = false,
  pullingLabel = "Tarik untuk memperbarui",
  releaseLabel = "Lepaskan untuk memperbarui",
  refreshingLabel = "Memperbarui data...",
  successLabel = "Data berhasil diperbarui",
  errorLabel = "Gagal memperbarui data",
  showDesktopTrigger = true,
  contentClassName,
  onStateChange,
  children,
  className,
  ...props
}: PullToRefreshAppProps) {
  const [state, setState] = React.useState<PullToRefreshState>("idle");
  const [distance, setDistance] = React.useState(0);
  const startYRef = React.useRef(0);
  const draggingRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateState = (next: PullToRefreshState) => {
    setState(next);
    onStateChange?.(next);
  };

  const refresh = async () => {
    if (disabled || state === "refreshing") return;
    updateState("refreshing");
    setDistance(52);
    try {
      await onRefresh();
      updateState("success");
    } catch {
      updateState("error");
    } finally {
      window.setTimeout(() => {
        setDistance(0);
        updateState("idle");
      }, 900);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || state === "refreshing" || (containerRef.current?.scrollTop ?? 0) > 0) return;
    startYRef.current = event.clientY;
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientY - startYRef.current;
    if (delta <= 0) { setDistance(0); return; }
    event.preventDefault();
    const resisted = Math.min(maxPull, delta * 0.55);
    setDistance(resisted);
    updateState(resisted >= threshold ? "ready" : "pulling");
  };

  const finishPull = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (distance >= threshold) void refresh();
    else { setDistance(0); updateState("idle"); }
  };

  const progress = Math.min(100, (distance / threshold) * 100);
  const message = state === "ready" ? releaseLabel : state === "refreshing" ? refreshingLabel : state === "success" ? successLabel : state === "error" ? errorLabel : pullingLabel;

  return (
    <div id={id} data-ui-id={id} className={cn("space-y-2", className)} {...props}>
      {showDesktopTrigger && (
        <div className="flex items-center justify-between gap-3">
          <TextApp id={`${id}-instruction`} variant="caption" className="text-ink-muted">Tarik panel ke bawah atau gunakan tombol refresh.</TextApp>
          <ButtonApp id={`${id}-refresh-button`} variant="secondary" size="sm" isLoading={state === "refreshing"} leftIcon={<RefreshCw className="h-3.5 w-3.5" />} onClick={() => void refresh()} disabled={disabled}>
            Refresh
          </ButtonApp>
        </div>
      )}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPull}
        onPointerCancel={finishPull}
        className="relative max-h-80 overflow-y-auto overscroll-contain rounded-[var(--radius-lg)] border border-hairline bg-surface touch-pan-x"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-14 items-center justify-center gap-2 text-xs font-semibold text-ink-secondary transition-opacity"
          style={{ opacity: distance > 4 || state === "refreshing" || state === "success" || state === "error" ? 1 : 0 }}
          aria-live="polite"
        >
          {state === "refreshing" ? <ProgressIndicatorApp id={`${id}-loading`} type="circular" mode="indeterminate" size="sm" /> : state === "success" ? <Check className="h-4 w-4 text-success" /> : state === "error" ? <TriangleAlert className="h-4 w-4 text-error" /> : <ArrowDown className={cn("h-4 w-4 text-vibrant-purple-dark transition-transform", state === "ready" && "rotate-180")} />}
          <span>{message}</span>
          {(state === "pulling" || state === "ready") && <span className="font-mono text-[10px] text-ink-muted">{Math.round(progress)}%</span>}
        </div>
        <div className={cn("transition-transform duration-200 ease-out", contentClassName)} style={{ transform: `translateY(${distance}px)` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
