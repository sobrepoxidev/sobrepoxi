# Diagnóstico de tráfico y SEO — sobrepoxi.com

**Fecha:** 2026-10-26
**Periodo medido:** 2026-10-20 03:47 UTC → 2026-10-26 07:17 UTC (6,1 días; toda la vida del sitio en Umami)
**Fuentes:** base de Umami en `ticacode1` (`analytics-db`, `website_id=85f70de2-cdb2-4b5c-aa1b-66589e75feb4`), HTML servido a Googlebot, código del repo, `sitemap.xml`, [`SEO-2026-10-GOOGLE-Y-WHATSAPP.md`](./SEO-2026-10-GOOGLE-Y-WHATSAPP.md).
**Alcance:** todo el sitio y sus dos líneas de negocio (pisos y muebles). No incluye otros proyectos.

---

## 0. Resumen en siete puntos

1. En 6 días el sitio hizo **185 visitantes / 197 visitas / 303 vistas**. Son ~30 visitantes/día, tráfico nuevo: Umami arrancó el 20-oct con la migración al VPS.
2. **Google es casi todo**: 113 de 185 sesiones (61 %) llegan con `google.com` como referrer. Costa Rica es 132 sesiones (71 %); mobile es 123 (66 %).
3. **Una página captura la mitad del sitio**: `/es/epoxy-floors` tiene 107 visitantes (58 %) y 108 de 197 entradas (55 %) aterrizan ahí directamente.
4. **El embudo termina en WhatsApp, no en el checkout**: 37 clics en 35 sesiones (19 % de los visitantes). En `/es/epoxy-floors`, 28 de 107 sesiones (26 %) hacen clic. La mitad de esos clics son la burbuja flotante, no el CTA de la página.
5. **El cluster de muebles está muerto en search**: 11 vistas y 11 sesiones en 6 días (6 % de las vistas de los dos clusters), **0 clics a WhatsApp** y **1 sola sesión desde Google**. La landing `/es/luxury-furniture` recibió 7 sesiones: 6 internas/directas y 1 de Google.
6. **No es un problema de cantidad de contenido**: hay 1 landing de 1.202 palabras, 8 guías de muebles, 6 videos y ~19 productos de mobiliario. El problema es que **la oferta no responde la pregunta de precio** (0 cifras en ₡, FAQ que dice «No publicamos precios»), **el cluster no está enlazado** (la landing no linkea a sus guías ni a sus productos; las guías no linkean de vuelta) y **las fichas de muebles son delgadas y sin `Product`/`Offer`** (210–395 palabras, 0 precios).
7. **El sitio está vendido como atelier de muebles pero descubierto como servicio de pisos**: la home enlaza 14 productos de mobiliario y 6 de pisos, pero de las 177 vistas que caen en alguno de los dos clusters, 166 (94 %) son de pisos y 11 (6 %) de muebles. Ese desalineamiento es la conclusión principal.

---

## 1. Qué es el sitio

- Next.js 15 + React 19 + next-intl, self-hosted desde el 19-oct-2026: PM2 `sobrepoxi` en `127.0.0.1:3150`, nginx con TLS en `deploy/nginx/sobrepoxi.com.conf`.
- Dos líneas de negocio:
  - **Pisos epóxicos**: landings por tipo (`/es/epoxy-floors`, `/es/industrial-epoxy-flooring`, `/es/resina-epoxica-para-pisos`), 5 landings por provincia, calculadora de m², guías de precio.
  - **Mobiliario en resina y madera**: `/es/luxury-furniture`, 8 guías, 6 videos y ~19 productos (mesas río, barras, escritorios, consolas, cabeceros, patas).
- La conversión real es **WhatsApp**: todos los CTA usan `buildWhatsAppUrl()` con un `ref` por página (`src/shared/contact/whatsapp.ts`). Hay checkout con PayPal, pero no hay eventos de carrito ni de compra instrumentados.

---

## 2. Cómo se mide (y qué no)

**Instrumentado** (`src/shared/analytics/track.ts:9-10`, script en `src/app/[locale]/layout.tsx:72-73`):

| Evento | Qué mide | Disparador |
|---|---|---|
| `whatsapp_click` | clic a cualquier enlace `wa.me`, con `path` y `ref` | `WhatsAppClickTracker.tsx` |
| `calculator_use` | primera interacción con la calculadora | `FloorCalculator.tsx:100` |
| `calculator_send` | envío de la calculadora a WhatsApp | `FloorCalculator.tsx` |

**No instrumentado / no disponible:**

- Compras, carrito y checkout (no hay eventos).
- Conversaciones reales de WhatsApp: el clic abre `wa.me`, pero **no se sabe si el usuario envía el mensaje**. El doc de SEO dejó pendiente que el bot de Mauricio lea el `[ref: …]` y lo guarde como origen.
- Core Web Vitals: las columnas `lcp/cls/inp/ttfb` de Umami están vacías (0 filas con datos).
- Search Console: no hay export en el repo; la única referencia es el resumen del doc de octubre (20,6 mil impresiones y 1,1 mil clics entre el 9-jul y el 8-oct).

---

## 3. Números verificados

Definiciones de Umami: **visitantes** = filas de `session`; **visitas** = `visit_id` distintos; **vistas** = eventos `event_type=1`.

| Métrica | Valor | Contexto |
|---|---:|---|
| Visitantes | 185 | ~30/día |
| Visitas | 197 | 1,06 por visitante |
| Vistas | 303 | 1,64 por visita |
| Rebote | 129/197 = **65,5 %** | visitas con un solo evento |
| Duración | 1m18s (panel); mediana propia 1m31s | la media (279 s) está inflada por sesiones largas |
| Google | 113 sesiones | 61 % del total; el panel muestra 91 % porque sólo reparte el tráfico atribuido |
| Costa Rica | 132 sesiones | 71 %; el panel muestra 74 % con su definición |
| Mobile | 123 sesiones | 66 %; laptop 58, desktop 2, tablet 2 |
| WhatsApp | 37 clics / 35 sesiones | 19 % de los visitantes |
| Calculadora | 9 usos / 2 envíos | el 78 % de los usos no termina en envío |

**Top de páginas (sesiones / vistas):**

| Página | Sesiones | Vistas |
|---|---:|---:|
| `/es/epoxy-floors` | 107 | 130 |
| `/es` | 15 | 19 |
| `/es/product/black-sparkle-epoxy-floor` | 15 | 16 |
| `/es/products` | 11 | 21 |
| `/es/resina-epoxica-para-pisos` | 9 | 12 |
| `/es/about` | 7 | 7 |
| `/es/luxury-furniture` | 7 | 7 |
| `/es/guias/costo-piso-epoxico-metro-cuadrado` | 6 | 6 |
| Resto del cluster de muebles (guías, fichas, video) | 4 | 4 |

**Entradas (primera página de cada `visit_id`):** 108 de 197 (55 %) entran a `/es/epoxy-floors`; 14 a `/es`; 12 a la ficha de `black-sparkle`; 8 a `resina-epoxica-para-pisos`; 6 a `/es/products`; 5 a `epoxy-floors#galeria`; 4 a `luxury-furniture` y 4 a la guía de precios.

---

## 4. El embudo real

```
Google (113 sesiones)
   └─ /es/epoxy-floors (107 sesiones, 58 %)
        ├─ CTA principal "pisos-epoxicos" ......... 15 clics
        ├─ burbuja flotante "burbuja.epoxy-floors"  14 clics
        └─ otros enlaces / navegación ..............  0 clics medidos
   └─ fichas de producto (15 sesiones)
   └─ resto del sitio (long tail)
```

- **28 de las 107 sesiones de `/es/epoxy-floors` (26 %) hacen clic a WhatsApp.** 29 de los 35 clics totales salen de esa página.
- **La mitad del mérito es la burbuja**: 14 de 29 clics de la página son `burbuja.epoxy-floors` (`WhatsAppBubble.tsx`), no el CTA del hero ni el del cierre (`EpoxyFloorsPage.tsx:324,612`).
- **Los que hacen clic son mobile y de Costa Rica**: 29 mobile, 5 laptop, 1 desktop; 31 de 35 sesiones desde CR.
- **La calculadora se usa pero no se envía**: 9 usos, 2 envíos. En `/es/resina-epoxica-para-pisos` se usa 5 veces y sólo 1 termina en envío; en la guía de costo por m², 3 usos y 1 envío.

**Lo que esto NO prueba:** que el clic se convierta en conversación, cotización o venta. Es un clic a `wa.me`. El loop está abierto.

---

## 5. Fuentes, geografía y dispositivo

| Fuente | Sesiones |
|---|---:|
| `google.com` | 113 |
| `bing.com` | 4 |
| `com.google.android.googlequicksearchbox` | 2 |
| `search.brave.com` | 2 |
| `duckduckgo.com` | 1 |
| `l.instagram.com` | 1 |
| `vercel.com` | 1 |
| sin referrer (directo/interno) | 70 |

- **China (19) y Singapur (3) parecen bots/scrapers.** Sin ellos, Costa Rica queda en ~81 % de las sesiones.
- El panel muestra Google como 91 % de las fuentes porque excluye el tráfico sin referrer; sobre el total de sesiones es 61 %.
- **Mobile 66 %** justifica que WhatsApp sea el canal natural de conversión en Costa Rica.

---

## 6. Mapa de contenido: 138 URLs, dos clusters

El `sitemap.xml` tiene **138 URLs** (69 por idioma): 31 productos, 17 guías, 6 videos, 5 landings por provincia, las landings de servicio, home, about, contacto y páginas legales.

**Clasificación de los 31 productos por nombre:**

| Línea | Productos | Ejemplos |
|---|---:|---|
| Pisos | 8 | `black-sparkle-epoxy-floor`, `beige-gold-epoxy-floor`, `piso-epoxico-rojo-magma`, `shell-reef-terrace-floor` |
| Mobiliario | 19 | `rio-celeste-bar-counter`, `island-reef-dining-table`, `papagayo-river-kitchen-island`, `surf-reef-bed-headboard`, `pata-de-mesa-aureum` |
| Ambiguos (mesa/ piso) | 4 | `deep-ocean-m-oval-1/2`, `pacific-coast-xl-…-1/2` |

**El catálogo es mayoritariamente mobiliario, y la home lo refleja**: enlaza 20 productos, 14 de mobiliario y 6 de pisos. Pero el tráfico no:

| Cluster | Vistas | Sesiones |
|---|---:|---:|
| Pisos (landings + ciudades + guías + productos) | 166 | 129 |
| Muebles (landing + guías + productos + videos) | 11 | 11 |

**94 % de las vistas de los dos clusters son de pisos.** La home vende muebles; Google trae gente de pisos.

---

## 7. El caso `/es/luxury-furniture`: por qué está muerta

### 7.1 Lo que sí está bien

- `robots: index, follow`, canonical propio (`https://sobrepoxi.com/es/luxury-furniture`), incluida en el sitemap con prioridad 0,8 (`src/app/sitemap.ts:63`).
- Título y descripción con keywords: «Muebles de Lujo en Resina Epóxica y Madera | Mesas River, Escritorios | SobrePoxi».
- 1.202 palabras visibles, 10 imágenes, FAQPage + BreadcrumbList + OfferCatalog, y **3 CTA a WhatsApp** (`LuxuryFurniturePage.tsx:273,490`).
- No está huérfana: está en el navbar (`NavbarClient.tsx:91`), en la home (`OptimizedNew.tsx:279,305`), en About y en el sitemap.

### 7.2 Por qué no arranca

**1. La demanda capturada es casi nula.** 7 sesiones en 6 días: 6 internas/directas y **1 de Google**. **0 clics a WhatsApp** en la página. Con 7 sesiones la muestra no permite culpar al UX, pero confirma que no hay adquisición que convertir.

**2. La página no responde la pregunta comercial.** El 100 % del HTML tiene **0 cifras en ₡** y la FAQ dice literalmente: «No publicamos precios: cada pieza se cotiza a la medida…» (`LuxuryFurniturePage.tsx:167`). Las búsquedas de mobiliario son mayoritariamente «precio mesa río», «cuánto cuesta una mesa de resina». La línea de pisos hace lo contrario: publica ₡75.000–₡96.100/m² y tiene calculadora. Esa es la diferencia funcional entre las dos líneas.

**3. El cluster está desconectado.** Verificado en el HTML en vivo:
- La landing **no enlaza a ninguna de sus 8 guías de muebles** ni a sus productos; el único enlace al cluster es `/es/guias` (el índice).
- Las 4 guías principales (`muebles-resina-epoxica-guia`, `precio-mesa-resina-epoxica`, `que-es-mesa-rio`, `escoger-su-mesa`) **no enlazan de vuelta a `/es/luxury-furniture`** (0 `href` cada una).
- Los productos de mobiliario sólo se enlazan desde la home y desde el sitemap; `/es/products` **no renderiza ningún enlace a producto en el HTML del servidor** (0 `href` a `/es/product/`; el grid es client-side).

**4. Las fichas de mobiliario son delgadas y sin datos estructurados de producto.** Medido en 3 fichas:

| Ficha | Palabras | ₡ | `Product`/`Offer` |
|---|---:|---:|---|
| `rio-celeste-bar-counter` | 283 | 0 | No (sólo BreadcrumbList + LocalBusiness) |
| `pata-de-mesa-aureum` | 395 | 0 | No |
| `deep-ocean-m-oval-1` | 210 | 0 | No |

El doc de SEO explica la decisión: `Product` «sólo si hay precio o reseñas». Al no haber precio, Google no tiene motivo para dar snippet de producto ni para asociarlas a consultas de compra.

**5. Asimetría de cluster.** Pisos tiene 5 landings por provincia, calculadora, guía de precios, guía de costo por m², landings industrial y resina, y 8 productos. Muebles tiene 1 landing, 8 guías, 6 videos y 19 productos, pero **ninguna página por ciudad, ninguna calculadora y ninguna tabla de precios**. El cluster de pisos tiene más superficies de captura y más enlaces internos.

**6. La intención de búsqueda es distinta (hipótesis, no verificada).** «Pisos epóxicos Costa Rica» es una consulta de servicio local con intención de cotización. «Mesa río» / «mesa de resina» es una consulta de producto/diseño que suele vivirse en Instagram, Pinterest y Marketplace, no en Google. No tengo volúmenes de keywords para probarlo; lo que sí está medido es la asimetría: 1 sesión de Google al cluster de muebles contra 113 del sitio (mayoritariamente pisos).

**7. Lo que NO es la causa.**
- **El H1 poético no es el problema**: la landing de muebles usa «Arte funcional que transforma espacios» y la de pisos usa «El piso que tu espacio merece». Ambas son poéticas y la de pisos rankea. No es la explicación.
- **El slug en inglés tampoco**: `/es/epoxy-floors` también está en inglés y es la página que sostiene el sitio.
- **La falta de schema FAQ no es**: la landing de muebles ya tiene FAQPage y 8 respuestas.

**8. La indexación no está verificada.** La página es `index,follow`, tiene canonical y está en el sitemap, pero no tengo acceso a Search Console ni hay export en el repo. El doc de octubre decía «41 de 101 páginas indexadas»; hoy el sitemap tiene 138. Es posible que varias fichas de muebles estén en «Descubierta, sin indexar». **NO VERIFICADO.**

### 7.3 La pregunta correcta

No es «¿por qué no rankea esta página?». Es:

> **¿Existe demanda de muebles de resina en Google Costa Rica que justifique mantener este cluster?**

Cómo responderla con datos, en este orden:

1. Search Console → Rendimiento → filtrar por `/luxury-furniture`, `/guias/muebles-*`, `/guias/precio-mesa-*`, `/product/*` de mobiliario. Mirar **impresiones**, no clics.
2. Si el cluster suma **menos de ~100 impresiones/mes**, el problema es de demanda: el canal correcto es Instagram/Pinterest/Marketplace, y el SEO debe dejar de pedirle peras al olmo.
3. Si suma impresiones pero pocos clics, el problema es el título/snippet.
4. Si suma clics pero no WhatsApp, el problema es la oferta (precio, plazos, confianza).

---

## 8. Diagnóstico estructural del sitio

1. **Dependencia de una sola página.** 55 % de las entradas y 58 % de los visitantes pasan por `/es/epoxy-floors`. Si Google la mueve dos posiciones, se cae más de la mitad de la adquisición. No hay una segunda página que capture demanda a esa escala.
2. **Long tail muerta.** 31 productos y sólo 3 tuvieron visitas en 6 días; 17 guías y sólo 2 aparecen en el top. El sitemap tiene 138 URLs, pero el sitio vive de una.
3. **Mobile + WhatsApp, no e-commerce.** 66 % mobile, 19 % de los visitantes hacen clic a WhatsApp, y no hay un solo evento de carrito o compra. El checkout con PayPal existe, pero no se usa como embudo medible.
4. **La calculadora pierde 7 de 9.** Es la herramienta de mayor intención del sitio y no cierra el envío. Vale la pena instrumentar en qué paso se abandona.
5. **El loop de atribución está abierto.** Se sabe qué página genera el clic, pero no si el clic se volvió conversación. Sin eso, «lead» es una suposición.
6. **La categoría `/es/products` no existe para Googlebot.** Devuelve 0 enlaces a producto en el HTML del servidor. La home compensa con 20 enlaces, pero la página de catálogo no distribuye autoridad ni contexto.
7. **Desalineamiento catálogo ↔ adquisición.** La home muestra 14 productos de mobiliario y 6 de pisos; el search trae 94 % de vistas de pisos. La vitrina y el canal están apuntando a públicos distintos.

---

## 9. Plan recomendado

### P0 — esta semana / próximas dos

1. **Cerrar el loop `[ref]`.** Que el bot de WhatsApp lea `[ref: …]` del primer mensaje y lo guarde como origen de la conversación. Métrica nueva: conversaciones por página, no clics. Sin esto no se puede decidir nada más.
2. **Definir la política de precios de mobiliario.** Publicar un rango («mesa río desde ₡X», «barra desde ₡Y») o una fórmula por medidas. Si el dueño no quiere publicar precios, aceptar que el SEO no va a capturar las consultas de precio y mover el presupuesto de muebles a Instagram/Pinterest/Marketplace. La página no puede seguir diciendo «No publicamos precios» y esperar tráfico de «precio mesa río».
3. **Conectar el cluster de muebles.** En la landing: bloque «Guías» con las 8 guías y bloque «Piezas» con 6–8 productos. En cada guía: CTA a la landing y a la guía de precio. En cada ficha: enlace a la landing y a 2–3 piezas relacionadas. Hoy hay 0 enlaces en ambos sentidos.
4. **Search Console: indexación y queries del cluster.** Pedir indexación de las 8 guías y las 19 fichas; revisar «Descubierta, sin indexar» y «Rastreada, sin indexar». Si el problema es descubrimiento, el punto 3 lo arregla primero.

### P1 — primer mes

5. **Fichas de mobiliario con `Product` + `Offer`.** Cuando exista rango de precio, agregar `Product` con `offers` y `priceCurrency: CRC`. Sin precio, al menos `Product` con `brand`, `material`, `image` y `description`; no habrá rich result, pero el grafo queda completo.
6. **Calculadora de mesas.** Reusar el patrón de `FloorCalculator`: medidas + madera + acabado → rango en colones → WhatsApp con `ref=calculadora.muebles`. La calculadora de pisos se usa 9 veces en 6 días; la de muebles atacaría la objeción principal del cluster.
7. **Renderizar el catálogo en el servidor.** `/es/products` debe devolver los productos y sus enlaces en el HTML. Hoy es client-side y Googlebot ve una página vacía.
8. **Instrumentar carrito/checkout.** Si el e-commerce importa, eventos `add_to_cart`, `begin_checkout` y `purchase`. Si no importa, decirlo y medir solo WhatsApp.

### P2 — cuando lo anterior esté medido

9. **Slug `/es/muebles-de-resina` con 301.** Impacto bajo; hacerlo sólo con mapa de redirects y sin romper enlaces existentes.
10. **Reducir la dependencia de `/es/epoxy-floors`.** Enlazar desde ella a las 5 landings por provincia, a la calculadora y a las guías con anchors descriptivos. Medir el efecto en 30 días.
11. **Páginas de intención de mobiliario** («mesa río para comedor», «barra de resina para cocina», «escritorio de madera y resina») **sólo si GSC muestra impresiones**. Sin demanda probada, es contenido que nobody busca.

---

## 10. NO VERIFICADO

- Volúmenes de búsqueda de «muebles de resina», «mesa río» y «pisos epóxicos» en Costa Rica.
- Indexación real de las 138 URLs y estado de las fichas de mobiliario en Search Console.
- Conversaciones, cotizaciones y ventas generadas por los 37 clics a WhatsApp.
- Core Web Vitals: Umami tiene las columnas, pero no hay muestras.
- Si los 19 visitantes de China y 3 de Singapur son bots (probable, no confirmado).
- La ventana de 6 días cruza la migración de Vercel al VPS (19-oct) y no permite hablar de tendencia. El 24-oct bajó a 25 visitas y el 26 está incompleto.

---

## 11. Apéndice: método y evidencia

**Consultas a Umami** (base `analytics-db`, usuario `umami`, sin credenciales en el repo):

```sql
-- Totales
select count(*) as sessions from session
where website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4';

select count(distinct visit_id) as visits,
       count(*) filter (where event_type=1) as views
from website_event
where website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4';

-- Rebote: visitas con un solo evento
select count(*) filter (where ev=1) as bounces, count(*) as visits
from (select visit_id, count(*) as ev from website_event
      where website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4'
      group by 1) v;

-- WhatsApp por página y por ref
select e.url_path, d.string_value as ref, count(*) as clicks
from website_event e
left join event_data d on d.website_event_id=e.event_id and d.data_key='ref'
where e.website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4'
  and e.event_name='whatsapp_click'
group by 1,2 order by clicks desc;

-- Entradas por página
with firsts as (
  select distinct on (visit_id) visit_id, url_path
  from website_event
  where website_id='85f70de2-cdb2-4b5c-aa1b-66589e75feb4' and event_type=1
  order by visit_id, created_at
)
select url_path, count(*) from firsts group by 1 order by 2 desc;
```

**Verificación en vivo:**

- `curl -A "Googlebot" https://sobrepoxi.com/es/luxury-furniture`: 193.561 bytes, `<title>` con keywords, canonical propio, `robots: index, follow`, 1.202 palabras, 10 `<img>`, 3 enlaces `wa.me`, 0 `₡`, 0 enlaces a `/es/product/`, 0 enlaces a `/es/guias/*` (sólo `/es/guias`).
- `curl -A "Googlebot" https://sobrepoxi.com/es/product/rio-celeste-bar-counter`: 283 palabras, 0 `₡`, sin `Product`/`Offer`.
- `curl -A "Googlebot" https://sobrepoxi.com/es/products`: 0 enlaces a `/es/product/` en el HTML del servidor.
- `curl https://sobrepoxi.com/sitemap.xml`: 138 URLs; 31 productos, 17 guías, 6 videos, 5 landings por provincia.

**Archivos citados:**

- `src/shared/analytics/track.ts:9-10` — script e ID de Umami.
- `src/app/[locale]/layout.tsx:72-73` — script en el layout.
- `src/shared/contact/whatsapp.ts` — `buildWhatsAppUrl()` y `ref`.
- `src/shared/contact/WhatsAppClickTracker.tsx` — evento `whatsapp_click`.
- `src/features/content/presentation/components/WhatsAppBubble.tsx:20` — burbuja con `ref=burbuja.<página>`.
- `src/features/content/presentation/pages/landing/EpoxyFloorsPage.tsx:324,612` — CTA con `ref=pisos-epoxicos`.
- `src/features/content/presentation/pages/landing/LuxuryFurniturePage.tsx:167,273,466,490` — FAQ sin precios, CTA WhatsApp, enlace a `/guias`, CTA final.
- `src/features/content/presentation/components/NavbarClient.tsx:91` — enlace del navbar a muebles.
- `src/features/content/presentation/pages/home/OptimizedNew.tsx:279,305` — enlaces de la home a muebles.
- `src/app/sitemap.ts:63-72` — prioridades de muebles, resina, pisos y ciudades.
- `deploy/nginx/sobrepoxi.com.conf` — hosting y proxy a `127.0.0.1:3150`.
- `docs/SEO-2026-10-GOOGLE-Y-WHATSAPP.md` — diagnóstico y cambios de octubre (Search Console, CTAs, fichas, indexación).
