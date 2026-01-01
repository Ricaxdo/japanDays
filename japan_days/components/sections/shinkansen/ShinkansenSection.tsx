"use client";

import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  MinusCircle,
  PlusCircle,
  Train,
  TrendingDown,
} from "lucide-react";

import {
  TrainBreakdownDialog,
  type LineItem,
} from "@/components/sections/shinkansen/TrainBreakdownDialog";

/* =========================
   DATA / CONSTANTS
========================= */

const JR_PASS_7 = 50000;

const TOKYO_OSAKA = 13800;
const OSAKA_KYOTO = 580;
const KYOTO_TAKAYAMA = 7000;
const KANAZAWA_TOKYO = 14000;
const TOKYO_NAGANO_RT = 17000;

const INDIVIDUAL_TRAINS =
  TOKYO_OSAKA + OSAKA_KYOTO + KYOTO_TAKAYAMA + KANAZAWA_TOKYO + TOKYO_NAGANO_RT;

const NON_JR_EXTRAS = 12000;

const INDIVIDUAL_TOTAL = INDIVIDUAL_TRAINS + NON_JR_EXTRAS;

/* =========================
   BREAKDOWN (SEPARADO)
========================= */

const JR_BREAKDOWN: LineItem[] = [
  {
    label: "Tokyo → Osaka (Shinkansen)",
    value: TOKYO_OSAKA,
    note: "Hikari/Kodama (JR Pass cubre Hikari).",
  },
  { label: "Osaka → Kyoto (JR local)", value: OSAKA_KYOTO },
  {
    label: "Kyoto → Takayama (via Nagoya + Ltd. Express)",
    value: KYOTO_TAKAYAMA,
    note: "Hida / conexiones (estimado).",
  },
  { label: "Kanazawa → Tokyo (Hokuriku Shinkansen)", value: KANAZAWA_TOKYO },
  {
    label: "Tokyo ↔ Nagano (Shinkansen RT)",
    value: TOKYO_NAGANO_RT,
    note: "Ida y vuelta aprox.",
  },
];

const NON_JR_BREAKDOWN: LineItem[] = [
  {
    label: "Metro/urbano (Tokio/Osaka/Kioto)",
    value: 7000,
    note: "IC Card (varios días).",
  },
  {
    label: "Bus: Takayama → Shirakawa-go → Kanazawa",
    value: 3600,
    note: "No es JR.",
  },
  {
    label: "Fuji / Kawaguchiko (bus/privado)",
    value: 1400,
    note: "Varía por ruta/operador.",
  },
];

export function ShinkansenSection() {
  return (
    <section
      id="shinkansen"
      className="bg-muted/30 relative overflow-hidden px-4 py-10 sm:px-6 sm:py-10 lg:py-10"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden opacity-50" aria-hidden="true">
        <div className="bg-accent/5 absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute -right-40 -bottom-40 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-3 text-center sm:mb-5 lg:mb-5">
          <div className="border-accent/20 bg-accent/10 mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-sm">
            <Train className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase sm:text-sm">
              Análisis de Transporte
            </span>
          </div>

          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
            Transporte en Japón
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-base text-balance sm:text-lg">
            Con Nagano en Shinkansen y sin Hiroshima
          </p>

          <p className="text-muted-foreground/80 mx-auto mt-3 max-w-3xl text-xs sm:text-sm">
            Trenes (JR/Shinkansen) estimados:{" "}
            <span className="text-foreground font-semibold">
              ~¥{INDIVIDUAL_TRAINS.toLocaleString("en-US")}
            </span>{" "}
            + extras urbanos/buses aprox{" "}
            <span className="text-foreground font-semibold">
              ~¥{NON_JR_EXTRAS.toLocaleString("en-US")}
            </span>{" "}
            = total viaje{" "}
            <span className="text-foreground font-semibold">
              ~¥{INDIVIDUAL_TOTAL.toLocaleString("en-US")}
            </span>
            .
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2">
          {/* ❌ No JR Pass */}
          <Card className="group border-destructive/30 bg-card hover:border-destructive/50 relative overflow-hidden p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg sm:p-8">
            <div className="from-destructive/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-destructive/10 rounded-full p-3">
                  <AlertTriangle className="text-destructive h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-foreground text-xl font-bold sm:text-2xl">
                  ¿Por qué NO usamos JR Pass?
                </h3>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <div className="border-border bg-muted/40 rounded-xl border p-4">
                  <p className="text-foreground mb-2 text-sm font-semibold">
                    ✅ Sí cubre
                  </p>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex gap-2">
                      <MinusCircle className="text-muted-foreground mt-0.5 h-4 w-4 opacity-70" />
                      <span>Shinkansen (Hikari/Kodama) y JR intercity</span>
                    </li>
                    <li className="flex gap-2">
                      <MinusCircle className="text-muted-foreground mt-0.5 h-4 w-4 opacity-70" />
                      <span>Algunos tramos JR locales</span>
                    </li>
                  </ul>
                </div>

                <div className="border-destructive/20 bg-destructive/5 rounded-xl border p-4">
                  <p className="text-foreground mb-2 text-sm font-semibold">
                    ❌ No cubre bien
                  </p>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex gap-2">
                      <MinusCircle className="text-destructive mt-0.5 h-4 w-4 opacity-80" />
                      <span>Metro y líneas privadas (Tokio/Osaka/Kioto)</span>
                    </li>
                    <li className="flex gap-2">
                      <MinusCircle className="text-destructive mt-0.5 h-4 w-4 opacity-80" />
                      <span>Buses a Shirakawa-go y acceso a Fuji</span>
                    </li>
                  </ul>
                </div>
              </div>

              <ul className="text-muted-foreground space-y-3.5 text-sm sm:text-base">
                <li className="flex gap-3">
                  <MinusCircle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Aunque Nagano sea Shinkansen, tus “días caros” son pocos para
                    amortizar el pase
                  </span>
                </li>
                <li className="flex gap-3">
                  <MinusCircle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
                  <span>Parte clave del plan usa buses/privados (Shirakawa-go/Fuji)</span>
                </li>
                <li className="flex gap-3">
                  <MinusCircle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    El pase termina siendo más caro que pagar tramos específicos
                  </span>
                </li>
              </ul>
            </div>
          </Card>

          {/* ✅ Mejor alternativa */}
          <Card className="group border-accent/30 bg-card hover:border-accent/50 relative overflow-hidden p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg sm:p-8">
            <div className="from-accent/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-accent/10 rounded-full p-3">
                  <CheckCircle className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-foreground text-xl font-bold sm:text-2xl">
                  Nuestra mejor alternativa
                </h3>
              </div>

              <ul className="text-muted-foreground space-y-3.5 text-sm sm:text-base">
                <li className="flex gap-3">
                  <PlusCircle className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                  <span>Shinkansen individual: Tokio → Osaka</span>
                </li>
                <li className="flex gap-3">
                  <PlusCircle className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                  <span>Takayama/Kanazawa: mezcla tren + bus (lo más práctico)</span>
                </li>
                <li className="flex gap-3">
                  <PlusCircle className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                  <span>Nagano en Shinkansen (mejor experiencia/tiempo)</span>
                </li>
                <li className="flex gap-3">
                  <PlusCircle className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                  <span>IC Card para metro + buses/tours cuando toque</span>
                </li>
              </ul>

              <div className="border-accent/20 bg-accent/5 mt-6 rounded-xl border p-4">
                <p className="text-foreground text-sm font-semibold">Tip rápido</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Compra Shinkansen en los días clave y usa IC Card para todo lo urbano.
                  Es la combinación más barata y flexible.
                </p>
              </div>
            </div>
          </Card>

          {/* 📊 Resumen de costos */}
          <Card className="group border-border bg-card relative overflow-hidden p-6 backdrop-blur-sm sm:p-8 md:col-span-2">
            <div className="from-accent/5 to-destructive/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-40" />
            <div className="relative">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 rounded-full p-3">
                    <TrendingDown className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-foreground text-xl font-bold sm:text-2xl">
                    Resumen de costos
                  </h3>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border-border bg-muted/50 hover:bg-muted rounded-xl border p-6 transition-colors">
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">
                    JR Pass 7 días
                  </p>
                  <p className="text-destructive text-2xl font-bold sm:text-3xl">
                    ¥{JR_PASS_7.toLocaleString("en-US")}
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    *Aún pagarías metro + buses aparte
                  </p>
                </div>

                {/* ✅ Card clickeable + modal */}
                <TrainBreakdownDialog
                  totalJr={INDIVIDUAL_TRAINS}
                  totalNonJr={NON_JR_EXTRAS}
                  itemsJr={JR_BREAKDOWN}
                  itemsNonJr={NON_JR_BREAKDOWN}
                />

                <div className="border-accent/20 bg-accent/10 rounded-xl border p-6 sm:col-span-2 lg:col-span-1">
                  <p className="text-accent mb-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">
                    Conclusión
                  </p>
                  <p className="text-foreground text-base font-semibold sm:text-lg">
                    Mejor individual + IC Card
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Pagas solo lo necesario y el resto (metro/buses) igual lo ibas a
                    pagar.
                  </p>
                </div>
              </div>

              <div className="border-border bg-muted/40 mt-6 rounded-xl border p-4">
                <p className="text-foreground text-sm font-semibold">Nota honesta</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  El total del viaje suele ser trenes (~¥
                  {INDIVIDUAL_TRAINS.toLocaleString("en-US")}) + extras (~¥
                  {NON_JR_EXTRAS.toLocaleString("en-US")}) ≈{" "}
                  <span className="text-foreground font-semibold">
                    ¥{INDIVIDUAL_TOTAL.toLocaleString("en-US")}
                  </span>
                  . Con JR Pass aún sumarías extras, así que el pase no se amortiza en
                  este plan.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
