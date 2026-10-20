import { buildGuideVideo } from "./videos";

export interface GuideSection {
  heading: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideVideo {
  slug: string;
  title: string;
  description: string;
  /** Duración ISO 8601, ej. "PT30S". */
  durationISO: string;
  /** Fecha de subida ISO, ej. "2026-10-20". */
  uploadDate: string;
}

export interface Guide {
  slug: string;
  locale: "es" | "en";
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  category: string;
  categorySlug: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
  relatedSlugs: string[];
  ctaText: string;
  ctaLink: string;
  /** Video educativo asociado (misma slug, en Supabase Storage). */
  video?: GuideVideo;
}

const guidesES: Guide[] = [
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
    readingTime: "12 min",
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
      },
      {
        heading: "Errores comunes al instalar epóxico en cocheras",
        content: `<p>Muchos proyectos de pisos epóxicos fallan no por el material, sino por errores en la preparación o aplicación. Estos son los más frecuentes que vemos en Costa Rica:</p>
<ul>
<li><strong>No preparar el concreto:</strong> Aplicar epóxico sobre concreto sucio, húmedo o sin perfilar es la causa #1 de desprendimiento. El concreto debe estar limpio, seco y con perfil abierto (CSP 2-3)</li>
<li><strong>Aplicar sobre concreto nuevo sin curar:</strong> El concreto necesita mínimo 28 días de curado antes de aplicar epóxico. La humedad residual causa ampollas y fallas de adherencia</li>
<li><strong>Ignorar la humedad del sustrato:</strong> En Costa Rica, con nuestro clima tropical, la humedad asciende desde el suelo. Se debe hacer una prueba de humedad (máximo 4.5% con medidor) antes de aplicar</li>
<li><strong>Mezclar mal los componentes:</strong> La resina y el endurecedor deben mezclarse en proporciones exactas. Un error del 5% ya compromete el curado y la resistencia final</li>
<li><strong>Aplicar con temperaturas inadecuadas:</strong> La temperatura ideal es entre 15°C y 30°C. En Costa Rica generalmente estamos en rango, pero en zonas muy calientes como Guanacaste hay que aplicar en horas frescas</li>
<li><strong>No aplicar topcoat UV:</strong> En cocheras con entrada de sol directo, el epóxico sin protección UV se amarillea en meses. Siempre se debe aplicar un topcoat de poliuretano alifático o poliaspártico</li>
</ul>
<p>En <strong>SobrePoxi</strong> evitamos todos estos problemas con protocolos profesionales de preparación e instalación. Cada proyecto incluye medición de humedad, perfilado mecánico y sistema completo con topcoat protector.</p>`
      },
      {
        heading: "Cocheras epóxicas en el clima de Costa Rica",
        content: `<p>Costa Rica tiene condiciones climáticas específicas que influyen en la elección del sistema epóxico para cocheras:</p>
<h3>Zona del Valle Central (GAM)</h3>
<p>Clima templado con lluvias frecuentes. La cochera necesita textura antideslizante y excelente resistencia a la humedad. Los sistemas con escamas son ideales porque combinan estética con tracción. La temperatura estable favorece un curado óptimo.</p>
<h3>Zona costera (Guanacaste, Puntarenas, Limón)</h3>
<p>Calor intenso, humedad alta y salinidad. Aquí se requiere un sistema de alto rendimiento: epóxico 100% sólidos con topcoat de poliaspártico para máxima resistencia UV y a la sal. La preparación del sustrato es aún más crítica por la humedad ascendente.</p>
<h3>Zona de montaña (Cartago, zonas altas de Heredia)</h3>
<p>Temperaturas más bajas y alta humedad. Se debe prestar especial atención al tiempo de curado, ya que las temperaturas bajas lo prolongan. Recomendamos sistemas con endurecedores acelerados para estas zonas.</p>
<p>En todos los casos, un profesional debe evaluar las condiciones específicas del sitio antes de recomendar el sistema. En <strong>SobrePoxi</strong> realizamos visitas técnicas sin costo para garantizar el sistema correcto.</p>`
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
    readingTime: "11 min",
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
      },
      {
        heading: "Cómo integrar pisos epóxicos con tu decoración existente",
        content: `<p>Uno de los temores más comunes es que el piso epóxico no combine con la decoración actual. La realidad es que es uno de los pisos más versátiles para integrar con cualquier estilo:</p>
<h3>Estilo Minimalista / Nórdico</h3>
<p>Epóxico en tonos blancos, grises claros o beige con acabado satinado. La superficie continua sin juntas refuerza la limpieza visual que define este estilo. Combina perfectamente con muebles de líneas rectas, maderas claras y plantas.</p>
<h3>Estilo Industrial / Loft</h3>
<p>Epóxico efecto concreto pulido o gris oscuro con acabado mate o satinado. Se complementa con ladrillo expuesto, estructuras metálicas y mobiliario robusto. El look es sofisticado sin esfuerzo.</p>
<h3>Estilo Tropical / Costero</h3>
<p>Epóxico en tonos arena, turquesa suave o blanco con efecto océano. Perfecto para casas de playa en Guanacaste o el Caribe costarricense. Combina con ratán, maderas naturales y textiles orgánicos.</p>
<h3>Estilo Contemporáneo / Lujo</h3>
<p>Epóxico metálico en tonos grafito, negro o dorado. Crea un impacto visual dramático que eleva cualquier espacio. Ideal para residencias premium, penthouses y espacios de entretenimiento.</p>
<h3>Estilo Rústico / Campo</h3>
<p>Epóxico en tonos terracota, miel o efecto piedra natural. Complementa vigas de madera, paredes de piedra y muebles de campo sin sacrificar la practicidad de una superficie moderna.</p>
<p>En <strong>SobrePoxi</strong> te ayudamos a seleccionar el color, textura y acabado que mejor se integre con tu decoración. Creamos muestras físicas que puedes llevar a casa para verlas con tu iluminación y mobiliario real.</p>`
      },
      {
        heading: "Pisos epóxicos en apartamentos y condominios",
        content: `<p>Los apartamentos presentan desafíos únicos que el epóxico resuelve mejor que otros pisos:</p>
<ul>
<li><strong>Espacios compactos:</strong> La superficie sin juntas amplía visualmente apartamentos pequeños hasta un 15-20% percibido</li>
<li><strong>Ruido:</strong> El epóxico sobre concreto no genera el ruido de tacones que sí produce el porcelanato. Se puede agregar una capa aislante bajo el sistema para mayor reducción acústica</li>
<li><strong>Mascotas:</strong> En condominios pet-friendly, el epóxico no se daña con uñas de perros ni absorbe olores como la madera o alfombra</li>
<li><strong>Reventa:</strong> Un apartamento con piso epóxico de diseño se distingue en el mercado inmobiliario y puede justificar un precio mayor</li>
<li><strong>Regulaciones:</strong> A diferencia de la madera que puede propagarse en incendios, el epóxico no es inflamable, cumpliendo códigos de construcción para edificios residenciales</li>
</ul>
<p><strong>Dato importante para Costa Rica:</strong> En torres de apartamentos, la preparación del sustrato debe considerar que los entrepisos de concreto pueden tener menor espesor que una losa de fundación. Un diagnóstico profesional asegura que el sistema elegido sea compatible con la estructura existente.</p>`
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
    readingTime: "14 min",
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
      },
      {
        heading: "Marcas y calidades de resina: lo que debes saber",
        content: `<p>No todas las resinas epóxicas son iguales, y la calidad del producto determina directamente el resultado final de tu proyecto:</p>
<h3>Resinas de grado profesional vs. comercial</h3>
<p>Las resinas de grado profesional tienen mayor porcentaje de sólidos, mejor resistencia química y mayor vida útil. Las de grado comercial (las que encuentras en ferreterías) son más delgadas, menos resistentes y pueden fallar en aplicaciones exigentes como pisos de cochera o muebles de uso diario.</p>
<h3>Factores que determinan la calidad</h3>
<ul>
<li><strong>Porcentaje de sólidos:</strong> Las resinas 100% sólidos no tienen solventes que se evaporen — todo lo que aplicas se queda. Las resinas con 50-70% sólidos pierden espesor al curar</li>
<li><strong>Resistencia a compresión:</strong> Las buenas resinas para pisos superan los 10,000 PSI de resistencia a compresión. Las económicas pueden estar por debajo de 5,000 PSI</li>
<li><strong>Resistencia UV:</strong> Las resinas sin estabilizadores UV se amarillean en semanas. Busca resinas con protección UV integrada o aplica siempre un topcoat protector</li>
<li><strong>Tiempo de trabajo (pot life):</strong> Una resina profesional te da 30-45 minutos de tiempo de trabajo. Las económicas pueden curar en 15-20 minutos, dificultando la aplicación</li>
<li><strong>Viscosidad:</strong> Para pisos, una viscosidad media permite autonivelar sin escurrir. Para mesas, necesitas viscosidad baja para eliminar burbujas</li>
</ul>
<h3>¿Por qué en SobrePoxi usamos productos premium?</h3>
<p>Trabajamos exclusivamente con resinas de grado profesional con certificaciones de calidad. Esto significa que tu piso o mueble va a mantener su aspecto y rendimiento durante décadas, no meses. La diferencia de costo entre un producto bueno y uno mediocre es mínima comparada con el costo de rehacer un proyecto fallido.</p>`
      },
      {
        heading: "Glosario de términos sobre resina epóxica",
        content: `<p>Si estás investigando sobre resina epóxica, estos son los términos que encontrarás con frecuencia:</p>
<ul>
<li><strong>Pot life (vida en bote):</strong> Tiempo que tienes para trabajar la mezcla antes de que empiece a endurecer</li>
<li><strong>Curado:</strong> Proceso químico por el cual la resina líquida se convierte en un sólido duro. No es lo mismo que "secado" — es una reacción química irreversible</li>
<li><strong>Exotérmico:</strong> La reacción de curado genera calor. En volúmenes grandes (como mesas río), el calor excesivo puede causar fisuras o amarillamiento</li>
<li><strong>CSP (Concrete Surface Profile):</strong> Nivel de rugosidad del concreto necesario para que el epóxico se adhiera. Se logra con esmerilado o shot blasting</li>
<li><strong>Topcoat:</strong> Capa final transparente que protege el epóxico de rayos UV, abrasión y químicos</li>
<li><strong>Poliaspártico:</strong> Tipo de poliurea alifática que se usa como topcoat de alta resistencia. Cura rápido y tiene excelente resistencia UV</li>
<li><strong>Deep pour:</strong> Resina formulada para vertidos profundos (hasta 5cm por capa) sin generar calor excesivo</li>
<li><strong>Table top:</strong> Resina de alta transparencia diseñada para superficies de muebles y encapsulados delgados</li>
<li><strong>Borde vivo (live edge):</strong> Borde natural de la madera sin cortar, usado en mesas río y muebles artísticos</li>
<li><strong>Flake/escamas:</strong> Trozos decorativos de vinilo que se esparcen sobre el epóxico húmedo para dar textura y diseño</li>
<li><strong>Primer/imprimante:</strong> Primera capa que penetra el concreto y sella poros para mejorar la adherencia del sistema</li>
<li><strong>Broadcast:</strong> Técnica de esparcir arena, cuarzo o escamas sobre la superficie húmeda del epóxico</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Cuál es la diferencia entre resina epóxica y poliéster?", answer: "La resina epóxica es más resistente, durable y tiene mejor adherencia que la poliéster. La poliéster es más económica pero se amarillea rápido y es menos resistente a químicos. Para pisos y muebles de calidad, siempre recomendamos epóxica." },
      { question: "¿La resina epóxica es tóxica?", answer: "Durante la aplicación puede emitir vapores irritantes y se deben usar equipos de protección (guantes, mascarilla, gafas). Una vez curada por completo, es inerte. Para contacto con alimentos, consultanos por las formulaciones certificadas." },
      { question: "¿Cuánto tarda en curar la resina epóxica?", answer: "Depende de la formulación, el espesor aplicado, la temperatura y la humedad. Escribinos por WhatsApp con tu proyecto y te damos los tiempos estimados." },
      { question: "¿Se puede reparar un piso epóxico dañado?", answer: "Sí. Los daños localizados se pueden reparar sin necesidad de rehacer todo el piso. Se lija el área afectada y se aplica una nueva capa de resina. Es una de las ventajas del sistema." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "muebles-resina-epoxica-guia", "pisos-epoxicos-modernos-para-interiores"],
    ctaText: "¿No sabes qué resina necesitas? Contáctanos y te asesoramos gratis",
    ctaLink: "/contact"
  },
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
  {
    slug: "disenos-pisos-epoxicos-tendencias",
    locale: "es",
    title: "Diseños de Pisos Epóxicos: Tendencias y Ideas para Inspirarte",
    metaTitle: "Diseños de pisos epóxicos: metálico, mármol y 3D con fotos | SobrePoxi",
    metaDescription: "Fotos e ideas de pisos epóxicos metálicos, efecto mármol, 3D y escamas para salas, cocinas, cocheras y comercios en Costa Rica. Precio orientativo ₡75.000–₡96.100 por m² instalado (IVA incluido).",
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
<li><strong>Curado:</strong> Curado controlado de la resina cuidando temperatura y humedad</li>
<li><strong>Desmolde y corte:</strong> Se retira del molde y se corta a dimensiones finales</li>
<li><strong>Lijado progresivo:</strong> Lijado y pulido por etapas hasta lograr transparencia cristalina</li>
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
<li><strong>Inversión a largo plazo:</strong> Los muebles de resina bien hechos duran décadas con el cuidado adecuado</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Cuánto cuesta una mesa río?", answer: "No publicamos precios: cada pieza se cotiza a la medida según la medida, la madera y el diseño. Mandanos tu idea y las medidas por WhatsApp y te damos presupuesto para tu proyecto específico." },
      { question: "¿La resina de las mesas se pone amarilla?", answer: "Las resinas de calidad profesional que usamos en SobrePoxi incluyen estabilizadores UV que minimizan el amarillamiento. Además, aplicamos topcoats protectores UV para mantener la transparencia durante años." },
      { question: "¿Se puede usar una mesa río como mesa de comedor diaria?", answer: "Sí. Con el acabado protector adecuado, una mesa río es completamente funcional para uso diario. Resiste calor moderado, manchas y humedad. Recomendamos usar posavasos para bebidas muy calientes." },
      { question: "¿Cuánto tiempo toma hacer una mesa río?", answer: "El plazo depende del tamaño y la complejidad de la pieza y se confirma en la cotización. Mandanos tu idea por WhatsApp y te damos los tiempos de tu proyecto." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "disenos-pisos-epoxicos-tendencias"],
    ctaText: "¿Quieres tu propia mesa río o mueble personalizado? Hablemos de tu idea",
    ctaLink: "/contact"
  },
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
<li><strong>Durabilidad extrema:</strong> Soportan tráfico intenso, impactos y abrasión sin deteriorarse</li>
<li><strong>Fácil limpieza:</strong> Superficie no porosa que permite limpieza rápida y eficiente</li>
<li><strong>Higiene:</strong> Sin juntas donde se acumulen bacterias, ideal para alimentos y salud</li>
<li><strong>Versatilidad estética:</strong> Diseños personalizables que refuerzan la identidad de marca</li>
</ul>`
      },
      {
        heading: "Sectores ideales para pisos epóxicos",
        content: `<h3>Restaurantes y cocinas industriales</h3>
<p>Los pisos epóxicos son la opción más higiene para cocinas profesionales. No absorben grasas, no desarrollan moho y resisten derrames de líquidos. Los sistemas antideslizantes previenen accidentes en áreas de preparación.</p>
<h3>Tiendas y retail</h3>
<p>Un piso epóxico brillante y personalizado crea una experiencia de compra memorable. Los diseños metálicos o con efectos especiales impresionan a los clientes desde el primer momento.</p>
<h3>Oficinas corporativas</h3>
<p>La continuidad visual del epóxico transmite profesionalismo y modernidad. Los tonos neutros y efectos concretos pulidos son populares en espacios corporativos.</p>
<h3>Clínicas y laboratorios</h3>
<p>La superficie antimicrobial e impermeable del epóxico lo hace perfecto para entornos de salud. Cumple con las normativas de higiene más estrictas.</p>
<h3>Gimnasios y centros deportivos</h3>
<p>Los sistemas con cuarzo o escamas proporcionan la textura antideslizante necesaria para zonas de alto tráfico y áreas de peso.</p>`
      },
      {
        heading: "Consideraciones de instalación en entornos comerciales",
        content: `<p>La instalación de pisos epóxicos en negocios requiere consideraciones especiales:</p>
<ul>
<li><strong>Tiempo de instalación:</strong> 3-5 días para sistemas completos. Se puede planificar en etapas para minimizar el impacto operativo.</li>
<li><strong>Resistencia química:</strong> Los pisos de locales gastronómicos deben resistir aceites, grasas y productos de limpieza agresivos.</li>
<li><strong>Movimiento de inventario:</strong> En almacenes y centros de distribución, la resistencia a impactos y tráfico de montacargas es crítica.</li>
<li><strong>Cumplimiento de normativas:</strong> En Costa Rica, los pisos comerciales deben cumplir con códigos de accesibilidad y seguridad.</li>
</ul>`
      },
      {
        heading: "Tendencias en pisos epóxicos comerciales para 2026",
        content: `<p>Las tendencias comerciales en pisos epóxicos se centran en:</p>
<ul>
<li><strong>Efecto mármol premium:</strong> Imitación de mármol natural a una fracción del costo, con mayor durabilidad</li>
<li><strong>Tonos corporativos:</strong> Grises sofisticados, blancos técnicos y tonos metálicos sutiles</li>
<li><strong>Sistemas antimicrobial:</strong> Resistencia bacteriana integrada para entornos de salud y alimentos</li>
<li><strong>Epóxico conductivo:</strong> Para entornos con equipos electrónicos sensibles</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Cuánto tiempo dura un piso epóxico en un negocio?", answer: "Un piso epóxico profesional en un entorno comercial puede durar entre 10 y 20 años con el mantenimiento adecuado. La durabilidad depende del sistema elegido y el nivel de tráfico." },
      { question: "¿Se puede instalar epóxico en un local con operaciones activas?", answer: "Sí, pero requiere planificación. Se puede instalar por secciones para no interrumpir completamente las operaciones. También hay sistemas de curado rápido que permiten reopen en menos tiempo." },
      { question: "¿Qué mantenimiento requiere un piso epóxico comercial?", answer: "El mantenimiento es simple: barrido diario, trapeado con limpiador neutro periódicamente. Para zonas de alto tráfico, se recomienda una limpieza profunda mensual con productos especializados." }
    ],
    relatedSlugs: ["disenos-pisos-epoxicos-tendencias", "mantenimiento-pisos-epoxicos"],
    ctaText: "¿Necesitas un piso epóxico para tu negocio? Solicita una cotización personalizada",
    ctaLink: "/contact"
  },
  {
    slug: "precios-pisos-epoxicos-costa-rica",
    locale: "es",
    title: "Precios de Pisos Epóxicos en Costa Rica 2026: Guía Completa de Costos",
    metaTitle: "Precios de Pisos Epóxicos en Costa Rica 2026 | Guía de Costos | SobrePoxi",
    metaDescription: "Descubre cuánto cuesta un piso epóxico en Costa Rica en 2026: precio orientativo ₡75.000–₡96.100 por m² instalado (piso de 5 mm, según el acabado, IVA incluido). Qué incluye y cómo cotizar tu cochera.",
    keywords: "precio piso epóxico Costa Rica, costo piso epóxico, precio resina epóxica CR, cuánto cuesta piso epóxico, presupuesto piso epoxi Costa Rica, precio metro cuadrado epóxico",
    heroTitle: "Precios de Pisos Epóxicos en Costa Rica",
    heroSubtitle: "Guía completa y honesta de costos 2026: qué incluye cada precio y cómo ahorrar",
    publishedDate: "2026-07-27",
    updatedDate: "2026-07-27",
    readingTime: "9 min",
    category: "Precios y Costos",
    categorySlug: "precios",
    sections: [
      {
        heading: "Rango general de precios en Costa Rica 2026",
        content: `<p>El piso epóxico que instalamos es de <strong>5 mm, ya instalado</strong>, y su precio orientativo en Costa Rica en 2026 es de <strong>₡75,000 a ₡96,100 por m² (IVA incluido)</strong>, <strong>incluyendo materiales y mano de obra profesional</strong>. El precio dentro de ese rango depende del tipo de acabado elegido (sólido, escamas, metálico o industrial).</p>
<p>Un piso epóxico <strong>no se cotiza solo por m²: se cotiza por el espesor</strong>. El espesor importa: a menos espesor hay menos material y los problemas aparecen con el tiempo (desgaste prematuro, ampollas, desprendimiento). Por eso nunca publicamos un total multiplicado (rango × área): el total exacto de tu proyecto lo confirma la visita técnica, según los metros, el estado del concreto y el acabado.</p>`
      },
      {
        heading: "Qué incluye realmente un precio profesional",
        content: `<p>Una cotización seria de piso epóxico debe incluir los siguientes componentes. Si un precio parece demasiado bajo, probablemente omite alguno:</p>
<ol>
<li><strong>Visita técnica y evaluación del sustrato:</strong> Medición de humedad, revisión de grietas y evaluación de la preparación necesaria</li>
<li><strong>Preparación mecánica del concreto:</strong> Esmerilado o shot blasting para lograr el perfil de superficie adecuado (CSP 2-3)</li>
<li><strong>Reparación de grietas y juntas:</strong> Sellado de fisuras con mortero epóxico antes de aplicar el sistema</li>
<li><strong>Imprimante (primer):</strong> Primera capa que sella los poros del concreto y garantiza adherencia</li>
<li><strong>Capas intermedias:</strong> Cuerpo del sistema con el color o diseño elegido</li>
<li><strong>Topcoat protector:</strong> Capa final de poliuretano o poliaspártico que protege contra UV y abrasión</li>
<li><strong>Mano de obra especializada:</strong> Aplicadores certificados con equipo profesional</li>
<li><strong>Materiales de calidad:</strong> Resinas de grado profesional, no productos comerciales de ferretería</li>
</ol>`
      },
      {
        heading: "Factores que afectan el precio",
        content: `<p>El costo final de tu proyecto puede variar según estos factores:</p>
<ul>
<li><strong>Área total:</strong> A mayor superficie, menor precio por m² (economía de escala)</li>
<li><strong>Estado del concreto:</strong> Concretos dañados requieren más preparación y suben el costo</li>
<li><strong>Complejidad del diseño:</strong> Los pisos metálicos con efectos personalizados requieren más tiempo de aplicación</li>
<li><strong>Acceso al sitio:</strong> Trabajos en altura, sótanos o lugares de difícil acceso aumentan el costo</li>
<li><strong>Plazo de ejecución:</strong> Si necesitas acabados urgentes (curado rápido poliaspártico), el precio sube</li>
<li><strong>Ubicación geográfica:</strong> Proyectos fuera del Gran Área Metropolitana pueden tener recargo por viáticos</li>
</ul>`
      },
      {
        heading: "Comparativa: ¿conviene el piso epóxico o alternativas?",
        content: `<p>Para decidir si el piso epóxico es la mejor inversión, compara su costo total de propiedad con otras opciones populares en Costa Rica:</p>
<table>
<thead><tr><th>Opción</th><th>Costo inicial (m²)</th><th>Vida útil</th><th>Mantenimiento</th></tr></thead>
<tbody>
<tr><td>Piso epóxico profesional</td><td>₡75,000 - ₡96,100</td><td>15-20 años</td><td>Mínimo (limpieza húmeda)</td></tr>
<tr><td>Porcelanato</td><td>₡10,000 - ₡25,000</td><td>15-20 años</td><td>Moderado (juntas acumulan suciedad)</td></tr>
<tr><td>Madera/laminado</td><td>₡6,000 - ₡18,000</td><td>10-15 años</td><td>Alto (se raya, absorbe humedad)</td></tr>
<tr><td>Concreto pulido</td><td>₡5,000 - ₡12,000</td><td>20+ años</td><td>Bajo</td></tr>
<tr><td>Mármol natural</td><td>₡25,000 - ₡60,000</td><td>30+ años</td><td>Alto (manchas, sellado periódico)</td></tr>
</tbody>
</table>
<p>El piso epóxico ofrece la mejor relación costo-beneficio cuando se busca durabilidad + estética premium sin juntas.</p>`
      },
      {
        heading: "Cómo ahorrar en tu proyecto sin sacrificar calidad",
        content: `<p>Hay formas legítimas de reducir el costo de tu piso epóxico sin caer en instalaciones de mala calidad:</p>
<ul>
<li><strong>Agrupa proyectos con vecinos:</strong> Si varios hogares de tu zona contratan juntos, el contratista ahorra en movilización y puede ofrecer mejor precio</li>
<li><strong>Elige temporada baja:</strong> Los meses de menor demanda (octubre-noviembre) suelen tener mejores precios</li>
<li><strong>Prepara el sitio:</strong> Retira muebles y limpia el área tú mismo para ahorrar horas de mano de obra</li>
<li><strong>Pide varios sistemas:</strong> Pide cotización de 2-3 opciones para comparar relación costo-beneficio real</li>
<li><strong>No escatimes en la preparación:</strong> El 90% de los fallos de pisos epóxicos son por mala preparación del concreto</li>
</ul>
<p><strong>Advertencia:</strong> Huye de ofertas muy por debajo del rango real (₡75,000–₡96,100 por m² instalado, IVA incluido). Un piso epóxico a precio de remate casi siempre significa menos espesor y materiales de ferretería comercial sin preparación del sustrato. Durará meses, no años.</p>`
      },
      {
        heading: "¿Por qué pedir cotización personalizada?",
        content: `<p>Los precios publicados en internet son referenciales. Tu proyecto tiene características únicas que solo una visita técnica puede evaluar:</p>
<ul>
<li>Estado real del concreto (humedad, grietas, nivelación)</li>
<li>Condiciones ambientales del sitio (sol directo, ventilación)</li>
<li>Uso específico del espacio (vehicular, peatonal, industrial)</li>
<li>Tu presupuesto y expectativas de diseño</li>
</ul>
<p>En <strong>SobrePoxi</strong> realizamos visitas técnicas sin costo en el Gran Área Metropolitana. Te damos un presupuesto honesto y detallado, sin sorpresas, con todos los componentes del sistema claramente especificados.</p>`
      }
    ],
    faqs: [
      { question: "¿Cuál es el precio del metro cuadrado de piso epóxico en Costa Rica?", answer: "En 2026, el precio orientativo del metro cuadrado de piso epóxico en Costa Rica es de ₡75,000 a ₡96,100 CRC por m² instalado (piso de 5 mm, según el acabado, IVA incluido), incluyendo materiales y mano de obra. Un piso epóxico se cotiza por el espesor, no solo por m²: el total exacto de tu proyecto lo confirma la visita técnica." },
      { question: "¿Qué incluye el precio del piso epóxico por m²?", answer: "El precio por m² incluye materiales de grado profesional, preparación mecánica del concreto e instalación a 5 mm de espesor. Si un proveedor ofrece precios muy por debajo del rango real, es una señal de alarma sobre el espesor, la calidad de los materiales y la preparación." },
      { question: "¿Cuánto cuesta un piso epóxico para una cochera de 2 carros?", answer: "El rango orientativo es de ₡75,000 a ₡96,100 por m² instalado (piso de 5 mm, según el acabado, IVA incluido). Un piso epóxico no se cotiza solo por m² sino por el espesor y el estado del concreto, por eso no publicamos totales multiplicados: mandanos los metros y el espacio por WhatsApp y el total exacto lo confirma la visita técnica." },
      { question: "¿Por qué hay tanta diferencia de precios entre proveedores?", answer: "La diferencia suele estar en: (1) calidad de los materiales (profesional vs comercial), (2) preparación del concreto (esmerilado vs solo barrido), (3) número de capas del sistema, y (4) presencia o no de topcoat protector UV. Siempre pide desglose detallado del sistema." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "tipos-de-resina-epoxica", "mantenimiento-pisos-epoxicos"],
    ctaText: "¿Quieres un presupuesto honesto y detallado para tu proyecto? Solicita visita técnica gratuita",
    ctaLink: "/contact"
  },
  {
    slug: "cuanto-cuesta-piso-epoxico-cochera",
    locale: "es",
    title: "¿Cuánto Cuesta un Piso Epóxico para Cochera en Costa Rica?",
    metaTitle: "Costo Piso Epóxico Cochera 2026 | Presupuesto Real | SobrePoxi",
    metaDescription: "Cuánto cuesta realmente un piso epóxico para cochera en Costa Rica en 2026. Precios por tamaño, comparativa de sistemas y qué incluir en el presupuesto.",
    keywords: "precio piso epóxico cochera, costo piso garaje epóxico, presupuesto cochera resina Costa Rica, piso garaje precio CR, cuanto cuesta piso epoxi cochera",
    heroTitle: "¿Cuánto Cuesta un Piso Epóxico para Cochera?",
    heroSubtitle: "Presupuestos reales 2026 según tamaño y sistema para tu garaje en Costa Rica",
    publishedDate: "2026-07-27",
    updatedDate: "2026-07-27",
    readingTime: "8 min",
    category: "Precios y Costos",
    categorySlug: "precios",
    sections: [
      {
        heading: "Precio estimado según tamaño de cochera",
        content: `<p>Un piso epóxico <strong>no se cotiza solo por m²: se cotiza por el espesor y el estado del concreto</strong>. SobrePoxi trabaja a <strong>5 mm</strong>, con un rango orientativo en Costa Rica 2026 de <strong>₡75,000 a ₡96,100 por m² instalado (IVA incluido)</strong>, incluyendo preparación, materiales, mano de obra y topcoat protector. El precio dentro del rango depende del acabado elegido.</p>
<p>El espesor importa: a menos espesor hay menos material y los problemas aparecen con el tiempo (desgaste prematuro, ampollas, desprendimiento). Por eso nunca publicamos un total multiplicado (rango × área): el total exacto de tu cochera lo confirma la visita técnica, según los metros, el estado del concreto y el acabado.</p>`
      },
      {
        heading: "Comparativa de sistemas para cochera",
        content: `<p>No todos los pisos epóxicos para cochera son iguales. Estos son los tres sistemas más comunes, ordenados por durabilidad. Todos se cotizan a 5 mm dentro del mismo <strong>rango orientativo de ₡75,000 a ₡96,100 por m² instalado (IVA incluido)</strong>; el precio dentro del rango depende del acabado elegido:</p>
<h3>1. Epóxico sólido monocapa (económico)</h3>
<p>Una sola capa de epóxico sólido color. Es la opción más accesible dentro del rango pero tiene menor resistencia a la abrasión de neumáticos y muestra más el desgaste con el tiempo. Adecuado para cocheras de uso liviano.</p>
<h3>2. Epóxico con escamas (estándar)</h3>
<p>El sistema más popular para cocheras. Combina epóxico con escamas decorativas de vinilo que aportan estética tipo granito, textura antideslizante y ocultan mejor el desgaste. Recomendado para uso residencial estándar.</p>
<h3>3. Sistema tricapa con topcoat poliaspártico (premium)</h3>
<p>Sistema completo con primer, cuerpo con escamas y capa final de poliaspártico de alta resistencia UV. Es la opción más durable (20+ años) y la que mejor resiste el sol directo en cocheras con entrada de luz.</p>`
      },
      {
        heading: "Costos adicionales a considerar",
        content: `<p>Algunos presupuestos baratos no incluyen costos que después aparecen. Asegúrate de que tu cotización contemple:</p>
<ul>
<li><strong>Reparación de grietas existentes:</strong> si tu concreto tiene fisuras, se cotiza por metro lineal de grieta</li>
<li><strong>Nivelación de losas irregulares:</strong> si hay desniveles pronunciados, se cotiza como adicional por m²</li>
<li><strong>Tratamiento de manchas de aceite:</strong> si hay derrames antiguos de aceite, la remoción química se cotiza aparte</li>
<li><strong>Demarcación de puestos:</strong> las líneas amarillas de demarcación son opcionales y se cotizan por línea</li>
</ul>
<p>En SobrePoxi siempre incluimos todos estos items en el presupuesto inicial, sin costos ocultos.</p>`
      },
      {
        heading: "¿Vale la pena la inversión?",
        content: `<p>Una cochera con piso epóxico de calidad es una de las inversiones más rentables para tu hogar en Costa Rica:</p>
<ul>
<li><strong>Aumento de valor de la propiedad:</strong> Una cochera con piso epóxico profesional puede aumentar el valor de venta de tu casa entre 3% y 7%</li>
<li><strong>Ahorro en mantenimiento:</strong> vs concreto desnudo, el epóxico elimina la necesidad de repintar cada 2-3 años y el polvo constante</li>
<li><strong>Protección del concreto:</strong> Evita que la humedad, aceites y químicos dañen la losa permanentemente</li>
<li><strong>Estética:</strong> Transforma un espacio utilitario en una extensión atractiva del hogar</li>
<li><strong>Durabilidad:</strong> 15-20 años de vida útil con mantenimiento mínimo</li>
</ul>
<p>Con el rango orientativo de ₡75,000 a ₡96,100 por m² instalado (IVA incluido) y 15-20 años de vida útil con mantenimiento mínimo, es una inversión inteligente. El total exacto de tu cochera lo confirma la visita técnica.</p>`
      }
    ],
    faqs: [
      { question: "¿Cuánto tiempo toma instalar un piso epóxico en la cochera?", answer: "Entre 3 y 5 días laborables: 1 día de preparación (esmerilado, reparación), 1-2 días de aplicación de capas, y 24-72 horas de curado antes de poder estacionar vehículos. El tiempo exacto depende del sistema y condiciones climáticas." },
      { question: "¿Puedo usar la cochera durante la instalación?", answer: "No. Necesitas retirar tu vehículo durante los 3-5 días que dura el proceso y mantener el área libre de tráfico hasta el curado completo. Planifica un estacionamiento alternativo." },
      { question: "¿El piso epóxico de cochera resiste el peso de un SUV o pickup?", answer: "Sí. Un sistema epóxico profesional (100% sólidos o tricapa) soporta sin problema el peso de vehículos pesados, incluyendo SUVs, pickups y hasta vehículos comerciales. La resistencia a compresión supera los 10,000 PSI." },
      { question: "¿Cuál es la mejor época del año para instalar piso epóxico en Costa Rica?", answer: "La época seca (diciembre a abril) es ideal porque la humedad ambiental es menor, lo que favorece el curado. Sin embargo, con sistemas modernos como poliaspártico, se puede instalar en cualquier época con las precauciones adecuadas." }
    ],
    relatedSlugs: ["pisos-epoxicos-para-cocheras", "precios-pisos-epoxicos-costa-rica", "mantenimiento-pisos-epoxicos"],
    ctaText: "¿Quieres un presupuesto exacto para tu cochera? Agenda visita técnica gratuita",
    ctaLink: "/contact"
  },
  {
    slug: "precio-mesa-resina-epoxica",
    locale: "es",
    title: "Precio de Mesas de Resina Epóxica en Costa Rica 2026: Guía de Costos",
    metaTitle: "Precio Mesa de Resina Epóxica 2026 | Mesas Río Costa Rica | SobrePoxi",
    metaDescription: "Cuánto cuesta una mesa de resina epóxica o mesa río en Costa Rica: no publicamos precios, cada pieza se cotiza a la medida según tamaño, madera y diseño. Cotización por WhatsApp.",
    keywords: "precio mesa resina epóxica, costo mesa río, precio mesa epoxi Costa Rica, mesa centro resina precio, cuánto cuesta mesa río CR, mesa madera resina precio",
    heroTitle: "Precio de Mesas de Resina Epóxica",
    heroSubtitle: "Cómo se define el precio de una mesa río en Costa Rica: factores y cotización a medida",
    publishedDate: "2026-07-27",
    updatedDate: "2026-07-27",
    readingTime: "7 min",
    category: "Precios y Costos",
    categorySlug: "precios",
    sections: [
      {
        heading: "Cómo se define el precio de tu mesa",
        content: `<p>Los muebles se cotizan a medida según el diseño: no publicamos rangos de precios porque cada pieza es distinta. Estos son los factores que definen el precio de tu mesa de resina:</p>
<ul>
<li><strong>Tamaño y medidas:</strong> largo y ancho según el espacio donde va a vivir la pieza</li>
<li><strong>Madera:</strong> tipo de madera y borde natural elegido</li>
<li><strong>Diseño y color de la resina:</strong> tono, efectos y objetos encapsulados si los lleva</li>
<li><strong>Base:</strong> patas de metal a medida, estructura de madera u otro diseño</li>
</ul>
<p>Mandanos las medidas, fotos del espacio y tu idea por <strong>WhatsApp</strong> y te cotizamos tu pieza a la medida.</p>`
      },
      {
        heading: "Factores que determinan el precio",
        content: `<p>Cada mesa de resina es única y su precio depende de estos factores clave:</p>
<ul>
<li><strong>Tipo de madera:</strong> Maderas costarricenses premium (guapinol, cristóbal, ronrón) o importadas (nogal, roble) afectan el costo. El borde vivo (live edge) suma valor por su carácter único</li>
<li><strong>Volumen de resina:</strong> A mayor ancho del "río" de resina, mayor cantidad de material (deep pour premium). Una mesa río de 15 cm de ancho usa mucha más resina que una de 5 cm</li>
<li><strong>Tamaño total:</strong> Mesas de comedor grandes requieren más madera, resina y horas de lijado progresivo</li>
<li><strong>Complejidad del diseño:</strong> Efectos de color (océano, galaxia, mármol), encapsulados de objetos, o diseños personalizados suman horas de trabajo artesanal</li>
<li><strong>Tipo de patas/estructura:</strong> Patas de metal hechas a medida, estructuras de madera maciza o diseños personalizados añaden costo</li>
<li><strong>Tiempo de fabricación:</strong> Cada pieza se fabrica a pedido; el plazo se confirma en la cotización</li>
</ul>`
      },
      {
        heading: "¿Por qué las mesas de resina son una inversión?",
        content: `<p>Una mesa de resina epóxica de calidad NO es un mueble más. Es una pieza de arte funcional que justifica su precio por varias razones:</p>
<ul>
<li><strong>Pieza única e irrepetible:</strong> Cada mesa es un ejemplar único. No existen dos mesas río idénticas en el mundo, ni siquiera del mismo artesano</li>
<li><strong>Durabilidad excepcional:</strong> La resina epóxica premium con topcoat UV dura décadas sin amarillear ni perder brillo. Mientras que muebles convencionales se reemplazan cada 5-10 años</li>
<li><strong>Valor artístico:</strong> Es funcionalidad + arte. Una mesa río bien ejecutada es el punto focal de cualquier espacio y una conversación constante</li>
<li><strong>Personalización total:</strong> Tú eliges la madera, el color de la resina, el tamaño, las patas. Es un mueble hecho exactamente para tu espacio y gusto</li>
</ul>`
      },
      {
        heading: "Cómo elegir la mesa correcta para tu presupuesto",
        content: `<p>Si quieres una mesa de resina pero tienes un presupuesto definido, considera estas estrategias:</p>
<ul>
<li><strong>Empieza con una mesa de centro:</strong> Más accesible que un comedor grande y te permite tener una pieza artesanal de calidad</li>
<li><strong>Reduce el ancho del "río":</strong> Una mesa con río de resina angosto (5-8 cm) usa menos material y cuesta menos que una de río amplio</li>
<li><strong>Elige maderas locales:</strong> El guapinol, ronrón o cenízaro costarricenses son hermosos y más accesibles que importadas</li>
<li><strong>Simplifica el color:</strong> Una resina transparente o de un solo color cuesta menos que efectos multicapa complejos</li>
<li><strong>Pregunta por stock:</strong> Algunos artesanos tienen piezas terminadas a precio menor que un encargo a medida</li>
</ul>
<p>En <strong>SobrePoxi</strong> trabajamos contigo para encontrar la mejor pieza dentro de tu presupuesto, sin sacrificar calidad de materiales ni ejecución artesanal.</p>`
      }
    ],
    faqs: [
      { question: "¿Cuánto cuesta una mesa río en Costa Rica?", answer: "No publicamos precios: cada pieza se cotiza a la medida según la medida, la madera y el diseño. Mandanos las medidas, fotos del espacio y tu idea por WhatsApp y te damos presupuesto para tu proyecto." },
      { question: "¿Por qué las mesas de resina son tan caras?", answer: "Porque son piezas únicas artesanales. Cada mesa requiere: selección de madera con borde vivo, construcción de molde a medida, vertido de resina premium en múltiples capas, curado controlado, y lijado y pulido progresivo. Cada etapa es trabajo manual a pedido." },
      { question: "¿Vale la pena invertir en una mesa de resina?", answer: "Sí, si buscas una pieza única y duradera. A diferencia de muebles en serie que se reemplazan cada pocos años, una mesa de resina bien hecha dura décadas. Es arte funcional, no solo un mueble." },
      { question: "¿Hacen envíos las mesas de resina dentro de Costa Rica?", answer: "Coordinamos la entrega e instalación según tu zona; las mesas grandes requieren embalaje especial para protección. Escribinos por WhatsApp y te confirmamos la logística para tu proyecto." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "tipos-de-resina-epoxica", "precios-pisos-epoxicos-costa-rica"],
    ctaText: "¿Sueñas con tu propia mesa de resina? Cuéntanos tu idea y te damos presupuesto",
    ctaLink: "/contact"
  },
  {
    slug: "costo-piso-epoxico-metro-cuadrado",
    locale: "es",
    title: "Costo de Piso Epóxico por Metro Cuadrado: Desglose Detallado 2026",
    metaTitle: "Piso epóxico por m² en Costa Rica: ₡75.000 – ₡96.100 (2026) | SobrePoxi",
    metaDescription: "¿Cuánto cuesta el m² de piso epóxico en Costa Rica? Precio orientativo ₡75.000–₡96.100 por m² instalado (piso de 5 mm, según el acabado, IVA incluido). Qué incluye y cómo cotizar tu proyecto.",
    keywords: "costo piso epóxico metro cuadrado, precio m² epóxico, calcular presupuesto piso epoxi, costo resina epóxica m² Costa Rica, precio instalación epóxico m²",
    heroTitle: "Costo de Piso Epóxico por Metro Cuadrado",
    heroSubtitle: "Desglose detallado y transparente de qué pagas por cada m² de piso epóxico en Costa Rica",
    publishedDate: "2026-07-27",
    updatedDate: "2026-07-27",
    readingTime: "10 min",
    category: "Precios y Costos",
    categorySlug: "precios",
    sections: [
      {
        heading: "Precio por m² según el acabado en Costa Rica",
        content: `<p>El piso epóxico que instalamos es de <strong>5 mm, ya instalado</strong>, con un precio orientativo en Costa Rica en 2026 de <strong>₡75,000 a ₡96,100 por m² (IVA incluido)</strong>, <strong>incluyendo materiales y mano de obra profesional</strong>. El precio dentro del rango depende del acabado elegido:</p>
<ul>
<li><strong>Epóxico sólido monocapa:</strong> dentro del rango — bodegas, áreas de bajo tráfico</li>
<li><strong>Epóxico bicapa con escamas:</strong> dentro del rango — cocheras residenciales, talleres</li>
<li><strong>Sistema tricapa con topcoat UV:</strong> dentro del rango — cocheras premium, patios, terrazas</li>
<li><strong>Epóxico metálico decorativo:</strong> dentro del rango — interiores residenciales, comercios</li>
<li><strong>Sistema industrial antideslizante:</strong> dentro del rango — industria, cocinas, zonas húmedas</li>
<li><strong>Sistema conductivo/ESD:</strong> dentro del rango — electrónica, laboratorios</li>
</ul>
<p>El precio final de tu proyecto sale de la visita técnica, donde se evalúa el estado del concreto y el acabado que querés.</p>`
      },
      {
        heading: "Desglose del precio: ¿en qué se va tu dinero?",
        content: `<p>Para entender por qué un m² de piso epóxico cuesta lo que cuesta, este es el desglose aproximado de un sistema dentro del rango orientativo (₡75,000–₡96,100/m², IVA incluido):</p>
<table>
<thead><tr><th>Componente</th><th>% del precio</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>Preparación del sustrato</td><td>20-25%</td><td>Esmerilado, reparación de grietas, perfilado CSP 2-3</td></tr>
<tr><td>Materiales (resina + endurecedor)</td><td>30-35%</td><td>Resina de grado profesional, no comercial</td></tr>
<tr><td>Imprimante y accesorios</td><td>10%</td><td>Primer, escamas, cintas, rodillos</td></tr>
<tr><td>Topcoat protector</td><td>15%</td><td>Poliuretano o poliaspártico UV</td></tr>
<tr><td>Mano de obra especializada</td><td>20-25%</td><td>Aplicadores certificados, equipo</td></tr>
</tbody>
</table>
<p>Como ves, más del 50% del costo son materiales y preparación. Por eso los precios extremadamente bajos suelen significar materiales comerciales de baja calidad o preparación mínima (solo barrido, sin esmerilado).</p>`
      },
      {
        heading: "Cómo calcular el presupuesto de tu proyecto",
        content: `<p>Para cotizar tu proyecto, seguí estos pasos (sin multiplicar totales por tu cuenta):</p>
<ol>
<li><strong>Medí el área:</strong> Largo × ancho = metros cuadrados totales. Para áreas irregulares, dividí en rectángulos</li>
<li><strong>Elegí el acabado:</strong> Según uso (ver lista anterior). El precio se mueve dentro del rango orientativo de ₡75,000–₡96,100/m² (IVA incluido) según el acabado</li>
<li><strong>Mandanos los datos por WhatsApp:</strong> metros, espacio y acabado elegido</li>
<li><strong>Visita técnica:</strong> evaluamos el espesor necesario (trabajamos a 5 mm), el estado del concreto y te damos el total exacto</li>
</ol>
<p><strong>Cómo cotizar tu proyecto:</strong> medí el área (largo × ancho), elegí el acabado según el uso y mandanos los datos por WhatsApp. Un piso epóxico <strong>no se cotiza solo por m² sino por el espesor</strong>: trabajamos a 5 mm porque a menos espesor hay menos material y los problemas aparecen con el tiempo. Nunca publicamos un total multiplicado (rango × área): el total exacto lo confirma la visita técnica, según el estado del concreto y el acabado. Los servicios se facturan con 13% de IVA.</p>`
      },
      {
        heading: "Descuentos por volumen",
        content: `<p>Para proyectos grandes, el precio por m² disminuye por economía de escala. Esto es típico:</p>
<ul>
<li><strong>30-50 m²:</strong> Precio base</li>
<li><strong>50-100 m²:</strong> Descuento del 5-10% en precio por m²</li>
<li><strong>100-300 m²:</strong> Descuento del 10-15% en precio por m²</li>
<li><strong>300+ m²:</strong> Descuento del 15-20% + condiciones especiales</li>
</ul>
<p>Para proyectos industriales de gran escala (zonas francas, bodegas), existen sistemas optimizados que pueden bajar el costo por m² manteniendo calidad. Solicita cotización específica.</p>`
      },
      {
        heading: "Comparativa internacional de precios",
        content: `<p>Para contexto: el precio de un piso epóxico varía mucho entre mercados por materiales, mano de obra y normativas locales. Lo que importa para tu proyecto es el rango real en Costa Rica: <strong>₡75,000 a ₡96,100 por m² instalado (IVA incluido)</strong> (piso de 5 mm, según el acabado). Pedí siempre cotización con visita técnica en lugar de comparar con precios de otros países.</p>`
      },
      {
        heading: "Errores que encarecen tu proyecto",
        content: `<p>Algunas decisiones aparentemente de ahorro terminan costándote más a largo plazo:</p>
<ul>
<li><strong>Elegir el sistema más barato para uso intensivo:</strong> Un sistema monocapa en una cochera de alto tráfico se desgastará en 2-3 años, obligándote a reinstalar. Más caro a largo plazo</li>
<li><strong>No hacer prueba de humedad:</strong> Si aplicas epóxico sobre concreto con humedad ascendente, se ampollará y deberás remover todo y rehacer. Duplica el costo</li>
<li><strong>Omitir el topcoat UV:</strong> En áreas con sol directo, el epóxico sin protección UV se amarillea en meses. El topcoat cuesta +15% pero es indispensable</li>
<li><strong>Contratar instaladores no certificados:</strong> Si falla, tendrás que remover el epóxico defectuoso (costoso) y reinstalar. Paga una vez bien, no dos veces mal</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Cuál es el costo promedio por metro cuadrado de piso epóxico en Costa Rica?", answer: "El precio orientativo por metro cuadrado de piso epóxico en Costa Rica en 2026 es de ₡75,000 a ₡96,100 CRC por m² instalado (piso de 5 mm, según el acabado, IVA incluido), para un sistema de calidad profesional con materiales, preparación del concreto e instalación. Un piso epóxico se cotiza por el espesor, no solo por m²: el total exacto lo confirma la visita técnica." },
      { question: "¿El precio por m² incluye IVA?", answer: "Depende del proveedor. En Costa Rica el IVA es del 13%. Siempre pregunta si el precio cotizado incluye IVA o es antes de impuestos. En SobrePoxi cotizamos con IVA incluido para evitar sorpresas." },
      { question: "¿Hay costo mínimo de proyecto?", answer: "Sí, la mayoría de instaladores profesionales tienen un costo mínimo de proyecto porque hay costos fijos (movilización, equipo, preparación) que no dependen del área. En SobrePoxi el mínimo se define en la cotización según tu proyecto." },
      { question: "¿El precio incluye la visita técnica de evaluación?", answer: "En SobrePoxi la visita técnica en el Gran Área Metropolitana es gratuita. Siempre aclara este punto con tu proveedor antes de contratar." }
    ],
    relatedSlugs: ["precios-pisos-epoxicos-costa-rica", "cuanto-cuesta-piso-epoxico-cochera", "tipos-de-resina-epoxica"],
    ctaText: "¿Quieres calcular el costo exacto de tu proyecto? Pídenos cotización detallada",
    ctaLink: "/contact"
  },
  {
    slug: "que-es-mesa-rio",
    locale: "es",
    title: "Qué es una mesa río: madera de borde natural y resina epóxica",
    metaTitle: "Qué es una mesa río | Madera y resina | SobrePoxi",
    metaDescription: "Descubra qué es una mesa río: madera de borde natural unida por un cauce de resina epóxica. Cada pieza es única por su veta. Video incluido.",
    keywords: "qué es mesa río, mesa río madera resina, mesa resina epóxica, muebles resina Costa Rica, river table Costa Rica",
    heroTitle: "Qué es una mesa río",
    heroSubtitle: "Madera de borde natural y resina epóxica en una pieza única",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Aprenda",
    categorySlug: "aprenda",
    video: buildGuideVideo("que-es-mesa-rio", "es"),
    sections: [
      {
        heading: "La idea: un río entre dos orillas de madera",
        content: `<p>Una <strong>mesa río</strong> es un mueble que combina dos tablones de madera con un cauce central de resina epóxica, como un río que corre entre dos orillas. La madera aporta la calidez y el dibujo natural; la resina aporta el color y la unión entre ambas piezas.</p>
<p>El resultado es una superficie continua donde se lee con claridad el encuentro de los dos materiales: la veta viva de la madera y el cauce liso de la resina.</p>`
      },
      {
        heading: "El borde natural, protagonista de la pieza",
        content: `<p>La madera de una mesa río conserva su <strong>borde natural</strong>: no se corta en línea recta, sino que se dejan ver las curvas que el árbol ya traía. Ese borde es el que dibuja la forma del río.</p>
<p>Cada tablón trae su propio dibujo de veta —líneas, nudos y tonos— y por eso ninguna mesa río se repite. Dos mesas del mismo tamaño y color nunca se ven iguales.</p>`
      },
      {
        heading: "La resina: color y unión",
        content: `<p>La resina epóxica se pigmenta en el tono que usted elija: <strong>turquesa, azul profundo, celeste, negro o coral</strong>. Al endurecerse, une ambos tablones en una sola superficie pareja.</p>
<p>En la resina también se pueden encapsular elementos como <strong>arena, conchas o piedras</strong>, que quedan a la vista dentro del cauce y le dan un carácter todavía más personal a la pieza.</p>`
      },
      {
        heading: "Dónde luce una mesa río",
        content: `<p>Por su presencia, la mesa río suele ser la pieza central del ambiente: comedores, salas de estar, oficinas y recepciones. Al ser un mueble a pedido, se adapta al espacio donde va a vivir.</p>
<p>Si quiere ver una de cerca, escríbanos por WhatsApp y coordinamos una visita a nuestro taller en Coronado.</p>`
      }
    ],
    faqs: [
      { question: "¿Cada mesa río es diferente?", answer: "Sí. Como la veta y el borde natural de la madera nunca se repiten, cada mesa río es una pieza única, aunque comparta medidas y color con otra." },
      { question: "¿Puedo elegir el color de la resina?", answer: "Sí. Los tonos más pedidos son turquesa, azul profundo, celeste, negro y coral. Usted elige el que mejor combine con su espacio." },
      { question: "¿Qué es el borde natural de la madera?", answer: "Es el borde del tablón tal como venía en el árbol, con sus curvas originales. En la mesa río, ese borde dibuja la forma del cauce de resina." },
      { question: "¿Se pueden incluir objetos dentro de la resina?", answer: "Sí. Elementos como arena, conchas o piedras se pueden encapsular en la resina y quedan visibles dentro del cauce." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "tipos-de-resina-epoxica", "disenos-pisos-epoxicos-tendencias"],
    ctaText: "¿Quiere su propia mesa río? Cuéntenos su idea",
    ctaLink: "/contact"
  },
  {
    slug: "asi-nace",
    locale: "es",
    title: "Así nace una mesa río: el proceso paso a paso",
    metaTitle: "Cómo nace una mesa río | El proceso | SobrePoxi",
    metaDescription: "Conozca cómo nace una mesa río: escogencia de tablones, molde, vaciado de resina por capas, desmolde, lijado y pulido. Video incluido.",
    keywords: "cómo se hace mesa río, proceso mesa resina, molde melamina resina, lijado pulido resina",
    heroTitle: "Así nace una mesa río",
    heroSubtitle: "Del tablón al mueble terminado, paso a paso",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Aprenda",
    categorySlug: "aprenda",
    video: buildGuideVideo("asi-nace", "es"),
    sections: [
      {
        heading: "Paso 1: escoger los tablones",
        content: `<p>Todo empieza con la <strong>escogencia de los tablones</strong>. Se buscan piezas de borde natural cuya veta combine bien con el diseño de la mesa: el dibujo de la madera es lo que va a definir el carácter de la pieza.</p>
<p>Los tablones se preparan y se presentan uno frente al otro para decidir el ancho del cauce de resina que va a correr entre ellos.</p>`
      },
      {
        heading: "Paso 2: el molde y el vaciado por capas",
        content: `<p>Luego se arma un <strong>molde de melamina</strong> a la medida de la mesa, se colocan los tablones y se <strong>vacía la resina por capas</strong>. Vaciar por capas ayuda a que la pieza quede pareja y sin defectos.</p>
<p>Con <strong>calor se revientan las burbujas</strong> que suben a la superficie, para que el cauce quede limpio y traslúcido.</p>`
      },
      {
        heading: "Paso 3: desmolde, lijado y pulido",
        content: `<p>Ya firme la pieza, se <strong>desmolda</strong>: se retira el molde de melamina y aparece la mesa en su forma real. Después se <strong>lija</strong> progresivamente hasta emparejar madera y resina en una sola superficie.</p>
<p>El último paso es el <strong>pulido</strong>, que le devuelve a la resina su traslucidez y deja la mesa lista para recibir su estructura o patas.</p>`
      }
    ],
    faqs: [
      { question: "¿Por qué la resina se vacía por capas?", answer: "Vaciar por capas ayuda a que la pieza quede pareja y permite reventar las burbujas de cada capa antes de seguir con la siguiente." },
      { question: "¿Cómo se quitan las burbujas de la resina?", answer: "Las burbujas suben a la superficie y se revientan con calor, dejando el cauce limpio y traslúcido." },
      { question: "¿Qué es el molde de melamina?", answer: "Es el molde armado a la medida de la mesa donde se colocan los tablones y se vacía la resina. Al desmoldar, la pieza ya tiene su forma final." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "tipos-de-resina-epoxica"],
    ctaText: "¿Le gustaría ver el proceso en persona? Visítenos",
    ctaLink: "/contact"
  },
  {
    slug: "escoger-su-mesa",
    locale: "es",
    title: "Cómo escoger su mesa río: medida, madera y color",
    metaTitle: "Cómo escoger su mesa río | Guía | SobrePoxi",
    metaDescription: "Encargar su mesa río se resume en tres decisiones: medida, madera de veta clara u oscura y color de resina. Video incluido.",
    keywords: "cómo escoger mesa río, elegir mesa resina, colores resina epóxica turquesa azul negro coral, mesa a pedido",
    heroTitle: "Cómo escoger su mesa río",
    heroSubtitle: "Tres decisiones: medida, madera y color de resina",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Aprenda",
    categorySlug: "aprenda",
    video: buildGuideVideo("escoger-su-mesa", "es"),
    sections: [
      {
        heading: "Decisión 1: la medida",
        content: `<p>La primera decisión es la <strong>medida</strong>: el largo y el ancho según el espacio donde va a vivir la mesa. Mida el área disponible y deje espacio libre alrededor para circular y mover las sillas.</p>
<p>Si ya midió su comedor, compártanos las medidas por WhatsApp y le ayudamos a definir el tamaño ideal.</p>`
      },
      {
        heading: "Decisión 2: la madera",
        content: `<p>La segunda decisión es la <strong>madera</strong>: <strong>veta clara</strong> para ambientes luminosos y de líneas suaves, o <strong>veta oscura</strong> para espacios de carácter y contraste.</p>
<p>Cada tablón aporta su propio dibujo, así que la veta que usted elija es la que va a hacer única su mesa.</p>`
      },
      {
        heading: "Decisión 3: el color de la resina",
        content: `<p>La tercera decisión es el <strong>color de la resina</strong>. Los tonos que trabajamos son <strong>turquesa, azul profundo, celeste, negro y coral</strong>.</p>
<ul>
<li><strong>Turquesa y celeste:</strong> frescura y luz, muy pedidos para casas de playa y ambientes abiertos</li>
<li><strong>Azul profundo y negro:</strong> elegancia y contraste, ideales como pieza central</li>
<li><strong>Coral:</strong> calidez y personalidad para espacios alegres</li>
</ul>`
      }
    ],
    faqs: [
      { question: "¿Qué colores de resina puedo elegir?", answer: "Trabajamos turquesa, azul profundo, celeste, negro y coral. Usted elige el que mejor combine con su espacio." },
      { question: "¿Veta clara u oscura?", answer: "La veta clara va bien en ambientes luminosos y suaves; la veta oscura aporta carácter y contraste. Ambas hacen única la pieza por su dibujo natural." },
      { question: "¿Cómo sé qué medida pedir?", answer: "Mida el largo y el ancho del área disponible y deje espacio libre alrededor para circular. Con esas medidas le ayudamos a definir el tamaño por WhatsApp." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "tipos-de-resina-epoxica", "disenos-pisos-epoxicos-tendencias"],
    ctaText: "¿Ya sabe qué quiere? Pida su mesa a pedido",
    ctaLink: "/contact"
  },
  {
    slug: "mida-su-espacio",
    locale: "es",
    title: "Mida su espacio antes de pedir su mesa",
    metaTitle: "Cómo medir su comedor | Guía | SobrePoxi",
    metaDescription: "Mida su comedor antes de encargar la mesa: 90 cm libres alrededor, 75 cm de alto y 60 cm por persona. Video incluido.",
    keywords: "medir espacio mesa comedor, tamaño mesa comedor, altura mesa comedor 75 cm, espacio por persona mesa",
    heroTitle: "Mida su espacio antes de pedir",
    heroSubtitle: "Tres medidas que le evitan errores con el tamaño",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "3 min",
    category: "Aprenda",
    categorySlug: "aprenda",
    video: buildGuideVideo("mida-su-espacio", "es"),
    sections: [
      {
        heading: "El espacio libre alrededor: unos 90 cm",
        content: `<p>Antes de encargar su mesa, <strong>mida el espacio</strong>. Deje unos <strong>90 centímetros libres alrededor</strong> de la mesa para circular con comodidad y mover las sillas sin topar paredes ni muebles.</p>
<p>Marque el contorno con cinta en el piso: ver el rectángulo a tamaño real ayuda más que cualquier número en un papel.</p>`
      },
      {
        heading: "La altura: unos 75 cm",
        content: `<p>Como referencia común, una <strong>mesa de comedor mide unos 75 centímetros de alto</strong>. Esa altura combina con las sillas de comedor estándar y deja espacio cómodo para las piernas.</p>`
      },
      {
        heading: "El ancho por persona: unos 60 cm",
        content: `<p>Para calcular el largo, tome en cuenta que se calculan unos <strong>60 centímetros de ancho por persona</strong>. Una mesa para seis personas, por ejemplo, necesita holgura suficiente para seis puestos cómodos.</p>
<p>Con esas tres medidas en mano —largo, ancho y espacio libre— es mucho más fácil acertar con el tamaño de su mesa a pedido.</p>`
      }
    ],
    faqs: [
      { question: "¿Cuánto espacio libre dejo alrededor de la mesa?", answer: "Unos 90 centímetros libres alrededor permiten circular con comodidad y mover las sillas sin topar nada." },
      { question: "¿Cuál es la altura normal de una mesa de comedor?", answer: "Como referencia común, unos 75 centímetros de alto, que combina con las sillas de comedor estándar." },
      { question: "¿Cuánto espacio necesita cada persona?", answer: "Se calculan unos 60 centímetros de ancho por persona para comer con comodidad." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "pisos-epoxicos-modernos-para-interiores"],
    ctaText: "¿Ya tiene sus medidas? Cuéntenos su proyecto",
    ctaLink: "/contact"
  },
  {
    slug: "que-podemos-hacer",
    locale: "es",
    title: "Qué podemos hacer por usted: muebles a pedido",
    metaTitle: "Muebles a pedido | Mesas, barras, islas y más | SobrePoxi",
    metaDescription: "Muebles a pedido en Costa Rica: mesas, barras, islas de cocina, consolas, bancas, repisas, cabeceras, tablas de servir y pisos epóxicos. Video incluido.",
    keywords: "muebles a pedido Costa Rica, mesas barras islas resina, bancas consolas repisas resina, tablas de servir resina",
    heroTitle: "Qué podemos hacer por usted",
    heroSubtitle: "Muebles a pedido que combinan madera y resina",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Aprenda",
    categorySlug: "aprenda",
    video: buildGuideVideo("que-podemos-hacer", "es"),
    sections: [
      {
        heading: "Mesas para cada ambiente",
        content: `<p>Además de las mesas río de comedor, hacemos <strong>mesas de centro, escritorios y mesas de reunión</strong>, siempre a la medida de su espacio y con el color de resina que usted elija.</p>`
      },
      {
        heading: "Barras, islas, consolas y bancas",
        content: `<p>Para la cocina y el área social fabricamos <strong>barras e islas de cocina</strong>, además de <strong>consolas, bancas y repisas</strong> que visten entradas, pasillos y terrazas.</p>
<p>Cada pieza se diseña con usted: medidas, madera y color según el ambiente donde va a vivir.</p>`
      },
      {
        heading: "Piezas pequeñas y pisos epóxicos",
        content: `<p>También hacemos piezas más pequeñas como <strong>cabeceras y tablas de servir</strong>, ideales para regalar o para empezar a disfrutar la resina en casa.</p>
<p>Y para los pisos, aplicamos <strong>recubrimientos epóxicos</strong> que visten ambientes completos con diseños continuos y sin juntas visibles.</p>`
      }
    ],
    faqs: [
      { question: "¿Solo hacen mesas río?", answer: "No. Además de mesas, hacemos barras, islas de cocina, consolas, bancas, repisas, cabeceras, tablas de servir y pisos epóxicos." },
      { question: "¿Los muebles se hacen a la medida?", answer: "Sí. Cada pieza se diseña con usted: medidas, madera y color de resina según el espacio donde va a vivir." },
      { question: "¿Cómo empiezo mi proyecto?", answer: "Cuéntenos su idea por WhatsApp, con medidas y fotos del espacio si las tiene, y le ayudamos a darle forma." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "pisos-epoxicos-para-negocios", "tipos-de-resina-epoxica"],
    ctaText: "Cuéntenos su idea y le ayudamos a darle forma",
    ctaLink: "/contact"
  },
  {
    slug: "la-resina-es-arte",
    locale: "es",
    title: "La resina es arte: color y objetos encapsulados",
    metaTitle: "La resina epóxica es arte | SobrePoxi",
    metaDescription: "La resina epóxica nace de mezclar resina y endurecedor; se pigmenta y encapsula arena, conchas o piedras. Video incluido.",
    keywords: "resina epóxica arte, pigmentos resina epóxica, encapsulados resina arena conchas piedras",
    heroTitle: "La resina es arte",
    heroSubtitle: "Color y objetos encapsulados en cada pieza",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "3 min",
    category: "Aprenda",
    categorySlug: "aprenda",
    video: buildGuideVideo("la-resina-es-arte", "es"),
    sections: [
      {
        heading: "Dos componentes que se vuelven uno",
        content: `<p>La resina epóxica se forma al mezclar dos componentes: <strong>la resina y el endurecedor</strong>. Al unirse, la mezcla se endurece y se vuelve una superficie sólida y traslúcida.</p>
<p>Esa transformación —de líquido a sólido— es la que permite crear cauces, encapsulados y superficies continuas que con la madera sola no serían posibles.</p>`
      },
      {
        heading: "El color: pigmentos",
        content: `<p>Antes de endurecer, a la mezcla se le da color con <strong>pigmentos</strong>. Los tonos que trabajamos son <strong>turquesa, azul profundo, celeste, negro y coral</strong>.</p>
<p>El pigmento se distribuye en la resina y deja vetas y profundidades que cambian según la luz: ningún cauce se ve igual dos veces.</p>`
      },
      {
        heading: "Los encapsulados: arena, conchas y piedras",
        content: `<p>Dentro de la resina se pueden <strong>encapsular elementos</strong> como <strong>arena, conchas o piedras</strong>, que quedan a la vista dentro de la pieza, suspendidos en el cauce.</p>
<p>Esa combinación de color y objetos encapsulados es lo que convierte cada mueble en una pieza de arte: madera, color y memoria en una sola superficie.</p>`
      }
    ],
    faqs: [
      { question: "¿De qué está hecha la resina epóxica?", answer: "Se forma al mezclar dos componentes, la resina y el endurecedor, que al unirse se endurecen en una superficie sólida y traslúcida." },
      { question: "¿Qué colores se pueden lograr?", answer: "Con pigmentos se logran tonos como turquesa, azul profundo, celeste, negro y coral, con vetas y profundidades que cambian según la luz." },
      { question: "¿Qué objetos se pueden encapsular?", answer: "Elementos como arena, conchas o piedras, que quedan visibles y suspendidos dentro del cauce de resina." }
    ],
    relatedSlugs: ["tipos-de-resina-epoxica", "muebles-resina-epoxica-guia", "disenos-pisos-epoxicos-tendencias"],
    ctaText: "¿Quiere una pieza con su historia dentro? Hablemos",
    ctaLink: "/contact"
  }
];

const guidesEN: Guide[] = [
  {
    slug: "epoxy-flooring-garages",
    locale: "en",
    title: "Epoxy Flooring for Garages: Designs, Types and Benefits",
    metaTitle: "Epoxy Flooring for Garages | Modern & Durable Designs | SobrePoxi",
    metaDescription: "Complete guide on epoxy flooring for garages. Discover modern designs, resin types, benefits, costs and why they are the best option for your garage in Costa Rica.",
    keywords: "epoxy flooring garage, epoxy resin garage, modern garage floor, garage floor coating Costa Rica",
    heroTitle: "Epoxy Flooring for Garages",
    heroSubtitle: "Transform your garage with a resistant, modern and easy-to-maintain floor",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "12 min",
    category: "Residential Flooring",
    categorySlug: "residential-flooring",
    sections: [
      {
        heading: "Why choose epoxy flooring for your garage?",
        content: `<p>The garage is one of the most demanding spaces in the home: supports the weight of vehicles, oil spills, chemicals and constant traffic. An <strong>epoxy floor</strong> transforms this space into a resistant, elegant and extremely easy-to-clean surface.</p>
<p>Unlike conventional concrete paint, epoxy resin creates a monolithic layer that chemically bonds to the substrate, forming an impermeable barrier that protects the concrete from moisture, stains and wear.</p>
<ul>
<li><strong>Stain resistance:</strong> Motor oil, gasoline and chemicals clean up easily</li>
<li><strong>Extreme durability:</strong> Withstands the weight of heavy vehicles without cracking</li>
<li><strong>Modern aesthetics:</strong> Glossy, metallic or decorative flake finishes</li>
<li><strong>Easy maintenance:</strong> A damp mop pass is enough</li>
<li><strong>Added value:</strong> A garage with an epoxy floor increases your property value</li>
</ul>`
      },
      {
        heading: "Types of epoxy floors for garages",
        content: `<p>There are several epoxy resin systems designed specifically for garages, each with unique characteristics:</p>
<h3>1. Solid Epoxy (100% solids)</h3>
<p>The most resistant and durable system. Creates a thick layer of 2-3 mm that supports heavy vehicular traffic. Ideal for intensive-use garages.</p>
<h3>2. Epoxy with Flakes (Flake System)</h3>
<p>Combines epoxy resin with decorative vinyl flakes that give it a unique granite-like appearance. The flakes also provide anti-slip texture, perfect for areas where water may be present.</p>
<h3>3. Metallic Epoxy</h3>
<p>Uses metallic pigments that create impressive three-dimensional effects: lava, marble, ocean or galaxy. It is the most spectacular system visually and each floor is unique and unrepeatable.</p>
<h3>4. Self-Leveling Epoxy</h3>
<p>Applied as a liquid that self-levels, creating a perfectly smooth and uniform surface. Excellent for garages where a mirror-type finish is sought.</p>
<h3>5. Polyurea/Polyaspartic</h3>
<p>Although not technically epoxy, it is a hybrid system that cures in hours (vs. days for epoxy). Ideal for garages that need to be operational quickly.</p>`
      },
      {
        heading: "Popular designs for epoxy garage floors",
        content: `<p>The design possibilities with epoxy resin are practically infinite. These are the most requested designs:</p>
<ul>
<li><strong>Granite/Terrazzo effect:</strong> Multicolor flakes on a gray or black base — the most popular for garages</li>
<li><strong>Metallic marble:</strong> Metallic pigments that imitate luxury marble in gray, white or black tones</li>
<li><strong>Premium solid color:</strong> Anthracite gray, deep black or bone white — minimalist elegance</li>
<li><strong>Industrial effect:</strong> Polished concrete gray with satin finish — modern style</li>
<li><strong>Two-tone:</strong> Combination of two colors with demarcation lines — perfect for delimiting parking areas</li>
</ul>
<p>At <strong>SobrePoxi</strong> we work with you to design the ideal floor according to your home style and the use you give your garage.</p>`
      }
    ],
    faqs: [
      { question: "How long does an epoxy floor last in a garage?", answer: "A professionally installed epoxy floor in a garage can last between 10 and 20 years with adequate maintenance. Durability depends on the system used and the level of traffic." },
      { question: "Does epoxy flooring get slippery when wet?", answer: "Decorative flake systems or anti-slip additives provide excellent traction even when wet. We always recommend including anti-slip texture for garages." },
      { question: "Can epoxy flooring be installed over old concrete?", answer: "Yes, as long as the concrete is structurally sound. Crack repairs and professional profiling are performed before application to guarantee perfect adhesion." },
      { question: "Does car oil stain epoxy flooring?", answer: "No. One of the main advantages of epoxy is its resistance to oil, gasoline and other automotive chemical stains. They clean easily with water and soap." },
      { question: "How long does it take to install epoxy flooring in a garage?", answer: "The complete installation takes between 3 and 5 days. You can walk on the floor after 24 hours and park vehicles after approximately 72 hours." }
    ],
    relatedSlugs: ["types-of-epoxy-resin", "modern-epoxy-floors-interiors", "epoxy-floor-maintenance"],
    ctaText: "Ready to transform your garage? Request your free quote",
    ctaLink: "/contact"
  },
  {
    slug: "modern-epoxy-floors-interiors",
    locale: "en",
    title: "Modern Epoxy Floors for Interiors: Living Rooms, Kitchens and More",
    metaTitle: "Modern Epoxy Floors for Interiors | Living Rooms & Kitchens | SobrePoxi",
    metaDescription: "Discover how epoxy floors transform living rooms, kitchens and interior spaces. Modern designs, trending colors and luxury finishes for your home in Costa Rica.",
    keywords: "modern floors living rooms, epoxy interior floors, resin floors for home, modern kitchen floors, decorative home floors, seamless interior floors",
    heroTitle: "Modern Epoxy Floors for Interiors",
    heroSubtitle: "Give your home a contemporary look with seamless epoxy resin floors",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "11 min",
    category: "Residential Flooring",
    categorySlug: "residential-flooring",
    sections: [
      {
        heading: "The seamless floor trend in interiors",
        content: `<p>Epoxy floors have ceased to be exclusive to factories and industries. Today they are one of the <strong>strongest trends in interior design</strong>, especially in modern residential spaces where visual continuity and a minimalist style are sought.</p>
<p>An epoxy floor creates a completely <strong>seamless surface without joints or union lines</strong>, which visually expands any space. This is especially impactful in living rooms, open kitchens and loft-type spaces.</p>`
      },
      {
        heading: "Ideal spaces for epoxy floors in the home",
        content: `<h3>Living rooms</h3>
<p>Metallic floors in neutral tones (pearl gray, ivory white, sand) create a perfect canvas for any decoration style. Their glossy finish reflects natural light, making the living room feel more spacious and luminous.</p>
<h3>Kitchens</h3>
<p>The waterproof nature of epoxy makes it ideal for kitchens. It doesn't absorb liquids, resists wine, coffee and oil stains, and cleans in seconds. Plus, it eliminates joints where dirt accumulates.</p>
<h3>Bathrooms</h3>
<p>With anti-slip finish, epoxy floors are perfect for bathrooms. Zero joints means zero accumulated mold between tiles.</p>
<h3>Covered terraces</h3>
<p>For terraces protected from direct sun, epoxy offers an elegant finish that visually connects the interior with the exterior.</p>
<h3>Hallways and transit areas</h3>
<p>The visual continuity of epoxy eliminates interruptions between spaces, creating a natural flow throughout the home.</p>`
      },
      {
        heading: "Trending colors and finishes for 2026",
        content: `<p>This year's interior epoxy floor trends focus on a search for calm and connection with nature:</p>
<ul>
<li><strong>Warm earth tones:</strong> Beige, sand, soft terracotta — they connect with nature</li>
<li><strong>Sophisticated grays:</strong> From pearl gray to graphite — timeless elegance</li>
<li><strong>Creamy whites:</strong> White marble effect for luminous and minimalist spaces</li>
<li><strong>Polished concrete effect:</strong> Industrial-chic look very popular in lofts and modern spaces</li>
<li><strong>Soft green and blue tones:</strong> Organic hues that bring serenity</li>
</ul>
<p>At <strong>SobrePoxi</strong> we create physical samples of the color and finish you choose so you can see it in your space before deciding.</p>`
      },
      {
        heading: "Advantages over other interior floors",
        content: `<p>Compared to traditional options, epoxy flooring has unique advantages:</p>
<ul>
<li><strong>vs. Porcelain:</strong> Seamless, warmer to the touch, faster installation in large areas</li>
<li><strong>vs. Wood/Laminate:</strong> 100% water resistant, doesn't scratch easily, doesn't swell</li>
<li><strong>vs. Microcement:</strong> Greater chemical resistance, more color options, better gloss</li>
<li><strong>vs. Marble:</strong> Fraction of the cost, more stain resistant, same visual effect</li>
</ul>`
      },
      {
        heading: "How to integrate epoxy floors with your existing decoration",
        content: `<p>One of the most common fears is that the epoxy floor won't match the current decoration. The reality is that it's one of the most versatile floors to integrate with any style:</p>
<h3>Minimalist / Nordic Style</h3>
<p>Epoxy in white, light gray or beige tones with satin finish. The continuous seamless surface reinforces the visual cleanliness that defines this style. It combines perfectly with straight-line furniture, light woods and plants.</p>
<h3>Industrial / Loft Style</h3>
<p>Epoxy with polished concrete effect or dark gray with matte or satin finish. It complements exposed brick, metallic structures and robust furniture. The look is effortlessly sophisticated.</p>
<h3>Tropical / Coastal Style</h3>
<p>Epoxy in sand tones, soft turquoise or white with ocean effect. Perfect for beach houses in Guanacaste or the Costa Rican Caribbean. Combines with rattan, natural woods and organic textiles.</p>
<h3>Contemporary / Luxury Style</h3>
<p>Metallic epoxy in graphite, black or gold tones. Creates a dramatic visual impact that elevates any space. Ideal for premium residences, penthouses and entertainment spaces.</p>
<h3>Rustic / Country Style</h3>
<p>Epoxy in terracotta, honey or natural stone effect tones. Complements wooden beams, stone walls and country furniture without sacrificing the practicality of a modern surface.</p>
<p>At <strong>SobrePoxi</strong> we help you select the color, texture and finish that best integrates with your decoration. We create physical samples that you can take home to see them with your lighting and real furniture.</p>`
      },
      {
        heading: "Epoxy floors in apartments and condominiums",
        content: `<p>Apartments present unique challenges that epoxy resolves better than other floors:</p>
<ul>
<li><strong>Compact spaces:</strong> The seamless surface visually expands small apartments by up to 15-20% perceived</li>
<li><strong>Noise:</strong> Epoxy over concrete doesn't generate the heel noise that porcelain does. An insulating layer can be added under the system for greater acoustic reduction</li>
<li><strong>Pets:</strong> In pet-friendly condominiums, epoxy doesn't get damaged by dog nails or absorb odors like wood or carpet</li>
<li><strong>Resale:</strong> An apartment with design epoxy flooring stands out in the real estate market and can justify a higher price</li>
<li><strong>Regulations:</strong> Unlike wood that can spread in fires, epoxy is non-flammable, complying with building codes for residential buildings</li>
</ul>
<p><strong>Important note for Costa Rica:</strong> In apartment towers, substrate preparation must consider that concrete slabs may have less thickness than a foundation slab. A professional diagnosis ensures the chosen system is compatible with the existing structure.</p>`
      }
    ],
    faqs: [
      { question: "Are epoxy floors cold for interiors?", answer: "They have a similar temperature to concrete. They are compatible with radiant heating systems and in climates like Costa Rica, their freshness is actually an advantage." },
      { question: "Can epoxy flooring be installed over existing ceramic tile?", answer: "In many cases yes, depending on the state of the ceramic. A technical evaluation is performed to determine if it's necessary to remove the existing floor or if it can be applied directly." },
      { question: "Do epoxy floors yellow over time?", answer: "Systems with aliphatic polyurethane or polyaspartic topcoat are designed to resist yellowing from UV rays. It's important to use the correct system for interiors with lots of natural light." },
      { question: "Are epoxy floors safe for children and pets?", answer: "Yes. Once fully cured (72 hours), epoxy floors are inert, non-toxic and don't emit gases. They are a hygienic surface ideal for families with children and pets." }
    ],
    relatedSlugs: ["epoxy-flooring-garages", "epoxy-floor-design-trends", "types-of-epoxy-resin"],
    ctaText: "Want to see how an epoxy floor would look in your home? Schedule a design consultation",
    ctaLink: "/contact"
  },
  {
    slug: "types-of-epoxy-resin",
    locale: "en",
    title: "Types of Epoxy Resin: Complete Guide to Choose the Right One",
    metaTitle: "Types of Epoxy Resin | Complete Guide | SobrePoxi",
    metaDescription: "Learn about the different types of epoxy resin: for floors, furniture, art and more. Find out which is best for your project. Expert guide from SobrePoxi Costa Rica.",
    keywords: "types epoxy resin, epoxy resin for floors, resin for furniture, crystal clear resin, epoxy resin uses, which epoxy resin to use, epoxy resin differences",
    heroTitle: "Types of Epoxy Resin",
    heroSubtitle: "Complete guide to choose the right resin for your project",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "14 min",
    category: "Technical Guides",
    categorySlug: "technical-guides",
    sections: [
      {
        heading: "What is epoxy resin?",
        content: `<p><strong>Epoxy resin</strong> is a thermosetting polymer formed by mixing two components: a base resin (bisphenol A or F) and a hardener (amine or polyamide). This chemical reaction produces an extraordinarily hard, resistant and versatile material.</p>
<p>Not all epoxy resins are the same. There are specific formulations designed for different applications: industrial floors, artistic furniture, art, construction and more. Using the wrong resin is the most common mistake and can ruin a project.</p>`
      },
      {
        heading: "Epoxy resin for floors",
        content: `<p>Floor resins are formulated to withstand traffic, impacts and abrasion. They are classified as:</p>
<h3>100% Solids Epoxy</h3>
<p>Solvent-free. Creates thick layers (up to 3mm per application). The most resistant option for industrial floors and garages. Requires professional equipment for application.</p>
<h3>Water-Based Epoxy</h3>
<p>Easier to apply and with less odor. Ideal for residential spaces and areas with little ventilation. Lower chemical resistance than 100% solids.</p>
<h3>Solvent-Based Epoxy</h3>
<p>Excellent concrete penetration. Used mainly as a primer or sealer. Stronger odor during application.</p>
<h3>Metallic Epoxy</h3>
<p>Special formulation with metallic pigments that creates three-dimensional effects. Used for high-end decorative floors in residences and businesses.</p>`
      },
      {
        heading: "Epoxy resin for furniture and art",
        content: `<p>For furniture and art, resins with different properties than flooring are required:</p>
<h3>Crystal Clear Resin (Table Top)</h3>
<p>High transparency, self-leveling and UV yellowing resistant. Perfect for river tables, encapsulations and resin art. Can be poured in thick layers without generating excessive bubbles.</p>
<h3>Lamination Resin</h3>
<p>Low viscosity to impregnate fibers (carbon, fiberglass) or create thin layers. Used in manufacturing surfboards, jewelry and thin coatings.</p>
<h3>Pouring Resin (Deep Pour)</h3>
<p>Designed for deep pours of up to 5cm per layer. Generates less exothermic heat, which prevents cracking. Ideal for river tables and large-volume artistic pieces.</p>`
      },
      {
        heading: "Epoxy resin for construction and industry",
        content: `<p>In the construction and industrial sector, epoxy resins have critical applications:</p>
<ul>
<li><strong>Epoxy mortar:</strong> Structural concrete repair and bolt anchoring</li>
<li><strong>Crack injection:</strong> Sealing and repair of fissures in concrete structures</li>
<li><strong>Anti-corrosive coating:</strong> Protection of tanks, pipes and metallic structures</li>
<li><strong>Structural adhesive:</strong> Bonding dissimilar materials with superior resistance</li>
</ul>`
      },
      {
        heading: "How to choose the right resin for your project?",
        content: `<p>Use this quick guide to select the appropriate resin:</p>
<ul>
<li><strong>For garage or industrial floors:</strong> 100% solids epoxy + polyaspartic topcoat</li>
<li><strong>For decorative home floors:</strong> Metallic epoxy + UV resistant topcoat</li>
<li><strong>For river tables or encapsulations:</strong> Crystal clear Table Top or Deep Pour resin depending on thickness</li>
<li><strong>For art and jewelry:</strong> Low viscosity crystal clear resin</li>
<li><strong>For concrete repairs:</strong> Epoxy mortar or injection resin</li>
</ul>
<p>At <strong>SobrePoxi</strong> we are experts in all these systems. We advise you at no cost so you use the correct product in your project.</p>`
      },
      {
        heading: "Resin brands and qualities: what you should know",
        content: `<p>Not all epoxy resins are the same, and product quality directly determines the final result of your project:</p>
<h3>Professional grade vs. commercial resins</h3>
<p>Professional grade resins have a higher percentage of solids, better chemical resistance and longer service life. Commercial grade resins (those found in hardware stores) are thinner, less resistant and can fail in demanding applications such as garage floors or daily-use furniture.</p>
<h3>Factors that determine quality</h3>
<ul>
<li><strong>Solids percentage:</strong> 100% solids resins have no solvents that evaporate — everything you apply stays. Resins with 50-70% solids lose thickness when curing</li>
<li><strong>Compressive strength:</strong> Good floor resins exceed 10,000 PSI compressive strength. Economy ones may be below 5,000 PSI</li>
<li><strong>UV resistance:</strong> Resins without UV stabilizers yellow in weeks. Look for resins with integrated UV protection or always apply a protective topcoat</li>
<li><strong>Working time (pot life):</strong> A professional resin gives you 30-45 minutes of working time. Economy ones can cure in 15-20 minutes, making application difficult</li>
<li><strong>Viscosity:</strong> For floors, a medium viscosity allows self-leveling without running. For tables, you need low viscosity to eliminate bubbles</li>
</ul>
<h3>Why does SobrePoxi use premium products?</h3>
<p>We work exclusively with professional grade resins with quality certifications. This means your floor or furniture will maintain its appearance and performance for decades, not months. The cost difference between a good product and a mediocre one is minimal compared to the cost of redoing a failed project.</p>`
      },
      {
        heading: "Glossary of epoxy resin terms",
        content: `<p>If you're researching epoxy resin, these are the terms you'll encounter frequently:</p>
<ul>
<li><strong>Pot life:</strong> The time you have to work the mixture before it starts to harden</li>
<li><strong>Curing:</strong> Chemical process by which liquid resin becomes a hard solid. It's not the same as "drying" — it's an irreversible chemical reaction</li>
<li><strong>Exothermic:</strong> The curing reaction generates heat. In large volumes (like river tables), excessive heat can cause cracking or yellowing</li>
<li><strong>CSP (Concrete Surface Profile):</strong> Level of concrete roughness necessary for epoxy to adhere. Achieved with grinding or shot blasting</li>
<li><strong>Topcoat:</strong> Final transparent layer that protects epoxy from UV rays, abrasion and chemicals</li>
<li><strong>Polyaspartic:</strong> Type of aliphatic polyurea used as a high-resistance topcoat. Cures fast and has excellent UV resistance</li>
<li><strong>Deep pour:</strong> Resin formulated for deep pours (up to 5cm per layer) without generating excessive heat</li>
<li><strong>Table top:</strong> High transparency resin designed for furniture surfaces and thin encapsulations</li>
<li><strong>Live edge:</strong> Natural uncut wood edge, used in river tables and artistic furniture</li>
<li><strong>Flake:</strong> Decorative vinyl pieces scattered over wet epoxy to give texture and design</li>
<li><strong>Primer:</strong> First layer that penetrates concrete and seals pores to improve system adhesion</li>
<li><strong>Broadcast:</strong> Technique of scattering sand, quartz or flakes over the wet epoxy surface</li>
</ul>`
      }
    ],
    faqs: [
      { question: "What is the difference between epoxy and polyester resin?", answer: "Epoxy resin is more resistant, durable and has better adhesion than polyester. Polyester is more economical but yellows quickly and is less resistant to chemicals. For quality floors and furniture, we always recommend epoxy." },
      { question: "Is epoxy resin toxic?", answer: "During application it may emit irritating vapors and protective equipment should be used (gloves, mask, goggles). Once fully cured, it is inert. For food contact, ask us about certified formulations." },
      { question: "How long does epoxy resin take to cure?", answer: "It depends on the formulation, applied thickness, temperature and humidity. Message us on WhatsApp with your project and we'll give you estimated timelines." },
      { question: "Can a damaged epoxy floor be repaired?", answer: "Yes. Localized damage can be repaired without redoing the entire floor. The affected area is sanded and a new layer of resin is applied. This is one of the system's advantages." }
    ],
    relatedSlugs: ["epoxy-flooring-garages", "epoxy-resin-furniture-guide", "modern-epoxy-floors-interiors"],
    ctaText: "Don't know which resin you need? Contact us and we'll advise you for free",
    ctaLink: "/contact"
  },
  {
    slug: "epoxy-floor-maintenance",
    locale: "en",
    title: "Epoxy Floor Maintenance: How to Care for Them to Last Longer",
    metaTitle: "Epoxy Floor Maintenance | Care Guide | SobrePoxi",
    metaDescription: "Learn how to clean and maintain your epoxy floors so they last 20+ years. Professional cleaning tips, recommended products and mistakes to avoid.",
    keywords: "epoxy floor maintenance, how to clean epoxy floor, resin floor care, epoxy floor cleaning, epoxy floor lifespan, epoxy cleaning products",
    heroTitle: "Epoxy Floor Maintenance",
    heroSubtitle: "Professional tips to keep your floor looking like new for decades",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "5 min",
    category: "Technical Guides",
    categorySlug: "technical-guides",
    sections: [
      {
        heading: "Daily cleaning is easier than you think",
        content: `<p>One of the greatest advantages of epoxy floors is how <strong>incredibly easy they are to clean</strong>. Their non-porous surface prevents dirt from penetrating, so daily cleaning is reduced to:</p>
<ol>
<li><strong>Sweeping or vacuuming:</strong> Remove dust and loose particles with a soft broom or vacuum</li>
<li><strong>Damp mopping:</strong> Use warm water with a neutral cleaner (pH 7-8). You don't need special products</li>
<li><strong>Drying:</strong> Optionally, dry with a microfiber mop for a glossy finish</li>
</ol>
<p>That's it! A floor that takes minutes to clean versus tile joints that accumulate dirt.</p>`
      },
      {
        heading: "Deep cleaning (monthly)",
        content: `<p>Once a month, perform a more thorough cleaning:</p>
<ul>
<li>Use a mild degreaser cleaner diluted in water</li>
<li>Apply with a microfiber mop in circular motions</li>
<li>Rinse well with clean water</li>
<li>For tough stains, let the cleaner act 5-10 minutes before scrubbing</li>
</ul>
<p><strong>Professional tip:</strong> Never use muriatic acid, concentrated chlorine or abrasive cleaners. These can damage the epoxy finish.</p>`
      },
      {
        heading: "Products you SHOULD and SHOULD NOT use",
        content: `<h3>Recommended products</h3>
<ul>
<li>Warm water + neutral soap (the safest and most effective)</li>
<li>Multipurpose cleaners with neutral pH</li>
<li>Diluted biodegradable degreasers</li>
<li>Diluted ammonia (1/4 cup per gallon of water) for tough stains</li>
</ul>
<h3>Products to AVOID</h3>
<ul>
<li><strong>Muriatic acid:</strong> Corrodes the topcoat and dulls the floor</li>
<li><strong>Pure vinegar:</strong> Its acidity can damage the gloss over time</li>
<li><strong>Concentrated chlorine:</strong> Discolors and weakens the resin</li>
<li><strong>Abrasive powder cleaners:</strong> Scratch the surface</li>
<li><strong>Floor waxes:</strong> Create a layer that dulls epoxy's natural shine</li>
</ul>`
      },
      {
        heading: "How to prevent damage and extend service life",
        content: `<p>With these simple care steps, your epoxy floor can last 20 years or more:</p>
<ul>
<li><strong>Furniture protectors:</strong> Use adhesive felt pads on table and chair legs</li>
<li><strong>Entry mats:</strong> Capture sand and stones that can scratch the surface</li>
<li><strong>Immediate spill cleaning:</strong> Although epoxy resists stains, quick cleaning is better</li>
<li><strong>Avoid dragging heavy objects:</strong> Lift furniture when moving it</li>
<li><strong>Sun protection:</strong> In areas with direct UV light, curtains help prevent discoloration</li>
</ul>`
      }
    ],
    faqs: [
      { question: "How often should I clean my epoxy floor?", answer: "Daily or every 2 days sweeping, and damp mopping 1-2 times per week is sufficient for most homes. Deep cleaning once a month." },
      { question: "Can a pressure washer be used on epoxy floors?", answer: "Yes, but with caution. Use low-medium pressure and keep the nozzle at least 30cm from the floor. Excessive pressure can damage the topcoat over time." },
      { question: "Does epoxy flooring lose gloss over time?", answer: "A slight loss of gloss after several years of use is normal. It can be restored with a new topcoat application without redoing the entire floor." },
      { question: "What do I do if my epoxy floor gets scratched?", answer: "Superficial scratches can be polished with a fine polishing pad. For deep scratches, a professional can repair the affected area without intervening the rest of the floor." }
    ],
    relatedSlugs: ["epoxy-flooring-garages", "modern-epoxy-floors-interiors", "epoxy-floors-for-businesses"],
    ctaText: "Does your epoxy floor need professional maintenance? Contact us",
    ctaLink: "/contact"
  },
  {
    slug: "epoxy-floor-design-trends",
    locale: "en",
    title: "Epoxy Floor Designs: Trends and Ideas to Inspire You",
    metaTitle: "Epoxy Floor Designs | Trends & Ideas | SobrePoxi",
    metaDescription: "Explore the most striking epoxy floor designs: metallic, marble effect, 3D, flakes and more. Design ideas for homes and businesses in Costa Rica.",
    keywords: "epoxy floor designs, metallic epoxy floors, resin marble effect floor, 3D epoxy floors, resin floor ideas, decorative epoxy floors",
    heroTitle: "Epoxy Floor Designs",
    heroSubtitle: "Trends, ideas and inspiration for your next project",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "6 min",
    category: "Inspiration",
    categorySlug: "inspiration",
    sections: [
      {
        heading: "Metallic epoxy floors: the king of designs",
        content: `<p><strong>Metallic floors</strong> are undoubtedly the most striking and requested design. They use special metallic pigments that, when manipulated during application, create unique three-dimensional effects:</p>
<ul>
<li><strong>Lava effect:</strong> Color flows simulating volcanic lava — dramatic and impactful</li>
<li><strong>Ocean effect:</strong> Blue and turquoise tones with wave and depth effect</li>
<li><strong>Marble effect:</strong> Natural veins imitating high-end Italian marble</li>
<li><strong>Galaxy effect:</strong> Combination of blacks, blues and metallic sparkles</li>
<li><strong>Cloud effect:</strong> Soft whites and grays with ethereal transitions</li>
</ul>
<p>Each metallic floor is <strong>100% unique and unrepeatable</strong> — literally a work of art under your feet.</p>`
      },
      {
        heading: "Flake system (Flake Floor)",
        content: `<p>The flake system is the most popular for garages, gyms and commercial areas due to its combination of aesthetics and functionality:</p>
<ul>
<li><strong>Classic multicolor:</strong> Mix of 3-4 colors that hides imperfections and dirt</li>
<li><strong>Elegant monochromatic:</strong> A single flake color on a contrasting base</li>
<li><strong>Partial coverage:</strong> Flakes distributed with spacing for a more subtle look</li>
<li><strong>Total coverage:</strong> Flakes covering 100% for maximum texture and durability</li>
</ul>
<p>Flakes also provide <strong>anti-slip texture</strong>, making these floors functional as well as beautiful.</p>`
      },
      {
        heading: "Designs with quartz and sand",
        content: `<p>For environments requiring maximum resistance and an industrial-chic look:</p>
<ul>
<li><strong>Quartz broadcast:</strong> Colored quartz sand scattered over epoxy — ultra traffic resistant</li>
<li><strong>Epoxy terrazzo:</strong> Simulates traditional terrazzo but seamless and with customizable colors</li>
<li><strong>Natural sand:</strong> Creates organic textures evoking natural stone or beach</li>
</ul>`
      },
      {
        heading: "Color trends for 2026",
        content: `<p>This year's most requested colors reflect a search for calm and connection with nature:</p>
<ul>
<li><strong>#1 Warm gray (Greige):</strong> The gray and beige mix dominates residential projects</li>
<li><strong>#2 Pearl white:</strong> Luminosity and visual amplitude — favorite for apartments</li>
<li><strong>#3 Satin black:</strong> Maximum elegance for premium and commercial spaces</li>
<li><strong>#4 Earthy tones:</strong> Terracotta, clay and honey — natural warmth</li>
<li><strong>#5 Deep blue:</strong> Sophistication and personality for unique spaces</li>
</ul>`
      },
      {
        heading: "How to choose the perfect design for your space",
        content: `<p>Consider these factors when choosing your design:</p>
<ul>
<li><strong>Space lighting:</strong> Dark spaces benefit from light colors and glossy finishes</li>
<li><strong>Area size:</strong> Light and uniform colors visually expand small spaces</li>
<li><strong>Space use:</strong> High-traffic areas benefit from multicolor designs that hide wear</li>
<li><strong>Decoration style:</strong> The floor should complement, not compete with, furniture and decoration</li>
<li><strong>Desired maintenance:</strong> Dark colors show more dust; light colors show stains</li>
</ul>
<p>At <strong>SobrePoxi</strong> we create physical samples so you can see exactly how your floor will look before committing.</p>`
      }
    ],
    faqs: [
      { question: "Can any epoxy floor design be customized?", answer: "Yes. Epoxy floors are completely customizable in color, pattern, texture and finish. We can match any Pantone color or create unique combinations according to your vision." },
      { question: "Does metallic flooring look the same in photos as in person?", answer: "Metallic floors are even more impressive in person. Photos don't capture the three-dimensional depth or how effects change according to the light angle. We recommend seeing samples live." },
      { question: "Can I include logos or custom designs on the floor?", answer: "Yes. We can incorporate logos, names, geometric designs or any custom image on your epoxy floor. It's popular in businesses, showrooms and enthusiast garages." }
    ],
    relatedSlugs: ["epoxy-flooring-garages", "modern-epoxy-floors-interiors", "epoxy-floors-for-businesses"],
    ctaText: "Already have an idea in mind? Tell us your vision and we'll make it reality",
    ctaLink: "/contact"
  },
  {
    slug: "epoxy-resin-furniture-guide",
    locale: "en",
    title: "Epoxy Resin Furniture: River Tables, Art and Unique Designs",
    metaTitle: "Epoxy Resin Furniture | River Tables & Designs | SobrePoxi",
    metaDescription: "Everything about epoxy resin furniture: river tables, coffee tables, bars and more. Discover designs, manufacturing process and how to order your unique piece in Costa Rica.",
    keywords: "epoxy resin furniture, epoxy river table, resin and wood table, epoxy furniture Costa Rica, epoxy resin bar, epoxy resin art, resin coffee table",
    heroTitle: "Epoxy Resin Furniture",
    heroSubtitle: "Unique pieces where nature meets art",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "7 min",
    category: "Furniture",
    categorySlug: "furniture",
    sections: [
      {
        heading: "What is epoxy resin furniture?",
        content: `<p><strong>Epoxy resin furniture</strong> is furniture pieces that combine natural materials —mainly wood— with crystal clear or pigmented epoxy resin. The result is furniture that fuses wood's organic beauty with resin's artistic effects.</p>
<p>The most iconic piece is the <strong>"river table"</strong>: two pieces of live-edge wood joined by a river of transparent or colored resin that flows between them. But the possibilities go much further.</p>`
      },
      {
        heading: "Types of epoxy resin furniture",
        content: `<ul>
<li><strong>River Tables:</strong> The crown jewel. Dining tables, desks or coffee tables with resin rivers between wood planks</li>
<li><strong>Coffee tables:</strong> Compact pieces with artistic designs, including encapsulations of decorative objects</li>
<li><strong>Bars and counters:</strong> Bar surfaces with resin incorporating LEDs, objects or custom designs</li>
<li><strong>Artistic cutting boards:</strong> Functional and decorative pieces for the kitchen</li>
<li><strong>Wall clocks:</strong> Functional art with wood and resin combinations</li>
<li><strong>Shelves and bookcases:</strong> Decorative pieces with live edge and resin</li>
<li><strong>Wall art:</strong> Three-dimensional paintings and murals in resin</li>
</ul>`
      },
      {
        heading: "The creation process of a river table",
        content: `<p>Creating a river table is an artisanal process that requires patience and experience:</p>
<ol>
<li><strong>Wood selection:</strong> Live edge planks are chosen — each piece is unique for its natural shapes</li>
<li><strong>Preparation:</strong> Drying, planing and sealing the wood to prevent air bubbles</li>
<li><strong>Mold construction:</strong> A custom mold is created where the wood and resin will be placed</li>
<li><strong>Resin pouring:</strong> The resin is mixed and poured (often in multiple layers for thick pieces)</li>
<li><strong>Bubble removal:</strong> A heat gun or torch removes trapped bubbles</li>
<li><strong>Curing:</strong> Controlled resin curing, watching temperature and humidity</li>
<li><strong>Demolding and cutting:</strong> Removed from the mold and cut to final dimensions</li>
<li><strong>Progressive sanding:</strong> Step-by-step sanding and polishing to achieve crystal transparency</li>
<li><strong>Finishing:</strong> Oil, varnish or final protective topcoat</li>
<li><strong>Legs/structure:</strong> Metal, wood or custom design legs are installed</li>
</ol>`
      },
      {
        heading: "Why invest in resin furniture?",
        content: `<ul>
<li><strong>100% unique piece:</strong> Each piece is unrepeatable due to wood's natural shapes and resin's effects</li>
<li><strong>Exceptional durability:</strong> Epoxy resin is highly resistant to scratches, stains and moisture</li>
<li><strong>Artistic value:</strong> They are functional art pieces that become the center of attention in any space</li>
<li><strong>Total customization:</strong> Resin color, wood type, dimensions, design — all made to measure</li>
<li><strong>Long-term investment:</strong> Well-made resin furniture lasts for decades with proper care</li>
</ul>`
      }
    ],
    faqs: [
      { question: "How much does a river table cost?", answer: "We don't publish prices: each piece is quoted made-to-measure according to the measurements, the wood and the design. Send us your idea and measurements on WhatsApp and we'll quote your specific project." },
      { question: "Does resin on tables turn yellow?", answer: "The professional quality resins we use at SobrePoxi include UV stabilizers that minimize yellowing. Additionally, we apply protective UV topcoats to maintain transparency for years." },
      { question: "Can a river table be used as a daily dining table?", answer: "Yes. With the appropriate protective finish, a river table is completely functional for daily use. It resists moderate heat, stains and moisture. We recommend using coasters for very hot drinks." },
      { question: "How long does it take to make a river table?", answer: "The timeline depends on the size and complexity of the piece and is confirmed in the quote. Send us your idea on WhatsApp and we'll give you your project's timeline." }
    ],
    relatedSlugs: ["types-of-epoxy-resin", "epoxy-floor-design-trends"],
    ctaText: "Want your own river table or custom furniture? Let's talk about your idea",
    ctaLink: "/contact"
  },
  {
    slug: "epoxy-floors-for-businesses",
    locale: "en",
    title: "Epoxy Floors for Businesses: Restaurants, Stores, Offices and More",
    metaTitle: "Epoxy Floors for Businesses | Commercial & Offices | SobrePoxi",
    metaDescription: "Commercial epoxy floors for restaurants, stores, offices, clinics and more. Professional designs, high durability and regulatory compliance in Costa Rica.",
    keywords: "epoxy floors businesses, resin floor restaurant, epoxy floor office, commercial floors Costa Rica, epoxy floor clinic, floors for stores",
    heroTitle: "Epoxy Floors for Businesses",
    heroSubtitle: "Impress your customers with a floor that reflects your brand quality",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-08",
    readingTime: "6 min",
    category: "Commercial Flooring",
    categorySlug: "commercial-flooring",
    sections: [
      {
        heading: "Why do businesses choose epoxy floors?",
        content: `<p>The floor is one of the largest surfaces in any business and has a direct impact on your customers' perception. A <strong>professional epoxy floor</strong> communicates quality, modernity and attention to detail.</p>
<p>Beyond aesthetics, epoxy floors offer operational advantages that make them ideal for commercial environments:</p>
<ul>
<li><strong>Extreme durability:</strong> Withstand intense traffic, impacts and abrasion without deteriorating</li>
<li><strong>Easy cleaning:</strong> Non-porous surface allows quick and efficient cleaning</li>
<li><strong>Hygiene:</strong> No joints where bacteria accumulate, ideal for food and health</li>
<li><strong>Aesthetic versatility:</strong> Customizable designs that reinforce brand identity</li>
</ul>`
      },
      {
        heading: "Ideal sectors for epoxy floors",
        content: `<h3>Restaurants and industrial kitchens</h3>
<p>Epoxy floors are the most hygienic option for professional kitchens. They don't absorb fats, don't develop mold and resist liquid spills. Anti-slip systems prevent accidents in preparation areas.</p>
<h3>Stores and retail</h3>
<p>A glossy, custom epoxy floor creates a memorable shopping experience. Metallic designs or special effects impress customers from the first moment.</p>
<h3>Corporate offices</h3>
<p>The visual continuity of epoxy conveys professionalism and modernity. Neutral tones and polished concrete effects are popular in corporate spaces.</p>
<h3>Clinics and laboratories</h3>
<p>Epoxy's antimicrobial and impermeable surface makes it perfect for health environments. It complies with the strictest hygiene regulations.</p>
<h3>Gyms and sports centers</h3>
<p>Systems with quartz or flakes provide the anti-slip texture necessary for high-traffic zones and weight areas.</p>`
      },
      {
        heading: "Installation considerations in commercial environments",
        content: `<p>Installing epoxy floors in businesses requires special considerations:</p>
<ul>
<li><strong>Installation time:</strong> 3-5 days for complete systems. Can be planned in stages to minimize operational impact.</li>
<li><strong>Chemical resistance:</strong> Gastronomic venue floors must resist oils, fats and aggressive cleaning products.</li>
<li><strong>Inventory movement:</strong> In warehouses and distribution centers, resistance to impacts and forklift traffic is critical.</li>
<li><strong>Regulatory compliance:</strong> In Costa Rica, commercial floors must comply with accessibility and safety codes.</li>
</ul>`
      },
      {
        heading: "Commercial epoxy floor trends for 2026",
        content: `<p>Commercial epoxy floor trends focus on:</p>
<ul>
<li><strong>Premium marble effect:</strong> Imitation natural marble at a fraction of the cost, with greater durability</li>
<li><strong>Corporate tones:</strong> Sophisticated grays, technical whites and subtle metallic tones</li>
<li><strong>Antimicrobial systems:</strong> Integrated bacterial resistance for health and food environments</li>
<li><strong>Conductive epoxy:</strong> For environments with sensitive electronic equipment</li>
</ul>`
      }
    ],
    faqs: [
      { question: "How long does an epoxy floor last in a business?", answer: "A professional epoxy floor in a commercial environment can last between 10 and 20 years with adequate maintenance. Durability depends on the chosen system and traffic level." },
      { question: "Can epoxy be installed in a venue with active operations?", answer: "Yes, but requires planning. It can be installed in sections to not completely interrupt operations. There are also fast-curing systems that allow reopening in less time." },
      { question: "What maintenance does a commercial epoxy floor require?", answer: "Maintenance is simple: daily sweeping, periodic mopping with neutral cleaner. For high-traffic zones, monthly deep cleaning with specialized products is recommended." }
    ],
    relatedSlugs: ["epoxy-floor-design-trends", "epoxy-floor-maintenance"],
    ctaText: "Need an epoxy floor for your business? Request a personalized quote",
    ctaLink: "/contact"
  },
  {
    slug: "que-es-mesa-rio",
    locale: "en",
    title: "What a river table is: natural-edge wood and epoxy resin",
    metaTitle: "What a river table is | Wood & resin | SobrePoxi",
    metaDescription: "Learn what a river table is: natural-edge wood joined by a channel of epoxy resin. Each piece is unique thanks to its grain. Video included.",
    keywords: "what is river table, river table wood resin, epoxy resin table, resin furniture Costa Rica",
    heroTitle: "What a river table is",
    heroSubtitle: "Natural-edge wood and epoxy resin in a one-of-a-kind piece",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Learn",
    categorySlug: "learn",
    video: buildGuideVideo("que-es-mesa-rio", "en"),
    sections: [
      {
        heading: "The idea: a river between two wooden banks",
        content: `<p>A <strong>river table</strong> is a piece of furniture that combines two wood slabs with a central channel of epoxy resin, like a river flowing between two banks. The wood brings warmth and natural pattern; the resin brings color and joins both pieces.</p>
<p>The result is a continuous surface where the meeting of both materials reads clearly: the living grain of the wood and the smooth channel of resin.</p>`
      },
      {
        heading: "The natural edge, star of the piece",
        content: `<p>The wood of a river table keeps its <strong>natural edge</strong>: it is not cut in a straight line, so the curves the tree already had stay visible. That edge draws the shape of the river.</p>
<p>Each slab brings its own grain pattern —lines, knots and tones— so no river table ever repeats. Two tables of the same size and color never look alike.</p>`
      },
      {
        heading: "The resin: color and union",
        content: `<p>Epoxy resin is pigmented in the tone you choose: <strong>turquoise, deep blue, sky blue, black or coral</strong>. As it hardens, it joins both slabs into a single even surface.</p>
<p>Elements such as <strong>sand, shells or stones</strong> can also be encapsulated in the resin, staying visible inside the channel and giving the piece an even more personal character.</p>`
      },
      {
        heading: "Where a river table shines",
        content: `<p>With its presence, the river table is usually the centerpiece of the room: dining rooms, living rooms, offices and receptions. As a made-to-order piece, it adapts to the space where it will live.</p>
<p>If you would like to see one up close, message us on WhatsApp and we will arrange a visit to our workshop in Coronado.</p>`
      }
    ],
    faqs: [
      { question: "Is each river table different?", answer: "Yes. Since the grain and the natural edge of the wood never repeat, every river table is a one-of-a-kind piece, even when it shares size and color with another." },
      { question: "Can I choose the resin color?", answer: "Yes. The most requested tones are turquoise, deep blue, sky blue, black and coral. You choose the one that best matches your space." },
      { question: "What is the natural edge of wood?", answer: "It is the edge of the slab just as it came from the tree, with its original curves. In a river table, that edge draws the shape of the resin channel." },
      { question: "Can objects be included inside the resin?", answer: "Yes. Elements such as sand, shells or stones can be encapsulated in the resin and stay visible inside the channel." }
    ],
    relatedSlugs: ["epoxy-resin-furniture-guide", "types-of-epoxy-resin", "epoxy-floor-design-trends"],
    ctaText: "Want your own river table? Tell us your idea",
    ctaLink: "/contact"
  },
  {
    slug: "asi-nace",
    locale: "en",
    title: "How a river table is born: the process step by step",
    metaTitle: "How a river table is born | The process | SobrePoxi",
    metaDescription: "See how a river table is born: choosing the slabs, the mold, pouring resin in layers, demolding, sanding and polishing. Video included.",
    keywords: "how river table is made, resin table process, melamine mold resin, resin sanding polishing",
    heroTitle: "How a river table is born",
    heroSubtitle: "From slab to finished furniture, step by step",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Learn",
    categorySlug: "learn",
    video: buildGuideVideo("asi-nace", "en"),
    sections: [
      {
        heading: "Step 1: choosing the slabs",
        content: `<p>It all starts with <strong>choosing the slabs</strong>. We look for natural-edge pieces whose grain suits the design of the table: the pattern of the wood is what will define the character of the piece.</p>
<p>The slabs are prepared and presented facing each other to decide the width of the resin channel that will run between them.</p>`
      },
      {
        heading: "Step 2: the mold and pouring in layers",
        content: `<p>Then a <strong>melamine mold</strong> is built to the size of the table, the slabs are set in place and the <strong>resin is poured in layers</strong>. Pouring in layers helps the piece come out even and flawless.</p>
<p><strong>Heat is used to pop the bubbles</strong> that rise to the surface, so the channel stays clean and translucent.</p>`
      },
      {
        heading: "Step 3: demolding, sanding and polishing",
        content: `<p>Once the piece is firm, it is <strong>demolded</strong>: the melamine mold is removed and the table appears in its real shape. Then it is <strong>sanded</strong> progressively until wood and resin sit in a single surface.</p>
<p>The last step is <strong>polishing</strong>, which brings back the translucency of the resin and leaves the table ready for its frame or legs.</p>`
      }
    ],
    faqs: [
      { question: "Why is resin poured in layers?", answer: "Pouring in layers helps the piece come out even and lets us pop the bubbles of each layer before moving on to the next." },
      { question: "How are bubbles removed from resin?", answer: "Bubbles rise to the surface and are popped with heat, leaving the channel clean and translucent." },
      { question: "What is a melamine mold?", answer: "It is the mold built to the size of the table where the slabs are placed and the resin is poured. At demolding, the piece already has its final shape." }
    ],
    relatedSlugs: ["epoxy-resin-furniture-guide", "types-of-epoxy-resin"],
    ctaText: "Would you like to see the process in person? Visit us",
    ctaLink: "/contact"
  },
  {
    slug: "escoger-su-mesa",
    locale: "en",
    title: "How to choose your river table: size, wood and color",
    metaTitle: "How to choose your river table | Guide | SobrePoxi",
    metaDescription: "Ordering your river table comes down to three decisions: size, light or dark grain wood, and resin color. Video included.",
    keywords: "how to choose river table, custom resin table, turquoise blue black coral epoxy colors, custom table",
    heroTitle: "How to choose your river table",
    heroSubtitle: "Three decisions: size, wood and resin color",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Learn",
    categorySlug: "learn",
    video: buildGuideVideo("escoger-su-mesa", "en"),
    sections: [
      {
        heading: "Decision 1: the size",
        content: `<p>The first decision is the <strong>size</strong>: length and width according to the space where the table will live. Measure the available area and leave clearance around it to move and pull out the chairs.</p>
<p>If you already measured your dining room, share the measurements on WhatsApp and we will help you define the ideal size.</p>`
      },
      {
        heading: "Decision 2: the wood",
        content: `<p>The second decision is the <strong>wood</strong>: <strong>light grain</strong> for bright rooms with soft lines, or <strong>dark grain</strong> for spaces with character and contrast.</p>
<p>Each slab brings its own pattern, so the grain you choose is what will make your table unique.</p>`
      },
      {
        heading: "Decision 3: the resin color",
        content: `<p>The third decision is the <strong>resin color</strong>. The tones we work with are <strong>turquoise, deep blue, sky blue, black and coral</strong>.</p>
<ul>
<li><strong>Turquoise and sky blue:</strong> freshness and light, much requested for beach houses and open spaces</li>
<li><strong>Deep blue and black:</strong> elegance and contrast, ideal as a centerpiece</li>
<li><strong>Coral:</strong> warmth and personality for cheerful spaces</li>
</ul>`
      }
    ],
    faqs: [
      { question: "Which resin colors can I choose?", answer: "We work with turquoise, deep blue, sky blue, black and coral. You choose the one that best matches your space." },
      { question: "Light or dark grain?", answer: "Light grain suits bright, soft rooms; dark grain brings character and contrast. Both make the piece unique through their natural pattern." },
      { question: "How do I know which size to order?", answer: "Measure the length and width of the available area and leave clearance around it to move. With those measurements we help you define the size on WhatsApp." }
    ],
    relatedSlugs: ["epoxy-resin-furniture-guide", "types-of-epoxy-resin", "epoxy-floor-design-trends"],
    ctaText: "Already know what you want? Order your custom table",
    ctaLink: "/contact"
  },
  {
    slug: "mida-su-espacio",
    locale: "en",
    title: "Measure your space before ordering your table",
    metaTitle: "How to measure your dining room | Guide | SobrePoxi",
    metaDescription: "Measure your dining room before ordering the table: 90 cm of clearance around it, 75 cm high and 60 cm per person. Video included.",
    keywords: "measure dining room space, dining table size, 75 cm dining table height, space per person table",
    heroTitle: "Measure your space before ordering",
    heroSubtitle: "Three measurements that prevent sizing mistakes",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "3 min",
    category: "Learn",
    categorySlug: "learn",
    video: buildGuideVideo("mida-su-espacio", "en"),
    sections: [
      {
        heading: "Clearance around it: about 90 cm",
        content: `<p>Before ordering your table, <strong>measure the space</strong>. Leave about <strong>90 centimeters of clearance around</strong> the table to move comfortably and pull out the chairs without hitting walls or furniture.</p>
<p>Mark the outline with tape on the floor: seeing the full-size rectangle helps more than any number on paper.</p>`
      },
      {
        heading: "The height: about 75 cm",
        content: `<p>As a common reference, a <strong>dining table is about 75 centimeters high</strong>. That height pairs with standard dining chairs and leaves comfortable legroom.</p>`
      },
      {
        heading: "Width per person: about 60 cm",
        content: `<p>To work out the length, keep in mind that about <strong>60 centimeters of width per person</strong> are planned. A table for six, for example, needs enough room for six comfortable seats.</p>
<p>With those three measurements in hand —length, width and clearance— getting the size of your custom table right is much easier.</p>`
      }
    ],
    faqs: [
      { question: "How much clearance do I leave around the table?", answer: "About 90 centimeters of clearance around it lets you move comfortably and pull out the chairs without hitting anything." },
      { question: "What is the standard height of a dining table?", answer: "As a common reference, about 75 centimeters high, which pairs with standard dining chairs." },
      { question: "How much space does each person need?", answer: "About 60 centimeters of width per person are planned for comfortable dining." }
    ],
    relatedSlugs: ["epoxy-resin-furniture-guide", "modern-epoxy-floors-interiors"],
    ctaText: "Already have your measurements? Tell us about your project",
    ctaLink: "/contact"
  },
  {
    slug: "que-podemos-hacer",
    locale: "en",
    title: "What we can make for you: custom furniture",
    metaTitle: "Custom furniture | Tables, bars, islands & more | SobrePoxi",
    metaDescription: "Custom furniture in Costa Rica: tables, bars, kitchen islands, consoles, benches, shelves, headboards, serving boards and epoxy floors. Video included.",
    keywords: "custom furniture Costa Rica, resin tables bars islands, resin consoles benches shelves, resin serving boards",
    heroTitle: "What we can make for you",
    heroSubtitle: "Made-to-order furniture combining wood and resin",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "4 min",
    category: "Learn",
    categorySlug: "learn",
    video: buildGuideVideo("que-podemos-hacer", "en"),
    sections: [
      {
        heading: "Tables for every room",
        content: `<p>Beyond dining river tables, we make <strong>coffee tables, desks and meeting tables</strong>, always sized to your space and with the resin color you choose.</p>`
      },
      {
        heading: "Bars, islands, consoles and benches",
        content: `<p>For the kitchen and social areas we build <strong>bars and kitchen islands</strong>, plus <strong>consoles, benches and shelves</strong> that dress entries, hallways and terraces.</p>
<p>Each piece is designed with you: measurements, wood and color according to the room where it will live.</p>`
      },
      {
        heading: "Small pieces and epoxy floors",
        content: `<p>We also make smaller pieces such as <strong>headboards and serving boards</strong>, ideal as gifts or to start enjoying resin at home.</p>
<p>And for floors, we apply <strong>epoxy coatings</strong> that dress entire rooms with continuous, visibly seamless designs.</p>`
      }
    ],
    faqs: [
      { question: "Do you only make river tables?", answer: "No. Beyond tables, we make bars, kitchen islands, consoles, benches, shelves, headboards, serving boards and epoxy floors." },
      { question: "Is furniture made to measure?", answer: "Yes. Each piece is designed with you: measurements, wood and resin color according to the space where it will live." },
      { question: "How do I start my project?", answer: "Tell us your idea on WhatsApp, with measurements and photos of the space if you have them, and we will help you shape it." }
    ],
    relatedSlugs: ["epoxy-resin-furniture-guide", "epoxy-floors-for-businesses", "types-of-epoxy-resin"],
    ctaText: "Tell us your idea and we will help you shape it",
    ctaLink: "/contact"
  },
  {
    slug: "la-resina-es-arte",
    locale: "en",
    title: "Resin is art: color and encapsulated objects",
    metaTitle: "Epoxy resin is art | SobrePoxi",
    metaDescription: "Epoxy resin is born from mixing resin and hardener; it takes pigment and encapsulates sand, shells or stones. Video included.",
    keywords: "epoxy resin art, epoxy resin pigments, resin encapsulations sand shells stones",
    heroTitle: "Resin is art",
    heroSubtitle: "Color and encapsulated objects in each piece",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readingTime: "3 min",
    category: "Learn",
    categorySlug: "learn",
    video: buildGuideVideo("la-resina-es-arte", "en"),
    sections: [
      {
        heading: "Two components becoming one",
        content: `<p>Epoxy resin is formed by mixing two components: <strong>the resin and the hardener</strong>. Once combined, the mixture hardens into a solid, translucent surface.</p>
<p>That transformation —from liquid to solid— is what makes it possible to create channels, encapsulations and continuous surfaces that wood alone could not achieve.</p>`
      },
      {
        heading: "The color: pigments",
        content: `<p>Before hardening, the mixture is colored with <strong>pigments</strong>. The tones we work with are <strong>turquoise, deep blue, sky blue, black and coral</strong>.</p>
<p>The pigment spreads through the resin leaving veins and depths that shift with the light: no channel ever looks the same twice.</p>`
      },
      {
        heading: "Encapsulations: sand, shells and stones",
        content: `<p>Inside the resin, elements such as <strong>sand, shells or stones</strong> can be <strong>encapsulated</strong>, staying visible inside the piece, suspended in the channel.</p>
<p>That combination of color and encapsulated objects is what turns each piece of furniture into art: wood, color and memory in a single surface.</p>`
      }
    ],
    faqs: [
      { question: "What is epoxy resin made of?", answer: "It is formed by mixing two components, the resin and the hardener, which once combined harden into a solid, translucent surface." },
      { question: "Which colors can be achieved?", answer: "With pigments, tones such as turquoise, deep blue, sky blue, black and coral are achieved, with veins and depths that shift with the light." },
      { question: "Which objects can be encapsulated?", answer: "Elements such as sand, shells or stones, which stay visible and suspended inside the resin channel." }
    ],
    relatedSlugs: ["types-of-epoxy-resin", "epoxy-resin-furniture-guide", "epoxy-floor-design-trends"],
    ctaText: "Want a piece with your story inside? Let's talk",
    ctaLink: "/contact"
  }
];

const allGuides = [...guidesES, ...guidesEN];

export function getGuides(locale: "es" | "en"): Guide[] {
  return allGuides.filter(g => g.locale === locale);
}

export function getGuideBySlug(slug: string, locale: "es" | "en"): Guide | undefined {
  return allGuides.find(g => g.slug === slug && g.locale === locale);
}

export function getAllGuideSlugs(): { slug: string; locale: "es" | "en" }[] {
  return allGuides.map(({ slug, locale }) => ({ slug, locale }));
}

export function getGuidesByCategory(categorySlug: string, locale: "es" | "en"): Guide[] {
  return allGuides.filter(g => g.categorySlug === categorySlug && g.locale === locale);
}

export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedSlugs
    .map(slug => getGuideBySlug(slug, guide.locale))
    .filter((g): g is Guide => g !== undefined);
}

export function getGuideCategories(locale: "es" | "en"): { name: string; slug: string; count: number }[] {
  const guides = getGuides(locale);
  const categories: Record<string, { name: string; slug: string; count: number }> = {};
  for (const g of guides) {
    if (!categories[g.categorySlug]) {
      categories[g.categorySlug] = { name: g.category, slug: g.categorySlug, count: 0 };
    }
    categories[g.categorySlug].count++;
  }
  return Object.values(categories);
}