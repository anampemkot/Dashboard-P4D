import * as React from "react";
import { CarouselApp, TextApp, CarouselSlide } from "@/packages/design-system";
import { GalleryHorizontal } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

const imageSlides: CarouselSlide[] = [
  { id: "s1", title: "Malioboro", description: "Kawasan pusat ekonomi & pariwisata Kota Yogyakarta.", badge: "Wisata" },
  { id: "s2", title: "Tugu Yogyakarta", description: "Landmark ikonik penanda batas kota.", badge: "Landmark" },
  { id: "s3", title: "Keraton Yogyakarta", description: "Pusat pemerintahan & budaya Kesultanan.", badge: "Budaya" },
];

const cardSlides: CarouselSlide[] = [
  { id: "c1", title: "Penerimaan PBB-P2", description: "Rp 12,4 M bulan ini, naik 8% dari target.", badge: "PBB-P2" },
  { id: "c2", title: "Penerimaan BPHTB", description: "Rp 8,1 M bulan ini, sesuai target triwulan.", badge: "BPHTB" },
  { id: "c3", title: "Penerimaan Reklame", description: "Rp 950 Jt bulan ini, perlu pengawasan lapangan.", badge: "Reklame" },
];

export function CarouselDisplayModule() {
  const [paused, setPaused] = React.useState(false);

  return (
    <ModuleCard
      id="uikit-carousel-module"
      icon={<GalleryHorizontal className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CarouselApp"
      description="Karusel image, card, dan auto-play dengan navigation arrows, pagination dots, efek slide/fade, serta interval otomatis dengan pause on hover."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="carousel-showcase-image"
          title="Image Variant (Slide Effect)"
          description="Panah navigasi, dot pagination, transisi slide"
          className="md:col-span-2"
          code={`<CarouselApp id="carousel" slides={slides} variant="hero" effect="slide" dotsStyle="dots" showArrows showDots />`}
        >
          <CarouselApp id="carousel-image" slides={imageSlides} variant="hero" effect="slide" dotsStyle="dots" showArrows showDots />
        </ShowcaseCard>

        <ShowcaseCard
          id="carousel-showcase-card"
          title="Card Variant (Fade Effect)"
          description="Efek transisi fade, dot pagination bergaya bars"
          className="md:col-span-2"
          code={`<CarouselApp id="carousel" slides={slides} variant="card" effect="fade" dotsStyle="bars" showArrows showDots />`}
        >
          <CarouselApp id="carousel-card" slides={cardSlides} variant="card" effect="fade" dotsStyle="bars" showArrows showDots />
        </ShowcaseCard>

        <ShowcaseCard
          id="carousel-showcase-autoplay"
          title="Auto-play (Interval & Pause on Hover)"
          description="Berputar tiap 2.5 detik, berhenti saat kursor di atas karusel"
          className="md:col-span-2"
          code={`<CarouselApp id="carousel" slides={slides} variant="vibrant" autoPlay autoPlayInterval={2500} pauseOnHover dotsStyle="numbers" />`}
        >
          <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <CarouselApp id="carousel-autoplay" slides={imageSlides} variant="vibrant" autoPlay autoPlayInterval={2500} pauseOnHover dotsStyle="numbers" />
            <TextApp id="carousel-autoplay-hint" variant="micro" className="mt-2 text-center text-ink-muted">
              {paused ? "Auto-play dijeda (mouse di atas karusel)" : "Auto-play aktif — arahkan mouse ke karusel untuk menjeda"}
            </TextApp>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
