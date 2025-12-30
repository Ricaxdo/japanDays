"use client";

import { Navbar, type SectionId } from "@/components/layout/NavBar";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ItinerarySection } from "@/components/sections/itinerary/ItinerarySection";
import { ProgressBar } from "@/components/sections/ProgressBar";
import { ShinkansenSection } from "@/components/sections/ShinkansenSection";
import { destinations, itineraryDays } from "@/data/japan";
import { useEffect, useRef, useState } from "react";

/* =========================
   Smooth scroll helpers
========================= */

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let activeRaf: number | null = null;

function smoothScrollTo(targetY: number, duration = 1100) {
  if (activeRaf) cancelAnimationFrame(activeRaf);

  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const cancel = () => {
    if (activeRaf) cancelAnimationFrame(activeRaf);
    activeRaf = null;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      cancel();
    }
  }

  activeRaf = requestAnimationFrame(step);
}

/* =========================
   Page
========================= */

export default function Page() {
  const [currentDay, setCurrentDay] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const navRef = useRef<HTMLElement | null>(null);

  const getNavOffset = () => {
    const h = navRef.current?.getBoundingClientRect().height ?? 0;
    return Math.ceil(h) + 4;
  };

  // ✅ important: mantenemos un CSS var con el offset real del navbar
  useEffect(() => {
    const setVar = () => {
      const offset = getNavOffset();
      document.documentElement.style.setProperty("--nav-offset", `${offset}px`);
    };

    setVar();
    window.addEventListener("resize", setVar);
    return () => window.removeEventListener("resize", setVar);
  }, []);

  const scrollToId = (id: SectionId) => {
    if (typeof window === "undefined") return;

    const el = document.getElementById(id);
    if (!el) return;

    // ✅ fuerza recalcular con el offset actualizado
    const offset = getNavOffset();
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset;

    // ✅ opcional: setActiveSection inmediato para que el indicator responda al click
    setActiveSection(id);

    smoothScrollTo(Math.max(0, targetY));
  };

  /* =========================
     Intersection Observer
  ========================= */
  useEffect(() => {
    const ids: SectionId[] = ["home", "itinerary", "shinkansen", "destinations"];

    const getRootMargin = () => {
      const offset = getNavOffset();
      return `-${offset}px 0px -55% 0px`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      {
        root: null,
        rootMargin: getRootMargin(),
        threshold: [0.15, 0.3, 0.5],
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ✅ si cambia el nav height (fonts/resize), re-creamos observer con rootMargin nuevo
    const onResize = () => {
      observer.disconnect();
      const next = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

          if (visible?.target?.id) {
            setActiveSection(visible.target.id as SectionId);
          }
        },
        {
          root: null,
          rootMargin: getRootMargin(),
          threshold: [0.15, 0.3, 0.5],
        },
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) next.observe(el);
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ProgressBar />

      <Navbar navRef={navRef} activeSection={activeSection} onNavigate={scrollToId} />

      {/* ✅ IMPORTANT: envolver con sections con id reales */}
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
