# Phase 0 — Research: Subsanación + Migración a Clean Architecture por Features

**Feature**: 001-subsanacion-profunda-proyecto
**Date**: 2026-05-09

Este documento resuelve los puntos `NEEDS CLARIFICATION` del Technical Context y registra la investigación de mejores prácticas que sustenta el plan. Cada decisión sigue el formato Decision / Rationale / Alternatives.

---

## R1. Stack y versiones efectivas

**Decision**: Next.js 15.3.8 (App Router) + React 19.1 + TypeScript 5.8 (`strict: true`, `target: ES2017`, `moduleResolution: bundler`, alias `@/* → src/*`); pnpm como gestor de paquetes; Vercel como target de despliegue.

**Rationale**: Es el stack ya instalado y funcional. La spec prohíbe reemplazar tecnologías base. El alias `@/*` ya está configurado en `tsconfig.json` y se usa en todo el código, lo que facilita reglas de import por path.

**Alternatives considered**: Pinear versiones menores; descartado: la subsanación apunta a sanear sin actualizar dependencias salvo cuando un hallazgo concreto lo exija.

---

## R2. Cliente Supabase: unificar SSR

**Decision**: Adoptar `@supabase/ssr` como única vía para crear clientes Supabase en server/middleware/client. Eliminar progresivamente `@supabase/auth-helpers-nextjs` (legacy) y el singleton de `src/lib/supabaseClient.ts` (que usa la SDK base sin manejo de cookies/SSR).

**Rationale**: Hoy coexisten **tres** patrones para Supabase: (a) singleton en `src/lib/supabaseClient.ts` con `createClient` de `@supabase/supabase-js` y la anon key como `NEXT_PUBLIC_*`; (b) `createServerComponentClient` / `createMiddlewareClient` / `createRouteHandlerClient` de `@supabase/auth-helpers-nextjs` (paquete legacy); (c) `createServerClient` de `@supabase/ssr` en `src/utils/supabase/server.ts`. El singleton (a) NO maneja cookies y se usa desde route handlers (`src/app/api/paypal/*`) y desde el cliente (CartContext, useProducts). Eso significa que las queries server-side se ejecutan SIN sesión, y las RLS policies de Supabase se evalúan como anónimo: cualquier endpoint que dependa de la identidad del usuario está roto silenciosamente.

**Alternatives considered**:
- Mantener `auth-helpers-nextjs`: descartado porque está deprecado en favor de `@supabase/ssr` y el equipo Supabase ya migró su documentación.
- Adoptar el singleton `lib/supabaseClient.ts` como cliente “público” para reads sin sesión: descartado porque mezcla casos sin diferenciar y oculta el problema de RLS.

---

## R3. Validación de input en endpoints y server actions

**Decision**: Adoptar `zod` para schemas de input en route handlers y server actions. Cada feature define sus schemas en `application/schemas/` y los reutiliza en cliente para validación de formularios cuando aplique.

**Rationale**: Hoy la validación es ad-hoc (`if (!orderId)`, `isValidEmail` con regex). No hay schema central, no hay errores tipados y la cobertura de validación es inconsistente. `zod` permite parseo, validación y derivación de tipos TypeScript sin frameworks adicionales y se integra bien con server actions y route handlers.

**Alternatives considered**:
- `yup` / `joi` / `valibot`: equivalentes funcionales; `zod` se eligió por adopción amplia en el ecosistema Next.js, derivación de tipos sin generación, y bundle size aceptable.
- Validación manual: descartado porque amplifica deuda y no escala con la cantidad de endpoints/forms.

---

## R4. Verificación de capas y boundaries entre features

**Decision**: Usar `eslint-plugin-boundaries` con un archivo de configuración que define los “elements”:
- `app` (`src/app/**`)
- `feature` (`src/features/<name>/**`)
- `feature-domain` (`src/features/*/domain/**`)
- `feature-application` (`src/features/*/application/**`)
- `feature-infrastructure` (`src/features/*/infrastructure/**`)
- `feature-presentation` (`src/features/*/presentation/**`)
- `shared` (`src/shared/**`)

Reglas:
- `app` puede importar de `feature` (solo en su barrel) y `shared`.
- `feature-presentation` puede importar de `feature-application`, `feature-domain`, `shared` y de otras `feature` (solo barrel).
- `feature-application` puede importar de `feature-domain`, `shared` y de otras `feature` (solo barrel).
- `feature-domain` solo puede importar de `feature-domain` (de su propia feature) y `shared` (sin estado externo).
- `feature-infrastructure` puede importar de `feature-domain`, `feature-application` y `shared`; nadie importa de infrastructure salvo el composition wiring.
- `shared` no puede importar de `feature*` ni de `app`.
- Imports cross-feature solo a `@/features/<other>` (sin profundidad), enforced con `no-restricted-imports` complementario.

**Rationale**: `eslint-plugin-boundaries` es el plugin más maduro para arquitectura por elementos en proyectos TS/JS. Convierte las reglas de la spec (FR-006) en verificación automática que corre en `pnpm lint` y CI.

**Alternatives considered**:
- `eslint-plugin-import` con reglas custom: posible, pero menos expresivo para este modelo.
- `dependency-cruiser`: poderoso pero es una herramienta separada; preferimos integrar al pipeline de lint existente.
- Reglas TypeScript con `paths` y `references` (project references): no aplica bien sin convertir cada feature en sub-paquete.

---

## R5. `cn()` y composición de clases Tailwind

**Decision**: Adoptar `clsx` (ya instalado) + `tailwind-merge` para implementar `cn()` con manejo correcto de conflictos de clases Tailwind. Reemplazar la implementación actual de `src/lib/utils.ts` que solo concatena strings.

**Rationale**: El `cn()` actual no resuelve conflictos (`p-2 p-4` queda como `p-2 p-4`), provoca estilos inconsistentes y es fuente de bugs sutiles. `tailwind-merge` es el estándar; agregarlo es cambio aditivo de bajo riesgo.

**Alternatives considered**: dejar como está (descartado, regresa a futuro); escribir merger propio (descartado, reinvención).

---

## R6. Pruebas

**Decision**: Diferir la introducción de un runner de pruebas (Vitest / Playwright) a una tarea opcional posterior dentro del plan. La verificación inicial se sostiene en:
- `pnpm lint` (incluye reglas de boundaries y no-restricted-imports)
- `pnpm tsc --noEmit` (type-check estricto)
- `pnpm build` (build de producción exitoso)
- Checklists manuales reproducibles documentados en `quickstart.md`

Cuando se introduzca, la elección recomendada es:
- **Vitest** para unit tests de capa `domain` y `application` (puras).
- **Playwright** light para 4-6 flujos E2E críticos (login, navegar catálogo, agregar al carrito, checkout sandbox PayPal, panel admin).

**Rationale**: Introducir testing es una decisión grande que multiplica el trabajo del refactor. El plan atacará primero los hallazgos de seguridad y la migración estructural; el harness de tests se incorpora cuando los pure use cases ya existen y los tests aportan valor inmediato.

**Alternatives considered**:
- Introducir Vitest desde el día 1: descartado por carga adicional y porque la mayoría del código actual no es testeable sin refactor previo.
- Adoptar Jest: descartado; Vitest se integra mejor con Vite/ESM y con el stack moderno.

---

## R7. Variables de entorno: separar server/client

**Decision**: Reorganizar las variables de entorno para que ningún secreto requiera prefijo `NEXT_PUBLIC_*`. En particular:
- `PAYPAL_CLIENT_ID` y `PAYPAL_LIVE_CLIENT_ID` se consumen solo en `paypalHelpers.ts` (server). Renombrar y quitar `NEXT_PUBLIC_*`.
- El SDK de PayPal en cliente sí necesita `NEXT_PUBLIC_PAYPAL_CLIENT_ID` para inicializar; se mantiene SOLO si efectivamente se usa con `<PayPalScriptProvider>` desde el cliente. Hay que verificar uso real antes de borrar.
- Las credenciales SMTP (`EMAIL_USER`, `EMAIL_PASS`) ya son server-only — está OK.
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` permanecen públicas: la anon key es por diseño consultable desde el cliente con RLS.
- Introducir `SUPABASE_SERVICE_ROLE_KEY` solo si una operación server claramente lo requiere (escritura privilegiada que no debe pasar por RLS); de no requerirse, NO se introduce.

**Rationale**: Toda variable con prefijo `NEXT_PUBLIC_*` queda expuesta en el bundle del cliente. Hoy `NEXT_PUBLIC_PAYPAL_CLIENT_ID` y `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` aparecen en `paypalHelpers.ts`, que es código server-only. El client_id de PayPal NO es estrictamente secreto, pero no debe estar marcado como público si no se necesita en cliente; el secret OAuth (`PAYPAL_SECRET`, `PAYPAL_LIVE_SECRET`) sí lo es y ya está bien.

**Alternatives considered**:
- Dejar todo como está: descartado, viola FR-009.
- Adoptar `t3-env` / `envsafe` para validación tipada: descartado por ahora; se evaluará como tarea opcional.

---

## R8. Endpoints sensibles: autorización y validación de propietario

**Decision**: Aplicar las siguientes reglas a endpoints que mutan datos o envían correo:
- `POST /api/send-email`: dejar de ser un relay genérico abierto. Opciones: (a) volverlo interno y exigir un header/secreto compartido (no resuelve abuso si se filtra), (b) validar identidad de sesión y usar templates registrados en el server, (c) eliminar el endpoint y mover el envío a la feature `notifications` como server action invocable solo desde server. **Recomendación: opción (c)** — eliminar el endpoint público y sustituir por una server action server-only.
- `POST /api/send-order-email`: idem; mover a server action interna; el cliente jamás invoca envío de correo directamente.
- `POST /api/paypal/create-order`: validar que la orden pertenece al usuario autenticado antes de crear orden PayPal (consultar `orders.user_id` vs `session.user.id`).
- `POST /api/paypal/capture-order`: idem; además, validar que el `paypalOrderId` recibido coincide con el creado para esa `orderId`.
- `GET /api/convert`: público y read-only sobre proveedor externo; añadir validación de `amount` (rango razonable) y `to` (whitelist de monedas) para evitar abuso/loops.
- Admin: hoy hay una lista hardcoded de emails en `src/app/[locale]/admin/page.tsx`. Migrar a un check basado en `app_metadata.role === 'admin'` o en una tabla `user_roles`. Si se mantiene la lista, moverla a env (`ADMIN_EMAILS`) y leerla server-only.

**Rationale**: Hoy `/api/send-email` es un relay abierto: cualquier visitante puede POST con `{to, subject, html}` arbitrarios y enviar correo desde la cuenta SMTP corporativa. Es el hallazgo de severidad más alta del proyecto. `/api/send-order-email` también acepta input arbitrario sin verificación. Los endpoints PayPal mutan estado de pago sin verificar dueño.

**Alternatives considered**: tokens HMAC firmados desde cliente (descartado: superficie complicada para poco beneficio); rate-limit only (descartado: limita abuso pero no lo elimina).

---

## R9. Mock fallbacks de PayPal en runtime

**Decision**: Eliminar los fallbacks que devuelven mock orders/captures cuando hay error en `NODE_ENV !== 'production'`. Los mocks deben quedar opt-in vía variable explícita (`PAYPAL_USE_MOCK=1`) y NO ejecutarse por accidente en staging/preview.

**Rationale**: `paypalHelpers.ts` retorna mocks de orden/captura cuando hay error en cualquier entorno no-production. Vercel preview/staging corre con `NODE_ENV=production` típicamente, pero CI local y env propios pueden quedar en `development` produciendo capturas falsas que actualizan `payment_status='paid'` en BD real. Riesgo financiero real.

**Alternatives considered**: Borrar mocks por completo (más seguro pero pierde DX); mantener tras flag explícito (compromiso seguro).

---

## R10. URL absolutas para fetch server-side

**Decision**: Reemplazar los `fetch('/api/...')` que ocurren en código server (route handlers, server actions, server components) por llamadas directas a la función de aplicación correspondiente. En el destino post-migración, los endpoints públicos solo existen para clientes externos; el server interno llama a use cases.

**Rationale**: `src/app/api/send-order-email/route.ts` hace `fetch('/api/send-email')` con URL relativa. En Node.js (runtime de route handlers), `fetch` con path relativo falla a menos que se construya URL absoluta a partir del header host. En el flujo Clean Architecture, no hay razón para que un endpoint server llame a otro endpoint server por HTTP: ambos consumen el mismo use case.

**Alternatives considered**: Construir URL absoluta con `process.env.NEXT_PUBLIC_SITE_URL`: parche que resuelve el bug pero mantiene el patrón equivocado. Descartado.

---

## R11. Granularidad del inventario inicial de features

**Decision**: Inventario inicial de 9 features top-level (cardinalidad dentro del rango 8-12 fijado en spec) más un módulo `shared`:

1. `products` — catálogo, detalle, filtros, listado, related, reviews, viewed history, distribución.
2. `cart` — estado del carrito, codificación URL, sincronización con BD.
3. `checkout` — flujo de pago (forms, steps), integración PayPal, creación/captura de orden.
4. `auth` — login, register, callback OAuth, sesión Supabase, recuperación.
5. `account` — perfil, direcciones, listado de órdenes del usuario.
6. `admin` — panel admin (productos, eventos), guardas de rol.
7. `notifications` — envío de correos transaccionales (contacto, confirmación de orden).
8. `content` — landing pages, guías (`guias/`), páginas estáticas (about, conditions, privacy, shipping, etc.), servicios (epoxy-floors, luxury-furniture, etc.), home composer.
9. `currency` — conversor USD/CRC.

**Shared** (en `src/shared/`):
- `shared/supabase` — clientes server / client / middleware.
- `shared/i18n` — `routing`, `navigation`, `request`.
- `shared/seo` — `seoConfig`, `seo`, `structuredData`.
- `shared/ui` — primitives Radix (`tabs`), `Toaster`, `LocaleSwitcher*`, `ScrollToTopButton`, `Carousel` genérico, layout de session.
- `shared/types` — `types-db.ts` (Database type generado).
- `shared/utils` — `cn`, `formatCurrency`.

**Rationale**: Cubre el 100% del código bajo `src/` con granularidad gruesa-media. Las áreas que parecen sub-features (carruseles, banners, search) viven dentro de la feature owner (`products` para search/related/cards; `content` para banners/home composer). vCard puede entrar en `account` o como sub-feature de `content` (decisión final en data-model.md).

**Alternatives considered**:
- Añadir `vcard` como feature top-level: descartado, es una sola página y formulario; cabe en `content`.
- Separar `search` como feature: descartado, está acoplada a `products` y no aporta valor independiente.
- Separar `payments` de `checkout`: descartado, en este e-commerce el checkout y el pago son una sola capability; si en el futuro se agrega otro proveedor, se reevalúa.

---

## R12. Router App Router + páginas como composición delgada

**Decision**: Mantener el árbol de rutas Next.js en `src/app/[locale]/...` y `src/app/api/...` exactamente como está hoy desde la perspectiva de URLs (no se cambia el path público). Los `page.tsx` y `route.ts` se refactorizan internamente para:
- importar solo de `@/features/<feature>` (barrel) y `@/shared/<área>`.
- no contener lógica de negocio (FR-018).
- delegar a server actions/use cases para fetch y mutaciones.

**Rationale**: Cambiar URLs públicas rompe SEO/links y está fuera del alcance. La spec exige preservar comportamiento funcional. Lo único que cambia es lo que las páginas IMPORTAN, no su path.

**Alternatives considered**: Reordenar URLs (descartado por SEO).

---

## R13. Estado de dominio compartido entre features (cart ↔ products, checkout ↔ orders)

**Decision**: Por defecto, import directo de la API pública de la feature dependida (Q5 de Clarifications). Casos esperados:
- `cart` importa el tipo `Product` desde `@/features/products` y un use case `getProductsByIds` para reconstruir carrito desde URL.
- `checkout` importa de `@/features/cart` (snapshot del cart), de `@/features/products` (verificación de inventario) y de `@/features/notifications` (envío de confirmación post-captura).
- `account` importa de `@/features/auth` (sesión actual).
- `admin` importa de `@/features/products` (mutaciones admin) y `@/features/auth` (validación de rol).

**Rationale**: Las dependencias son lineales y bien definidas; no hay ciclos previstos. Inversión de dependencias se introducirá solo si aparece un ciclo o necesidad de testear con doble.

**Alternatives considered**: ya cubiertos en spec / Clarifications.

---

## R14. CI / scripts

**Decision**: Añadir scripts a `package.json`:
- `typecheck`: `tsc --noEmit`
- `lint:boundaries`: `eslint --rule "boundaries/element-types: error"` (alias de `lint` con preset estricto si separar es útil; en la práctica `lint` ya correrá la regla)
- Mantener `dev`, `build`, `start`, `lint` como están.

Añadir un workflow GitHub Actions (si no existe ya) que corra `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm build`. Si ya hay deploy via Vercel preview, basta añadir lint/typecheck como required checks.

**Rationale**: La spec exige “estado verde” tras cada tarea. Eso se materializa en pasos de CI verificables.

**Alternatives considered**: pre-commit hooks con `husky`/`lint-staged`: opcional como mejora posterior.

---

## R15. Estrategia de migración: shims y redirecciones temporales

**Decision**: Para mover archivos sin romper consumidores en una sola tarea, cada movimiento puede dejar un **shim**: el archivo en su ubicación antigua se convierte en un re-export del nuevo path durante 1-N tareas, hasta que todos los consumidores se actualicen. Los shims tienen un comentario `// TODO(speckit): shim temporal — eliminar al cierre de la tarea TXX`. Una verificación final del feature elimina todos los shims y deja el árbol limpio.

**Rationale**: Permite mover un símbolo en una tarea sin tener que actualizar todos sus consumidores en el mismo commit, lo que rompería el principio de tareas pequeñas y aisladas.

**Alternatives considered**: Cambiar todos los imports en el mismo commit que mueve el archivo (válido para archivos con pocos consumidores; se usa cuando el blast-radius es bajo).

---

## R16. Migraciones de base de datos

**Decision**: La subsanación NO requiere migraciones de schema en su fase principal. Se trabaja sobre el schema actual reflejado en `src/types-db.ts` y los scripts existentes (`add_featured_column.sql`). Si un hallazgo concreto exige cambio de schema (p. ej. tabla `user_roles` para sustituir `AUTHORIZED_ADMINS` hardcoded), la tarea correspondiente lo declara explícitamente, presenta migración y rollback.

**Rationale**: La restricción de spec (FR-007) exige migraciones mínimas y reversibles. El refactor no necesita tocar schema; los hallazgos que sí lo necesiten son la excepción y se atacan tarea por tarea.

**Alternatives considered**: Generar tabla de roles desde el día 1 (descartado: aplazado hasta que la decisión de modelo de roles se valide).

---

## Resolución de NEEDS CLARIFICATION del Technical Context

| Slot | Valor resuelto |
|------|----------------|
| Language/Version | TypeScript 5.8 (`strict`), `target: ES2017`, React 19.1, Next.js 15.3 |
| Primary Dependencies | Next.js 15, React 19, `@supabase/ssr`, `next-intl` 4, `@paypal/react-paypal-js`, `nodemailer`, `framer-motion`, `swiper`, Radix UI tabs, `lucide-react`, `react-hot-toast`, `clsx`. A introducir: `tailwind-merge`, `zod`, `eslint-plugin-boundaries`. A retirar: `@supabase/auth-helpers-nextjs`. |
| Storage | Supabase PostgreSQL (sin cambios de schema en esta feature) |
| Testing | Diferido — verificación por `lint` + `typecheck` + `build` + checklist manual. Vitest/Playwright opcional posterior |
| Target Platform | Vercel (Edge runtime para middleware, Node serverless para route handlers) |
| Project Type | Web fullstack (Next.js App Router monorepo simple) |
| Performance Goals | No regresión vs baseline actual (Core Web Vitals existentes) |
| Constraints | pnpm, build verde requerido, sin secretos en bundle de cliente, preservar URLs públicas |
| Scale/Scope | 133 archivos TS/TSX en `src/`, ~30 rutas (incluyendo i18n), 6 endpoints API, 9 features destino |

Sin items pendientes.
