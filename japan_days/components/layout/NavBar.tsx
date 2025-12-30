"use client";

import { Menu } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type SectionId = "home" | "itinerary" | "shinkansen" | "destinations";

type Indicator = { left: number; width: number };

type Props = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  navRef: React.RefObject<HTMLElement | null>;
};

const LINKS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Inicio" },
  { id: "itinerary", label: "Itinerario" },
  { id: "shinkansen", label: "Shinkansen" },
  { id: "destinations", label: "Destinos" },
];

export function Navbar({ activeSection, onNavigate, navRef }: Props) {
  const navLinksRef = React.useRef<HTMLDivElement | null>(null);

  const btnRefs = React.useRef<Record<SectionId, HTMLButtonElement | null>>({
    home: null,
    itinerary: null,
    shinkansen: null,
    destinations: null,
  });

  const [indicator, setIndicator] = React.useState<Indicator>({ left: 0, width: 0 });

  // Mobile sheet open/close
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const updateIndicator = () => {
      const container = navLinksRef.current;
      const activeBtn = btnRefs.current[activeSection];
      if (!container || !activeBtn) return;

      setIndicator({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  const navBtn = (id: SectionId) =>
    `relative transition-colors hover:text-accent ${
      activeSection === id ? "text-foreground" : "text-muted-foreground"
    }`;

  const handleNavigate = (id: SectionId) => {
    // ✅ en mobile: cerramos sheet primero para que no “pelee” con el scroll
    setOpen(false);

    // micro delay para que cierre el Sheet y luego scrollee suave
    requestAnimationFrame(() => {
      onNavigate(id);
    });
  };

  return (
    <nav
      ref={navRef}
      className="bg-background/80 border-border fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇯🇵</span>
          <span className="font-mono text-sm tracking-wider">JAPAN 2026</span>
        </div>

        {/* Desktop links */}
        <div ref={navLinksRef} className="relative hidden gap-8 text-sm md:flex">
          <span
            aria-hidden="true"
            className="bg-accent absolute -bottom-2 h-[2px] rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
            }}
          />

          {LINKS.map((l) => (
            <button
              key={l.id}
              ref={(el) => {
                btnRefs.current[l.id] = el;
              }}
              onClick={() => onNavigate(l.id)}
              className={navBtn(l.id)}
              type="button"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span>🇯🇵</span>
                  <span className="font-mono text-sm tracking-wider">JAPAN 2026</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-2">
                {LINKS.map((l) => {
                  const isActive = activeSection === l.id;

                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleNavigate(l.id)}
                      className={[
                        "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                        isActive
                          ? "border-accent/40 bg-accent/10 text-foreground"
                          : "border-border bg-card hover:bg-accent/5 text-muted-foreground hover:text-foreground",
                      ].join(" ")}
                    >
                      <span>{l.label}</span>
                      {isActive ? <span className="text-xs">Activo</span> : null}
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
