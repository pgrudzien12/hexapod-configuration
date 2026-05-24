---
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
---

## Why this stack

Next.js fits this project because the PRD describes a small, fast-moving web app with no forcing features like payments, AI, or background jobs, and you explicitly wanted to stay close to what already exists in the current repo. For a solo builder on a short timeline, keeping the existing TypeScript, React, and App Router direction is lower-risk than switching to a different framework family or adding a more opinionated starter with extra built-ins the MVP does not need. Self-hosting and GitHub Actions with manual promotion also match the way you described the product being run locally.