import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as ReactTableInstance,
  Column,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/packages/ui/table";
import { ButtonApp } from "@/packages/design-system/atoms/ButtonApp";
import { InputApp } from "@/packages/design-system/atoms/InputApp";
import { SelectApp } from "@/packages/design-system/atoms/SelectApp";
import { SkeletonApp } from "@/packages/design-system/atoms/SkeletonApp";
import { BadgeApp } from "@/packages/design-system/atoms/BadgeApp";
import { CheckboxApp } from "@/packages/design-system/atoms/CheckboxApp";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Trash2,
  Download,
  CheckSquare,
  Database,
  SlidersHorizontal,
} from "lucide-react";

// ==========================================
// COLUMN HEADER SORTING HELPER COMPONENT
// ==========================================
export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("text-xs font-bold font-display uppercase tracking-wider text-ink-muted", className)}>{title}</div>;
  }

  const isSorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <ButtonApp
        id={`sort-col-${column.id}`}
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(isSorted === "asc")}
        className="h-8 px-2 -ml-2 font-display font-bold text-xs uppercase tracking-wider text-ink-muted hover:text-ink hover:bg-surface-soft flex items-center gap-1.5 cursor-pointer"
      >
        <span>{title}</span>
        {isSorted === "desc" ? (
          <ArrowDown className="w-3.5 h-3.5 text-vibrant-purple-dark font-bold" />
        ) : isSorted === "asc" ? (
          <ArrowUp className="w-3.5 h-3.5 text-vibrant-purple-dark font-bold" />
        ) : (
          <ArrowUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
        )}
      </ButtonApp>
    </div>
  );
}

// ==========================================
// DATA TABLE PROPS INTERFACE
// ==========================================
export interface DataTableAppProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  id?: string;
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  enableRowSelection?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  rightHeaderAction?: React.ReactNode;
  bulkActions?: (selectedRows: TData[], clearSelection: () => void) => React.ReactNode;
  onDeleteSelected?: (selectedRows: TData[], clearSelection: () => void) => void;
  onExportSelected?: (selectedRows: TData[]) => void;
  className?: string;
}

export function DataTableApp<TData, TValue>({
  data,
  columns,
  id = "data-table-app",
  title,
  description,
  searchPlaceholder = "Cari data...",
  enableSearch = true,
  enablePagination = true,
  pageSize = 10,
  enableRowSelection = true,
  isLoading = false,
  emptyMessage = "Tidak ada data yang ditemukan",
  rightHeaderAction,
  bulkActions,
  onDeleteSelected,
  onExportSelected,
  className,
}: DataTableAppProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Augment columns with selection checkbox if enabled and not already provided
  const finalColumns = React.useMemo(() => {
    if (!enableRowSelection) return columns;

    const hasSelectionColumn = columns.some((col) => col.id === "select");
    if (hasSelectionColumn) return columns;

    const selectionColumn: ColumnDef<TData, TValue> = {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <CheckboxApp
            id={`${id}-select-all`}
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            aria-label="Pilih semua baris"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <CheckboxApp
            id={`${id}-select-row-${row.id}`}
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            aria-label={`Pilih baris ${row.id}`}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    };

    return [selectionColumn, ...columns];
  }, [columns, enableRowSelection, id]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    enableRowSelection: enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const selectedCount = selectedRows.length;

  const clearSelection = React.useCallback(() => {
    table.resetRowSelection();
  }, [table]);

  return (
    <div id={id} className={cn("w-full space-y-4 text-left", className)}>
      {/* HEADER BAR: Title, Search & Bulk Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        {(title || description) && (
          <div>
            {title && (
              <h3 className="text-lg font-bold font-display text-ink tracking-tight flex items-center gap-2">
                {title}
                <BadgeApp id={`${id}-total-badge`} variant="neutral" size="sm">
                  {data.length} Data
                </BadgeApp>
              </h3>
            )}
            {description && (
              <p className="text-xs text-ink-secondary mt-0.5">{description}</p>
            )}
          </div>
        )}

        {/* Right side controls: Global Search & Custom Header Action */}
        <div className="flex items-center gap-3 flex-wrap ml-auto">
          {enableSearch && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
              <InputApp
                id={`${id}-search-input`}
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-9 pr-8 text-xs py-2 bg-surface-soft/60 focus:bg-surface border-hairline-soft"
              />
              {globalFilter && (
                <button
                  type="button"
                  onClick={() => setGlobalFilter("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-ink-muted hover:text-ink rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {rightHeaderAction}
        </div>
      </div>

      {/* BULK ACTION BAR (Floating when rows selected) */}
      {selectedCount > 0 && (
        <div className="bg-vibrant-purple/10 dark:bg-vibrant-purple/20 border border-vibrant-purple/40 rounded-xl p-3 px-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-vibrant-purple-dark text-white text-xs font-bold font-mono flex items-center justify-center">
              {selectedCount}
            </span>
            <span className="text-xs font-bold font-display text-ink">
              Data Dipilih dari total {table.getFilteredRowModel().rows.length}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {bulkActions ? (
              bulkActions(selectedRows, clearSelection)
            ) : (
              <>
                {onExportSelected && (
                  <ButtonApp
                    id={`${id}-bulk-export`}
                    variant="secondary"
                    size="sm"
                    onClick={() => onExportSelected(selectedRows)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" /> Ekspor ({selectedCount})
                  </ButtonApp>
                )}
                {onDeleteSelected && (
                  <ButtonApp
                    id={`${id}-bulk-delete`}
                    variant="danger"
                    size="sm"
                    onClick={() => onDeleteSelected(selectedRows, clearSelection)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus ({selectedCount})
                  </ButtonApp>
                )}
              </>
            )}

            <ButtonApp
              id={`${id}-clear-selection`}
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-xs text-ink-muted hover:text-ink underline ml-1"
            >
              Batal Pilih
            </ButtonApp>
          </div>
        </div>
      )}

      {/* MAIN TABLE CONTAINER */}
      <Table className="shadow-xs">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Skeleton loading rows
            Array.from({ length: pageSize > 5 ? 5 : pageSize }).map((_, idx) => (
              <TableRow key={`skeleton-row-${idx}`}>
                {finalColumns.map((col, colIdx) => (
                  <TableCell key={`skeleton-cell-${idx}-${colIdx}`}>
                    <SkeletonApp id={`${id}-skeleton-${idx}-${colIdx}`} className="h-5 w-full rounded-md" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="group cursor-pointer hover:bg-surface-soft/80"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={finalColumns.length}
                className="h-36 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-2 py-6 text-ink-muted">
                  <Database className="w-8 h-8 opacity-40 text-vibrant-purple-dark" />
                  <p className="text-sm font-semibold text-ink-secondary">{emptyMessage}</p>
                  {globalFilter && (
                    <ButtonApp
                      id={`${id}-reset-filter`}
                      variant="ghost"
                      size="sm"
                      onClick={() => setGlobalFilter("")}
                      className="text-xs text-vibrant-purple-dark font-bold underline mt-1"
                    >
                      Bersihkan pencarian "{globalFilter}"
                    </ButtonApp>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* PAGINATION BAR */}
      {enablePagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-ink-secondary">
          {/* Left info */}
          <div className="flex items-center gap-4">
            <span className="font-sans">
              Menampilkan{" "}
              <strong className="text-ink">
                {table.getFilteredRowModel().rows.length === 0
                  ? 0
                  : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </strong>{" "}
              s/d{" "}
              <strong className="text-ink">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}
              </strong>{" "}
              dari <strong className="text-ink">{table.getFilteredRowModel().rows.length}</strong> data
            </span>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2 border-l border-hairline-soft pl-4 shrink-0">
              <span className="shrink-0 text-xs text-ink-muted">Tampilkan:</span>
              <div className="w-20">
                <SelectApp
                  id={`${id}-page-size`}
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  size="sm"
                  options={[5, 10, 20, 50, 100].map((size) => ({
                    value: size,
                    label: String(size),
                  }))}
                  className="font-semibold text-xs"
                />
              </div>
            </div>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="mr-2 font-mono text-[11px] text-ink-muted">
              Halaman <strong>{table.getState().pagination.pageIndex + 1}</strong> dari{" "}
              <strong>{table.getPageCount() || 1}</strong>
            </span>

            <ButtonApp
              id={`${id}-page-first`}
              variant="secondary"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="w-8 h-8 p-0 flex items-center justify-center"
              aria-label="Halaman Pertama"
            >
              <ChevronsLeft className="w-4 h-4" />
            </ButtonApp>
            <ButtonApp
              id={`${id}-page-prev`}
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="w-8 h-8 p-0 flex items-center justify-center"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </ButtonApp>

            <ButtonApp
              id={`${id}-page-next`}
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="w-8 h-8 p-0 flex items-center justify-center"
              aria-label="Halaman Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </ButtonApp>
            <ButtonApp
              id={`${id}-page-last`}
              variant="secondary"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="w-8 h-8 p-0 flex items-center justify-center"
              aria-label="Halaman Terakhir"
            >
              <ChevronsRight className="w-4 h-4" />
            </ButtonApp>
          </div>
        </div>
      )}
    </div>
  );
}
