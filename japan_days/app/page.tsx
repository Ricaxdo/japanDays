"use client";

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

type SectionId = "home" | "itinerary" | "shinkansen" | "destinations";

export default function Page() {
  const [currentDay, setCurrentDay] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const navRef = useRef<HTMLElement | null>(null);

  const getNavOffset = () => {
    const h = navRef.current?.getBoundingClientRect().height ?? 0;
    return Math.ceil(h) + 4;
  };

  const scrollToId = (id: SectionId) => {
    if (typeof window === "undefined") return;

    const el = document.getElementById(id);
    if (!el) return;

    const offset = getNavOffset();
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset;

    smoothScrollTo(Math.max(0, targetY));
  };

  type Indicator = { left: number; width: number };

  const navLinksRef = useRef<HTMLDivElement | null>(null);

  const btnRefs = useRef<Record<SectionId, HTMLButtonElement | null>>({
    home: null,
    itinerary: null,
    shinkansen: null,
    destinations: null,
  });

  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0 });

  /* =========================
     Intersection Observer
  ========================= */

  useEffect(() => {
    const ids: SectionId[] = ["home", "itinerary", "shinkansen", "destinations"];
    const offset = getNavOffset();

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
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0.15, 0.3, 0.5],
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const container = navLinksRef.current;
      const activeBtn = btnRefs.current[activeSection];
      if (!container || !activeBtn) return;

      const left = activeBtn.offsetLeft;
      const width = activeBtn.offsetWidth;

      setIndicator({ left, width });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  const navBtn = (id: SectionId) =>
    `relative transition-colors hover:text-accent ${
      activeSection === id ? "text-foreground" : "text-muted-foreground"
    }`;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ProgressBar />

      {/* Navbar */}
      <nav
        ref={navRef}
        className="bg-background/80 border-border fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇯🇵</span>
            <span className="font-mono text-sm tracking-wider">JAPAN 2025</span>
          </div>

          <div ref={navLinksRef} className="relative hidden gap-8 text-sm md:flex">
            {/* Indicator */}
            <span
              aria-hidden="true"
              className="bg-accent absolute -bottom-2 h-[2px] rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`,
              }}
            />

            <button
              ref={(el) => {
                btnRefs.current.home = el;
              }}
              onClick={() => scrollToId("home")}
              className={navBtn("home")}
              type="button"
            >
              Inicio
            </button>

            <button
              ref={(el) => {
                btnRefs.current.itinerary = el;
              }}
              onClick={() => scrollToId("itinerary")}
              className={navBtn("itinerary")}
              type="button"
            >
              Itinerario
            </button>

            <button
              ref={(el) => {
                btnRefs.current.shinkansen = el;
              }}
              onClick={() => scrollToId("shinkansen")}
              className={navBtn("shinkansen")}
              type="button"
            >
              Shinkansen
            </button>

            <button
              ref={(el) => {
                btnRefs.current.destinations = el;
              }}
              onClick={() => scrollToId("destinations")}
              className={navBtn("destinations")}
              type="button"
            >
              Destinos
            </button>
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
