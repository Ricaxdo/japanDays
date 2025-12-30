import { Card } from "@/components/ui/card";
import { MapPin, Train } from "lucide-react";

export function ShinkansenSection() {
  return (
    <section id="shinkansen" className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <Train className="text-accent h-8 w-8" />
            <h2 className="text-5xl font-bold">Shinkansen</h2>
          </div>
          <p className="text-muted-foreground text-lg text-balance">
            El legendario tren bala japonés
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <Card className="bg-card border-border p-8">
            <h3 className="mb-4 text-2xl font-bold">JR Pass</h3>
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
                  <div className="bg-accent mt-2 h-2 w-2 rounded-full" />
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

          <Card className="bg-card border-border p-8">
            <h3 className="mb-4 text-2xl font-bold">Nuestra Ruta</h3>
            <div className="text-muted-foreground space-y-3">
              {[
                "Tokio → Osaka (2.5h)",
                "Osaka → Kioto (15 min)",
                "Kioto → Takayama (tren escénico)",
                "Takayama → Tokio (vía Shirakawa-go)",
                "Day trips: Nagano & Kawaguchiko",
              ].map((route) => (
                <div key={route} className="flex items-center gap-3">
                  <MapPin className="text-accent h-5 w-5" />
                  <span>{route}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-8 md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">Información Útil</h3>
            <div className="text-muted-foreground grid gap-6 sm:grid-cols-3">
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
