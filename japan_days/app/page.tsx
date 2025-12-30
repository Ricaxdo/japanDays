"use client";

import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ItinerarySection } from "@/components/sections/ItinerarySection";
import { ProgressBar } from "@/components/sections/ProgressBar";
import { ShinkansenSection } from "@/components/sections/ShinkansenSection";
import { destinations, itineraryDays } from "@/data/japan";
import { useEffect, useState } from "react";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Page() {
  const [currentDay, setCurrentDay] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextDay = () => setCurrentDay((d) => Math.min(d + 1, itineraryDays.length - 1));
  const prevDay = () => setCurrentDay((d) => Math.max(d - 1, 0));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ProgressBar />

      {/* Navbar (igual que antes, la puedes extraer luego si quieres) */}
      <nav className="bg-background/80 border-border fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇯🇵</span>
            <span className="font-mono text-sm tracking-wider">JAPAN 2025</span>
          </div>
          <div className="hidden gap-8 text-sm md:flex">
            <a href="#home" className="hover:text-accent transition-colors">
              Inicio
            </a>
            <a href="#itinerary" className="hover:text-accent transition-colors">
              Itinerario
            </a>
            <a href="#shinkansen" className="hover:text-accent transition-colors">
              Shinkansen
            </a>
            <a href="#destinations" className="hover:text-accent transition-colors">
              Destinos
            </a>
          </div>
        </div>
      </nav>

      <HeroSection
        onScrollToItinerary={() => scrollToId("itinerary")}
        onScrollToDestinations={() => scrollToId("destinations")}
      />

      <ItinerarySection
        days={itineraryDays}
        currentDay={currentDay}
        onChangeDay={setCurrentDay}
        onPrev={prevDay}
        onNext={nextDay}
      />

      <ShinkansenSection />

      <DestinationsSection destinations={destinations} />

      <footer className="border-border border-t px-6 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-3xl">🇯🇵</span>
            <span className="font-mono text-lg">JAPAN 2025</span>
          </div>
          <p className="text-muted-foreground text-sm">
            28 de febrero — 13 de marzo, 2025
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            Una aventura inolvidable por la tierra del sol naciente
          </p>
        </div>
      </footer>
    </div>
  );
}
