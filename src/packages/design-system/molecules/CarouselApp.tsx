import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TextApp } from "../atoms/TextApp";
import { BadgeApp } from "../atoms/BadgeApp";

export type CarouselEffect = "slide" | "fade";
export type CarouselDotsStyle = "dots" | "bars" | "numbers";
export type CarouselVariant = "default" | "card" | "hero" | "vibrant";

const carouselAppVariants = cva(
  "relative w-full overflow-hidden font-sans group transition-all duration-200 select-none",
  {
    variants: {
      variant: {
        default: "rounded-2xl border border-hairline-soft bg-surface shadow-xs",
        card: "rounded-2xl border border-hairline bg-surface-soft shadow-sm p-2",
        hero: "rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-md",
        vibrant: "rounded-2xl border border-vibrant-purple/20 bg-vibrant-purple/5 shadow-xs",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "2xl",
    },
  }
);

export interface CarouselSlide {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  badge?: string;
  content?: React.ReactNode;
}

export interface CarouselAppProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof carouselAppVariants> {
  id: string;
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  effect?: CarouselEffect;
  dotsStyle?: CarouselDotsStyle;
  showDots?: boolean;
  showArrows?: boolean;
  activeSlide?: number;
  onSlideChange?: (index: number) => void;
  className?: string;
}

export function CarouselApp({
  id,
  slides,
  autoPlay = false,
  autoPlayInterval = 4000,
  pauseOnHover = true,
  loop = true,
  effect = "slide",
  dotsStyle = "bars",
  showDots = true,
  showArrows = true,
  activeSlide,
  onSlideChange,
  variant = "default",
  rounded = "2xl",
  className,
  ...props
}: CarouselAppProps) {
  const [internalIndex, setInternalIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const currentIndex = activeSlide !== undefined ? activeSlide : internalIndex;

  const setSlideIndex = (index: number) => {
    if (activeSlide === undefined) {
      setInternalIndex(index);
    }
    onSlideChange?.(index);
  };

  const prevSlide = React.useCallback(() => {
    if (currentIndex === 0) {
      if (loop) setSlideIndex(slides.length - 1);
    } else {
      setSlideIndex(currentIndex - 1);
    }
  }, [currentIndex, loop, slides.length]);

  const nextSlide = React.useCallback(() => {
    if (currentIndex === slides.length - 1) {
      if (loop) setSlideIndex(0);
    } else {
      setSlideIndex(currentIndex + 1);
    }
  }, [currentIndex, loop, slides.length]);

  React.useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, slides.length, nextSlide]);

  if (!slides || slides.length === 0) return null;

  const isPrevDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === slides.length - 1;

  return (
    <div
      id={id}
      data-ui-id={id}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      className={cn(carouselAppVariants({ variant, rounded, className }), "group/carousel")}
      {...props}
    >
      {/* Slides Container */}
      {effect === "slide" ? (
        <div
          className="flex flex-nowrap transition-transform duration-500 ease-out will-change-transform"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(currentIndex / slides.length) * 100}%)`,
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              data-active={idx === currentIndex}
              className="min-h-[220px] md:min-h-[260px] flex flex-col justify-end p-6 relative bg-cover bg-center overflow-hidden shrink-0"
              style={{
                width: `${100 / slides.length}%`,
                backgroundImage: slide.image ? `url(${slide.image})` : undefined,
              }}
            >
              {slide.image && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent z-0" />
              )}
              <div className="relative z-10 space-y-2 text-left max-w-xl">
                {slide.badge && (
                  <BadgeApp id={`slide-badge-${slide.id}`} variant="solidPurple" size="sm" rounded="pill">
                    {slide.badge}
                  </BadgeApp>
                )}
                {slide.title && (
                  <TextApp
                    id={`slide-title-${slide.id}`}
                    variant="h4"
                    weight="bold"
                    className={cn(slide.image || variant === "hero" ? "text-white" : "text-ink")}
                  >
                    {slide.title}
                  </TextApp>
                )}
                {slide.description && (
                  <TextApp
                    id={`slide-desc-${slide.id}`}
                    variant="body"
                    className={cn("text-xs line-clamp-2", slide.image || variant === "hero" ? "text-slate-200" : "text-ink-secondary")}
                  >
                    {slide.description}
                  </TextApp>
                )}
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Fade effect: stack slides absolutely, crossfade */
        <div className="relative w-full min-h-[220px] md:min-h-[260px]">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                data-active={isActive}
                className={cn(
                  "absolute inset-0 flex flex-col justify-end p-6 bg-cover bg-center transition-opacity duration-500",
                  isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                )}
                style={{ backgroundImage: slide.image ? `url(${slide.image})` : undefined }}
              >
                {slide.image && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent z-0" />
                )}
                <div className="relative z-10 space-y-2 text-left max-w-xl">
                  {slide.badge && (
                    <BadgeApp id={`slide-badge-${slide.id}`} variant="solidPurple" size="sm" rounded="pill">
                      {slide.badge}
                    </BadgeApp>
                  )}
                  {slide.title && (
                    <TextApp
                      id={`slide-title-${slide.id}`}
                      variant="h4"
                      weight="bold"
                      className={cn(slide.image || variant === "hero" ? "text-white" : "text-ink")}
                    >
                      {slide.title}
                    </TextApp>
                  )}
                  {slide.description && (
                    <TextApp
                      id={`slide-desc-${slide.id}`}
                      variant="body"
                      className={cn("text-xs line-clamp-2", slide.image || variant === "hero" ? "text-slate-200" : "text-ink-secondary")}
                    >
                      {slide.description}
                    </TextApp>
                  )}
                  {slide.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            disabled={isPrevDisabled}
            onClick={prevSlide}
            aria-label="Previous Slide"
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-surface/85 hover:bg-surface text-ink backdrop-blur-md border border-hairline flex items-center justify-center shadow-md transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple",
              isPrevDisabled
                ? "opacity-30 cursor-not-allowed pointer-events-none"
                : "opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hover:scale-105"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            disabled={isNextDisabled}
            onClick={nextSlide}
            aria-label="Next Slide"
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-surface/85 hover:bg-surface text-ink backdrop-blur-md border border-hairline flex items-center justify-center shadow-md transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple",
              isNextDisabled
                ? "opacity-30 cursor-not-allowed pointer-events-none"
                : "opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hover:scale-105"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination Controls */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 shadow-sm">
          {dotsStyle === "numbers" ? (
            <span className="text-[11px] font-mono font-bold text-white px-1">
              {currentIndex + 1} / {slides.length}
            </span>
          ) : (
            slides.map((_, idx) => {
              const isActive = idx === currentIndex;

              if (dotsStyle === "dots") {
                return (
                  <button
                    key={`dot-${idx}`}
                    type="button"
                    data-active={isActive}
                    onClick={() => setSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={cn(
                      "rounded-full cursor-pointer outline-none border-0",
                      isActive
                        ? "w-3 h-3 bg-white ring-2 ring-white/40 scale-110 transition-all duration-300"
                        : "w-2 h-2 bg-white/30 hover:bg-white/60 transition-none"
                    )}
                  />
                );
              }

              // Bars style — ONLY active bar gets width transition; inactive snaps immediately
              return (
                <button
                  key={`bar-${idx}`}
                  type="button"
                  data-active={isActive}
                  onClick={() => setSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={cn(
                    "h-1.5 rounded-full cursor-pointer outline-none border-0",
                    isActive
                      ? "w-7 bg-white transition-[width] duration-300 ease-out"
                      : "w-1.5 bg-white/30 hover:bg-white/55 transition-none"
                  )}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
