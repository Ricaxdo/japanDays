"use client";

import { SakuraPetals } from "@/components/effects/SakuraPetals";
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

  // ✅ 1) Evita que el browser/Next restaure el scroll + fuerza top al montar
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // ✅ 2) Variables CSS: nav offset (dinámico) + vh fijo (solo orientación)
  useEffect(() => {
    const setNavOffset = () => {
      const h = navRef.current?.getBoundingClientRect().height ?? 72;
      document.documentElement.style.setProperty("--nav-offset", `${h + 8}px`);
    };

    const setFixedVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh-fixed", `${vh}px`);
    };

    // Inicial
    setNavOffset();
    setFixedVh();

    // Asegura medición tras layout/fonts
    requestAnimationFrame(() => {
      setNavOffset();
      setFixedVh();
    });

    // Observa cambios reales del navbar (más estable que resize)
    const ro = new ResizeObserver(() => setNavOffset());
    if (navRef.current) ro.observe(navRef.current);

    // vh fijo solo cambia si rota
    window.addEventListener("orientationchange", setFixedVh);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", setFixedVh);
    };
  }, []);

  const scrollToId = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveSection(id);

    const navOffset =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--nav-offset")
          .replace("px", ""),
      ) || 72;

    const EXTRA_OFFSET = 10;

    const y = el.getBoundingClientRect().top + window.scrollY - navOffset + EXTRA_OFFSET;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SakuraPetals className="fixed inset-0 z-10 opacity-40" />

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
            <span className="font-mono text-lg">JAPAN 2026</span>
          </div>
          <p className="text-muted-foreground text-sm">
            28 de febrero — 13 de marzo, 2026
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            Una aventura inolvidable por la tierra del sol naciente
          </p>
        </div>
      </footer>
    </div>
  );
}
