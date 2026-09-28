# Project Conventions & Guidelines

## Component Reuse & Design System First Directive

1. **Always Use Existing UI Kit Components**:
   - All feature pages and application modules MUST strictly reuse components exported from `@/packages/design-system` (e.g., `ButtonApp`, `BadgeApp`, `CardApp`, `InputApp`, `TextApp`, `AvatarApp`, `AvatarGroupApp`, `DataTableApp`, `AdvanceFilterApp`, `MapsApp`, `ChartApp`, `DialogApp`, `DrawerApp`, `ScorecardApp`, `ToastApp`, `TabsApp`, `HeaderApp`, `SidebarApp`).

2. **Creating New Variants & Extensions**:
   - If a new feature requires a layout, styling, status, or interactive pattern not currently supported by an existing UI Kit component:
     - DO NOT create ad-hoc inline components or duplicated standard UI blocks in feature code.
     - DO add new `variants`, `props`, or sub-components directly inside `src/packages/design-system/` and document/export them properly.

## Dashboard Design & Layout Baseline (Tax Dashboard Acuan Default)

1. **Badge Defaults & Text Overflow**:
   - `BadgeApp` default variant is **`solidPurple`**.
   - Badges MUST always stay strictly on a single row (`whitespace-nowrap truncate max-w-full inline-block`). Never allow badge text to wrap or create line breaks.

2. **Scorecard & Card Header Anti-Collision Rules**:
   - Scorecard titles MUST use `line-clamp-2 leading-tight break-words min-w-0 flex-1` to adapt gracefully across screens (tablet to ultra-wide) without truncating prematurely into `...` when space permits, or colliding with adjacent info buttons and badges.
   - Action and Info buttons (such as the info circle in `ScorecardApp`) MUST use clean background-tint hover states (`hover:bg-white/20`, `hover:bg-[#5c4300]/15`, or `hover:bg-vibrant-purple/10`) instead of aggressive drop shadows or scaling artifacts to ensure crisp visual alignment.

3. **Responsive Bento Grid Breakdown**:
   - All dashboard card grids MUST adopt standard progressive breakpoint columns:
     `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch`
   - Featured hero metrics span 2 columns (`col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2`), while wide full-width footer cards adjust cleanly (`col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4`).

4. **Component Alignment across Modules**:
   - **`AdvanceFilterApp` & Controls**: Must align seamlessly with headers and tables on a single flex/wrap row with standardized gap spacing (`gap-2` / `gap-3`).
   - **`DataTableApp` & Charts (`ChartApp`)**: Must be encapsulated inside `CardApp` containers with proper headers, badges (`solidPurple`), and responsive overflow scrollbars.

