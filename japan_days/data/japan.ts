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

export const itineraryDays: ItineraryDay[] = [
  {
    day: 1,
    date: "28 Feb",
    location: "Tokio (Shinagawa)",
    description: "Llegada de los dos grupos, reunión y cena de bienvenida.",
    icon: "🏙️",
  },
  {
    day: 2,
    date: "01 Mar",
    location: "Osaka",
    description: "Shinkansen a Osaka (2.5h). Noche de neones en Dotonbori.",
    icon: "🌃",
  },
  {
    day: 3,
    date: "02 Mar",
    location: "Osaka",
    description: "Día de diversión (Universal Studios / Nintendo World).",
    icon: "🎮",
  },
  {
    day: 4,
    date: "03 Mar",
    location: "Kioto",
    description: "Traslado corto (15 min). Templo Kiyomizu-dera y Gion.",
    icon: "⛩️",
  },
  {
    day: 5,
    date: "04 Mar",
    location: "Kioto",
    description: "Noche de Ryokan. Fushimi Inari y cena tradicional.",
    icon: "🏯",
  },
  {
    day: 6,
    date: "05 Mar",
    location: "Kioto",
    description: "Bosque de Bambú Arashiyama y tiempo libre.",
    icon: "🎋",
  },
  {
    day: 7,
    date: "06 Mar",
    location: "Takayama",
    description: "Tren escénico desde Kioto. Tarde en el pueblo samurái.",
    icon: "🏔️",
  },
  {
    day: 8,
    date: "07 Mar",
    location: "Shirakawa-go",
    description: "Día en la aldea. Por la tarde viajan a Tokio.",
    icon: "🏘️",
  },
  {
    day: 9,
    date: "08 Mar",
    location: "Tokio",
    description: "Día libre para explorar Shibuya y Harajuku.",
    icon: "🗼",
  },
  {
    day: 10,
    date: "09 Mar",
    location: "Tokio (Monos)",
    description: "Day trip a Nagano para ver los monos de nieve.",
    icon: "🐒",
  },
  {
    day: 11,
    date: "10 Mar",
    location: "Tokio (Fuji)",
    description: "Day trip a Kawaguchiko para ver el Mt. Fuji.",
    icon: "🗻",
  },
  {
    day: 12,
    date: "11 Mar",
    location: "Tokio",
    description: "Akihabara, templos modernos o teamLab Planets.",
    icon: "🎨",
  },
  {
    day: 13,
    date: "12 Mar",
    location: "Tokio",
    description: "Compras finales y última cena de grupo épica.",
    icon: "🛍️",
  },
  {
    day: 14,
    date: "13 Mar",
    location: "Regreso",
    description: "Mañana libre. Salida a Narita para vuelo 4:00 PM.",
    icon: "✈️",
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
