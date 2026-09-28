import * as React from "react";

export interface UseRealtimeValueOptions<T> {
  initialValue: T;
  /** Called on each tick with the current value — return the next one (or the same value to skip visibly changing this tick). */
  update: (current: T) => T;
  /** Ms between ticks. */
  intervalMs?: number;
  /** Pause without unmounting. */
  enabled?: boolean;
}

/**
 * Single-value counterpart to `useRealtimeRows` — for a `ScorecardApp`
 * metric instead of a `DataTableApp` feed. Returns a value that changes on
 * its own on an interval; pair with `ScorecardApp`'s `live` prop so each
 * change animates (count-up from the previous number + a brief pulse)
 * instead of just snapping to the new number.
 */
export function useRealtimeValue<T>({ initialValue, update, intervalMs = 8000, enabled = true }: UseRealtimeValueOptions<T>): T {
  const [value, setValue] = React.useState(initialValue);
  // Ref so the interval callback always sees the latest `update` without
  // needing it in the effect's dependency array — see useRealtimeRows for
  // why an inline arrow function there would otherwise corrupt the cadence.
  const updateRef = React.useRef(update);
  updateRef.current = update;

  React.useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => {
      setValue((current) => updateRef.current(current));
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [enabled, intervalMs]);

  return value;
}
