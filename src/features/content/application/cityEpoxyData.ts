/* --------------------------------------------------------------------------
 *  cityEpoxyData.ts · SobrePoxi — Configuración de páginas locales SEO
 *
 *  Cada ciudad tiene datos REALES y verificables (clima, geografía,
 *  arquitectura, casos de uso). NO es copy-paste: cada entrada genera
 *  contenido único que Google no clasifica como doorway page.
 *
 *  Fuentes verificadas: IMN (Instituto Meteorológico Nacional CR),
 *  datos geográficos oficiales, características conocidas de cada zona.
 * ----------------------------------------------------------------------- */

export interface CityEpoxyConfig {
  /** Slug de la URL: /es/pisos-epoxicos-{slug} */
  slug: string;
  /** Nombre de la ciudad para display */
  cityName: string;
  /** Provincia */
  province: string;
  /** Coordenadas reales de la ciudad (centro) */
  geo: { latitude: number; longitude: number };
  /** Altitud aproximada en metros sobre el nivel del mar */
  altitude: number;
  /** Rango de temperatura promedio en °C */
  tempRange: { min: number; max: number };
  /** Característica climática distintiva (REAL) */
  climateSignature: string;

  /** H1 del hero */
  heroTitle: { es: string; en: string };
  heroSubtitle: { es: string; en: string };

  /** Consideraciones técnicas reales para epóxico en esta zona */
  climateConsiderations: {
    es: { heading: string; content: string }[];
    en: { heading: string; content: string }[];
  };

  /** Casos de uso / sectores populares en esta zona (reales) */
  useCases: { es: string[]; en: string[] };

  /** Distritos/cantones cercanos que cubrimos desde esta ciudad */
  coverageAreas: string[];

  /** Galería — qué imágenes mostrar (selección curada por relevancia) */
  galleryFocus: "residential" | "commercial" | "industrial" | "coastal";

  /** FAQ específicas de esta ciudad (únicas, no genéricas) */
  faqs: { es: { question: string; answer: string }[]; en: { question: string; answer: string }[] };

  /** Meta data SEO */
  metaTitle: { es: string; en: string };
  metaDescription: { es: string; en: string };
  keywords: { es: string; en: string };
}

export const CITY_CONFIGS: CityEpoxyConfig[] = [
  /* ════════════════════════════════════════════════════════════════
     CARTAGO — Ciudad más fría del GAM, brumas, altitud
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "cartago",
    cityName: "Cartago",
    province: "Cartago",
    geo: { latitude: 9.8644, longitude: -83.9194 },
    altitude: 1435,
    tempRange: { min: 13, max: 20 },
    climateSignature: "Frío y brumoso",
    heroTitle: {
      es: "Pisos Epóxicos en Cartago",
      en: "Epoxy Floors in Cartago",
    },
    heroSubtitle: {
      es: "Adaptados al clima frío y brumoso de la Ciudad de las Brumas. Sistemas con curado acelerado para temperaturas bajas.",
      en: "Adapted to the cold, misty climate of the City of Mists. Systems with accelerated curing for low temperatures.",
    },
    climateConsiderations: {
      es: [
        {
          heading: "El frío cartaginés alarga el curado",
          content:
            "Cartago es la ciudad más fría del Valle Central (13-20°C promedio, brumas vespertinas frecuentes). Las temperaturas bajas ralentizan la reacción química del epóxico: lo que en San José cura en 24 horas, en Cartago puede tomar 36-48. Usamos formulaciones con endurecedores acelerados para compensar y mantener los tiempos de proyecto.",
        },
        {
          heading: "Brumas y humedad vespertina",
          content:
            "Las brumas características de Cartago (especialmente en zonas como Tierra Blanca, Cipreses y Pacayas) elevan la humedad ambiental al final del día. Programamos las aplicaciones críticas en horas de la mañana, cuando la temperatura es óptima y la humedad relativa está en su punto más bajo.",
        },
        {
          heading: "Ventaja: menos riesgo de ampollamiento",
          content:
            "El clima fresco de Cartago tiene una ventaja técnica real: el concreto sufre menos estrés térmico y la humedad ascendente es menor que en zonas costeras o calientes. Esto se traduce en menor riesgo de ampollamiento por presión hidrostática, uno de los fallos más comunes en pisos epóxicos.",
        },
      ],
      en: [
        {
          heading: "Cartago's cold slows curing",
          content:
            "Cartago is the coldest city in the Central Valley (13-20°C average, frequent evening mists). Low temperatures slow epoxy's chemical reaction: what cures in 24 hours in San José may take 36-48 in Cartago. We use formulations with accelerated hardeners to compensate and maintain project timelines.",
        },
        {
          heading: "Mists and evening humidity",
          content:
            "Cartago's characteristic mists (especially in areas like Tierra Blanca, Cipreses and Pacayas) raise ambient humidity at the end of the day. We schedule critical applications in morning hours, when temperature is optimal and relative humidity is at its lowest.",
        },
        {
          heading: "Advantage: less blistering risk",
          content:
            "Cartago's cool climate has a real technical advantage: concrete suffers less thermal stress and rising moisture is lower than in coastal or hot areas. This translates to less risk of blistering from hydrostatic pressure, one of the most common failures in epoxy floors.",
        },
      ],
    },
    useCases: {
      es: [
        "Residencias de San Nicolás y Aguacaliente",
        "Locales comerciales del centro histórico cartaginés",
        "Bodegas agrícolas (papa, hortalizas) en Llano Grande",
        "Cafeterías y restaurantes universitarios (UTN, TEC)",
        "Casas de retiro y fincas en Cachí y Ujarrás",
      ],
      en: [
        "Residences in San Nicolás and Aguacaliente",
        "Commercial spaces in Cartago's historic downtown",
        "Agricultural warehouses (potato, vegetables) in Llano Grande",
        "University cafeterias and restaurants (UTN, TEC)",
        "Retreat houses and farms in Cachí and Ujarrás",
      ],
    },
    coverageAreas: [
      "Cartago Centro",
      "San Nicolás",
      "Aguacaliente",
      "Occidental",
      "Carmen",
      "Paraíso",
      "Oreamuno",
      "Tierra Blanca",
      "Pacayas",
      "Llano Grande",
    ],
    galleryFocus: "residential",
    faqs: {
      es: [
        {
          question: "¿El frío de Cartago daña la instalación del piso epóxico?",
          answer:
            "No daña, pero la ralentiza. El epóxico es una reacción química exotérmica: a menor temperatura, más lento el curado. En Cartago usamos endurecedores acelerados y programamos aplicaciones matutinas para compensar. El resultado final es igual de resistente que en zonas cálidas.",
        },
        {
          question: "¿Hacen visitas técnicas en Tierra Blanca y Pacayas?",
          answer:
            "Sí, cubrimos toda la zona montañosa de Cartago. Estas zonas, por su mayor altitud, tienen temperaturas aún más bajas (10-15°C) y brumas frecuentes. En la visita evaluamos humedad del concreto y recomendamos el sistema adecuado para estas condiciones extremas.",
        },
        {
          question: "¿Qué sistema recomiendan para bodegas agrícolas en Cartago?",
          answer:
            "Para bodegas de papa y hortalizas del Llano Grande y Cachí, recomendamos sistemas industriales tricapa con topcoat poliuretano: resisten el tráfico de montacargas, la humedad constante y los químicos de limpieza agrícola. Mantenimiento mínimo incluso con el clima frío.",
        },
        {
          question: "¿Las brumas vespertinas afectan el piso ya instalado?",
          answer:
            "No. Una vez curado completamente (72 horas), el piso epóxico es 100% impermeable. Las brumas y la humedad ambiental no lo afectan en absoluto. De hecho, la superficie sin juntas es ideal para el clima húmedo de Cartago porque no acumula moho como las baldosas.",
        },
      ],
      en: [
        {
          question: "Does Cartago's cold damage epoxy floor installation?",
          answer:
            "It doesn't damage, but it slows it down. Epoxy is an exothermic chemical reaction: lower temperature means slower curing. In Cartago we use accelerated hardeners and schedule morning applications to compensate. The final result is just as resistant as in warm areas.",
        },
        {
          question: "Do you do technical visits in Tierra Blanca and Pacayas?",
          answer:
            "Yes, we cover the entire mountainous area of Cartago. These zones, due to their higher altitude, have even lower temperatures (10-15°C) and frequent mists. During the visit we evaluate concrete moisture and recommend the appropriate system for these extreme conditions.",
        },
        {
          question: "What system do you recommend for agricultural warehouses in Cartago?",
          answer:
            "For potato and vegetable warehouses in Llano Grande and Cachí, we recommend industrial trilayer systems with polyurethane topcoat: they withstand forklift traffic, constant humidity and agricultural cleaning chemicals. Minimal maintenance even in cold weather.",
        },
        {
          question: "Do evening mists affect an already-installed floor?",
          answer:
            "No. Once fully cured (72 hours), the epoxy floor is 100% waterproof. Mists and ambient humidity don't affect it at all. In fact, the seamless surface is ideal for Cartago's humid climate because it doesn't accumulate mold like tiles do.",
        },
      ],
    },
    metaTitle: {
      es: "Pisos Epóxicos en Cartago, Costa Rica | Curado para Clima Frío | SobrePoxi",
      en: "Epoxy Floors in Cartago, Costa Rica | Cold-Climate Curing | SobrePoxi",
    },
    metaDescription: {
      es: "Pisos epóxicos en Cartago, Costa Rica. Sistemas adaptados al clima frío y brumoso de la Ciudad de las Brumas. Endurecedores acelerados, visita técnica gratis en todo el cantón.",
      en: "Epoxy floors in Cartago, Costa Rica. Systems adapted to the cold, misty climate of the City of Mists. Accelerated hardeners, free technical visit throughout the canton.",
    },
    keywords: {
      es: "pisos epoxicos Cartago, piso epoxico Cartago Costa Rica, resina epoxica Cartago, piso garaje Cartago frio, instalador epoxico Cartago brumas",
      en: "epoxy floors Cartago, epoxy flooring Cartago Costa Rica, epoxy resin Cartago, garage floor Cartago cold, epoxy installer Cartago mist",
    },
  },

  /* ════════════════════════════════════════════════════════════════
     HEREDIA — Ciudad de las Flores, Valle Central, universitaria
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "heredia",
    cityName: "Heredia",
    province: "Heredia",
    geo: { latitude: 9.9983, longitude: -84.1166 },
    altitude: 1150,
    tempRange: { min: 17, max: 27 },
    climateSignature: "Templado húmedo, lluvias intensas",
    heroTitle: {
      es: "Pisos Epóxicos en Heredia",
      en: "Epoxy Floors in Heredia",
    },
    heroSubtitle: {
      es: "Para la Ciudad de las Flores: sistemas que resisten la humedad intensa y las lluvias del norte del Valle Central.",
      en: "For the City of Flowers: systems that withstand intense humidity and rains of the northern Central Valley.",
    },
    climateConsiderations: {
      es: [
        {
          heading: "Las lluvias intensas del norte del Valle",
          content:
            "Heredia recibe algunas de las lluvias más intensas del Gran Área Metropolitana, especialmente en distritos como San Francisco, Ulloa y Mercedes. El concreto expuesto a lluvias frecuentes acumula humedad. Antes de cualquier instalación, hacemos prueba de humedad obligatoria (máximo 4.5% con medidor profesional) para evitar ampollamiento futuro.",
        },
        {
          heading: "Zonas de cultivo de flores: alta humedad ambiental",
          content:
            "Heredia es la 'Ciudad de las Flores' por su tradición agrícola. Zonas como San Joaquín y Barva, con invernaderos y cultivos, tienen humedad ambiental elevada todo el año. Recomendamos sistemas con barrera de humedad reforzada para residencias cercanas a estas áreas.",
        },
        {
          heading: "Clima universitario: tráfico intenso",
          content:
            "Con la UNA, la UCR sede Heredia y múltiples instituciones educativas, los alrededores universitarios requieren sistemas de alta resistencia al tráfico peatonal intenso. Los pisos epóxicos con escamas antideslizantes son ideales para cafeterías, pasillos y áreas comunes.",
        },
      ],
      en: [
        {
          heading: "Intense rains in the northern Valley",
          content:
            "Heredia receives some of the most intense rainfall in the Greater Metropolitan Area, especially in districts like San Francisco, Ulloa and Mercedes. Concrete exposed to frequent rain accumulates moisture. Before any installation, we do mandatory moisture testing (maximum 4.5% with professional meter) to prevent future blistering.",
        },
        {
          heading: "Flower-growing areas: high ambient humidity",
          content:
            "Heredia is the 'City of Flowers' due to its agricultural tradition. Areas like San Joaquín and Barva, with greenhouses and crops, have high ambient humidity year-round. We recommend systems with reinforced moisture barriers for residences near these areas.",
        },
        {
          heading: "University climate: intense traffic",
          content:
            "With UNA, UCR Heredia campus and multiple educational institutions, university surroundings require systems with high resistance to intense pedestrian traffic. Epoxy floors with anti-slip flakes are ideal for cafeterias, hallways and common areas.",
        },
      ],
    },
    useCases: {
      es: [
        "Apartamentos modernos en San Pablo y San Antonio de Belén",
        "Residencias de San Rafael y Barva de Heredia",
        "Locales comerciales de Heredia Centro y Merced",
        "Cafeterías y restaurantes universitarios",
        "Bodegas y naves industriales de La Aurora y Ulloa",
      ],
      en: [
        "Modern apartments in San Pablo and San Antonio de Belén",
        "Residences in San Rafael and Barva de Heredia",
        "Commercial spaces in Heredia Centro and Merced",
        "University cafeterias and restaurants",
        "Warehouses and industrial bays in La Aurora and Ulloa",
      ],
    },
    coverageAreas: [
      "Heredia Centro",
      "Merced",
      "San Francisco",
      "Ulloa",
      "San Rafael",
      "Barva",
      "San Pablo",
      "San Antonio de Belén",
      "San Joaquín",
      "Santo Domingo",
    ],
    galleryFocus: "commercial",
    faqs: {
      es: [
        {
          question: "¿Las lluvias intensas de Heredia impiden instalar pisos epóxicos?",
          answer:
            "No impiden, pero requieren planificación. En época de lluvias (mayo-noviembre), programamos las aplicaciones en ventanas de buen clima y siempre medimos la humedad del concreto antes. Con las precauciones adecuadas, instalamos pisos epóxicos en Heredia durante todo el año.",
        },
        {
          question: "¿Cubren zonas como San Antonio de Belén y San Pablo?",
          answer:
            "Sí, cubrimos toda el área de Heredia incluyendo Belén, San Pablo, Barva y Santo Domingo. Estas zonas de rápido crecimiento urbano tienen muchos proyectos residenciales y comerciales nuevos donde el epóxico es ideal por su durabilidad y estética.",
        },
        {
          question: "¿Qué sistema recomiendan para residencias cerca de zonas de cultivo?",
          answer:
            "Para residencias cercanas a invernaderos y zonas agrícolas de Heredia (alta humedad ambiental), recomendamos sistemas con barrera de humedad reforzada y topcoat poliuretano. Esto protege el piso incluso con la humedad constante típica de estas áreas.",
        },
        {
          question: "¿Hacen proyectos para locales comerciales en Heredia Centro?",
          answer:
            "Sí, tenemos experiencia en comercios del centro de Heredia. Para locales con alto tráfico usamos sistemas con escamas antideslizantes que combinan estética premium con funcionalidad. Coordinamos horarios para minimizar el impacto en operaciones comerciales.",
        },
      ],
      en: [
        {
          question: "Do Heredia's intense rains prevent epoxy floor installation?",
          answer:
            "They don't prevent it, but require planning. During rainy season (May-November), we schedule applications during good weather windows and always measure concrete moisture beforehand. With proper precautions, we install epoxy floors in Heredia year-round.",
        },
        {
          question: "Do you cover areas like San Antonio de Belén and San Pablo?",
          answer:
            "Yes, we cover the entire Heredia area including Belén, San Pablo, Barva and Santo Domingo. These rapidly growing urban zones have many new residential and commercial projects where epoxy is ideal for its durability and aesthetics.",
        },
        {
          question: "What system do you recommend for residences near crop areas?",
          answer:
            "For residences near greenhouses and agricultural areas of Heredia (high ambient humidity), we recommend systems with reinforced moisture barriers and polyurethane topcoat. This protects the floor even with the constant humidity typical of these areas.",
        },
        {
          question: "Do you do projects for commercial spaces in Heredia Centro?",
          answer:
            "Yes, we have experience with businesses in central Heredia. For high-traffic spaces we use systems with anti-slip flakes that combine premium aesthetics with functionality. We coordinate schedules to minimize impact on commercial operations.",
        },
      ],
    },
    metaTitle: {
      es: "Pisos Epóxicos en Heredia, Costa Rica | Resistentes a Humedad | SobrePoxi",
      en: "Epoxy Floors in Heredia, Costa Rica | Moisture-Resistant | SobrePoxi",
    },
    metaDescription: {
      es: "Pisos epóxicos en Heredia, Costa Rica. Sistemas con barrera de humedad para las lluvias intensas y zonas de cultivo. Visita técnica gratis en Heredia Centro, Belén, Barva y más.",
      en: "Epoxy floors in Heredia, Costa Rica. Systems with moisture barriers for intense rains and crop areas. Free technical visit in Heredia Centro, Belén, Barva and more.",
    },
    keywords: {
      es: "pisos epoxicos Heredia, piso epoxico Heredia Costa Rica, resina epoxica Heredia, piso garaje Heredia, instalador epoxico Heredia Belen Barva",
      en: "epoxy floors Heredia, epoxy flooring Heredia Costa Rica, epoxy resin Heredia, garage floor Heredia, epoxy installer Heredia Belen Barva",
    },
  },

  /* ════════════════════════════════════════════════════════════════
     ALAJUELA — Más cálida, aeropuerto, altitud media, mangoes/flores
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "alajuela",
    cityName: "Alajuela",
    province: "Alajuela",
    geo: { latitude: 10.0162, longitude: -84.2116 },
    altitude: 950,
    tempRange: { min: 18, max: 27 },
    climateSignature: "Cálido y soleado, 'primavera eterna'",
    heroTitle: {
      es: "Pisos Epóxicos en Alajuela",
      en: "Epoxy Floors in Alajuela",
    },
    heroSubtitle: {
      es: "Para la capital de los mangos: sistemas con protección UV reforzada para el clima cálido y soleado de la 'primavera eterna'.",
      en: "For the mango capital: systems with reinforced UV protection for the warm, sunny 'eternal spring' climate.",
    },
    climateConsiderations: {
      es: [
        {
          heading: "Sol intenso: protección UV indispensable",
          content:
            "Alajuela tiene un clima más cálido y soleado que San José (18-27°C, altitud ~950msnm). Las residencias con ventanas grandes o patios abiertos reciben sol directo intenso. En estos casos, el topcoat poliuretano alifático o poliaspártico no es opcional: es obligatorio para evitar el amarillamiento del epóxico en meses.",
        },
        {
          heading: "Cercanía al aeropuerto: polvo y tráfico",
          content:
            "El Aeropuerto Juan Santamaría genera polvo y tráfico constante en zonas aledañas (San Antonio, Río Segundo, La Garita). Los pisos epóxicos son ideales aquí porque su superficie no porosa no absorbe polvo y se limpia con un simple trapeado húmedo.",
        },
        {
          heading: "Zonas agrícolas: mangos, flores, café",
          content:
            "Alajuela es famosa por sus mangos, flores y café (San Isidro, San Roque, La Garita). Las fincas y casas de retiro en estas zonas se benefician de pisos epóxicos que resisten la humedad agrícola y el tráfico de herramientas, además de su fácil limpieza tras el trabajo de campo.",
        },
      ],
      en: [
        {
          heading: "Intense sun: UV protection essential",
          content:
            "Alajuela has a warmer, sunnier climate than San José (18-27°C, altitude ~950m). Residences with large windows or open patios receive intense direct sun. In these cases, the aliphatic polyurethane or polyaspartic topcoat is not optional: it's mandatory to prevent epoxy yellowing within months.",
        },
        {
          heading: "Airport proximity: dust and traffic",
          content:
            "Juan Santamaría Airport generates constant dust and traffic in surrounding areas (San Antonio, Río Segundo, La Garita). Epoxy floors are ideal here because their non-porous surface doesn't absorb dust and cleans with simple damp mopping.",
        },
        {
          heading: "Agricultural areas: mangoes, flowers, coffee",
          content:
            "Alajuela is famous for its mangoes, flowers and coffee (San Isidro, San Roque, La Garita). Farms and retreat houses in these areas benefit from epoxy floors that resist agricultural humidity and tool traffic, plus easy cleaning after field work.",
        },
      ],
    },
    useCases: {
      es: [
        "Residencias modernas de San Rafael y San José de Alajuela",
        "Casas con patio y cochera en San Antonio y Río Segundo",
        "Locales comerciales del centro de Alajuela",
        "Fincas y casas de retiro en La Garita y Turrúcares",
        "Bodegas y naves industriales de El Coco y La Aurora",
      ],
      en: [
        "Modern residences in San Rafael and San José de Alajuela",
        "Houses with patio and garage in San Antonio and Río Segundo",
        "Commercial spaces in central Alajuela",
        "Farms and retreat houses in La Garita and Turrúcares",
        "Warehouses and industrial bays in El Coco and La Aurora",
      ],
    },
    coverageAreas: [
      "Alajuela Centro",
      "San José",
      "Carmen",
      "San Rafael",
      "San Antonio",
      "Río Segundo",
      "La Garita",
      "Turrúcares",
      "San Isidro",
      "El Coco",
    ],
    galleryFocus: "residential",
    faqs: {
      es: [
        {
          question: "¿El sol de Alajuela amarillea los pisos epóxicos?",
          answer:
            "Sin protección UV adecuada, sí. Por eso en Alajuela NUNCA instalamos sistemas sin topcoat poliuretano alifático o poliaspártico, especialmente en residencias con ventanas grandes o patios. Con el topcoat correcto, el piso mantiene su color durante décadas, incluso con el sol intenso de la 'primavera eterna'.",
        },
        {
          question: "¿Cubren zonas cerca del aeropuerto como Río Segundo?",
          answer:
            "Sí, cubrimos toda el área metropolitana de Alajuela incluyendo Río Segundo, San Antonio y La Garita. Estas zonas cercanas al aeropuerto tienen la ventaja de clima estable, lo que facilita la planificación de proyectos durante todo el año.",
        },
        {
          question: "¿Recomiendan pisos epóxicos para fincas en La Garita?",
          answer:
            "Absolutamente. Las fincas y casas de retiro en La Garita y Turrúcares se benefician enormemente del epóxico: resisten el tráfico de herramientas, la humedad de áreas agrícolas y se limpian fácilmente tras el trabajo en el jardín o finca. Además, el aspecto premium aumenta el valor de la propiedad.",
        },
        {
          question: "¿Las cocheras de Alajuela necesitan un sistema especial?",
          answer:
            "Por el clima más cálido, recomendamos sistemas tricapa con topcoat poliaspártico en cocheras de Alajuela, especialmente si reciben sol directo. El poliaspártico cura rápido incluso con calor y tiene máxima resistencia UV, ideal para el clima soleado alajuelense.",
        },
      ],
      en: [
        {
          question: "Does Alajuela's sun yellow epoxy floors?",
          answer:
            "Without proper UV protection, yes. That's why in Alajuela we NEVER install systems without aliphatic polyurethane or polyaspartic topcoat, especially in residences with large windows or patios. With the correct topcoat, the floor maintains its color for decades, even with intense 'eternal spring' sun.",
        },
        {
          question: "Do you cover areas near the airport like Río Segundo?",
          answer:
            "Yes, we cover the entire metropolitan area of Alajuela including Río Segundo, San Antonio and La Garita. These areas near the airport have the advantage of stable climate, which facilitates project planning year-round.",
        },
        {
          question: "Do you recommend epoxy floors for farms in La Garita?",
          answer:
            "Absolutely. Farms and retreat houses in La Garita and Turrúcares benefit enormously from epoxy: it withstands tool traffic, agricultural area humidity and cleans easily after garden or farm work. Plus, the premium look increases property value.",
        },
        {
          question: "Do Alajuela garages need a special system?",
          answer:
            "Due to the warmer climate, we recommend trilayer systems with polyaspartic topcoat in Alajuela garages, especially if they receive direct sun. Polyaspartic cures quickly even with heat and has maximum UV resistance, ideal for the sunny Alajuela climate.",
        },
      ],
    },
    metaTitle: {
      es: "Pisos Epóxicos en Alajuela, Costa Rica | Protección UV | SobrePoxi",
      en: "Epoxy Floors in Alajuela, Costa Rica | UV Protection | SobrePoxi",
    },
    metaDescription: {
      es: "Pisos epóxicos en Alajuela, Costa Rica. Sistemas con topcoat UV reforzado para el clima cálido y soleado. Visita técnica gratis en Alajuela Centro, La Garita, Río Segundo y más.",
      en: "Epoxy floors in Alajuela, Costa Rica. Systems with reinforced UV topcoat for the warm, sunny climate. Free technical visit in Alajuela Centro, La Garita, Río Segundo and more.",
    },
    keywords: {
      es: "pisos epoxicos Alajuela, piso epoxico Alajuela Costa Rica, resina epoxica Alajuela, piso garaje Alajuela sol, instalador epoxico Alajuela aeropuerto",
      en: "epoxy floors Alajuela, epoxy flooring Alajuela Costa Rica, epoxy resin Alajuela, garage floor Alajuela sun, epoxy installer Alajuela airport",
    },
  },

  /* ════════════════════════════════════════════════════════════════
     GUANACASTE — Costa, salinidad, calor extremo, UV, casas de playa
     ════════════════════════════════════════════════════════════════ */
  {
    slug: "guanacaste",
    cityName: "Guanacaste",
    province: "Guanacaste",
    geo: { latitude: 10.4589, longitude: -85.5394 },
    altitude: 50,
    tempRange: { min: 24, max: 35 },
    climateSignature: "Calor tropical costero, salinidad, UV extremo",
    heroTitle: {
      es: "Pisos Epóxicos en Guanacaste",
      en: "Epoxy Floors in Guanacaste",
    },
    heroSubtitle: {
      es: "Para casas de playa y comercios de la costa: sistemas de alto rendimiento contra salinidad, calor extremo y radiación UV intensa.",
      en: "For beach houses and coastal businesses: high-performance systems against salinity, extreme heat and intense UV radiation.",
    },
    climateConsiderations: {
      es: [
        {
          heading: "Salinidad costera: el enemigo #1 del concreto",
          content:
            "Las casas y comercios de Tamarindo, Playa Hermosa, Coco, Flamingo y Sámara están expuestos a salinidad constante del océano. La sal penetra el concreto desnudo y lo degrada desde adentro. Los pisos epóxicos 100% sólidos con topcoat poliaspártico crean una barrera impermeable que protege el concreto de la corrosión salina por décadas.",
        },
        {
          heading: "Calor extremo y radiación UV",
          content:
            "Guanacaste registra las temperaturas más altas de Costa Rica (24-35°C, con picos de 38°C en marzo-abril) y la radiación UV más intensa. El epóxico SIN protección UV adecuada se amarilla y degrada en meses. Usamos exclusivamente sistemas con topcoat poliaspártico alifático, formulado específicamente para resistir UV extremo sin amarillamiento.",
        },
        {
          heading: "Humedad ascendente y mareas",
          content:
            "Los pisos de casas costeras en Guanacaste sufren humedad ascendente desde el suelo (napas freáticas cercanas al mar). Hacemos pruebas de humedad obligatorias y, cuando es necesario, instalamos sistemas con barrera de humedad epóxica reforzada antes del sistema decorativo. Sin este paso, el piso se ampollará inevitablemente.",
        },
        {
          heading: "Aplicación en clima cálido: tiempos críticos",
          content:
            "El calor guanacasteco acelera el curado del epóxico (pot life más corto). Esto es ventajoso para tiempos de proyecto pero requiere aplicación experta: trabajamos en horas frescas (5-9am) y usamos formulaciones con pot life extendido para asegurar un acabado perfecto sin marcas de rodillo.",
        },
      ],
      en: [
        {
          heading: "Coastal salinity: concrete's enemy #1",
          content:
            "Houses and businesses in Tamarindo, Playa Hermosa, Coco, Flamingo and Sámara are exposed to constant ocean salinity. Salt penetrates bare concrete and degrades it from within. 100% solids epoxy floors with polyaspartic topcoat create an impermeable barrier that protects concrete from saline corrosion for decades.",
        },
        {
          heading: "Extreme heat and UV radiation",
          content:
            "Guanacaste records Costa Rica's highest temperatures (24-35°C, with peaks of 38°C in March-April) and most intense UV radiation. Epoxy WITHOUT proper UV protection yellows and degrades within months. We use exclusively systems with aliphatic polyaspartic topcoat, formulated specifically to resist extreme UV without yellowing.",
        },
        {
          heading: "Rising moisture and tides",
          content:
            "Floors of coastal houses in Guanacaste suffer rising moisture from the ground (water tables near the sea). We do mandatory moisture tests and, when necessary, install systems with reinforced epoxy moisture barrier before the decorative system. Without this step, the floor will inevitably blister.",
        },
        {
          heading: "Application in hot climate: critical times",
          content:
            "Guanacaste's heat accelerates epoxy curing (shorter pot life). This is advantageous for project times but requires expert application: we work in cool hours (5-9am) and use formulations with extended pot life to ensure a perfect finish without roller marks.",
        },
      ],
    },
    useCases: {
      es: [
        "Casas de playa en Tamarindo y Playa Langosta",
        "Villas de lujo en Flamingo y Potrero",
        "Condominios de Sámara y Nosara",
        "Restaurantes y bares de playa en El Coco",
        "Bodegas y locales comerciales en Liberia",
        "Hoteles boutique de la costa guanacasteca",
      ],
      en: [
        "Beach houses in Tamarindo and Playa Langosta",
        "Luxury villas in Flamingo and Potrero",
        "Condominiums in Sámara and Nosara",
        "Beach restaurants and bars in El Coco",
        "Warehouses and commercial spaces in Liberia",
        "Boutique hotels along the Guanacaste coast",
      ],
    },
    coverageAreas: [
      "Liberia",
      "Tamarindo",
      "Playa Hermosa",
      "Playa del Coco",
      "Flamingo",
      "Potrero",
      "Sámara",
      "Nosara",
      "Carrillo",
      "Filadelfia",
    ],
    galleryFocus: "coastal",
    faqs: {
      es: [
        {
          question: "¿Los pisos epóxicos resisten la sal del mar en Guanacaste?",
          answer:
            "Sí, con el sistema correcto. Usamos exclusivamente sistemas 100% sólidos con topcoat poliaspártico para casas de playa. La barrera impermeable del epóxico evita que la sal penetre el concreto, que es la causa #1 de degradación en construcciones costeras. Es la mejor inversión para proteger tu casa de playa.",
        },
        {
          question: "¿Hacen proyectos en Tamarindo, Flamingo y Sámara?",
          answer:
            "Sí, cubrimos toda la costa de Guanacaste. Por la distancia desde nuestro taller en San José, los proyectos costeros requieren planificación de viáticos (que se descuentan del total al contratar). Coordinamos logística para minimizar costos de traslado sin sacrificar calidad.",
        },
        {
          question: "¿Cuál es el mejor sistema para una casa de playa en Guanacaste?",
          answer:
            "Para casas de playa recomendamos SIEMPRE: (1) prueba de humedad obligatoria, (2) barrera de humedad reforzada si es necesaria, (3) epóxico 100% sólidos como cuerpo, y (4) topcoat poliaspártico alifático para máxima resistencia UV y salina. Saltarse cualquiera de estos pasos en Guanacaste garantiza problemas futuros.",
        },
        {
          question: "¿El calor extremo de Guanacaste complica la instalación?",
          answer:
            "Requiere experiencia pero no es obstáculo. Aplicamos en horas frescas (madrugada), usamos formulaciones con pot life extendido para el calor, y aprovechamos que el curado acelerado permite entregar el proyecto más rápido. El resultado final es igual de resistente que en climas templados.",
        },
      ],
      en: [
        {
          question: "Do epoxy floors resist sea salt in Guanacaste?",
          answer:
            "Yes, with the right system. We use exclusively 100% solids systems with polyaspartic topcoat for beach houses. Epoxy's impermeable barrier prevents salt from penetrating concrete, which is the #1 cause of degradation in coastal construction. It's the best investment to protect your beach house.",
        },
        {
          question: "Do you do projects in Tamarindo, Flamingo and Sámara?",
          answer:
            "Yes, we cover the entire Guanacaste coast. Due to the distance from our San José workshop, coastal projects require travel expense planning (deducted from total when hired). We coordinate logistics to minimize transfer costs without sacrificing quality.",
        },
        {
          question: "What's the best system for a beach house in Guanacaste?",
          answer:
            "For beach houses we ALWAYS recommend: (1) mandatory moisture test, (2) reinforced moisture barrier if needed, (3) 100% solids epoxy as body, and (4) aliphatic polyaspartic topcoat for maximum UV and salt resistance. Skipping any of these steps in Guanacaste guarantees future problems.",
        },
        {
          question: "Does Guanacaste's extreme heat complicate installation?",
          answer:
            "It requires experience but isn't an obstacle. We apply in cool hours (early morning), use extended pot life formulations for heat, and take advantage that accelerated curing allows faster project delivery. The final result is just as resistant as in temperate climates.",
        },
      ],
    },
    metaTitle: {
      es: "Pisos Epóxicos en Guanacaste, Costa Rica | Anti-Sal UV | SobrePoxi",
      en: "Epoxy Floors in Guanacaste, Costa Rica | Salt & UV Resistant | SobrePoxi",
    },
    metaDescription: {
      es: "Pisos epóxicos para casas de playa en Guanacaste: Tamarindo, Flamingo, Sámara. Sistemas anti-salinidad y UV extremo. Visita técnica y proyectos en toda la costa.",
      en: "Epoxy floors for beach houses in Guanacaste: Tamarindo, Flamingo, Sámara. Anti-salinity and extreme UV systems. Technical visit and projects throughout the coast.",
    },
    keywords: {
      es: "pisos epoxicos Guanacaste, piso epoxico casa playa Tamarindo, resina epoxica Costa Rica playa, piso epoxico salinidad, instalador epoxico Guanacaste Liberia",
      en: "epoxy floors Guanacaste, epoxy flooring beach house Tamarindo, epoxy resin Costa Rica beach, epoxy floor salinity, epoxy installer Guanacaste Liberia",
    },
  },
];

export function getCityConfig(slug: string): CityEpoxyConfig | undefined {
  return CITY_CONFIGS.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITY_CONFIGS.map((c) => c.slug);
}
