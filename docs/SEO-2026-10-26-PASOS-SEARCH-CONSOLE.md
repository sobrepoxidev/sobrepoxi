# Pasos en Search Console — desbloquear la indexación

**Fecha:** 2026-10-26
**Objetivo:** que Google indexe `/es/resina-epoxica-para-pisos` (0 impresiones en 12 meses) y las fichas de piso, y que rastree de nuevo `/es/epoxy-floors` con el contenido nuevo.
**Por qué importa:** la familia «resina epóxica» tiene ~2.900 impresiones/año aterrizando en la página equivocada. La página construida para responderlas existe, devuelve 200, está en el sitemap y tiene canonical propio — simplemente nunca fue descubierta.

---

## Antes de empezar: una decisión pendiente

**No pidas indexación todavía de estas dos URLs:**

- `https://sobrepoxi.com/es/product/black-sparkle-epoxy-floor-interiors`
- `https://sobrepoxi.com/es/product/black-sparkle-epoxy-floor-category`

Son la misma pieza que `black-sparkle-epoxy-floor` (mismo nombre: «Piso Epóxico Negro Sparkle»), con contenido casi idéntico. Si pedís indexación de las tres, le estás pidiendo a Google que indexe un duplicado triple. Lo correcto es **301 de las dos variantes a `black-sparkle-epoxy-floor`** y recién después pedir el rastreo de la canónica.

---

## Paso 1 — Solicitar indexación (Inspección de URLs)

1. Abrí <https://search.google.com/search-console> y elegí la propiedad de `sobrepoxi.com`.
2. En la barra superior, donde dice **«Inspeccionar cualquier URL de …»**, pegá la URL **completa** (con `https://`, sin barra final).
3. Enter. Esperá el análisis: arriba te dice **«La URL está en Google»** o **«La URL no está en Google»**.
4. Si **no está**: arriba a la derecha, **«Probar URL en vivo»**. Esto hace un rastreo real en ese momento.
   - Confirmá que la respuesta es **200** y que el HTML tiene el contenido (pestaña *HTML de la página*).
   - Volvé a la vista normal y presioná **«Solicitar indexación»**.
5. Si **sí está**: no hace falta pedir indexación. Usá **«Probar URL en vivo»** igual para forzar un rastreo y confirmar que Google ve el contenido nuevo, y dejá que el rastreo normal la actualice.

**Cuota:** hay un límite de ~10–12 solicitudes por día por propiedad. El propio diálogo te dice cuántas te quedan. No repitas la solicitud para la misma URL en la misma semana: no acelera nada.

### Orden de las solicitudes

**Día 1 — lo que desbloquea el plan (7 URLs)**

| # | URL | Por qué |
|---|---|---|
| 1 | `https://sobrepoxi.com/es/resina-epoxica-para-pisos` | **La más importante.** 0 impresiones, ~2.900 en juego |
| 2 | `https://sobrepoxi.com/es/epoxy-floors` | Cambió hoy: precio en el hero, FAQ con cifra, 16 enlaces internos nuevos |
| 3 | `https://sobrepoxi.com/es/industrial-epoxy-flooring` | 0 impresiones; clúster en posición 34 |
| 4 | `https://sobrepoxi.com/es/guias/precios-pisos-epoxicos-costa-rica` | Tu tercera página por clics; hoy cambió el copy de visita técnica |
| 5 | `https://sobrepoxi.com/es/guias/costo-piso-epoxico-metro-cuadrado` | Cambió el copy |
| 6 | `https://sobrepoxi.com/es/guias/cuanto-cuesta-piso-epoxico-cochera` | Cambió el copy |
| 7 | `https://sobrepoxi.com/en/resina-epoxica-para-pisos` | Versión inglesa de la landing nueva |

**Día 2 — fichas de piso (5 URLs, después de resolver los duplicados)**

| # | URL |
|---|---|
| 8 | `https://sobrepoxi.com/es/product/black-sparkle-epoxy-floor` |
| 9 | `https://sobrepoxi.com/es/product/beige-gold-epoxy-floor` |
| 10 | `https://sobrepoxi.com/es/product/black-mirror-epoxy-floor` |
| 11 | `https://sobrepoxi.com/es/product/beige-gold-marble-epoxy-floor` |
| 12 | `https://sobrepoxi.com/es/product/piso-epoxico-rojo-magma` |
| 13 | `https://sobrepoxi.com/es/product/shell-reef-terrace-floor` |

> El reparto en dos días es por la cuota diaria. Si tenés cuota, hacé las 13 el mismo día.

### Qué NO pedir

- `https://sobrepoxi.com/es/guias/precios-epoxicos-costa-rica`
- `https://sobrepoxi.com/es/guias/pisos-epoxicos-costa-rica`
- `https://sobrepoxi.com/es/guias/precios-pisos-pisos-epoxicos-costa-rica`
- `https://sobrepoxi.com/es/guias/precios-pisos-epoxicos-costarica`
- `https://sobrepoxi.com/es/guias/pisos-epoxicos-industriales-bodegas`

Las cinco devuelven **HTTP 200 con «Página no encontrada»** (soft 404). Una de ellas tiene 144 impresiones. Pedir indexación acá empeora el problema: primero hay que hacer que devuelvan **404 real** o **301** a la página correcta. Es el ítem 4 de la ola 1 del plan.

---

## Paso 2 — Reenviar el sitemap

1. Menú izquierdo → **Indexación** → **Sitemaps**.
2. En «Añadir un sitemap nuevo», escribí `sitemap.xml` y **Enviar**.
3. Verificá: **Estado = Correcto** y **URL descubiertas = 138**.

Reenviar uno existente no lo duplica: fuerza a Google a releerlo. Sirve porque hoy el `lastmod` de las 138 URLs dice «ahora» en cada visita, así que Google lo ignora; cuando se arregle (§4.6 del plan) el `lastmod` vuelve a ser útil.

---

## Paso 3 — Mirar el informe de Páginas (esto es el diagnóstico real)

**Indexación → Páginas.** Ahí está la respuesta a «por qué no aparece».

| Motivo que vas a ver | Qué significa | Qué hacer |
|---|---|---|
| **Descubierta, actualmente sin indexar** | Google conoce la URL por el sitemap o un enlace, pero no la ha rastreado | Es lo esperable para la landing de resina. Los enlaces internos nuevos + la solicitud de indexación lo resuelven |
| **Rastreada, actualmente sin indexar** | La rastreó y decidió no indexarla | Revisar contenido duplicado o delgada. En fichas de piso, probable duplicado |
| **Duplicada, Google eligió una versión canónica diferente** | Hay dos URLs con el mismo contenido | El caso de las tres «Black Sparkle» |
| **Soft 404** | Devuelve 200 pero la página está vacía («Página no encontrada») | Las 5 guías fantasma |
| **Excluida por etiqueta noindex** | Tiene `noindex` | Esperable en carrito, checkout, cuenta y producto inexistente |

Filtrá por `/es/product/` y por `/es/guias/` para ver el estado ficha por ficha. **Anotá el 30-oct cuántas URLs hay en cada motivo**: es la línea base para medir si el plan funciona.

---

## Paso 4 — Verificar que Google ve el contenido nuevo

Con `/es/epoxy-floors` en Inspección de URLs → **«Ver HTML de la página rastreada»** (o «Probar URL en vivo»), comprobá que aparezcan:

- `Sistema estándar de 5 mm · ₡75.000 – ₡96.100 por m² instalado` (hero)
- `El sistema estándar de SobrePoxi es de 5 mm` (FAQ)
- `¿La visita técnica tiene costo?` (FAQ nueva)
- 16 enlaces internos de contenido (6 guías, 3 sistemas, 6 fichas, calculadora)

Si el HTML rastreado no los tiene, Google está sirviendo una copia vieja: esperá el próximo rastreo y, si a los 7 días sigue igual, revisá la caché de nginx y el `pm2` del VPS.

---

## Paso 5 — Medir a 7, 30 y 60 días

**Rendimiento → Resultados de búsqueda.** Filtros útiles:

- **Página** = `https://sobrepoxi.com/es/resina-epoxica-para-pisos` → impresiones deben pasar de 0 a >0 en ~7 días, y la posición media debe quedar < 12.
- **País** = Costa Rica → el KPI primario del plan (hoy ~180 clics/mes).
- **Consulta** = `resina epoxica costa rica` → hoy posición 7,31 con 2,91 % de CTR.

**Criterio de corte a 30 días:** si la landing de resina sigue con 0 impresiones después de la solicitud y de los enlaces internos, el problema no es de contenido: es de canalización de autoridad o de rastreo, y hay que parar y diagnosticar antes de escribir una línea más.

---

## Recordatorio de la única cosa que no se puede hacer desde acá

El informe de **Conversiones** no existe: no hay eventos de carrito ni de compra, y el clic a WhatsApp no se convierte en «conversación» hasta que el bot de Mauricio lea el `[ref: …]` del primer mensaje y lo guarde. Mientras eso no exista, Search Console te va a decir cuántos clics ganaste, no cuántos clientes.
