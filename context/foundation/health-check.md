---
project: hexapod-configurator
checked_at: 2026-05-24T21:26:06.3677543+02:00
health_status: needs-attention
context_type: brownfield
language_family: js
stack_assessment_available: true
checks_run:
  - lockfile
  - dependency_audit
  - outdated_deps
  - test_runner
  - ci_cd
  - configuration
audit_findings:
  critical: 0
  high: 0
  moderate: 3
  low: 1
test_runner_detected: true
ci_provider: null
recommended_fixes: 5
---

## Dependency Health

### Lockfile

Status: present (pnpm-lock.yaml)
Package manager: pnpm

### Security Audit

Tool: pnpm audit --json
Summary: 0 CRITICAL, 0 HIGH, 3 MODERATE, 1 LOW
Direct vs transitive: Remaining advisories are transitive (`qs` via `url`) and framework-internal (`postcss` via `next`). No direct dependency advisories at HIGH/CRITICAL severity were detected.

Critical and high-severity findings have been resolved.

Moderate findings: 3 advisories remain, including `postcss` XSS (GHSA-qx2v-qp2m-jg93) and `qs` denial-of-service variants (GHSA-6rw7-vpxm-498p, GHSA-q8mj-m7cp-5q26).

Low findings: 1 advisory remains (`qs` GHSA-w7fw-mjwx-w883).

### Outdated Dependencies

Packages with major version gaps: 3

- **@hookform/resolvers**: 3.10.0 -> 5.4.0 (2 major versions behind)
- **react-resizable-panels**: 2.1.7 -> 4.11.2 (2 major versions behind)
- **@types/node**: 22.0.0 -> 25.9.1 (3 major versions behind)

## Test Suite

Test runner: Vitest
Tests found: 1 test
Test execution: passing

Configured in [package.json](package.json), [vitest.config.ts](vitest.config.ts), and smoke test coverage in [lib/utils.test.ts](lib/utils.test.ts).

## CI/CD

Provider: not detected
Configuration: not found

| Stage | Status | Notes |
|---|---|---|
| Lint | ✗ | not configured in CI |
| Test | ✗ | not configured in CI |
| Build | ✗ | not configured in CI |
| Type check | ✗ | not configured in CI |
| Security | ✗ | not configured in CI |

ℹ No CI/CD configuration detected. You'll set this up in the infrastructure and deployment lesson.
For now, a local test runner is sufficient for agent collaboration.

## Configuration

### High severity

No high-severity configuration gaps detected.

### Medium severity

- **.prettierrc* / biome.json** — no formatter configuration was detected, so agent-generated edits can drift in style and whitespace. Fix: add either a Prettier config or a `biome.json` and standardize one formatter command.

### Low severity

- **.editorconfig** — editor defaults are not standardized across machines. Fix: add a root `.editorconfig` covering indentation, newline, and trailing whitespace rules.
- **.env.example / .env.template** — environment variable expectations are not documented for future contributors or agents. Fix: add an example env file that documents every required runtime variable.

## Stack Assessment Cross-Reference

Stack assessment: [context/foundation/stack-assessment.md](context/foundation/stack-assessment.md)
Agent readiness (from stack-assess): ready-with-compensation

| Quality Gate Gap | Health-Check Finding | Status |
|---|---|---|
| Test runner standard documented but not configured | Vitest is now installed and executable (`pnpm test` passes with `lib/utils.test.ts`) | Mitigated |

## Recommended Fixes

### Fix before agent work (Category A)

### 1. Close remaining moderate/low audit findings

**Impact**: Security posture is much better, but remaining advisory paths still leave known issues in transitive dependencies.
**Severity**: medium
**Effort**: moderate (15–30 min)
**Fix**:

Track updates of transitive chains and re-audit after each lockfile refresh:

```bash
pnpm update --latest
pnpm audit --json
```

### 2. Review the direct dependencies with 2+ major-version gaps

**Impact**: Large version gaps make later fixes riskier and reduce the reliability of generated code because ecosystem examples increasingly assume newer APIs.
**Severity**: medium
**Effort**: significant (> 1 hour)
**Fix**:

Start with the packages already reported by `pnpm outdated --format json`:

```bash
pnpm up @hookform/resolvers@latest @types/node@latest react-resizable-panels@latest
```

Upgrade remaining major-gap packages in small batches, running `pnpm lint` and `pnpm build` after each batch.

### 3. Add a formatter configuration

**Impact**: Without a formatter contract, agent-generated edits can vary in whitespace and wrapping, which increases review noise and avoidable churn.
**Severity**: medium
**Effort**: moderate (15–30 min)
**Fix**:

Choose one formatter. For Prettier:

```bash
pnpm add -D prettier
```

Then add `.prettierrc.json` and a script such as `"format": "prettier --write ."`.

### 4. Add a root .editorconfig

**Impact**: Editors and agents will otherwise rely on local defaults, which leads to inconsistent indentation and newline behavior across contributors.
**Severity**: low
**Effort**: quick (< 5 min)
**Fix**:

Create `.editorconfig` with at least:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

### 5. Add an environment template file

**Impact**: Agents and contributors have no canonical source for required runtime variables, which slows onboarding and increases guesswork when environment variables are introduced.
**Severity**: low
**Effort**: quick (< 5 min)
**Fix**:

Create `.env.example` and document each variable, for example:

```env
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:81
```

### Addressed in upcoming lessons (Category B)

### No CI/CD pipeline yet

**Lesson**: [Sprint Zero z Agentem: infrastruktura, walking skeleton i pierwszy deploy (M1L5)](https://platforma.przeprogramowani.pl/external/10xdevs-3/m1-l5)
**What you'll do there**: Set up automated lint, test, build, and security checks so the project has the same safety net in CI that you use locally.

### No deployment configuration yet

**Lesson**: [Sprint Zero z Agentem: infrastruktura, walking skeleton i pierwszy deploy (M1L5)](https://platforma.przeprogramowani.pl/external/10xdevs-3/m1-l5)
**What you'll do there**: Add the first deployment target and the minimal infrastructure configuration needed for repeatable releases.

### Missing AGENTS.md instruction file

**Lesson**: [Agent Onboarding: Agents.md, AI Rules i feedback loops (M1L4)](https://platforma.przeprogramowani.pl/external/10xdevs-3/m1-l4)
**What you'll do there**: Create and refine the project's agent instruction file so the assistant follows local conventions and workflows.

## Summary

Health status: needs-attention

The critical blockers from the previous check are resolved: a runnable Vitest suite is in place and the dependency audit no longer reports any high or critical vulnerabilities. Remaining work is now non-critical hardening (moderate/low advisory cleanup, formatter/editor standardization, and environment template documentation), while CI and deployment can still follow in the next infrastructure step.