import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

export type SplitterOrientation = "horizontal" | "vertical";

export interface SplitterAppProps {
  id: string;
  orientation?: SplitterOrientation;
  pane1Content: React.ReactNode;
  pane2Content: React.ReactNode;
  initialSplit?: number; // percentage (0-100)
  minSize?: number; // percentage min
  maxSize?: number; // percentage max
  className?: string;
}

export function SplitterApp({
  id,
  orientation = "horizontal",
  pane1Content,
  pane2Content,
  initialSplit = 50,
  minSize = 20,
  maxSize = 80,
  className,
}: SplitterAppProps) {
  const [split, setSplit] = React.useState(initialSplit);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  React.useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      let percentage = 50;
      if (orientation === "horizontal") {
        percentage = ((clientX - rect.left) / rect.width) * 100;
      } else {
        percentage = ((clientY - rect.top) / rect.height) * 100;
      }

      const clampedPercentage = Math.min(Math.max(percentage, minSize), maxSize);
      setSplit(clampedPercentage);
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);

    const onEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, orientation, minSize, maxSize]);

  const isHoriz = orientation === "horizontal";

  return (
    <div
      id={id}
      data-ui-id={id}
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl border border-hairline-soft bg-surface font-sans select-none flex",
        isHoriz ? "flex-row" : "flex-col",
        className
      )}
    >
      {/* Pane 1 */}
      <div
        className="overflow-auto no-scrollbar transition-none"
        style={isHoriz ? { width: `${split}%` } : { height: `${split}%` }}
      >
        {pane1Content}
      </div>

      {/* Drag Handle Divider */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={cn(
          "shrink-0 z-10 flex items-center justify-center transition-colors cursor-pointer group",
          isHoriz
            ? "w-3 cursor-col-resize hover:bg-vibrant-purple/20 border-x border-hairline-soft"
            : "h-3 cursor-row-resize hover:bg-vibrant-purple/20 border-y border-hairline-soft",
          isDragging && "bg-vibrant-purple-dark/30 border-vibrant-purple-dark"
        )}
      >
        <div
          className={cn(
            "rounded-full transition-all flex items-center justify-center text-ink-muted group-hover:text-vibrant-purple-dark",
            isDragging ? "bg-vibrant-purple-dark text-white shadow-sm scale-110" : "bg-transparent"
          )}
        >
          {isHoriz ? (
            <GripVertical className="w-3.5 h-3.5" />
          ) : (
            <GripHorizontal className="w-3.5 h-3.5" />
          )}
        </div>
      </div>

      {/* Pane 2 */}
      <div
        className="overflow-auto no-scrollbar flex-1 transition-none"
        style={isHoriz ? { width: `${100 - split}%` } : { height: `${100 - split}%` }}
      >
        {pane2Content}
      </div>
    </div>
  );
}
