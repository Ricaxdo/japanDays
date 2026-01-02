"use client";

import { SakuraPetals } from "@/components/effects/SakuraPetals";
import { Navbar, type SectionId } from "@/components/layout/NavBar";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ItinerarySection } from "@/components/sections/itinerary/ItinerarySection";
import { ProgressBar } from "@/components/sections/ProgressBar";
import { ShinkansenSection } from "@/components/sections/shinkansen/ShinkansenSection";
import { destinations, itineraryDays } from "@/data/japan";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [currentDay, setCurrentDay] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const navRef = useRef<HTMLElement | null>(null);

  // ✅ Lock para evitar “saltos” del indicador durante scroll programático
  const programmaticScrollRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);

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

    setNavOffset();
    setFixedVh();

    requestAnimationFrame(() => {
      setNavOffset();
      setFixedVh();
    });

    const ro = new ResizeObserver(() => setNavOffset());
    if (navRef.current) ro.observe(navRef.current);

    window.addEventListener("orientationchange", setFixedVh);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", setFixedVh);
    };
  }, []);

  // ✅ 3) ScrollSpy (IntersectionObserver) para scroll manual
  useEffect(() => {
    const ids: SectionId[] = ["home", "itinerary", "shinkansen", "destinations"];

    const getNavOffset = () =>
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--nav-offset")
          .replace("px", ""),
      ) || 72;

    let rafId: number | null = null;
    let obs: IntersectionObserver | null = null;

    const setup = () => {
      obs?.disconnect();

      const nav = getNavOffset();

      obs = new IntersectionObserver(
        (entries) => {
          if (rafId) cancelAnimationFrame(rafId);

          rafId = requestAnimationFrame(() => {
            // ✅ si estamos haciendo scroll programático, NO actualices activeSection
            if (programmaticScrollRef.current) return;

            const visible = entries
              .filter((e) => e.isIntersecting)
              .map((e) => ({
                id: e.target.id as SectionId,
                ratio: e.intersectionRatio,
                top: (e.target as HTMLElement).getBoundingClientRect().top,
              }));

            if (!visible.length) return;

            visible.sort((a, b) => {
              const aDist = Math.abs(a.top - nav);
              const bDist = Math.abs(b.top - nav);
              if (aDist !== bDist) return aDist - bDist;
              return b.ratio - a.ratio;
            });

            const next = visible[0]?.id;
            if (next) setActiveSection(next);
          });
        },
        {
          root: null,
          rootMargin: `-${nav}px 0px -55% 0px`,
          threshold: [0.05, 0.15, 0.3, 0.5, 0.75],
        },
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs!.observe(el);
      });
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setup);
      obs?.disconnect();
    };
  }, []);

  // ✅ Limpia timers
  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
    };
  }, []);

  const scrollToId = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    // ✅ 1) lock scrollspy para que no brinque por secciones intermedias
    programmaticScrollRef.current = true;

    // ✅ set inmediato (indicator se queda en el destino)
    setActiveSection(id);

    const navOffset =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--nav-offset")
          .replace("px", ""),
      ) || 72;

    const EXTRA_OFFSET = 10;

    const y = el.getBoundingClientRect().top + window.scrollY - navOffset + EXTRA_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });

    // ✅ 2) desbloquea cuando termina el smooth scroll (detector)
    if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);

    let lastY = window.scrollY;
    let stillFrames = 0;

    const tick = () => {
      const nowY = window.scrollY;

      if (Math.abs(nowY - lastY) < 1) stillFrames += 1;
      else stillFrames = 0;

      lastY = nowY;

      // ~10 frames quietos => terminó
      if (stillFrames >= 10) {
        programmaticScrollRef.current = false;
        return;
      }

      unlockTimerRef.current = window.setTimeout(tick, 16);
    };

    tick();
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
