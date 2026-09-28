import * as React from "react";

export type AnchoredPanelPlacementY = "top" | "bottom";
export type AnchoredPanelPlacementX = "left" | "right";

export interface AnchoredPanelPosition {
  top: number;
  left: number;
  placementY: AnchoredPanelPlacementY;
  placementX: AnchoredPanelPlacementX;
}

export interface UseAnchoredPanelOptions {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  panelRef: React.RefObject<HTMLElement | null>;
  /** Gap between anchor and panel, in px. */
  gap?: number;
  /** Minimum distance kept from the viewport edge, in px. */
  viewportPadding?: number;
  /** Used for the first frame's placement decision, before panelRef has a real measured size. */
  estimatedWidth?: number;
  estimatedHeight?: number;
  /** Horizontal alignment of the panel's left edge relative to the anchor. */
  align?: "start" | "center" | "end";
}

/**
 * Positions a floating panel (calendar, popover, menu) relative to an anchor
 * element via `position: fixed` computed from `getBoundingClientRect()` —
 * meant to be paired with `createPortal(..., document.body)` so the panel
 * escapes any clipping ancestor (`overflow-hidden`/`overflow-y-auto` on a
 * DrawerApp panel, DialogApp content, or AdvanceFilterApp popover), which a
 * `position: absolute` panel nested inside those ancestors cannot.
 *
 * `position: fixed` was previously assumed unsafe here because DrawerApp and
 * DialogApp are `motion.div`s that write an inline `transform` during their
 * open/close animation — a `fixed` element inside a transformed ancestor is
 * repositioned relative to that ancestor, not the viewport. Portaling to
 * `document.body` (outside the animating ancestor entirely) sidesteps that;
 * this hook only computes coordinates; the portal is the caller's job.
 *
 * Recomputes on scroll/resize (capture phase, so scrolling inside a nested
 * container also triggers it) so the panel tracks its anchor instead of
 * drifting or needing to close.
 */
export function useAnchoredPanel({
  open,
  anchorRef,
  panelRef,
  gap = 6,
  viewportPadding = 12,
  estimatedWidth = 280,
  estimatedHeight = 320,
  align = "start",
}: UseAnchoredPanelOptions): AnchoredPanelPosition | null {
  const [position, setPosition] = React.useState<AnchoredPanelPosition | null>(null);

  React.useLayoutEffect(() => {
    if (!open || !anchorRef.current) {
      setPosition(null);
      return;
    }

    const update = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const panelWidth = panelRef.current?.offsetWidth || estimatedWidth;
      const panelHeight = panelRef.current?.offsetHeight || estimatedHeight;

      const spaceBelow = vh - rect.bottom;
      const spaceAbove = rect.top;
      const placementY: AnchoredPanelPlacementY =
        spaceBelow < panelHeight + gap && spaceAbove > spaceBelow ? "top" : "bottom";
      const top = placementY === "top" ? rect.top - gap - panelHeight : rect.bottom + gap;

      const rawLeft =
        align === "end" ? rect.right - panelWidth : align === "center" ? rect.left + rect.width / 2 - panelWidth / 2 : rect.left;
      const placementX: AnchoredPanelPlacementX = rawLeft + panelWidth > vw - viewportPadding ? "right" : "left";

      const maxLeft = Math.max(viewportPadding, vw - panelWidth - viewportPadding);
      const maxTop = Math.max(viewportPadding, vh - panelHeight - viewportPadding);
      const left = Math.min(Math.max(rawLeft, viewportPadding), maxLeft);
      const clampedTop = Math.min(Math.max(top, viewportPadding), maxTop);

      setPosition({ top: clampedTop, left, placementY, placementX });
    };

    update();
    // Re-measure once the panel has actually mounted and has a real size —
    // the first `update()` call above only has `estimatedWidth/Height` to
    // go on since panelRef isn't attached to anything yet on open.
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, anchorRef, panelRef, gap, viewportPadding, estimatedWidth, estimatedHeight, align]);

  return position;
}
