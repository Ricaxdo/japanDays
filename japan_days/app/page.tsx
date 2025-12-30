"use client";

import { Navbar, type SectionId } from "@/components/layout/NavBar";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ItinerarySection } from "@/components/sections/itinerary/ItinerarySection";
import { ProgressBar } from "@/components/sections/ProgressBar";
import { ShinkansenSection } from "@/components/sections/ShinkansenSection";
import { destinations, itineraryDays } from "@/data/japan";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [currentDay, setCurrentDay] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const setVar = () => {
      const h = navRef.current?.getBoundingClientRect().height ?? 72;
      document.documentElement.style.setProperty("--nav-offset", `${h + 8}px`);
    };

    setVar();
    requestAnimationFrame(setVar); // 👈 asegura altura final

    window.addEventListener("resize", setVar);
    return () => window.removeEventListener("resize", setVar);
  }, []);

  const scrollToId = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveSection(id);

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ProgressBar />

      <Navbar navRef={navRef} activeSection={activeSection} onNavigate={scrollToId} />

      <section id="home">
        <HeroSection
          onScrollToItinerary={() => scrollToId("itinerary")}
          onScrollToDestinations={() => scrollToId("destinations")}
        />
      </section>

      <section id="itinerary">
        <ItinerarySection
          days={itineraryDays}
          currentDay={currentDay}
          onChangeDay={setCurrentDay}
        />
      </section>

      <section id="shinkansen">
        <ShinkansenSection />
      </section>

      <section id="destinations">
        <DestinationsSection destinations={destinations} />
      </section>

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
