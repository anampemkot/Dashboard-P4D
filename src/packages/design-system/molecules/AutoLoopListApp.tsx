import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AutoLoopListAppProps {
  id: string;
  /** Viewport height in px — content taller than this loops; content that fits renders once, statically, with no scrollbar. */
  maxHeight: number;
  /** Seconds for one full loop. Omit to auto-scale from measured content height (~28px/s). */
  duration?: number;
  pauseOnHover?: boolean;
  /**
   * Render prop instead of plain children: called twice when the content
   * overflows (once for the real, focusable copy; once — with `suffix`
   * `"-clone"` — for the seamless-loop duplicate). Callers with items that
   * carry an `id` MUST fold `suffix` into that id, or the duplicate copy
   * collides with the original's DOM id.
   */
  children: (suffix: string) => React.ReactNode;
  className?: string;
}

// How long user wheel/touch input keeps auto-scroll paused before it resumes.
const RESUME_DELAY_MS = 2500;

/**
 * Vertical auto-scrolling list viewport — the "card body has more rows than
 * fit" primitive. Measures actual content height against `maxHeight` first
 * (ResizeObserver): content that fits scrolls nowhere (no scrollbar, no
 * motion, nothing to wrap around); content that overflows loops
 * continuously instead.
 *
 * Driven by incrementing the container's real `scrollTop` on every animation
 * frame (not a CSS `transform` animation) specifically so the container
 * stays a normal native scroll region — wheel and touch-drag work as the
 * user expects, at any time, without a mode switch. The scrollbar itself is
 * hidden (`.scrollbar-none`) but the region stays genuinely scrollable
 * underneath. Wheel/touch input pauses the auto-scroll; it resumes on its
 * own after a short idle period (or immediately on mouse-leave, if
 * `pauseOnHover`).
 *
 * The "real" copy's wrapper (`contentRef`) renders with the *same* DOM shape
 * whether or not the list is currently overflowing — only the clone
 * (needed for the seamless wraparound) is conditionally rendered. Earlier
 * this branched into two differently-shaped JSX trees depending on
 * `overflowing`, which remounted `contentRef` onto a new node the moment
 * overflow was detected; the ResizeObserver effect (deps: `[maxHeight]`
 * only) never re-attached to that new node, so `contentHeight` stayed
 * frozen at a stale measurement and the wraparound math silently drifted —
 * visually, the list would auto-scroll to its last item and then just stop,
 * pinned at the browser's native scroll-end clamp instead of looping back.
 */
export function AutoLoopListApp({ id, maxHeight, duration, pauseOnHover = true, children, className }: AutoLoopListAppProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [overflowing, setOverflowing] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const reducedMotion = useReducedMotion();

  const hoverPausedRef = React.useRef(false);
  const interactionPausedRef = React.useRef(false);
  const resumeTimerRef = React.useRef<number | undefined>(undefined);

  React.useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.scrollHeight;
      setContentHeight(h);
      setOverflowing(h > maxHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxHeight]);

  const pxPerSecond = React.useMemo(() => {
    if (!contentHeight) return 28;
    return duration ? contentHeight / duration : 28;
  }, [contentHeight, duration]);

  React.useEffect(() => {
    if (!overflowing || reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!hoverPausedRef.current && !interactionPausedRef.current) {
        container.scrollTop += pxPerSecond * dt;
      }
      // Always re-check wraparound, even while paused — a user can wheel-
      // scroll past the boundary too, and it should still loop seamlessly.
      if (container.scrollTop >= contentHeight) {
        container.scrollTop -= contentHeight;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [overflowing, reducedMotion, pxPerSecond, contentHeight]);

  const markUserInteraction = () => {
    interactionPausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      interactionPausedRef.current = false;
    }, RESUME_DELAY_MS);
  };

  React.useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  return (
    <div
      ref={containerRef}
      id={id}
      data-ui-id={id}
      className={cn("scrollbar-none overflow-y-auto overscroll-contain", className)}
      style={{ maxHeight }}
      onMouseEnter={() => { if (pauseOnHover) hoverPausedRef.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) hoverPausedRef.current = false; }}
      onWheel={markUserInteraction}
      onTouchStart={markUserInteraction}
      onPointerDown={markUserInteraction}
    >
      <div className="flex flex-col">
        <div ref={contentRef} className="flex shrink-0 flex-col">
          {children("")}
        </div>
        {overflowing && (
          <div className="flex shrink-0 flex-col" aria-hidden="true">
            {children("-clone")}
          </div>
        )}
      </div>
    </div>
  );
}
