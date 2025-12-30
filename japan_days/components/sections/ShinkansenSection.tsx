import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Train, TrendingDown } from "lucide-react";

export function ShinkansenSection() {
  return (
    <section
      id="shinkansen"
      className="bg-muted/30 relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="bg-accent/5 absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute -right-40 -bottom-40 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14 lg:mb-16">
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
            Analizamos si el JR Pass realmente conviene… y esta vez, no.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2">
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

              <ul className="text-muted-foreground space-y-3.5 text-sm sm:text-base">
                <li className="flex gap-3">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Los trayectos largos están concentrados en pocos días</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>
                    Day trips como Kawaguchiko y Shirakawa-go no están bien cubiertos
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Metro y trenes privados no están incluidos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>
                    El costo del pase supera el gasto real en trenes individuales
                  </span>
                </li>
              </ul>
            </div>
          </Card>

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
                  <span className="text-accent mt-0.5">•</span>
                  <span>Shinkansen individuales solo cuando se necesitan</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent mt-0.5">•</span>
                  <span>IC Card (Suica / Pasmo) para metro y transporte diario</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Buses locales para zonas rurales</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Más flexibilidad y menor costo total</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="group border-border bg-card relative overflow-hidden p-6 backdrop-blur-sm sm:p-8 md:col-span-2">
            <div className="from-accent/5 to-destructive/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-40" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-accent/10 rounded-full p-3">
                  <TrendingDown className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-foreground text-xl font-bold sm:text-2xl">
                  Resumen de costos
                </h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border-border bg-muted/50 hover:bg-muted rounded-xl border p-6 transition-colors">
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">
                    JR Pass 14 días
                  </p>
                  <p className="text-destructive text-2xl font-bold sm:text-3xl">
                    ¥47,250
                  </p>
                </div>
                <div className="border-border bg-muted/50 hover:bg-muted rounded-xl border p-6 transition-colors">
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">
                    Trenes individuales
                  </p>
                  <p className="text-accent text-2xl font-bold sm:text-3xl">¥38,000</p>
                </div>
                <div className="border-accent/20 bg-accent/10 rounded-xl border p-6 sm:col-span-2 lg:col-span-1">
                  <p className="text-accent mb-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">
                    Conclusión
                  </p>
                  <p className="text-foreground text-base font-semibold sm:text-lg">
                    Ahorro + flexibilidad + mejor experiencia
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
