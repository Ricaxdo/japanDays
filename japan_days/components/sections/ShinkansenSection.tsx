import { Card } from "@/components/ui/card";
import { MapPin, Train } from "lucide-react";

export function ShinkansenSection() {
  return (
    <section id="shinkansen" className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14 lg:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 sm:mb-4">
            <Train className="text-accent h-6 w-6 sm:h-8 sm:w-8" />
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Shinkansen</h2>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base text-balance sm:text-lg">
            El legendario tren bala japonés
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 md:grid-cols-2">
          <Card className="bg-card border-border p-5 sm:p-8">
            <h3 className="mb-4 text-xl font-bold sm:text-2xl">JR Pass</h3>
            <div className="text-muted-foreground space-y-4">
              {[
                {
                  label: "7 días",
                  price: "¥29,650",
                  desc: "Viajes ilimitados en JR durante 7 días",
                },
                {
                  label: "14 días",
                  price: "¥47,250",
                  desc: "Viajes ilimitados en JR durante 14 días",
                },
                {
                  label: "21 días",
                  price: "¥60,450",
                  desc: "Viajes ilimitados en JR durante 21 días",
                },
              ].map((x) => (
                <div key={x.label} className="flex items-start gap-3">
                  <div className="bg-accent mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <div>
                    <p className="text-foreground font-semibold">
                      {x.label}: {x.price}
                    </p>
                    <p className="text-sm">{x.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-5 sm:p-8">
            <h3 className="mb-4 text-xl font-bold sm:text-2xl">Nuestra Ruta</h3>
            <div className="text-muted-foreground space-y-3">
              {[
                "Tokio → Osaka (2.5h)",
                "Osaka → Kioto (15 min)",
                "Kioto → Takayama (tren escénico)",
                "Takayama → Tokio (vía Shirakawa-go)",
                "Day trips: Nagano & Kawaguchiko",
              ].map((route) => (
                <div key={route} className="flex items-start gap-3">
                  <MapPin className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-sm sm:text-base">{route}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-5 sm:p-8 md:col-span-2">
            <h3 className="mb-4 text-xl font-bold sm:text-2xl">Información Útil</h3>

            <div className="text-muted-foreground grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <p className="text-foreground mb-2 font-semibold">Velocidad Máxima</p>
                <p className="text-sm">320 km/h en línea Tokaido</p>
              </div>
              <div>
                <p className="text-foreground mb-2 font-semibold">Puntualidad</p>
                <p className="text-sm">Promedio de retraso: 0.9 minutos</p>
              </div>
              <div>
                <p className="text-foreground mb-2 font-semibold">Comodidad</p>
                <p className="text-sm">Asientos reclinables, WiFi, enchufes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
