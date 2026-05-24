# Implementation Plan: Subsanación Profunda + Migración a Clean Architecture por Features

**Branch**: `001-subsanacion-profunda-proyecto` | **Date**: 2026-05-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-subsanacion-profunda-proyecto/spec.md`

## Summary

Subsanar deuda técnica, hallazgos de seguridad básica e inconsistencias FE/BE del proyecto Next.js 15 + Supabase + PayPal, mientras se reorganiza la totalidad del código bajo `src/` hacia **Clean Architecture por features (vertical slices)** según las decisiones registradas en Clarifications:

- Layout `src/features/<f>/{domain,application,infrastructure,presentation}` + `src/app/` solo routing + `src/shared/` para transversal.
- 9 features top-level (cardinalidad 8-12).
- Server actions en `application/actions/` de la feature; route handlers en `src/app/api/...` quedan delgados.
- API pública por feature vía barrel `index.ts` + `eslint-plugin-boundaries`.
- Comunicación cross-feature por import directo del barrel; puertos solo con justificación.

Se ejecuta como migración incremental sobre el código existente, sin reescritura, conservando la BD actual y preservando URLs públicas.

## Technical Context

**Language/Version**: TypeScript 5.8 (`strict`), `target: ES2017`, React 19.1, Next.js 15.3
**Primary Dependencies**: Next.js 15, React 19, `@supabase/ssr` (consolidado), `next-intl` 4, `@paypal/react-paypal-js`, `nodemailer`, `framer-motion`, `swiper`, `@radix-ui/react-tabs`, `lucide-react`, `react-hot-toast`, `clsx`. **A introducir**: `tailwind-merge`, `zod`, `eslint-plugin-boundaries`. **A retirar**: `@supabase/auth-helpers-nextjs`.
**Storage**: Supabase PostgreSQL (sin cambios de schema en la fase principal).
**Testing**: Diferido — verificación por `lint` + `typecheck` + `build` + checklists manuales (ver [quickstart.md](./quickstart.md)). Vitest/Playwright opcional posterior.
**Target Platform**: Vercel (Edge runtime para middleware, Node serverless para route handlers).
**Project Type**: Web fullstack (Next.js App Router monorepo simple).
**Performance Goals**: No regresión vs baseline actual; LCP/CLS/INP iguales o mejores en flujos críticos.
**Constraints**: pnpm; build verde requerido tras cada tarea; sin secretos en bundle de cliente; preservar URLs públicas y comportamiento funcional.
**Scale/Scope**: 133 archivos `.ts/.tsx` en `src/`, ~30 rutas (incluyendo i18n), 6 endpoints API, 9 features destino + `shared`.

Detalle completo en [research.md](./research.md). Inventario y entidades en [data-model.md](./data-model.md). Contratos por feature en [contracts/](./contracts/).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

`/.specify/memory/constitution.md` ya contiene la constitución activa del proyecto (`Sobrepoxi Constitution`, v1.0.0, 2026-05-11). Sus principios MUST son bloqueantes para este feature: Clean Architecture por features, API pública por barrel, No BIG Components, Zod en fronteras server, security baseline, no silent errors, verde por tarea y preservación de URLs.

**Gates derivados** (a partir de la constitución activa, la spec y las clarifications):

| Gate | Estado |
|------|--------|
| Sin reescritura desde cero (FR-009) | ✅ El plan migra archivos existentes; movimientos + shims temporales |
| Migraciones de BD mínimas y reversibles (FR-007 / FR-010) | ✅ Fase principal sin DB migrations; cualquier cambio de schema queda en tarea aislada |
| Compatibilidad de funcionalidad y URLs públicas (FR-011, R12) | ✅ URLs intactas; quiebres documentados explícitamente cuando ocurran |
| Sin secretos en bundle cliente (FR-009 / SC-005) | ✅ Tareas Sec-1 a Sec-3 atacan exposición |
| Barrels client-safe + rutas Next | ✅ Los barrels de feature exponen API pública client-safe; los wrappers de `src/app/**/page.tsx` pueden importar `presentation/pages/*` directamente para no arrastrar módulos server (`next/headers`) al bundle cliente |
| Boundaries enforced (FR-006 / SC-007) | ✅ `eslint-plugin-boundaries` configurado en T-Setup-2 |
| Estado verde por tarea (FR-016 / SC-004) | ✅ Cada tarea termina con `lint`, `typecheck`, `build` pasando |

Sin violaciones que requieran justificación en *Complexity Tracking*.

## Project Structure

### Documentation (this feature)

```text
specs/001-subsanacion-profunda-proyecto/
├── plan.md              # Este archivo
├── research.md          # Phase 0 — decisiones técnicas
├── data-model.md        # Phase 1 — inventario de features + entidades
├── quickstart.md        # Phase 1 — verificación
├── contracts/           # Phase 1 — public APIs por feature + boundaries config
│   ├── README.md
│   ├── boundaries.config.md
│   ├── feature-products.api.md
│   ├── feature-cart.api.md
│   ├── feature-checkout.api.md
│   ├── feature-auth.api.md
│   ├── feature-account.api.md
│   ├── feature-admin.api.md
│   ├── feature-notifications.api.md
│   ├── feature-content.api.md
│   ├── feature-currency.api.md
│   └── shared.api.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 (NO creado por /speckit-plan)
```

### Source Code (repository root) — destino

```text
src/
├── app/                                  # Solo routing + composición delgada
│   ├── [locale]/                         # rutas i18n (intactas en URL)
│   │   ├── about/page.tsx                # imports de @/features/content
│   │   ├── account/page.tsx              # @/features/account + @/features/auth
│   │   ├── admin/                        # @/features/admin + @/features/auth
│   │   ├── auth/callback/route.ts        # delgado → @/features/auth
│   │   ├── cart/page.tsx                 # @/features/cart
│   │   ├── checkout/page.tsx             # @/features/checkout
│   │   ├── conditions-service/page.tsx   # @/features/content
│   │   ├── contact/page.tsx              # @/features/content + @/features/notifications
│   │   ├── epoxy-floors/page.tsx
│   │   ├── guias/                        # @/features/content
│   │   ├── industrial-epoxy-flooring/page.tsx
│   │   ├── login/page.tsx                # @/features/auth
│   │   ├── luxury-design-flooring/page.tsx
│   │   ├── luxury-furniture/page.tsx
│   │   ├── order-confirmation/page.tsx   # @/features/checkout
│   │   ├── privacy-policies/page.tsx
│   │   ├── product/[id]/page.tsx         # @/features/products
│   │   ├── products/page.tsx
│   │   ├── qr/page.tsx
│   │   ├── register/page.tsx             # @/features/auth
│   │   ├── search/page.tsx               # @/features/products
│   │   ├── shipping/page.tsx
│   │   ├── vcard/page.tsx
│   │   ├── viewed-history/page.tsx
│   │   ├── HomeContainer.tsx             # ⇒ se mueve a @/features/content
│   │   ├── HomePageData.tsx              # ⇒ se mueve a @/features/content
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx                      # @/features/content (Home)
│   ├── api/                              # Route handlers delgados
│   │   ├── convert/route.ts              # @/features/currency
│   │   └── paypal/
│   │       ├── create-order/route.ts     # @/features/checkout
│   │       └── capture-order/route.ts    # @/features/checkout
│   ├── auth/callback/route.ts            # @/features/auth
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── supabase-provider/                # ⇒ se mueve a @/features/auth
├── features/
│   ├── products/{domain,application,infrastructure,presentation,index.ts}
│   ├── cart/{...}
│   ├── checkout/{...}
│   ├── auth/{...}
│   ├── account/{...}
│   ├── admin/{...}
│   ├── notifications/{...}
│   ├── content/{...}
│   └── currency/{...}
├── shared/
│   ├── supabase/{server.ts,client.ts,middleware.ts}
│   ├── i18n/
│   ├── seo/
│   ├── ui/
│   ├── types/
│   └── utils/
└── middleware.tsx                        # importa shared + features/auth
```

**Structure Decision**: Layout fijado en Clarifications Q1. Las URLs públicas se mantienen idénticas a hoy; solo cambian los imports internos. La migración se realiza feature por feature con shims temporales (R15) que permiten que un consumidor antiguo siga funcionando hasta que su feature destino esté lista.

---

## Mapa de arquitectura actual

### A. Capas existentes (de facto)

| Capa actual | Ubicación | Problema |
|---|---|---|
| Routing + composición + lógica mezclada | `src/app/[locale]/**/page.tsx`, `actions.ts`, `HomePageData.tsx`, `HomeContainer.tsx` | Páginas con lógica de negocio (fetch, validación, transformación) mezclada con presentación |
| API endpoints + lógica de negocio + acceso a BD | `src/app/api/**/route.ts`, `paypalHelpers.ts` | Validación inline, llamadas a Supabase y a proveedor externo en el mismo archivo, error handling inconsistente |
| State management cliente | `src/context/{CartContext,ProductsContext}.tsx` | Acoplado a Supabase singleton; mezcla URL sync con fetch de productos |
| Componentes UI por dominio | `src/components/{products,cards,checkout,account,admin,home,search,user,general,Carousel,ui}/` | Múltiples carpetas para conceptos solapados (`cards/Card.tsx`, 6 variantes de Carousel/Section, 2 BannerTemplate) |
| Utilidades + acceso a BD + dominio en `lib` | `src/lib/{categories,convert-core,formatCurrency,guidesContent,productsDistributor,search,viewedHistory,seo*,structuredData,supabaseClient,orderConfirmationEmail}.ts` + `src/lib/hooks/useProducts.ts` | Mezcla de capas: cliente Supabase, lógica de dominio (distribución de productos), formateadores y helpers SEO en el mismo nivel |
| Cliente Supabase fragmentado | `src/lib/supabaseClient.ts` (singleton anon), `src/utils/supabase/server.ts` (`@supabase/ssr`), middleware con `@supabase/auth-helpers-nextjs` | Tres patrones distintos; el singleton se usa server-side sin cookies, perdiendo sesión |
| Server actions dispersas | `src/actions.ts` (con `"use client"` (!)), `src/app/[locale]/actions.ts`, `src/app/[locale]/vcard/actions.ts` | Tres ubicaciones, distintas convenciones, una con directiva equivocada |
| i18n | `src/i18n/{routing,navigation,request}.tsx` + `src/middleware.tsx` | OK estructuralmente; queda en `shared/i18n` |

### B. Inventario funcional actual

| Capability | Archivos representativos | Acoplamientos |
|---|---|---|
| Catálogo / listado / detalle | `components/products/*`, `lib/hooks/useProducts.ts`, `lib/productsDistributor.ts`, `lib/categories.ts`, `lib/search.ts`, `app/[locale]/{product,products,search}/page.tsx` | Supabase singleton, ProductsContext |
| Carruseles / cards / banners | `components/cards/*` (9 archivos), `components/Carousel/*` (4), `components/home/banner/*` (3), `components/home/Banner.tsx` | Duplicación de patrones de carrusel |
| Carrito | `context/CartContext.tsx`, `app/[locale]/cart/page.tsx` | Supabase singleton, `useSearchParams` |
| Checkout / pago | `components/checkout/*`, `app/api/paypal/*`, `app/[locale]/checkout/page.tsx`, `order-confirmation/page.tsx` | Supabase singleton, PayPal, validación inline |
| Auth + sesión | `app/auth/callback/route.ts`, `app/[locale]/auth/callback/route.ts`, `app/supabase-provider/provider.tsx`, `components/SessionLayout.tsx`, `app/[locale]/{login,register}/page.tsx`, `middleware.tsx` | Mezcla `@supabase/auth-helpers-nextjs` y `@supabase/ssr` |
| Cuenta de usuario | `components/account/*`, `components/user/*`, `app/[locale]/account/page.tsx`, `app/[locale]/viewed-history/page.tsx` | Sesión |
| Admin | `components/admin/*`, `app/[locale]/admin/{,products,events}/page.tsx` | `AUTHORIZED_ADMINS` hardcoded |
| Notificaciones (correo) | `app/api/{send-email,send-order-email}/route.ts`, `lib/orderConfirmationEmail.ts`, `actions.ts` (raíz) | Endpoint público abierto, `fetch` interno con URL relativa |
| Contenido (landings, guías, vcard, contacto) | `app/[locale]/{about,conditions-service,contact,epoxy-floors,industrial-epoxy-flooring,luxury-design-flooring,luxury-furniture,privacy-policies,qr,shipping,guias,vcard}/...`, `lib/guidesContent.ts`, `components/general/*`, `components/home/*` | Layout y SEO acoplados |
| Conversión USD/CRC | `lib/convert-core.ts`, `lib/formatCurrency.ts`, `app/api/convert/route.ts`, `components/CurrencyConverterRow.tsx` | OK; baja complejidad |

### C. Diagnóstico priorizado (lista corta)

Lista priorizada por (impacto × severidad / riesgo). Cada hallazgo se traduce en `Finding` para `/speckit-tasks`.

#### Severidad CRITICAL

| ID | Hallazgo | Ubicación | Impacto |
|---|---|---|---|
| F-001 | `POST /api/send-email` es relay SMTP abierto sin auth ni validación: cualquiera puede enviar correos arbitrarios desde la cuenta corporativa (spam/phishing) | `src/app/api/send-email/route.ts:6-19` | Reputación dominio + abuso de cuota SMTP + phishing |
| F-002 | `POST /api/send-order-email` acepta input arbitrario sin sesión; permite enviar correo "de orden" a cualquier destino con HTML controlado por atacante | `src/app/api/send-order-email/route.ts:7-66` | Phishing dirigido con dominio confiable |
| F-003 | `/api/paypal/{create,capture}-order` mutan `payment_status` sin verificar que `orders.user_id == session.user.id` | `src/app/api/paypal/{create,capture}-order/route.ts` | Posible fraude / corrupción de estado de pagos |
| F-004 | `paypalHelpers` retorna mocks en `NODE_ENV !== 'production'` cuando hay error o credencial faltante; staging/preview pueden ejecutar mocks accidentales que actualizan BD real | `src/app/api/paypal/paypalHelpers.ts:24-44, 60-66, 144-148, 213-230, 239-256` | Capturas falsas marcando órdenes como pagadas |

#### Severidad HIGH

| ID | Hallazgo | Ubicación | Impacto |
|---|---|---|---|
| F-005 | El código server-only de PayPal leía `NEXT_PUBLIC_PAYPAL_CLIENT_ID` / `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` cuando solo necesita la variante server. Resolución: introducir `PAYPAL_CLIENT_ID` / `PAYPAL_LIVE_CLIENT_ID` (server-only, sin prefijo) para el código server. Las variantes `NEXT_PUBLIC_*` se mantienen porque `PayPalCardMethod.tsx` (cliente) inicializa `<PayPalScriptProvider>` con esos Client IDs públicos — excepción documentada en constitución §V | `src/app/api/paypal/paypalHelpers.ts:42-43`, `src/features/checkout/infrastructure/paypal/client.ts:15`, `src/features/checkout/presentation/components/PayPalCardMethod.tsx:14-17` | Eliminar lectura server desde NEXT_PUBLIC_*; conservar variantes públicas para SDK browser |
| F-006 | Singleton `supabase` (`@supabase/supabase-js` con anon key) usado server-side sin cookies (`/api/paypal/*`, contexts cliente) | `src/lib/supabaseClient.ts` y consumidores | RLS evaluadas como anónimo; sesión ignorada en server reads |
| F-007 | `AUTHORIZED_ADMINS` hardcoded en código fuente | `src/app/[locale]/admin/page.tsx:8` | Cambio de admins requiere release; lista filtrable en repos públicos |
| F-008 | `src/actions.ts` declarado `"use client"` pero firma de server action; `fetch('/api/send-email')` desde server (`send-order-email/route.ts:45,52`) usa URL relativa | `src/actions.ts:1-2`, `src/app/api/send-order-email/route.ts:45,52` | Bugs intermitentes / rutas que no resuelven en runtime |
| F-009 | Tres patrones distintos de cliente Supabase coexistiendo (`@supabase/auth-helpers-nextjs`, `@supabase/ssr`, `@supabase/supabase-js`) | `lib/supabaseClient.ts`, `utils/supabase/server.ts`, `components/SessionLayout.tsx`, `middleware.tsx`, etc. | Inconsistencia, sesiones perdidas, doble pago de bundle |
| F-010 | `cn()` casero sin `tailwind-merge` causa conflictos de clases Tailwind sin resolver (`p-2 p-4` queda concatenado) | `src/lib/utils.ts:5-7` | Estilos inconsistentes / overrides accidentales |
| F-011 | Errores en endpoints devuelven `error.message` del proveedor externo o de Supabase al cliente | `src/app/api/paypal/*`, `src/app/api/convert/route.ts:13` | Fuga de información interna; fingerprinting |
| F-012 | Endpoint `/api/convert` sin validación de `amount` ni whitelist de monedas | `src/app/api/convert/route.ts:6-14` | Abuso del proveedor externo; loops |
| F-013 | Páginas con lógica de negocio (fetch + transformación) en `page.tsx` y `HomePageData.tsx` | `src/app/[locale]/HomePageData.tsx`, `src/app/[locale]/admin/page.tsx`, varios | Dificulta testing, contradice FR-018 |

#### Severidad MEDIUM

| ID | Hallazgo | Ubicación | Impacto |
|---|---|---|---|
| F-014 | Duplicación significativa de carruseles/sections (9 archivos en `cards/`, 4 en `Carousel/`, 3 en `home/banner/`, `home/Banner.tsx`) con lógica solapada | `src/components/{cards,Carousel,home/banner,home}/` | Mantenimiento costoso; inconsistencia visual |
| F-015 | Lista hardcoded de tablas opcionales (`user_tickets`) consultada para decidir si actualizar tickets — patrón frágil | `src/app/api/paypal/capture-order/route.ts:60-82` | Dependencia legacy enmascarada |
| F-016 | `useEffect` con dependencias `[searchParams]` y mutaciones de URL desde el mismo provider (CartContext) → riesgo de loops o doble render | `src/context/CartContext.tsx:66-80, 111-169` | Side effects difíciles de razonar |
| F-017 | `console.log`/`console.error` directos en route handlers; sin logger estructurado | `src/app/api/paypal/*`, otros | Logs ruidosos, sin niveles, sin correlación |
| F-018 | Schemas de Database (`types-db.ts`) referenciados por capas variadas (cliente, server, hooks) sin convención clara | `src/types-db.ts` | Fragmentación de tipos |
| F-019 | `eslint.config.mjs` solo extiende `next/core-web-vitals` y `next/typescript`; no hay reglas de boundaries ni de imports | `eslint.config.mjs` | Imposible enforcement de FR-006 sin tarea Setup-2 |
| F-020 | No hay script `typecheck`; `pnpm build` cubre type-check pero es lento para iterar | `package.json` | Iteración lenta del refactor |
| F-021 | `"use client"` en `src/actions.ts`: confusa naturaleza del archivo (form action + invocación HTTP a /api/send-email) | `src/actions.ts:1` | Intención poco clara, doble red de comunicación |

#### Severidad LOW

| ID | Hallazgo | Ubicación | Impacto |
|---|---|---|---|
| F-022 | `add_featured_column.sql` en raíz sin convención de migrations | `add_featured_column.sql` | Migrations sin trazabilidad ordenada |
| F-023 | `Database` type expone `'products'` directamente sin alias por capa | `src/types-db.ts` | OK pero inconsistente con dominio |
| F-024 | Múltiples README/MD en raíz (`SEO_MIGRATION_GUIDE.md`, `PAYPAL-SETUP.md`) sin index | raíz | Documentación dispersa |

(Nota: la lista completa de findings es responsabilidad de `/speckit-tasks`; aquí se cubren los suficientes para ordenar el trabajo. F-014 se descompone en sub-findings durante /speckit-tasks).

---

## Riesgos principales

| Riesgo | Categoría | Mitigación |
|---|---|---|
| Romper checkout PayPal durante reorganización | Funcional crítico | Migrar `checkout` después de hardening (F-003/F-004); verificación E2E con sandbox PayPal antes de cerrar; mantener endpoints en mismas URLs |
| Romper login/sesión al consolidar clientes Supabase | Funcional crítico | Cambio de `auth-helpers` a `@supabase/ssr` se hace en T-Auth-1 con prueba manual del flujo completo (login + OAuth + logout + middleware) antes de cerrar |
| Capturas falsas en staging por mock fallback de PayPal | Seguridad / financiero | F-004 se ataca en T-Sec-3 ANTES de cualquier despliegue de staging tras el inicio del feature |
| Spam relay a través de `/api/send-email` durante la migración | Seguridad / reputación | F-001 se ataca en T-Sec-1 (primera tarea de seguridad); el endpoint se elimina en cuanto los call sites se convierten a server action interna |
| Regresión SEO por mover componentes que renderizan structured data | SEO | Mantener URLs idénticas (R12); structured data se mueve a `shared/seo` SIN cambiar contenido renderizado |
| Conflictos de imports masivos al introducir boundaries | Productividad | Configurar boundaries (T-Setup-2) tras crear los esqueletos vacíos de features (T-Setup-3); migrar feature por feature; permitir shims temporales |
| Olvido de eliminar shims temporales | Limpieza | Verificación final por `git grep "TODO(speckit): shim temporal"` antes de mergear (quickstart §6) |
| Cambios en `AUTHORIZED_ADMINS` rompen acceso admin tras renombrar a `ADMIN_EMAILS` | Operacional | Tarea T-Sec-4 se aplica con coordinación: variable se setea en Vercel ANTES de mergear; smoke test inmediato post-merge |
| Migración a `tailwind-merge` revela inconsistencias visuales latentes | UX | Roll-out por feature; QA visual rápido en cada smoke test de feature |
| Cliente Supabase nuevo no aplica `next-intl` cookies en middleware | Funcional | Smoke test específico de cambio de locale post-T-Auth-1 |
| Endpoint `/api/convert` cacheado con respuestas inválidas tras añadir validación | Operacional | Cambio aditivo (la validación rechaza inputs inválidos que antes producían 400 igual); cache `s-maxage=1800` se mantiene |
| Páginas Next.js fallan al delgar lógica si server actions tienen efectos no migrados | Funcional | La migración a server actions internas para `notifications` se hace junto con la conversión de los consumidores en el mismo PR |

---

## Cambios por capas

### Capa: Configuración y tooling (transversal)

- Introducir variables de entorno server-only `PAYPAL_CLIENT_ID` y `PAYPAL_LIVE_CLIENT_ID` (sin prefijo) para el código server; conservar `NEXT_PUBLIC_PAYPAL_CLIENT_ID` y `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` para el SDK browser (excepción documentada en constitución §V) — F-005.
- Añadir `tailwind-merge`, `zod`, `eslint-plugin-boundaries`, dev scripts `typecheck` — R3, R4, R5, R14.
- Configurar `eslint-plugin-boundaries` y `no-restricted-imports` (ver [contracts/boundaries.config.md](./contracts/boundaries.config.md)) — F-019.
- Crear scaffolds vacíos `src/features/<f>/{domain,application,infrastructure,presentation}/.gitkeep` y `src/shared/<área>/.gitkeep`.
- Agregar `PAYPAL_USE_MOCK` env-flag (R9).

### Capa: `shared/`

- Crear `shared/supabase/{server,client,middleware}.ts` consolidando en `@supabase/ssr` — F-006, F-009.
- Mover `i18n` (sin cambios funcionales).
- Mover `seo`, `seoConfig`, `structuredData` a `shared/seo`.
- Mover `Database` type a `shared/types/database`.
- Reescribir `cn()` con `clsx` + `tailwind-merge` — F-010.
- Mover `formatCurrency` a `shared/utils/formatCurrency`.
- Mover primitives UI (`tabs`, `ScrollToTopButton`, `LocaleSwitcher*`, carruseles genéricos, `Toaster`).
- Eliminar `src/lib/supabaseClient.ts` y `src/utils/supabase/server.ts` cuando todos los consumidores migren — F-006.

### Capa: `domain` (por feature)

- Definir tipos puros (sin import de Supabase ni de framework). En el alcance de esta migración, dominio es delgado: la mayoría de la lógica vive en `application`. Casos donde domain aparece concreto:
  - `cart`: invariantes de cantidad mínima/máxima, re-cálculo de totales.
  - `checkout`: validez de transición de estados de orden.
  - `currency`: rango válido de `amount`, monedas soportadas.
  - `products`: filtros y orden derivado de products + categories (función pura `distributeProducts`).

### Capa: `application` (por feature)

- Use cases server (servirán a pages y route handlers) — `getHomePageData`, `getProductById`, `getProductsByIds`, `searchProducts`, `placeOrder`, `createPaypalOrder`, `capturePaypalOrder`, etc.
- Server actions con `"use server"` colocadas en `application/actions/` — `sendContactEmail`, `sendOrderConfirmationEmail`, `createVCard`, formularios de admin.
- Schemas `zod` en `application/schemas/` — F-008, F-012, R3.
- Hooks de presentación que dependen de Supabase cliente (`useProducts`, `useCart`) viven aquí cuando no son meramente de UI.

### Capa: `infrastructure` (por feature)

- Adapters externos: `checkout/infrastructure/paypal/client.ts` (refactor de `paypalHelpers`), `notifications/infrastructure/transport/nodemailer.ts`, `currency/infrastructure/exchange/*`.
- Repositorios Supabase (lecturas/escrituras tipadas) cuando reducen ruido en application.
- F-004: el cliente PayPal solo activa mocks bajo `PAYPAL_USE_MOCK === '1'`.

### Capa: `presentation` (por feature)

- Componentes React movidos desde `src/components/...` y `src/app/[locale]/.../*.tsx` (cuando no son routing).
- Providers, contexts y hooks que solo usan UI/estado cliente.
- `Navbar`, `Footer`, `WhatsAppBubble`, `SessionLayout` se ubican según owner (ver [data-model.md](./data-model.md) §1).

### Capa: `app/` (Next.js routing)

- `page.tsx` y `route.ts` se vuelven delgados: parsean params, validan input con schema, llaman a use case, serializan respuesta.
- F-003: `/api/paypal/{create,capture}-order` validan sesión y owner antes de delegar.
- F-002, F-001: `/api/send-email` y `/api/send-order-email` se ELIMINAN; los consumidores pasan a invocar server actions internas.
- Middleware se reescribe para usar `shared/supabase/middleware.ts`.

---

## Cambios de bajo riesgo primero

Estos cambios son aditivos o fácilmente reversibles, no tocan lógica de negocio y producen mejora inmediata sin riesgo de regresión. Se aplican como tareas Setup-* al inicio del plan.

1. **T-Setup-0**: Crear scaffolds vacíos `src/features/<f>/{domain,application,infrastructure,presentation}/` con `.gitkeep` y barrels `index.ts` vacíos exportando `{}`. Crear `src/shared/<área>/` también. Riesgo: nulo. Permite que la siguiente tarea configure boundaries sin que `pnpm lint` reviente por elementos inexistentes.
2. **T-Setup-1**: Añadir script `typecheck`, instalar `tailwind-merge` y `zod` (sin uso aún). Cambio aditivo a `package.json`.
3. **T-Setup-2**: Configurar `eslint-plugin-boundaries` con las reglas de [contracts/boundaries.config.md](./contracts/boundaries.config.md). Riesgo medio: la configuración no debe fallar el lint actual porque `src/features/` está vacío y `src/shared/` también. Verificar `pnpm lint` verde antes de seguir.
4. **T-Setup-3**: Mover `cn()` a `shared/utils/cn.ts` con la implementación basada en `clsx` + `tailwind-merge`. Mantener un re-export desde `src/lib/utils.ts` (shim) hasta que todos los consumidores se actualicen. Riesgo bajo: `cn()` se vuelve más correcto, no menos.
5. **T-Setup-4**: Mover `formatCurrency`, `Database` type y `i18n/*` a `shared/`. Dejar shims en ubicaciones antiguas. Imports antiguos siguen funcionando. Riesgo bajo.

Cumplir T-Setup-0..4 deja el repo configurado para soportar la migración por features sin que un solo flujo funcional cambie.

---

## Cambios que requieren migración o cuidado especial

| Cambio | Naturaleza | Mitigación |
|---|---|---|
| **Eliminación de `/api/send-email` y `/api/send-order-email`** (F-001, F-002) | Quiebre de compatibilidad: si algún cliente externo o legacy llama esos endpoints, dejará de funcionar | Antes del PR de eliminación: (a) confirmar en logs / Vercel analytics que no hay tráfico externo a esos endpoints; (b) primer cambio: añadir auth simple + logging para detectar callers; si tras 1 sprint solo hay tráfico interno propio, entonces eliminar. Documentar en commit message. |
| **Añadir `PAYPAL_*_CLIENT_ID` server-only manteniendo `NEXT_PUBLIC_PAYPAL_*_CLIENT_ID` para SDK browser** (F-005) | Operacional: requiere setear nuevas vars server en Vercel sin retirar las client-side | Tarea coordinada; deploy preview con ambas variantes presentes; smoke test antes de promover a prod |
| **Renombre `AUTHORIZED_ADMINS` hardcoded → `ADMIN_EMAILS` env var** (F-007) | Operacional + seguridad | Setear `ADMIN_EMAILS` en Vercel ANTES de mergear; smoke test inmediato (login admin actual debe entrar al panel) |
| **Reemplazar `@supabase/auth-helpers-nextjs` por `@supabase/ssr`** (F-009) | Funcional crítico (sesiones) | Tarea T-Auth-1; smoke completo de login email+OAuth+logout+middleware+admin |
| **Reglas de boundaries** (F-019) | Bloqueo del lint si hay imports prohibidos | Aplicar tras crear los scaffolds vacíos; migrar feature por feature; cada PR pequeño |
| **Mock PayPal solo bajo flag** (F-004) | Operacional: dev sin credenciales debe set `PAYPAL_USE_MOCK=1` localmente | Añadir documentación en `quickstart.md` (ya hecho) y `.env.example` |
| **Validación de owner en `/api/paypal/*`** (F-003) | Funcional: exige sesión Supabase activa | Decisión cerrada: toda compra requiere sesión (Clarification 2026-05-09). T-Sec-5 valida `orders.user_id === session.user.id` sin caminos alternativos; pages de checkout redirigen a login si no hay sesión. |
| **Tabla `user_roles` (opcional)** | DB migration | NO se introduce en la fase principal. Si se decide al final, la tarea correspondiente entrega migración + rollback (downgrade): drop tabla + restaurar `ADMIN_EMAILS`. |
| **Refactor de duplicación en `cards/`, `Carousel/`, `home/banner/`** (F-014) | UX visible | Movimiento solo (no merge de código) en la fase principal; consolidación es tarea posterior etiquetada "Consolidación" |
| **Colocar admin tras `requireAdmin` centralizado** (F-007 / F-013) | Funcional: cambia el guard de cada subpágina admin | Smoke test completo de admin tras la tarea |
| **Cliente Supabase: cambiar singleton anon por server con cookies en route handlers** (F-006) | Funcional: cambia el contexto de sesión en queries | Cuidadoso por endpoint; algunos reads (catálogo público) están bien como anon — distinguir lecturas públicas de operaciones por usuario |
| **Reescribir `actions.ts` raíz** (F-008, F-021) | Funcional + estructural | Mover lógica a `features/notifications/application/actions/sendContactEmail.ts`, ajustar consumidor (FormMail) |

---

## Estrategia de pruebas

### En la fase principal (sin runner de pruebas)

- **lint** (`pnpm lint`): incluye `boundaries/element-types`, `no-restricted-imports`, reglas Next.js / TypeScript.
- **typecheck** (`pnpm typecheck` = `tsc --noEmit`): protege la integridad de tipos al mover archivos.
- **build** (`pnpm build`): valida que el grafo completo compila para producción.
- **boundaries-fault-injection**: cada PR de migración inyecta voluntariamente un import prohibido en una rama temporal y verifica que `pnpm lint` lo bloquea (FR-015).
- **Checklist manual reproducible** en [quickstart.md §3](./quickstart.md): un smoke test por feature, con pasos verificables a ojo + DevTools / Postman.
- **Checklist de seguridad** en [quickstart.md §4](./quickstart.md): grep automatizable + inspección de bundle.
- **Bundle inspection**: tras cada tarea de seguridad (F-005, F-006, F-009), `pnpm build` y verificar que `EMAIL_PASS`, `PAYPAL_SECRET`, `PAYPAL_LIVE_SECRET` no aparecen en `.next/static`.
- **Production-like preview**: usar Vercel preview deployments por PR para smoke en condiciones reales.

### Tarea opcional posterior (si el equipo decide invertir en testing)

- **Vitest** para `domain/` y `application/` (puras), partiendo por `currency`, `products/distribute`, `cart/encode`.
- **Playwright light** para los 6 flujos críticos:
  1. Login email/password.
  2. Login OAuth Google.
  3. Navegar catálogo + filtrar + abrir detalle.
  4. Agregar al carrito + recargar (cart desde URL).
  5. Checkout sandbox PayPal end-to-end.
  6. Acceso admin con email autorizado y rechazo con no autorizado.

Esta tarea NO está en el orden de implementación inicial. Se incorpora cuando aparezca el primer hallazgo no detectable por lint+typecheck+build.

---

## Estrategia de rollback

### Rollback por tarea

- **Cada tarea = 1 PR pequeño**: el rollback es `git revert <merge-commit>` o re-merge de `master` sobre la rama si está abierta. Política: no acumular más de 3 PRs sin mergear secuencialmente.
- **Estado verde por tarea**: si `pnpm lint`, `typecheck` o `build` no pasan, la tarea no se cierra; el PR no se mergea. No queda código intermedio en `master`.
- **Shims**: cada tarea declara `shims_introduced` y `shims_removed`. El rollback de una tarea repone los shims que removió y elimina los que introdujo.

### Rollback de cambios sensibles

| Cambio | Plan de rollback |
|---|---|
| Adición de env vars server-only (PAYPAL_CLIENT_ID/LIVE_CLIENT_ID) y migración de ADMIN_EMAILS | Mantener vars `NEXT_PUBLIC_PAYPAL_*` en Vercel (siguen siendo necesarias para SDK browser); confirmar 24h sin incidencias; revertir el commit y restaurar valores antiguos si aparece un fallo |
| Eliminación de `/api/send-email` y `/api/send-order-email` | Antes de eliminar, dejar el endpoint con `runtime check` que loguea callers durante 1 sprint. Si hay callers externos legítimos, NO eliminar; aplicar autenticación. Si se elimina y aparece un caller, re-añadir como endpoint autenticado en una tarea hotfix |
| Migración a `@supabase/ssr` | El `git revert` de la tarea T-Auth-1 restaura `@supabase/auth-helpers-nextjs`. Vercel rollback al deployment anterior queda como mecanismo adicional |
| Tabla `user_roles` (si se introduce) | Migración con `DROP TABLE user_roles;` y restaurar `ADMIN_EMAILS` env. La tarea registra ambos comandos |
| `cn()` con tailwind-merge | El shim antiguo (`src/lib/utils.ts`) se mantiene hasta cierre del feature; revertir solo requiere usar la implementación previa (1 línea) |
| Boundaries enforce | Si bloquea trabajo en curso, configurar como `warn` en lugar de `error` (cambio en `eslint.config.mjs`); planificar fix inmediato. NO desactivar globalmente |
| Refactor masivo de feature (caso peor: `checkout`) | Cada feature se migra en su propia rama (sub-rama de `001-subsanacion-profunda-proyecto`); rollback = abandonar la sub-rama |

### Rollback global de la feature

Si tras la migración aparece un problema sistémico no atribuible a una tarea: `git revert` del rango de commits de `001-subsanacion-profunda-proyecto` a `master`. Como cada tarea fue verde individualmente, el revert es mecánico.

---

## Orden recomendado de implementación

Este orden refleja la regla "alto impacto, bajo riesgo primero" + las dependencias estructurales (no se puede mover una feature antes de tener boundaries y shared listos).

### Fase A — Hardening de seguridad inmediata (alto impacto, bajo riesgo)

A1. **T-Sec-1**: Cerrar relay abierto `/api/send-email`. Implementación mínima previa a la eliminación: añadir guard que solo permite invocaciones desde same-origin con sesión Supabase autenticada y un schema `zod` que limita `to` al email del usuario o a un email interno fijo. Loguear callers. (F-001)
A2. **T-Sec-2**: Mismo tratamiento a `/api/send-order-email`. Validar que `userEmail` coincide con la sesión activa o con el dueño del `orderId`. (F-002)
A3. **T-Sec-3**: Restringir mocks de PayPal a `PAYPAL_USE_MOCK === '1'` y eliminar fallbacks silenciosos. Documentar en `.env.example`. (F-004)
A4. **T-Sec-4**: Introducir `PAYPAL_CLIENT_ID` y `PAYPAL_LIVE_CLIENT_ID` server-only para el código server; conservar `NEXT_PUBLIC_PAYPAL_*_CLIENT_ID` para el SDK browser (excepción constitucional §V). Verificar que el bundle cliente no contenga `PAYPAL_*_SECRET`. Setear vars server nuevas en Vercel previamente. (F-005)
A5. **T-Sec-5**: Validar owner de orden en `/api/paypal/{create,capture}-order`. (F-003)
A6. **T-Sec-6**: Añadir validación `zod` en `/api/convert` (rango de `amount`, whitelist de `to`). (F-012)
A7. **T-Sec-7**: Mover `AUTHORIZED_ADMINS` a `ADMIN_EMAILS` env y centralizar `requireAdmin` (que en este momento sigue viviendo en `src/app/[locale]/admin/`; la centralización dentro de `features/admin` ocurre en Fase D). Setear var en Vercel ANTES del merge. (F-007)

> *Esta fase ataca los hallazgos críticos sin depender del refactor estructural. Los cambios viven en su ubicación actual; no se mueven archivos todavía.*

### Fase B — Setup tooling (cero riesgo funcional)

B1. **T-Setup-0**: Scaffold de `src/features/*/{domain,application,infrastructure,presentation}/.gitkeep` y barrels `index.ts` vacíos.
B2. **T-Setup-1**: Añadir `pnpm typecheck`; instalar `tailwind-merge`, `zod` (si T-Sec-1..6 lo añadieron, este paso no duplica), `eslint-plugin-boundaries` como devDeps.
B3. **T-Setup-2**: Configurar boundaries + no-restricted-imports.
B4. **T-Setup-3**: Mover `cn()` a `shared/utils/cn.ts` con `clsx` + `tailwind-merge`; shim en `src/lib/utils.ts`.
B5. **T-Setup-4**: Mover `formatCurrency`, `Database` type y `i18n/*` a `shared/`. Shims en ubicaciones antiguas.

### Fase C — Migración del cliente Supabase a `shared`

C1. **T-Auth-1**: Crear `shared/supabase/{server,client,middleware}.ts` con `@supabase/ssr`. Migrar `middleware.tsx` y `auth/callback/route.ts`. Smoke completo de auth.
C2. **T-Auth-2**: Migrar `SessionLayout` y `supabase-provider/provider.tsx` a `features/auth/presentation/`. Eliminar `src/lib/supabaseClient.ts`. Migrar consumidores (CartContext, useProducts) a clientes apropiados de `shared/supabase`.
C3. **T-Auth-3**: Eliminar dependencia `@supabase/auth-helpers-nextjs` del `package.json`.

### Fase D — Migración por features (orden por riesgo)

D1. **T-Curr**: Migrar feature `currency` (4 archivos, riesgo bajo). Sirve como prototipo del flujo de migración.
D2. **T-Notif**: Migrar feature `notifications`. Eliminar `/api/send-email` y `/api/send-order-email` **solo si** los logs introducidos en T-Sec-1/T-Sec-2 confirman cero callers externos durante ≥1 sprint; en caso contrario, mantener los endpoints como API interna autenticada permanente y migrar callers internos a server actions sin eliminar las rutas. Refactorizar `src/actions.ts` raíz a `features/notifications/application/actions/sendContactEmail.ts`.
D3. **T-Prod**: Migrar feature `products` (la más grande). Mover componentes de `cards/`, `search/`, `products/`, hooks, distributor, providers. Es la migración más voluminosa pero baja en riesgo de runtime: lecturas a Supabase, sin mutaciones críticas.
D4. **T-Cart**: Migrar feature `cart`. Refactorizar `CartContext` para consumir `getProductsByIds` de `@/features/products`. Resolver los `useEffect` complejos (F-016) con división en hooks pequeños.
D5. **T-Cont**: Migrar feature `content` (landings, guías, vcard, home composer, layout components). Volumen alto, riesgo medio (toca SEO).
D6. **T-Acc**: Migrar feature `account`.
D7. **T-Adm**: Migrar feature `admin`. Centralizar `requireAdmin` aquí. Convertir `AdminDashboard` y `ProductEditor` a `presentation`.
D8. **T-Chk**: Migrar feature `checkout`. Es la migración más sensible (pagos). Va al final porque cuando se aborda, todas sus dependencias (`cart`, `products`, `auth`, `notifications`) ya están migradas.

### Fase E — Limpieza y cierre

E1. **T-Clean-1**: Eliminar todos los shims temporales (`git grep "TODO(speckit): shim temporal"` → 0).
E2. **T-Clean-2**: Eliminar `src/utils/supabase/server.ts` (consolidado en `shared/supabase`), `src/lib/supabaseClient.ts` y cualquier otro archivo legacy que no haya quedado en cero referencias.
E3. **T-Clean-3**: ~~Consolidación de duplicación en `cards/Carousel/banner` (F-014)~~ **DIFERIDO a feature 002**. En el feature 001 solo se mueven los archivos a sus features destino sin tocar lógica; la consolidación de variantes en componentes parametrizados se aborda en una feature siguiente con QA visual dedicado (decisión de Clarification 2026-05-09).
E4. **T-Doc-1**: Revisar README, AGENTS.md, CLAUDE.md y `PAYPAL-SETUP.md` para reflejar el nuevo layout y los renombres de env vars.
E5. **T-Sign-Off**: Ejecutar checklist de seguridad completo de [quickstart.md §4](./quickstart.md), correr smoke completo de las 9 features y mergear a `master`.

### Fase F — Fuera del alcance del feature 001 (planificado como features futuras)

Estas tareas NO se ejecutan dentro de `001-subsanacion-profunda-proyecto`. Quedan registradas aquí como hoja de ruta para features posteriores, decisión cerrada en Clarifications 2026-05-09:

- **Feature 002** — Consolidación de duplicación visual (`cards/Carousel/home/banner`, F-014): unificar variantes en componentes parametrizados con QA visual dedicado.
- **Feature 003 (T-Test-1)**: Introducir Vitest + harness para `domain/` y `application/`.
- **Feature 003 (T-Test-2)**: Introducir Playwright + 6 flujos E2E críticos.
- **Feature futura (T-Roles)**: Migrar `ADMIN_EMAILS` env a tabla `user_roles` (DB migration + use case `requireAdmin` consultando tabla).

---

## Archivos o módulos candidatos a refactor

Lista priorizada por (severidad × frecuencia de cambio). Cada candidato se traduce en una o más tareas durante `/speckit-tasks`.

### Top-tier (refactor obligatorio en el alcance)

1. **`src/app/api/send-email/route.ts`** — eliminar tras Fase D2; entre Fase A y D2 vive con auth obligatoria. (F-001)
2. **`src/app/api/send-order-email/route.ts`** — idem. (F-002)
3. **`src/app/api/paypal/paypalHelpers.ts`** — refactor a `features/checkout/infrastructure/paypal/client.ts`; eliminar mock fallbacks silenciosos. (F-003, F-004, F-005)
4. **`src/app/api/paypal/{create,capture}-order/route.ts`** — adelgazar; validación con zod; verificación de owner; delegar a use case. (F-003)
5. **`src/lib/supabaseClient.ts`** — eliminar; reemplazar por `shared/supabase/{server,client}.ts`. (F-006, F-009)
6. **`src/utils/supabase/server.ts`** — consolidar en `shared/supabase/server.ts`. (F-009)
7. **`src/components/SessionLayout.tsx`** — mover a `features/auth/presentation/SessionLayout.tsx`; usar `@supabase/ssr`. (F-009)
8. **`src/middleware.tsx`** — usar `shared/supabase/middleware.ts`. (F-009)
9. **`src/app/[locale]/admin/page.tsx`** — eliminar `AUTHORIZED_ADMINS` hardcoded; mover guard a `features/admin/application/use-cases/requireAdmin.ts`; reusar en sub-páginas admin. (F-007)
10. **`src/app/[locale]/admin/products/page.tsx`** y **`/admin/events/page.tsx`** — adelgazar; usar `requireAdmin` central. (F-013)
11. **`src/lib/utils.ts`** — reescribir `cn()` con `tailwind-merge` y mover a `shared/utils/cn.ts`. (F-010)
12. **`src/actions.ts`** (raíz) — mover a `features/notifications/application/actions/sendContactEmail.ts`; quitar `"use client"` y reemplazar `fetch('/api/send-email')` por invocación directa al transport. (F-008, F-021)
13. **`src/context/CartContext.tsx`** — mover a `features/cart/presentation/state/CartContext.tsx`; extraer `encode/decode` a `application/encode.ts`; reemplazar singleton Supabase por cliente browser de `shared`; resolver useEffect complejo. (F-006, F-016)
14. **`src/context/ProductsContext.tsx`** — mover a `features/products/presentation/state/ProductsContext.tsx`. (F-013)
15. **`src/lib/hooks/useProducts.ts`** — mover a `features/products/application/hooks/useProducts.ts`; reemplazar singleton Supabase. (F-006, F-013)
16. **`src/lib/productsDistributor.ts`** — mover a `features/products/application/distribute.ts`; tests unitarios prioritarios cuando se introduzca Vitest.
17. **`src/app/[locale]/HomePageData.tsx`** y **`HomeContainer.tsx`** — mover a `features/content/application` y `features/content/presentation`. (F-013)
18. **`src/lib/orderConfirmationEmail.ts`** — mover a `features/notifications/application/templates/order-confirmation.ts`; sanitizar HTML.
19. **`src/lib/{seo.ts,seoConfig.ts,structuredData.ts}`** — mover a `shared/seo/`.
20. **`src/lib/{categories,search,viewedHistory,convert-core,formatCurrency,guidesContent}.ts`** — mover según mapping de [data-model.md §1](./data-model.md).
21. **`src/app/api/convert/route.ts`** — añadir validación `zod`; manejar errores con mensaje genérico. (F-011, F-012)
22. **`eslint.config.mjs`** — añadir boundaries + no-restricted-imports. (F-019)
23. **`package.json`** — añadir `typecheck`, dependencias `tailwind-merge`/`zod`/`eslint-plugin-boundaries`; remover `@supabase/auth-helpers-nextjs` al cierre. (F-020)
24. **`.env.example`** — agregar `PAYPAL_CLIENT_ID`, `PAYPAL_LIVE_CLIENT_ID`, `PAYPAL_USE_MOCK`, `ADMIN_EMAILS`. Conservar `NEXT_PUBLIC_PAYPAL_CLIENT_ID` y `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` documentadas como excepción constitucional (Client IDs públicos del SDK browser).
25. **`src/types-db.ts`** — mover a `shared/types/database.ts`.

### Mid-tier (refactor en alcance pero menor riesgo)

26. **`src/app/[locale]/vcard/{page,FormVCard,actions}.tsx`** — mover a `features/content/presentation/vcard/` + `features/content/application/actions/createVCard.ts`. (F-013)
27. **`src/components/admin/{AdminDashboard,ProductEditor}.tsx`** — mover a `features/admin/presentation/components/`.
28. **`src/components/products/*` (15 archivos)** — mover a `features/products/presentation/components/`.
29. **`src/components/account/*` y `src/components/user/*`** — mover a `features/account/presentation/components/`.
30. **`src/components/checkout/*`** — mover a `features/checkout/presentation/components/`.
31. **`src/components/search/*`** — mover a `features/products/presentation/components/search/`.
32. **`src/components/general/{Navbar,NavbarClient,Footer,WhatsAppBubble,FormMail}.tsx`** — Navbar/Footer/WhatsAppBubble a `features/content/presentation/layout/`; FormMail a `features/notifications/presentation/`.
33. **`src/components/home/*` y `src/components/home/banner/*`** — mover a `features/content/presentation/home/`; AddToCartButton se decide entre `features/cart/presentation/` o `features/products/presentation/` durante T-Cart.
34. **`src/components/Carousel/*`** — mover a `shared/ui/carousel/` (es genérico).
35. **`src/components/{LocaleSwitcher,LocaleSwitcherSelect,ScrollToTopButton,CurrencyConverterRow}.tsx`** — distribución según ownership: `LocaleSwitcher*` a `shared/ui/locale-switcher/`, `ScrollToTopButton` a `shared/ui/`, `CurrencyConverterRow` a `features/currency/presentation/`.
36. **`src/components/cards/*` (9 archivos)** — mover a `features/products/presentation/components/cards/`. La consolidación de variantes (F-014) queda en T-Clean-3 o pospuesta.
37. **`src/components/providers/ProductsProvider.tsx`** — mover a `features/products/presentation/providers/`.
38. **`src/app/supabase-provider/provider.tsx`** — mover a `features/auth/presentation/providers/SupabaseProvider.tsx`.

### Low-tier (cambios cosméticos / consolidación)

39. **`add_featured_column.sql`** — mover a `db/migrations/0001_featured_column.sql` con convención de versionado. (F-022)
40. **`SEO_MIGRATION_GUIDE.md`, `PAYPAL-SETUP.md`** — mover a `docs/` y referenciar desde README. (F-024)
41. **Console logs en route handlers** — sustituir por logger estructurado básico (función helper en `shared/observability/`). (F-017)
42. **`src/components/Carousel/index.tsx`** vs `cards/CarouselClient.tsx` vs `home/banner/CarouselClient.tsx` — consolidar en T-Clean-3.

---

## Complexity Tracking

> No se requieren justificaciones de complejidad para el alcance original. La introducción de tres nuevas dependencias (`tailwind-merge`, `zod`, `eslint-plugin-boundaries`) está justificada en R3, R4 y R5 de [research.md](./research.md), y reemplaza/complementa stack existente sin alternativa más simple aceptable.

### Desviación documentada: severidad del gate "No BIG Components" (Constitución §III)

La constitución §III es MUST. Las reglas ESLint `max-lines` (300), `max-lines-per-function` (100) y `complexity` (15) se introdujeron en `eslint.config.mjs` durante la subsanación (2026-05-23) con severidad **`warn`** en lugar de `error`. Razón:

- Baseline al activar las reglas: **16** archivos sobre 300 LOC, **55** funciones sobre 100 LOC, **74** instancias de complexity > 15 en `src/features/`.
- El feature 001 se centra en migración estructural (movimientos y renombres) según FR-009 ("no reescritura desde cero"). Refactorizar 145+ violaciones requeriría reescritura, contradice FR-009 y excede el scope declarado.
- La consolidación visual y descomposición de componentes está **diferida a feature 002** por Clarification 2026-05-09 (F-014).
- Los archivos en `application/templates/`, `application/data/`, `application/guides/data.ts` y `shared/i18n/messages/` están exentos por el principio (excepciones constitucionales).

**Promesa de cierre**: feature 002 (consolidación visual) promoverá las tres reglas a `error` tras reducir las violaciones a cero o documentar cada excepción con `// eslint-disable-next-line` + razón en línea con la constitución §III.
