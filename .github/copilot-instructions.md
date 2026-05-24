# Hexapod Configurator Guidelines

## Stack And Scope

- This repo is a Next.js App Router application using TypeScript, React, Tailwind CSS, and shadcn/ui-style primitives.
- Prefer project-local patterns over generic framework defaults.
- Keep changes focused and minimal. Do not reformat unrelated files.

## Structure

- Keep route files in `app/` thin. Page and layout files should mainly assemble existing components and pass page metadata.
- Put reusable UI in `components/`, shared state and providers in `lib/`, shared hooks in `hooks/`, and shared types in `types/`.
- Follow the existing domain split for configurator features: leg config, motion, controller, sensors, system, telemetry, and config management.

## TypeScript Conventions

- Preserve strict TypeScript behavior. Do not introduce `any` unless there is no practical alternative for an external boundary.
- Prefer explicit interfaces and narrow unions for domain models, matching patterns like `HexapodConfig`.
- Use the `@/` path alias for internal imports instead of long relative paths.
- Prefer named exports for reusable components, hooks, and utilities. Use default exports for Next.js route files where the framework expects them.

## React And Next.js

- Add `"use client"` only for components that need state, effects, event handlers, browser APIs, or context hooks.
- Prefer server components by default for route files and non-interactive composition layers.
- Reuse existing context providers before introducing new global state mechanisms.
- When config or provider-backed state is required, keep a single source of truth for defaults and fail fast if the required provider is missing instead of adding local fallback defaults.

## UI Conventions

- Reuse existing `components/ui` primitives and the `cn` helper from `lib/utils` before adding ad hoc wrappers.
- Match the existing dashboard/configurator visual language: compact panels, uppercase labels, mono/display accents, and Lucide icons where appropriate.
- Keep Tailwind class composition local and readable. Extract a component when a block becomes reused or hard to scan.
- Preserve surrounding file style. This repo currently mixes formatting styles in generated and hand-written files, so do not normalize semicolons, quotes, or import ordering unless the touched file already does so.

## Validation

- Use `pnpm lint` for code-quality validation.
- Vitest is the standard test runner for this repository.
- For logic changes in `lib/`, `hooks/`, `data/`, or reusable components, add/update tests and run `pnpm test`.
- Prefer focused behavior tests over snapshot-only tests.
- Use `pnpm build` for broader integration validation when a change touches app structure, shared providers, or route behavior.
- Test coverage is still evolving, so if a touched area has no tests yet, use the narrowest available validation and mention the gap.