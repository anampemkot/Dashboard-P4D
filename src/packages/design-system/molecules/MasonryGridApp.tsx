import * as React from "react";
import { cn } from "@/lib/utils";
import { SkeletonApp } from "../atoms/SkeletonApp";
import { TextApp } from "../atoms/TextApp";
import { CardApp } from "../atoms/CardApp";

export interface MasonryItemData {
  id: string;
  title: string;
  category?: string;
  heightClass?: string; // e.g. "h-32", "h-48", "h-64"
  content?: React.ReactNode;
}

export interface MasonryGridAppProps {
  id: string;
  items: MasonryItemData[];
  columns?: 2 | 3 | 4;
  gutter?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
}

export function MasonryGridApp({
  id,
  items,
  columns = 3,
  gutter = "md",
  loading = false,
  className,
}: MasonryGridAppProps) {
  const gutterClasses = {
    sm: "gap-2 space-y-2",
    md: "gap-4 space-y-4",
    lg: "gap-6 space-y-6",
  };

  const colClasses = {
    2: "columns-1 sm:columns-2",
    3: "columns-1 sm:columns-2 md:columns-3",
    4: "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
  };

  if (loading) {
    return (
      <div
        id={id}
        data-ui-id={id}
        className={cn("w-full font-sans", colClasses[columns], gutterClasses[gutter], className)}
      >
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={`skel-${idx}`} className="break-inside-avoid">
            <SkeletonApp
              id={`skel-item-${idx}`}
              variant="rect"
              className={cn("w-full rounded-2xl mb-4", idx % 2 === 0 ? "h-44" : "h-28")}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn("w-full font-sans", colClasses[columns], gutterClasses[gutter], className)}
    >
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid mb-4 last:mb-0">
          <CardApp
            id={`masonry-card-${item.id}`}
            variant="neutral"
            size="sm"
            rounded="card"
            className="p-4 space-y-2 hover:border-vibrant-purple/40 transition-all shadow-2xs hover:shadow-xs"
          >
            {item.category && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-vibrant-purple-dark bg-vibrant-purple/10 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            )}
            <TextApp id={`m-title-${item.id}`} variant="body" weight="bold" className="text-ink text-sm block">
              {item.title}
            </TextApp>
            {item.content}
          </CardApp>
        </div>
      ))}
    </div>
  );
}
