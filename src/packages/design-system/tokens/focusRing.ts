/**
 * Single source of truth for focus/border ring TREATMENT (width, offset, color,
 * opacity) across every focusable form control (InputApp, TextAreaApp, SelectApp,
 * DropdownApp, SearchBarApp, DatePickerApp) and FocusRingApp itself.
 *
 * Recipe for Input/Trigger-family controls (InputApp, TextAreaApp, SelectApp,
 * DropdownApp, SearchBarApp, DatePickerApp): ring width 2px, ring-offset 1px against
 * the surface color — offset kept tight/close to the border on purpose (a wider
 * offset reads as "floating" and was explicitly rejected). Ring color is 60% opacity
 * for the neutral/default state and 70% opacity for semantic states (success/warning/
 * error/info), matching ButtonApp's opacity so the COLOR stays identical everywhere.
 * Every Input and every Trigger must always resolve to the exact same color per
 * variant — never give them different colors for the same state.
 *
 * IMPORTANT: the border color must NOT change on focus/active for the default
 * (non-error/non-success) state — only the ring appears/changes. The border stays
 * whatever it already was (e.g. `border-hairline`). Semantic variants (error/success/
 * warning/info) are the one exception: their border color is a persistent validation
 * indicator set unconditionally by the component's own `variant` prop, not something
 * these focus tokens turn on/off — so it's fine (and correct) that it's already
 * colored before, during, and after focus.
 *
 * IMPORTANT (Tailwind JIT constraint): every exported value below MUST be a complete,
 * literal class string written out in full right here. Tailwind's build-time scanner
 * finds utility candidates by scanning raw source text for whole class-name tokens —
 * it does not execute this file, so `` `focus-within:${x}` `` string interpolation at a
 * CONSUMING file would produce a class name that never appears literally anywhere in
 * scanned source, and Tailwind would silently never generate CSS for it. Do not build
 * these strings by concatenating a prefix + an imported fragment at the call site —
 * only ever import and use one of these pre-composed constants as a whole.
 */
export type FocusRingSemanticVariant = "default" | "success" | "warning" | "error" | "info";

// Bare (unprefixed) tokens — safe to use standalone or behind a JS boolean condition
// (e.g. `isFocused && focusRingRingColorClass.success`), since no Tailwind variant
// syntax needs to be assembled at the call site.
export const focusRingBorderColorClass: Record<FocusRingSemanticVariant, string> = {
  default: "border-vibrant-purple-dark",
  success: "border-success",
  warning: "border-warning",
  error: "border-error",
  info: "border-info",
};

export const focusRingRingColorClass: Record<FocusRingSemanticVariant, string> = {
  default: "ring-vibrant-purple-dark",
  success: "ring-success",
  warning: "ring-warning",
  error: "ring-error",
  info: "ring-info",
};

export const focusRingTextColorClass: Record<FocusRingSemanticVariant, string> = {
  default: "text-vibrant-purple-dark",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
};

// Add this once to a component's own base/root class string (unconditional, applies
// regardless of variant) alongside one of the *BorderRingClass maps below.
export const FOCUS_RING_WIDTH_OFFSET = "ring-2 ring-offset-1 ring-offset-surface";
export const FOCUS_WITHIN_RING_WIDTH_OFFSET = "focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-surface";
export const FOCUS_PSEUDO_RING_WIDTH_OFFSET = "focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface";
export const FOCUS_PEER_RING_WIDTH_OFFSET = "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface";

// Pre-composed `focus-within:` ring color combos (width/offset come from
// FOCUS_WITHIN_RING_WIDTH_OFFSET above) for wrapper-div controls (InputApp, TextAreaApp)
// where the actual <input>/<textarea> is a child and the wrapper reacts via :focus-within.
// Ring color only — the border color is intentionally left unchanged on focus.
export const focusWithinBorderRingClass: Record<FocusRingSemanticVariant, string> = {
  default: "focus-within:ring-vibrant-purple-dark/60",
  success: "focus-within:ring-success/70",
  warning: "focus-within:ring-warning/70",
  error: "focus-within:ring-error/70",
  info: "focus-within:ring-info/70",
};

// Pre-composed `focus:` ring color combos (width/offset come from
// FOCUS_PSEUDO_RING_WIDTH_OFFSET above) for controls that are themselves the
// focusable element (native <select>, DropdownApp's tabIndex=0 trigger div, etc).
// Ring color only — the border color is intentionally left unchanged on focus.
export const focusBorderRingClass: Record<FocusRingSemanticVariant, string> = {
  default: "focus:ring-vibrant-purple-dark/60",
  success: "focus:ring-success/70",
  warning: "focus:ring-warning/70",
  error: "focus:ring-error/70",
  info: "focus:ring-info/70",
};

// Pre-composed `peer-focus-visible:` ring color combos (width/offset come from
// FOCUS_PEER_RING_WIDTH_OFFSET above) for the "hidden native input + styled peer
// sibling" pattern (CheckboxApp, RadioApp) — the real focusable element is the
// sr-only <input>, and the visible box/dot is a sibling that reacts via `peer-*`.
export const focusPeerRingClass: Record<FocusRingSemanticVariant, string> = {
  default: "peer-focus-visible:ring-vibrant-purple-dark/60",
  success: "peer-focus-visible:ring-success/70",
  warning: "peer-focus-visible:ring-warning/70",
  error: "peer-focus-visible:ring-error/70",
  info: "peer-focus-visible:ring-info/70",
};

// JS-boolean-driven ring (e.g. `isFocused && jsStateRingClass.default`, or
// `hasError && jsStateRingClass.error`) — includes width/offset/ring color together
// since it's applied via a JS condition rather than a CSS pseudo-class Tailwind
// needs to statically discover, so it's safe to compose at the call site. Ring
// color only — the border color is intentionally left unchanged on focus/active.
// Used by SearchBarApp/DatePickerApp (isFocused/isOpen/hasError state) and as the
// supplementary "panel open" overlay on DropdownApp.
export const jsStateRingClass: Record<FocusRingSemanticVariant, string> = {
  default: "ring-2 ring-offset-1 ring-offset-surface ring-vibrant-purple-dark/60",
  success: "ring-2 ring-offset-1 ring-offset-surface ring-success/70",
  warning: "ring-2 ring-offset-1 ring-offset-surface ring-warning/70",
  error: "ring-2 ring-offset-1 ring-offset-surface ring-error/70",
  info: "ring-2 ring-offset-1 ring-offset-surface ring-info/70",
};

// Deprecated alias kept for any lingering imports — same values as jsStateRingClass.
export const focusStateRingClass = jsStateRingClass;

export function resolveFocusRingVariant(variant?: string | null): FocusRingSemanticVariant {
  return variant === "success" || variant === "warning" || variant === "error" || variant === "info"
    ? variant
    : "default";
}
