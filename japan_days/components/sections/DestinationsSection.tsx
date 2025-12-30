import { Card } from "@/components/ui/card";
import type { Destination } from "@/data/japan";
import Image from "next/image";

type Props = { destinations: Destination[] };

export function DestinationsSection({ destinations }: Props) {
  return (
    <section id="destinations" className="px-4 py-10 sm:px-6 sm:py-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-center sm:mb-5 lg:mb-5">
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">Destinos</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base text-balance sm:text-lg">
            Las ciudades y lugares que visitaremos en nuestra aventura
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <Card
              key={d.city}
              className="group bg-card border-border hover:border-accent overflow-hidden transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden sm:h-56">
                <Image
                  src={d.image || "/placeholder.svg"}
                  alt={d.city}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="from-background absolute inset-0 bg-gradient-to-t to-transparent opacity-60" />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="mb-2 text-xl font-bold sm:text-2xl">{d.city}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {d.description}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Atracciones destacadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {d.attractions.map((a) => (
                      <span
                        key={a}
                        className="bg-accent/10 text-accent border-accent/20 rounded-full border px-3 py-1 text-xs"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
