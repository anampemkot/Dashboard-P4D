import * as React from "react";

export interface UseRealtimeRowsOptions<T> {
  /** Called on each tick — return one row, several rows, or nothing (skip this tick). */
  generate: () => T | T[] | null | undefined;
  /** Row id accessor — must match whatever `getRowId` is passed to DataTableApp. */
  getId: (row: T) => string;
  /** Ms between generation ticks. */
  intervalMs?: number;
  /** Rows kept in memory — oldest dropped past this so the table doesn't grow forever. */
  maxRows?: number;
  /** How long (ms) a freshly-added row stays flagged "new" for DataTableApp's highlight fade. */
  highlightMs?: number;
  /** Pause without unmounting — e.g. tie to a page's own "live" toggle. */
  enabled?: boolean;
  /** Seed rows to start from (e.g. the page's existing static mock data). */
  initialRows?: T[];
}

/**
 * Source-agnostic "live feed" primitive for DataTableApp — the caller
 * supplies `generate` (random mock data today, a poll/websocket handler
 * tomorrow) and gets back a `rows` array that grows from the top plus a
 * `newRowIds` set to hand straight to `DataTableApp`'s `newRowIds` prop for
 * the enter/highlight animation. Deliberately not tied to any one page's
 * data shape — this is the reusable half of "make the table look alive";
 * DataTableApp owns the reusable half of "what a new row looks like".
 */
export function useRealtimeRows<T>({
  generate,
  getId,
  intervalMs = 6000,
  maxRows = 30,
  highlightMs = 2500,
  enabled = true,
  initialRows,
}: UseRealtimeRowsOptions<T>) {
  const [rows, setRows] = React.useState<T[]>(initialRows ?? []);
  const [newRowIds, setNewRowIds] = React.useState<Set<string>>(new Set());
  // Refs so the interval callback always sees the latest `generate`/`getId`
  // without needing either in the effect's dependency array — both are
  // near-always inline arrow functions at the call site (e.g. `row =>
  // row.id`), which get a new identity every render. Depending on them
  // directly would tear down and restart the interval on every render,
  // corrupting the tick cadence (each restart re-arms a fresh `intervalMs`
  // timer, so a chain of restarts can fire much more often than configured,
  // and can also race with in-flight `highlightMs` cleanup timeouts).
  const generateRef = React.useRef(generate);
  generateRef.current = generate;
  const getIdRef = React.useRef(getId);
  getIdRef.current = getId;

  React.useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => {
      const produced = generateRef.current();
      if (!produced) return;
      const newItems = Array.isArray(produced) ? produced : [produced];
      if (!newItems.length) return;

      setRows((prev) => [...newItems, ...prev].slice(0, maxRows));

      const ids = newItems.map(getIdRef.current);
      setNewRowIds((prev) => {
        const next = new Set(prev);
        ids.forEach((rowId) => next.add(rowId));
        return next;
      });
      window.setTimeout(() => {
        setNewRowIds((prev) => {
          const next = new Set(prev);
          ids.forEach((rowId) => next.delete(rowId));
          return next;
        });
      }, highlightMs);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [enabled, intervalMs, maxRows, highlightMs]);

  return { rows, newRowIds: Array.from(newRowIds) };
}
