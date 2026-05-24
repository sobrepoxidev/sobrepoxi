import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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
      // Rule renamed in eslint-plugin-boundaries v6 (element-types â†’ dependencies).
      // String selectors son legacy pero funcionales; migraciÃ³n completa a v6 object selectors queda en Phase 9.
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
{ from: "app", allow: ["feature-barrel", "feature-presentation", "feature-application", "shared"] },
            { from: "feature-presentation",   allow: ["feature-application", "feature-domain", "feature-barrel", "shared", "app"] },
            { from: "feature-application",    allow: ["feature-application", "feature-domain", "feature-barrel", "feature-infrastructure", "shared", "app"] },
            { from: "feature-infrastructure", allow: ["feature-domain", "feature-application", "shared"] },
            { from: "feature-domain",         allow: ["feature-domain", "shared"] },
            { from: "feature-barrel",         allow: ["feature-application", "feature-domain", "feature-presentation", "feature-infrastructure"] },
            { from: "shared",                 allow: ["shared", "feature-application", "feature-domain"] },
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/features/*/*"],   message: "Importa solo desde @/features/<feature> (barrel). No uses deep imports cross-feature." },
            { group: ["@/features/*/*/*"], message: "Importa solo desde @/features/<feature> (barrel). No uses deep imports cross-feature." },
          ],
        },
      ],
      // Constitution §III — No BIG Components. Thresholds match the principle
      // (300 LOC per file, 100 LOC per function, complexity ≤ 15). Severity is
      // "warn" because 23 legacy files exceed 300 LOC pre-Feature-002 (visual
      // consolidation). Feature 002 promotes these to "error" after the
      // refactor. See plan.md Complexity Tracking.
      "max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true }],
      complexity: ["warn", 15],
    },
  },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      // Next route modules are the only approved place for direct imports to
      // server-only page adapters under feature presentation/pages.
      "no-restricted-imports": "off",
    },
  },
  {
    // Constitution §III exception — static templates and seed data are exempt
    // from size limits (HTML email templates, locale dictionaries, etc.).
    files: [
      "src/features/*/application/templates/**/*.{ts,tsx}",
      "src/features/*/application/data/**/*.{ts,tsx}",
      "src/features/*/application/guides/data.ts",
      "src/shared/i18n/messages/**/*.{ts,tsx,json}",
    ],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
    },
  },
];

export default eslintConfig;

