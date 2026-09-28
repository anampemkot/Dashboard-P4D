import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { DropdownApp } from "./DropdownApp";

export type PaginationType = "standard" | "simple" | "loadMore";
export type PaginationVariant = "default" | "outline" | "vibrant" | "ghost";
export type PaginationSize = "sm" | "md" | "lg";
export type PaginationRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

const paginationButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none outline-none disabled:pointer-events-none disabled:opacity-40 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-surface text-ink border border-hairline hover:bg-surface-soft hover:border-hairline-soft data-[active=true]:bg-vibrant-purple-dark data-[active=true]:text-white data-[active=true]:border-vibrant-purple-dark data-[active=true]:font-bold data-[active=true]:shadow-xs",
        outline:
          "bg-transparent text-ink border border-hairline hover:bg-action-hover hover:border-vibrant-purple/40 data-[active=true]:bg-vibrant-purple/10 data-[active=true]:text-vibrant-purple-dark data-[active=true]:border-vibrant-purple-dark data-[active=true]:font-bold",
        vibrant:
          "bg-surface-soft text-ink hover:bg-vibrant-purple/20 hover:text-vibrant-purple-dark data-[active=true]:bg-vibrant-purple-dark data-[active=true]:text-white data-[active=true]:font-bold data-[active=true]:shadow-sm",
        ghost:
          "bg-transparent text-ink-secondary hover:text-ink hover:bg-action-hover data-[active=true]:bg-vibrant-purple/15 data-[active=true]:text-vibrant-purple-dark data-[active=true]:font-bold",
      },
      size: {
        sm: "h-8 min-w-[32px] px-2 text-xs",
        md: "h-9 min-w-[36px] px-2.5 text-sm",
        lg: "h-10 min-w-[40px] px-3 text-base",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "lg",
    },
  }
);

export interface PaginationAppProps extends VariantProps<typeof paginationButtonVariants> {
  id: string;
  type?: PaginationType;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  variant?: PaginationVariant;
  size?: PaginationSize;
  rounded?: PaginationRounded;
  showFirstLast?: boolean;
  showRowsPerPage?: boolean;
  showItemSummary?: boolean;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onLoadMore?: () => void;
  loadMoreText?: string;
  className?: string;
}

export function PaginationApp({
  id,
  type = "standard",
  currentPage = 1,
  totalPages = 10,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  variant = "default",
  size = "md",
  rounded = "lg",
  showFirstLast = true,
  showRowsPerPage = true,
  showItemSummary = true,
  loading = false,
  onPageChange,
  onPageSizeChange,
  onLoadMore,
  loadMoreText = "Muat Lebih Banyak",
  className,
}: PaginationAppProps) {
  // Helper for generating page number range with ellipsis indicator (...)
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const handlePageSelect = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    if (onPageChange) onPageChange(page);
  };

  // Item summary info math matching DataTableApp: "Menampilkan X s/d Y dari Z data"
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : undefined;

  const iconSizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-4.5 h-4.5" : "w-4 h-4";

  // LOAD MORE TYPE
  if (type === "loadMore") {
    return (
      <div
        id={id}
        data-ui-id={id}
        className={cn("w-full flex flex-col items-center justify-center space-y-3 font-sans", className)}
      >
        {totalItems && (
          <TextApp id={`pagi-lm-summary-${id}`} variant="caption" className="text-ink-muted text-xs">
            Menampilkan <span className="font-semibold text-ink">{Math.min(currentPage * pageSize, totalItems)}</span> dari{" "}
            <span className="font-semibold text-ink">{totalItems}</span> data
          </TextApp>
        )}

        <ButtonApp
          id={`pagi-lm-btn-${id}`}
          variant="secondary"
          size={size}
          rounded={rounded}
          disabled={loading || currentPage >= totalPages}
          onClick={onLoadMore || (() => onPageChange?.(currentPage + 1))}
          className="min-w-[180px] shadow-2xs"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-vibrant-purple-dark" /> Memuat...
            </span>
          ) : currentPage >= totalPages ? (
            "Semua Data Telah Dimuat"
          ) : (
            loadMoreText
          )}
        </ButtonApp>
      </div>
    );
  }

  // SIMPLE TYPE (Prev / Next only)
  if (type === "simple") {
    return (
      <div
        id={id}
        data-ui-id={id}
        className={cn(
          "w-full flex flex-wrap items-center justify-between gap-4 font-sans select-none text-xs text-ink-secondary",
          className
        )}
      >
        {showItemSummary && totalItems && (
          <span className="font-sans">
            Menampilkan <strong className="text-ink">{startItem}</strong> s/d{" "}
            <strong className="text-ink">{endItem}</strong> dari{" "}
            <strong className="text-ink">{totalItems}</strong> data
          </span>
        )}

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handlePageSelect(currentPage - 1)}
            className={cn(paginationButtonVariants({ variant, size, rounded }), "px-3 gap-1")}
          >
            <ChevronLeft className={iconSizeClass} />
            <span>Sebelumnya</span>
          </button>

          <span className="font-mono text-[11px] text-ink-muted px-2">
            Halaman <strong className="text-ink">{currentPage}</strong> dari{" "}
            <strong className="text-ink">{totalPages}</strong>
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageSelect(currentPage + 1)}
            className={cn(paginationButtonVariants({ variant, size, rounded }), "px-3 gap-1")}
          >
            <span>Berikutnya</span>
            <ChevronRight className={iconSizeClass} />
          </button>
        </div>
      </div>
    );
  }

  // STANDARD NUMBERED TYPE (Matching DataTableApp pattern with added CVA variants)
  const pageNumbers = getPageNumbers();

  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(
        "w-full min-w-0 flex flex-wrap items-center justify-between gap-4 font-sans select-none text-xs text-ink-secondary",
        className
      )}
    >
      {/* Left Side: Summary & DropdownApp Rows Per Page (DataTableApp Pattern) */}
      <div className="flex items-center gap-4 flex-wrap">
        {showItemSummary && totalItems && (
          <span className="font-sans">
            Menampilkan <strong className="text-ink">{startItem}</strong> s/d{" "}
            <strong className="text-ink">{endItem}</strong> dari{" "}
            <strong className="text-ink">{totalItems}</strong> data
          </span>
        )}

        {showRowsPerPage && pageSizeOptions && onPageSizeChange && (
          <div className="flex items-center gap-2 border-l border-hairline-soft pl-4 shrink-0">
            <span className="shrink-0 text-xs text-ink-muted">Tampilkan:</span>
            <div className="w-24">
              <DropdownApp
                id={`pagi-select-${id}`}
                value={String(pageSize)}
                onChange={(value) => onPageSizeChange(Number(value))}
                size="sm"
                options={pageSizeOptions.map((opt) => ({
                  value: String(opt),
                  label: String(opt),
                }))}
                className="font-semibold text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Page Navigation Controls & Page Numbers */}
      <div className="flex flex-wrap items-center gap-1.5 ml-auto">
        <span className="mr-2 font-mono text-[11px] text-ink-muted hidden sm:inline-block">
          Halaman <strong className="text-ink">{currentPage}</strong> dari{" "}
          <strong className="text-ink">{totalPages}</strong>
        </span>

        {/* First Page Button */}
        {showFirstLast && (
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handlePageSelect(1)}
            aria-label="Halaman Pertama"
            className={cn(paginationButtonVariants({ variant, size, rounded }))}
          >
            <ChevronsLeft className={iconSizeClass} />
          </button>
        )}

        {/* Prev Page Button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => handlePageSelect(currentPage - 1)}
          aria-label="Halaman Sebelumnya"
          className={cn(paginationButtonVariants({ variant, size, rounded }))}
        >
          <ChevronLeft className={iconSizeClass} />
        </button>

        {/* Page Number Buttons & Ellipsis */}
        {pageNumbers.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="flex items-center justify-center min-w-[32px] h-8 text-ink-muted"
              >
                <MoreHorizontal className={iconSizeClass} />
              </span>
            );
          }

          const isCurrent = p === currentPage;

          return (
            <button
              key={`page-${p}`}
              type="button"
              data-active={isCurrent}
              onClick={() => handlePageSelect(p)}
              className={cn(paginationButtonVariants({ variant, size, rounded }))}
            >
              {p}
            </button>
          );
        })}

        {/* Next Page Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageSelect(currentPage + 1)}
          aria-label="Halaman Berikutnya"
          className={cn(paginationButtonVariants({ variant, size, rounded }))}
        >
          <ChevronRight className={iconSizeClass} />
        </button>

        {/* Last Page Button */}
        {showFirstLast && (
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageSelect(totalPages)}
            aria-label="Halaman Terakhir"
            className={cn(paginationButtonVariants({ variant, size, rounded }))}
          >
            <ChevronsRight className={iconSizeClass} />
          </button>
        )}
      </div>
    </div>
  );
}
