---
bootstrapped_at: 2026-05-24T15:26:05.7259448+02:00
starter_id: next
starter_name: Next.js
project_name: hexabot-configurator
language_family: js
package_manager: pnpm
cwd_strategy: subdir-then-move
bootstrapper_confidence: verified
phase_3_status: ok
audit_command: pnpm audit --json
---

## Hand-off

```yaml
starter_id: next
package_manager: pnpm
project_name: hexabot-configurator
hints:
  language_family: js
  team_size: solo
  deployment_target: self-host
  ci_provider: github-actions
  ci_default_flow: manual-promotion
  bootstrapper_confidence: verified
  path_taken: custom
  quality_override: false
  self_check_answers:
    typed: true
    from_official_starter: true
    conventions: true
    docs_current: true
    can_judge_agent: true
  has_auth: false
  has_payments: false
  has_realtime: false
  has_ai: false
  has_background_jobs: false
```

## Why this stack

Next.js fits this project because the PRD describes a small, fast-moving web app with no forcing features like payments, AI, or background jobs, and you explicitly wanted to stay close to what already exists in the current repo. For a solo builder on a short timeline, keeping the existing TypeScript, React, and App Router direction is lower-risk than switching to a different framework family or adding a more opinionated starter with extra built-ins the MVP does not need. Self-hosting and GitHub Actions with manual promotion also match the way you described the product being run locally.

## Pre-scaffold verification

| Signal             | Value                                          | Severity | Notes                             |
| ------------------ | ---------------------------------------------- | -------- | --------------------------------- |
| package registry   | create-next-app v16.2.6 published 2026-05-23  | fresh    | resolved from cmd_template        |
| GitHub repo        | not run                                        | not run  | card.docs_url is not a GitHub URL |

## Scaffold log

**Resolved invocation**: `pnpm dlx create-next-app@latest bootstrap-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm`
**Strategy**: subdir-then-move
**Exit code**: 0
**Files moved**: 20786
**Conflicts (.scaffold siblings)**: `eslint.config.mjs.scaffold`, `next-env.d.ts.scaffold`, `node_modules.scaffold`, `package.json.scaffold`, `pnpm-lock.yaml.scaffold`, `pnpm-workspace.yaml.scaffold`, `postcss.config.mjs.scaffold`, `public.scaffold`, `README.md.scaffold`, `tsconfig.json.scaffold`
**.gitignore handling**: append-merged
**bootstrap-scaffold cleanup**: deleted
**Current workspace state**: cleanup completed after bootstrap; no `.scaffold` files remain in cwd, no `src/` app tree remains, and the root `app/` + `next.config.mjs` setup is the active standard layout.

## Post-scaffold audit

**Tool**: `pnpm audit --json`
**Summary**: 0 CRITICAL, 17 HIGH, 16 MODERATE, 5 LOW
**Direct vs transitive**: 0/7/11/4 direct of total 0/17/16/5

#### CRITICAL findings

None.

#### HIGH findings

- `glob@7.2.3` — `GHSA-5j98-mcp5-4vw2` — glob CLI command injection via `-c` / `--cmd`. Fix: `>=10.5.0`
- `minimatch@3.1.2` — `GHSA-3ppc-4f35-3m26` — minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern. Fix: `>=3.1.3`
- `minimatch@3.1.2` — `GHSA-7r86-cg39-jmmj` — minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments. Fix: `>=3.1.3`
- `minimatch@3.1.2` — `GHSA-23c5-xmqv-rm74` — minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regular expressions. Fix: `>=3.1.4`
- `next@14.2.25` — `GHSA-mwv6-3258-q52c` — Next vulnerable to denial of service with Server Components. Fix: `>=14.2.34`
- `next@14.2.25` — `GHSA-5j59-xgg2-r9c4` — Next has a denial of service with Server Components follow-up fix. Fix: `>=14.2.35`
- `next@14.2.25` — `GHSA-h25m-26qc-wcjf` — Next.js HTTP request deserialization can lead to DoS when using insecure React Server Components. Fix: `>=15.0.8`
- `next@14.2.25` — `GHSA-q4gf-8mx6-v5v3` — Next.js has a denial of service with Server Components. Fix: `>=15.5.15`
- `next@14.2.25` — `GHSA-8h8q-6873-q5fj` — Next.js vulnerable to denial of service with Server Components. Fix: `>=15.5.16`
- `next@14.2.25` — `GHSA-c4j6-fc7j-m34r` — Next.js vulnerable to server-side request forgery in applications using WebSocket upgrades. Fix: `>=15.5.16`
- `next@14.2.25` — `GHSA-36qx-fr4f-26g5` — Next.js has a Middleware / Proxy bypass in Pages Router applications using i18n. Fix: `>=15.5.16`
- `tar@7.5.2` — `GHSA-34x7-hfp2-rc4v` — node-tar vulnerable to arbitrary file creation or overwrite via hardlink path traversal. Fix: `>=7.5.7`
- `tar@7.5.2` — `GHSA-8qq5-rm4j-mr97` — node-tar vulnerable to arbitrary file overwrite and symlink poisoning. Fix: `>=7.5.3`
- `tar@7.5.2` — `GHSA-83g3-92jg-28cx` — arbitrary file read or write via hardlink target escape through symlink chain in node-tar extraction. Fix: `>=7.5.8`
- `tar@7.5.2` — `GHSA-qffp-2rhf-9h96` — tar has hardlink path traversal via drive-relative linkpath. Fix: `>=7.5.10`
- `tar@7.5.2` — `GHSA-9ppj-qmqm-q256` — node-tar symlink path traversal via drive-relative linkpath. Fix: `>=7.5.11`
- `tar@7.5.2` — `GHSA-r6q2-hw4h-h46w` — race condition in node-tar path reservations via Unicode ligature collisions on macOS APFS. Fix: `>=7.5.4`

#### MODERATE findings

- `ajv@6.12.6` — `GHSA-2g4f-4pwh-qvx6` — ajv has ReDoS when using `$data` option. Fix: `>=6.14.0`
- `brace-expansion@1.1.12` — `GHSA-f886-m6hf-6m8v` — zero-step sequence causes process hang and memory exhaustion. Fix: `>=1.1.13`
- `js-yaml@4.1.0` — `GHSA-mh29-5h37-fv8m` — prototype pollution in merge (`<<`). Fix: `>=4.1.1`
- `next@14.2.25` — `GHSA-g5qg-72qw-gw5v` — cache key confusion for image optimization routes. Fix: `>=14.2.31`
- `next@14.2.25` — `GHSA-4342-x723-ch2f` — improper middleware redirect handling leads to SSRF. Fix: `>=14.2.32`
- `next@14.2.25` — `GHSA-xv57-4mr9-wg8v` — content injection vulnerability for image optimization. Fix: `>=14.2.31`
- `next@14.2.25` — `GHSA-9g9p-9gw9-jx7f` — self-hosted apps vulnerable to DoS via image optimizer remotePatterns configuration. Fix: `>=15.5.10`
- `next@14.2.25` — `GHSA-ggv3-7p47-pfv8` — HTTP request smuggling in rewrites. Fix: `>=15.5.13`
- `next@14.2.25` — `GHSA-3x4c-7xq6-9pq8` — unbounded `next/image` disk cache growth can exhaust storage. Fix: `>=15.5.14`
- `next@14.2.25` — `GHSA-ffhc-5mcf-pf4q` — cross-site scripting in App Router applications using CSP nonces. Fix: `>=15.5.16`
- `next@14.2.25` — `GHSA-gx5p-jg67-6x7h` — cross-site scripting in `beforeInteractive` scripts with untrusted input. Fix: `>=15.5.16`
- `next@14.2.25` — `GHSA-h64f-5h5j-jqjh` — denial of service in the Image Optimization API. Fix: `>=15.5.16`
- `next@14.2.25` — `GHSA-wfc6-r584-vfw7` — cache poisoning in React Server Component responses. Fix: `>=15.5.16`
- `postcss@8.4.31` — `GHSA-qx2v-qp2m-jg93` — XSS via unescaped `</style>` in CSS stringify output. Fix: `>=8.5.10`
- `qs@6.14.0` — `GHSA-6rw7-vpxm-498p` — arrayLimit bypass in bracket notation allows DoS via memory exhaustion. Fix: `>=6.14.1`
- `qs@6.14.0` — `GHSA-q8mj-m7cp-5q26` — remotely triggerable DoS in `qs.stringify`. Fix: `>=6.15.2`

#### LOW / INFO findings

- `next@14.2.25` — `GHSA-3h52-269p-cp9r` — information exposure in the Next.js dev server due to lack of origin verification. Fix: `>=14.2.30`
- `next@14.2.25` — `GHSA-223j-4rm8-mrmf` — Next.js may leak `x-middleware-subrequest-id` to external hosts. Fix: none listed
- `next@14.2.25` — `GHSA-3g8h-86w9-wvmq` — Middleware or Proxy redirects can be cache-poisoned. Fix: `>=15.5.16`
- `next@14.2.25` — `GHSA-vfv6-92ff-j949` — cache poisoning via collisions in React Server Component cache-busting. Fix: `>=15.5.16`
- `qs@6.14.0` — `GHSA-w7fw-mjwx-w883` — arrayLimit bypass in comma parsing allows denial of service. Fix: `>=6.14.2`

## Hints recorded but not acted on

| Hint                    | Value                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| bootstrapper_confidence | verified                                                              |
| quality_override        | false                                                                 |
| path_taken              | custom                                                                |
| self_check_answers      | typed=true, from_official_starter=true, conventions=true, docs_current=true, can_judge_agent=true |
| team_size               | solo                                                                  |
| deployment_target       | self-host                                                             |
| ci_provider             | github-actions                                                        |
| ci_default_flow         | manual-promotion                                                      |
| has_auth                | false                                                                 |
| has_payments            | false                                                                 |
| has_realtime            | false                                                                 |
| has_ai                  | false                                                                 |
| has_background_jobs     | false                                                                 |

## Next steps

Next: a future skill will set up agent context (CLAUDE.md, AGENTS.md). For now, your project is scaffolded and verified — happy hacking.

Useful manual steps in the meantime:
- `pnpm build` now succeeds on the cleaned standard setup.
- `pnpm lint` still reports source issues in `components/configurator/*` and `lib/*`; those are application-level follow-up items, not bootstrap failures.
- Address audit findings per your project's risk tolerance. The most important runtime advisories are on `next@14.2.25`; fixes begin at `14.2.34` / `14.2.35`, with several later fixes only available in `15.x`.