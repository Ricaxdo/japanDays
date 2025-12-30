"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type Props = {
  onScrollToItinerary: () => void;
  onScrollToDestinations: () => void;
};

export function HeroSection({ onScrollToItinerary, onScrollToDestinations }: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-[var(--nav-offset)]">
      {/* background */}
      <div className="absolute inset-0 opacity-20">
        <div className="from-accent/20 absolute inset-0 bg-gradient-to-br to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="bg-accent/10 border-accent/20 animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2">
          <Calendar className="h-4 w-4" />
          <span className="font-mono text-xs tracking-wide sm:text-sm">
            28 Feb — 13 Mar 2025
          </span>
        </div>

        <h1 className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-7xl lg:text-8xl">
          Viaje a <span className="text-accent">Japón</span>
        </h1>

        <p
          className="text-muted-foreground animate-fade-in-up mb-10 text-base text-balance sm:mb-12 sm:text-lg md:text-2xl"
          style={{ animationDelay: "0.1s" }}
        >
          14 días explorando la tierra del sol naciente. De los neones de Osaka a los
          templos de Kioto, de las aldeas tradicionales al Monte Fuji.
        </p>

        <div
          className="animate-fade-in-up flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            size="lg"
            className="text-base sm:text-lg"
            onClick={onScrollToItinerary}
          >
            Ver Itinerario
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-base sm:text-lg"
            onClick={onScrollToDestinations}
          >
            Explorar Destinos
          </Button>
        </div>
      </div>
    </section>
  );
}
