import * as React from "react";

export interface ScrollSection {
  id: string;
  label: string;
}

export interface ScrollProgressAppProps {
  id: string;
  containerRef: React.RefObject<HTMLElement | null>;
  sections?: ScrollSection[];
}

export function ScrollProgressApp({ id, containerRef, sections }: ScrollProgressAppProps) {
  const [progress, setProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [detectedSections, setDetectedSections] = React.useState<ScrollSection[]>(sections || []);

  // Track and poll for the layout container element so that bindings are correctly made once it is rendered
  React.useEffect(() => {
    const checkContainer = () => {
      const el = containerRef.current || document.getElementById("layout-content");
      if (el && el !== containerEl) {
        setContainerEl(el);
      }
    };

    checkContainer();
    const timer = setTimeout(checkContainer, 100);
    const interval = setInterval(checkContainer, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [containerRef, containerEl]);

  // Dynamic DOM scanner to map sections automatically from container's children if not explicitly provided
  React.useEffect(() => {
    if (sections && sections.length > 0) {
      setDetectedSections(sections);
      return;
    }

    const scanSections = () => {
      const container = containerEl || containerRef.current || document.getElementById("layout-content");
      if (!container) return;

      // 1. Primary match: section with id, data-scroll-section, data-section, data-label, or .scroll-mt-12
      let candidateEls = Array.from(
        container.querySelectorAll<HTMLElement>(
          "section[id], [data-scroll-section][id], [data-section][id], [data-label][id], .scroll-mt-12[id]"
        )
      );

      // 2. Fallback match: if no explicit sections exist, discover top-level dashboard container panels with id & headings
      if (candidateEls.length === 0) {
        const allDivs = Array.from(container.querySelectorAll<HTMLElement>("div[id]"));
        candidateEls = allDivs.filter((el) => {
          const id = el.id;
          if (
            !id ||
            id.includes("root") ||
            id.includes("layout") ||
            id.includes("sidebar") ||
            id.includes("header") ||
            id.includes("scroll") ||
            id.includes("badge") ||
            id.includes("btn") ||
            id.includes("filter") ||
            id.includes("tabs") ||
            id.includes("modal") ||
            id.includes("dialog")
          ) {
            return false;
          }
          const hasTitle = el.querySelector("h1, h2, h3, h4, [class*='font-semibold'], [class*='font-bold']");
          return !!hasTitle && el.clientHeight > 100;
        });
      }

      const found: ScrollSection[] = [];
      const seenIds = new Set<string>();

      candidateEls.forEach((el) => {
        const sectionId = el.id;
        if (!sectionId || seenIds.has(sectionId)) return;
        seenIds.add(sectionId);

        const labelAttr = el.getAttribute("data-label");
        let label = labelAttr || "";

        if (!label) {
          const heading = el.querySelector("h1, h2, h3, h4, .font-semibold, .font-bold");
          if (heading && heading.textContent) {
            label = heading.textContent.trim();
          }
        }

        if (!label) {
          label = sectionId
            .replace(/^(section|dashboard|panel|admin)-/g, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
        }

        if (label.length > 28) {
          label = label.substring(0, 25) + "...";
        }

        found.push({ id: sectionId, label });
      });

      setDetectedSections((prev) => {
        if (prev.length !== found.length) return found;
        const isSame = prev.every((sec, idx) => sec.id === found[idx].id && sec.label === found[idx].label);
        return isSame ? prev : found;
      });
    };

    scanSections();

    const container = containerEl || containerRef.current || document.getElementById("layout-content");
    if (!container) return;

    const observer = new MutationObserver(() => {
      scanSections();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id", "data-label"],
    });

    return () => {
      observer.disconnect();
    };
  }, [containerEl, containerRef, sections]);

  React.useEffect(() => {
    const handleScroll = () => {
      const container = containerEl || containerRef.current || document.getElementById("layout-content");
      
      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      // Check if container has actual scrollable content, otherwise fall back to window/document scrolling
      if (container && container.scrollHeight > container.clientHeight) {
        scrollTop = container.scrollTop;
        scrollHeight = container.scrollHeight;
        clientHeight = container.clientHeight;
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      }

      const limit = scrollHeight - clientHeight;
      const percentage = limit > 0 ? (scrollTop / limit) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percentage)));

      // Track active section
      let currentActive = "";
      const viewMiddle = clientHeight / 2;

      for (const section of detectedSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          
          if (container && container.scrollHeight > container.clientHeight) {
            // Relative scroll container offset calculation
            const containerRect = container.getBoundingClientRect();
            const relativeTop = rect.top - containerRect.top;
            const relativeBottom = rect.bottom - containerRect.top;
            if (relativeTop <= viewMiddle && relativeBottom >= viewMiddle) {
              currentActive = section.id;
              break;
            }
          } else {
            if (rect.top <= viewMiddle && rect.bottom >= viewMiddle) {
              currentActive = section.id;
              break;
            }
          }
        }
      }

      // Fallback to closest section if none are exactly centered
      if (!currentActive && detectedSections.length > 0) {
        let minDiff = Infinity;
        for (const section of detectedSections) {
          const el = document.getElementById(section.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const centerDiff = Math.abs(rect.top + rect.height / 2 - clientHeight / 2);
            if (centerDiff < minDiff) {
              minDiff = centerDiff;
              currentActive = section.id;
            }
          }
        }
      }

      if (currentActive && currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    const container = containerEl || containerRef.current || document.getElementById("layout-content");
    
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Trigger initial calculation
    const timer = setTimeout(handleScroll, 150);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [containerEl, detectedSections, activeSection]);

  const handleDotClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Horizontal Progress Bar */}
      <div
        id={`${id}-bar`}
        data-ui-id={`${id}-bar`}
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-hairline-soft/40 pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-vibrant-purple to-vibrant-purple-dark transition-all duration-100 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 8px var(--color-vibrant-purple-dark)" }}
        />
      </div>

      {/* Vertical Dots Navigation Column (Hover-expand drawer) */}
      {detectedSections.length > 0 && (
        <div
          id={`${id}-dots`}
          data-ui-id={`${id}-dots`}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center group/scroll-drawer transition-all duration-300 ease-out translate-x-[calc(100%-14px)] hover:translate-x-0 pr-3 pl-2 py-4"
        >
          {/* Edge Handle Indicator */}
          <div
            className="w-1.5 h-12 bg-vibrant-purple-dark/60 group-hover/scroll-drawer:bg-vibrant-purple-dark rounded-l-full shadow-xs transition-colors cursor-pointer mr-2 flex-shrink-0"
            title="Navigasi Seksi"
          />

          {/* Dots Drawer Panel */}
          <div className="flex flex-col items-center gap-3.5 bg-surface/95 dark:bg-surface-soft/95 backdrop-blur-md px-3 py-4 rounded-2xl border border-hairline shadow-xl select-none">
            {detectedSections.map((section) => {
              const isActive = section.id === activeSection;
              return (
                <div
                  key={section.id}
                  className="group relative flex items-center justify-center cursor-pointer py-0.5"
                  onClick={() => handleDotClick(section.id)}
                >
                  {/* Dot element */}
                  <div
                    id={`scroll-dot-${section.id}`}
                    data-ui-id={`scroll-dot-${section.id}`}
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-3 h-3 bg-vibrant-purple-dark scale-110 shadow-md ring-2 ring-vibrant-purple-dark/30"
                        : "w-1.5 h-1.5 bg-ink-muted/40 group-hover:bg-ink group-hover:scale-125"
                    }`}
                  />
                  {/* Tooltip */}
                  <div className="absolute right-8 px-2.5 py-1.5 rounded-sm bg-inverse text-ink-inverse text-xs font-semibold tracking-tight opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-md whitespace-nowrap border border-hairline-soft">
                    {section.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
