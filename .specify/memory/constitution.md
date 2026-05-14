# Sobrepoxi Constitution

> Esta constitución gobierna todo cambio de código en el repositorio `sobrepoxi`. Es **non-negotiable** dentro del alcance de cada feature; cualquier desviación requiere una entrada explícita en *Complexity Tracking* del plan correspondiente y aprobación del owner del repositorio. Los principios MUST son bloqueantes en revisión; los SHOULD admiten excepciones justificadas por escrito en la tarea.

## Core Principles

### I. Clean Architecture por Features (Vertical Slices) — MUST

Todo el código de producto vive en **una de tres ubicaciones**:

- `src/features/<feature>/{domain,application,infrastructure,presentation}/` para capability de negocio.
- `src/app/` reservado **exclusivamente** a routing de Next.js (páginas + route handlers + layouts + sitemap/robots).
- `src/shared/` para código genuinamente transversal (clientes de proveedores, i18n, SEO, utilidades puras, primitives UI sin lógica de dominio).

Reglas duras:

- Una feature = una capability de negocio top-level. Cardinalidad esperada **8–12 features** en el repositorio.
- Subdivisiones internas son carpetas dentro de la feature, no features nuevas.
- Las cuatro capas existen lógicamente; pueden estar vacías si la feature aún no las necesita, pero su nombre y orden están fijos.
- `domain` no importa de framework ni de Supabase. `application` puede importar de `domain` + `shared` + barrels de otras features. `infrastructure` implementa adaptadores externos. `presentation` consume `application` + `domain`.

**Why**: El proyecto venía de mezclar routing, lógica de negocio, fetch a BD y presentación en los mismos archivos (`src/components/*`, `src/lib/*`, `src/context/*`, `src/app/[locale]/HomePageData.tsx`). Esa mezcla fue la causa raíz de duplicación, errores silenciosos y regresiones inintencionales. La separación por capas + features hace los cambios localmente razonables.

### II. API Pública por Feature vía Barrel — MUST

- Cada feature expone su API en un único archivo barrel: `src/features/<f>/index.ts`.
- Solo se reexportan los símbolos públicos. Lo demás es interno a la feature.
- **Prohibido**: imports cross-feature que apunten a paths distintos de `@/features/<f>` (sin profundidad). Ejemplo prohibido: `import { foo } from "@/features/products/application/use-cases/getProductById"`.
- **Prohibido**: imports desde `shared/` hacia `features/` (la dirección es features ← shared, nunca al revés).
- Ambas reglas están enforced por `eslint-plugin-boundaries` + `no-restricted-imports` con severidad `error` en `eslint.config.mjs`.
- **Excepción de routing Next.js**: los módulos de `src/app/**/page.tsx`, `layout.tsx`, `route.ts` y metadata/static params pueden importar directamente desde `src/features/<f>/presentation/pages/*` cuando el módulo importado usa APIs server-only de Next (`next/headers`, `next-intl/server`, Supabase server clients, etc.). Esos route modules actúan como adaptadores del App Router y no deben reexportarse desde barrels consumidos por componentes cliente.

**Why**: Sin barrels, cualquier consumidor termina dependiendo de la estructura interna de la feature y la refactorización se vuelve cross-cutting. Con barrels, la feature puede reorganizar su interior sin romper consumidores.

### III. No BIG Components — MUST

Un componente, hook, use case o módulo es "BIG" si cumple cualquiera de los siguientes:

- Excede **300 líneas** de código (excluyendo imports y JSX puro de presentación).
- Tiene **más de una responsabilidad** detectable por el patrón "y": *"este componente hace X **y** Y"* (data-fetch + render + form-state + URL-sync + side-effects).
- Maneja **más de 3 piezas de estado independientes** en un solo `useState`/`useReducer` chain.
- Acumula **más de 2 `useEffect`** con dependencias diferentes que no comparten propósito.
- Mezcla **capas**: un componente de `presentation` que hace queries a Supabase directamente; un `use-case` de `application` que importa primitives UI.

Cuando un componente/módulo se acerca al umbral, se descompone:

- Extraer **subcomponentes** por sección visual con su propia responsabilidad.
- Extraer **hooks personalizados** (`use<X>`) por slice de estado o efecto.
- Extraer **use cases** a `application/use-cases/` cuando la lógica es server-side o derivable.
- Extraer **helpers puros** a `application/` o `shared/utils/` si son reutilizables.

Excepciones aceptables (deben anotarse con comentario):

- Templates de email HTML estáticos en `application/templates/`.
- Datos seed o constantes largas en `application/data/`.

**Why**: El render loop de producción (`Maximum call stack size exceeded`, commits 0c2b5d2..4dab07f) salió justamente de un `CartContext` que acumulaba 5+ responsabilidades en un mismo archivo. Los BIG components son la fuente primaria de bugs de runtime no detectables por lint/typecheck.

### IV. Schema-Validated Boundaries (Zod en Toda Frontera Server) — MUST

- Todo route handler en `src/app/api/.../route.ts` valida input con un schema `zod` definido en `src/features/<f>/application/schemas/` antes de delegar al use case.
- Toda server action (`"use server"`) valida input con su schema antes de ejecutar lógica.
- Los schemas se exportan vía el barrel de su feature; los consumidores cliente reusan los tipos derivados (`z.infer<typeof schema>`).
- Errores de validación se traducen a respuestas HTTP genéricas (`400`/`422`) sin filtrar detalle interno.

**Why**: La validación ad-hoc (`if (!orderId)`, regex sueltos) era inconsistente, intipada y propagaba errores hasta el cliente con stack traces de Supabase. Zod centraliza el contrato y elimina la categoría completa de "input mal formado llegando a BD".

### V. Security Baseline — MUST

Estas reglas son **no negociables** y CRÍTICAS:

- **Cero secretos en bundle cliente**. Variables con secreto NO llevan prefijo `NEXT_PUBLIC_*`. Verificación: `grep -rE "(EMAIL_PASS|PAYPAL_(LIVE_)?SECRET|SUPABASE_SERVICE_ROLE_KEY)" .next/static` → 0 matches tras `pnpm build`. Excepción única documentada: `NEXT_PUBLIC_PAYPAL_CLIENT_ID` es el Client ID público del SDK browser de PayPal, no un secreto.
- **Sesión obligatoria en endpoints sensibles**. Todo route handler que muta estado (PayPal, órdenes, envío de correo, formularios admin) valida `session` vía `createServerSupabaseClient()` de `@/shared/supabase/server`. Sin sesión → `401`. Sin permisos → `403`.
- **Validación de owner en operaciones por usuario**. Toda operación que toca `orders`, `cart_items`, `addresses`, `vcards` valida que `entity.user_id === session.user.id` antes de leer o mutar. No hay caminos alternativos para invitados en checkout (decisión Clarification 2026-05-09).
- **Mensajes de error genéricos al cliente**. `error.message` de proveedores externos (PayPal, Supabase, nodemailer) NUNCA se devuelve al cliente. El detalle queda en `console.error` server-only.
- **Roles admin por env, no por código**. La lista de admins se lee de `ADMIN_EMAILS` (env, server-only). No hardcodear emails ni IDs de admin en código fuente.
- **Mocks de pago bajo flag explícito**. Los fallbacks a mocks de PayPal solo se activan con `PAYPAL_USE_MOCK === '1'`. Nunca por `NODE_ENV`.

**Why**: El relay SMTP abierto (`/api/send-email` sin auth), los mocks PayPal silenciosos en staging, y `AUTHORIZED_ADMINS` hardcoded eran riesgo financiero y de reputación inmediato. Estos no se "arreglan en la próxima iteración".

### VI. No Silent Errors — MUST

- Todo bloque `try/catch` que captura una excepción **debe** hacer al menos uno de: (a) loguear con `console.error` (o el logger compartido) + propagar; (b) traducir a un estado de aplicación explícito; (c) anotar con comentario `// intentional swallow: <razón>` cuando el silencio es la decisión correcta.
- Toda `Promise` retornada por código que pueda fallar debe ser `await`-eada o tener su `.catch()` manejado. No se permiten "fire-and-forget" sin comentario explícito.
- No `catch (e) {}` vacíos. No `catch (e) { return null }` sin comentario.
- Verificación periódica: `findings.md` registra el conteo de catches sin handler antes/después del feature; el objetivo de cierre es **cero o casos justificados por escrito** (SC-010).

**Why**: Los errores tragados son la categoría de bugs más cara: no fallan en tests, no aparecen en monitoreo, y producen estados inconsistentes en BD que solo se detectan cuando un usuario reclama.

### VII. Verde por Tarea + Vercel Preview — MUST

Cada tarea de plan se cierra solo cuando se cumple TODO lo siguiente:

1. `pnpm lint` (incluye `boundaries/dependencies` y `no-restricted-imports`) → 0 errores nuevos vs línea base.
2. `pnpm typecheck` → 0 errores.
3. `pnpm build` → exit 0.
4. Si el cambio toca `src/app/`, `src/features/*/presentation/`, contexts, providers o middleware: **deployment preview de Vercel del PR carga `/` sin errores en la consola del navegador**. Inspeccionar DevTools console al menos una vez por PR.
5. Smoke test asociado del feature pasa (`quickstart.md §3`).

El punto 4 existe porque `pnpm build` local pasa aunque haya render loops en runtime — solo el preview detecta `Maximum call stack size exceeded` y similares antes de prod.

**Why**: La regresión que llevó a `Application error: a client-side exception has occurred` en producción no era detectable por lint/typecheck/build. El gate de preview cierra ese hueco.

### VIII. Incremental, No Big-Bang — SHOULD (MUST cuando aplica)

- **No reescrituras desde cero** (FR-009). Los cambios son mayoritariamente movimientos, renombres y shims temporales.
- Una feature migrada = un PR (o serie corta secuencial). No acumular más de 3 PRs sin mergear.
- Cada PR deja `master` desplegable. El rollback es `git revert <merge-commit>`.
- Los shims temporales se marcan con `// TODO(speckit): shim temporal — eliminar al cierre del feature` y se eliminan en la fase Polish del feature.

**Why**: Reorganizar de un golpe rompe todo, bloquea al equipo y es irrevisable. El plan incremental es el único mecanismo que mantiene velocidad sin sacrificar seguridad.

### IX. URLs y Compatibilidad — MUST

- Las URLs públicas (i18n incluido) se preservan idénticas. Cualquier cambio de URL es un breaking change que requiere documentación explícita + redirect.
- Toda ruptura de compatibilidad con consumidores actuales se documenta en el commit message (`BREAKING CHANGE:` footer en commits convencionales) y en `closure-report.md` del feature.
- Las migraciones de BD son mínimas, justificadas y reversibles cuando sea posible. Migración no reversible exige razón escrita.

**Why**: El proyecto está indexado en buscadores y desplegado en producción con usuarios activos. Romper una URL pública o un esquema de BD sin documentación es perder tráfico y datos.

---

## Quality Standards

### Naming & Language

- **Identificadores** (variables, funciones, tipos, módulos) en **inglés**.
- **Strings visibles al usuario** (toasts, labels, mensajes de error UI, copy de páginas) en **español**, gestionado vía `next-intl`.
- **Comentarios técnicos** en inglés. Comentarios de UX/contenido en el idioma del contenido.
- **Conventional Commits** con scope cuando aplique: `fix(auth):`, `feat(checkout):`, `refactor(shared):`. `BREAKING CHANGE:` footer cuando rompa compatibilidad.

### TypeScript

- `strict: true` no negociable.
- Preferir `interface` para object shapes; `type` para uniones/intersecciones.
- Prohibido `any` salvo en límites con librerías sin tipos (anotar con `// eslint-disable-next-line` + razón).
- Tipos derivados de schemas zod (`z.infer<typeof X>`), no duplicados manualmente.

### React

- Componentes funcionales únicamente.
- Server Components por defecto; `"use client"` solo cuando se necesita estado, efectos o APIs del browser.
- Server actions (`"use server"`) viven en `src/features/<f>/application/actions/` y son expuestas por el barrel.
- No singletons de cliente Supabase. Cada contexto crea el cliente apropiado de `@/shared/supabase/{server,client,middleware}`.

### Styling

- Tailwind CSS 4 + Radix UI primitives.
- Composición de clases vía `cn()` de `@/shared/utils/cn` (clsx + tailwind-merge). No concatenar strings de Tailwind a mano.
- Tokens de diseño consistentes; sin colores hex sueltos en componentes.

### Antipatterns Prohibidos

- BIG components (ver Principio III).
- Singletons de cliente Supabase en código nuevo.
- `fetch('/api/...')` desde server-side con URL relativa.
- `console.log` en route handlers (usar logger compartido `@/shared/observability/logger`).
- Wrappers, factories o abstracciones sin caso de uso concreto al menos doble.
- Comentarios que describen QUÉ hace el código bien nombrado. Solo comentar el PORQUÉ no-obvio.

---

## Verification Gates

Cada feature debe satisfacer estas verificaciones antes de mergear a `master`:

| Gate | Mecanismo | Bloqueante |
|------|-----------|------------|
| Lint | `pnpm lint` | Sí |
| Type-check | `pnpm typecheck` | Sí |
| Build | `pnpm build` | Sí |
| Boundaries | `boundaries/dependencies` en lint | Sí |
| Bundle clean | grep de secretos en `.next/static` | Sí (en features que tocan endpoints o env vars) |
| Vercel preview | DevTools console sin errores | Sí (en features que tocan UI/middleware/contexts) |
| Smoke manual | `quickstart.md §3` por feature | Sí (en features migradas en Phase 4) |
| Security checklist | `quickstart.md §4` | Sí al cierre del feature |

Fault-injection periódico: cada feature mete un import prohibido en una rama temporal y verifica que el lint falla. Reversión inmediata.

---

## Governance

- **Esta constitución supersede** convenciones implícitas y comentarios sueltos en archivos. Si un archivo dice X y la constitución dice Y, gana la constitución y se corrige el archivo.
- **Amendments**: cualquier cambio a esta constitución requiere (a) PR específico tocando solo este archivo + dependencias de plantilla; (b) razón documentada en el PR description; (c) bump de versión semántico (MAJOR para cambio de principio MUST, MINOR para principio nuevo, PATCH para clarificación).
- **Justificación de complejidad**: las desviaciones aceptadas se registran en *Complexity Tracking* del plan del feature donde ocurren. Si una desviación se repite, se promueve a excepción permanente aquí o se elimina del código.
- **Runtime guidance**: las reglas operativas (comandos `pnpm`, comandos de verificación, paths) viven en `CLAUDE.md` y `AGENTS.md`. Esta constitución fija los principios; las guías fijan los comandos.
- **Quality gate de PR**: todo PR a `master` debe incluir en su descripción la lista de Verification Gates relevantes con su evidencia (commit del lint verde, captura del preview, item del checklist).

**Version**: 1.0.1 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-05-14
