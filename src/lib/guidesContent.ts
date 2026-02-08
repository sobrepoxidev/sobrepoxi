// src/lib/guidesContent.ts
// ─────────────────────────────────────────────────────────────────────────────
// Content hub: SEO-optimized guides targeting informational long-tail keywords
// about epoxy resin, flooring, furniture, and decorative applications.
// ─────────────────────────────────────────────────────────────────────────────

export interface GuideSection {
  heading: string;
  content: string;       // HTML-safe string (paragraphs, lists)
  image?: string;        // optional illustrative image
  imageAlt?: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  locale: "es" | "en";
  // SEO
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  // Content
  heroTitle: string;
  heroSubtitle: string;
  publishedDate: string;       // ISO date
  updatedDate: string;         // ISO date
  readingTime: string;         // e.g. "6 min"
  category: string;
  categorySlug: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
  // Internal linking
  relatedSlugs: string[];      // slugs of related guides
  ctaText: string;
  ctaLink: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GUIDE DEFINITIONS — Spanish
// ═══════════════════════════════════════════════════════════════════════════════

const guidesES: Guide[] = [
  // ── 1. Pisos epóxicos para cocheras ───────────────────────────────────────
  {
    slug: "pisos-epoxicos-para-cocheras",
    locale: "es",
    title: "Pisos Epóxicos para Cocheras: Diseños, Tipos y Beneficios",
    metaTitle: "Pisos Epóxicos para Cocheras | Diseños Modernos y Duraderos | SobrePoxi",
    metaDescription: "Guía completa sobre pisos epóxicos para cocheras y garajes. Descubre diseños modernos, tipos de resina, beneficios, costos y por qué son la mejor opción para tu cochera en Costa Rica.",
    keywords: "pisos epóxicos cochera, resina epóxica garaje, diseños cochera epóxico, piso garaje moderno, pisos para cochera Costa Rica, recubrimiento epóxico garaje",
    heroTitle: "Pisos Epóxicos para Cocheras",
    heroSubtitle: "Transforma tu garaje con un piso resistente, moderno y fácil de mantener",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "8 min",
    category: "Pisos Residenciales",
    categorySlug: "pisos-residenciales",
    sections: [
      {
        heading: "¿Por qué elegir un piso epóxico para tu cochera?",
        content: `<p>La cochera es uno de los espacios más exigidos del hogar: soporta el peso de vehículos, derrames de aceite, químicos y tráfico constante. Un <strong>piso epóxico</strong> transforma este espacio en una superficie resistente, elegante y extremadamente fácil de limpiar.</p>
<p>A diferencia de la pintura convencional para concreto, la resina epóxica crea una capa monolítica que se adhiere químicamente al sustrato, formando una barrera impermeable que protege el concreto de la humedad, manchas y desgaste.</p>
<ul>
<li><strong>Resistencia a manchas:</strong> Aceite de motor, gasolina y químicos se limpian con facilidad</li>
<li><strong>Durabilidad extrema:</strong> Soporta el peso de vehículos pesados sin agrietarse</li>
<li><strong>Estética moderna:</strong> Acabados brillantes, metálicos o con escamas decorativas</li>
<li><strong>Fácil mantenimiento:</strong> Una pasada de mopa húmeda es suficiente</li>
<li><strong>Aumento de valor:</strong> Una cochera con piso epóxico aumenta el valor de tu propiedad</li>
</ul>`
      },
      {
        heading: "Tipos de pisos epóxicos para cocheras",
        content: `<p>Existen varios sistemas de resina epóxica diseñados específicamente para cocheras, cada uno con características únicas:</p>
<h3>1. Epóxico Sólido (100% sólidos)</h3>
<p>El sistema más resistente y duradero. Crea una capa gruesa de entre 2-3 mm que soporta tráfico vehicular pesado. Ideal para cocheras de uso intensivo.</p>
<h3>2. Epóxico con Escamas (Flake System)</h3>
<p>Combina resina epóxica con escamas decorativas de vinilo que le dan un aspecto único tipo granito. Las escamas también aportan textura antideslizante, perfecto para zonas donde puede haber agua.</p>
<h3>3. Epóxico Metálico</h3>
<p>Utiliza pigmentos metálicos que crean efectos tridimensionales impresionantes: lava, mármol, océano o galaxia. Es el sistema más espectacular visualmente y cada piso es único e irrepetible.</p>
<h3>4. Epóxico Autonivelante</h3>
<p>Se aplica como un líquido que se autonivela, creando una superficie perfectamente lisa y uniforme. Excelente para cocheras donde se busca un acabado tipo espejo.</p>
<h3>5. Poliurea/Poliaspártico</h3>
<p>Aunque no es técnicamente epóxico, es un sistema híbrido que cura en horas (vs. días del epóxico). Ideal para cocheras que necesitan estar operativas rápidamente.</p>`
      },
      {
        heading: "Diseños populares para cocheras con epóxico",
        content: `<p>Las posibilidades de diseño con resina epóxica son prácticamente infinitas. Estos son los diseños más solicitados:</p>
<ul>
<li><strong>Efecto Granito/Terrazo:</strong> Escamas multicolor sobre base gris o negra — el más popular para cocheras</li>
<li><strong>Mármol Metálico:</strong> Pigmentos metálicos que imitan mármol de lujo en tonos grises, blancos o negros</li>
<li><strong>Color Sólido Premium:</strong> Gris antracita, negro profundo o blanco hueso — elegancia minimalista</li>
<li><strong>Efecto Industrial:</strong> Gris concreto pulido con acabado satinado — estilo moderno</li>
<li><strong>Doble Tono:</strong> Combinación de dos colores con líneas de demarcación — perfecto para delimitar áreas de estacionamiento</li>
</ul>
<p>En <strong>SobrePoxi</strong> trabajamos contigo para diseñar el piso ideal según el estilo de tu hogar y el uso que le das a tu cochera.</p>`
      },
      {
        heading: "Proceso de instalación paso a paso",
        content: `<p>La instalación profesional de un piso epóxico para cochera sigue estos pasos críticos:</p>
<ol>
<li><strong>Preparación del sustrato:</strong> Limpieza profunda, reparación de grietas y perfilado del concreto (esmerilado o shot blasting) para garantizar adherencia</li>
<li><strong>Aplicación del primer:</strong> Capa base que penetra el concreto y sella los poros</li>
<li><strong>Aplicación del epóxico:</strong> Capa principal de resina con el diseño elegido</li>
<li><strong>Elementos decorativos:</strong> Escamas, pigmentos metálicos o diseños personalizados</li>
<li><strong>Sello protector (topcoat):</strong> Capa final de poliuretano o poliaspártico que protege contra rayos UV y abrasión</li>
</ol>
<p><strong>Tiempo total:</strong> 3-5 días dependiendo del sistema y las condiciones climáticas. El piso está listo para tráfico peatonal a las 24 horas y vehicular a las 72 horas.</p>`
      },
      {
        heading: "¿Cuánto cuesta un piso epóxico para cochera en Costa Rica?",
        content: `<p>El costo varía según el sistema elegido, el estado del concreto existente y el área total:</p>
<ul>
<li><strong>Epóxico básico con escamas:</strong> Inversión accesible, ideal para cocheras estándar</li>
<li><strong>Epóxico metálico premium:</strong> Inversión media-alta, acabado de lujo</li>
<li><strong>Sistema completo con poliaspártico:</strong> Máxima durabilidad y resistencia UV</li>
</ul>
<p>Cada proyecto es único, por lo que te invitamos a <strong>solicitar una cotización personalizada</strong> sin compromiso. En SobrePoxi evaluamos tu espacio y te damos opciones que se ajusten a tu presupuesto.</p>`
      }
    ],
    faqs: [
      { question: "¿Cuánto dura un piso epóxico en una cochera?", answer: "Un piso epóxico profesionalmente instalado en una cochera puede durar entre 10 y 20 años con mantenimiento adecuado. La durabilidad depende del sistema utilizado y el nivel de tráfico." },
      { question: "¿El piso epóxico se pone resbaloso cuando está mojado?", answer: "Los sistemas con escamas decorativas o aditivos antideslizantes proporcionan excelente tracción incluso mojados. Siempre recomendamos incluir textura antideslizante para cocheras." },
      { question: "¿Se puede instalar piso epóxico sobre concreto viejo?", answer: "Sí, siempre que el concreto esté estructuralmente sano. Se realizan reparaciones de grietas y un perfilado profesional antes de la aplicación para garantizar adherencia perfecta." },
      { question: "¿El aceite de carro mancha el piso epóxico?", answer: "No. Una de las principales ventajas del epóxico es su resistencia a manchas de aceite, gasolina y otros químicos automotrices. Se limpian fácilmente con agua y jabón." },
      { question: "¿Cuánto tiempo toma instalar el piso epóxico en la cochera?", answer: "La instalación completa toma entre 3 y 5 días. Podrás caminar sobre el piso a las 24 horas y estacionar vehículos a las 72 horas aproximadamente." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "pisos-epoxicos-modernos-para-interiores", "mantenimiento-pisos-epoxicos"],
    ctaText: "¿Listo para transformar tu cochera? Solicita tu cotización gratuita",
    ctaLink: "/contact"
  },

  // ── 2. Pisos epóxicos modernos para interiores ────────────────────────────
  {
    slug: "pisos-epoxicos-modernos-para-interiores",
    locale: "es",
    title: "Pisos Epóxicos Modernos para Interiores: Salas, Cocinas y Más",
    metaTitle: "Pisos Epóxicos Modernos para Interiores | Salas y Cocinas | SobrePoxi",
    metaDescription: "Descubre cómo los pisos epóxicos transforman salas, cocinas y espacios interiores. Diseños modernos, colores tendencia y acabados de lujo para tu hogar en Costa Rica.",
    keywords: "pisos modernos salas, pisos epóxicos interiores, pisos resina para casa, pisos modernos cocina, pisos decorativos hogar, pisos sin juntas interiores",
    heroTitle: "Pisos Epóxicos Modernos para Interiores",
    heroSubtitle: "Dale a tu hogar un look contemporáneo con pisos sin juntas de resina epóxica",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "7 min",
    category: "Pisos Residenciales",
    categorySlug: "pisos-residenciales",
    sections: [
      {
        heading: "La tendencia de pisos sin juntas en interiores",
        content: `<p>Los pisos epóxicos han dejado de ser exclusivos de fábricas e industrias. Hoy son una de las <strong>tendencias más fuertes en diseño de interiores</strong>, especialmente en espacios residenciales modernos donde se busca continuidad visual y un estilo minimalista.</p>
<p>Un piso epóxico crea una superficie completamente <strong>sin juntas ni líneas de unión</strong>, lo que amplía visualmente cualquier espacio. Esto es especialmente impactante en salas de estar, cocinas abiertas y espacios tipo loft.</p>`
      },
      {
        heading: "Espacios ideales para pisos epóxicos en el hogar",
        content: `<h3>Salas de estar</h3>
<p>Los pisos metálicos en tonos neutros (gris perla, blanco marfil, arena) crean un lienzo perfecto para cualquier estilo de decoración. Su acabado brillante refleja la luz natural, haciendo que la sala se sienta más amplia y luminosa.</p>
<h3>Cocinas</h3>
<p>La impermeabilidad del epóxico lo hace ideal para cocinas. No absorbe líquidos, resiste manchas de vino, café y aceite, y se limpia en segundos. Además, elimina las juntas donde se acumula suciedad.</p>
<h3>Baños</h3>
<p>Con acabado antideslizante, los pisos epóxicos son perfectos para baños. Cero juntas significa cero moho acumulado entre baldosas.</p>
<h3>Terrazas techadas</h3>
<p>Para terrazas protegidas del sol directo, el epóxico ofrece un acabado elegante que conecta visualmente el interior con el exterior.</p>
<h3>Pasillos y áreas de tránsito</h3>
<p>La continuidad visual del epóxico elimina las interrupciones entre espacios, creando un flujo natural en toda la casa.</p>`
      },
      {
        heading: "Colores y acabados tendencia para 2026",
        content: `<p>Las tendencias en pisos epóxicos para interiores este año se centran en:</p>
<ul>
<li><strong>Tonos tierra cálidos:</strong> Beige, arena, terracota suave — conectan con la naturaleza</li>
<li><strong>Grises sofisticados:</strong> Desde gris perla hasta grafito — elegancia atemporal</li>
<li><strong>Blancos cremosos:</strong> Efecto mármol blanco para espacios luminosos y minimalistas</li>
<li><strong>Efecto concreto pulido:</strong> Look industrial-chic muy popular en lofts y espacios modernos</li>
<li><strong>Tonos verdes y azules suaves:</strong> Matices orgánicos que aportan serenidad</li>
</ul>
<p>En <strong>SobrePoxi</strong> creamos muestras físicas del color y acabado que elijas para que puedas verlo en tu espacio antes de decidir.</p>`
      },
      {
        heading: "Ventajas frente a otros pisos para interiores",
        content: `<p>Comparado con opciones tradicionales, el piso epóxico tiene ventajas únicas:</p>
<ul>
<li><strong>vs. Porcelanato:</strong> Sin juntas, más cálido al tacto, instalación más rápida en áreas grandes</li>
<li><strong>vs. Madera/Laminado:</strong> 100% resistente al agua, no se raya con facilidad, no se hincha</li>
<li><strong>vs. Microcemento:</strong> Mayor resistencia química, más opciones de color, mejor brillo</li>
<li><strong>vs. Mármol:</strong> Fracción del costo, más resistente a manchas, mismo efecto visual</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Los pisos epóxicos son fríos para interiores?", answer: "Tienen una temperatura similar al concreto. Son compatibles con sistemas de calefacción radiante y en climas como el de Costa Rica, su frescura es en realidad una ventaja." },
      { question: "¿Se puede poner piso epóxico sobre cerámica existente?", answer: "En muchos casos sí, dependiendo del estado de la cerámica. Se realiza una evaluación técnica para determinar si es necesario retirar el piso existente o si se puede aplicar directamente." },
      { question: "¿Los pisos epóxicos se ponen amarillos con el tiempo?", answer: "Los sistemas con topcoat de poliuretano alifático o poliaspártico están diseñados para resistir el amarillamiento por rayos UV. Es importante usar el sistema correcto para interiores con mucha luz natural." },
      { question: "¿Son seguros los pisos epóxicos para niños y mascotas?", answer: "Sí. Una vez curados completamente (72 horas), los pisos epóxicos son inertes, no tóxicos y no emiten gases. Son una superficie higiénica ideal para familias con niños y mascotas." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "disenos-pisos-epoxicos-tendencias", "tipos-de-resina-epoxica"],
    ctaText: "¿Quieres ver cómo luciría un piso epóxico en tu hogar? Agenda una consulta de diseño",
    ctaLink: "/contact"
  },

  // ── 3. Tipos de resina epóxica ────────────────────────────────────────────
  {
    slug: "tipos-de-resina-epoxica",
    locale: "es",
    title: "Tipos de Resina Epóxica: Guía Completa para Elegir la Correcta",
    metaTitle: "Tipos de Resina Epóxica | Guía Completa | SobrePoxi",
    metaDescription: "Conoce los diferentes tipos de resina epóxica: para pisos, muebles, arte y más. Aprende cuál es la mejor según tu proyecto. Guía experta de SobrePoxi Costa Rica.",
    keywords: "tipos resina epóxica, resina epóxica para pisos, resina para muebles, resina cristalina, resina epóxica usos, qué resina epóxica usar, diferencias resina epóxica",
    heroTitle: "Tipos de Resina Epóxica",
    heroSubtitle: "Guía completa para elegir la resina correcta según tu proyecto",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "9 min",
    category: "Guías Técnicas",
    categorySlug: "guias-tecnicas",
    sections: [
      {
        heading: "¿Qué es la resina epóxica?",
        content: `<p>La <strong>resina epóxica</strong> es un polímero termoestable que se forma al mezclar dos componentes: una resina base (bisfenol A o F) y un endurecedor (amina o poliamida). Esta reacción química produce un material extraordinariamente duro, resistente y versátil.</p>
<p>No todas las resinas epóxicas son iguales. Existen formulaciones específicas diseñadas para diferentes aplicaciones: pisos industriales, muebles artísticos, arte, construcción y más. Usar la resina incorrecta es el error más común y puede arruinar un proyecto.</p>`
      },
      {
        heading: "Resina epóxica para pisos",
        content: `<p>Las resinas para pisos están formuladas para soportar tráfico, impactos y abrasión. Se clasifican en:</p>
<h3>Epóxico 100% Sólidos</h3>
<p>Sin solventes. Crea capas gruesas (hasta 3mm por aplicación). La opción más resistente para pisos industriales y cocheras. Requiere equipo profesional para su aplicación.</p>
<h3>Epóxico Base Agua</h3>
<p>Más fácil de aplicar y con menos olor. Ideal para espacios residenciales y áreas con poca ventilación. Menor resistencia química que el 100% sólidos.</p>
<h3>Epóxico Base Solvente</h3>
<p>Excelente penetración en concreto. Se usa principalmente como primer o sellador. Mayor olor durante la aplicación.</p>
<h3>Epóxico Metálico</h3>
<p>Formulación especial con pigmentos metálicos que crea efectos tridimensionales. Usado para pisos decorativos de alta gama en residencias y comercios.</p>`
      },
      {
        heading: "Resina epóxica para muebles y arte",
        content: `<p>Para muebles y arte se requieren resinas con propiedades distintas a las de pisos:</p>
<h3>Resina Cristalina (Table Top)</h3>
<p>Alta transparencia, autodesaireante y resistente al amarillamiento UV. Perfecta para mesas río, encapsulados y arte en resina. Se puede verter en capas gruesas sin generar burbujas excesivas.</p>
<h3>Resina de Laminación</h3>
<p>Baja viscosidad para impregnar fibras (carbono, vidrio) o crear capas delgadas. Usada en la fabricación de tablas de surf, joyería y recubrimientos finos.</p>
<h3>Resina de Vaciado (Deep Pour)</h3>
<p>Diseñada para vertidos profundos de hasta 5cm por capa. Genera menos calor exotérmico, lo que previene fisuras. Ideal para mesas río y piezas artísticas de gran volumen.</p>`
      },
      {
        heading: "Resina epóxica para construcción e industria",
        content: `<p>En el sector constructivo e industrial, las resinas epóxicas tienen aplicaciones críticas:</p>
<ul>
<li><strong>Mortero epóxico:</strong> Reparación de concreto estructural y anclaje de pernos</li>
<li><strong>Inyección de grietas:</strong> Sellado y reparación de fisuras en estructuras de concreto</li>
<li><strong>Recubrimiento anticorrosivo:</strong> Protección de tanques, tuberías y estructuras metálicas</li>
<li><strong>Adhesivo estructural:</strong> Unión de materiales disímiles con resistencia superior</li>
</ul>`
      },
      {
        heading: "¿Cómo elegir la resina correcta para tu proyecto?",
        content: `<p>Usa esta guía rápida para seleccionar la resina adecuada:</p>
<ul>
<li><strong>Para pisos de cochera o industria:</strong> Epóxico 100% sólidos + topcoat poliaspártico</li>
<li><strong>Para pisos decorativos en casa:</strong> Epóxico metálico + topcoat UV resistente</li>
<li><strong>Para mesas río o encapsulados:</strong> Resina cristalina Table Top o Deep Pour según el grosor</li>
<li><strong>Para arte y joyería:</strong> Resina cristalina de baja viscosidad</li>
<li><strong>Para reparaciones de concreto:</strong> Mortero epóxico o resina de inyección</li>
</ul>
<p>En <strong>SobrePoxi</strong> somos expertos en todos estos sistemas. Te asesoramos sin costo para que uses el producto correcto en tu proyecto.</p>`
      }
    ],
    faqs: [
      { question: "¿Cuál es la diferencia entre resina epóxica y poliéster?", answer: "La resina epóxica es más resistente, durable y tiene mejor adherencia que la poliéster. La poliéster es más económica pero se amarillea rápido y es menos resistente a químicos. Para pisos y muebles de calidad, siempre recomendamos epóxica." },
      { question: "¿La resina epóxica es tóxica?", answer: "Durante la aplicación puede emitir vapores irritantes y se deben usar equipos de protección (guantes, mascarilla, gafas). Una vez curada completamente (48-72 horas), es inerte y segura para contacto con alimentos en formulaciones certificadas." },
      { question: "¿Cuánto tarda en curar la resina epóxica?", answer: "Depende de la formulación: las de pisos curan al tacto en 12-24 horas y completamente en 5-7 días. Las de muebles (deep pour) pueden tardar 48-72 horas al tacto. La temperatura y humedad afectan el tiempo de curado." },
      { question: "¿Se puede reparar un piso epóxico dañado?", answer: "Sí. Los daños localizados se pueden reparar sin necesidad de rehacer todo el piso. Se lija el área afectada y se aplica una nueva capa de resina. Es una de las ventajas del sistema." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "muebles-resina-epoxica-guia", "pisos-epoxicos-modernos-para-interiores"],
    ctaText: "¿No sabes qué resina necesitas? Contáctanos y te asesoramos gratis",
    ctaLink: "/contact"
  },

  // ── 4. Mantenimiento de pisos epóxicos ────────────────────────────────────
  {
    slug: "mantenimiento-pisos-epoxicos",
    locale: "es",
    title: "Mantenimiento de Pisos Epóxicos: Cómo Cuidarlos para que Duren Más",
    metaTitle: "Mantenimiento de Pisos Epóxicos | Guía de Cuidado | SobrePoxi",
    metaDescription: "Aprende cómo limpiar y mantener tus pisos epóxicos para que duren 20+ años. Consejos profesionales de limpieza, productos recomendados y errores a evitar.",
    keywords: "mantenimiento pisos epóxicos, cómo limpiar piso epóxico, cuidado piso resina, limpieza piso epóxico, duración piso epóxico, productos limpieza epóxico",
    heroTitle: "Mantenimiento de Pisos Epóxicos",
    heroSubtitle: "Consejos profesionales para que tu piso luzca como nuevo durante décadas",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "5 min",
    category: "Guías Técnicas",
    categorySlug: "guias-tecnicas",
    sections: [
      {
        heading: "La limpieza diaria es más fácil de lo que piensas",
        content: `<p>Una de las mayores ventajas de los pisos epóxicos es lo <strong>increíblemente fáciles de limpiar</strong> que son. Su superficie no porosa impide que la suciedad penetre, por lo que la limpieza diaria se reduce a:</p>
<ol>
<li><strong>Barrido o aspirado:</strong> Retira polvo y partículas sueltas con escoba suave o aspiradora</li>
<li><strong>Trapeado húmedo:</strong> Usa agua tibia con un limpiador neutro (pH 7-8). No necesitas productos especiales</li>
<li><strong>Secado:</strong> Opcionalmente, seca con mopa de microfibra para un acabado brillante</li>
</ol>
<p>¡Eso es todo! Un piso que toma minutos en limpiarse versus las juntas de cerámica que acumulan suciedad.</p>`
      },
      {
        heading: "Limpieza profunda (mensual)",
        content: `<p>Una vez al mes, realiza una limpieza más a fondo:</p>
<ul>
<li>Usa un limpiador desengrasante suave diluido en agua</li>
<li>Aplica con mopa de microfibra en movimientos circulares</li>
<li>Enjuaga bien con agua limpia</li>
<li>Para manchas difíciles, deja actuar el limpiador 5-10 minutos antes de frotar</li>
</ul>
<p><strong>Tip profesional:</strong> Nunca uses ácido muriático, cloro concentrado o limpiadores abrasivos. Estos pueden dañar el acabado del epóxico.</p>`
      },
      {
        heading: "Productos que SÍ y NO debes usar",
        content: `<h3>Productos recomendados</h3>
<ul>
<li>Agua tibia + jabón neutro (el más seguro y efectivo)</li>
<li>Limpiadores multiusos con pH neutro</li>
<li>Desengrasantes biodegradables diluidos</li>
<li>Amoníaco diluido (1/4 taza por galón de agua) para manchas difíciles</li>
</ul>
<h3>Productos a EVITAR</h3>
<ul>
<li><strong>Ácido muriático:</strong> Corroe el topcoat y opaca el piso</li>
<li><strong>Vinagre puro:</strong> Su acidez puede dañar el brillo con el tiempo</li>
<li><strong>Cloro concentrado:</strong> Decolora y debilita la resina</li>
<li><strong>Limpiadores en polvo abrasivos:</strong> Rayan la superficie</li>
<li><strong>Ceras para pisos:</strong> Crean una capa que opaca el brillo natural del epóxico</li>
</ul>`
      },
      {
        heading: "Cómo prevenir daños y extender la vida útil",
        content: `<p>Con estos cuidados simples, tu piso epóxico puede durar 20 años o más:</p>
<ul>
<li><strong>Protectores en muebles:</strong> Usa fieltros adhesivos en las patas de mesas y sillas</li>
<li><strong>Tapetes en entradas:</strong> Capturan arena y piedras que pueden rayar la superficie</li>
<li><strong>Limpieza inmediata de derrames:</strong> Aunque el epóxico resiste manchas, limpiar rápido es mejor</li>
<li><strong>Evita arrastrar objetos pesados:</strong> Levanta los muebles al moverlos</li>
<li><strong>Protección solar:</strong> En áreas con mucha luz UV directa, las cortinas ayudan a prevenir decoloración</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Con qué frecuencia debo limpiar mi piso epóxico?", answer: "Barrido diario o cada 2 días, y trapeado húmedo 1-2 veces por semana es suficiente para la mayoría de los hogares. Limpieza profunda una vez al mes." },
      { question: "¿Se puede usar hidrolavadora en pisos epóxicos?", answer: "Sí, pero con precaución. Usa presión baja-media y mantén la boquilla a al menos 30cm del piso. La presión excesiva puede dañar el topcoat con el tiempo." },
      { question: "¿El piso epóxico pierde brillo con el tiempo?", answer: "Es normal una ligera pérdida de brillo después de varios años de uso. Se puede restaurar con una aplicación de topcoat nuevo sin necesidad de rehacer todo el piso." },
      { question: "¿Qué hago si mi piso epóxico se raya?", answer: "Las rayas superficiales se pueden pulir con una almohadilla de pulido fino. Para rayas profundas, un profesional puede reparar el área afectada sin intervenir el resto del piso." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "pisos-epoxicos-modernos-para-interiores", "pisos-epoxicos-para-negocios"],
    ctaText: "¿Tu piso epóxico necesita mantenimiento profesional? Contáctanos",
    ctaLink: "/contact"
  },

  // ── 5. Diseños de pisos epóxicos — tendencias ─────────────────────────────
  {
    slug: "disenos-pisos-epoxicos-tendencias",
    locale: "es",
    title: "Diseños de Pisos Epóxicos: Tendencias y Ideas para Inspirarte",
    metaTitle: "Diseños de Pisos Epóxicos | Tendencias e Ideas | SobrePoxi",
    metaDescription: "Explora los diseños de pisos epóxicos más impactantes: metálicos, efecto mármol, 3D, escamas y más. Ideas de diseño para hogares y negocios en Costa Rica.",
    keywords: "diseños pisos epóxicos, pisos epóxicos metálicos, piso efecto mármol resina, pisos 3D epóxicos, ideas pisos resina, pisos decorativos epóxicos",
    heroTitle: "Diseños de Pisos Epóxicos",
    heroSubtitle: "Tendencias, ideas e inspiración para tu próximo proyecto",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "6 min",
    category: "Inspiración",
    categorySlug: "inspiracion",
    sections: [
      {
        heading: "Pisos epóxicos metálicos: el rey de los diseños",
        content: `<p>Los <strong>pisos metálicos</strong> son sin duda el diseño más impactante y solicitado. Utilizan pigmentos metálicos especiales que, al ser manipulados durante la aplicación, crean efectos tridimensionales únicos:</p>
<ul>
<li><strong>Efecto lava:</strong> Flujos de color que simulan lava volcánica — dramático e impactante</li>
<li><strong>Efecto océano:</strong> Tonos azules y turquesa con efecto de olas y profundidad</li>
<li><strong>Efecto mármol:</strong> Vetas naturales que imitan mármol italiano de alta gama</li>
<li><strong>Efecto galaxia:</strong> Combinación de negros, azules y destellos metálicos</li>
<li><strong>Efecto nube:</strong> Blancos y grises suaves con transiciones etéreas</li>
</ul>
<p>Cada piso metálico es <strong>100% único e irrepetible</strong> — literalmente una obra de arte bajo tus pies.</p>`
      },
      {
        heading: "Sistema de escamas (Flake Floor)",
        content: `<p>El sistema de escamas es el más popular para cocheras, gimnasios y áreas comerciales por su combinación de estética y funcionalidad:</p>
<ul>
<li><strong>Multicolor clásico:</strong> Mezcla de 3-4 colores que oculta imperfecciones y suciedad</li>
<li><strong>Monocromático elegante:</strong> Un solo color de escama sobre base contrastante</li>
<li><strong>Cobertura parcial:</strong> Escamas distribuidas con espaciado para un look más sutil</li>
<li><strong>Cobertura total:</strong> Escamas cubriendo el 100% para máxima textura y durabilidad</li>
</ul>
<p>Las escamas también aportan <strong>textura antideslizante</strong>, haciendo estos pisos funcionales además de hermosos.</p>`
      },
      {
        heading: "Diseños con cuarzo y arena",
        content: `<p>Para ambientes que requieren máxima resistencia y un look industrial-chic:</p>
<ul>
<li><strong>Cuarzo broadcast:</strong> Arena de cuarzo coloreada esparcida sobre epóxico — ultra resistente al tráfico</li>
<li><strong>Terrazo epóxico:</strong> Simula el terrazo tradicional pero sin juntas y con colores personalizables</li>
<li><strong>Arena natural:</strong> Crea texturas orgánicas que evocan piedra natural o playa</li>
</ul>`
      },
      {
        heading: "Tendencias de color para 2026",
        content: `<p>Los colores más solicitados este año reflejan una búsqueda de calma y conexión con la naturaleza:</p>
<ul>
<li><strong>#1 Gris cálido (Greige):</strong> La mezcla de gris y beige domina los proyectos residenciales</li>
<li><strong>#2 Blanco perla:</strong> Luminosidad y amplitud visual — favorito para apartamentos</li>
<li><strong>#3 Negro satinado:</strong> Elegancia máxima para espacios premium y comerciales</li>
<li><strong>#4 Tonos terrosos:</strong> Terracota, arcilla y miel — calidez natural</li>
<li><strong>#5 Azul profundo:</strong> Sofisticación y personalidad para espacios únicos</li>
</ul>`
      },
      {
        heading: "Cómo elegir el diseño perfecto para tu espacio",
        content: `<p>Considera estos factores al elegir tu diseño:</p>
<ul>
<li><strong>Iluminación del espacio:</strong> Espacios oscuros se benefician de colores claros y acabados brillantes</li>
<li><strong>Tamaño del área:</strong> Los colores claros y uniformes amplían visualmente los espacios pequeños</li>
<li><strong>Uso del espacio:</strong> Áreas de alto tráfico se benefician de diseños multicolor que ocultan desgaste</li>
<li><strong>Estilo de decoración:</strong> El piso debe complementar, no competir, con el mobiliario y la decoración</li>
<li><strong>Mantenimiento deseado:</strong> Los colores oscuros muestran más el polvo; los claros muestran manchas</li>
</ul>
<p>En <strong>SobrePoxi</strong> creamos muestras físicas para que veas exactamente cómo lucirá tu piso antes de comprometerte.</p>`
      }
    ],
    faqs: [
      { question: "¿Se puede personalizar cualquier diseño de piso epóxico?", answer: "Sí. Los pisos epóxicos son completamente personalizables en color, patrón, textura y acabado. Podemos igualar cualquier color Pantone o crear combinaciones únicas según tu visión." },
      { question: "¿El piso metálico se ve igual en fotos que en persona?", answer: "Los pisos metálicos son aún más impresionantes en persona. Las fotos no capturan la profundidad tridimensional ni cómo los efectos cambian según el ángulo de la luz. Recomendamos ver muestras en vivo." },
      { question: "¿Puedo incluir logos o diseños personalizados en el piso?", answer: "Sí. Podemos incorporar logos, nombres, diseños geométricos o cualquier imagen personalizada en tu piso epóxico. Es popular en negocios, showrooms y garajes de entusiastas." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "pisos-epoxicos-modernos-para-interiores", "pisos-epoxicos-para-negocios"],
    ctaText: "¿Ya tienes una idea en mente? Cuéntanos tu visión y la hacemos realidad",
    ctaLink: "/contact"
  },

  // ── 6. Muebles de resina epóxica ─────────────────────────────────────────
  {
    slug: "muebles-resina-epoxica-guia",
    locale: "es",
    title: "Muebles de Resina Epóxica: Mesas Río, Arte y Diseños Únicos",
    metaTitle: "Muebles de Resina Epóxica | Mesas Río y Diseños | SobrePoxi",
    metaDescription: "Todo sobre muebles de resina epóxica: mesas río, mesas de centro, barras y más. Descubre diseños, proceso de fabricación y cómo encargar tu pieza única en Costa Rica.",
    keywords: "muebles resina epóxica, mesa río epóxica, mesa resina y madera, muebles epóxicos Costa Rica, barra resina epóxica, arte resina epóxica, mesa centro resina",
    heroTitle: "Muebles de Resina Epóxica",
    heroSubtitle: "Piezas únicas donde la naturaleza se encuentra con el arte",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "7 min",
    category: "Muebles",
    categorySlug: "muebles",
    sections: [
      {
        heading: "¿Qué son los muebles de resina epóxica?",
        content: `<p>Los <strong>muebles de resina epóxica</strong> son piezas de mobiliario que combinan materiales naturales —principalmente madera— con resina epóxica cristalina o pigmentada. El resultado son muebles que fusionan la belleza orgánica de la madera con los efectos artísticos de la resina.</p>
<p>La pieza más icónica es la <strong>"mesa río"</strong> (river table): dos piezas de madera de borde vivo unidas por un río de resina transparente o coloreada que fluye entre ellas. Pero las posibilidades van mucho más allá.</p>`
      },
      {
        heading: "Tipos de muebles con resina epóxica",
        content: `<ul>
<li><strong>Mesas río (River Tables):</strong> La joya de la corona. Mesas de comedor, escritorios o mesas de centro con ríos de resina entre tablones de madera</li>
<li><strong>Mesas de centro:</strong> Piezas compactas con diseños artísticos, incluyendo encapsulados de objetos decorativos</li>
<li><strong>Barras y mostradores:</strong> Superficies de bar con resina que incorporan LEDs, objetos o diseños personalizados</li>
<li><strong>Tablas de cortar artísticas:</strong> Piezas funcionales y decorativas para cocina</li>
<li><strong>Relojes de pared:</strong> Arte funcional con combinaciones de madera y resina</li>
<li><strong>Estantes y repisas:</strong> Piezas decorativas con borde vivo y resina</li>
<li><strong>Arte de pared:</strong> Cuadros y murales tridimensionales en resina</li>
</ul>`
      },
      {
        heading: "El proceso de creación de una mesa río",
        content: `<p>Crear una mesa río es un proceso artesanal que requiere paciencia y experiencia:</p>
<ol>
<li><strong>Selección de madera:</strong> Se eligen tablones con borde vivo (live edge) — cada pieza es única por sus formas naturales</li>
<li><strong>Preparación:</strong> Secado, cepillado y sellado de la madera para evitar burbujas de aire</li>
<li><strong>Construcción del molde:</strong> Se crea un molde a medida donde se colocarán la madera y la resina</li>
<li><strong>Vertido de resina:</strong> Se mezcla y vierte la resina (a menudo en múltiples capas para piezas gruesas)</li>
<li><strong>Eliminación de burbujas:</strong> Con pistola de calor o soplete se eliminan burbujas atrapadas</li>
<li><strong>Curado:</strong> 48-72 horas de curado controlando temperatura y humedad</li>
<li><strong>Desmolde y corte:</strong> Se retira del molde y se corta a dimensiones finales</li>
<li><strong>Lijado progresivo:</strong> Desde grano 80 hasta 3000 para lograr transparencia cristalina</li>
<li><strong>Acabado:</strong> Aceite, barniz o topcoat protector final</li>
<li><strong>Patas/estructura:</strong> Se instalan patas de metal, madera o diseño personalizado</li>
</ol>`
      },
      {
        heading: "¿Por qué invertir en un mueble de resina?",
        content: `<ul>
<li><strong>Pieza 100% única:</strong> Cada mueble es irrepetible por las formas naturales de la madera y los efectos de la resina</li>
<li><strong>Durabilidad excepcional:</strong> La resina epóxica es altamente resistente a rayones, manchas y humedad</li>
<li><strong>Valor artístico:</strong> Son piezas de arte funcional que se convierten en el centro de atención de cualquier espacio</li>
<li><strong>Personalización total:</strong> Color de resina, tipo de madera, dimensiones, diseño — todo hecho a tu medida</li>
<li><strong>Inversión a largo plazo:</strong> Los muebles de resina bien hechos mantienen e incluso aumentan su valor con el tiempo</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Cuánto cuesta una mesa río?", answer: "El precio varía según el tamaño, tipo de madera y complejidad del diseño. Mesas de centro empiezan en un rango accesible, mientras que mesas de comedor grandes representan una inversión mayor. Solicita cotización para tu proyecto específico." },
      { question: "¿La resina de las mesas se pone amarilla?", answer: "Las resinas de calidad profesional que usamos en SobrePoxi incluyen estabilizadores UV que minimizan el amarillamiento. Además, aplicamos topcoats protectores UV para mantener la transparencia durante años." },
      { question: "¿Se puede usar una mesa río como mesa de comedor diaria?", answer: "Sí. Con el acabado protector adecuado, una mesa río es completamente funcional para uso diario. Resiste calor moderado, manchas y humedad. Recomendamos usar posavasos para bebidas muy calientes." },
      { question: "¿Cuánto tiempo toma hacer una mesa río?", answer: "Dependiendo del tamaño y complejidad, el proceso completo toma entre 3 y 6 semanas: selección de madera, preparación, vertido, curado, lijado y acabado." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "disenos-pisos-epoxicos-tendencias"],
    ctaText: "¿Quieres tu propia mesa río o mueble personalizado? Hablemos de tu idea",
    ctaLink: "/contact"
  },

  // ── 7. Pisos epóxicos para negocios ───────────────────────────────────────
  {
    slug: "pisos-epoxicos-para-negocios",
    locale: "es",
    title: "Pisos Epóxicos para Negocios: Restaurantes, Tiendas, Oficinas y Más",
    metaTitle: "Pisos Epóxicos para Negocios | Comercial y Oficinas | SobrePoxi",
    metaDescription: "Pisos epóxicos comerciales para restaurantes, tiendas, oficinas, clínicas y más. Diseños profesionales, alta durabilidad y cumplimiento de normativas en Costa Rica.",
    keywords: "pisos epóxicos negocios, piso resina restaurante, piso epóxico oficina, pisos comerciales Costa Rica, piso epóxico clínica, pisos para tiendas",
    heroTitle: "Pisos Epóxicos para Negocios",
    heroSubtitle: "Impresiona a tus clientes con un piso que refleja la calidad de tu marca",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "6 min",
    category: "Pisos Comerciales",
    categorySlug: "pisos-comerciales",
    sections: [
      {
        heading: "¿Por qué los negocios eligen pisos epóxicos?",
        content: `<p>El piso es una de las superficies más grandes de cualquier negocio y tiene un impacto directo en la percepción de tus clientes. Un <strong>piso epóxico profesional</strong> comunica calidad, modernidad y atención al detalle.</p>
<p>Más allá de la estética, los pisos epóxicos ofrecen ventajas operativas que los hacen ideales para entornos comerciales:</p>
<ul>
<li><strong>Higiene superior:</strong> Sin juntas donde se acumule suciedad — cumple normativas sanitarias</li>
<li><strong>Resistencia al tráfico:</strong> Soporta miles de personas caminando diariamente sin deterioro</li>
<li><strong>Facilidad de limpieza:</strong> Reduce costos de mantenimiento hasta un 50% vs. otros pisos</li>
<li><strong>Personalización de marca:</strong> Incorpora los colores y logo de tu empresa en el piso</li>
<li><strong>Durabilidad:</strong> Inversión que dura 15-20 años vs. reemplazar cerámica cada 5-7 años</li>
</ul>`
      },
      {
        heading: "Aplicaciones por tipo de negocio",
        content: `<h3>Restaurantes y cafeterías</h3>
<p>Pisos impermeables que resisten derrames, grasa y limpieza constante. Los diseños metálicos crean ambientes únicos que se vuelven parte de la identidad del restaurante. Opciones antideslizantes para áreas de cocina.</p>
<h3>Tiendas retail y showrooms</h3>
<p>El piso brillante actúa como espejo de la iluminación, realzando los productos exhibidos. Los colores personalizados refuerzan la identidad de marca.</p>
<h3>Oficinas y coworking</h3>
<p>Pisos silenciosos, fáciles de mantener y con estética profesional. La ausencia de juntas facilita el movimiento de sillas con ruedas.</p>
<h3>Clínicas y consultorios</h3>
<p>Superficies no porosas que cumplen estándares de higiene médica. Fáciles de desinfectar y resistentes a químicos de limpieza hospitalaria.</p>
<h3>Gimnasios y centros deportivos</h3>
<p>Sistemas con alta resistencia al impacto, antideslizantes y con marcaje de zonas integrado en el piso.</p>`
      },
      {
        heading: "Logos y branding en el piso",
        content: `<p>Una de las ventajas exclusivas del epóxico es la capacidad de integrar elementos de marca directamente en el piso:</p>
<ul>
<li><strong>Logo de empresa:</strong> Encapsulado en resina en la entrada o área de recepción</li>
<li><strong>Colores corporativos:</strong> El piso completo en los colores de tu marca</li>
<li><strong>Zonificación por color:</strong> Diferentes áreas del negocio identificadas por color</li>
<li><strong>Señalética integrada:</strong> Flechas, números de estacionamiento o zonas de seguridad</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Se puede instalar piso epóxico sin cerrar el negocio?", answer: "Podemos trabajar por secciones para minimizar el impacto en la operación. Algunos sistemas de poliaspártico curan en horas, permitiendo habilitar áreas rápidamente." },
      { question: "¿El piso epóxico cumple normativas sanitarias?", answer: "Sí. Los pisos epóxicos sin juntas cumplen y superan las normativas sanitarias para restaurantes, clínicas y áreas de preparación de alimentos por su superficie no porosa." },
      { question: "¿Cuánto dura la instalación en un local comercial?", answer: "Depende del área y el sistema. Un local de 100m² con sistema estándar toma 3-5 días. Sistemas rápidos de poliaspártico pueden completarse en 1-2 días." }
    ],
    relatedSlugs: ["pisos-epoxicos-modernos-para-interiores", "mantenimiento-pisos-epoxicos", "disenos-pisos-epoxicos-tendencias"],
    ctaText: "¿Tu negocio necesita un piso que impresione? Cotiza sin compromiso",
    ctaLink: "/contact"
  },

  // ── 8. Resina epóxica vs otros materiales ─────────────────────────────────
  {
    slug: "resina-epoxica-vs-otros-materiales",
    locale: "es",
    title: "Resina Epóxica vs Otros Pisos: Porcelanato, Madera, Microcemento y Más",
    metaTitle: "Resina Epóxica vs Porcelanato, Madera y Microcemento | SobrePoxi",
    metaDescription: "Comparación detallada entre pisos de resina epóxica y porcelanato, madera, microcemento, mármol y cerámica. Descubre cuál es la mejor opción para tu espacio.",
    keywords: "epóxico vs porcelanato, resina vs madera, epóxico vs microcemento, comparación pisos, mejor piso para casa, epóxico vs cerámica, pisos más resistentes",
    heroTitle: "Resina Epóxica vs Otros Materiales",
    heroSubtitle: "Comparativa honesta para que tomes la mejor decisión",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "7 min",
    category: "Guías Técnicas",
    categorySlug: "guias-tecnicas",
    sections: [
      {
        heading: "Epóxico vs Porcelanato",
        content: `<p>El porcelanato es la opción más común en Costa Rica, pero tiene limitaciones que el epóxico resuelve:</p>
<table>
<tr><th>Característica</th><th>Epóxico</th><th>Porcelanato</th></tr>
<tr><td>Juntas</td><td>Cero juntas — superficie continua</td><td>Juntas cada 60-120cm que acumulan suciedad</td></tr>
<tr><td>Resistencia a manchas</td><td>Excelente — nada penetra</td><td>Buena, pero las juntas se manchan</td></tr>
<tr><td>Personalización</td><td>Infinita — cualquier color y diseño</td><td>Limitada a diseños fabricados</td></tr>
<tr><td>Instalación</td><td>3-5 días cualquier área</td><td>Varía, más lenta en áreas grandes</td></tr>
<tr><td>Reparabilidad</td><td>Reparaciones localizadas sin rehacer todo</td><td>Difícil encontrar piezas iguales años después</td></tr>
<tr><td>Durabilidad</td><td>15-20 años</td><td>10-15 años (juntas se deterioran antes)</td></tr>
</table>
<p><strong>Veredicto:</strong> El epóxico gana en estética continua y mantenimiento. El porcelanato es más económico inicialmente pero cuesta más a largo plazo por el mantenimiento de juntas.</p>`
      },
      {
        heading: "Epóxico vs Madera/Laminado",
        content: `<p>La madera tiene calidez natural, pero el epóxico la supera en practicidad:</p>
<ul>
<li><strong>Resistencia al agua:</strong> El epóxico es 100% impermeable; la madera se hincha y deforma con humedad</li>
<li><strong>Durabilidad:</strong> El epóxico no se raya con zapatos, muebles o mascotas como la madera</li>
<li><strong>Mantenimiento:</strong> La madera necesita pulido y lacado periódico; el epóxico solo necesita trapeado</li>
<li><strong>Costo a largo plazo:</strong> La madera necesita restauración cada 3-5 años; el epóxico dura 15-20 sin intervención</li>
</ul>
<p><strong>Veredicto:</strong> Si buscas practicidad y durabilidad, epóxico. Si priorizas la calidez natural de la madera, considera un epóxico efecto madera que combina lo mejor de ambos mundos.</p>`
      },
      {
        heading: "Epóxico vs Microcemento",
        content: `<p>El microcemento es competencia directa del epóxico en el segmento de pisos sin juntas:</p>
<ul>
<li><strong>Acabado:</strong> Microcemento tiene textura mate/satinada; epóxico puede ser brillante como espejo</li>
<li><strong>Resistencia química:</strong> Epóxico es superior en resistencia a químicos y solventes</li>
<li><strong>Opciones de diseño:</strong> Epóxico ofrece efectos metálicos, 3D y escamas; microcemento se limita a colores sólidos</li>
<li><strong>Grosor:</strong> Microcemento es más delgado (2-3mm); epóxico puede aplicarse más grueso (hasta 5mm+)</li>
<li><strong>Mantenimiento:</strong> Microcemento necesita selladores periódicos; epóxico es auto-sellante</li>
</ul>
<p><strong>Veredicto:</strong> El microcemento es bueno para quienes buscan un look industrial mate. El epóxico es superior en resistencia, opciones de diseño y mantenimiento.</p>`
      },
      {
        heading: "Epóxico vs Mármol Natural",
        content: `<ul>
<li><strong>Costo:</strong> El epóxico efecto mármol cuesta una fracción del mármol real</li>
<li><strong>Mantenimiento:</strong> El mármol es poroso y se mancha con facilidad; el epóxico es impermeable</li>
<li><strong>Resistencia:</strong> El mármol se raya y fisura; el epóxico es flexible y resistente a impactos</li>
<li><strong>Peso:</strong> El mármol es extremadamente pesado; el epóxico agrega peso mínimo al sustrato</li>
</ul>
<p><strong>Veredicto:</strong> A menos que busques el prestigio del mármol genuino, el epóxico efecto mármol es superior en practicidad y costo.</p>`
      }
    ],
    faqs: [
      { question: "¿Qué tipo de piso es el más duradero?", answer: "Para uso residencial y comercial general, el epóxico con topcoat de poliaspártico es uno de los pisos más duraderos disponibles, con vida útil de 15-20 años sin necesidad de reemplazo." },
      { question: "¿Cuál es el piso más fácil de mantener?", answer: "El piso epóxico es el más fácil de mantener: sin juntas, sin selladores periódicos, sin pulidos. Solo agua y jabón neutro." },
      { question: "¿Puedo poner epóxico encima de mi piso actual?", answer: "En muchos casos sí. Se puede aplicar sobre concreto, cerámica, porcelanato y otros sustratos sólidos, previa evaluación técnica. Esto ahorra el costo de demoler el piso existente." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "pisos-epoxicos-modernos-para-interiores", "pisos-epoxicos-para-cocheras"],
    ctaText: "¿Todavía tienes dudas? Agenda una consulta gratuita y te asesoramos",
    ctaLink: "/contact"
  },

  // ── 9. Pisos epóxicos para bodegas e industria ────────────────────────────
  {
    slug: "pisos-epoxicos-industriales-bodegas",
    locale: "es",
    title: "Pisos Epóxicos Industriales para Bodegas, Fábricas y Plantas",
    metaTitle: "Pisos Epóxicos Industriales | Bodegas y Fábricas | SobrePoxi",
    metaDescription: "Pisos epóxicos de alta resistencia para bodegas, fábricas, plantas de producción y naves industriales en Costa Rica. Cumplimiento de normativas y máxima durabilidad.",
    keywords: "pisos epóxicos industriales, piso bodega epóxico, piso fábrica resina, pisos naves industriales, pisos alta resistencia, pisos industriales Costa Rica",
    heroTitle: "Pisos Epóxicos Industriales",
    heroSubtitle: "Máxima resistencia para los entornos más exigentes",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "6 min",
    category: "Pisos Industriales",
    categorySlug: "pisos-industriales",
    sections: [
      {
        heading: "¿Por qué las industrias eligen pisos epóxicos?",
        content: `<p>En entornos industriales, el piso debe soportar condiciones extremas: montacargas, químicos agresivos, impactos y tráfico pesado 24/7. Los <strong>pisos epóxicos industriales</strong> están diseñados específicamente para estas demandas:</p>
<ul>
<li><strong>Resistencia a carga:</strong> Soportan montacargas, racks pesados y maquinaria sin agrietarse</li>
<li><strong>Resistencia química:</strong> Ácidos, álcalis, solventes y aceites no dañan la superficie</li>
<li><strong>Seguridad:</strong> Opciones antideslizantes, señalización integrada y reflectividad de luz</li>
<li><strong>Higiene:</strong> Superficie sin juntas ni poros — fácil de sanitizar según normativas</li>
<li><strong>Durabilidad:</strong> Vida útil de 15-20 años en condiciones industriales con mantenimiento básico</li>
</ul>`
      },
      {
        heading: "Sistemas epóxicos para cada tipo de industria",
        content: `<h3>Bodegas y centros de distribución</h3>
<p>Sistema de alto espesor con cuarzo broadcast para máxima resistencia al tráfico de montacargas. Incluye señalización de zonas integrada en el piso.</p>
<h3>Plantas de alimentos y farmacéuticas</h3>
<p>Sistemas antimicrobianos con pendientes sanitarias integradas. Cumplen normativas FDA y FSMA para áreas de producción de alimentos.</p>
<h3>Talleres y manufactura</h3>
<p>Pisos resistentes a aceites, solventes y químicos de proceso. Con marcaje de zonas de seguridad y pasillos peatonales.</p>
<h3>Estacionamientos</h3>
<p>Sistemas de alta resistencia a abrasión con señalización completa: espacios, flechas, zonas peatonales y numeración.</p>`
      },
      {
        heading: "Señalización y seguridad industrial integrada",
        content: `<p>Los pisos epóxicos industriales pueden incluir señalización permanente integrada en la superficie:</p>
<ul>
<li><strong>Demarcación de pasillos:</strong> Líneas amarillas para rutas peatonales seguras</li>
<li><strong>Zonas de seguridad:</strong> Áreas rojas alrededor de maquinaria o zonas de riesgo</li>
<li><strong>Zonas de almacenamiento:</strong> Marcaje de áreas de racks y almacenaje</li>
<li><strong>Señales de tráfico:</strong> Flechas de dirección para montacargas</li>
<li><strong>Identificación de áreas:</strong> Colores específicos para producción, empaque, bodega, etc.</li>
</ul>
<p>Esta señalización es parte del piso, no pintura sobre él, por lo que dura tanto como el recubrimiento mismo.</p>`
      }
    ],
    faqs: [
      { question: "¿El piso epóxico resiste el tráfico de montacargas?", answer: "Sí. Los sistemas industriales de 100% sólidos con cuarzo broadcast están diseñados específicamente para soportar tráfico pesado de montacargas, carretillas y maquinaria pesada." },
      { question: "¿Cuánto tiempo dura la instalación en una nave industrial?", answer: "Depende del área. Una bodega de 500m² puede completarse en 5-7 días. Podemos trabajar por secciones para minimizar el impacto en la operación." },
      { question: "¿El piso epóxico industrial necesita mantenimiento especial?", answer: "No. Limpieza regular con máquina fregadora o mopa industrial es suficiente. Se recomienda una inspección anual para detectar desgaste localizado que se pueda reparar preventivamente." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "mantenimiento-pisos-epoxicos", "pisos-epoxicos-para-negocios"],
    ctaText: "¿Necesitas un piso que soporte las demandas de tu industria? Cotiza ahora",
    ctaLink: "/contact"
  },

  // ── 10. Preguntas frecuentes sobre resina epóxica ─────────────────────────
  {
    slug: "preguntas-frecuentes-resina-epoxica",
    locale: "es",
    title: "Preguntas Frecuentes sobre Resina Epóxica: Todo lo que Necesitas Saber",
    metaTitle: "Preguntas Frecuentes Resina Epóxica | FAQ Completo | SobrePoxi",
    metaDescription: "Respuestas a las preguntas más comunes sobre resina epóxica: durabilidad, costos, mantenimiento, aplicaciones, seguridad y más. Guía experta de SobrePoxi.",
    keywords: "preguntas resina epóxica, FAQ epóxico, es segura la resina epóxica, cuánto dura resina, cuánto cuesta piso epóxico, resina epóxica dudas",
    heroTitle: "Preguntas Frecuentes sobre Resina Epóxica",
    heroSubtitle: "Respuestas claras a las dudas más comunes",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "10 min",
    category: "Guías Técnicas",
    categorySlug: "guias-tecnicas",
    sections: [
      {
        heading: "Sobre la resina epóxica en general",
        content: `<p>La resina epóxica genera muchas preguntas, especialmente para quienes la descubren por primera vez. Aquí respondemos las más frecuentes de forma clara y honesta.</p>`
      }
    ],
    faqs: [
      { question: "¿Qué es la resina epóxica?", answer: "Es un polímero termoestable que se forma al mezclar una resina con un endurecedor. Al curar, crea un material extremadamente duro, resistente y brillante. Se usa para pisos, muebles, arte, construcción e industria." },
      { question: "¿Cuánto dura un piso epóxico?", answer: "Un piso epóxico profesionalmente instalado dura entre 15 y 20 años. Con mantenimiento adecuado, algunos sistemas superan los 25 años. La clave es la preparación correcta del sustrato y el uso del sistema adecuado." },
      { question: "¿Es segura la resina epóxica?", answer: "Durante la aplicación se deben usar equipos de protección (guantes, mascarilla, gafas) ya que puede irritar piel y vías respiratorias. Una vez curada (48-72 horas), es completamente inerte y segura, incluso para contacto con alimentos en formulaciones certificadas." },
      { question: "¿La resina epóxica se pone amarilla?", answer: "Las resinas económicas pueden amarillear con exposición UV. Las resinas profesionales con estabilizadores UV y los topcoats de poliuretano alifático o poliaspártico minimizan este efecto. En SobrePoxi solo usamos sistemas UV-estables." },
      { question: "¿Se puede aplicar resina epóxica uno mismo (DIY)?", answer: "Para proyectos pequeños de arte o muebles, sí con la capacitación adecuada. Para pisos, NO recomendamos DIY: la preparación del sustrato, la mezcla precisa y la aplicación uniforme requieren equipo y experiencia profesional. Un piso mal aplicado puede fallar en meses." },
      { question: "¿Cuánto cuesta un piso epóxico en Costa Rica?", answer: "El precio varía según el sistema, área y condición del sustrato. Factores que afectan el precio: estado del concreto, sistema elegido (básico vs. premium), complejidad del diseño, y área total. Solicita una cotización personalizada para tu proyecto." },
      { question: "¿Sobre qué superficies se puede aplicar epóxico?", answer: "Principalmente sobre concreto, pero también sobre cerámica, porcelanato, metal y madera con la preparación adecuada. El sustrato debe estar limpio, seco y perfilado correctamente para garantizar adherencia." },
      { question: "¿El piso epóxico huele mal?", answer: "Durante la aplicación, los sistemas base solvente tienen olor fuerte (24-48h). Los sistemas base agua tienen olor mínimo. Una vez curado, el piso no tiene ningún olor." },
      { question: "¿Se puede reparar un piso epóxico dañado?", answer: "Sí. Los daños localizados se reparan lijando el área y aplicando nueva resina. No es necesario rehacer todo el piso. Esto es una ventaja significativa sobre cerámica o porcelanato." },
      { question: "¿El epóxico resiste el calor?", answer: "Los pisos epóxicos resisten temperaturas de hasta 60-80°C sin problema. Para entornos con temperaturas más altas, se usan sistemas especiales de alta temperatura." },
      { question: "¿Se puede poner epóxico en exteriores?", answer: "El epóxico estándar no es recomendable para exteriores con sol directo por la sensibilidad UV. Para exteriores se usan topcoats de poliuretano alifático o sistemas de poliaspártico que sí resisten UV." },
      { question: "¿Cuánto tarda en curar la resina epóxica?", answer: "Al tacto: 12-24 horas. Tráfico peatonal ligero: 24-48 horas. Tráfico completo: 5-7 días. El curado completo para resistencia química máxima toma 14-28 días dependiendo de la temperatura ambiente." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "mantenimiento-pisos-epoxicos", "pisos-epoxicos-para-cocheras"],
    ctaText: "¿Tienes más preguntas? Nuestros expertos te responden sin compromiso",
    ctaLink: "/contact"
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
//  ENGLISH GUIDE DEFINITIONS (abbreviated — key articles)
// ═══════════════════════════════════════════════════════════════════════════════

const guidesEN: Guide[] = [
  {
    slug: "epoxy-flooring-for-garages",
    locale: "en",
    title: "Epoxy Flooring for Garages: Designs, Types and Benefits",
    metaTitle: "Epoxy Flooring for Garages | Modern & Durable Designs | SobrePoxi",
    metaDescription: "Complete guide to epoxy flooring for garages. Discover modern designs, resin types, benefits, costs and why it's the best choice for your garage in Costa Rica.",
    keywords: "epoxy garage floor, resin garage coating, garage floor designs, modern garage flooring, epoxy floor Costa Rica",
    heroTitle: "Epoxy Flooring for Garages",
    heroSubtitle: "Transform your garage with a durable, modern and easy-to-maintain floor",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "8 min",
    category: "Residential Flooring",
    categorySlug: "residential-flooring",
    sections: [
      {
        heading: "Why choose epoxy flooring for your garage?",
        content: `<p>Your garage is one of the most demanding spaces in your home: it endures vehicle weight, oil spills, chemicals and constant traffic. An <strong>epoxy floor</strong> transforms this space into a resistant, elegant and extremely easy-to-clean surface.</p>
<p>Unlike conventional concrete paint, epoxy resin creates a monolithic layer that chemically bonds to the substrate, forming an impermeable barrier that protects concrete from moisture, stains and wear.</p>
<ul>
<li><strong>Stain resistance:</strong> Motor oil, gasoline and chemicals wipe clean easily</li>
<li><strong>Extreme durability:</strong> Supports heavy vehicle weight without cracking</li>
<li><strong>Modern aesthetics:</strong> Glossy, metallic or decorative flake finishes</li>
<li><strong>Easy maintenance:</strong> A damp mop is all you need</li>
<li><strong>Value increase:</strong> An epoxy garage floor increases your property value</li>
</ul>`
      },
      {
        heading: "Types of epoxy flooring for garages",
        content: `<h3>1. Solid Epoxy (100% Solids)</h3>
<p>The most resistant and durable system. Creates a thick 2-3mm layer that supports heavy vehicular traffic.</p>
<h3>2. Flake System</h3>
<p>Combines epoxy resin with decorative vinyl flakes for a unique granite-like appearance with anti-slip texture.</p>
<h3>3. Metallic Epoxy</h3>
<p>Uses metallic pigments to create stunning 3D effects: lava, marble, ocean or galaxy. Each floor is unique.</p>
<h3>4. Self-Leveling Epoxy</h3>
<p>Applied as liquid that self-levels for a perfectly smooth, mirror-like surface.</p>
<h3>5. Polyurea/Polyaspartic</h3>
<p>A hybrid system that cures in hours instead of days. Ideal for garages that need to be operational quickly.</p>`
      }
    ],
    faqs: [
      { question: "How long does an epoxy garage floor last?", answer: "A professionally installed epoxy garage floor lasts 10-20 years with proper maintenance, depending on the system used and traffic level." },
      { question: "Is epoxy flooring slippery when wet?", answer: "Systems with decorative flakes or anti-slip additives provide excellent traction even when wet. We always recommend anti-slip texture for garages." },
      { question: "Can epoxy be installed over old concrete?", answer: "Yes, as long as the concrete is structurally sound. Crack repairs and professional profiling are done before application to ensure perfect adhesion." }
    ],
    relatedSlugs: ["types-of-epoxy-resin", "modern-epoxy-floors-for-interiors"],
    ctaText: "Ready to transform your garage? Request your free quote",
    ctaLink: "/contact"
  },
  {
    slug: "modern-epoxy-floors-for-interiors",
    locale: "en",
    title: "Modern Epoxy Floors for Interiors: Living Rooms, Kitchens and More",
    metaTitle: "Modern Epoxy Floors for Interiors | Living Rooms & Kitchens | SobrePoxi",
    metaDescription: "Discover how epoxy floors transform living rooms, kitchens and interior spaces. Modern designs, trending colors and luxury finishes for your home in Costa Rica.",
    keywords: "modern floors living room, epoxy floors interiors, resin floors home, modern kitchen floors, seamless floors interiors",
    heroTitle: "Modern Epoxy Floors for Interiors",
    heroSubtitle: "Give your home a contemporary look with seamless epoxy resin floors",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "7 min",
    category: "Residential Flooring",
    categorySlug: "residential-flooring",
    sections: [
      {
        heading: "The seamless floor trend in interior design",
        content: `<p>Epoxy floors are no longer exclusive to factories and industries. Today they're one of the <strong>strongest trends in interior design</strong>, especially in modern residential spaces seeking visual continuity and minimalist style.</p>
<p>An epoxy floor creates a completely <strong>seamless surface</strong> that visually expands any space. This is especially impactful in living rooms, open kitchens and loft-style spaces.</p>`
      },
      {
        heading: "Ideal spaces for epoxy floors at home",
        content: `<h3>Living rooms</h3>
<p>Metallic floors in neutral tones create the perfect canvas for any decorating style.</p>
<h3>Kitchens</h3>
<p>Epoxy's impermeability makes it ideal. It resists wine, coffee and oil stains, cleans in seconds.</p>
<h3>Bathrooms</h3>
<p>With anti-slip finish, zero grout means zero mold accumulation.</p>
<h3>Hallways</h3>
<p>Visual continuity eliminates interruptions between spaces, creating natural flow.</p>`
      }
    ],
    faqs: [
      { question: "Can epoxy be applied over existing tile?", answer: "In many cases yes, depending on the tile condition. A technical evaluation determines if the existing floor needs removal or can be coated directly." },
      { question: "Do epoxy floors turn yellow over time?", answer: "Systems with aliphatic polyurethane or polyaspartic topcoats are designed to resist UV yellowing. Using the correct system for sun-exposed areas is key." },
      { question: "Are epoxy floors safe for kids and pets?", answer: "Yes. Once fully cured (72 hours), epoxy floors are inert, non-toxic and emit no gases. They're a hygienic surface ideal for families." }
    ],
    relatedSlugs: ["epoxy-flooring-for-garages", "types-of-epoxy-resin"],
    ctaText: "Want to see how epoxy would look in your home? Schedule a design consultation",
    ctaLink: "/contact"
  },
  {
    slug: "types-of-epoxy-resin",
    locale: "en",
    title: "Types of Epoxy Resin: Complete Guide to Choosing the Right One",
    metaTitle: "Types of Epoxy Resin | Complete Guide | SobrePoxi",
    metaDescription: "Learn about different types of epoxy resin: for floors, furniture, art and more. Find out which is best for your project. Expert guide from SobrePoxi Costa Rica.",
    keywords: "types of epoxy resin, epoxy resin for floors, resin for furniture, crystal clear resin, epoxy resin uses",
    heroTitle: "Types of Epoxy Resin",
    heroSubtitle: "Complete guide to choosing the right resin for your project",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "9 min",
    category: "Technical Guides",
    categorySlug: "technical-guides",
    sections: [
      {
        heading: "What is epoxy resin?",
        content: `<p><strong>Epoxy resin</strong> is a thermosetting polymer formed by mixing two components: a base resin and a hardener. This chemical reaction produces an extraordinarily hard, resistant and versatile material.</p>
<p>Not all epoxy resins are the same. There are specific formulations designed for different applications: industrial floors, artistic furniture, art, construction and more.</p>`
      },
      {
        heading: "Epoxy resin for floors",
        content: `<h3>100% Solids Epoxy</h3>
<p>No solvents. Creates thick layers (up to 3mm per application). The most resistant option for industrial floors and garages.</p>
<h3>Water-Based Epoxy</h3>
<p>Easier to apply with less odor. Ideal for residential spaces and areas with limited ventilation.</p>
<h3>Metallic Epoxy</h3>
<p>Special formulation with metallic pigments creating 3D effects. Used for high-end decorative floors.</p>`
      },
      {
        heading: "Epoxy resin for furniture and art",
        content: `<h3>Crystal Clear Resin (Table Top)</h3>
<p>High transparency, self-deairing and UV yellowing resistant. Perfect for river tables and resin art.</p>
<h3>Deep Pour Resin</h3>
<p>Designed for deep pours up to 5cm per layer. Generates less exothermic heat, preventing cracks.</p>`
      }
    ],
    faqs: [
      { question: "What's the difference between epoxy and polyester resin?", answer: "Epoxy resin is more resistant, durable and has better adhesion than polyester. Polyester is cheaper but yellows quickly and is less chemically resistant." },
      { question: "How long does epoxy resin take to cure?", answer: "Floor systems: touch dry in 12-24 hours, full cure in 5-7 days. Furniture (deep pour): 48-72 hours touch dry. Temperature and humidity affect curing time." }
    ],
    relatedSlugs: ["epoxy-flooring-for-garages", "modern-epoxy-floors-for-interiors"],
    ctaText: "Not sure which resin you need? Contact us for free advice",
    ctaLink: "/contact"
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
//  PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════════

const allGuides: Guide[] = [...guidesES, ...guidesEN];

/** Get all guides for a locale */
export function getGuides(locale: "es" | "en"): Guide[] {
  return allGuides.filter(g => g.locale === locale);
}

/** Get a single guide by slug and locale */
export function getGuideBySlug(slug: string, locale: "es" | "en"): Guide | undefined {
  return allGuides.find(g => g.slug === slug && g.locale === locale);
}

/** Get all guide slugs (for static generation) */
export function getAllGuideSlugs(): { slug: string; locale: "es" | "en" }[] {
  return allGuides.map(g => ({ slug: g.slug, locale: g.locale }));
}

/** Get guides by category */
export function getGuidesByCategory(categorySlug: string, locale: "es" | "en"): Guide[] {
  return allGuides.filter(g => g.categorySlug === categorySlug && g.locale === locale);
}

/** Get related guides */
export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedSlugs
    .map(slug => getGuideBySlug(slug, guide.locale))
    .filter(Boolean) as Guide[];
}

/** Get unique categories for a locale */
export function getGuideCategories(locale: "es" | "en"): { name: string; slug: string; count: number }[] {
  const guides = getGuides(locale);
  const categoryMap = new Map<string, { name: string; slug: string; count: number }>();

  for (const guide of guides) {
    const existing = categoryMap.get(guide.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(guide.categorySlug, {
        name: guide.category,
        slug: guide.categorySlug,
        count: 1
      });
    }
  }

  return Array.from(categoryMap.values());
}
