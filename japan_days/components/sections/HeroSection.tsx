"use client";

import { SakuraPetals } from "@/components/effects/SakuraPetals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";

type Props = {
  onScrollToItinerary: () => void;
  onScrollToDestinations: () => void;
};

const MEMBERS = [
  "Rixi",
  "Claudia",
  "Xavi",
  "Gonzalo",
  "Isis",
  "Chaton",
  "Naho",
  "Liz",
  "Negro",
];

export function HeroSection({ onScrollToItinerary, onScrollToDestinations }: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-[var(--nav-offset)]">
      <SakuraPetals className="opacity-70" />
      {/* 🌈 Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="from-accent/20 via-accent/10 absolute inset-0 bg-gradient-to-br to-transparent" />
        <div className="bg-accent/20 absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute -right-40 -bottom-40 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 📅 Date badge */}
        <div className="mb-8 flex justify-center">
          <Badge
            variant="outline"
            className="border-accent/30 bg-accent/10 px-4 py-2 font-mono text-xs tracking-wide sm:text-sm"
          >
            <Calendar className="mr-2 h-4 w-4" />
            28 Feb — 13 Mar 2026
          </Badge>
        </div>

        {/* 🗻 Headline */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-7xl lg:text-8xl">
          Viaje a{" "}
          <span className="text-accent relative">
            Japón
            <span className="bg-accent absolute -bottom-1 left-0 h-1 w-full rounded-full opacity-40" />
          </span>
        </h1>

        {/* ✍️ Subheadline */}
        <p className="text-muted-foreground mx-auto mb-10 max-w-3xl text-base text-balance sm:mb-12 sm:text-lg md:text-2xl">
          14 días de puro despapaye, drogas, y hentai
        </p>

        {/* 🔘 CTAs */}
        <div className="mb-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="px-8 text-base sm:text-lg"
            onClick={onScrollToItinerary}
          >
            Ver Itinerario
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-transparent px-8 text-base sm:text-lg"
            onClick={onScrollToDestinations}
          >
            Explorar Destinos
          </Button>
        </div>

        {/* 👥 Group card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="border-border/50 bg-card/60 mx-auto max-w-3xl rounded-2xl border p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold">
            <Users className="text-accent h-4 w-4" />
            Integrantes del viaje
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {MEMBERS.map((name) => (
              <span
                key={name}
                className="bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent rounded-full px-3 py-1.5 text-sm transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
