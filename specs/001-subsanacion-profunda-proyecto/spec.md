# Feature Specification: Subsanación Profunda + Migración a Clean Architecture por Features

**Feature Branch**: `001-subsanacion-profunda-proyecto`
**Created**: 2026-05-09
**Last Updated**: 2026-05-23
**Status**: In Progress — Pending Sign-Off
**Input**: User description: "Subsanación profunda del proyecto existente: auditar y corregir arquitectura, deuda técnica, duplicación, validaciones, manejo de errores, separación de responsabilidades, seguridad básica, pruebas y consistencia general; replanteando el sistema como una arquitectura limpia basada en features (vertical slices) para reorganizar todo el código, sin reescribir desde cero y conservando la base de datos y funcionalidad existentes. Entregables: diagnóstico, lista priorizada de problemas, plan de refactor incremental, tareas implementables y verificaciones por área corregida."

## Clarifications

### Session 2026-05-09

- Q: ¿Cuál es el layout físico destino de las features dentro del repo? → A: `src/features/<feature>/{domain,application,infrastructure,presentation}` + `src/app/` reservado solo a routing (App Router) + `src/shared/` para código transversal.
- Q: ¿Cuál es la granularidad mínima de una feature? → A: Una feature = una capability de negocio top-level (~8-12 features). Subdivisiones internas son carpetas dentro de la feature, no features nuevas.
- Q: ¿Dónde viven los server actions y los route handlers respecto a la feature? → A: Server actions en `src/features/<f>/application/actions/` (exportados por la API pública de la feature); route handlers permanecen en `src/app/api/<route>/route.ts` (restricción de Next.js) con cuerpo delgado que parsea/valida input y delega a un use case de la feature.
- Q: ¿Cómo se declara y enforce la API pública de cada feature? → A: Barrel `src/features/<f>/index.ts` que reexporta solo los símbolos públicos; regla de ESLint prohíbe imports cross-feature a paths distintos de `@/features/<f>` (sin profundidad).
- Q: ¿Cuál es el patrón de comunicación entre features acopladas? → A: Import directo de la API pública de la otra feature como mecanismo por defecto; puerto/inversión de dependencias solo cuando exista justificación concreta (ciclo, test con doble, sustitución dinámica).
- Q: ¿Política de eliminación de los endpoints abiertos `/api/send-email` y `/api/send-order-email`? → A: Gradual: en Fase A se blindan con auth + same-origin + logging de callers; se eliminan en Fase D2 únicamente si tras ≥1 sprint los logs confirman cero callers externos. Si aparecen callers legítimos, NO eliminar; aplicar autenticación permanente.
- Q: ¿La compra admite checkout como invitado (sin sesión Supabase)? → A: No. Toda compra requiere sesión activa. T-Sec-5 valida `orders.user_id === session.user.id` antes de crear/capturar orden PayPal sin caminos alternativos.
- Q: ¿Modelo de roles admin para reemplazar `AUTHORIZED_ADMINS` hardcoded? → A: `ADMIN_EMAILS` env var (server-only) en Fase A, sin DB migration. Tabla `user_roles` queda explícitamente diferida a Fase F opcional.
- Q: ¿La consolidación de duplicación en `cards/Carousel/home/banner` (F-014) entra al alcance principal? → A: No. En el feature 001 solo se mueven los archivos a sus features destino sin tocar lógica; la consolidación de variantes en componentes parametrizados queda diferida a feature 002 con QA visual dedicado.
- Q: ¿Vitest/Playwright entran al alcance del feature 001? → A: No. Verificación del 001 = lint (incluye boundaries) + typecheck + build + checklists manuales. La introducción de Vitest (unit) y Playwright (E2E light) queda fuera del alcance, prevista como feature 003 una vez los use cases estén puros en `application/`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Diagnóstico técnico priorizado del estado actual (Priority: P1)

El equipo técnico necesita una radiografía completa del estado actual: qué módulos tienen responsabilidades mezcladas, dónde hay lógica duplicada, qué validaciones faltan, dónde se silencian errores, qué constantes mágicas y nombres confusos existen, qué riesgos de seguridad básica están abiertos y, sobre todo, **qué código pertenece a qué feature de negocio**. El diagnóstico debe priorizar hallazgos por impacto y riesgo, y debe producir el inventario de features que servirá de base al rediseño.

**Why this priority**: Sin diagnóstico priorizado y sin inventario de features no hay forma de decidir qué reorganizar primero. La migración a una arquitectura por features exige saber, antes de mover archivos, cuáles son las features y a qué pertenece cada pieza del código actual.

**Independent Test**: Se valida revisando que el documento cubre todas las áreas declaradas, que cada hallazgo está clasificado por severidad/impacto/riesgo, y que existe un mapa "archivo o módulo actual → feature destino" que cubre el 100% del código bajo `src/`.

**Acceptance Scenarios**:

1. **Given** el repositorio en su estado actual, **When** se ejecuta la fase de diagnóstico, **Then** se produce un documento con hallazgos por categoría (arquitectura, duplicación, validaciones, errores, nombres/constantes, seguridad, consistencia FE/BE, scripts) más un inventario de features de negocio.
2. **Given** el inventario de features, **When** se cruza con el árbol de archivos actual, **Then** cada archivo bajo `src/` aparece asignado a una feature o explícitamente marcado como código transversal (shared/cross-cutting).
3. **Given** un hallazgo de severidad alta, **When** se inspecciona su entrada, **Then** incluye ubicación, descripción, impacto, justificación técnica y propuesta de corrección.

---

### User Story 2 - Definición de la arquitectura objetivo: Clean Architecture por features (Priority: P1)

El equipo necesita una definición clara y aplicable de la arquitectura destino: una organización por features (vertical slices) donde cada feature contiene sus propias capas (dominio, casos de uso/aplicación, infraestructura, presentación) y donde el código compartido genuinamente transversal vive en un módulo `shared` con reglas de dependencia explícitas. La definición debe ser concreta para este proyecto: qué carpetas se crean, qué entra en cada capa, qué dirección tienen las dependencias y qué reglas de import están permitidas o prohibidas.

**Why this priority**: Sin una definición concreta y verificable de la arquitectura objetivo, cada desarrollador interpreta "Clean Architecture" diferente y la migración termina produciendo otra mezcla inconsistente. La definición debe ser tan específica que un linter o un script pueda verificarla.

**Independent Test**: Se valida tomando un feature de muestra (existente o nueva) y aplicando la definición: el resultado debe seguir las reglas de capas y dependencias sin ambigüedad, y un script de verificación debe poder confirmarlo automáticamente.

**Acceptance Scenarios**:

1. **Given** la definición de arquitectura objetivo, **When** se la aplica a una feature de ejemplo, **Then** queda claro qué archivo va en cada capa y qué dependencias entre capas están permitidas.
2. **Given** un import que viola las reglas (p. ej. dominio importando de infraestructura), **When** se ejecuta la verificación, **Then** se detecta y se reporta antes de mergear.
3. **Given** una pieza de código transversal candidata, **When** se evalúa contra los criterios de "shared", **Then** se decide unívocamente si entra a `shared` o pertenece a una feature concreta.

---

### User Story 3 - Plan de migración incremental por features (Priority: P1)

El equipo necesita un plan que migre el código actual a la arquitectura objetivo feature por feature, sin big-bang, sin reescribir desde cero, conservando la base de datos existente y manteniendo el proyecto en estado verde después de cada paso. Cada feature migrada debe ser un commit (o serie corta de commits) revisable y reversible.

**Why this priority**: Una reorganización completa hecha de un solo golpe rompe todo, no se puede revisar y bloquea al equipo. El plan incremental es el mecanismo que convierte el rediseño en una serie de cambios seguros, cada uno de los cuales deja el proyecto desplegable.

**Independent Test**: Se valida tomando una feature del plan, aplicándola en una rama, ejecutando build/lint/type-check, y confirmando que el resultado pasa en limpio y que la funcionalidad pre-existente sigue funcionando.

**Acceptance Scenarios**:

1. **Given** el inventario de features y la arquitectura objetivo, **When** se genera el plan, **Then** las features aparecen ordenadas: primero las de bajo riesgo y alto valor (p. ej. utilidades aisladas), luego las de mayor acoplamiento (p. ej. checkout, auth).
2. **Given** una feature migrada según el plan, **When** se ejecutan `pnpm build`, `pnpm lint` y type-check, **Then** todos pasan sin errores nuevos.
3. **Given** una feature del plan, **When** se intenta aplicar antes que sus dependencias declaradas, **Then** el plan lo prohíbe explícitamente o describe el shim temporal requerido.
4. **Given** una feature migrada, **When** se inspecciona el diff, **Then** los cambios son mayoritariamente movimientos y renombres con shims/redirecciones temporales si hace falta, no reescrituras de lógica.

---

### User Story 4 - Endurecimiento de seguridad básica (Priority: P1)

El proyecto maneja autenticación (Supabase), pagos (PayPal), envío de correo (nodemailer) e i18n con rutas públicas. La auditoría debe detectar y corregir: variables de entorno mal expuestas (uso de `NEXT_PUBLIC_*` para secretos), credenciales filtradas en repo o en cliente, endpoints API sin validación de input, endpoints sensibles sin verificación de sesión/permisos, y respuestas que filtran detalles internos en errores.

**Why this priority**: Una exposición de secreto, una llave de servicio en cliente o un endpoint de pago sin validación tiene impacto inmediato (financiero o de datos) y no admite "lo arreglamos en la próxima iteración". Estos hallazgos se atacan al inicio del flujo, antes de mover archivos.

**Independent Test**: Se valida con un checklist manual: ningún secreto en cliente, todos los endpoints sensibles validan sesión y permisos, todos los endpoints aceptan solo el shape esperado de input, y los logs/respuestas no exponen stack traces ni datos internos en producción.

**Acceptance Scenarios**:

1. **Given** las variables de entorno actuales, **When** se audita su uso, **Then** se identifica cuáles deben ser solo de servidor y cuáles pueden ser públicas, y se corrige cualquier filtración.
2. **Given** un endpoint sensible (crear orden, enviar correo, callback de pago), **When** se invoca sin sesión válida o con input inesperado, **Then** responde con error controlado sin filtrar información interna.
3. **Given** un error en un endpoint, **When** ocurre en producción, **Then** se registra internamente y se devuelve al cliente un mensaje genérico sin stack trace.

---

### User Story 5 - Verificaciones automáticas por área corregida y por capa (Priority: P2)

Cada área corregida y cada regla de la arquitectura objetivo debe quedar protegida con una verificación: una prueba, una regla de lint (incluida una regla de "boundaries" que prohíba imports cruzados entre features y entre capas en dirección incorrecta), un type-check, un script o una checklist manual reproducible.

**Why this priority**: Sin verificación, los hallazgos corregidos vuelven a aparecer y la arquitectura objetivo se erosiona en pocos sprints. Las reglas que no se verifican automáticamente no se mantienen.

**Independent Test**: Se valida intentando reintroducir intencionalmente un hallazgo corregido o un import prohibido entre capas/features; alguna verificación lo detecta antes de mergear.

**Acceptance Scenarios**:

1. **Given** un hallazgo corregido, **When** se introduce intencionalmente la regresión, **Then** alguna verificación lo detecta antes de mergear.
2. **Given** un import desde la capa de dominio hacia infraestructura, **When** se intenta mergear, **Then** la verificación de boundaries lo bloquea.
3. **Given** un import directo de feature A a un archivo interno de feature B (saltándose su API pública), **When** se intenta mergear, **Then** la verificación lo bloquea.
4. **Given** los scripts del proyecto, **When** se ejecutan en CI o local, **Then** lint, type-check y boundaries pasan en limpio sobre el código tocado.

---

### User Story 6 - Consistencia entre frontend, backend y configuración (Priority: P2)

La auditoría debe revisar que tipos, contratos y validaciones sean consistentes entre cliente y endpoints API/server actions; que los scripts de build, lint, test y despliegue estén alineados con el código actual; y que las convenciones de naming, manejo de i18n y estructura de carpetas sean uniformes con la arquitectura objetivo.

**Why this priority**: Las inconsistencias FE/BE producen errores en runtime que no detectan ni el linter ni el type-checker. Los scripts desalineados producen builds que pasan en local pero fallan en despliegue.

**Independent Test**: Se valida cambiando un contrato de API y comprobando que todos los consumidores cliente y el tipo compartido fallan el type-check hasta actualizarse; y que `pnpm build`, `pnpm lint` y los scripts de despliegue producen el mismo resultado en local y en CI.

**Acceptance Scenarios**:

1. **Given** un endpoint, **When** se cambia su shape de respuesta, **Then** el tipo compartido y todos los consumidores cliente fallan el type-check hasta actualizarse.
2. **Given** los scripts de package.json, **When** se ejecutan, **Then** todos cumplen su propósito declarado y no quedan scripts huérfanos o referenciando herramientas no instaladas.

---

### Edge Cases

- ¿Qué pasa si un hallazgo de seguridad alta se descubre durante el diagnóstico (p. ej. secreto filtrado en historial git)? Debe escalarse fuera del flujo incremental: rotación de credencial primero, fix después.
- ¿Cómo se maneja un cambio que requiere migración de base de datos? Debe ser mínimo, justificado, reversible cuando sea posible y aprobado explícitamente. La arquitectura por features se construye sobre el schema existente; el rediseño no exige tocar el schema salvo que un hallazgo concreto lo requiera.
- ¿Qué pasa si una feature en migración rompe compatibilidad con una funcionalidad actual? Debe documentarse explícitamente el quiebre, su justificación y la ruta de migración antes de mergear.
- ¿Qué hacer con código transversal genuinamente compartido (formatters, helpers de fecha/moneda, cliente Supabase, configuración SEO)? Vive en `shared` con reglas estrictas: solo puede ser importado por features, nunca al revés.
- ¿Qué pasa si dos features antes acopladas (p. ej. checkout y orders) deben separarse? El patrón por defecto es import directo de la API pública de la otra feature; un puerto/inversión de dependencias se introduce solo cuando aparece una justificación concreta (ciclo de dependencias, necesidad de doble en test, sustitución dinámica) y se documenta como dependencia declarada.
- ¿Qué pasa si una página o ruta de Next.js cruza varias features? La página actúa como composición delgada que orquesta componentes/casos de uso de las features involucradas; no contiene lógica de negocio propia.
- ¿Qué pasa si no existe infraestructura de pruebas? La verificación recae en lint (incluida regla de boundaries), type-check y checklist manual reproducible hasta que se decida en `/speckit-plan` si se introduce un runner de pruebas y cuál.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El proceso DEBE producir un diagnóstico técnico que cubra arquitectura/estructura, deuda técnica, duplicación, validaciones faltantes, manejo de errores, nombres y constantes mágicas, seguridad básica, consistencia frontend/backend y scripts de build/lint/test/despliegue.
- **FR-002**: Cada hallazgo DEBE incluir: ubicación, descripción, severidad, impacto, riesgo de corrección y justificación técnica.
- **FR-003**: La lista de hallazgos DEBE estar priorizada con el criterio "alto impacto y bajo riesgo primero".
- **FR-004**: El proceso DEBE producir un inventario de features de negocio que cubra el 100% del código bajo `src/`, incluyendo el código transversal explícitamente marcado como `shared`. Cada feature representa una capability de negocio top-level (cardinalidad esperada: 8-12 features); las subdivisiones internas DEBEN modelarse como carpetas dentro de la feature, no como features independientes.
- **FR-005**: La arquitectura objetivo DEBE ser Clean Architecture organizada por features (vertical slices), con capas explícitas dentro de cada feature (dominio, aplicación/casos de uso, infraestructura, presentación) y un módulo `shared` para utilidades genuinamente transversales. El layout físico es: `src/features/<feature>/{domain,application,infrastructure,presentation}` para cada feature, `src/app/` reservado exclusivamente al routing de Next.js (páginas y route handlers), y `src/shared/` para el código transversal.
- **FR-006**: La arquitectura objetivo DEBE definir reglas de dependencia explícitas: la dirección permitida entre capas (presentación → aplicación → dominio; infraestructura implementa puertos definidos en dominio/aplicación), la prohibición de imports entre features fuera de su API pública declarada, y la prohibición de imports desde `shared` hacia features. La API pública de cada feature DEBE declararse en un único barrel `src/features/<f>/index.ts` que reexporta solo los símbolos públicos; los imports cross-feature solo pueden apuntar a `@/features/<f>` (sin profundidad), y esta restricción DEBE estar enforced por una regla de ESLint en CI y local.
- **FR-007**: El plan de migración DEBE descomponer el rediseño en tareas por feature, ordenadas por impacto descendente y riesgo ascendente, aplicables de forma incremental y aisladas entre sí salvo dependencias explícitamente declaradas.
- **FR-008**: Cada tarea de migración DEBE declarar: feature involucrada, archivos afectados (origen → destino), shims o redirecciones temporales necesarios, criterios de aceptación, verificación asociada, justificación técnica y si introduce migraciones de BD o quiebres de compatibilidad.
- **FR-009**: El proceso NO DEBE reescribir el proyecto desde cero; toda corrección y todo movimiento de código parte del código y la base de datos existentes, conservando lógica de negocio actual salvo cuando un hallazgo concreto demande cambiarla.
- **FR-010**: Las migraciones de base de datos DEBEN ser mínimas, justificadas y reversibles cuando sea posible; cualquier migración no reversible DEBE quedar documentada con su razón.
- **FR-011**: Toda ruptura de compatibilidad con funcionalidad existente DEBE documentarse explícitamente antes de aplicarse, incluyendo ruta de migración para los consumidores afectados.
- **FR-012**: La auditoría de seguridad básica DEBE verificar uso correcto de variables de entorno (separación servidor/cliente), ausencia de secretos en repositorio o en bundle de cliente, validación de input en endpoints, verificación de sesión/permisos en endpoints sensibles y ausencia de filtración de detalles internos en respuestas de error.
- **FR-013**: La auditoría DEBE detectar y reportar errores silenciosos (catch sin manejo, promesas sin await, errores tragados) y manejo inconsistente de excepciones a lo largo del proyecto.
- **FR-014**: La auditoría DEBE detectar duplicación significativa y proponer su consolidación (a `shared` o como helper interno de una feature) cuando el costo de la abstracción sea menor que el costo de la duplicación.
- **FR-015**: Cada hallazgo de severidad alta corregido y cada regla de la arquitectura objetivo DEBEN quedar cubiertos por al menos una verificación automatizada (lint, regla de boundaries, type-check, prueba) o, en su defecto, una checklist manual reproducible documentada.
- **FR-016**: El proyecto DEBE quedar en estado verde (build, lint, type-check y reglas de boundaries pasando) después de cada tarea cerrada.
- **FR-017**: El proceso DEBE reutilizar la estructura de base de datos existente; cualquier desviación DEBE quedar justificada en la tarea correspondiente.
- **FR-018**: Las páginas y rutas de Next.js DEBEN comportarse como composición delgada que orquesta features; la lógica de negocio DEBE residir en las capas de aplicación/dominio de cada feature, no en las páginas.
- **FR-019**: Los server actions (`'use server'`) DEBEN vivir en `src/features/<f>/application/actions/` y ser expuestos vía la API pública de la feature; NO DEBEN dispersarse en `src/app/`.
- **FR-020**: Los route handlers en `src/app/api/<route>/route.ts` DEBEN limitarse a parsear/validar input, delegar a un use case importado desde la capa `application` de la feature correspondiente y serializar la respuesta; NO DEBEN contener lógica de negocio.
- **FR-021**: La comunicación entre features DEBE ocurrir por defecto vía import directo de la API pública (`@/features/<otra>`); la introducción de un puerto/inversión de dependencias entre features DEBE estar justificada por al menos una de estas razones documentadas en la tarea: ciclo de dependencias, necesidad de doble en test, o sustitución dinámica del adaptador en runtime.

### Key Entities

- **Hallazgo (Finding)**: Unidad mínima del diagnóstico. Atributos: id, categoría, ubicación, descripción, severidad, impacto, riesgo, justificación, propuesta de corrección, dependencias.
- **Feature**: Unidad funcional de negocio que agrupa todo el código (dominio, aplicación, infraestructura, presentación) necesario para una capacidad concreta. Atributos: id, nombre, descripción, capas, API pública, dependencias declaradas con otras features, dependencias con `shared`.
- **Capa (Layer)**: Subdivisión interna de una feature. Tipos: `domain`, `application`, `infrastructure`, `presentation`. Cada capa declara qué puede importar y qué puede ser importado.
- **Módulo Shared**: Código genuinamente transversal (formatters, utilidades, clientes externos compartidos, tipos comunes). Reglas: solo es importado por features, nunca importa desde features.
- **Tarea de migración (Migration Task)**: Unidad mínima del plan. Atributos: id, feature involucrada, hallazgos asociados, mapeo origen→destino de archivos, shims temporales, criterios de aceptación, verificación, riesgo, dependencias, indica si requiere migración de BD o rompe compatibilidad.
- **Verificación (Verification)**: Mecanismo que detecta regresión de un hallazgo cerrado o violación de la arquitectura. Tipos: lint, regla de boundaries, type-check, prueba, checklist manual.
- **Migración de BD (DB Migration)**: Cambio de schema o datos requerido por una tarea. Atributos: descripción, reversibilidad, justificación, impacto en datos existentes, plan de rollback.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% del código bajo `src/` queda asignado a una feature concreta o a `shared` en el inventario.
- **SC-002**: El 100% de las áreas de auditoría declaradas (arquitectura, deuda técnica, duplicación, validaciones, errores, nombres/constantes, seguridad básica, consistencia FE/BE, scripts) aparecen cubiertas en el documento de diagnóstico.
- **SC-003**: El 100% de los hallazgos de severidad alta tienen al menos una tarea asociada con verificación documentada.
- **SC-004**: Cada tarea de migración se aplica de forma aislada y, al cerrarse, deja el proyecto con `build`, `lint`, type-check y reglas de boundaries pasando sin errores nuevos.
- **SC-005**: Cero secretos del backend (claves de servicio, credenciales SMTP, claves de proveedor de pago) aparecen expuestos en código de cliente o en el bundle de cliente.
- **SC-006**: El 100% de los endpoints clasificados como sensibles validan input y verifican sesión/permisos antes de ejecutar lógica de negocio.
- **SC-007**: Cero imports cruzados entre features fuera de su API pública declarada; cero imports desde `shared` hacia features; cero imports desde `domain` hacia `infrastructure`.
- **SC-008**: Las páginas/rutas de Next.js tocadas durante la migración no contienen lógica de negocio propia; toda la lógica vive en capas de aplicación/dominio de las features.
- **SC-009**: El 100% de las correcciones aplicadas que rompen compatibilidad están documentadas explícitamente en el changelog del feature o en el commit que las introduce.
- **SC-010**: Tras cerrar el feature, el conteo de errores silenciosos detectados en el código auditado se reduce a cero o a casos justificados explícitamente con comentario.
- **SC-011**: Tras cerrar el feature, los hallazgos priorizados como "alto impacto y bajo riesgo" están todos resueltos o explícitamente diferidos con justificación escrita.
- **SC-012**: Las funcionalidades críticas (checkout PayPal, autenticación Supabase, envío de correos transaccionales, renderizado de catálogo, ruteo i18n) siguen funcionando idénticamente desde la perspectiva del usuario antes y después de la migración.

## Assumptions

- El stack actual (Next.js 15, React 19, TypeScript, Supabase, next-intl, Tailwind 4, PayPal SDK, nodemailer) se conserva; la subsanación no incluye reemplazo de tecnologías base.
- El alcance de la auditoría y de la reorganización es el código bajo `src/` y los archivos de configuración del proyecto raíz (`package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `middleware.tsx`, scripts SQL).
- Las rutas críticas que no pueden regresar son: checkout con PayPal, autenticación con Supabase, envío de correos transaccionales, renderizado de catálogo de productos y ruteo i18n con `next-intl`.
- El proyecto actualmente no tiene framework de pruebas configurado; la decisión de introducir uno (y cuál) se evalúa en `/speckit-plan`. Mientras tanto, las verificaciones se apoyan en `lint`, regla de boundaries, type-check y checklists manuales reproducibles.
- Las correcciones que tocan autenticación, schema de BD, configuración de pagos o variables de entorno requieren confirmación explícita antes de aplicarse.
- Las strings visibles al usuario permanecen en español; los nombres de variables, funciones, tipos y comentarios técnicos permanecen en inglés.
- El gestor de paquetes es `pnpm`; los scripts deben ejecutarse y verificarse con `pnpm`.
- La definición exacta del set de features (nombres, fronteras, API pública por feature) se concreta en el inventario producido durante el diagnóstico; este spec fija el modelo (Clean Architecture por features) y las reglas, no el listado final de features.
- La estrategia de migración es incremental, con shims/redirecciones temporales cuando sean necesarios para mantener consumidores antiguos funcionando hasta su migración. El estado final no contiene shims residuales.
- El proceso se ejecuta sobre la rama de feature `001-subsanacion-profunda-proyecto`; el merge a `master` ocurre solo cuando los criterios de éxito declarados se cumplen o se documenta explícitamente la postergación.
