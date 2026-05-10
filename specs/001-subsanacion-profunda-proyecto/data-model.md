# Phase 1 — Data Model: Inventario de Features y Entidades del Proceso

**Feature**: 001-subsanacion-profunda-proyecto
**Date**: 2026-05-09

Este documento concreta dos cosas:
1. **Inventario destino de features** (mapeo `archivo actual → feature destino`).
2. **Entidades del proceso de subsanación** (Hallazgo, Feature, Capa, Tarea de migración, Verificación, Migración de BD) con campos y reglas de validación.

---

## 1. Inventario destino de features

Cardinalidad: **9 features top-level + 1 módulo `shared`** (dentro del rango 8-12 fijado por spec).

### 1.1 Feature `products`

**Capability**: catálogo, listado, detalle, filtros, búsqueda relacionada, reviews, viewed history, distribución de productos en grids/carouseles.

**Mapping (origen → destino)**:

| Origen actual | Destino |
|---|---|
| `src/components/products/ProductCard.tsx` | `features/products/presentation/components/ProductCard.tsx` |
| `src/components/products/ProductDetail.tsx` | `features/products/presentation/components/ProductDetail.tsx` |
| `src/components/products/ProductsPageContent.tsx` | `features/products/presentation/components/ProductsPageContent.tsx` |
| `src/components/products/ProductFilters.tsx` | `features/products/presentation/components/ProductFilters.tsx` |
| `src/components/products/ProductModal*.tsx` | `features/products/presentation/components/` |
| `src/components/products/RelatedProducts*.tsx` | `features/products/presentation/components/` |
| `src/components/products/PaginationControls.tsx` | `features/products/presentation/components/` |
| `src/components/products/LoadingGallery.tsx` | `features/products/presentation/components/` |
| `src/components/products/ReviewForm.tsx`, `ReviewsList.tsx` | `features/products/presentation/components/` |
| `src/components/products/ViewedHistoryTracker.tsx`, `ViewedProductsHistory.tsx` | `features/products/presentation/components/` |
| `src/components/products/ClientComponents.tsx` | `features/products/presentation/components/` |
| `src/components/cards/*` (Card, FeaturedProductsSection, GiftsCarouselSection, GridSection, OptimizedCarrucelSection, OptimizedGridSection, CarrucelSection, CarrucelSectionA, CarouselClient) | `features/products/presentation/components/cards/` |
| `src/components/search/*` | `features/products/presentation/components/search/` |
| `src/components/providers/ProductsProvider.tsx` | `features/products/presentation/providers/ProductsProvider.tsx` |
| `src/context/ProductsContext.tsx` | `features/products/presentation/state/ProductsContext.tsx` |
| `src/lib/hooks/useProducts.ts` | `features/products/application/hooks/useProducts.ts` |
| `src/lib/productsDistributor.ts` | `features/products/application/distribute.ts` |
| `src/lib/categories.ts` | `features/products/application/categories.ts` |
| `src/lib/search.ts` | `features/products/application/search.ts` |
| `src/lib/viewedHistory.ts` | `features/products/application/viewed-history.ts` |
| `src/components/CurrencyConverterRow.tsx` | (queda en `currency`, ver §1.9) |

**Public API esperada** (`src/features/products/index.ts`): tipos `Product`, `Category`; use cases `getHomePageData`, `getProductsByIds`, `searchProducts`, `getProductById`; componentes públicos para composición desde `app/`.

**DB tables consumidas**: `products`, `categories`, `reviews` (si existe), `viewed_history` (si existe).

---

### 1.2 Feature `cart`

**Capability**: estado del carrito, codificación URL, sincronización con BD para usuarios autenticados.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/context/CartContext.tsx` | `features/cart/presentation/state/CartContext.tsx` |
| `src/app/[locale]/cart/page.tsx` | (sigue en `src/app/[locale]/cart/page.tsx`, refactorizada como composición delgada) |

**Public API**: hook `useCart`, provider `CartProvider`, tipos `CartItem`; use cases `encodeCartToBase64`, `decodeCartFromBase64`, `syncCartWithDB`.

**Refactors mínimos durante la migración**:
- Extraer `encodeCartToBase64` / `decodeCartFromBase64` a `application/encode.ts` (puro).
- Mover `fetchProductsAndRebuildCart` a un use case que consume `getProductsByIds` de `@/features/products`.
- Reemplazar `supabase` singleton por cliente apropiado de `@/shared/supabase` con sesión.

---

### 1.3 Feature `checkout`

**Capability**: flujo de pago multi-step, formularios PayPal, creación/captura de orden, sincronización con BD.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/components/checkout/PaymentForm.tsx` | `features/checkout/presentation/components/PaymentForm.tsx` |
| `src/components/checkout/PayPalCardMethod.tsx` | `features/checkout/presentation/components/PayPalCardMethod.tsx` |
| `src/components/checkout/StepOne.tsx` | `features/checkout/presentation/components/StepOne.tsx` |
| `src/components/checkout/StepTwo.tsx` | `features/checkout/presentation/components/StepTwo.tsx` |
| `src/app/api/paypal/paypalHelpers.ts` | `features/checkout/infrastructure/paypal/client.ts` |
| `src/app/api/paypal/create-order/route.ts` | route handler delgado en `src/app/api/paypal/create-order/route.ts` que delega a `features/checkout/application/use-cases/createPaypalOrder.ts` |
| `src/app/api/paypal/capture-order/route.ts` | idem → `features/checkout/application/use-cases/capturePaypalOrder.ts` |
| `src/app/[locale]/checkout/page.tsx` | composición delgada, importa de `@/features/checkout` |
| `src/app/[locale]/order-confirmation/page.tsx` | composición delgada |

**Public API**: use cases `createPaypalOrder`, `capturePaypalOrder`, `placeOrder`; componentes `PaymentForm`, `StepOne`, `StepTwo`; tipos `OrderInput`, `PaypalOrderRef`.

**DB tables consumidas**: `orders`, `order_items`, `user_tickets` (legacy, ver §3.3).

**Validaciones críticas** (introducidas por la migración):
- Verificación de `orders.user_id === session.user.id` antes de crear/capturar orden PayPal.
- Validación de input con `zod`.
- Eliminación de mock fallbacks ejecutados sin flag explícito.

---

### 1.4 Feature `auth`

**Capability**: login, registro, callback OAuth, sesión Supabase, recuperación de password.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/app/auth/callback/route.ts` | route handler delgado que delega a `features/auth/application/use-cases/exchangeOAuthCode.ts` |
| `src/app/[locale]/auth/callback/route.ts` | idem (versión locale-prefixed) |
| `src/app/[locale]/login/page.tsx` | composición delgada |
| `src/app/[locale]/register/page.tsx` | composición delgada |
| `src/app/supabase-provider/provider.tsx` | `features/auth/presentation/providers/SupabaseProvider.tsx` |
| `src/components/SessionLayout.tsx` | `features/auth/presentation/SessionLayout.tsx` |

**Public API**: provider `SupabaseProvider`, hook `useSupabase`, componente `SessionLayout`; use cases `exchangeOAuthCode`, `getCurrentSession`, `signOut`.

**Refactors**:
- Cambiar `createServerComponentClient` (auth-helpers legacy) por `@supabase/ssr`.
- Centralizar la creación del cliente en `@/shared/supabase`.

---

### 1.5 Feature `account`

**Capability**: perfil, direcciones, listado de órdenes del usuario.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/components/account/AccountClient.tsx` | `features/account/presentation/components/AccountClient.tsx` |
| `src/components/account/AddressTab.tsx` | `features/account/presentation/components/AddressTab.tsx` |
| `src/components/account/OrdersTab.tsx` | `features/account/presentation/components/OrdersTab.tsx` |
| `src/components/account/ProfileTab.tsx` | `features/account/presentation/components/ProfileTab.tsx` |
| `src/components/user/UserDropdown.tsx` | `features/account/presentation/components/UserDropdown.tsx` |
| `src/app/[locale]/account/page.tsx` | composición delgada |
| `src/app/[locale]/viewed-history/page.tsx` | composición delgada (tracker es de `products`, vista es account/content; final en plan) |
| `src/app/[locale]/vcard/*` | aquí o en `content`; **decisión**: queda en `content` por ser página estática con form independiente. |

**Public API**: componentes `AccountClient`, `UserDropdown`; use cases `getUserOrders`, `updateUserProfile`, `addUserAddress`.

**DB tables consumidas**: `profiles`, `addresses`, `orders`.

---

### 1.6 Feature `admin`

**Capability**: panel admin (productos, eventos), guardas de rol.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/components/admin/AdminDashboard.tsx` | `features/admin/presentation/components/AdminDashboard.tsx` |
| `src/components/admin/ProductEditor.tsx` | `features/admin/presentation/components/ProductEditor.tsx` |
| `src/app/[locale]/admin/page.tsx` | composición delgada con guard delegado a feature |
| `src/app/[locale]/admin/products/page.tsx` | composición delgada |
| `src/app/[locale]/admin/events/page.tsx` | composición delgada |

**Public API**: componente `AdminDashboard`, use case `requireAdmin`, use cases CRUD para productos.

**Refactor crítico**: mover `AUTHORIZED_ADMINS` hardcoded a env (`ADMIN_EMAILS`, server-only) o a tabla `user_roles` (decisión final en plan; baseline: env). El check `requireAdmin` queda centralizado en la feature.

---

### 1.7 Feature `notifications`

**Capability**: envío de correos transaccionales (contacto, confirmación de orden).

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/lib/orderConfirmationEmail.ts` | `features/notifications/application/templates/order-confirmation.ts` |
| `src/app/api/send-email/route.ts` | **eliminado** (ver R8 de research). Reemplazado por server action `sendEmail` en `features/notifications/application/actions/sendEmail.ts` (server-only). |
| `src/app/api/send-order-email/route.ts` | **eliminado**; sustituido por server action `sendOrderConfirmationEmail`. |
| `src/actions.ts` (handleVacationForm) | `features/notifications/application/actions/sendContactEmail.ts` (lo que hoy hace `actions.ts` post-refactor: ya no llama por HTTP, llama a la server action interna). |

**Public API**: server actions `sendOrderConfirmationEmail`, `sendContactEmail`; helper `renderOrderConfirmationHtml`.

**Infrastructure**: `infrastructure/transport/nodemailer.ts` con la configuración SMTP, server-only.

---

### 1.8 Feature `content`

**Capability**: landing pages, guías, páginas estáticas, páginas de servicios, home composer.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/app/[locale]/about/page.tsx` | composición delgada que importa `@/features/content` |
| `src/app/[locale]/conditions-service/page.tsx` | idem |
| `src/app/[locale]/contact/page.tsx` | idem (form usa `@/features/notifications`) |
| `src/app/[locale]/privacy-policies/page.tsx` | idem |
| `src/app/[locale]/shipping/page.tsx` | idem |
| `src/app/[locale]/epoxy-floors/page.tsx` | idem |
| `src/app/[locale]/industrial-epoxy-flooring/page.tsx` | idem |
| `src/app/[locale]/luxury-design-flooring/page.tsx` | idem |
| `src/app/[locale]/luxury-furniture/page.tsx` | idem |
| `src/app/[locale]/qr/page.tsx` | idem |
| `src/app/[locale]/guias/page.tsx`, `[slug]/page.tsx`, `GuidesGrid.tsx` | idem; lógica a `features/content/application/guides/*` |
| `src/lib/guidesContent.ts` | `features/content/application/guides/data.ts` |
| `src/app/[locale]/page.tsx` (home) y `HomeContainer.tsx`, `HomePageData.tsx` | composición delgada que importa `home composer` desde `features/content/presentation/Home.tsx` |
| `src/components/home/*` | `features/content/presentation/home/*` (Banner, ProductCategoriesBanner, AddToCartButton — éste último puede vivir en `cart` o `products`; decisión final en plan) |
| `src/components/Carousel/*` | `shared/ui/carousel/` (es carrusel genérico) |
| `src/components/general/Footer.tsx`, `Navbar.tsx`, `NavbarClient.tsx`, `WhatsAppBubble.tsx`, `FormMail.tsx` | `features/content/presentation/layout/` (Navbar/Footer son layout del sitio; FormMail puede ser `notifications/presentation`) |
| `src/app/[locale]/vcard/*` | `features/content/presentation/vcard/*` y `features/content/application/actions/createVCard.ts` |

**Public API**: componentes `Home`, `Navbar`, `Footer`, `WhatsAppBubble`, `GuidesGrid`; use cases `getHomePageData` (composición de `products` + datos del home), `getGuides`, `getGuideBySlug`, `createVCard`.

**Nota**: `getHomePageData` actual (`src/app/[locale]/HomePageData.tsx`) se reubica como use case en `features/content` que internamente llama a `@/features/products` para obtener categorías/productos.

---

### 1.9 Feature `currency`

**Capability**: conversión USD/CRC para mostrar precios alternativos.

**Mapping**:

| Origen actual | Destino |
|---|---|
| `src/lib/convert-core.ts` | `features/currency/application/convert.ts` |
| `src/lib/formatCurrency.ts` | `shared/utils/formatCurrency.ts` (formatter puro y reusable) |
| `src/components/CurrencyConverterRow.tsx` | `features/currency/presentation/CurrencyConverterRow.tsx` |
| `src/app/api/convert/route.ts` | route handler delgado que delega a `features/currency/application/use-cases/convertUsd.ts` |

**Public API**: use case `convertUsd`, componente `CurrencyConverterRow`.

---

### 1.10 Módulo `shared`

| Origen actual | Destino |
|---|---|
| `src/lib/supabaseClient.ts` | **eliminar** y reemplazar por `shared/supabase/client.ts` (browser) y `shared/supabase/server.ts` (server) basados en `@supabase/ssr` |
| `src/utils/supabase/server.ts` | `shared/supabase/server.ts` (consolidar) |
| `src/i18n/navigation.tsx`, `request.tsx`, `routing.tsx` | `shared/i18n/` |
| `src/lib/seo.ts`, `seoConfig.ts`, `structuredData.ts` | `shared/seo/` |
| `src/lib/utils.ts` (`cn`) | `shared/utils/cn.ts` (reescrito con `clsx` + `tailwind-merge`) |
| `src/types-db.ts` | `shared/types/database.ts` |
| `src/components/ui/tabs.tsx` | `shared/ui/tabs.tsx` |
| `src/components/ScrollToTopButton.tsx` | `shared/ui/ScrollToTopButton.tsx` |
| `src/components/LocaleSwitcher.tsx`, `LocaleSwitcherSelect.tsx` | `shared/ui/locale-switcher/` |
| `src/components/Carousel/*` | `shared/ui/carousel/` (genérico) |
| `src/middleware.tsx` | sigue en raíz por restricción Next.js; importa solo de `shared` y `features/auth` |

**Reglas**: `shared` no importa de `features/*` ni de `app/*`. Si una utilidad necesitara conocer una feature, no es realmente shared.

---

## 2. Entidades del proceso de subsanación

### 2.1 `Finding` (Hallazgo)

```
{
  id: string                  // p. ej. "F-001"
  category: enum              // arch | duplication | validation | error-handling | naming | security | consistency | scripts | tests
  location: string            // archivo o módulo (ruta relativa)
  description: string
  severity: enum              // critical | high | medium | low
  impact: enum                // high | medium | low
  risk: enum                  // high | medium | low (riesgo de aplicar la corrección)
  rationale: string           // justificación técnica
  proposed_fix: string        // resumen de la corrección propuesta
  task_id: string | null      // tarea asociada (referencia a tasks.md)
  dependencies: string[]      // ids de otros findings que deben cerrarse antes
}
```

**Reglas**:
- `id` único.
- `severity = critical` requiere atención antes de cualquier movimiento estructural; estos hallazgos van al inicio del orden de implementación.
- `task_id = null` significa que el hallazgo está reportado pero aún no asignado a una tarea (estado de transición entre /speckit-plan y /speckit-tasks).

---

### 2.2 `Feature`

```
{
  id: string                  // slug, p. ej. "products"
  name: string                // human-readable
  description: string
  layers: ["domain", "application", "infrastructure", "presentation"]
  public_api_path: string     // siempre "src/features/<id>/index.ts"
  inbound_dependencies: string[]   // ids de features que importan esta feature
  outbound_dependencies: string[]  // ids de features que esta feature importa
  shared_dependencies: string[]    // áreas de shared que consume
  origin_paths: string[]      // archivos del proyecto actual mapeados a esta feature
}
```

**Reglas**:
- `outbound_dependencies` no puede contener ciclos (DAG estricto).
- Todo `origin_paths` registrado en una feature está prohibido para otras features (un archivo no puede mapearse a dos features).

---

### 2.3 `Layer` (capa)

```
{
  feature_id: string
  type: enum                  // domain | application | infrastructure | presentation
  allowed_imports_from: string[]   // capas/módulos desde los que se puede importar a esta capa
  allowed_imports_to: string[]     // capas/módulos a los que esta capa puede importar
}
```

**Reglas estándar** (constantes para todas las features):
- `domain` → puede importar de: `domain` (propia), `shared/types`, `shared/utils` (sin estado).
- `application` → puede importar de: `application` (propia), `domain` (propia), `shared/*`, `features/<otra>` (barrel).
- `infrastructure` → puede importar de: `domain` (propia), `application` (propia), `shared/*`.
- `presentation` → puede importar de: `application` (propia), `domain` (propia), `shared/*`, `features/<otra>` (barrel).
- Nadie importa de `infrastructure` salvo wiring explícito.

---

### 2.4 `MigrationTask`

```
{
  id: string                  // T-001
  feature_id: string | null   // null si la tarea es transversal (config, scripts, etc.)
  findings_addressed: string[]
  files_moved: { from: string, to: string }[]
  files_deleted: string[]
  files_added: string[]
  shims_introduced: string[]  // paths a archivos que serán shims temporales
  shims_removed: string[]     // shims eliminados por esta tarea
  acceptance_criteria: string[]
  verifications: string[]     // ids de verifications
  introduces_db_migration: boolean
  breaks_compatibility: boolean
  risk: enum                  // high | medium | low
  depends_on: string[]        // ids de otras tareas
  rollback: string            // descripción del plan de rollback
}
```

**Reglas**:
- Tras aplicar la tarea, el repo debe pasar `lint`, `typecheck`, `build` y boundaries.
- `shims_introduced` deben ser eliminados antes de cerrar el feature (verificación final).
- `breaks_compatibility = true` exige documentación explícita en el commit message.

---

### 2.5 `Verification`

```
{
  id: string                  // V-001
  type: enum                  // lint | boundaries | typecheck | build | manual-checklist | unit-test | e2e-test
  description: string
  command: string | null      // comando ejecutable (npm script)
  steps: string[] | null      // pasos manuales (para manual-checklist)
  findings_covered: string[]  // ids de findings a los que da cobertura
}
```

**Reglas**:
- Cada `Finding` con `severity ∈ {critical, high}` debe tener al menos una `Verification` que lo cubra (FR-015).

---

### 2.6 `DBMigration`

```
{
  id: string                  // M-001
  description: string
  reversible: boolean
  rationale: string
  affected_tables: string[]
  rollback_plan: string
  introduced_by_task: string  // id de MigrationTask
}
```

**Reglas**:
- `reversible = false` requiere justificación expandida en `rationale`.
- Toda migración debe tener `rollback_plan` documentado, incluso si el rollback es manual.

---

## 3. Notas de modelado adicionales

### 3.1 Mapeo total

El mapeo `archivo → feature` declarado en §1 cubre los 133 archivos `.ts/.tsx` bajo `src/`. El proceso de migración (en `/speckit-tasks`) puede ajustar el destino exacto de archivos ambiguos (`AddToCartButton`, `FormMail`, `vcard`) sin cambiar la cardinalidad de features.

### 3.2 Schemas (introducidos por la migración)

Cada feature define schemas `zod` en `application/schemas/` para validar input externo:
- `products`: `searchParamsSchema`, `productIdSchema`.
- `cart`: `cartUrlSchema`.
- `checkout`: `createOrderInputSchema`, `captureOrderInputSchema`.
- `auth`: `oauthCallbackSchema`.
- `notifications`: `sendOrderEmailInputSchema`, `contactFormSchema`.
- `currency`: `convertQuerySchema`.
- `admin`: `productEditSchema`.

Estos schemas no son entidades de dominio: son contratos de input/output, viven en `application` y se exportan vía la API pública.

### 3.3 Entidades legacy detectadas

- `user_tickets` (referenciada en `capture-order/route.ts`): legacy de un módulo de eventos/ticketing. Se preserva el comportamiento (skip si no hay registros) y se evalúa si la tabla aún existe en producción durante la auditoría. No es un dominio nuevo del feature; queda en `checkout` como dependencia legacy, posible candidata a remover si el módulo no se usa.

### 3.4 Sin migraciones de schema previstas en la fase principal

La migración estructural NO requiere cambios en BD. Si se decide migrar `AUTHORIZED_ADMINS` a tabla `user_roles`, será una `DBMigration` aislada y opcional, en una tarea independiente al final del plan.
