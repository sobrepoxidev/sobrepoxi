// ---------------------------------------------------------------------------
//  Videos educativos · SobrePoxi
//
//  Catálogo de los 6 videos verticales (MP4 1080x1920, 30 s) que se indexan en
//  Google (pestaña Videos) y en la web. Los archivos viven en Supabase Storage
//  (bucket "products"): videos/<slug>.mp4 y su póster videos/<slug>.jpg.
//
//  Las URLs se construyen desde NEXT_PUBLIC_SUPABASE_URL — nunca hardcodear
//  el host.
// ---------------------------------------------------------------------------

import type { GuideVideo } from "./data";

export const VIDEO_DURATION_ISO = "PT30S";
export const VIDEO_UPLOAD_DATE = "2026-10-20";

export const VIDEO_SLUGS = [
  "que-es-mesa-rio",
  "asi-nace",
  "escoger-su-mesa",
  "mida-su-espacio",
  "que-podemos-hacer",
  "la-resina-es-arte",
] as const;

export type VideoSlug = (typeof VIDEO_SLUGS)[number];
export type VideoLocale = "es" | "en";

export interface VideoLocaleContent {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  /** 2-3 párrafos que transcriben lo que el video explica. */
  transcript: string[];
  /** Mensaje precargado para el CTA de WhatsApp de la página del video. */
  whatsappMessage: string;
}

export interface VideoEntry {
  slug: string;
  es: VideoLocaleContent;
  en: VideoLocaleContent;
}

export const VIDEO_CATALOG: VideoEntry[] = [
  {
    slug: "que-es-mesa-rio",
    es: {
      title: "Qué es una mesa río",
      description:
        "Una mesa río une madera de borde natural con un cauce de resina epóxica pigmentada. Cada pieza es única por la veta de la madera.",
      metaTitle: "Qué es una mesa río | Video | SobrePoxi",
      metaDescription:
        "Video: descubra qué es una mesa río, la unión de madera de borde natural y resina epóxica que hace única cada pieza. SobrePoxi Costa Rica.",
      keywords:
        "qué es mesa río, mesa río madera resina, mesa resina epóxica video, muebles resina Costa Rica",
      transcript: [
        "Una mesa río es un mueble que combina dos tablones de madera con un cauce central de resina epóxica, como un río que corre entre dos orillas.",
        "La madera conserva su borde natural, con sus curvas y su veta a la vista. La resina se pigmenta en tonos como turquesa, azul profundo, celeste, negro o coral, y al endurecerse une ambas piezas en una sola superficie.",
        "Como ninguna veta se repite, cada mesa río es una pieza única. En este video le mostramos de cerca cómo se ve ese encuentro entre la madera y la resina.",
      ],
      whatsappMessage:
        "Hola SobrePoxi, vi el video sobre qué es una mesa río y quiero más información",
    },
    en: {
      title: "What a river table is",
      description:
        "A river table joins natural-edge wood with a channel of pigmented epoxy resin. Each piece is one of a kind thanks to the wood grain.",
      metaTitle: "What a river table is | Video | SobrePoxi",
      metaDescription:
        "Video: learn what a river table is, the union of natural-edge wood and epoxy resin that makes each piece unique. SobrePoxi Costa Rica.",
      keywords:
        "what is river table, river table wood resin, epoxy resin table video, resin furniture Costa Rica",
      transcript: [
        "A river table is a piece of furniture that combines two wood slabs with a central channel of epoxy resin, like a river flowing between two banks.",
        "The wood keeps its natural edge, with its curves and grain on display. The resin is pigmented in tones such as turquoise, deep blue, sky blue, black or coral, and as it hardens it joins both pieces into a single surface.",
        "Since no grain ever repeats, every river table is a one-of-a-kind piece. In this video we show you up close what that meeting of wood and resin looks like.",
      ],
      whatsappMessage:
        "Hello SobrePoxi, I watched the video about what a river table is and I would like more information",
    },
  },
  {
    slug: "asi-nace",
    es: {
      title: "Así nace una mesa río",
      description:
        "Del tablón al mueble terminado: escogencia de la madera, molde, vaciado de resina por capas, burbujas, desmolde, lijado y pulido.",
      metaTitle: "Así nace una mesa río | Video | SobrePoxi",
      metaDescription:
        "Video: conozca paso a paso cómo nace una mesa río, del tablón al mueble terminado. SobrePoxi Costa Rica.",
      keywords:
        "cómo se hace mesa río, proceso mesa resina, fabricación muebles resina video",
      transcript: [
        "Todo empieza con la escogencia de los tablones: se buscan piezas de borde natural cuya veta combine bien con el diseño de la mesa.",
        "Luego se arma un molde de melamina a la medida, se colocan los tablones y se vacía la resina por capas. Con calor se revientan las burbujas que suben a la superficie.",
        "Ya firme la pieza, se desmolda, se lija y se pule hasta lograr una superficie pareja. En este video le mostramos cada paso del proceso.",
      ],
      whatsappMessage:
        "Hola SobrePoxi, vi el video sobre cómo nace una mesa río y quiero más información",
    },
    en: {
      title: "How a river table is born",
      description:
        "From slab to finished furniture: choosing the wood, the mold, pouring resin in layers, bubbles, demolding, sanding and polishing.",
      metaTitle: "How a river table is born | Video | SobrePoxi",
      metaDescription:
        "Video: see step by step how a river table is born, from the slab to the finished piece. SobrePoxi Costa Rica.",
      keywords:
        "how river table is made, resin table process, resin furniture making video",
      transcript: [
        "It all starts with choosing the slabs: natural-edge pieces whose grain suits the design of the table.",
        "Then a melamine mold is built to size, the slabs are set in place and the resin is poured in layers. Heat is used to pop the bubbles that rise to the surface.",
        "Once the piece is firm, it is demolded, sanded and polished until the surface is even. In this video we show you every step of the process.",
      ],
      whatsappMessage:
        "Hello SobrePoxi, I watched the video about how a river table is born and I would like more information",
    },
  },
  {
    slug: "escoger-su-mesa",
    es: {
      title: "Cómo escoger su mesa río",
      description:
        "Tres decisiones antes de encargar su mesa: la medida, la madera de veta clara u oscura y el color de la resina.",
      metaTitle: "Cómo escoger su mesa río | Video | SobrePoxi",
      metaDescription:
        "Video: las tres decisiones para encargar su mesa río, medida, madera y color de resina. SobrePoxi Costa Rica.",
      keywords:
        "cómo escoger mesa río, elegir mesa resina, colores resina epóxica, mesa a pedido Costa Rica",
      transcript: [
        "Encargar una mesa río se resume en tres decisiones. La primera es la medida: el largo y el ancho según el espacio donde va a vivir la mesa.",
        "La segunda es la madera: veta clara para ambientes luminosos o veta oscura para espacios de carácter. Cada tablón aporta su propio dibujo.",
        "La tercera es el color de la resina: turquesa, azul profundo, celeste, negro o coral. En este video le explicamos cómo combinar las tres decisiones.",
      ],
      whatsappMessage:
        "Hola SobrePoxi, vi el video sobre cómo escoger mi mesa río y quiero más información",
    },
    en: {
      title: "How to choose your river table",
      description:
        "Three decisions before ordering your table: the size, light or dark grain wood, and the resin color.",
      metaTitle: "How to choose your river table | Video | SobrePoxi",
      metaDescription:
        "Video: the three decisions for ordering your river table, size, wood and resin color. SobrePoxi Costa Rica.",
      keywords:
        "how to choose river table, custom resin table, epoxy resin colors, custom table Costa Rica",
      transcript: [
        "Ordering a river table comes down to three decisions. The first is the size: length and width according to the space where the table will live.",
        "The second is the wood: light grain for bright rooms or dark grain for spaces with character. Each slab brings its own pattern.",
        "The third is the resin color: turquoise, deep blue, sky blue, black or coral. In this video we explain how to combine all three decisions.",
      ],
      whatsappMessage:
        "Hello SobrePoxi, I watched the video about how to choose my river table and I would like more information",
    },
  },
  {
    slug: "mida-su-espacio",
    es: {
      title: "Mida su espacio antes de pedir",
      description:
        "Consejos para medir el comedor: unos 90 cm libres alrededor, altura de comedor de unos 75 cm y unos 60 cm por persona.",
      metaTitle: "Mida su espacio antes de pedir | Video | SobrePoxi",
      metaDescription:
        "Video: cómo medir su comedor antes de encargar la mesa, espacio libre, altura y espacio por persona. SobrePoxi Costa Rica.",
      keywords:
        "medir espacio mesa comedor, tamaño mesa comedor, altura mesa comedor, espacio por persona mesa",
      transcript: [
        "Antes de encargar su mesa, mida el espacio. Deje unos 90 centímetros libres alrededor para circular con comodidad y mover las sillas.",
        "Como referencias comunes: una mesa de comedor mide unos 75 centímetros de alto, y se calculan unos 60 centímetros de ancho por persona.",
        "Con esas medidas en mano —largo, ancho y espacio libre— es mucho más fácil acertar con el tamaño. En este video se lo explicamos paso a paso.",
      ],
      whatsappMessage:
        "Hola SobrePoxi, vi el video sobre cómo medir mi espacio y quiero más información",
    },
    en: {
      title: "Measure your space before ordering",
      description:
        "Tips for measuring the dining room: about 90 cm of clearance around it, a dining height of about 75 cm and about 60 cm per person.",
      metaTitle: "Measure your space before ordering | Video | SobrePoxi",
      metaDescription:
        "Video: how to measure your dining room before ordering the table, clearance, height and space per person. SobrePoxi Costa Rica.",
      keywords:
        "measure dining room table, dining table size, dining table height, space per person table",
      transcript: [
        "Before ordering your table, measure the space. Leave about 90 centimeters of clearance around it to move comfortably and pull out the chairs.",
        "As common references: a dining table is about 75 centimeters high, and about 60 centimeters of width are planned per person.",
        "With those measurements in hand —length, width and clearance— getting the size right is much easier. In this video we explain it step by step.",
      ],
      whatsappMessage:
        "Hello SobrePoxi, I watched the video about how to measure my space and I would like more information",
    },
  },
  {
    slug: "que-podemos-hacer",
    es: {
      title: "Qué podemos hacer por usted",
      description:
        "Muebles a pedido: mesas, barras, islas de cocina, consolas, bancas, repisas, cabeceras, tablas de servir y pisos epóxicos.",
      metaTitle: "Qué podemos hacer por usted | Video | SobrePoxi",
      metaDescription:
        "Video: conozca los muebles a pedido que hacemos en SobrePoxi, mesas, barras, islas, bancas y más. Costa Rica.",
      keywords:
        "muebles a pedido Costa Rica, mesas barras islas resina, muebles personalizados resina epóxica",
      transcript: [
        "Además de mesas río, hacemos muebles a pedido: barras, islas de cocina, consolas, bancas y repisas, siempre combinando madera y resina.",
        "También piezas más pequeñas como cabeceras y tablas de servir, y para los pisos, recubrimientos epóxicos que visten ambientes completos.",
        "Cuéntenos su idea por WhatsApp y le ayudamos a darle forma. En este video le mostramos todo lo que podemos hacer por usted.",
      ],
      whatsappMessage:
        "Hola SobrePoxi, vi el video sobre lo que pueden hacer y quiero más información",
    },
    en: {
      title: "What we can make for you",
      description:
        "Custom furniture: tables, bars, kitchen islands, consoles, benches, shelves, headboards, serving boards and epoxy floors.",
      metaTitle: "What we can make for you | Video | SobrePoxi",
      metaDescription:
        "Video: see the custom furniture we make at SobrePoxi, tables, bars, islands, benches and more. Costa Rica.",
      keywords:
        "custom furniture Costa Rica, resin tables bars islands, personalized epoxy resin furniture",
      transcript: [
        "Beyond river tables, we make custom furniture: bars, kitchen islands, consoles, benches and shelves, always combining wood and resin.",
        "Also smaller pieces such as headboards and serving boards, and for floors, epoxy coatings that dress entire rooms.",
        "Tell us your idea on WhatsApp and we will help you shape it. In this video we show you everything we can make for you.",
      ],
      whatsappMessage:
        "Hello SobrePoxi, I watched the video about what you can make and I would like more information",
    },
  },
  {
    slug: "la-resina-es-arte",
    es: {
      title: "La resina es arte",
      description:
        "La resina epóxica nace de mezclar resina y endurecedor; se pigmenta y puede encapsular arena, conchas o piedras.",
      metaTitle: "La resina es arte | Video | SobrePoxi",
      metaDescription:
        "Video: descubra por qué la resina epóxica es arte, pigmentos y objetos encapsulados. SobrePoxi Costa Rica.",
      keywords:
        "resina epóxica arte, pigmentos resina epóxica, encapsulados resina, arte resina Costa Rica",
      transcript: [
        "La resina epóxica se forma al mezclar dos componentes: la resina y el endurecedor. Al unirse, la mezcla se endurece y se vuelve una superficie sólida y traslúcida.",
        "Antes de endurecer se le da color con pigmentos —turquesa, azul profundo, celeste, negro, coral— y se pueden encapsular elementos como arena, conchas o piedras.",
        "Esa combinación de color y objetos encapsulados es lo que convierte cada pieza en arte. En este video le mostramos cómo se ve ese momento.",
      ],
      whatsappMessage:
        "Hola SobrePoxi, vi el video sobre la resina como arte y quiero más información",
    },
    en: {
      title: "Resin is art",
      description:
        "Epoxy resin is born from mixing resin and hardener; it takes pigment and can encapsulate sand, shells or stones.",
      metaTitle: "Resin is art | Video | SobrePoxi",
      metaDescription:
        "Video: discover why epoxy resin is art, pigments and encapsulated objects. SobrePoxi Costa Rica.",
      keywords:
        "epoxy resin art, epoxy resin pigments, resin encapsulations, resin art Costa Rica",
      transcript: [
        "Epoxy resin is formed by mixing two components: the resin and the hardener. Once combined, the mixture hardens into a solid, translucent surface.",
        "Before hardening it is colored with pigments —turquoise, deep blue, sky blue, black, coral— and elements such as sand, shells or stones can be encapsulated in it.",
        "That combination of color and encapsulated objects is what turns each piece into art. In this video we show you what that moment looks like.",
      ],
      whatsappMessage:
        "Hello SobrePoxi, I watched the video about resin as art and I would like more information",
    },
  },
];

/* ──────────── Helpers ──────────── */

function supabaseBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/+$/, "");
}

/** contentUrl (mp4) y thumbnailUrl (jpg) del video, construidos desde la env. */
export function getVideoFileUrls(slug: string): {
  contentUrl: string;
  thumbnailUrl: string;
} {
  const base = supabaseBaseUrl();
  return {
    contentUrl: `${base}/storage/v1/object/public/products/videos/${slug}.mp4`,
    thumbnailUrl: `${base}/storage/v1/object/public/products/videos/${slug}.jpg`,
  };
}

export function getVideoEntry(
  slug: string,
  locale: VideoLocale
): (VideoEntry & { content: VideoLocaleContent }) | undefined {
  const entry = VIDEO_CATALOG.find((v) => v.slug === slug);
  if (!entry) return undefined;
  return { ...entry, content: entry[locale] };
}

export function getVideos(
  locale: VideoLocale
): Array<VideoEntry & { content: VideoLocaleContent }> {
  return VIDEO_CATALOG.map((entry) => ({ ...entry, content: entry[locale] }));
}

/** Valor para el campo `video` de una Guide (misma slug que el video). */
export function buildGuideVideo(slug: string, locale: VideoLocale): GuideVideo {
  const entry = VIDEO_CATALOG.find((v) => v.slug === slug);
  const content = locale === "es" ? entry?.es : entry?.en;
  return {
    slug,
    title: content?.title ?? slug,
    description: content?.description ?? "",
    durationISO: VIDEO_DURATION_ISO,
    uploadDate: VIDEO_UPLOAD_DATE,
  };
}

export interface VideoObjectInput {
  locale: VideoLocale;
  /** URL canónica de la página donde vive el video. */
  pageUrl: string;
  video: GuideVideo;
}

/** JSON-LD VideoObject para indexar el video en Google (pestaña Videos). */
export function buildVideoObjectJsonLd({ pageUrl, video }: VideoObjectInput): Record<string, unknown> {
  const { contentUrl, thumbnailUrl } = getVideoFileUrls(video.slug);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.durationISO,
    contentUrl,
    embedUrl: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "SobrePoxi",
      url: "https://sobrepoxi.com",
      logo: {
        "@type": "ImageObject",
        url: "https://sobrepoxi.com/logo.png",
      },
    },
  };
}
