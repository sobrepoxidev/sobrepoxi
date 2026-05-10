# Quickstart — Verificación de la subsanación

**Feature**: 001-subsanacion-profunda-proyecto
**Date**: 2026-05-09

Este documento define **cómo se verifica** que una tarea de migración cierra correctamente y que el proyecto sigue verde. Es la materialización de FR-015 / FR-016 / SC-004.

---

## 1. Prerrequisitos

```powershell
pnpm install --frozen-lockfile
```

Variables de entorno mínimas para `dev`:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
EMAIL_USER=...
EMAIL_PASS=...
PAYPAL_CLIENT_ID=...           # post-renombre (antes NEXT_PUBLIC_PAYPAL_CLIENT_ID en server)
PAYPAL_SECRET=...
PAYPAL_LIVE_CLIENT_ID=...      # solo en producción
PAYPAL_LIVE_SECRET=...         # solo en producción
PAYPAL_USE_MOCK=0              # opt-in para mocks (default off)
ADMIN_EMAILS=email1@dom,email2@dom   # introducido por T-... admin
```

`NEXT_PUBLIC_PAYPAL_CLIENT_ID` permanece SOLO si `<PayPalScriptProvider>` se inicializa en cliente con esa variable (verificar uso real durante T-Sec-2).

---

## 2. Verificaciones automatizadas

Cada `MigrationTask` se cierra con los cuatro checks siguientes pasando en limpio:

```powershell
pnpm lint            # incluye boundaries + no-restricted-imports
pnpm typecheck       # añadido en T-Setup-1: "tsc --noEmit"
pnpm build           # build de producción exitoso
```

Si la tarea introduce o modifica una verificación de boundaries, ejecutar antes y después para confirmar que la regla detecta una regresión simulada (FR-015).

---

## 3. Checklist manual reproducible (post-migración por feature)

Tras cada feature migrada se ejecuta el smoke test manual correspondiente. Si falla, la tarea no se cierra.

### 3.1 `auth`

1. Login con email/password → redirige a `/[locale]` con sesión válida.
2. Login con OAuth (Google) → callback exchanges code, sesión persiste.
3. Logout → cookies de sesión removidas.
4. Acceder a `/[locale]/account` sin sesión → redirige a login con `returnUrl`.

### 3.2 `cart`

1. Agregar 2 productos al carrito desde catálogo → contador en navbar refleja.
2. Recargar página con `?cart=...` → carrito reconstruido idéntico.
3. Limpiar carrito → URL pierde `cart`.
4. Login → si había carrito, sigue intacto (no debe perderse).

### 3.3 `checkout`

1. Iniciar checkout con sesión activa, `PAYPAL_USE_MOCK=0`, sandbox de PayPal → crear orden, pagar con cuenta sandbox, captura COMPLETED, `payment_status = "paid"` en BD.
2. Intentar capturar una orden de OTRO usuario (forjar `orderId` en request) → respuesta 403 / forbidden, sin cambio en BD.
3. Errores de PayPal en producción → mensaje genérico, sin filtrar detalle.

### 3.4 `account`

1. Ver perfil → campos correctos.
2. Agregar dirección → aparece en lista; marcar como default.
3. Ver órdenes → solo las del usuario autenticado.

### 3.5 `admin`

1. Acceder a `/[locale]/admin` con email NO admin → redirige a `/[locale]`.
2. Acceder con email en `ADMIN_EMAILS` → entra al panel.
3. Editar producto → `pnpm build` no rompe; cambio se persiste.

### 3.6 `notifications`

1. Enviar formulario de contacto → correo recibido en `info@sobrepoxi.com` (o destino configurado).
2. Cerrar checkout exitoso → correo de confirmación a usuario + copia a `sobrepoxidev@gmail.com`.
3. Intentar `POST /api/send-email` (debe estar **eliminado**) → 404 esperado.

### 3.7 `content`

1. Home renderiza categorías y carruseles correctamente.
2. Cambio de locale → URL refleja `/es/...` o `/en/...`, contenido cambia.
3. Página `/guias` lista guías; `/guias/[slug]` renderiza la guía.
4. `/vcard` form crea registro en `vcards`.

### 3.8 `currency`

1. `GET /api/convert?amount=100&to=CRC` → JSON con `rate` y `amount` válidos.
2. `GET /api/convert?amount=999999999&to=CRC` → error de validación 400.
3. `GET /api/convert?amount=10&to=XXX` → error de validación 400 (whitelist).

### 3.9 `products`

1. `/[locale]/products` lista productos paginados.
2. Filtrar por categoría → resultados consistentes.
3. `/[locale]/product/[id]` renderiza detalle, related products.
4. `/[locale]/search?q=...` retorna resultados.

---

## 4. Checklist de seguridad (corre después de tareas Sec)

- [ ] `git grep -nE 'NEXT_PUBLIC_(PAYPAL_(LIVE_)?CLIENT_ID|.*SECRET)'` → no aparece ningún secreto bajo `NEXT_PUBLIC_*`.
- [ ] `git grep -n 'AUTHORIZED_ADMINS'` en código fuente → 0 resultados.
- [ ] Build inspect: el bundle de cliente no contiene `EMAIL_PASS`, `PAYPAL_SECRET`, `PAYPAL_LIVE_SECRET`, ni la lista de admins.
  - Comando: `pnpm build && grep -rE "(EMAIL_PASS|PAYPAL_SECRET|PAYPAL_LIVE_SECRET)" .next/static .next/server/app | head` → 0 matches en `.next/static`.
- [ ] Endpoints `/api/send-email` y `/api/send-order-email` ya no existen (`Test-Path src/app/api/send-email` → False).
- [ ] `/api/paypal/create-order` y `/api/paypal/capture-order` validan sesión (probar sin cookie → 401).
- [ ] `/api/convert` valida `amount` y `to` (probar input fuera de whitelist → 400).
- [ ] No quedan `console.error(...)` que devuelvan stack al cliente; los handlers devuelven mensajes genéricos.
- [ ] Secretos en historial git: si hubo exposición previa, ejecutar rotación de credenciales antes de cerrar la feature.

---

## 5. Verificación de boundaries

Tras configurar `eslint-plugin-boundaries` (T-Setup-2):

```powershell
# Confirma que la regla está activa
pnpm lint

# Simulación: intentar un import prohibido
# crear src/app/test.tsx con: import { foo } from "@/features/products/application/use-cases/getProductById"
pnpm lint   # debe fallar con boundaries/element-types
# revertir el cambio
```

---

## 6. Verificación de shims

Antes de cerrar la feature 001:

```powershell
# Localizar shims temporales pendientes
git grep -n "TODO(speckit): shim temporal"
# Resultado esperado: 0
```

Si quedan shims, crear tarea de limpieza antes de mergear a `master`.

---

## 7. Limpieza de dependencias

Antes de cerrar la feature:

```powershell
# Confirmar que auth-helpers-nextjs ya no se importa
pnpm list @supabase/auth-helpers-nextjs   # esperado: missing
git grep -n "@supabase/auth-helpers-nextjs"  # esperado: 0 hits

# Confirmar que la nueva dependencia tailwind-merge está
pnpm list tailwind-merge   # esperado: presente
git grep -n "tailwind-merge"  # esperado: usado solo desde shared/utils/cn.ts
```
