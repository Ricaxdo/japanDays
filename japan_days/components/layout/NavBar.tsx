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

import { ThemeToggle } from "@/components/layout/ThemeToggle";

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

  const [indicator, setIndicator] = React.useState<Indicator>({
    left: 0,
    width: 0,
  });

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
    [
      "relative rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors",
      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
      activeSection === id ? "text-foreground" : "text-muted-foreground",
    ].join(" ");

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
      className={[
        "fixed top-0 right-0 left-0 z-40",
        // ✅ glass
        "border-border/50 bg-background/35 border-b backdrop-blur-xl",
        // ✅ suavecita sombra
        "shadow-[0_1px_0_0_hsl(var(--border)/0.25)]",
        // ✅ soporte extra blur en Safari (opcional)
        "[backdrop-filter:blur(16px)]",
      ].join(" ")}
    >
      {/* top glow */}
      <div
        aria-hidden="true"
        className="from-accent/10 via-accent/5 pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b to-transparent"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Left */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="group hover:bg-accent/5 flex items-center gap-2 rounded-full px-2 py-1 transition-colors"
        >
          <span className="text-foreground/90 group-hover:text-foreground font-mono text-sm tracking-wider">
            JAPAN 2026
          </span>
        </button>

        {/* Desktop links (glass pill) */}
        <div className="hidden md:flex">
          <div
            ref={navLinksRef}
            className={[
              "relative flex items-center gap-1",
              "border-border/60 bg-card/30 rounded-full border px-2 py-1.5",
              "shadow-sm backdrop-blur-xl",
            ].join(" ")}
          >
            {/* Indicator: pill sliding */}
            <span
              aria-hidden="true"
              className="bg-accent/15 ring-accent/20 absolute inset-y-1 rounded-full ring-1 transition-all duration-300 ease-out"
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left - 8}px)`,
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
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="border-border/50 bg-card/20 rounded-full border backdrop-blur-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-background/70 w-[280px] backdrop-blur-xl sm:w-[320px]"
            >
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
                        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all",
                        "bg-card/30 backdrop-blur-md",
                        isActive
                          ? "border-accent/40 bg-accent/10 text-foreground shadow-sm"
                          : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent/5",
                      ].join(" ")}
                    >
                      <span>{l.label}</span>
                      {isActive ? (
                        <span className="text-accent text-xs font-semibold">Activo</span>
                      ) : null}
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
