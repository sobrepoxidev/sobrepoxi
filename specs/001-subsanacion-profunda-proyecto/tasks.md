---
description: "Task list for feature 001-subsanacion-profunda-proyecto"
---

# Tasks: Subsanación Profunda + Migración a Clean Architecture por Features

**Input**: Design documents from `specs/001-subsanacion-profunda-proyecto/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Vitest/Playwright están **fuera del alcance** del feature 001 (decisión Q5 de Clarification 2026-05-09). La verificación se sostiene en `pnpm lint` (incluye boundaries), `pnpm typecheck`, `pnpm build` y los smoke tests manuales documentados en [quickstart.md §3](./quickstart.md). Cada tarea declara su(s) verificación(es).

**Organization**: Tareas agrupadas por user story de la spec. US1, US2, US3 son P1 estructurales; US4 es P1 de seguridad y va primero por impacto/urgencia; US5 y US6 son P2 transversales y se intercalan + cierran al final.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: paralelizable (archivos distintos, sin dependencias bloqueantes)
- **[Story]**: USx para tareas de fase de user story; sin label en Setup/Foundational/Polish

## Path Conventions

- Layout destino: `src/features/<feature>/{domain,application,infrastructure,presentation}` + `src/app/` (solo routing) + `src/shared/` (transversal)
- Alias `@/*` → `src/*` (ya configurado en `tsconfig.json`)
- Gestor de paquetes: `pnpm`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Tooling, dependencias, scaffolds y scripts. Cero impacto funcional. Sin label de story.

- [ ] T001 Añadir script `typecheck` a `package.json` (`"typecheck": "tsc --noEmit"`); verificar `pnpm typecheck` corre limpio sobre el código actual (linea base).
- [ ] T002 Instalar dependencias `tailwind-merge`, `zod` y devDependency `eslint-plugin-boundaries`: `pnpm add tailwind-merge zod && pnpm add -D eslint-plugin-boundaries`. Confirmar `pnpm install --frozen-lockfile` exitoso.
- [ ] T003 [P] Crear scaffolds vacíos por feature con `.gitkeep` en `src/features/{products,cart,checkout,auth,account,admin,notifications,content,currency}/{domain,application,infrastructure,presentation}/.gitkeep` y barrel inicial `src/features/<f>/index.ts` con contenido `export {};`.
- [ ] T004 [P] Crear scaffolds vacíos `src/shared/{supabase,i18n,seo,ui,types,utils}/.gitkeep`.
- [ ] T005 [P] Crear `.env.example` (si no existe) con las variables documentadas en [quickstart.md §1](./quickstart.md): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `EMAIL_USER`, `EMAIL_PASS`, `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_LIVE_CLIENT_ID`, `PAYPAL_LIVE_SECRET`, `PAYPAL_USE_MOCK=0`, `ADMIN_EMAILS`. Marcar `NEXT_PUBLIC_PAYPAL_CLIENT_ID` como "verificar uso real".
- [ ] T006 Configurar `eslint-plugin-boundaries` y `no-restricted-imports` en `eslint.config.mjs` siguiendo [contracts/boundaries.config.md](./contracts/boundaries.config.md). Severidad inicial: `warn` (se eleva a `error` en T070). Verificación: `pnpm lint` ejecuta sin errores nuevos sobre el código actual (los warnings esperados son los imports legacy hacia `src/lib/*` y `src/components/*`).

**Checkpoint Phase 1**: `pnpm install`, `pnpm typecheck`, `pnpm build` y `pnpm lint` pasan en limpio (warnings de boundaries esperados pero no errores).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Consolidar `shared/` (Supabase clients, i18n, SEO, utils, types, ui primitives). Bloquea la migración de cualquier feature porque casi toda feature consume `shared`. Sin label de story (cubre US2 estructural y desbloquea US3).

**⚠️ CRITICAL**: Ninguna fase US3 (D1-D8) puede iniciar hasta que esta fase cierre.

### Supabase consolidado en `shared`

- [ ] T007 Crear `src/shared/supabase/server.ts` con `createServerSupabaseClient()` basado en `@supabase/ssr` (consolidar lo que hoy está en `src/utils/supabase/server.ts`). Mantener compatibilidad de firma (async, lee cookies).
- [ ] T008 Crear `src/shared/supabase/client.ts` con `createBrowserSupabaseClient()` basado en `@supabase/ssr` (usa `createBrowserClient`).
- [ ] T009 Crear `src/shared/supabase/middleware.ts` con `createMiddlewareSupabaseClient(req, res)` basado en `@supabase/ssr`.
- [ ] T010 Refactorizar `src/middleware.tsx` para usar `createMiddlewareSupabaseClient` desde `@/shared/supabase/middleware`. Mantener el matcher actual y el flujo de www→non-www. Smoke: `pnpm dev`, navegar `/`, cambiar locale, login con cuenta real, verificar `auth.getSession()` válido en server components.

### Tipos compartidos

- [ ] T011 [P] Mover `src/types-db.ts` → `src/shared/types/database.ts`. Dejar shim en `src/types-db.ts` con `export * from "@/shared/types/database";` y comentario `// TODO(speckit): shim temporal — eliminar al cierre del feature`.

### Utils compartidos

- [ ] T012 [P] Crear `src/shared/utils/cn.ts` con `clsx` + `tailwind-merge`: `import { clsx } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }`. Reescribir `src/lib/utils.ts` para reexportar desde el nuevo path: `export { cn } from "@/shared/utils/cn";` con comentario shim.
- [ ] T013 [P] Mover `src/lib/formatCurrency.ts` → `src/shared/utils/formatCurrency.ts`. Shim en la ubicación antigua.

### i18n compartido

- [ ] T014 [P] Mover `src/i18n/{routing,navigation,request}.tsx` → `src/shared/i18n/`. Actualizar `src/middleware.tsx`, `next.config.ts` y cualquier consumidor del barrel `next-intl` para apuntar a `@/shared/i18n/routing`. Shim en ubicaciones antiguas.

### SEO compartido

- [ ] T015 [P] Mover `src/lib/{seo,seoConfig,structuredData}.ts` → `src/shared/seo/`. Shims en ubicaciones antiguas. Verificar que `src/app/[locale]/layout.tsx` sigue importando `buildMetadata` correctamente (vía shim o vía nuevo path).

### UI primitives compartidos

- [ ] T016 [P] Mover `src/components/ui/tabs.tsx` → `src/shared/ui/tabs.tsx`. Shim.
- [ ] T017 [P] Mover `src/components/ScrollToTopButton.tsx` → `src/shared/ui/ScrollToTopButton.tsx`. Shim.
- [ ] T018 [P] Mover `src/components/{LocaleSwitcher,LocaleSwitcherSelect}.tsx` → `src/shared/ui/locale-switcher/{LocaleSwitcher,LocaleSwitcherSelect}.tsx`. Shim.
- [ ] T019 [P] Mover `src/components/Carousel/*` (genérico) → `src/shared/ui/carousel/`. Shims.

**Checkpoint Phase 2**: `pnpm lint`, `pnpm typecheck`, `pnpm build` verdes. Smoke test mínimo: `pnpm dev`, home renderiza, navbar funciona, locale switch funciona. La eliminación final de shims ocurre en Phase 9 (Polish).

---

## Phase 3: User Story 4 — Endurecimiento de seguridad básica (Priority: P1) 🛡️ MVP

**Goal**: Cerrar todos los hallazgos de severidad CRITICAL/HIGH antes de mover archivos. Esta fase es la primera fase US porque los hallazgos críticos (relay SMTP abierto, mocks PayPal silenciosos, falta de validación de owner) son riesgo activo en producción.

**Independent Test**: Ejecutar [quickstart.md §4 — Checklist de seguridad](./quickstart.md): cero secretos en bundle cliente, endpoints `/api/paypal/*` rechazan sin sesión, `/api/convert` valida input, `/api/send-email` exige auth + same-origin, `AUTHORIZED_ADMINS` no aparece en código.

### T-Sec-1: Cerrar relay abierto `/api/send-email` (F-001)

- [X] T020 [US4] Añadir validación `zod` en `src/app/api/send-email/route.ts`: schema `{ subject: string, html: string, to: string }` con `to` validado contra whitelist (email del usuario autenticado o `COMPANY_EMAIL`).
- [X] T021 [US4] Añadir verificación de sesión en `src/app/api/send-email/route.ts`: usar `createServerSupabaseClient()` de `@/shared/supabase/server`; si `session === null` → 401 sin filtrar detalle.
- [X] T022 [US4] Añadir verificación same-origin en `src/app/api/send-email/route.ts`: comparar header `Origin` o `Referer` con `process.env.NEXT_PUBLIC_SITE_URL` / host actual; rechazar 403 si no coincide.
- [X] T023 [US4] Añadir logging de callers en `src/app/api/send-email/route.ts`: registrar `{timestamp, origin, userId, to, subject}` en consola server (formato JSON una línea). Este log alimenta la decisión de eliminación en T-Notif (Phase 4 / D2).
- [X] T024 [US4] Manejo de error genérico en `src/app/api/send-email/route.ts`: cualquier excepción devuelve `{ error: "Internal error" }` con status 500; el detalle queda en `console.error`. Verificación: `curl -X POST .../api/send-email` sin sesión → 401; con sesión y `to` no permitido → 400.

### T-Sec-2: Cerrar `/api/send-order-email` (F-002)

- [X] T025 [US4] Añadir schema `zod` para input en `src/app/api/send-order-email/route.ts` (todos los campos: `orderId`, `customerName`, `shippingAddress`, `items`, `subtotal`, `shipping`, `total`, `paymentMethod`, `discountInfo?`, `userEmail`).
- [X] T026 [US4] Añadir verificación de sesión en `src/app/api/send-order-email/route.ts`; obtener `session.user.id` y validar que `orders.user_id === session.user.id` para el `orderId` recibido. Si no, 403.
- [X] T027 [US4] Añadir same-origin + logging idéntico al de `/api/send-email`. Reemplazar el `fetch('/api/send-email', ...)` por llamada directa a una función helper local en el mismo archivo (refactor full a server action ocurre en T-Notif).
- [X] T028 [US4] Manejo de error genérico en `src/app/api/send-order-email/route.ts`. Verificación: con sesión válida pero `orderId` ajeno → 403; sin sesión → 401.

### T-Sec-3: Eliminar mock fallbacks silenciosos de PayPal (F-004)

- [ ] T029 [US4] Refactorizar `src/app/api/paypal/paypalHelpers.ts`: los fallbacks a `createMockPayPalOrder` y a la captura mock solo se ejecutan si `process.env.PAYPAL_USE_MOCK === '1'` (no por `NODE_ENV`). Si la condición no se cumple, propagar el error original.
- [ ] T030 [US4] Documentar `PAYPAL_USE_MOCK` en `.env.example` (si T005 no lo añadió ya). Verificación: en preview Vercel sin `PAYPAL_USE_MOCK`, simular fallo de credencial → endpoint devuelve 500 con mensaje genérico, NO actualiza BD.

### T-Sec-4: Renombrar variables de entorno PayPal server-only (F-005)

- [ ] T031 [US4] En `src/app/api/paypal/paypalHelpers.ts`, sustituir `process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID` → `process.env.PAYPAL_CLIENT_ID` y `process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` → `process.env.PAYPAL_LIVE_CLIENT_ID`.
- [ ] T032 [US4] Buscar usos de `NEXT_PUBLIC_PAYPAL_CLIENT_ID` en `src/components/checkout/*` (lado cliente del SDK PayPal). Si se usa en `<PayPalScriptProvider>`, mantener un alias **separado** `NEXT_PUBLIC_PAYPAL_CLIENT_ID` SOLO para el cliente (mismo valor pero variable distinta). Si no se usa, eliminar la dependencia. Documentar en `.env.example`.
- [ ] T033 [US4] Coordinar con ops para setear `PAYPAL_CLIENT_ID` y `PAYPAL_LIVE_CLIENT_ID` en Vercel **antes** de mergear este PR. Verificación post-deploy: `pnpm build && grep -rE "(PAYPAL_(LIVE_)?SECRET)" .next/static` → 0 matches; `grep -rE "PAYPAL_(LIVE_)?CLIENT_ID" .next/server/app` permitido (server bundle), `.next/static` vacío.

### T-Sec-5: Validar owner en `/api/paypal/{create,capture}-order` (F-003)

- [ ] T034 [US4] En `src/app/api/paypal/create-order/route.ts`, sustituir el cliente Supabase singleton por `createServerSupabaseClient()` de `@/shared/supabase/server`. Obtener `session`; si null → 401. Tras leer la orden, validar `orderData.user_id === session.user.id`; si no, 403 sin filtrar.
- [ ] T035 [US4] Añadir schema `zod` para input `{ orderId: number }`.
- [ ] T036 [US4] En `src/app/api/paypal/capture-order/route.ts`, mismo patrón: cliente server, sesión obligatoria, validar owner del `orderId`. Adicionalmente verificar que el `paypalOrderId` recibido se generó para esa `orderId` (consultar columna intermedia o tabla de mapping; si no existe, registrar advertencia y abrir tarea de schema en Phase 9).
- [ ] T037 [US4] Añadir schema `zod` para input `{ paypalOrderId: string, orderId: number }` en `capture-order`.
- [ ] T038 [US4] Reemplazar mensajes de error que devuelven `error.message` de proveedor externo por mensajes genéricos en ambos endpoints PayPal. Mantener detalle en `console.error` server-only. Verificación: smoke test sandbox PayPal completo (login, agregar al carrito, checkout, pago); intento de capturar orden con `orderId` ajeno → 403.

### T-Sec-6: Validación de input en `/api/convert` (F-012)

- [ ] T039 [US4] En `src/app/api/convert/route.ts`, añadir `zod` schema para query params: `amount` ∈ `[0.01, 1_000_000]`, `to` ∈ `["CRC", "EUR"]` (whitelist; ampliar si se confirman más monedas soportadas en el proveedor). Errores → 400 con mensaje genérico (`"Invalid query"`). Mantener `Cache-Control: s-maxage=1800`.

### T-Sec-7: `ADMIN_EMAILS` env + centralizar `requireAdmin` (F-007)

- [ ] T040 [US4] Crear helper temporal `src/lib/admin-guard.ts` (o ubicar inline; el uso definitivo en feature `admin` ocurre en T-Adm) con `function requireAdmin(): Promise<{ userId: string; email: string }>` que lee `ADMIN_EMAILS` (split por coma), obtiene sesión vía `createServerSupabaseClient`, y redirige a `/[locale]` si el email no está en la lista. Helper reutilizable desde `src/app/[locale]/admin/{page,products/page,events/page}.tsx`.
- [ ] T041 [US4] Reemplazar la constante `AUTHORIZED_ADMINS` y la lógica inline en `src/app/[locale]/admin/page.tsx` por una llamada a `requireAdmin()`.
- [ ] T042 [US4] Aplicar `requireAdmin()` a `src/app/[locale]/admin/products/page.tsx` y `src/app/[locale]/admin/events/page.tsx` para cubrir las sub-rutas con la misma garantía. Confirmar que ningún archivo bajo `src/` contiene la string `AUTHORIZED_ADMINS` (`git grep "AUTHORIZED_ADMINS"` → 0).
- [ ] T043 [US4] Coordinar con ops para setear `ADMIN_EMAILS=email1@dom,email2@dom,...` en Vercel **antes** de mergear este PR. Smoke test: login como admin actual entra al panel; login como usuario normal redirige a home.

**Checkpoint Phase 3 / US4**: ejecutar [quickstart.md §4 — Checklist de seguridad](./quickstart.md) completo. Si todos los items pasan, US4 entrega y la feature puede proceder a movimientos estructurales.

---

## Phase 4: User Story 3 — Migración incremental por features (Priority: P1) 🚚

**Goal**: Mover el código actual a `src/features/<f>/{domain,application,infrastructure,presentation}` siguiendo el mapping declarado en [data-model.md §1](./data-model.md), feature por feature, con shims temporales hasta cierre. Cada bloque (T-Curr/T-Notif/...) deja el proyecto verde y demostrable.

**Independent Test**: Tras cada bloque de feature, ejecutar el smoke test correspondiente de [quickstart.md §3](./quickstart.md) y confirmar que el comportamiento del sitio no cambió.

### T-Curr — Feature `currency` (prototipo del flujo)

- [ ] T044 [US3] Crear `src/features/currency/application/use-cases/convertUsd.ts` moviendo la lógica de `src/lib/convert-core.ts` (función `convertUsd`). Definir tipo `ConversionResult` según [contracts/feature-currency.api.md](./contracts/feature-currency.api.md).
- [ ] T045 [US3] Crear `src/features/currency/application/schemas/convertQuery.ts` con schema `zod` `convertQuerySchema` (ya añadido en T039 de forma inline; consolidar aquí y referenciar).
- [ ] T046 [P] [US3] Mover `src/components/CurrencyConverterRow.tsx` → `src/features/currency/presentation/CurrencyConverterRow.tsx`. Shim en ubicación antigua re-exportando.
- [ ] T047 [US3] Adelgazar `src/app/api/convert/route.ts`: el handler valida con `convertQuerySchema`, llama a `convertUsd` desde `@/features/currency`, serializa respuesta. Retirar lógica de proveedor externo del handler.
- [ ] T048 [US3] Crear barrel `src/features/currency/index.ts` exportando `convertUsd`, `CurrencyConverterRow`, `ConversionResult`, `convertQuerySchema`. Shim en `src/lib/convert-core.ts`.
- [ ] T049 [US3] Smoke: `GET /api/convert?amount=100&to=CRC` → respuesta correcta; `?amount=10&to=XXX` → 400. `pnpm lint`, `pnpm typecheck`, `pnpm build` verdes.

### T-Notif — Feature `notifications`

- [ ] T050 [US3] Crear `src/features/notifications/infrastructure/transport/nodemailer.ts` con función `sendMail({to, subject, html})` que encapsula la creación del transporter Gmail (server-only). Lee `EMAIL_USER`/`EMAIL_PASS` de env solo aquí.
- [ ] T051 [US3] Mover `src/lib/orderConfirmationEmail.ts` → `src/features/notifications/application/templates/order-confirmation.ts`. Renombrar export a `renderOrderConfirmationHtml`. Shim en ubicación antigua.
- [ ] T052 [US3] Crear `src/features/notifications/application/templates/contact.ts` con `renderContactHtml` extraído del HTML inline en `src/actions.ts`.
- [ ] T053 [US3] Crear `src/features/notifications/application/schemas/index.ts` con `sendOrderEmailInputSchema` y `contactFormSchema` (`zod`).
- [ ] T054 [US3] Crear server action `src/features/notifications/application/actions/sendOrderConfirmationEmail.ts` con directiva `"use server"`. Valida con schema, valida sesión + ownership de orden, llama a `renderOrderConfirmationHtml` y `sendMail`. Devuelve `{ success: boolean; error?: string }`.
- [ ] T055 [US3] Crear server action `src/features/notifications/application/actions/sendContactEmail.ts` con `"use server"`. Valida con `contactFormSchema`. Llama a `renderContactHtml` y `sendMail` para `info@sobrepoxi.com` (constante `COMPANY_EMAIL` server-only). Devuelve `{ success, error? }`.
- [ ] T056 [US3] Refactorizar `src/actions.ts` (raíz): eliminar `"use client"`, eliminar la construcción inline de HTML, eliminar `fetch('/api/send-email')`, y reemplazar `handleVacationForm` por una invocación directa a `sendContactEmail` desde `@/features/notifications`. La función reside ahora en `src/features/notifications/application/actions/sendContactEmail.ts`; en `src/actions.ts` solo queda un shim que reexporta o se elimina si no hay consumidores. Localizar consumidor (probablemente `FormMail` o `contact/page.tsx`) y actualizar el import.
- [ ] T057 [US3] Decisión-punto T-Notif: revisar logs introducidos en T-Sec-1/T-Sec-2 (≥1 sprint corrido). Si los logs muestran cero callers externos → eliminar `src/app/api/send-email/route.ts` y `src/app/api/send-order-email/route.ts`; sustituir todo consumidor interno por las server actions. Si hay callers externos legítimos → mantener los endpoints como API interna autenticada permanente y dejar este sub-task documentado en el commit como "no eliminar". Cualquier otro caso bloquea cierre de T-Notif hasta resolver.
- [ ] T058 [US3] Crear barrel `src/features/notifications/index.ts` exportando `sendOrderConfirmationEmail`, `sendContactEmail`, `renderOrderConfirmationHtml`, schemas. Shim en `src/lib/orderConfirmationEmail.ts`.
- [ ] T059 [US3] Smoke: enviar formulario de contacto → correo recibido en `info@sobrepoxi.com`; checkout exitoso → correo de confirmación. Si T057 eliminó endpoints, `curl /api/send-email` → 404.

### T-Prod — Feature `products` (volumen alto, riesgo bajo)

- [ ] T060 [US3] Mover `src/lib/hooks/useProducts.ts` → `src/features/products/application/hooks/useProducts.ts`. Reemplazar el import del singleton `supabase` por `createBrowserSupabaseClient()` de `@/shared/supabase/client`. Shim.
- [ ] T061 [US3] Mover `src/lib/productsDistributor.ts` → `src/features/products/application/distribute.ts`. Renombrar export `distribuirProductos` → `distributeProducts` (manteniendo el nombre legible). Shim que reexporta con nombre antiguo y nuevo durante la migración.
- [ ] T062 [P] [US3] Mover `src/lib/categories.ts` → `src/features/products/application/categories.ts`. Shim.
- [ ] T063 [P] [US3] Mover `src/lib/search.ts` → `src/features/products/application/search.ts`. Shim.
- [ ] T064 [P] [US3] Mover `src/lib/viewedHistory.ts` → `src/features/products/application/viewed-history.ts`. Shim.
- [ ] T065 [US3] Crear use cases en `src/features/products/application/use-cases/`: `getProductById.ts`, `getProductsByIds.ts`, `searchProducts.ts`, `listFeaturedProducts.ts`, `getCategories.ts`. Cada uno usa `createServerSupabaseClient()` o `createBrowserSupabaseClient()` según contexto (server-action vs hook).
- [ ] T066 [P] [US3] Mover `src/components/products/*` (15 archivos) → `src/features/products/presentation/components/`. Mantener un re-export shim por archivo en `src/components/products/<file>.tsx` durante la transición. Después de migrar, los consumidores en pages se actualizan en T072.
- [ ] T067 [P] [US3] Mover `src/components/cards/*` (9 archivos) → `src/features/products/presentation/components/cards/`. Shims.
- [ ] T068 [P] [US3] Mover `src/components/search/*` → `src/features/products/presentation/components/search/`. Shims.
- [ ] T069 [P] [US3] Mover `src/components/providers/ProductsProvider.tsx` → `src/features/products/presentation/providers/ProductsProvider.tsx`. Shim.
- [ ] T070 [P] [US3] Mover `src/context/ProductsContext.tsx` → `src/features/products/presentation/state/ProductsContext.tsx`. Shim.
- [ ] T071 [US3] Crear barrel `src/features/products/index.ts` exportando: tipos `Product`, `Category`, use cases, componentes públicos, hook `useProductsContext`, providers (según [contracts/feature-products.api.md](./contracts/feature-products.api.md)).
- [ ] T072 [US3] Actualizar consumidores en `src/app/[locale]/{products,product/[id],search}/page.tsx` para importar desde `@/features/products` (no deep-imports). Eliminar imports a `src/components/products/*` y `src/lib/hooks/useProducts.ts`.
- [ ] T073 [US3] Smoke: `/[locale]/products` lista paginada; filtrar por categoría; abrir detalle; búsqueda; related products. `pnpm lint/typecheck/build` verdes.

### T-Cart — Feature `cart`

- [ ] T074 [US3] Extraer `encodeCartToBase64` y `decodeCartFromBase64` de `src/context/CartContext.tsx` a `src/features/cart/application/encode.ts` (puro, sin React).
- [ ] T075 [US3] Crear use case `src/features/cart/application/use-cases/rebuildCartFromIds.ts` que invoca `getProductsByIds` desde `@/features/products` (eliminando el query directo a `supabase` que hoy hace `CartContext`).
- [ ] T076 [US3] Crear use case `src/features/cart/application/use-cases/syncCartWithDB.ts` que centraliza la lógica de sync con la tabla `cart_items` (hoy es placeholder; mantener placeholder pero ubicarlo en feature).
- [ ] T077 [US3] Mover `src/context/CartContext.tsx` → `src/features/cart/presentation/state/CartContext.tsx`. Refactorizar internamente: importar `encodeCartToBase64`/`decodeCartFromBase64` desde `application/encode`; importar `rebuildCartFromIds` desde `application/use-cases`; eliminar import del singleton `supabase`. Resolver el `useEffect` complejo (F-016) dividiéndolo en dos hooks pequeños: uno para hidratar desde URL al mount, otro para reflejar cambios del cart en la URL.
- [ ] T078 [US3] Crear barrel `src/features/cart/index.ts` exportando `CartProvider`, `useCart`, `CartItem`, `encodeCartToBase64`, `decodeCartFromBase64`, `rebuildCartFromIds`. Shim en `src/context/CartContext.tsx`.
- [ ] T079 [US3] Actualizar consumidores: `src/app/[locale]/layout.tsx` (CartProvider), `src/app/[locale]/cart/page.tsx`, componentes que usan `useCart`. Eliminar deep imports.
- [ ] T080 [US3] Smoke: agregar 2 productos, recargar con `?cart=...` reconstruye carrito, login mantiene cart, limpiar cart libera URL.

### T-Cont — Feature `content` (landings, guías, vcard, home composer, layout)

- [ ] T081 [US3] Mover `src/lib/guidesContent.ts` → `src/features/content/application/guides/data.ts`. Crear use cases `getGuides(locale)` y `getGuideBySlug(locale, slug)` en `src/features/content/application/guides/`.
- [ ] T082 [US3] Mover `src/app/[locale]/HomePageData.tsx` → `src/features/content/application/use-cases/getHomePageData.ts`. Internamente, `getHomePageData` invoca `listFeaturedProducts` y `getCategories` desde `@/features/products` (no más query directo a Supabase desde aquí).
- [ ] T083 [P] [US3] Mover `src/app/[locale]/HomeContainer.tsx` → `src/features/content/presentation/Home.tsx`. Adaptar imports.
- [ ] T084 [P] [US3] Mover `src/components/home/*` (Banner, ProductCategoriesBanner, OptimizedNew, banner/*) → `src/features/content/presentation/home/`. Shims. **Excepción**: `AddToCartButton.tsx` se mueve a `src/features/cart/presentation/components/AddToCartButton.tsx` (consume `useCart`); registrar shim en home si hace falta.
- [ ] T085 [P] [US3] Mover `src/components/general/{Navbar,NavbarClient,Footer,WhatsAppBubble}.tsx` → `src/features/content/presentation/layout/`. Shims.
- [ ] T086 [P] [US3] Mover `src/components/general/FormMail.tsx` → `src/features/notifications/presentation/FormMail.tsx` (usa `sendContactEmail`). Shim.
- [ ] T087 [P] [US3] Mover `src/app/[locale]/guias/{page.tsx,GuidesGrid.tsx,[slug]/page.tsx}` — el `GuidesGrid` componente va a `src/features/content/presentation/guides/GuidesGrid.tsx`; las pages quedan en `app/` como composición delgada que importa de `@/features/content`.
- [ ] T088 [P] [US3] Mover `src/app/[locale]/vcard/{FormVCard.tsx}` → `src/features/content/presentation/vcard/VCardForm.tsx`. Mover `src/app/[locale]/vcard/actions.ts` → `src/features/content/application/actions/createVCard.ts`. Refactorizar para usar `createServerSupabaseClient()` de shared. Shim.
- [ ] T089 [US3] Adelgazar todas las páginas de contenido en `src/app/[locale]/{about,conditions-service,contact,epoxy-floors,industrial-epoxy-flooring,luxury-design-flooring,luxury-furniture,privacy-policies,qr,shipping}/page.tsx` para que solo importen componentes/use cases desde `@/features/content` y, donde apliquen, `@/features/notifications` (formulario de contacto).
- [ ] T090 [US3] Crear barrel `src/features/content/index.ts` exportando: `Home`, `Navbar`, `Footer`, `WhatsAppBubble`, `GuidesGrid`, `VCardForm`, `getHomePageData`, `getGuides`, `getGuideBySlug`, `createVCard`, schemas (según [contracts/feature-content.api.md](./contracts/feature-content.api.md)).
- [ ] T091 [US3] Smoke: home renderiza categorías y carruseles; cambio de locale; `/guias` lista guías; `/guias/[slug]` renderiza una guía; `/vcard` crea registro en `vcards`; formulario de contacto envía correo.

### T-Acc — Feature `account`

- [ ] T092 [P] [US3] Mover `src/components/account/*` → `src/features/account/presentation/components/`. Shims.
- [ ] T093 [P] [US3] Mover `src/components/user/UserDropdown.tsx` → `src/features/account/presentation/components/UserDropdown.tsx`. Shim.
- [ ] T094 [US3] Crear use cases en `src/features/account/application/use-cases/`: `getUserProfile`, `updateUserProfile`, `listUserAddresses`, `addUserAddress`, `listUserOrders`. Todas usan `createServerSupabaseClient()` y validan sesión.
- [ ] T095 [US3] Crear barrel `src/features/account/index.ts` exportando componentes y use cases públicos.
- [ ] T096 [US3] Adelgazar `src/app/[locale]/account/page.tsx` y `src/app/[locale]/viewed-history/page.tsx` para importar desde `@/features/account` y `@/features/products` respectivamente.
- [ ] T097 [US3] Smoke: ver perfil, agregar dirección, ver órdenes solo del usuario logueado.

### T-Adm — Feature `admin`

- [ ] T098 [P] [US3] Mover `src/components/admin/{AdminDashboard,ProductEditor}.tsx` → `src/features/admin/presentation/components/`. Shims.
- [ ] T099 [US3] Mover `requireAdmin` (helper temporal de T040) → `src/features/admin/application/use-cases/requireAdmin.ts` con la firma final declarada en [contracts/feature-admin.api.md](./contracts/feature-admin.api.md). Helper también exporta `isAdminEmail(email: string): boolean`.
- [ ] T100 [US3] Crear use cases admin en `src/features/admin/application/use-cases/`: `adminListProducts`, `adminUpdateProduct`. Exigen `requireAdmin()` antes de ejecutar.
- [ ] T101 [US3] Crear schema `src/features/admin/application/schemas/productEditSchema.ts`.
- [ ] T102 [US3] Crear barrel `src/features/admin/index.ts`.
- [ ] T103 [US3] Adelgazar `src/app/[locale]/admin/{page,products/page,events/page}.tsx` para usar `requireAdmin()` desde `@/features/admin` (eliminar el helper temporal de `src/lib/admin-guard.ts`).
- [ ] T104 [US3] Smoke: admin entra al panel; usuario normal redirige; editar producto persiste.

### T-Auth — Feature `auth` (consolidación final del cliente Supabase)

- [ ] T105 [US3] Mover `src/app/supabase-provider/provider.tsx` → `src/features/auth/presentation/providers/SupabaseProvider.tsx`. Refactorizar para consumir `createBrowserSupabaseClient` de `@/shared/supabase/client` (eliminar uso de `auth-helpers-nextjs`).
- [ ] T106 [US3] Mover `src/components/SessionLayout.tsx` → `src/features/auth/presentation/SessionLayout.tsx`. Refactorizar para usar `createServerSupabaseClient()` de `@/shared/supabase/server` (eliminar `createServerComponentClient` de auth-helpers).
- [ ] T107 [US3] Adelgazar `src/app/auth/callback/route.ts` y `src/app/[locale]/auth/callback/route.ts`: validar `code` con `oauthCallbackSchema`, delegar a `exchangeOAuthCode(code)` desde `@/features/auth`. Eliminar `createRouteHandlerClient` de auth-helpers; usar `createServerSupabaseClient()`.
- [ ] T108 [US3] Crear use cases `src/features/auth/application/use-cases/{exchangeOAuthCode,getCurrentSession,signOut,requireSession}.ts`.
- [ ] T109 [US3] Crear barrel `src/features/auth/index.ts` exportando `SupabaseProvider`, `useSupabase`, `SessionLayout` y use cases.
- [ ] T110 [US3] Eliminar `src/lib/supabaseClient.ts` (el singleton anon). Verificar `git grep -n "from \"@/lib/supabaseClient\""` → 0; `git grep -n "from \"@supabase/auth-helpers-nextjs\""` → 0.
- [ ] T111 [US3] Smoke completo de auth: login email/password, login OAuth Google (callback), logout, middleware mantiene sesión, admin login + redirect.

### T-Chk — Feature `checkout` (último por sensibilidad)

- [ ] T112 [P] [US3] Mover `src/components/checkout/*` (4 archivos) → `src/features/checkout/presentation/components/`. Shims.
- [ ] T113 [US3] Mover `src/app/api/paypal/paypalHelpers.ts` → `src/features/checkout/infrastructure/paypal/client.ts`. Conserva la lógica de mock controlada por `PAYPAL_USE_MOCK` (ya hecha en T029). Shim no necesario porque solo lo consumían los route handlers (que se actualizan en T115/T116).
- [ ] T114 [US3] Crear use cases en `src/features/checkout/application/use-cases/`: `placeOrder.ts`, `createPaypalOrder.ts`, `capturePaypalOrder.ts`. Cada uno usa `createServerSupabaseClient()`, valida sesión + ownership, invoca el cliente PayPal de infraestructura, actualiza BD. La lógica del check legacy `user_tickets` queda dentro de `capturePaypalOrder.ts` (preservar comportamiento idéntico al actual).
- [ ] T115 [US3] Crear schemas `src/features/checkout/application/schemas/{createOrderInput,capturePaypalInput}.ts`.
- [ ] T116 [US3] Adelgazar `src/app/api/paypal/create-order/route.ts` y `.../capture-order/route.ts`: parsear con schema, llamar al use case, serializar respuesta. Cero lógica de proveedor o BD en el handler.
- [ ] T117 [US3] Crear barrel `src/features/checkout/index.ts`.
- [ ] T118 [US3] Adelgazar `src/app/[locale]/checkout/page.tsx` y `.../order-confirmation/page.tsx` para importar componentes desde `@/features/checkout`.
- [ ] T119 [US3] Smoke E2E sandbox PayPal: login → carrito → checkout → pagar con cuenta sandbox → captura COMPLETED → BD `payment_status='paid'` → correo de confirmación recibido. Probar con `orderId` ajeno → 403.

**Checkpoint Phase 4 / US3**: las 9 features están migradas; los smoke tests por feature ([quickstart.md §3](./quickstart.md)) pasan; `pnpm lint/typecheck/build` verdes. Aún quedan shims pendientes que se eliminan en Phase 9.

---

## Phase 5: User Story 2 — Definición y enforce de la arquitectura objetivo (Priority: P1) 🏗️

**Goal**: La definición ya existe en [research.md](./research.md), [data-model.md](./data-model.md) y [contracts/](./contracts/). Lo que falta es **elevar** las reglas de boundaries a `error` (de `warn`) y validar que toda la base de código cumple, una vez que la migración está completa.

**Independent Test**: Inyectar voluntariamente un import prohibido (deep import cross-feature) y confirmar que `pnpm lint` falla con `boundaries/element-types`.

- [ ] T120 [US2] En `eslint.config.mjs`, cambiar la severidad de `boundaries/element-types` y `no-restricted-imports` de `warn` a `error`. Ejecutar `pnpm lint`; cualquier violación residual se corrige antes de mergear.
- [ ] T121 [US2] Fault-injection: en una rama temporal, añadir `import { foo } from "@/features/products/application/use-cases/getProductById";` en `src/app/[locale]/page.tsx`. Confirmar que `pnpm lint` falla. Revertir el cambio.
- [ ] T122 [US2] Fault-injection 2: añadir `import { something } from "@/features/checkout";` en `src/shared/utils/cn.ts`. Confirmar que `pnpm lint` falla (shared no puede importar de features). Revertir.
- [ ] T123 [US2] Documentar en `CLAUDE.md` y `AGENTS.md` (entre los marcadores de proyecto) los comandos de verificación local: `pnpm lint && pnpm typecheck && pnpm build`.

**Checkpoint Phase 5**: arquitectura enforced en CI/local; cualquier import prohibido es bloqueado por lint.

---

## Phase 6: User Story 5 — Verificaciones automáticas por área corregida (Priority: P2) ✅

**Goal**: Asegurar que los hallazgos críticos/high tienen verificación documentada y reproducible. La spec exige FR-015 / SC-007 cubiertos.

**Independent Test**: para un hallazgo cerrado (p. ej. F-007), reintroducir la regresión (hardcodear un email admin), correr `pnpm lint` o el smoke correspondiente, y confirmar detección antes de mergear.

- [ ] T124 [US5] Crear `specs/001-subsanacion-profunda-proyecto/findings.md` con la tabla completa de hallazgos F-001..F-024 + estado actual (open/closed/deferred) + verificación asociada (referencia a tarea Tnnn o quickstart §x).
- [ ] T125 [US5] Para cada finding HIGH/CRITICAL cerrado, registrar el comando o pasos de verificación en `findings.md`. Ejemplos: F-001 → `curl POST /api/send-email sin sesión → 401`; F-007 → `git grep AUTHORIZED_ADMINS → 0`.
- [ ] T126 [US5] Añadir sección en `CLAUDE.md` con el flujo de verificación post-cambio: `pnpm lint && pnpm typecheck && pnpm build`, mención al checklist manual de quickstart.
- [ ] T127 [US5] Documentar en `quickstart.md` cómo correr la fault-injection de boundaries (ya está en §5, asegurar que sigue vigente con la severidad `error`).

**Checkpoint Phase 6**: documento `findings.md` cerrado con verificación por hallazgo HIGH+CRITICAL.

---

## Phase 7: User Story 6 — Consistencia FE/BE y configuración (Priority: P2) 🔄

**Goal**: Validar que tipos y schemas son consistentes entre cliente y server, y que los scripts/configs reflejan la realidad del proyecto.

**Independent Test**: cambiar el shape de respuesta de un endpoint (p. ej. `/api/convert`) y confirmar que el type-check de los consumidores cliente falla hasta actualizarse.

- [ ] T128 [US6] Auditar que cada endpoint y server action consume su schema `zod` desde la API pública de la feature (no se reescribe localmente). Revisar `/api/convert`, `/api/paypal/create-order`, `/api/paypal/capture-order`, server actions de `notifications` y `content`.
- [ ] T129 [US6] Cuando el componente cliente conoce el shape (p. ej. `CurrencyConverterRow`), tipar el `fetch` con el tipo derivado de `convertQuerySchema` y `ConversionResult` exportados por `@/features/currency`. Hacer lo mismo para checkout (PayPal payloads) y notifications.
- [ ] T130 [US6] Revisar `package.json`: confirmar scripts `dev`, `build`, `start`, `lint`, `typecheck` existen, son ejecutables y producen el resultado esperado. Si `start` o `dev` referencian flags obsoletos (p. ej. `--turbopack` si rompe build prod), documentar y normalizar.
- [ ] T131 [US6] Revisar `.env.example` final vs envs realmente usadas en código (`git grep "process.env\."`); cualquier divergencia se corrige (añadir vars faltantes; eliminar las no usadas tras confirmar).
- [ ] T132 [US6] Mover `add_featured_column.sql` → `db/migrations/0001_add_featured_column.sql` con header `-- Migration: 0001 — add featured column to products` y comentario de reversibilidad. Crear `db/README.md` documentando convención de versionado.

**Checkpoint Phase 7**: tipos/schemas/configs consistentes; cambios en contratos producen errores de type-check tempranos en consumidores.

---

## Phase 8: User Story 1 — Diagnóstico técnico priorizado (Priority: P1) 📋

**Goal**: La radiografía inicial está en [research.md](./research.md) y [data-model.md](./data-model.md). El cierre del feature exige consolidar el diagnóstico final con findings cerrados, abiertos y diferidos.

**Independent Test**: el documento `findings.md` final (de T124+T125 más actualización) cubre el 100% de las áreas de auditoría (SC-002), todos los HIGH+CRITICAL están resueltos o explícitamente diferidos con justificación (SC-008/SC-011).

- [ ] T133 [US1] Actualizar `findings.md` (creado en T124) con el estado final tras Phase 7: cada hallazgo F-001..F-024 marcado `closed` (con tarea Tnnn que lo cerró), `deferred` (con feature destino y razón) o `open` (con justificación si quedó abierto excepcionalmente).
- [ ] T134 [US1] Verificar SC-001..SC-012 de la spec uno por uno y registrar evidencia en `findings.md`. Ejemplo SC-001: 100% del código bajo `src/` queda en una feature o en `shared` → comprobado por `pnpm lint` (boundaries no detecta archivos huérfanos) + revisión visual del árbol.
- [ ] T135 [US1] Producir `closure-report.md` resumen ejecutivo (1-2 páginas) con: features migradas, hallazgos cerrados/diferidos, métricas (LOC movido vs reescrito, dependencias añadidas/removidas), próximas features propuestas (002 consolidación visual, 003 testing, futura `user_roles`).

**Checkpoint Phase 8**: documentos de cierre completos; señal de "ready to merge to master" tras Polish.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Limpieza final. Sin label de story.

- [ ] T136 [P] Eliminar todos los shims temporales: `git grep -n "TODO(speckit): shim temporal"` → 0. Cada shim removido implica actualizar consumidores residuales al import canónico.
- [ ] T137 [P] Eliminar `src/utils/supabase/server.ts` (consolidado en `shared/supabase/server.ts`) y verificar que `git grep "@/utils/supabase"` → 0.
- [ ] T138 [P] Eliminar `src/lib/{convert-core,formatCurrency,categories,search,viewedHistory,productsDistributor,seo,seoConfig,structuredData,orderConfirmationEmail,utils,guidesContent,supabaseClient}.ts` y `src/lib/hooks/useProducts.ts` cuando los shims hayan migrado a sus features. Verificar que `src/lib/` queda vacío o con solo subcarpetas que merezcan permanecer (en este alcance: ninguna; eliminar `src/lib/` por completo).
- [ ] T139 [P] Eliminar `src/components/{products,cards,checkout,account,admin,home,search,user,general,Carousel,ui,providers}/` cuando los shims se hayan limpiado. Carpetas vacías eliminadas.
- [ ] T140 [P] Eliminar `src/context/` (`CartContext`, `ProductsContext` migrados).
- [ ] T141 [P] Eliminar `src/i18n/` (consolidado en `shared/i18n/`).
- [ ] T142 [P] Eliminar `src/types-db.ts` y `src/actions.ts` (raíz) cuando los shims sean innecesarios.
- [ ] T143 Desinstalar `@supabase/auth-helpers-nextjs`: `pnpm remove @supabase/auth-helpers-nextjs`. Verificar `git grep "auth-helpers-nextjs"` → 0 y `pnpm install --frozen-lockfile` exitoso.
- [ ] T144 [P] Mover `SEO_MIGRATION_GUIDE.md` y `PAYPAL-SETUP.md` → `docs/` y referenciar desde `README.md`.
- [ ] T145 [P] Reemplazar `console.error`/`console.log` directos en route handlers y use cases por una función helper `logger` simple en `src/shared/observability/logger.ts` (formato JSON una línea, niveles `info`/`warn`/`error`). Aplicar en route handlers de PayPal y notifications (F-017).
- [ ] T146 Ejecutar [quickstart.md §4 — Checklist de seguridad](./quickstart.md) completo y registrar evidencia en `closure-report.md`.
- [ ] T147 Ejecutar [quickstart.md §3 — Smoke tests por feature](./quickstart.md) completo (las 9 features) y registrar evidencia.
- [ ] T148 Ejecutar `pnpm lint && pnpm typecheck && pnpm build` final; cero errores nuevos vs línea base.
- [ ] T149 Actualizar `CLAUDE.md` y `AGENTS.md` para reflejar el árbol final (sin `src/lib`, `src/components`, etc.).
- [ ] T150 Sign-off: tag de cierre en repositorio (`v0.2.0-clean-arch`) y merge PR a `master`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: sin dependencias.
- **Phase 2 (Foundational)**: depende de Phase 1.
- **Phase 3 (US4 Security)**: depende de Phase 1+2 (necesita `shared/supabase` para validar sesión en endpoints). Bloquea cualquier despliegue.
- **Phase 4 (US3 Migration)**: depende de Phase 1+2+3. T-Curr es prototipo y precede a las demás migraciones; T-Auth ocurre antes de T-Adm y T-Chk; T-Notif puede correr en paralelo a T-Curr/T-Prod; T-Cart depende de T-Prod (consume `getProductsByIds`); T-Cont depende de T-Prod (consume `listFeaturedProducts`/`getCategories`); T-Chk depende de T-Cart, T-Auth, T-Notif y T-Prod (es la más entrelazada).
- **Phase 5 (US2)**: depende de Phase 4 completa. No puede elevar boundaries a `error` mientras haya features sin migrar.
- **Phase 6 (US5)**: puede iniciar en paralelo con Phase 5 (documento de findings se actualiza incremental).
- **Phase 7 (US6)**: depende de Phase 4 (necesita schemas en sus features finales).
- **Phase 8 (US1)**: depende de Phases 5-7.
- **Phase 9 (Polish)**: depende de todo lo anterior.

### Within each migration block (Phase 4)

- Mover lógica (application/infrastructure) **antes** de mover componentes (presentation).
- Crear barrel `index.ts` **después** de mover archivos a su destino interno.
- Actualizar consumidores en `src/app/` **después** del barrel.
- Smoke test cierra el bloque.

### Parallel Opportunities

- Setup tasks marcadas `[P]` pueden correr en paralelo (T003, T004, T005).
- Foundational tasks marcadas `[P]` pueden correr en paralelo (T011 a T019, salvo T010 que depende de T007/T009).
- Dentro de un bloque de feature, mover componentes en paralelo (`[P]` en T066/T067/T068, T084..T088, T092/T093, T098, T112).
- T-Notif (Phase 4) puede correr en paralelo a T-Curr y a T-Prod (no comparten archivos clave).
- Phase 9 cleanup tasks (`[P]` en T136..T142, T144, T145) en paralelo.

---

## Parallel Example: Phase 4 — T-Prod component moves

```bash
# Tras crear use cases (T060..T065), mover componentes en paralelo:
Task: "Move src/components/products/* → src/features/products/presentation/components/"   # T066
Task: "Move src/components/cards/* → src/features/products/presentation/components/cards/" # T067
Task: "Move src/components/search/* → src/features/products/presentation/components/search/" # T068
Task: "Move src/components/providers/ProductsProvider.tsx → features/products/presentation/providers/"  # T069
Task: "Move src/context/ProductsContext.tsx → features/products/presentation/state/"      # T070
```

---

## Implementation Strategy

### MVP First (US4 — Security hardening)

1. Phase 1 (Setup): T001..T006.
2. Phase 2 (Foundational): T007..T019.
3. Phase 3 (US4 Security): T020..T043.
4. **STOP and VALIDATE**: ejecutar [quickstart.md §4 Checklist de seguridad](./quickstart.md). Si todos los items pasan, **el MVP del feature es entregable**: el sitio queda funcionalmente igual pero sin las vulnerabilidades CRITICAL/HIGH detectadas. Es válido mergear a `master` aquí y continuar la migración estructural en sub-PRs incrementales.

### Incremental Delivery (post-MVP)

1. Phase 4 — un bloque por sub-PR: T-Curr → smoke → merge → T-Notif → smoke → merge → T-Prod → ... → T-Chk.
2. Phase 5 (boundaries `error`) tras T-Chk.
3. Phase 6+7 transversales.
4. Phase 8 documentación.
5. Phase 9 limpieza + sign-off.

Cada sub-PR mantiene `master` desplegable y reversible vía `git revert`.

### Parallel Team Strategy

Con dos developers post-Phase 3:

- Dev A: T-Curr → T-Notif → T-Prod
- Dev B: T-Auth (T105..T111 en paralelo si no choca con T-Notif) → T-Cart (depende de T-Prod, espera) → T-Cont (depende de T-Prod, espera)
- Ambos: T-Acc, T-Adm cuando T-Auth cierre
- Sincronización para T-Chk (último bloque, sensible)

---

## Notes

- `[P]` = archivos distintos, sin dependencias bloqueantes.
- Tests Vitest/Playwright **fuera de alcance** (decisión Q5 Clarification). Verificación = lint + typecheck + build + smoke manual de [quickstart.md](./quickstart.md).
- Cada tarea cierra cuando: (a) `pnpm lint && pnpm typecheck && pnpm build` verdes; (b) smoke test asociado pasa; (c) commit conventional commits con scope.
- Shims se identifican con `// TODO(speckit): shim temporal — eliminar al cierre del feature`. Phase 9 los elimina todos.
- F-014 (consolidación de carruseles/cards): los archivos se MUEVEN en T-Prod; la consolidación de variantes queda diferida a feature 002.
- Ningún cambio destructivo de BD se ejecuta en este feature; eventuales migraciones quedan documentadas en feature siguiente.
