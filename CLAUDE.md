<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan at
`specs/001-subsanacion-profunda-proyecto/plan.md` and its companion artifacts:

- `specs/001-subsanacion-profunda-proyecto/spec.md` — feature specification + clarifications
- `specs/001-subsanacion-profunda-proyecto/research.md` — technical decisions and rationale
- `specs/001-subsanacion-profunda-proyecto/data-model.md` — feature inventory (current → target mapping) and process entities
- `specs/001-subsanacion-profunda-proyecto/contracts/` — public APIs per feature + boundaries config
- `specs/001-subsanacion-profunda-proyecto/quickstart.md` — verification steps (lint/typecheck/build/manual checklists)

Target architecture: Clean Architecture by features. Layout: `src/features/<f>/{domain,application,infrastructure,presentation}` + `src/app/` for routing only + `src/shared/` for cross-cutting. Public API per feature via barrel `src/features/<f>/index.ts`; cross-feature imports must point to `@/features/<f>` (no deep imports), enforced by `eslint-plugin-boundaries`. Server actions live in `application/actions/` of their feature; route handlers in `src/app/api/...` stay thin and delegate to use cases.
<!-- SPECKIT END -->
