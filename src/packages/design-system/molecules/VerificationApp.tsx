import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, RefreshCw, ShieldCheck, TriangleAlert, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextApp } from "../atoms/TextApp";

export type VerificationState = "idle" | "loading" | "success" | "error";
export type VerificationVariant = "checkbox" | "puzzle";

export interface VerificationAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  variant?: VerificationVariant;
  state?: VerificationState;
  onVerify: () => Promise<boolean> | boolean;
  onStateChange?: (state: VerificationState) => void;
  label?: string;
  helperText?: string;
  autoResetDelay?: number;
}

const stateText: Record<VerificationState, string> = {
  idle: "Klik kotak untuk memulai verifikasi",
  loading: "Memverifikasi identitas...",
  success: "Verifikasi berhasil",
  error: "Verifikasi gagal, coba kembali",
};

export function VerificationApp({
  id,
  variant = "checkbox",
  state,
  onVerify,
  onStateChange,
  label = "Saya bukan robot",
  helperText,
  autoResetDelay = 0,
  className,
  ...props
}: VerificationAppProps) {
  const [internalState, setInternalState] = React.useState<VerificationState>("idle");
  const currentState = state ?? internalState;
  const setState = (next: VerificationState) => {
    if (state === undefined) setInternalState(next);
    onStateChange?.(next);
  };

  React.useEffect(() => {
    if (!autoResetDelay || (currentState !== "success" && currentState !== "error")) return;
    const timer = window.setTimeout(() => setState("idle"), autoResetDelay);
    return () => window.clearTimeout(timer);
  }, [autoResetDelay, currentState]);

  const verify = async () => {
    if (currentState === "loading" || currentState === "success") return;
    setState("loading");
    try {
      const valid = await onVerify();
      setState(valid ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  const reset = (event: React.MouseEvent) => {
    event.stopPropagation();
    setState("idle");
  };

  if (variant === "puzzle") {
    return (
      <PuzzleSliderVerification
        id={id}
        currentState={currentState}
        verify={verify}
        reset={reset}
        label={label}
        helperText={helperText}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border bg-surface p-4 transition-colors duration-200",
        currentState === "success" ? "border-success/40 bg-success/10" : currentState === "error" ? "border-error/40 bg-error/10" : "border-hairline",
        className
      )}
      {...props}
    >
      {currentState === "loading" && (
        <motion.span
          aria-hidden="true"
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-vibrant-purple/10 to-transparent motion-reduce:hidden"
        />
      )}
      <button
        type="button"
        onClick={() => void verify()}
        disabled={currentState === "loading" || currentState === "success"}
        className="relative z-10 flex w-full items-center gap-3 text-left disabled:cursor-default"
      >
        <motion.span
          layout
          animate={{
            scale: currentState === "success" ? [1, 1.18, 1] : 1,
            backgroundColor: currentState === "success" ? "var(--color-text-success)" : "var(--color-bg-surface)",
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border",
            currentState === "success" ? "border-success text-white" : currentState === "error" ? "border-error text-error" : "border-hairline-hard text-vibrant-purple-dark"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {currentState === "loading" ? (
              <motion.span key="loading" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="h-4 w-4 animate-spin rounded-full border-2 border-vibrant-purple/25 border-t-vibrant-purple-dark motion-reduce:animate-pulse" />
            ) : currentState === "success" ? (
              <motion.span key="success" initial={{ opacity: 0, scale: 0.4, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0 }}><Check className="h-4 w-4" /></motion.span>
            ) : currentState === "error" ? (
              <motion.span key="error" initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: [0, -2, 2, 0] }} exit={{ opacity: 0 }}><TriangleAlert className="h-4 w-4" /></motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-2.5 w-2.5 rounded-[2px] border border-hairline-hard" />
            )}
          </AnimatePresence>
        </motion.span>

        <span className="min-w-0 flex-1">
          <TextApp id={`${id}-label`} variant="caption" weight="bold" className="text-ink">{label}</TextApp>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={currentState} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} className={cn("mt-0.5 block text-[10px]", currentState === "success" ? "text-success" : currentState === "error" ? "text-error" : "text-ink-muted")}>
              {helperText || stateText[currentState]}
            </motion.span>
          </AnimatePresence>
        </span>

        {currentState === "error" ? (
          <ButtonApp id={`${id}-retry`} variant="icon" size="iconSm" onClick={reset} aria-label="Ulangi verifikasi" className="h-7 min-h-7 w-7 min-w-7 border-0 text-error hover:bg-error/10"><RefreshCw className="h-3.5 w-3.5" /></ButtonApp>
        ) : (
          <motion.span animate={currentState === "loading" ? { opacity: [0.45, 1, 0.45] } : { opacity: 1 }} transition={{ duration: 1.2, repeat: currentState === "loading" ? Infinity : 0 }}><ShieldCheck className={cn("h-6 w-6", currentState === "success" ? "text-success" : "text-vibrant-purple-dark")} /></motion.span>
        )}
      </button>
    </div>
  );
}

interface PuzzleSliderVerificationProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  currentState: VerificationState;
  verify: () => Promise<void> | void;
  reset: (event: React.MouseEvent) => void;
  label?: string;
  helperText?: string;
}

const puzzleStateText: Record<VerificationState, string> = {
  idle: "Geser puzzle ke kanan untuk verifikasi",
  loading: "Memeriksa...",
  success: "Verifikasi berhasil",
  error: "Gagal, geser ulang untuk mencoba",
};

function PuzzleSliderVerification({
  id,
  currentState,
  verify,
  reset,
  label = "Verifikasi Puzzle",
  helperText,
  className,
  ...props
}: PuzzleSliderVerificationProps) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [dragPercent, setDragPercent] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const draggingRef = React.useRef(false);

  const isLocked = currentState === "loading" || currentState === "success";
  const displayPercent = currentState === "success" ? 100 : currentState === "error" ? 0 : dragPercent;

  const updateFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setDragPercent(Math.min(100, Math.max(0, raw)));
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (isLocked) return;
    draggingRef.current = true;
    setIsDragging(true);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const finishDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    setDragPercent((current) => {
      if (current >= 92) {
        void verify();
        return 100;
      }
      return 0;
    });
  };

  const handleReset = (event: React.MouseEvent) => {
    setDragPercent(0);
    reset(event);
  };

  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border bg-surface p-4 transition-colors duration-200",
        currentState === "success" ? "border-success/40 bg-success/10" : currentState === "error" ? "border-error/40 bg-error/10" : "border-hairline",
        className
      )}
      {...props}
    >
      <div className="mb-2 flex items-center justify-between">
        <TextApp id={`${id}-label`} variant="caption" weight="bold" className="text-ink">{label}</TextApp>
        {currentState === "error" && (
          <ButtonApp id={`${id}-retry`} variant="icon" size="iconSm" onClick={handleReset} aria-label="Ulangi verifikasi" className="h-7 min-h-7 w-7 min-w-7 border-0 text-error hover:bg-error/10">
            <RefreshCw className="h-3.5 w-3.5" />
          </ButtonApp>
        )}
      </div>

      <div
        ref={trackRef}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerLeave={finishDrag}
        className={cn(
          "relative h-10 w-full touch-none select-none overflow-hidden rounded-[var(--radius-md)] border",
          currentState === "success" ? "border-success/40 bg-success/10" : currentState === "error" ? "border-error/40 bg-error/5" : "border-hairline-hard bg-surface-soft"
        )}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-[var(--radius-md)] transition-colors",
            currentState === "success" ? "bg-success/25" : currentState === "error" ? "bg-error/20" : "bg-vibrant-purple/15"
          )}
          style={{ width: `${displayPercent}%`, transition: isDragging ? "none" : "width 200ms ease" }}
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] font-medium text-ink-muted">
          {helperText || puzzleStateText[currentState]}
        </span>
        <div
          onPointerDown={handlePointerDown}
          className={cn(
            "absolute top-0.5 flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border shadow-2xs",
            isLocked ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            currentState === "success" ? "border-success bg-success text-white" : currentState === "error" ? "border-error bg-error text-white" : "border-hairline-hard bg-surface text-vibrant-purple-dark"
          )}
          style={{ left: `calc(${displayPercent}% - ${displayPercent / 100 * 2.25}rem)`, transition: isDragging ? "none" : "left 200ms ease" }}
        >
          {currentState === "loading" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-vibrant-purple/25 border-t-vibrant-purple-dark" />
          ) : currentState === "success" ? (
            <Check className="h-4 w-4" />
          ) : currentState === "error" ? (
            <TriangleAlert className="h-4 w-4" />
          ) : (
            <Puzzle className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
}

export const CaptchaApp = VerificationApp;
export type CaptchaAppProps = VerificationAppProps;
