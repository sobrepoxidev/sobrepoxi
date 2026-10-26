# Plan estratégico SEO — sobrepoxi.com

**Fecha:** 2026-10-26
**Base de datos:** Search Console, 12 meses (2025-10-25 → 2026-10-24, búsqueda web basada en texto), export en `docs/sobrepoxi.com-Performance-on-Search-2026-10-26/`. Umami (`ticacode1`) para los últimos 6 días. HTML servido en vivo como Googlebot.
**Horizonte:** 90 días de ejecución, revisión a 30/60/90.
**Documento previo:** [`SEO-2026-10-26-DIAGNOSTICO-TRAFICO.md`](./SEO-2026-10-26-DIAGNOSTICO-TRAFICO.md). Este plan **corrige** cuatro de sus conclusiones (ver §1.4).

---

## 0. La decisión en una página

**El sitio ya ganó la consulta para la que fue construido y está perdiendo la consulta más grande que tiene al lado. No necesita más URLs: necesita que la demanda existente aterrice en la página correcta y que esa página enlace al resto.**

Tres números que ordenan todo lo demás:

| # | Medición | Qué significa |
|---|---|---|
| 1 | **Una URL hace el 64 % de los clics** (`/es/epoxy-floors`: 1.541 de 2.405) y **solo enlaza a 1 página desde su contenido** | El activo principal es también el cuello de botella del clúster |
| 2 | **5.883 impresiones de «resina epóxica» están en posición 5,8–6,7 con CTR 1,6–4,9 %**, mientras la página creada para responderlas (`/es/resina-epoxica-para-pisos`) tiene **0 impresiones en 12 meses** | Hay una página huérfana de 15 días parada encima de la familia de consultas con más volumen |
| 3 | **El 64 % de las URLs del sitemap no registra ni una impresión** (≈68 de 138) | La estrategia de «más páginas» ya se agotó. El retorno está en las 10 que importan |

**Las cinco apuestas, en orden de retorno esperado por hora invertida:**

1. **Meter la landing de resina en el índice y en el grafo** (§4.1) — +150 a +300 clics/año.
2. **Convertir `/es/epoxy-floors` en el hub del clúster** (§4.2) — +300 a +600 clics/año.
3. **Convertir el precio autorizado en una respuesta explícita** (§4.3) — +80 a +180 clics/año, y sube la conversión.
4. **Higiene técnica: soft 404s, sitemap y datos estructurados** (§4.6) — +30 a +80 clics/año y saca riesgo.
5. **Proyectos reales + Google Business Profile** (§4.5) — +80 a +200 clics/año y es la única fuente de autoridad local que el sitio no tiene.

**Rango total modelado: +670 a +1.430 clics orgánicos/año** (de 2.368 a 3.040–3.800, **+28 % a +60 %**), con el 90 % del incremento en Costa Rica. Es un modelo con supuestos explícitos (§7), no una promesa.

**Las dos cosas que este plan NO hará:** más guías de muebles y más páginas de ciudad. Los datos las descartan (§6).

---

## 1. Qué dicen los datos (y en qué corrigen al diagnóstico)

### 1.1 Totales de 12 meses

| Métrica | Valor |
|---|---:|
| Clics | 2.368 |
| Impresiones | 50.645 |
| CTR | 4,68 % |
| Posición media | 5,4 |
| Clics desde Costa Rica | 2.150 (90,8 %) |
| Impresiones desde Costa Rica | 32.403 (64,0 %) |
| CTR Costa Rica | 6,64 % (posición 5,52) |
| Móvil | 1.871 clics / 39.422 impr. (77,8 %) — posición 5,16 |
| Fragmentos de productos | 1 clic / 55 impresiones — posición 7,56 |

**El sitio está creciendo, y rápido.** Impresiones diarias: ~30 en oct-2025 → ~300 en oct-2026 (10×). Clics diarios: 1–2 → 10–25 (últimos 30 días: ~350–450 clics/mes). El salto de impresiones se acelera desde agosto 2026. **Esto es una restricción de diseño del plan: no se migra ninguna URL que ya rankea. El riesgo de romper la inercia supera cualquier mejora cosmética.**

### 1.2 La concentración

Sobre el export de Páginas (2.405 clics atribuidos; la diferencia con 2.368 es agregación de la exportación, no un error):

| Top | Clics acumulados | % | Impresiones | % |
|---|---:|---:|---:|---:|
| 1 URL | 1.541 | 64,1 % | 22.898 | 41,2 % |
| 2 URLs | 2.057 | 85,5 % | 33.291 | 59,9 % |
| 3 URLs | 2.173 | 90,4 % | 35.614 | 64,1 % |
| 10 URLs | 2.330 | 96,9 % | 50.306 | 90,5 % |
| 40 URLs | 2.405 | 100 % | 55.234 | 99,4 % |

- **44 URLs del export tienen 0 clics** y suman 812 impresiones (1,5 %).
- **9 filas del export son URLs de `/_next/image?url=…`** (el optimizador de imágenes), no páginas. Google está registrando esas URLs parametrizadas en lugar de las imágenes fuente.
- **≈68 de las 138 URLs del sitemap no aparecen en el export**: cero impresiones en 12 meses.

La cola larga del sitio no es larga: está vacía. Cualquier plan que consista en publicar más páginas parte de una premisa falsa.

### 1.3 La curva posición → CTR, medida en su propio sitio

| Query / conjunto | Impresiones | Clics | CTR | Posición |
|---|---:|---:|---:|---:|
| «piso(s) epóxico(s) + costa rica» (4 consultas exactas) | 1.847 | 330 | **17,87 %** | 3,19 |
| «pisos de resina epóxica costa rica» | 244 | 45 | 18,44 % | 2,14 |
| «piso epóxico precio m2 costa rica» | 238 | 35 | 14,71 % | 1,89 |
| Guía de precios de pisos | 2.323 | 116 | 4,99 % | 4,25 |
| Agregado Costa Rica | 32.403 | 2.150 | 6,64 % | 5,52 |
| «resina epóxica + costa rica» (14 consultas) | 2.932 | 144 | 4,91 % | 6,72 |
| «resina epóxica» genérico (183 consultas) | 2.951 | 47 | 1,59 % | 5,80 |
| «piso epóxico» genérico (103 consultas) | 3.209 | 39 | 1,22 % | 6,33 |

La curva es brutal entre posición 3 y 6,5. **Un movimiento de 1,5 posiciones en el rango 5,5 → 4,0 multiplica el CTR por ~1,8.** Ese es el motor de casi todo el upside del plan, y por eso los pilares 1 y 2 valen más que los otros cuatro juntos.

### 1.4 Correcciones al diagnóstico del 26-oct

| Lo que decía el diagnóstico | Lo que dicen los datos | Consecuencia |
|---|---|---|
| «No es un problema de cantidad de contenido» | Correcto, pero incompleto: es un problema de **enlazado y de dueño de consulta**. `/es/epoxy-floors` (22.898 impr., 65 % de los clics) **solo enlaza a 1 página desde su contenido**: `/es/resina-epoxica-para-pisos#calculadora`. Ni una guía, ni una provincia, ni un producto, ni la landing industrial. | El pilar 2 es más importante de lo que el diagnóstico sugería |
| «El cluster de muebles está muerto en search… 0 demanda» | **Hay demanda, es chica y el sitio la pierde.** 1.248 impresiones en consultas de muebles/mesas en 12 meses (≈104/mes) **en posición 5,02 con CTR 1,84 %**. Está justo en el umbral que el propio diagnóstico fijó («<100 impresiones/mes = no hay demanda»), pero del lado equivocado. | No se construye un clúster de muebles; se hace una reparación de 3 horas (§4.7) |
| «Las landings por provincia son una fortaleza del clúster de pisos» | **No hay demanda municipal en Costa Rica.** Las 5 landings juntas suman **283 impresiones en 12 meses**. San José, la provincia más grande: 91. Consultas con ciudad en el top 1.000: **5, con 10 impresiones totales.** | No se crean Puntarenas ni Limón. La demanda es nacional |
| «Search Console: no hay export en el repo» | Ahora hay uno, y **invierte la prioridad**: la familia «resina epóxica» (5.883 impr.) supera a «pisos epóxicos» (1.847 impr. exactas + genéricas) | El pilar 1 pasa a ser el primero |

**Lo que el diagnóstico no detectó en absoluto** (verificado en vivo hoy, §9):

1. `/es/guias/<slug-inexistente>` devuelve **HTTP 200** con 7 palabras de texto, título `Página no encontrada | SobrePoxi | SobrePoxi`, **sin `noindex` ni canonical**. Es un soft 404. Uno de esos slugs (`pisos-epoxicos-industriales-bodegas`) tiene **144 impresiones** en GSC.
2. La **vista de lista** de `/es/products` enlaza a `/product/<id-numérico>` (`ProductsPageContent.tsx:343,359,400`). `/es/product/12` devuelve **200 con «Producto no encontrado»**. Enlaces rotos para usuarios reales.
3. El **sitemap pone `lastmod` = ahora** en las 138 URLs (verificado: `2026-10-26T07:26:39` en todas) y **no incluye ni una imagen**. Google descarta el `lastmod` cuando no es verosímil.
4. **Todo el sitio es dinámico**: el `Navbar` del layout llama `cookies()`, así que ninguna página puede ser estática ni cachearse. TTFB medido: **0,47 s en caliente, 1,10 s en frío**. Sin `Cache-Control` para HTML.
5. `floorPricing.ts:31-76`: **los 4 acabados tienen exactamente el mismo rango ₡75.000–₡96.100/m²**. El sitio promete una tabla de precios por acabado y en realidad publica un precio único disfrazado de cuatro.
6. **Cero consultas de marca** en las 1.000 principales. El 100 % del tráfico es no-marca: cada clic hay que ganarlo de nuevo.
7. **La página que hace el 64 % de los clics no publica un solo precio.** `/es/epoxy-floors` no contiene la letra ₡ en su código, aunque su FAQ dice responder «¿Cuánto cuesta un piso epóxico en Costa Rica?» — y responde con un «depende» sin cifra. La referencia **sí está autorizada** (₡75.000–₡96.100/m², 5 mm, IVA incluido, regla del dueño D-1198 del 7-oct): el problema no era falta de autorización, era que nadie la había puesto en la página.
8. **Tres de las siete fichas de piso son la misma pieza duplicada.** `black-sparkle-epoxy-floor`, `black-sparkle-epoxy-floor-interiors` y `black-sparkle-epoxy-floor-category` comparten nombre («Piso Epóxico Negro Sparkle») y compiten por la misma consulta. Las tres están en el sitemap. Eso ayuda a explicar por qué la ficha aparece en posición 1,07 con 0,31 % de CTR: Google no sabe cuál de las tres mostrar.

---

## 2. La tesis: tres desajustes

### Desajuste 1 — La página dueña de la consulta no es la página que responde

Google está resolviendo «resina epóxica» (5.883 impresiones/año) con **la home y `/es/epoxy-floors`**, que hablan de *pisos epóxicos*, y las deja en posición 5,8–6,7 con CTR 1,6–4,9 %. La página que sí responde —`/es/resina-epoxica-para-pisos`, título «Resina epóxica para pisos en Costa Rica: precios y calculadora», ₡ publicados, calculadora, `AggregateOffer` en CRC— **se desplegó el 2026-10-11 y no ha registrado una sola impresión**. No está huérfana por falta de calidad: está huérfana porque nadie la enlaza (1 enlace entrante, desde la calculadora de `/es/epoxy-floors`) y nadie pidió su indexación.

### Desajuste 2 — El sitio se mide con impresiones que no puede convertir

- **36 % de las impresiones (18.242) vienen de países donde el negocio no opera**: EE. UU. 4.563, México 5.192, Venezuela 551, Guatemala 267, Ecuador 262, Honduras 234… Con **218 clics y CTR 1,2 %**. No son una oportunidad: son ruido estructural.
- **~12.400 impresiones caen en fichas de producto a posición 1–3 con CTR ~0,6 %.** «piso epoxico negro»: **posición 1,07, 325 impresiones, 1 clic (0,31 %)**. «piso de resina epoxica negro»: posición 1,28, 175 impresiones, **0 clics**. Una posición 1 con 0,3 % de CTR no es una SERP de enlaces azules: es una superficie de imagen/inspiración o tráfico internacional irrelevante.

**Consecuencia operativa:** el CTR agregado de 4,68 % no está «roto»; está diluido. El KPI correcto es **clics desde Costa Rica**, y el intento de arreglar las fichas reescribiendo títulos (hecho el 11-oct) no movió el número porque el problema no era el título.

### Desajuste 3 — El grafo tiene forma de isla

Verificado en el HTML servido:

- `/es/epoxy-floors` → **1 enlace de contenido** (`/es/resina-epoxica-para-pisos#calculadora`). Cero a las 8 guías de pisos, cero a las 5 provincias, cero a los 8 productos de piso, cero a la landing industrial.
- `/es/luxury-furniture` → **0 enlaces a sus guías individuales, 0 a sus 19 productos**. Solo `/guias` (el índice).
- Las guías → **se enlazan entre sí** (`relatedSlugs`) pero **su CTA principal va a `/contact`, no a WhatsApp**, y solo las 2 guías de precio enlazan a una landing.
- El **footer** (sitewide) no enlaza a ninguna landing de dinero: solo `/products`, `/about`, `/contact`, `/videos`, legales.

Resultado: la autoridad que entra por `/es/epoxy-floors` no se distribuye. Es un embudo sin brazos.

---

## 3. Mapa de demanda → página dueña

Esta es la tabla que gobierna el contenido. Una consulta, una dueña. Las filas marcadas **⚠** son las que hoy tienen dueña equivocada.

| Familia de consulta | Impr./año | Clics/año | Pos. | Dueña hoy | Dueña objetivo | Acción |
|---|---:|---:|---:|---|---|---|
| piso(s) epóxico(s) + costa rica | 1.847 | 330 | 3,19 | `/es/epoxy-floors` | `/es/epoxy-floors` | **Defender.** No tocar la URL |
| resina epóxica + costa rica | 2.932 | 144 | 6,72 | home + `/es/epoxy-floors` | ⚠ `/es/resina-epoxica-para-pisos` | Pilar 1 |
| precio / costo / cuánto cuesta | 1.258 | 63 | 4,88 | guía de precios | guía de precios + landing resina | Pilar 3 |
| piso epóxico (genérico, sin CR) | 3.209 | 39 | 6,33 | `/es/epoxy-floors` | `/es/epoxy-floors` | Ignorar (internacional) |
| resina epóxica (genérico, sin CR) | 2.951 | 47 | 5,80 | mixto | `/es/resina-epoxica-para-pisos` | Pilar 1 (captura de rebote) |
| muebles / mesas / resina+madera | 1.248 | 23 | 5,02 | `/es/luxury-furniture` | `/es/luxury-furniture` | Reparación de 3 h (§4.7) |
| diseño / tendencias / 3D / colores | 1.011 | 8 | 6,47 | guía de diseños + fichas | — | Ignorar (intención de imagen) |
| industrial / cochera / bodega | 162 | 1 | **34,28** | guía industrial | ⚠ `/es/industrial-epoxy-flooring` | Pilar 4 |
| porcelanato / granito / mármol líquido | 89 | 7 | 7,24 | landing resina | `/es/resina-epoxica-para-pisos` | Cubierto por Pilar 1 |
| arena / pintura / recubrimiento | 372 | 14 | 7,96 | guías | — | Ignorar (intención de material, no de servicio) |

**Regla de oro derivada de la tabla:** ninguna consulta nueva merece una URL nueva hasta que estas diez filas tengan su dueña correcta y enlazada.

---

## 4. Los seis pilares

Cada pilar: problema → evidencia → cambio exacto → impacto esperado → verificación.

### 4.1 — Pilar 1: Meter la landing de resina en el índice y en el grafo

**Problema.** La página que responde la familia de consultas más grande del sitio no existe para Google.

**Evidencia.**
- `/es/resina-epoxica-para-pisos` está en el sitemap con prioridad 0,9 (`src/app/sitemap.ts:73`), devuelve 200, tiene canonical propio, `index, follow`, hreflang correcto y `AggregateOffer` en CRC.
- **No aparece en el export de Páginas de GSC**: 0 impresiones en 12 meses.
- Desplegada el 2026-10-11 (`feat(seo): landing resina epoxica para pisos con calculadora`).
- Recibe **1 enlace interno** de contenido: desde `/es/epoxy-floors:630` (`/resina-epoxica-para-pisos#calculadora`).

**Cambios.**
1. Enlazarla desde donde pertenece, con anchor descriptivo y en el cuerpo (no solo footer):
   - `/es/epoxy-floors` — bloque «¿Buscas resina epóxica?» justo después del hero y antes de la galería.
   - `/es/industrial-epoxy-flooring` — enlace a la calculadora de precio.
   - Las **4 guías de pisos informativas** (`tipos-de-resina-epoxica`, `mantenimiento-pisos-epoxicos`, `pisos-epoxicos-modernos-para-interiores`, `pisos-epoxicos-para-cocheras`): bloque «precio y calculadora» al cierre, además del CTA a WhatsApp.
   - Las **5 landings de provincia** (`CityEpoxyPage.tsx:487-501`, `SanJoseEpoxyPage.tsx`): enlace a la calculadora nacional.
2. En GSC → Inspección de URL → **Solicitar indexación** de `/es/resina-epoxica-para-pisos` (a mano, una vez).
3. Alinear el `<title>` con la consulta exacta dominante. Hoy: «Resina epóxica para pisos en Costa Rica: precios y calculadora». Cubre «resina epoxica costa rica» y «resina epoxica para pisos». Mantener; no reescribir antes de medir.
4. Añadir en la landing un bloque de 150–200 palabras que responda literalmente «¿Cuánto cuesta la resina epóxica para pisos en Costa Rica?» con el rango y qué lo mueve (m², estado del sustrato, espesor). Hoy la landing explica el servicio pero la respuesta de precio vive en la guía.

**Impacto esperado.** Familia CR: 2.932 impr., 144 clics hoy (4,91 %). Si la dueña correcta llega a posición 4,0–4,5 con CTR 9–12 %: 264–352 clics. **+120 a +210 clics/año netos** (descontando canibalización con home y `/es/epoxy-floors`). Plazo realista: 30–60 días tras la indexación.

**Verificación.** En 30 días, `/es/resina-epoxica-para-pisos` con impresiones > 0 y posición media < 12 en GSC; en 60 días, posición < 6.

---

### 4.2 — Pilar 2: Convertir `/es/epoxy-floors` en el hub del clúster

**Problema.** La página que produce el 65 % de los clics del sitio no transfiere autoridad a nada. Su clúster está desconectado.

**Evidencia.** Extracción de `href` sobre el HTML servido de `/es/epoxy-floors`: 13 enlaces `/es/*`, de los cuales **12 son chrome global** (navbar, footer, carrito, legales). El único enlace de contenido es la calculadora. Ni guías, ni provincias, ni productos, ni industrial.

**Cambios** (todo dentro de `EpoxyFloorsPage.tsx`, sin tocar URL, sin tocar el hero):
1. **Bloque «Guías»** (después de la sección de tipos, ~línea 400): 6 tarjetas a las guías de pisos con anchor = título de la guía. Prioridad: `precios-pisos-epoxicos-costa-rica`, `costo-piso-epoxico-metro-cuadrado`, `tipos-de-resina-epoxica`, `pisos-epoxicos-para-cocheras`, `mantenimiento-pisos-epoxicos`, `disenos-pisos-epoxicos-tendencias`.
2. **Bloque «Sistemas industriales»**: tarjeta a `/es/industrial-epoxy-flooring` con anchor «pisos epóxicos industriales para bodegas y plantas».
3. **Bloque «Precios»**: enlace a `/es/resina-epoxica-para-pisos#calculadora` con anchor «calcula el precio por m²» (ya existe el enlace; falta el anchor textual).
4. **Bloque «Piezas»**: 6 fichas de producto de piso (hay 8: `black-sparkle`, `beige-gold`, `piso-epoxico-rojo-magma`, `shell-reef-terrace-floor`…) con enlace a `/es/product/<name>`. Hoy la página muestra 5 imágenes de galería **sin enlace a ninguna ficha**.
5. **Provincias**: no crear más; enlazar las 5 existentes desde un párrafo («instalamos en todo el país: San José, Alajuela, Cartago, Heredia, Guanacaste»). Es enlazado con anchor geográfico sin construir 5 landings nuevas.
6. **Breadcrumb visible** en la parte superior (hoy el `BreadcrumbList` del schema no tiene equivalente en pantalla).

**Por qué funciona.** La página ya está en posición 5,54 con 22.898 impresiones. Con 15–20 enlaces salientes contextuales: (a) Google entiende el clúster y asciende la landing; (b) las guías y fichas reciben autoridad interna y empiezan a rankear; (c) los usuarios tienen un camino distinto de WhatsApp.

**Impacto esperado.** 22.898 impr.; posición 5,54 → 4,3 en 90–120 días; CTR 6,73 % → 9,5 %. **+300 a +600 clics/año**, más el efecto secundario sobre las guías (que hoy suman 4 clics/año fuera de la de precios).

**Verificación.** Posición media de `/es/epoxy-floors` y del conjunto de guías a 30/60/90 días. Si a 60 días la posición no mejoró 0,5, revisar CTR de las nuevas tarjetas antes de añadir más.

**Restricción.** No cambiar el `<title>` ni el H1 de esta página: es la que gana «piso epoxico costa rica» en posición 2,76 con 16,93 % de CTR. Cambiarlos es el único movimiento de este plan que puede destruir valor.

---

### 4.3 — Pilar 3: Convertir el precio autorizado en una respuesta explícita

**La política, primero.** El dueño fijó una referencia única (7-oct-2026, D-1198) y **no hay tabla por sistema que inventar**:

- **₡75.000 – ₡96.100 por m² instalado, IVA incluido**, según acabado y estado actual del piso.
- **Espesor estándar: 5 mm.** La referencia existe porque el mercado costarricense suele instalar 1,5–2 mm.
- **Prohibido** cotizar en dólares y **prohibido multiplicar el rango por el área**, ni siquiera como «aproximado».
- El total exacto lo confirma la visita técnica.

Ninguna recomendación de este plan puede contradecir eso. El pilar no es «publicar más precios»: es **publicar el precio que ya está autorizado, donde hoy no aparece, y construir la autoridad que lo rodea**.

**Problema.** La página que hace el 64 % de los clics no contiene la letra ₡ en su código, y su FAQ responde «¿Cuánto cuesta un piso epóxico en Costa Rica?» con un «depende» sin cifra.

**Evidencia.**
- `grep "₡" src/features/content/presentation/pages/landing/EpoxyFloorsPage.tsx` → **0 resultados**.
- La FAQ de precio decía: «El precio depende del sistema elegido, el área, la condición del concreto…» (sin cifra), y ese texto alimentaba el `FAQPage` que Google lee.
- «piso epóxico precio m2 costa rica»: **posición 1,89 con 14,71 % de CTR**. El sitio ya gana la consulta de precio cuando la responde; el problema es dónde y cuántas veces la responde.
- 146 consultas de precio en el top 1.000, 1.258 impresiones, posición 4,88, CTR 5,01 %.
- `floorPricing.ts:31-76`: los cuatro acabados comparten `75000/96100`. **Eso es correcto según la política** (una sola referencia autorizada), pero la UI lo presenta como si eligieras un precio distinto.
- Las 4 guías de «Precios y Costos» repiten el mismo rango con títulos solapados (`data.ts:673,708,727,742,744,768,773,802,903,916,934,953,967`).
- La calculadora **ya cumple** D-390: muestra solo ₡/m², no multiplica por área (`FloorCalculator.tsx:94-96`). `estimateRange()` en `floorPricing.ts:94` sí multiplica pero **no tiene ningún uso**: es código muerto que hay que borrar para que nadie lo llame.

**Cambios.**
1. **Publicar la referencia en el hero de `/es/epoxy-floors`** — hecho en esta iteración: una línea bajo los CTA con «Sistema estándar de 5 mm · ₡75.000 – ₡96.100 por m² instalado, IVA incluido. El espesor y el total exacto los confirma la visita técnica.» Responde la objeción #1 antes de que la pregunten y no viola ninguna regla. **Ojo con la redacción:** decir «sistema de 5 mm» a secas se lee como si fuera el único espesor que se trabaja. La política dice que es el **estándar**, y el espesor se define por proyecto en la visita — por eso la palabra «estándar» va siempre explícita.
2. **Reescribir la FAQ de precio con la cifra** — hecho: el `FAQPage` que Google lee ahora contiene el rango y la advertencia de que no se multiplica por el área.
3. **Añadir la FAQ de espesor** — hecho: «¿Qué espesor tiene el piso epóxico y por qué importa?» con el argumento 5 mm vs 1,5–2 mm. Es el diferencial más defendible del negocio y ataca consultas que hoy no se cubren («espesor piso epóxico», «cuánto dura un piso epóxico»).
4. **Página de precio única y canónica.** `precios-pisos-epoxicos-costa-rica` (116 clics, 2.323 impr., posición 4,25) queda como canónica con el rango autorizado y la explicación de qué lo mueve. Las otras tres se diferencian por intención, no por cifra:
   - `costo-piso-epoxico-metro-cuadrado` → desglose del m² (material, mano de obra, preparación, sub-piso).
   - `cuanto-cuesta-piso-epoxico-cochera` → cochera: tamaño típico, espesor, acabado recomendado.
   - `precio-mesa-resina-epoxica` → muebles; sale del grupo de pisos (no lleva rango público).
5. **Corregir la UI de la calculadora para que no prometa lo que no hace.** Con una sola referencia autorizada, el selector de acabado no puede cambiar el precio: se etiqueta como «acabado recomendado según el espacio», no como tramo de precio. Honestidad > falsa personalización.
6. **Borrar `estimateRange()`** (`floorPricing.ts:94-96`). Es la función que violaría D-390 si alguien la usara.
7. **Calculadora en `/es/epoxy-floors`.** Es la página con más tráfico y no la tiene. Mejora SEO (herramienta + contenido) y conversión a la vez.
8. **Bloque «qué mueve el precio»** en la landing de resina: estado del concreto, humedad, nivelación, espesor, acceso, área. Contenido real, autorizado, que captura las consultas largas de precio sin inventar una cifra por sistema.

**Impacto esperado.** Cobertura de precio de ~1.258 a ~1.900 impresiones con CTR 9–12 %: **+80 a +180 clics/año**, y son clics de altísima intención (la consulta de precio ya convierte al 14,7 % cuando está arriba). El efecto en conversión es mayor que en tráfico: el precio en el hero filtra curiosos antes de que escriban y sube la calidad de cada conversación de WhatsApp.

**Verificación.** Impresiones y CTR de la familia de precio a 60 días; `calculator_use` / `calculator_send` por página en Umami; y una revisión manual del texto publicado contra la regla D-1198 (una sola cifra, sin USD, sin multiplicar por área).

**Bloqueante.** Ninguno. La referencia está autorizada y ya se publicó. Lo único que sigue requiriendo al dueño es la decisión sobre muebles (§8-D4), que es otro pilar.

---

### 4.4 — Pilar 4: El clúster industrial no existe para Google

**Problema.** El ticket más alto del negocio está en posición 34.

**Evidencia.**
- 28 consultas de intención industrial/cochera/bodega: **162 impresiones, 1 clic, posición media 34,28**.
- `/es/industrial-epoxy-flooring` **no aparece en el export de Páginas**: 0 impresiones.
- La consulta que sí captura algo es la guía `/es/guias/pisos-epoxicos-industriales-bodegas`: 144 impresiones, posición 36,47 — **y ese slug devuelve hoy un soft 404 HTTP 200** (§4.6).

**Cambios.**
1. Verificar que la guía existe en `data.ts`; si no existe, restaurarla o **301** al landing industrial. No puede quedar un soft 404 recibiendo impresiones.
2. Enlazar `/es/industrial-epoxy-flooring` desde `/es/epoxy-floors` (bloque «Sistemas industriales») y desde las guías de cocheras y de negocios, con anchor «piso epóxico industrial».
3. Añadir a la landing: tabla de sistemas (espesor, resistencia química, carga), los dos casos de estudio que ya existen (`IndustrialEpoxyFlooringPage.tsx:372-439`) con **m², sector y plazo**, y un formulario o CTA diferenciado B2B («visita técnica para planta»).
4. `Service` + `AggregateOffer` ya están (`:211-243`); añadir `areaServed` a nivel país.

**Impacto esperado.** El volumen es chico (162 impresiones en 12 meses): **+30 a +70 clics/año**. Pero un lead industrial son 300–1.200 m² contra 25–60 m² residenciales. **Se mide en cotizaciones, no en clics.** Prioridad de negocio alta, prioridad de tráfico baja. Va en la ola 2.

---

### 4.5 — Pilar 5: Proyectos reales y Google Business Profile

**Problema.** El sitio afirma «trabajos reales» y no tiene una sola página de obra. Cero consultas de marca en 1.000.

**Evidencia.**
- No existe `/proyectos`, `/galeria`, `/portfolio` ni `/testimonios`.
- Las landings declaran «trabajos reales» (`EpoxyFloorsPage.tsx:137-140`, `LuxuryFurniturePage.tsx:105-108`) con galerías de imágenes sin metadatos: sin fecha, cliente, ciudad, m² ni acabado.
- Testimonios hardcodeados (`EpoxyFloorsPage.tsx:166-175`, `IndustrialEpoxyFlooringPage.tsx:153-163`, `LuxuryFurniturePage.tsx:144-154`) **sin schema `Review`/`AggregateRating`**.
- El schema global sí es `HomeAndConstructionBusiness` (`src/app/[locale]/layout.tsx:77-120`).
- **Google Business Profile: NO VERIFICADO.** No hay acceso desde el repo. Para «piso epoxico costa rica» el paquete local ocupa la parte alta de la SERP y el sitio no puede competir ahí solo con orgánico.

**Cambios.**
1. **`/es/proyectos`** con 8–12 fichas: foto antes/después, ciudad, m², sistema, plazo, y 2 líneas de contexto. Cada ficha enlaza a la landing del sistema y a la calculadora. Es el activo de E-E-A-T que falta y la fuente natural de long tail («piso epóxico cochera Escazú»).
2. `Review` + `AggregateRating` en los testimonios existentes, **solo con reseñas reales y verificables**. Si no hay forma de verificarlas, quitarlas: un `AggregateRating` inventado es penalizable.
3. **Google Business Profile**: reclamar/optimizar, categoría «Contratista de pisos», fotos de obra, servicio en todo el país, y publicaciones mensuales. **Requiere acceso del negocio.**
4. Enlazar `/proyectos` desde el navbar (hoy no existe esa entrada) y desde `/es/epoxy-floors`.

**Impacto esperado.** Difícil de modelar; estimación conservadora **+80 a +200 clics/año** por long tail y por el efecto de autoridad sobre el resto del sitio, **más el paquete local, que no está incluido en esa cifra**.

**Bloqueante.** Necesita fotos y datos reales de obra (§8-D2).

---

### 4.6 — Pilar 6: Higiene técnica

Cinco defectos verificados en vivo. Ninguno es glamoroso; todos son baratos y uno tiene riesgo real.

| # | Defecto | Evidencia | Cambio | Impacto |
|---|---|---|---|---|
| 1 | **Soft 404 con HTTP 200** | `/es/guias/precios-epoxicos-costa-rica`, `/es/guias/pisos-epoxicos-industriales-bodegas` y `en/guias/pisos-epoxicos-para-cocheras` → **200**, 7 palabras, `Página no encontrada | SobrePoxi | SobrePoxi`, sin `noindex` ni canonical | Devolver 404 real: `notFound()` no llega a fijar el status porque el layout empieza a hacer streaming antes (el `Navbar` resuelve `cookies()`); validar el slug en el servidor antes del stream, o en `middleware` | 5 slugs con impresiones indexadas como basura; riesgo de calidad de sitio |
| 2 | **Enlaces rotos en la vista de lista** | `ProductsPageContent.tsx:343,359,400` → `/product/<id>`; `/es/product/12` → 200 «Producto no encontrado» | Cambiar a `/product/${product.name}` como ya hace `ProductCard.tsx:123,137,195` | Bug de usuario, no solo de SEO |
| 3 | **Sitemap sin `lastmod` verosímil y sin imágenes** | `sitemap.ts:53` — `lastModified: now` en las 138 URLs (verificado en vivo) | `lastModified` real por contenido; añadir extensión `images` a las fichas y a la galería | Recupera señal de frescura; las imágenes hoy se indexan como `/_next/image?url=…` |
| 4 | **Alternates de guías apuntan a URLs inexistentes** | `sitemap.ts:41-50` genera `/es` y `/en` para todo slug; 18 slugs de guías no tienen pareja (`data.ts:50` ↔ `:1234`) | Emitir alternates solo cuando el slug existe en ambos locales; si no, uno solo sin `hreflang` | Pares hreflang inválidos → Google descarta el clúster de esas páginas |
| 5 | **Todo dinámico, sin caché de HTML** | TTFB 0,47 s caliente / 1,10 s frío; `Navbar.tsx:11` llama `cookies()` en el layout | Sacar `cookies()` del layout (el `Navbar` necesita saber si hay sesión: resolverlo en cliente o en un componente aparte) + `Cache-Control` con `s-maxage` en nginx para páginas públicas | Protege CWV y absorbe el crecimiento de tráfico sin tocar el VPS |

**Impacto esperado.** +30 a +80 clics/año por recuperación de URLs e imágenes, y eliminación del riesgo de calidad. El punto 5 no da clics hoy: **evita perderlos cuando el tráfico crezca** (las impresiones se multiplicaron por 10 en 12 meses).

**Nota positiva verificada:** el hreflang de las páginas estáticas **sí funciona** (`<link rel="alternate" hrefLang="es-CR|en-US|x-default">` presente y correcto en `/es/epoxy-floors`). Lo roto es solo el de las guías con slug distinto por locale.

---

### 4.7 — Reparación del clúster de muebles (3 horas, no una estrategia)

**Evidencia.** 127 consultas de muebles/mesas: **1.248 impresiones, 23 clics, CTR 1,84 %, posición 5,02**. Consultas con «precio» explícito en el nombre: `mesas con resina epoxi precio`, `mesas de resina epoxi y madera precios`, `precio de mesa de resina epoxica`, `mesas con resina precio`, `mesa con resina epoxica precio`, `mesas de resina y madera precio`. La landing dice literalmente «No publicamos precios» (`LuxuryFurniturePage.tsx:167`).

**Cambios** (solo esto):
1. Publicar rangos: «mesa río desde ₡X», «barra desde ₡Y», «escritorio desde ₡Z». **Requiere insumo del negocio** (§8-D4).
2. Enlazar las 8 guías y 6–8 productos desde la landing (hoy: 0 y 0).
3. `Product` + `Offer` con `priceCurrency: CRC` en las fichas. Hoy `Product` solo se emite si hay `dolar_price` y usa USD (`ProductDetailPage.tsx:87-110`); los `colon_price` del catálogo están en 0/null.
4. Título de la landing: incluir «precio» explícitamente.

**Impacto esperado.** +20 a +50 clics/año. **No justifica más contenido, ni traducción, ni landings nuevas.** El canal de muebles es Instagram/Pinterest/Marketplace; el SEO solo debe dejar de perder lo poco que ya captura.

### 4.8 — Móvil: la página que hacen el 78 % de los clics

Móvil es 1.871 de 2.368 clics (77,8 %) a posición 5,16 — mejor que escritorio (7,67). Auditado en vivo con viewport 390×844, CPU 4× y red de 1,6 Mbps (emulación de gama media):

| Métrica | Medición | Lectura |
|---|---:|---|
| TTFB | 155 ms (461 ms sin throttle) | El VPS responde bien |
| FCP | 1.664 ms | **Es el cuello de botella** |
| LCP | 1.664 ms (`<img>` hero-mobile.webp) | LCP = FCP: la imagen no llega tarde, el primer pintado sí |
| CLS | **0,000** | Excelente. Cero saltos |
| Load | 3.729 ms | |
| Tarea larga | **473 ms en t≈1.040 ms** | Hidratación de 19 chunks de JS |
| Peso | 710 KB (111 KB CSS en 8 archivos, 324 KB JS en 19 chunks) | El CSS bloquea el render |
| DOM | 698 nodos | Sano |
| Texto visible | **769 palabras** | La página que hace el 64 % de los clics es delgada |
| Tap targets | 30, de los cuales 12 < 44 px | El peor: breadcrumb 20 px, selector de idioma 28 px |
| Overflow horizontal | Ninguno | Correcto |
| CTA WhatsApp | y = 588 px | Dentro del fold de 844 px |

**Conclusión:** la página no tiene un problema de diseño móvil — tiene un problema de **primer pintado y de contenido**. El LCP no se arregla con la imagen (ya está en `fetchPriority="high"` y pesa <30 KB): se arregla reduciendo los 8 archivos de CSS y los 19 chunks que bloquean el render. Eso es trabajo de build, no de página, y queda fuera de esta iteración a propósito.

**Qué se corrigió en esta iteración (móvil primero):**

1. **La barra de búsqueda de productos ya no aparece fuera del catálogo.** En `/es/epoxy-floors` la fila de búsqueda (con su input visible) y el carrusel de categorías ocupaban el ancho completo del fold para una función que nadie usa en una página de servicio: invitaba a irse de la página. Ahora solo se muestra en `/`, `/products`, `/product/*` y `/search`.
2. **En su lugar va el embudo:** una barra compacta con la referencia de precio autorizada (solo en las landings de pisos; en muebles y guías muestra una línea neutra, nunca el precio de pisos) y un botón **Cotizar** a WhatsApp con `ref=barra.<página>`, medible en Umami. Altura objetivo ≥44 px.
3. **Precio en el hero** de `/es/epoxy-floors` (antes: 0 apariciones de ₡ en todo el archivo).
4. **FAQ de precio con la cifra** y **nueva FAQ de espesor 5 mm** — el `FAQPage` que lee Google ahora responde.
5. **Bloque «Precios, guías y piezas»** con 15 enlaces internos (6 guías, 3 sistemas, 6 fichas de piso), con `min-h-11` para que cada enlace sea tocable en móvil.
6. **Keyword en el subtítulo del hero** («Pisos epóxicos sin juntas…»). El H1 se dejó intacto a propósito: es el de la URL que gana «piso epoxico costa rica» en 2,76.

**Lo que queda pendiente y por qué:**

| Defecto móvil | Causa raíz | Por qué no se tocó |
|---|---|---|
| FCP/LCP 1.664 ms | 8 CSS + 19 chunks bloqueando el render | Requiere dividir CSS y sacar el buscador del bundle compartido: cambio de build con riesgo de regresión visual en todo el sitio |
| Tarea larga 473 ms | Hidratación del navbar (buscador + carrusel + sesión) | Se mitiga al sacar el buscador del camino crítico, no eliminando el componente |
| 769 palabras visibles | La página es visual, no editorial | Lo resuelve el pilar 2 (bloques de contenido) y el pilar 5 (proyectos) |
| Tap targets < 44 px | Breadcrumb y selector de idioma | El selector de idioma es un `<select>` nativo y ya cumple el mínimo AA de 24 px |

**Inconsistencia resuelta (2026-10-26).** Las landings prometían «visita técnica gratuita» en **10 lugares** (landing de pisos, industrial, las 5 de provincia, 4 guías y la ficha de producto), y la FAQ de San José respondía literalmente «Sí, la visita es gratuita». La regla del dueño dice lo contrario: la visita «puede tener un costo según el sitio; se revisa al coordinar la cita». **Se corrigió todo el copy**: ya no queda ninguna promesa de gratuidad sobre la visita, se añadió una FAQ explícita («¿La visita técnica tiene costo?») en la landing de pisos y en San José, y los metadatos de las 4 provincias se reescribieron. Queda pendiente una decisión sobre las frases que prometen **cotización** gratuita (que es otra promesa distinta: el rango por m² se da sin visita, así que hoy es defendible; si el dueño dice que tampoco es gratis, se cambian).

---

## 5. Roadmap en tres olas

### Estado a 2026-10-26 — lo ya ejecutado

| Cambio | Archivo | Verificación |
|---|---|---|
| Barra de búsqueda fuera del catálogo; en su lugar, barra de embudo con precio autorizado + CTA a WhatsApp (`ref=barra.<página>`) | `components/NavbarSearchArea.tsx` (nuevo), `Navbar.tsx`, `NavbarClient.tsx` | Medido a 390 px: la fila de búsqueda (1 `input` visible, 44 px) desaparece y en su lugar quedan 54 px con un botón de 44 px; header 87 → 97 px. **La ganancia no es de altura** (el hero está centrado en `92dvh`, el H1 se movió 3 px): es de función — ese espacio ahora convierte en vez de sacar al usuario de la página. En `/luxury-furniture` y `/guias/*` no muestra el precio de pisos; en `/cart` no muestra nada |
| Precio autorizado en el hero de `/es/epoxy-floors` | `EpoxyFloorsPage.tsx` | Menciones de ₡ en el HTML servido: **1 → 17** |
| FAQ de precio con la cifra + nueva FAQ de espesor | `EpoxyFloorsPage.tsx` | `FAQPage` del JSON-LD contiene «₡75.000 y ₡96.100» (verificado en el HTML) |
| Bloque «Precios, guías y piezas»: 6 guías + 3 sistemas + 6 fichas | `EpoxyFloorsPage.tsx` | Enlaces internos únicos de la página: **13 → 25** (de 1 de contenido a 16) |
| Keyword en el subtítulo del hero (H1 intacto) | `EpoxyFloorsPage.tsx` | Palabras visibles: 769 → 958 |
| Eliminado `estimateRange()` (multiplicaba rango × área: violaría D-390 si alguien lo usara) | `application/floorPricing.ts` | `tsc` + `build` exit 0 |
| Redacción «sistema **estándar** de 5 mm» en toda superficie pública | página + barra + stats | No se lee como si 5 mm fuera el único espesor |

`tsc --noEmit` exit 0 · `next build` exit 0 · verificado en el servidor de producción local a 390×844 y 1440×900.

### Lo que sigue en la ola 1

### Ola 1 — Semana 1–2: desbloquear (todo reversible, sin tocar URLs que rankean)

| # | Acción | Pilar | Esfuerzo | Bloqueante | Estado |
|---|---|---|---|---|---|
| 1 | Enlazar `/es/resina-epoxica-para-pisos` desde `epoxy-floors`, industrial, 4 guías y 5 provincias | 1 | 3 h | No | **Hecho desde `epoxy-floors`** (bloque de clúster). Falta industrial, guías y provincias |
| 2 | Solicitar indexación en GSC (resina, guías de pisos, fichas de piso) | 1 | 30 min | No | **Pendiente: requiere acceso a GSC** |
| 3 | Arreglar enlaces `/product/<id>` → `/product/<name>` | 6 | 30 min | No | Pendiente |
| 4 | Soft 404s de guías → 404 real | 6 | 2 h | No | Pendiente |
| 5 | Bloque «Guías» + «Piezas» + «Industrial» en `/es/epoxy-floors` | 2 | 1 día | No | **Hecho** (falta el párrafo de provincias) |
| 6 | Calculadora en `/es/epoxy-floors` | 3 | 2 h | No | Pendiente |
| 7 | Sitemap: `lastmod` real + alternates condicionales + extensión `images` | 6 | 3 h | No | Pendiente |
| 8 | Barra de búsqueda solo en catálogo + barra de embudo en el resto | 2 y 3 | 3 h | No | **Hecho** |
| 9 | Precio autorizado en el hero y en la FAQ de `/es/epoxy-floors` | 3 | 1 h | No | **Hecho** |

**Gate ola 1 → ola 2:** a 30 días, `/es/resina-epoxica-para-pisos` con impresiones > 0 y `/es/epoxy-floors` con posición ≤ 5,3. Si no se cumple, el problema es de indexación, no de contenido: parar y diagnosticar antes de escribir una línea más.

### Ola 2 — Semana 3–6: monetizar la intención

| # | Acción | Pilar | Esfuerzo | Bloqueante |
|---|---|---|---|---|
| 8 | Página de precio única y canónica (mismo rango autorizado, intención diferenciada por guía y calculadora honesta) | 3 | 1–2 días | No |
| 9 | Consolidar las 4 guías de precio en 1 canónica + 3 con intención diferenciada | 3 | 1 día | No |
| 10 | Clúster industrial: guía 404 → 301, enlaces, casos de estudio con m² | 4 | 1 día | No |
| 11 | Reparación de muebles (rangos + enlaces + `Offer` CRC) | 4.7 | 3 h | **Sí: §8-D4** |
| 12 | CTA de guías → WhatsApp (hoy van a `/contact`) | 7 | 2 h | No |
| 13 | Sacar `cookies()` del layout + caché de HTML en nginx | 6 | 1 día | No |

**Gate ola 2 → ola 3:** a 60 días, familia de precio con CTR ≥ 9 % y `calculator_send` por página > 20 % de `calculator_use` (hoy 22 %: 2 de 9).

### Ola 3 — Mes 2–3: autoridad

| # | Acción | Pilar | Esfuerzo | Bloqueante |
|---|---|---|---|---|
| 14 | `/es/proyectos` con 8–12 obras reales | 5 | 3–4 días | **Sí: §8-D2** |
| 15 | `Review`/`AggregateRating` verificables en testimonios | 5 | 3 h | **Sí: §8-D3** |
| 16 | Google Business Profile optimizado | 5 | 1 día | **Sí: §8-D5** |
| 17 | Revisión de canibalización: una dueña por consulta en el mapa de §3 | todos | 1 día | No |

---

## 6. Lo que NO haremos (y por qué)

| Tentación | Por qué no |
|---|---|
| **Más guías de muebles** | 127 consultas, 1.248 impresiones, 23 clics. El techo está medido. El canal es Instagram/Pinterest/Marketplace |
| **Landings de Puntarenas y Limón** | Las 5 provincias existentes suman 283 impresiones en 12 meses. San José: 91. La demanda municipal en Costa Rica no existe a esta escala |
| **Traducir más al inglés** | `/en` = 4.350 impresiones, 60 clics (2,5 %), CTR 1,4 %, 69 URLs (50 % del sitemap). No hay servicio en EE. UU. Se mantiene lo que hay, bien hreflangeado; no se invierte |
| **Perseguir las impresiones internacionales** | 18.242 impresiones, 218 clics, CTR 1,2 %, en países donde no se puede vender. Cero presupuesto |
| **Optimizar las fichas para «piso epoxico negro»** | Posición 1,07 con 0,31 % de CTR no es una SERP de enlaces. Ya se intentó con títulos el 11-oct y no movió el número |
| **Migrar slugs al español** (`/epoxy-floors` → `/pisos-epoxicos`) | La URL que hay gana la consulta principal en posición 2,76. Una migración aquí es puro riesgo con el sitio creciendo 10× en impresiones |
| **Perseguir «pisos 3D» / «diseños»** | 1.011 impresiones, 8 clics, CTR 0,79 %: intención de imagen, no de contratación |

---

## 7. Medición, modelo y criterios de corte

### 7.1 KPI por ola

| Métrica | Hoy | 30 d | 60 d | 90 d |
|---|---:|---:|---:|---:|
| Clics CR/mes (GSC) | ~180 | 200 | 240 | 280 |
| Posición media `/es/epoxy-floors` | 5,54 | ≤5,3 | ≤4,8 | ≤4,3 |
| Impresiones `/es/resina-epoxica-para-pisos` | 0 | >0 | >300 | >800 |
| CTR familia de precio | 5,0 % | 6 % | 9 % | 11 % |
| Soft 404 con 200 | 5+ slugs | 0 | 0 | 0 |
| `whatsapp_click` / sesión | 19 % | 20 % | 22 % | 24 % |
| `calculator_send` / `calculator_use` | 22 % | 25 % | 30 % | 35 % |

**El KPI primario es clics desde Costa Rica, no clics totales.** Las impresiones internacionales y de imagen no deben entrar en la evaluación del plan: no son accionables.

### 7.2 El modelo, con sus supuestos

- Curva posición→CTR derivada del propio sitio: 3,2→18 %; 4,0→12 %; 4,5→9 %; 5,5→6,6 %; 6,5→4,5 %.
- Cada estimación descuenta 30–40 % por riesgo de ejecución y por canibalización entre páginas.
- **Supuesto clave:** el crecimiento de impresiones continúa (se multiplicaron por 10 en 12 meses). Si se aplana, los clics absolutos no suben aunque el CTR mejore.
- **Rango total: +710 a +1.500 clics/año (+30 % a +65 %).** Un resultado por debajo de +400 a 90 días significa que el modelo falló: revisar §7.3.

### 7.3 Qué haría falso este plan

1. **Si `/es/resina-epoxica-para-pisos` no se indexa en 30 días** pese a los enlaces → el problema es técnico (canalización de autoridad o crawl), no de contenido. Diagnóstico antes de seguir.
2. **Si `/es/epoxy-floors` no mejora la posición con 15 enlaces contextuales** → el límite es de autoridad externa (backlinks), no interno. Ese es el escenario en que sí hay que hablar de link building, y hoy no hay evidencia de que sea el cuello de botella.
3. **Si el CTR de Costa Rica no se mueve** → el problema es la oferta (precio, plazos, confianza), no la posición. Ahí la palanca es §4.3 y §4.5, no más SEO.

### 7.4 Lo que sigue sin poder medirse

- **Conversaciones desde WhatsApp.** El `[ref]` se envía pero el bot no lo guarda. Sin eso, «lead» sigue siendo una suposición y el plan optimiza clics, no clientes. **Es la medición más importante que falta y no está en este repositorio.**
- Core Web Vitals de campo: Umami tiene las columnas vacías.
- Indexación real de las 138 URLs (GSC UI, no API).

---

## 8. Decisiones que necesito del negocio

| ID | Decisión | Bloquea | Si no hay decisión |
|---|---|---|---|
| **D1** | ~~Precio real por sistema~~ **Resuelto**: la referencia autorizada (₡75.000–₡96.100/m², IVA incluido, estándar de 5 mm, sin USD y sin multiplicar por área) ya está publicada en el hero y en el FAQ. No se inventan tramos | — | — |
| **D2** | 8–12 obras reales: foto antes/después, ciudad, m², sistema | `/es/proyectos`, Pilar 5 | La página no se construye; se pierde la mayor fuente de E-E-A-T |
| **D3** | Reseñas verificables (Google, WhatsApp, contrato) | `Review` schema | Se omiten los testimonios en datos estructurados. No se inventan |
| **D4** | Rangos de precio de muebles («mesa río desde ₡X») | Reparación §4.7 | Se aplica el resto de §4.7 sin precios; la landing sigue perdiendo las consultas de precio |
| **D5** | Acceso a Google Business Profile | §4.5 | Se pierde el paquete local, que para «piso epoxico costa rica» es la mayor superficie de clic que no controlamos |

---

## 9. Apéndice: evidencia y método

### 9.1 Verificación en vivo (2026-10-26, `curl -A "Googlebot"`)

| URL | HTTP | TTFB (frío) | Hallazgo |
|---|---|---:|---|
| `/es/epoxy-floors` | 200 | 0,49 s | 189.412 bytes; canónico + hreflang correctos; 13 `href` internos, **1 solo de contenido** |
| `/es/resina-epoxica-para-pisos` | 200 | 0,47 s | 134.100 bytes; título de precio + calculadora; ₡ presente; 0 impresiones en GSC |
| `/es/product/black-sparkle-epoxy-floor` | 200 | **1,10 s** | Título `Piso Epóxico Negro Sparkle · Piso epóxico en Costa Rica`; 6.452 impresiones, CTR 0,57 % |
| `/es/guias/precios-pisos-epoxicos-costa-rica` | 200 | 0,48 s | 3 `wa.me`; CTA de contenido → `/contact`; enlaza 3 guías + landing resina |
| `/es/guias/precios-epoxicos-costa-rica` | **200** | — | **7 palabras**, `Página no encontrada | SobrePoxi | SobrePoxi`, sin `noindex` ni canonical → soft 404 |
| `/es/guias/pisos-epoxicos-industriales-bodegas` | **200** | — | Mismo soft 404; **144 impresiones** en GSC |
| `/en/guias/pisos-epoxicos-para-cocheras` | **200** | — | Mismo soft 404 (par inexistente del slug ES) |
| `/es/product/1` y `/es/product/12` | **200** | — | `Producto no encontrado`, `noindex` → enlaces de la vista de lista rotos |
| `/es/luxury-design-flooring` | 308 | — | Redirige a `/es/epoxy-floors` (tiene 1.325 impresiones históricas) |
| `/sitemap.xml` | 200 | — | 138 `<loc>`, 414 `xhtml:link`, `lastmod` idéntico en todas, 0 imágenes |
| `/robots.txt` | 200 | — | Correcto: allow `/`, disallow `/api/`, `/auth`, `/account`, `/admin` con y sin locale |

### 9.2 Umami (`ticacode1`, `analytics-db`, `website_id=85f70de2-…`)

6 días de vida (20–26 oct, arrancó con la migración al VPS): 185 sesiones, 197 visitas, 304 vistas, 352 eventos. 113 sesiones desde Google (61 %), 132 desde Costa Rica (71 %), 123 mobile (66 %), 37 clics a WhatsApp en 35 sesiones, 9 usos de calculadora / 2 envíos.

```sql
-- Totales de vida (30 días = 6 días reales)
select count(*) from session where website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4';
select count(distinct visit_id), count(*) filter (where event_type=1), count(*)
from website_event where website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4';
```

### 9.3 Archivos citados

- `src/app/sitemap.ts:41-50,53,73` — alternates genéricos, `lastmod: now`, prioridad de resina.
- `src/shared/seo/seoConfig.ts:218-247` — canonical y hreflang (funciona en estáticas).
- `src/app/[locale]/layout.tsx:19-40,77-120` — neutralización de alternates del layout, schema global.
- `src/features/content/presentation/components/Navbar.tsx:11` — `cookies()` que vuelve dinámico todo el árbol.
- `src/features/content/presentation/pages/landing/EpoxyFloorsPage.tsx:620-640` — los 2 enlaces de contenido.
- `src/features/content/presentation/pages/landing/ResinFloorsPage.tsx:19,60-65,181-206,256` — precios, enlaces salientes, schema, calculadora.
- `src/features/content/presentation/pages/landing/LuxuryFurniturePage.tsx:144-154,167,257,467` — testimonios, «No publicamos precios», enlaces.
- `src/features/content/application/floorPricing.ts:31-76` — los 4 acabados con rango idéntico.
- `src/features/content/presentation/components/FloorCalculator.tsx:91-98,206-208,270-278` — rango y envío a WhatsApp.
- `src/features/products/presentation/pages/ProductDetailPage.tsx:44-49,87-110` — título y `Product`/`Offer` en USD.
- `src/features/products/presentation/components/ProductsPageContent.tsx:1,27-31,47-164,343,359,400` — client component y enlaces por id numérico.
- `src/features/content/application/guides/data.ts:657,752,816,887` — las 4 guías de precio solapadas.
- `docs/SEO-2026-10-GOOGLE-Y-WHATSAPP.md` — cambios de octubre; fichas ya tenían 0,4 % y 0,7 % de CTR antes del arreglo de títulos.

### 9.4 Datos de Search Console usados

`docs/sobrepoxi.com-Performance-on-Search-2026-10-26/`: `Consultas.csv` (999 filas, top de consultas), `Páginas.csv` (79 filas), `Países.csv`, `Dispositivos.csv`, `Gráfico.csv` (365 días), `Aparición en búsquedas.csv` (fragmentos de productos).
