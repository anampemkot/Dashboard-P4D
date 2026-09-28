import * as React from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeApp, ButtonApp, SkeletonApp, TextApp } from "@/packages/design-system";
import { UI_KIT_CATEGORIES } from "../uikitCategoriesData";
import { findSectionBySlug, UIKIT_SECTIONS } from "./uikitRegistry";
import { fadeInUp } from "./motion";
import { UiKitSectionContext } from "./UiKitSectionContext";

function DemoFallback({ anchorId }: { anchorId: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-hairline bg-surface p-6">
      <SkeletonApp id={`${anchorId}-skeleton-title`} className="h-6 w-1/3" />
      <SkeletonApp id={`${anchorId}-skeleton-line`} className="h-4 w-2/3" />
      <SkeletonApp id={`${anchorId}-skeleton-block`} className="h-40 w-full" />
    </div>
  );
}

/**
 * Scrolls to the hash anchor once its lazy-loaded target exists, then KEEPS
 * correcting the position for a few seconds — sibling demos above the target
 * resolve from short Suspense skeletons into full-height modules, which would
 * otherwise push the target away right after the initial scroll.
 */
function useHashScroll(dependencyKey: string) {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;

    let cancelled = false;
    let hasScrolledOnce = false;
    let stableTicks = 0;
    let lastDocHeight = 0;
    const startedAt = performance.now();
    // Generous window: a deep anchor means every lazy demo chunk above it must
    // load first, which can take several seconds on a cold cache.
    const MAX_WINDOW_MS = 12000;
    const IN_PLACE_THRESHOLD_PX = 120;

    const tick = () => {
      if (cancelled) return;
      const elapsed = performance.now() - startedAt;
      const target = document.getElementById(hash);
      const docHeight = document.documentElement.scrollHeight;
      const heightStable = docHeight === lastDocHeight;
      lastDocHeight = docHeight;

      if (target) {
        const top = target.getBoundingClientRect().top;
        if (Math.abs(top) <= IN_PLACE_THRESHOLD_PX && heightStable) {
          // Only settle once the target sits at the viewport top AND the page
          // height has stopped changing (all lazy demos finished expanding) —
          // otherwise a late-loading module above would shift the target away
          // right after we stop correcting.
          stableTicks += 1;
          if (stableTicks >= 6) return;
        } else {
          stableTicks = 0;
          if (Math.abs(top) > IN_PLACE_THRESHOLD_PX) {
            target.scrollIntoView({ behavior: hasScrolledOnce ? "auto" : "smooth", block: "start" });
            hasScrolledOnce = true;
          }
        }
      }

      if (elapsed < MAX_WINDOW_MS) {
        // Plain setTimeout (not requestAnimationFrame): rAF callbacks are
        // suspended entirely in unfocused/background tabs, which silently
        // killed this loop during automated testing and would equally break
        // a user switching tabs while a section page loads.
        window.setTimeout(tick, 250);
      }
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [location.hash, dependencyKey]);
}

export function UiKitSectionPage() {
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const section = findSectionBySlug(sectionSlug);
  const reducedMotion = useReducedMotion();
  const [activeAnchor, setActiveAnchor] = React.useState<string>("");

  useHashScroll(sectionSlug ?? "");

  // Highlight the demo currently in view inside the on-page nav.
  React.useEffect(() => {
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    section.demos.forEach((demo) => {
      const el = document.getElementById(demo.anchorId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [section]);

  if (!section) {
    return <Navigate to="/admin/ui-kit" replace />;
  }

  const category = UI_KIT_CATEGORIES.find((cat) => cat.id === section.categoryId);
  if (!category) {
    return <Navigate to="/admin/ui-kit" replace />;
  }

  const readyCount = category.todoItems.filter((item) => item.status === "ready").length;

  return (
    <div className="flex gap-8 pb-24">
      {/* Left sticky sidebar — section list + on-page demo nav */}
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-4 flex max-h-[calc(100vh-8rem)] flex-col gap-5 overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
          <div>
            <TextApp id="uikit-section-nav-title" variant="micro" weight="bold" className="mb-2 block uppercase tracking-wider text-ink-muted">
              Seksi UI Kit
            </TextApp>
            <nav aria-label="Daftar seksi UI Kit" className="flex flex-col gap-0.5">
              {UIKIT_SECTIONS.map((entry) => {
                const entryCategory = UI_KIT_CATEGORIES.find((cat) => cat.id === entry.categoryId);
                if (!entryCategory) return null;
                const isActive = entry.slug === section.slug;
                return (
                  <Link
                    key={entry.slug}
                    to={`/admin/ui-kit/${entry.slug}`}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-[8px] px-2.5 py-1.5 text-xs transition-colors",
                      isActive
                        ? "bg-vibrant-purple/15 font-semibold text-vibrant-purple-dark"
                        : "text-ink-secondary hover:bg-surface-soft hover:text-ink"
                    )}
                  >
                    <span className="truncate">{entryCategory.number} · {entryCategory.title}</span>
                    <span className={cn("shrink-0 font-mono text-[10px]", isActive ? "text-vibrant-purple-dark" : "text-ink-muted")}>
                      {entryCategory.todoItems.length}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {section.demos.length > 1 && (
            <div>
              <TextApp id="uikit-demo-nav-title" variant="micro" weight="bold" className="mb-2 block uppercase tracking-wider text-ink-muted">
                Komponen di Halaman Ini
              </TextApp>
              <nav aria-label="Daftar komponen pada seksi ini" className="flex flex-col gap-0.5 border-l border-hairline-soft">
                {section.demos.map((demo) => (
                  <a
                    key={demo.anchorId}
                    href={`#${demo.anchorId}`}
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById(demo.anchorId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "-ml-px truncate border-l-2 py-1 pl-3 text-xs transition-colors",
                      activeAnchor === demo.anchorId
                        ? "border-vibrant-purple-dark font-semibold text-vibrant-purple-dark"
                        : "border-transparent text-ink-secondary hover:text-ink"
                    )}
                  >
                    {demo.title}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-8">
        <header className="flex flex-wrap items-start justify-between gap-4 rounded-[16px] border border-hairline bg-surface p-5 shadow-vibrant-soft">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <BadgeApp id="uikit-section-badge" variant="solidPurple" size="sm">
                {category.number} · {category.title}
              </BadgeApp>
              <BadgeApp id="uikit-section-progress" variant="outlineSuccess" size="sm">
                {readyCount}/{category.todoItems.length} Siap
              </BadgeApp>
            </div>
            <TextApp id="uikit-section-title" variant="h2" weight="bold" className="mt-3">
              {category.title}
            </TextApp>
            <TextApp id="uikit-section-description" variant="caption" className="mt-1 max-w-2xl text-ink-secondary">
              {category.description}
            </TextApp>
          </div>
          <Link to="/admin/ui-kit">
            <ButtonApp id="uikit-section-back" variant="secondary" size="sm" leftIcon={<ArrowLeft />}>
              Kembali ke Katalog
            </ButtonApp>
          </Link>
        </header>

        <UiKitSectionContext.Provider value={{ number: category.number, slug: section.slug }}>
          {section.demos.map((demo) => (
            <motion.div
              key={demo.anchorId}
              id={demo.anchorId}
              className="scroll-mt-24"
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              variants={fadeInUp}
            >
              <React.Suspense fallback={<DemoFallback anchorId={demo.anchorId} />}>
                <demo.Component />
              </React.Suspense>
            </motion.div>
          ))}
        </UiKitSectionContext.Provider>
      </div>
    </div>
  );
}
