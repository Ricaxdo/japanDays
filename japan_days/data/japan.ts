export type ItineraryDay = {
  day: number;
  date: string;
  location: string;
  description: string;
  icon: string;
};

export type Destination = {
  city: string;
  description: string;
  attractions: string[];
  image: string;
};

import type { Day } from "@/components/sections/itinerary/itinerary.types";

export const itineraryDays: Day[] = [
  {
    day: 1,
    date: "28 Feb",
    location: "Narita",
    description: "Llegada de los dos grupos, reunión y cena de bienvenida.",
    icon: "🗼",
    details: {
      summary: "Día de llegada, check-in y primer encuentro del grupo sin prisas.",
      activities: [
        {
          time: "Tarde",
          title: "Llegada + migración + retiro de equipaje",
          note: "Echarse un baño, comprar eSim/SUICA, visitar la tienda de pokemon.",
          tag: "move",
        },
        {
          time: "Tarde",
          title: "Check-in en Shinagawa",
          note: "Dejen maletas y caminen un poco para “despegar”.",
          tag: "chill",
        },
        {
          time: "Noche",
          title: "Reunión de los dos grupos",
          note: "Punto fácil: lobby / estación cercana.",
          tag: "must",
        },
        {
          time: "Noche",
          title: "Cena de bienvenida",
          note: "Algo cerca para no morir de jetlag.",
          tag: "food",
        },
      ],
      tips: ["Primer día: suave, no sobre-planear.", "Cambiar algo de dinero a yenes."],
    },
  },
  {
    day: 2,
    date: "01 Mar",
    location: "Osaka",
    description: "Shinkansen a Osaka (2.5h). Noche de neones en Dotonbori.",
    icon: "🚄",
    details: {
      summary: "Traslado largo + primera noche intensa en Osaka.",
      activities: [
        {
          time: "Mañana",
          title: "Shinkansen Tokio → Osaka",
          note: "Llegar temprano a estación para ir con calma.",
          tag: "move",
        },
        {
          time: "Tarde",
          title: "Check-in + paseo rápido por Namba",
          note: "Primeras fotos, ubicar konbinis, cajeros, etc.",
          tag: "chill",
        },
        {
          time: "Noche",
          title: "Dotonbori / neones + street food",
          note: "Takoyaki, okonomiyaki, vibe total.",
          tag: "food",
        },
      ],
      tips: ["Noche ideal para caminar: lleven batería externa."],
    },
  },
  {
    day: 3,
    date: "02 Mar",
    location: "Osaka",
    description: "Día de diversión (Universal Studios / Nintendo World).",
    icon: "🎢",
    details: {
      summary: "Día completo de parque. Aquí manda la logística.",
      activities: [
        {
          time: "Mañana",
          title: "Salida temprano al parque",
          note: "Llegar temprano = menos filas.",
          tag: "move",
        },
        {
          time: "Día",
          title: "Universal Studios / Nintendo World",
          note: "Prioricen 2–3 atracciones top y el resto relax.",
          tag: "must",
        },
        {
          time: "Noche",
          title: "Cena + regreso sin prisas",
          note: "Dejen margen por cansancio.",
          tag: "chill",
        },
      ],
      tips: ["Definan punto de reunión por si se separan."],
    },
  },
  {
    day: 4,
    date: "03 Mar",
    location: "Kioto",
    description: "Traslado corto (15 min). Templo Kiyomizu-dera y Gion.",
    icon: "⛩️",
    details: {
      summary: "Primer día en Kioto: templos clásicos + barrio tradicional.",
      activities: [
        {
          time: "Mañana",
          title: "Traslado Osaka → Kioto",
          note: "Corto. Aprovechen para llegar temprano.",
          tag: "move",
        },
        {
          time: "Tarde",
          title: "Kiyomizu-dera",
          note: "Caminar tranquilo, fotos y vistas.",
          tag: "must",
        },
        {
          time: "Atardecer",
          title: "Paseo por Gion",
          note: "Calles bonitas, vibra tradicional.",
          tag: "chill",
        },
      ],
      tips: ["Calzado cómodo: Kioto es de caminar."],
    },
  },
  {
    day: 5,
    date: "04 Mar",
    location: "Kioto",
    description: "Noche de Ryokan. Fushimi Inari y cena tradicional.",
    icon: "🏮",
    details: {
      summary: "Día icónico: Fushimi Inari + experiencia ryokan.",
      activities: [
        {
          time: "Mañana",
          title: "Fushimi Inari",
          note: "Ideal temprano para menos gente.",
          tag: "must",
        },
        {
          time: "Tarde",
          title: "Check-in Ryokan + onsen",
          note: "Tiempo slow: disfruta el ritual.",
          tag: "chill",
        },
        {
          time: "Noche",
          title: "Cena tradicional (kaiseki)",
          note: "Plan perfecto para cerrar el día.",
          tag: "food",
        },
      ],
      tips: ["No planees demasiado: el ryokan se disfruta sin prisas."],
    },
  },
  {
    day: 6,
    date: "05 Mar",
    location: "Kioto",
    description: "Bosque de Bambú Arashiyama y tiempo libre.",
    icon: "🎋",
    details: {
      summary: "Arashiyama + tarde libre para explorar a tu ritmo.",
      activities: [
        {
          time: "Mañana",
          title: "Arashiyama (Bambú)",
          note: "Fotos + caminata tranquila.",
          tag: "must",
        },
        {
          time: "Tarde",
          title: "Tiempo libre",
          note: "Compras pequeñas, café, descansar.",
          tag: "chill",
        },
        {
          time: "Noche",
          title: "Cena libre",
          note: "Hagan ‘vote’ del grupo 😄",
          tag: "food",
        },
      ],
    },
  },
  {
    day: 7,
    date: "06 Mar",
    location: "Takayama",
    description: "Tren escénico desde Kioto. Tarde en el pueblo samurái.",
    icon: "🏔️",
    details: {
      summary: "Cambio de vibe: montaña, tranquilidad y calles históricas.",
      activities: [
        {
          time: "Mañana",
          title: "Tren escénico Kioto → Takayama",
          note: "El camino es parte del plan.",
          tag: "move",
        },
        {
          time: "Tarde",
          title: "Paseo por calles históricas",
          note: "Tiendas, snack, fotos.",
          tag: "must",
        },
        {
          time: "Noche",
          title: "Cena local",
          note: "Algo cozy, clima fresco.",
          tag: "food",
        },
      ],
    },
  },
  {
    day: 8,
    date: "07 Mar",
    location: "Shirakawa-go",
    description: "Día en la aldea. Por la tarde viajan a Tokio.",
    icon: "🏡",
    details: {
      summary: "Aldea + regreso a ciudad. Día mixto.",
      activities: [
        {
          time: "Mañana",
          title: "Visita Shirakawa-go",
          note: "Caminen la aldea y miradores.",
          tag: "must",
        },
        {
          time: "Tarde",
          title: "Traslado hacia Tokio",
          note: "Viaje largo: lleven snacks.",
          tag: "move",
        },
        { time: "Noche", title: "Llegada + check-in + descanso", tag: "chill" },
      ],
      tips: ["Este día es pesado: planear cenita simple."],
    },
  },
  {
    day: 9,
    date: "08 Mar",
    location: "Tokio",
    description: "Día libre para explorar Shibuya y Harajuku.",
    icon: "🛍️",
    details: {
      summary: "Tokio vibes: calles icónicas y compras.",
      activities: [
        {
          time: "Tarde",
          title: "Shibuya",
          note: "Cruce, fotos y explorar.",
          tag: "must",
        },
        { time: "Tarde", title: "Harajuku", note: "Tienditas + snack.", tag: "food" },
        { time: "Noche", title: "Cena libre", tag: "chill" },
      ],
    },
  },
  {
    day: 10,
    date: "09 Mar",
    location: "Tokio (Nagano)",
    description: "Day trip a Nagano para ver los monos de nieve.",
    icon: "🐒",
    details: {
      summary: "Excursión de naturaleza. Prep de clima.",
      activities: [
        {
          time: "Mañana",
          title: "Salida temprano",
          note: "Es day trip completo.",
          tag: "move",
        },
        { time: "Día", title: "Monos de nieve", note: "Caminar + fotos.", tag: "must" },
        { time: "Noche", title: "Regreso a Tokio", tag: "chill" },
      ],
      tips: ["Ropa abrigadora + calzado antiderrapante si hay nieve."],
    },
  },
  {
    day: 11,
    date: "10 Mar",
    location: "Tokio (Monte Fuji)",
    description: "Day trip a Kawaguchiko para ver el Mt. Fuji.",
    icon: "🗻",
    details: {
      summary: "Día del Fuji: depende mucho del clima, pero vale totalmente.",
      activities: [
        { time: "Mañana", title: "Salida a Kawaguchiko", tag: "move" },
        {
          time: "Día",
          title: "Puntos de vista del Fuji",
          note: "Si está despejado, es el día épico.",
          tag: "must",
        },
        { time: "Tarde", title: "Tiempo libre / cafés", tag: "chill" },
      ],
      tips: ["Si amanece nublado, no se agüiten: a veces se abre más tarde."],
    },
  },
  {
    day: 12,
    date: "11 Mar",
    location: "Tokio",
    description: "Akihabara, templos modernos o teamLab Planets.",
    icon: "🎮",
    details: {
      summary: "Día flexible en Tokio: tech/anime o experiencia inmersiva.",
      activities: [
        {
          time: "Tarde",
          title: "Akihabara",
          note: "Arcades, tiendas, vibes.",
          tag: "must",
        },
        {
          time: "Tarde",
          title: "Opción: teamLab Planets",
          note: "Ideal reservar con tiempo.",
          tag: "chill",
        },
        { time: "Noche", title: "Cena libre", tag: "food" },
      ],
      tips: ["Define temprano cuál opción del día gana para optimizar traslados."],
    },
  },
  {
    day: 13,
    date: "12 Mar",
    location: "Tokio",
    description: "Compras finales y última cena de grupo épica.",
    icon: "🥳",
    details: {
      summary: "Últimas compras + cierre épico con el grupo.",
      activities: [
        {
          time: "Día",
          title: "Compras finales",
          note: "Recuerdos, donki, etc.",
          tag: "must",
        },
        { time: "Tarde", title: "Empaque ligero + organizar maletas", tag: "move" },
        {
          time: "Noche",
          title: "Última cena de grupo",
          note: "La noche legendaria.",
          tag: "food",
        },
      ],
    },
  },
  {
    day: 14,
    date: "13 Mar",
    location: "Regreso (Narita)",
    description: "Mañana libre. Salida a Narita para vuelo 4:00 PM.",
    icon: "✈️",
    details: {
      summary: "Cierre tranquilo: desayuno, últimos pendientes y al aeropuerto.",
      activities: [
        {
          time: "Mañana",
          title: "Mañana libre",
          note: "Café, paseo corto o compras rápidas.",
          tag: "chill",
        },
        {
          time: "Mediodía",
          title: "Traslado a Narita",
          note: "Dejar margen por seguridad/colas.",
          tag: "move",
        },
        { time: "Tarde", title: "Vuelo 4:00 PM", tag: "must" },
      ],
      tips: ["No apuren el último día: mejor llegar con margen al aeropuerto."],
    },
  },
];

export const destinations: Destination[] = [
  {
    city: "Tokio",
    description: "Metrópolis vibrante donde tradición y tecnología se fusionan.",
    attractions: [
      "Shibuya Crossing",
      "Senso-ji Temple",
      "Tokyo Skytree",
      "Harajuku",
      "Akihabara",
      "teamLab Planets",
    ],
    image: "/tokyo.png",
  },
  {
    city: "Osaka",
    description: "Ciudad de neones, comida callejera y entretenimiento.",
    attractions: [
      "Dotonbori",
      "Osaka Castle",
      "Universal Studios Japan",
      "Nintendo World",
      "Shinsekai",
    ],
    image: "/osaka.png",
  },
  {
    city: "Kioto",
    description: "Corazón cultural de Japón, templos antiguos y tradiciones.",
    attractions: [
      "Fushimi Inari",
      "Kiyomizu-dera",
      "Gion District",
      "Bamboo Forest Arashiyama",
      "Kinkaku-ji",
    ],
    image: "/kyoto.png",
  },
  {
    city: "Takayama",
    description: "Pueblo samurái enclavado en los Alpes Japoneses.",
    attractions: ["Old Town", "Takayama Jinya", "Morning Markets", "Hida Folk Village"],
    image: "/takayama.png",
  },
  {
    city: "Shirakawa-go",
    description: "Aldea patrimonio de la UNESCO con casas gassho-zukuri.",
    attractions: [
      "Gassho-style Houses",
      "Observatory",
      "Wada House",
      "Traditional Villages",
    ],
    image: "/shirakawa.png",
  },
  {
    city: "Mt. Fuji",
    description: "Icono sagrado de Japón y cumbre más alta del país.",
    attractions: [
      "Lake Kawaguchiko",
      "Chureito Pagoda",
      "Oshino Hakkai",
      "Fuji Five Lakes",
    ],
    image: "/montfiji.png",
  },
];
