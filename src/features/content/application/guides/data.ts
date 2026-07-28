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
      { question: "¿La resina epóxica es tóxica?", answer: "Durante la aplicación puede emitir vapores irritantes y se deben usar equipos de protección (guantes, mascarilla, gafas). Una vez curada completamente (48-72 horas), es inerte y segura para contacto con alimentos en formulaciones certificadas." },
      { question: "¿Cuánto tarda en curar la resina epóxica?", answer: "Depende de la formulación: las de pisos curan al tacto en 12-24 horas y completamente en 5-7 días. Las de muebles (deep pour) pueden tardar 48-72 horas al tacto. La temperatura y humedad afectan el tiempo de curado." },
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
    metaDescription: "Descubre cuánto cuesta un piso epóxico en Costa Rica en 2026. Precios por metro cuadrado según tipo (sólido, metálico, escamas), comparativa y factores que afectan el costo.",
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
        content: `<p>El precio de un piso epóxico en Costa Rica depende del sistema elegido, el área a cubrir y el estado del concreto existente. Estos son los rangos típicos del mercado costarricense en 2026, <strong>incluyendo materiales y mano de obra profesional</strong>:</p>
<ul>
<li><strong>Sistema básico (epóxico sólido monocapa):</strong> Desde ₡8,000 a ₡12,000 por m²</li>
<li><strong>Sistema con escamas (flake):</strong> Desde ₡12,000 a ₡18,000 por m²</li>
<li><strong>Sistema tricapa premium:</strong> Desde ₡18,000 a ₡28,000 por m²</li>
<li><strong>Epóxico metálico decorativo:</strong> Desde ₡22,000 a ₡38,000 por m²</li>
<li><strong>Sistema industrial de alto tráfico:</strong> Desde ₡15,000 a ₡30,000 por m²</li>
</ul>
<p>Estos precios son referenciales para proyectos desde 30 m². Para áreas menores, el costo por m² suele ser mayor por los costos fijos de movilización y preparación.</p>`
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
<li><strong>Garantía escrita:</strong> Mínimo 2 años en instalación profesional seria</li>
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
<tr><td>Piso epóxico profesional</td><td>₡8,000 - ₡38,000</td><td>15-20 años</td><td>Mínimo (limpieza húmeda)</td></tr>
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
<p><strong>Advertencia:</strong> Huye de ofertas que parecen demasiado buenas. Un piso epóxico "desde ₡4,000/m²" casi siempre significa materiales de ferretería comercial y sin preparación del sustrato. Durará meses, no años.</p>`
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
      { question: "¿Cuál es el precio del metro cuadrado de piso epóxico en Costa Rica?", answer: "En 2026, el precio por metro cuadrado de piso epóxico en Costa Rica varía entre ₡8,000 y ₡38,000 CRC, incluyendo materiales y mano de obra. El rango exacto depende del sistema elegido: desde el epóxico sólido básico hasta los pisos metálicos decorativos de alta gama." },
      { question: "¿El precio del piso epóxico incluye garantía?", answer: "Las instalaciones profesionales serias en Costa Rica incluyen garantía escrita de mínimo 2 años. Si un proveedor no ofrece garantía o sus precios son muy bajos, es una señal de alarma sobre la calidad de los materiales y la preparación." },
      { question: "¿Cuánto cuesta un piso epóxico para una cochera de 2 carros?", answer: "Para una cochera estándar de 2 vehículos (aproximadamente 30-35 m²), un sistema de epóxico con escamas de calidad profesional cuesta entre ₡400,000 y ₡650,000 CRC total, incluyendo preparación, materiales, mano de obra y garantía." },
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
        content: `<p>El costo total de un piso epóxico para cochera depende principalmente del tamaño del área. Estos son presupuestos estimados en Costa Rica 2026 para el <strong>sistema más popular (epóxico con escamas)</strong>, incluyendo preparación, materiales, mano de obra y topcoat protector:</p>
<table>
<thead><tr><th>Tamaño de cochera</th><th>Superficie aprox.</th><th>Precio total estimado</th></tr></thead>
<tbody>
<tr><td>Cochera 1 vehículo</td><td>15-20 m²</td><td>₡220,000 - ₡360,000</td></tr>
<tr><td>Cochera 2 vehículos</td><td>30-35 m²</td><td>₡400,000 - ₡650,000</td></tr>
<tr><td>Cochera 3 vehículos</td><td>45-55 m²</td><td>₡580,000 - ₡990,000</td></tr>
<tr><td>Cochera doble con bodega</td><td>50-70 m²</td><td>₡650,000 - ₡1,260,000</td></tr>
</tbody>
</table>
<p>Estos precios son referenciales. Una visita técnica es necesaria para un presupuesto exacto según el estado de tu concreto.</p>`
      },
      {
        heading: "Comparativa de sistemas para cochera",
        content: `<p>No todos los pisos epóxicos para cochera son iguales. Estos son los tres sistemas más comunes, ordenados por precio y durabilidad:</p>
<h3>1. Epóxico sólido monocapa (económico)</h3>
<p><strong>Precio:</strong> ₡8,000 - ₡12,000 por m²</p>
<p>Una sola capa de epóxico sólido color. Es la opción más económica pero tiene menor resistencia a la abrasión de neumáticos y muestra más el desgaste con el tiempo. Adecuado para cocheras de uso liviano.</p>
<h3>2. Epóxico con escamas (estándar)</h3>
<p><strong>Precio:</strong> ₡12,000 - ₡18,000 por m²</p>
<p>El sistema más popular para cocheras. Combina epóxico con escamas decorativas de vinilo que aportan estética tipo granito, textura antideslizante y ocultan mejor el desgaste. Recomendado para uso residencial estándar.</p>
<h3>3. Sistema tricapa con topcoat poliaspártico (premium)</h3>
<p><strong>Precio:</strong> ₡18,000 - ₡28,000 por m²</p>
<p>Sistema completo con primer, cuerpo con escamas y capa final de poliaspártico de alta resistencia UV. Es la opción más durable (20+ años) y la que mejor resiste el sol directo en cocheras con entrada de luz.</p>`
      },
      {
        heading: "Costos adicionales a considerar",
        content: `<p>Algunos presupuestos baratos no incluyen costos que después aparecen. Asegúrate de que tu cotización contemple:</p>
<ul>
<li><strong>Reparación de grietas existentes:</strong> ₡3,000 - ₡8,000 por metro lineal de grieta (si tu concreto tiene fisuras)</li>
<li><strong>Nivelación de losas irregulares:</strong> ₡2,000 - ₡5,000 por m² adicional si hay desniveles pronunciados</li>
<li><strong>Tratamiento de manchas de aceite:</strong> ₡1,500 - ₡3,000 por m² si hay derrames antiguos de aceite que requieren remoción química</li>
<li><strong>Demarcación de puestos:</strong> ₡8,000 - ₡15,000 por línea amarilla de demarcación (opcional)</li>
<li><strong>Garantía extendida:</strong> Algunos contratistas cobran extra por garantías de 5+ años</li>
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
<p>Considerando que una cochera de 2 vehículos cuesta entre ₡400,000 y ₡650,000, y dura 20 años, el costo amortizado es de apenas ₡1,600 - ₡2,700 mensuales. Una inversión inteligente.</p>`
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
    metaDescription: "Descubre cuánto cuesta una mesa de resina epóxica o mesa río en Costa Rica en 2026. Precios según tipo, tamaño, madera y diseño. Cotización personalizada.",
    keywords: "precio mesa resina epóxica, costo mesa río, precio mesa epoxi Costa Rica, mesa centro resina precio, cuánto cuesta mesa río CR, mesa madera resina precio",
    heroTitle: "Precio de Mesas de Resina Epóxica",
    heroSubtitle: "Cuánto cuestan las mesas río y de resina en Costa Rica 2026: factores y rangos honestos",
    publishedDate: "2026-07-27",
    updatedDate: "2026-07-27",
    readingTime: "7 min",
    category: "Precios y Costos",
    categorySlug: "precios",
    sections: [
      {
        heading: "Rangos de precios según tipo de mesa",
        content: `<p>El precio de una mesa de resina epóxica varía enormemente según el tipo, tamaño y madera utilizada. Estos son los rangos típicos del mercado costarricense e internacional en 2026:</p>
<table>
<thead><tr><th>Tipo de mesa</th><th>Tamaño típico</th><th>Rango de precio</th></tr></thead>
<tbody>
<tr><td>Mesa de centro pequeña</td><td>80-100 cm</td><td>₡150,000 - ₡450,000</td></tr>
<tr><td>Mesa de centro mediana</td><td>100-140 cm</td><td>₡350,000 - ₡800,000</td></tr>
<tr><td>Mesa de comedor río (6 personas)</td><td>180-200 cm</td><td>₡650,000 - ₡1,800,000</td></tr>
<tr><td>Mesa de comedor río (8-10 personas)</td><td>220-280 cm</td><td>₡1,200,000 - ₡3,500,000</td></tr>
<tr><td>Barra/mostrador con resina</td><td>variable</td><td>₡400,000 - ₡1,500,000</td></tr>
<tr><td>Tabla decorativa/arte</td><td>pequeña</td><td>₡40,000 - ₡180,000</td></tr>
</tbody>
</table>
<p>Para referencia, en el mercado internacional las mesas río de lujo cuestan entre $864 y $6,300 USD según portales como ThunderWood Studio y KazanaHome.</p>`
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
<li><strong>Tiempo de fabricación:</strong> Una mesa río de calidad toma entre 3 y 6 semanas, lo que se refleja en el precio</li>
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
<li><strong>Revalorización:</strong> A diferencia de muebles en serie que pierden valor, las piezas artesanales de resina bien mantenidas se revalorizan con el tiempo</li>
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
      { question: "¿Cuánto cuesta una mesa río en Costa Rica?", answer: "Una mesa río de comedor para 6 personas cuesta entre ₡650,000 y ₡1,800,000 CRC en Costa Rica, dependiendo del tipo de madera, tamaño y diseño. Las mesas de centro de resina empiezan desde ₡150,000." },
      { question: "¿Por qué las mesas de resina son tan caras?", answer: "Porque son piezas únicas artesanales. Cada mesa requiere: selección de madera con borde vivo, construcción de molde a medida, vertido de resina premium en múltiples capas, curado controlado de 48-72 horas y lijado progresivo desde grano 80 hasta 3000. El proceso completo toma 3-6 semanas." },
      { question: "¿Vale la pena invertir en una mesa de resina?", answer: "Sí, si buscas una pieza única y duradera. A diferencia de muebles en serie que se reemplazan cada pocos años, una mesa de resina bien hecha dura décadas y se revaloriza. Es arte funcional, no solo un mueble." },
      { question: "¿Hacen envíos las mesas de resina dentro de Costa Rica?", answer: "Sí, en SobrePoxi entregamos e instalamos en todo el país. El costo de envío varía según la zona. Las mesas grandes requieren embalaje especial para protección." }
    ],
    relatedSlugs: ["muebles-resina-epoxica-guia", "tipos-de-resina-epoxica", "precios-pisos-epoxicos-costa-rica"],
    ctaText: "¿Sueñas con tu propia mesa de resina? Cuéntanos tu idea y te damos presupuesto",
    ctaLink: "/contact"
  },
  {
    slug: "costo-piso-epoxico-metro-cuadrado",
    locale: "es",
    title: "Costo de Piso Epóxico por Metro Cuadrado: Desglose Detallado 2026",
    metaTitle: "Costo Piso Epóxico por m² 2026 | Desglose Detallado | SobrePoxi",
    metaDescription: "Análisis detallado del costo de piso epóxico por metro cuadrado en Costa Rica. Qué incluye cada precio, comparativa de sistemas y cómo calcular tu presupuesto.",
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
        heading: "Precios por m² según sistema en Costa Rica",
        content: `<p>El precio por metro cuadrado varía significativamente según el sistema epóxico elegido. Estos son los rangos del mercado costarricense en 2026, <strong>incluyendo materiales y mano de obra profesional</strong>:</p>
<table>
<thead><tr><th>Sistema</th><th>Precio por m² (CRC)</th><th>Uso recomendado</th></tr></thead>
<tbody>
<tr><td>Epóxico sólido monocapa</td><td>₡8,000 - ₡12,000</td><td>Bodegas, áreas de bajo tráfico</td></tr>
<tr><td>Epóxico bicapa con escamas</td><td>₡12,000 - ₡18,000</td><td>Cocheras residenciales, talleres</td></tr>
<tr><td>Sistema tricapa con topcoat UV</td><td>₡18,000 - ₡28,000</td><td>Cocheras premium, patios, terrazas</td></tr>
<tr><td>Epóxico metálico decorativo</td><td>₡22,000 - ₡38,000</td><td>Interiores residenciales, comercios</td></tr>
<tr><td>Sistema industrial antideslizante</td><td>₡15,000 - ₡30,000</td><td>Industria, cocinas, zonas húmedas</td></tr>
<tr><td>Sistema conductivo/ESD</td><td>₡25,000 - ₡45,000</td><td>Electrónica, laboratorios</td></tr>
</tbody>
</table>`
      },
      {
        heading: "Desglose del precio: ¿en qué se va tu dinero?",
        content: `<p>Para entender por qué un m² de piso epóxico cuesta lo que cuesta, este es el desglose aproximado de un sistema estándar de ₡15,000/m²:</p>
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
        content: `<p>Para estimar el costo de tu proyecto, sigue este cálculo paso a paso:</p>
<ol>
<li><strong>Mide el área:</strong> Largo × ancho = metros cuadrados totales. Para áreas irregulares, divide en rectángulos</li>
<li><strong>Elige el sistema:</strong> Según uso (ver tabla anterior). Para cochera residencial: bicapa con escamas (₡15,000/m² promedio)</li>
<li><strong>Multiplica:</strong> Área × precio por m² = subtotal</li>
<li><strong>Suma costos adicionales:</strong> Reparación de grietas, nivelación, demarcación (si aplica)</li>
<li><strong>Considera IVA:</strong> En Costa Rica, los servicios profesionales incluyen 13% de IVA</li>
</ol>
<p><strong>Ejemplo:</strong> Cochera de 32 m² con sistema bicapa escamas (₡15,000/m²)</p>
<ul>
<li>Subtotal: 32 × ₡15,000 = ₡480,000</li>
<li>Reparación de grietas (10m lineales): + ₡50,000</li>
<li>Subtotal: ₡530,000</li>
<li>IVA (13%): + ₡68,900</li>
<li><strong>Total estimado: ₡598,900</strong></li>
</ul>`
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
        content: `<p>Para contexto, esto es lo que cuesta el metro cuadrado de piso epóxico en otros mercados (2026):</p>
<table>
<thead><tr><th>País</th><th>Precio básico (m²)</th><th>Precio premium (m²)</th></tr></thead>
<tbody>
<tr><td>Costa Rica</td><td>₡8,000 (~$16 USD)</td><td>₡38,000 (~$76 USD)</td></tr>
<tr><td>España</td><td>15€ (~₡11,000)</td><td>150€ (~₡110,000)</td></tr>
<tr><td>México</td><td>$315 MXN (~₡9,000)</td><td>$590 MXN (~₡17,000)</td></tr>
<tr><td>EE.UU.</td><td>$3 USD (~₡15,000)</td><td>$12 USD (~₡60,000)</td></tr>
</tbody>
</table>
<p>Costa Rica tiene precios competitivos a nivel internacional, especialmente comparado con mercados europeos premium.</p>`
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
      { question: "¿Cuál es el costo promedio por metro cuadrado de piso epóxico en Costa Rica?", answer: "El costo promedio por metro cuadrado de piso epóxico en Costa Rica en 2026 es de ₡15,000 CRC (aproximadamente $30 USD), para un sistema estándar de calidad profesional. Los sistemas más básicos empiezan en ₡8,000/m² y los premium llegan a ₡38,000/m²." },
      { question: "¿El precio por m² incluye IVA?", answer: "Depende del proveedor. En Costa Rica el IVA es del 13%. Siempre pregunta si el precio cotizado incluye IVA o es antes de impuestos. En SobrePoxi cotizamos con IVA incluido para evitar sorpresas." },
      { question: "¿Hay costo mínimo de proyecto?", answer: "Sí, la mayoría de instaladores profesionales tienen un costo mínimo de proyecto porque hay costos fijos (movilización, equipo, preparación) que no dependen del área. Típicamente el mínimo es de 15-20 m² o un monto mínimo de ₡150,000-₡200,000." },
      { question: "¿El precio incluye la visita técnica de evaluación?", answer: "En SobrePoxi la visita técnica en el Gran Área Metropolitana es gratuita. Algunos proveedores cobran la visita (₡15,000-₡30,000) pero la descuentan del total si contratas. Siempre aclara este punto antes." }
    ],
    relatedSlugs: ["precios-pisos-epoxicos-costa-rica", "cuanto-cuesta-piso-epoxico-cochera", "tipos-de-resina-epoxica"],
    ctaText: "¿Quieres calcular el costo exacto de tu proyecto? Pídenos cotización detallada",
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
      { question: "Is epoxy resin toxic?", answer: "During application it may emit irritating vapors and protective equipment should be used (gloves, mask, goggles). Once fully cured (48-72 hours), it is inert and safe for food contact in certified formulations." },
      { question: "How long does epoxy resin take to cure?", answer: "It depends on the formulation: floor resins cure to the touch in 12-24 hours and completely in 5-7 days. Furniture resins (deep pour) may take 48-72 hours to the touch. Temperature and humidity affect curing time." },
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
<li><strong>Curing:</strong> 48-72 hours of curing controlling temperature and humidity</li>
<li><strong>Demolding and cutting:</strong> Removed from the mold and cut to final dimensions</li>
<li><strong>Progressive sanding:</strong> From grit 80 to 3000 to achieve crystal transparency</li>
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
<li><strong>Long-term investment:</strong> Well-made resin furniture maintains and even increases its value over time</li>
</ul>`
      }
    ],
    faqs: [
      { question: "How much does a river table cost?", answer: "The price varies according to size, wood type and design complexity. Coffee tables start in an accessible range, while large dining tables represent a greater investment. Request a quote for your specific project." },
      { question: "Does resin on tables turn yellow?", answer: "The professional quality resins we use at SobrePoxi include UV stabilizers that minimize yellowing. Additionally, we apply protective UV topcoats to maintain transparency for years." },
      { question: "Can a river table be used as a daily dining table?", answer: "Yes. With the appropriate protective finish, a river table is completely functional for daily use. It resists moderate heat, stains and moisture. We recommend using coasters for very hot drinks." },
      { question: "How long does it take to make a river table?", answer: "Depending on size and complexity, the complete process takes between 3 and 6 weeks: wood selection, preparation, pouring, curing, sanding and finishing." }
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