# SEO y flujo a WhatsApp — octubre 2026

Diagnóstico completo (Search Console, Vercel Analytics, HTML en vivo y conversaciones del bot):
https://claude.ai/artifact/HpgVEx5NZ4ct16C7dvdKA3

## Punto de partida (medido el 10–11 oct 2026)

- Search Console, 9 jul – 8 oct: 20,6 mil impresiones, 1,1 mil clics, posición media 5,1, CTR 5,3 %.
- Las fichas `black-sparkle-epoxy-floor` (2.157 impr., pos. 3,4, CTR 0,4 %) y `beige-gold-epoxy-floor`
  (1.207 impr., pos. 2,9, CTR 0,7 %) salían en Google como «Producto | SobrePoxi», sin h1 ni contenido en el HTML.
- Guías de costo por m² y de diseños: unas 700 impresiones cada una, CTR 0,6 %.
- Títulos con la marca dos veces («… | SobrePoxi | SobrePoxi»).
- Indexación: 41 de 101 páginas; 34 «descubierta, sin indexar».
- 0 eventos en Vercel Analytics: no se sabía qué página producía cada chat.
- «Consultar disponibilidad» en la ficha abría `wa.me/5068585000` (número con un dígito de menos).
- La grilla de productos mandaba a `+50684237555`, otro número.
- El botón principal de `/es/epoxy-floors` (54 % del tráfico) iba a `/contact`, no a WhatsApp.

## Cambios

| Área | Cambio | Archivo |
|---|---|---|
| WhatsApp | Número único y mensaje con `[ref: <página>]` | `src/shared/contact/whatsapp.ts` |
| Medición | Evento `whatsapp_click` con `ref` y `path` para todo enlace a wa.me | `src/shared/contact/WhatsAppClickTracker.tsx` |
| CTAs | Footer, portada, contacto, ciudades, San José, pisos, industrial, muebles, guías, burbuja, tarjeta, grilla y ficha usan el builder | ver diff |
| Landings | «Cotización gratuita» va directo a WhatsApp con contexto | `EpoxyFloorsPage`, `IndustrialEpoxyFlooringPage`, `LuxuryFurniturePage`, `GuidesIndexPage` |
| Fichas | Producto cargado en servidor: título, descripción, imagen OG, h1 en el HTML, BreadcrumbList y Product (solo si hay precio o reseñas) | `ProductDetailPage.tsx`, `application/product-by-name.ts`, `ProductDetail.tsx` |
| Títulos | Marca una sola vez (`title.absolute`); portada con título y descripción propios | `seoConfig.ts`, `app/[locale]/page.tsx` |
| Canonical | El layout ya no usa `x-invoke-pathname` ni hereda canonical `/es` a todas las páginas | `app/layout.tsx`, `app/[locale]/layout.tsx` |
| Indexación | `noindex` en carrito, checkout, login, registro, confirmación e historial; robots bloquea `/api/` y áreas privadas con prefijo de idioma | `app/[locale]/*/page.tsx`, `app/robots.ts` |
| Guías | Títulos y descripciones con la cifra de precio | `guides/data.ts` |
| Velocidad | `@vercel/speed-insights` | `app/[locale]/layout.tsx` |

## Verificación

- `pnpm typecheck` exit 0, `pnpm lint` exit 0, `pnpm build` exit 0.
- `next start` local, HTML pedido como Googlebot: la ficha devuelve título «Piso Epóxico Negro Sparkle · Piso epóxico en Costa Rica | SobrePoxi», h1 y BreadcrumbList; `/es/cart` con `noindex, nofollow`; enlaces de WhatsApp con `[ref: …]`.

## Pendiente

- Desplegar y pedir reindexación de las fichas y guías en Search Console. **NO VERIFICADO en producción.**
- Bot de Mauricio: leer `[ref: …]` del primer mensaje y guardarlo como origen de la conversación.
- Medir en 4 semanas el CTR de las fichas y guías y los eventos `whatsapp_click` por `ref`.
- Siguiente bloque (lleva diseño antes del código): landing «resina epóxica para pisos» y calculadora de m² que abre WhatsApp con los datos.
