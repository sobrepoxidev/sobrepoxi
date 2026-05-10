# Configuración de boundaries (propuesta)

Propuesta de configuración para `eslint-plugin-boundaries` y `no-restricted-imports` que enforce las reglas de la arquitectura objetivo. Se aplica al refactor de `eslint.config.mjs` durante la migración.

## Elementos

```js
// eslint.config.mjs (extracto)
import boundaries from "eslint-plugin-boundaries";

export default [
  // ...config existente
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app",                    pattern: "src/app/**" },
        { type: "feature-domain",         pattern: "src/features/*/domain/**" },
        { type: "feature-application",    pattern: "src/features/*/application/**" },
        { type: "feature-infrastructure", pattern: "src/features/*/infrastructure/**" },
        { type: "feature-presentation",   pattern: "src/features/*/presentation/**" },
        { type: "feature-barrel",         pattern: "src/features/*/index.{ts,tsx}", mode: "file" },
        { type: "shared",                 pattern: "src/shared/**" },
      ],
      "boundaries/include": ["src/**/*.{ts,tsx}"],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app",                    allow: ["feature-barrel", "shared"] },
            { from: "feature-presentation",   allow: ["feature-application", "feature-domain", "feature-barrel", "shared"] },
            { from: "feature-application",    allow: ["feature-application", "feature-domain", "feature-barrel", "shared"] },
            { from: "feature-infrastructure", allow: ["feature-domain", "feature-application", "shared"] },
            { from: "feature-domain",         allow: ["feature-domain", "shared"] },
            { from: "feature-barrel",         allow: ["feature-application", "feature-domain", "feature-presentation"] },
            { from: "shared",                 allow: ["shared"] },
          ],
        },
      ],
      // Refuerzo: cross-feature imports deben apuntar al barrel exacto, no a paths internos.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/features/*/*"], message: "Importa solo desde @/features/<feature> (barrel). No uses deep imports cross-feature." },
            { group: ["@/features/*/*/*"], message: "Importa solo desde @/features/<feature> (barrel). No uses deep imports cross-feature." },
          ],
        },
      ],
    },
  },
];
```

## Excepciones permitidas (con justificación)

- Imports relativos dentro de la propia feature: permitidos (no usan `@/features/*`).
- Imports a `@/shared/<área>` desde cualquier feature: permitidos (no requieren barrel global de shared, cada subárea de shared es estable).
- Imports a `@/shared/types/database` desde dominio: permitidos (tipos puros).

## Limitación conocida: aislamiento cross-feature a nivel de capa

`boundaries/element-types` usa patrones globales (p. ej. `src/features/*/application/**`), por lo que la regla
`{ from: "feature-application", allow: ["feature-application", ...] }` técnicamente permite que la capa
`application` de una feature importe desde la `application` de **otra** feature a través de paths absolutos.

**Mitigación**: `no-restricted-imports` con `@/features/*/*` captura y bloquea esos imports siempre que
usen el alias `@/`. Los imports relativos entre features son inusuales y quedan al criterio de revisión de código.
Esta limitación es aceptable hasta que se disponga de una herramienta que soporte restricciones per-feature-family.

## Verificación

`pnpm lint` ejecuta esta configuración. El check forma parte del flujo de cierre de cada `MigrationTask` (FR-016).
