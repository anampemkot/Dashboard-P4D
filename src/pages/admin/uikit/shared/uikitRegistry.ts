import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export interface UiKitDemoEntry {
  /** DOM id anchor target — every demo wrapper gets this id on the section page. */
  anchorId: string;
  /** Display title shown in the section page's on-page nav. */
  title: string;
  /** UiTodoItem ids from uikitCategoriesData covered by this demo (for inventory anchor links). */
  todoIds: string[];
  Component: LazyExoticComponent<ComponentType>;
}

export interface UiKitSectionEntry {
  /** Matches UI_KIT_CATEGORIES[n].id */
  categoryId: string;
  /** URL slug: /admin/ui-kit/<slug> */
  slug: string;
  demos: UiKitDemoEntry[];
}

// Ordered per the original UiKitPage liveContent mapping so the reading order
// of each section stays identical after the split into per-section pages.
export const UIKIT_SECTIONS: UiKitSectionEntry[] = [
  {
    categoryId: "uikit-01-foundations",
    slug: "foundations",
    demos: [
      {
        anchorId: "demo-foundations",
        title: "Foundations",
        todoIds: ["found-01", "found-02", "found-03", "found-04", "found-05", "found-06", "found-07"],
        Component: lazy(() => import("../FoundationsDisplayModule").then((m) => ({ default: m.FoundationsDisplayModule }))),
      },
    ],
  },
  {
    categoryId: "uikit-02-core-ui",
    slug: "core-ui",
    demos: [
      { anchorId: "demo-button", title: "ButtonApp", todoIds: ["core-01"], Component: lazy(() => import("../ButtonDisplayModule").then((m) => ({ default: m.ButtonDisplayModule }))) },
      { anchorId: "demo-fab", title: "FAB & Speed Dial", todoIds: ["core-05"], Component: lazy(() => import("../FabDisplayModule").then((m) => ({ default: m.FabDisplayModule }))) },
      { anchorId: "demo-badge", title: "BadgeApp", todoIds: ["core-02"], Component: lazy(() => import("../BadgeDisplayModule").then((m) => ({ default: m.BadgeDisplayModule }))) },
      { anchorId: "demo-chips", title: "Chips / Tags", todoIds: ["core-06"], Component: lazy(() => import("../ChipsDisplayModule").then((m) => ({ default: m.ChipsDisplayModule }))) },
      { anchorId: "demo-separator", title: "Divider / Separator", todoIds: ["core-07"], Component: lazy(() => import("../SeparatorDisplayModule").then((m) => ({ default: m.SeparatorDisplayModule }))) },
      { anchorId: "demo-tooltip", title: "TooltipApp", todoIds: ["core-08"], Component: lazy(() => import("../TooltipDisplayModule").then((m) => ({ default: m.TooltipDisplayModule }))) },
      { anchorId: "demo-avatar", title: "Avatar / Profile", todoIds: ["core-03"], Component: lazy(() => import("../AvatarDisplayModule").then((m) => ({ default: m.AvatarDisplayModule }))) },
      { anchorId: "demo-skeleton", title: "SkeletonApp", todoIds: ["core-04", "fdb-06"], Component: lazy(() => import("../SkeletonDisplayModule").then((m) => ({ default: m.SkeletonDisplayModule }))) },
      { anchorId: "demo-kbd", title: "Keyboard Key (Kbd)", todoIds: ["core-09", "misc-04"], Component: lazy(() => import("../KbdDisplayModule").then((m) => ({ default: m.KbdDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-03-forms-inputs",
    slug: "forms-inputs",
    demos: [
      { anchorId: "demo-input", title: "InputApp", todoIds: ["form-01"], Component: lazy(() => import("../InputDisplayModule").then((m) => ({ default: m.InputDisplayModule }))) },
      { anchorId: "demo-textarea", title: "TextAreaApp", todoIds: [], Component: lazy(() => import("../TextAreaDisplayModule").then((m) => ({ default: m.TextAreaDisplayModule }))) },
      { anchorId: "demo-checkbox", title: "CheckboxApp", todoIds: ["form-02"], Component: lazy(() => import("../CheckboxDisplayModule").then((m) => ({ default: m.CheckboxDisplayModule }))) },
      { anchorId: "demo-radio", title: "RadioApp", todoIds: ["form-03"], Component: lazy(() => import("../RadioDisplayModule").then((m) => ({ default: m.RadioDisplayModule }))) },
      { anchorId: "demo-slider", title: "SliderApp", todoIds: ["form-10"], Component: lazy(() => import("../SliderDisplayModule").then((m) => ({ default: m.SliderDisplayModule }))) },
      { anchorId: "demo-file-upload", title: "File Upload / Dropzone", todoIds: ["form-07"], Component: lazy(() => import("../FileUploadDisplayModule").then((m) => ({ default: m.FileUploadDisplayModule }))) },
      { anchorId: "demo-otp-input", title: "OTP / PIN Input", todoIds: ["form-11"], Component: lazy(() => import("../OtpInputDisplayModule").then((m) => ({ default: m.OtpInputDisplayModule }))) },
      { anchorId: "demo-trading-input", title: "Lot/Share Size Input", todoIds: ["form-12"], Component: lazy(() => import("../TradingInputDisplayModule").then((m) => ({ default: m.TradingInputDisplayModule }))) },
      { anchorId: "demo-currency-input", title: "Currency Input (Rupiah)", todoIds: ["form-09"], Component: lazy(() => import("../CurrencyInputDisplayModule").then((m) => ({ default: m.CurrencyInputDisplayModule }))) },
      { anchorId: "demo-dropdown", title: "Dropdown / Combo Box", todoIds: ["form-04", "form-13"], Component: lazy(() => import("../DropdownDisplayModule").then((m) => ({ default: m.DropdownDisplayModule }))) },
      { anchorId: "demo-search-bar", title: "Search Bar", todoIds: ["form-14"], Component: lazy(() => import("../SearchBarDisplayModule").then((m) => ({ default: m.SearchBarDisplayModule }))) },
      { anchorId: "demo-date-picker", title: "DatePickerApp", todoIds: ["form-06"], Component: lazy(() => import("../DatePickerDisplayModule").then((m) => ({ default: m.DatePickerDisplayModule }))) },
      { anchorId: "demo-toggle", title: "Toggle / Switch", todoIds: ["form-08"], Component: lazy(() => import("../ToggleDisplayModule").then((m) => ({ default: m.ToggleDisplayModule }))) },
      { anchorId: "demo-form-composition", title: "Form Composition", todoIds: ["form-05"], Component: lazy(() => import("../FormCompositionModule").then((m) => ({ default: m.FormCompositionModule }))) },
      { anchorId: "demo-signature-pad", title: "Signature Pad", todoIds: ["form-15"], Component: lazy(() => import("../SignaturePadDisplayModule").then((m) => ({ default: m.SignaturePadDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-04-navigation",
    slug: "navigation",
    demos: [
      { anchorId: "demo-sidebar", title: "Sidebar / Navigation Drawer", todoIds: ["nav-02"], Component: lazy(() => import("../SidebarDisplayModule").then((m) => ({ default: m.SidebarDisplayModule }))) },
      { anchorId: "demo-stepper", title: "Stepper / Wizard", todoIds: ["nav-06"], Component: lazy(() => import("../StepperDisplayModule").then((m) => ({ default: m.StepperDisplayModule }))) },
      { anchorId: "demo-bottom-nav", title: "Bottom Navigation", todoIds: ["nav-08"], Component: lazy(() => import("../BottomNavDisplayModule").then((m) => ({ default: m.BottomNavDisplayModule }))) },
      { anchorId: "demo-context-menu", title: "Context Menu", todoIds: ["nav-09"], Component: lazy(() => import("../ContextMenuDisplayModule").then((m) => ({ default: m.ContextMenuDisplayModule }))) },
      { anchorId: "demo-pagination", title: "PaginationApp", todoIds: ["nav-05"], Component: lazy(() => import("../PaginationDisplayModule").then((m) => ({ default: m.PaginationDisplayModule }))) },
      { anchorId: "demo-tabs", title: "TabsApp", todoIds: ["nav-01"], Component: lazy(() => import("../TabsDisplayModule").then((m) => ({ default: m.TabsDisplayModule }))) },
      { anchorId: "demo-breadcrumb", title: "BreadcrumbApp", todoIds: ["nav-04"], Component: lazy(() => import("../BreadcrumbDisplayModule").then((m) => ({ default: m.BreadcrumbDisplayModule }))) },
      { anchorId: "demo-command-palette", title: "Command Palette (Cmd+K)", todoIds: ["nav-07", "ai-07"], Component: lazy(() => import("../CommandPaletteDisplayModule").then((m) => ({ default: m.CommandPaletteDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-05-layouts-structure",
    slug: "layouts-structure",
    demos: [
      { anchorId: "demo-card", title: "CardApp", todoIds: ["lay-01"], Component: lazy(() => import("../CardDisplayModule").then((m) => ({ default: m.CardDisplayModule }))) },
      { anchorId: "demo-accordion", title: "Accordion / Collapse", todoIds: ["lay-05"], Component: lazy(() => import("../AccordionDisplayModule").then((m) => ({ default: m.AccordionDisplayModule }))) },
      { anchorId: "demo-carousel", title: "CarouselApp", todoIds: ["lay-06"], Component: lazy(() => import("../CarouselDisplayModule").then((m) => ({ default: m.CarouselDisplayModule }))) },
      { anchorId: "demo-splitter", title: "Splitter / Resizable Pane", todoIds: ["lay-07"], Component: lazy(() => import("../SplitterDisplayModule").then((m) => ({ default: m.SplitterDisplayModule }))) },
      { anchorId: "demo-custom-scrollbar", title: "Custom Scrollbar", todoIds: ["lay-08"], Component: lazy(() => import("../CustomScrollbarDisplayModule").then((m) => ({ default: m.CustomScrollbarDisplayModule }))) },
      { anchorId: "demo-masonry-grid", title: "Masonry Grid Layout", todoIds: ["lay-09"], Component: lazy(() => import("../MasonryGridDisplayModule").then((m) => ({ default: m.MasonryGridDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-06-data-tables-lists",
    slug: "data-tables-lists",
    demos: [
      { anchorId: "demo-advance-filter", title: "Filter / Filter Advance", todoIds: ["tbl-02"], Component: lazy(() => import("../AdvanceFilterDisplayModule").then((m) => ({ default: m.AdvanceFilterDisplayModule }))) },
      { anchorId: "demo-data-table", title: "DataTableApp", todoIds: ["tbl-01"], Component: lazy(() => import("../DataTableDisplayModule").then((m) => ({ default: m.DataTableDisplayModule }))) },
      { anchorId: "demo-timeline", title: "TimelineApp", todoIds: ["tbl-04"], Component: lazy(() => import("../TimelineDisplayModule").then((m) => ({ default: m.TimelineDisplayModule }))) },
      { anchorId: "demo-calendar-schedule", title: "Calendar / Schedule View", todoIds: ["tbl-05"], Component: lazy(() => import("../CalendarScheduleDisplayModule").then((m) => ({ default: m.CalendarScheduleDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-07-data-visualization",
    slug: "data-visualization",
    demos: [
      { anchorId: "demo-scorecard", title: "ScorecardApp", todoIds: ["vis-01"], Component: lazy(() => import("../ScorecardDisplayModule").then((m) => ({ default: m.ScorecardDisplayModule }))) },
      { anchorId: "demo-chart", title: "ChartApp", todoIds: ["vis-02"], Component: lazy(() => import("../ChartDisplayModule").then((m) => ({ default: m.ChartDisplayModule }))) },
      {
        anchorId: "demo-advanced-visualization",
        title: "Advanced Visualization",
        todoIds: ["vis-04", "vis-05", "vis-06", "vis-07", "vis-08", "vis-09", "vis-10", "vis-11", "vis-12", "vis-13", "vis-14", "vis-15", "vis-16", "vis-17", "vis-18"],
        Component: lazy(() => import("../AdvancedVisualizationDisplayModule").then((m) => ({ default: m.AdvancedVisualizationDisplayModule }))),
      },
      { anchorId: "demo-progress-list", title: "ProgressListApp", todoIds: [], Component: lazy(() => import("../ProgressListDisplayModule").then((m) => ({ default: m.ProgressListDisplayModule }))) },
      { anchorId: "demo-maps", title: "MapsApp (Leaflet GIS)", todoIds: ["vis-03", "ai-03"], Component: lazy(() => import("../MapsDisplayModule").then((m) => ({ default: m.MapsDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-08-feedback-overlays",
    slug: "feedback-overlays",
    demos: [
      { anchorId: "demo-alert", title: "Alert / Banner", todoIds: ["fdb-01"], Component: lazy(() => import("../AlertDisplayModule").then((m) => ({ default: m.AlertDisplayModule }))) },
      { anchorId: "demo-toast", title: "Toast Notification", todoIds: ["fdb-02"], Component: lazy(() => import("../ToastDisplayModule").then((m) => ({ default: m.ToastDisplayModule }))) },
      { anchorId: "demo-dialog", title: "Modal / Dialog", todoIds: ["fdb-03", "fdb-08"], Component: lazy(() => import("../DialogDisplayModule").then((m) => ({ default: m.DialogDisplayModule }))) },
      {
        anchorId: "demo-feedback-overlay",
        title: "Progress, Empty State, Popover, Lightbox, Coachmark, Pull to Refresh",
        todoIds: ["fdb-04", "fdb-05", "fdb-07", "fdb-09", "fdb-10", "fdb-11", "fdb-12"],
        Component: lazy(() => import("../FeedbackOverlayDisplayModule").then((m) => ({ default: m.FeedbackOverlayDisplayModule }))),
      },
    ],
  },
  {
    categoryId: "uikit-09-advanced-ai",
    slug: "advanced-ai",
    demos: [
      {
        anchorId: "demo-advanced-ai",
        title: "AI Prompt, Response, Chat, Maps, Verification",
        todoIds: ["ai-01", "ai-02", "ai-04", "ai-05", "ai-06", "ai-08", "ai-09"],
        Component: lazy(() => import("../AdvancedAIDisplayModule").then((m) => ({ default: m.AdvancedAIDisplayModule }))),
      },
    ],
  },
  {
    categoryId: "uikit-10-templates-patterns",
    slug: "templates-patterns",
    demos: [
      { anchorId: "demo-authentication-flow", title: "Authentication Flow", todoIds: ["tmpl-06"], Component: lazy(() => import("../AuthenticationFlowDisplayModule").then((m) => ({ default: m.AuthenticationFlowDisplayModule }))) },
      { anchorId: "demo-dashboard-layout", title: "Dashboard Layout", todoIds: ["tmpl-07"], Component: lazy(() => import("../DashboardLayoutDisplayModule").then((m) => ({ default: m.DashboardLayoutDisplayModule }))) },
      { anchorId: "demo-data-management", title: "Data Management View", todoIds: ["tmpl-08"], Component: lazy(() => import("../DataManagementDisplayModule").then((m) => ({ default: m.DataManagementDisplayModule }))) },
    ],
  },
  {
    categoryId: "uikit-11-misc",
    slug: "misc",
    demos: [
      { anchorId: "demo-accessibility-utility", title: "Focus Ring, Skip Link, Screen Reader Text", todoIds: ["misc-06", "misc-07", "misc-08"], Component: lazy(() => import("../AccessibilityUtilityDisplayModule").then((m) => ({ default: m.AccessibilityUtilityDisplayModule }))) },
      { anchorId: "demo-email-template", title: "Welcome & Password Reset Email", todoIds: ["misc-09", "misc-10"], Component: lazy(() => import("../EmailTemplateDisplayModule").then((m) => ({ default: m.EmailTemplateDisplayModule }))) },
      { anchorId: "demo-auth-provider-payment", title: "Google/Apple Sign-In & Stripe Payment", todoIds: ["misc-11", "misc-12", "misc-13"], Component: lazy(() => import("../AuthProviderPaymentDisplayModule").then((m) => ({ default: m.AuthProviderPaymentDisplayModule }))) },
    ],
  },
];

export function findSectionBySlug(slug: string | undefined): UiKitSectionEntry | undefined {
  return UIKIT_SECTIONS.find((section) => section.slug === slug);
}

export function findSectionByCategoryId(categoryId: string): UiKitSectionEntry | undefined {
  return UIKIT_SECTIONS.find((section) => section.categoryId === categoryId);
}

export interface UiKitDemoLocation {
  slug: string;
  anchorId: string;
}

/** Maps a UiTodoItem id (e.g. "core-01") to the section page + anchor where its live demo renders. */
export function findDemoLocation(todoId: string): UiKitDemoLocation | undefined {
  for (const section of UIKIT_SECTIONS) {
    for (const demo of section.demos) {
      if (demo.todoIds.includes(todoId)) {
        return { slug: section.slug, anchorId: demo.anchorId };
      }
    }
  }
  return undefined;
}
