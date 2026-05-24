---
project: "Hexabot Configurator"
version: 1
status: draft
created: 2026-05-24
context_type: greenfield
product_type: web-app
target_scale:
  users: small
  qps: low
  data_volume: small
timeline_budget:
  mvp_weeks: 1
  hard_deadline: null
  after_hours_only: true
---

## Vision & Problem Statement

Configuring the hexabot directly through raw terminal commands was manageable when the parameter surface was smaller, but after moving more behavior into a dedicated configuration layer the number of settings became too lengthy and awkward to manage by hand. The hardest cases are physical tuning tasks such as leg lengths, plus other runtime settings that are now better suited to a visual configurator than raw command entry.

The insight is that this is the correct moment to build the product because the robot API has only recently matured enough to support a proper configurator. What used to be a tolerable manual workflow has become broad enough and structured enough that a dedicated UI can now materially reduce tuning effort and mistakes.

## User & Persona

### Primary persona

A hobby robot user/operator who needs to configure, calibrate, and tune a hexabot without managing a long stream of raw terminal commands.

## Success Criteria

### Primary

- An operator can open the configurator, connect it to the robot, browse available configuration areas and parameters, tune a selected value such as leg geometry or gait, receive warnings when the value looks unsafe, and save the accepted change.

### Secondary

- The configurator supports the most important namespaces beyond a single demo path, starting with `system`, `joint_cal`, `leg_geom`, and `servo_map`.

### Guardrails

- The configurator must warn before values that are clearly outside physically plausible robot limits, such as impossible leg dimensions caused by unit mistakes.
- Unsafe values must not be made easy to apply in a way that can damage hardware such as servos.

## User Stories

### US-01: Tune leg geometry from the configurator

- **Given** a user with the configurator open and a robot available
- **When** the user connects to the robot, opens a configuration page, changes a setting, and saves it
- **Then** the robot accepts the change and the user can verify the updated behavior

#### Acceptance Criteria

- Unsafe values show a warning before save.
- The correct page shows the current values for its parameter group.
- Saving persists the accepted change to the robot.

## Functional Requirements

- FR-001: Operator can connect the configurator to the robot. Priority: must-have
  > Socrates: Counter-argument considered: connection setup might consume too
  > much scope or be deferred behind mock data. Resolution: kept as written;
  > without real robot connection, the MVP does not prove the product.
- FR-002: Operator can browse a few critical configuration pages that represent the highest-value namespaces or parameter groups. Priority: must-have
  > Socrates: Counter-argument considered: a comprehensive page surface would
  > over-expand the MVP. Resolution: narrowed to critical pages first,
  > especially `system`, `joint_cal`, `leg_geom`, and `servo_map`.
- FR-003: Operator can inspect robot settings through visual pages, with raw values visible alongside visuals when useful. Priority: must-have
  > Socrates: Counter-argument considered: pure visualization could hide
  > precision or troubleshooting detail. Resolution: kept, but raw values may
  > accompany visual representations when needed.
- FR-004: Operator can edit a focused set of related parameters through page-specific controls. Priority: must-have
  > Socrates: Counter-argument considered: read-only pages could prove the
  > integration first. Resolution: kept as written because editing is part of
  > the core value the MVP must prove.
- FR-005: Operator can see warnings when a value looks obviously physically impossible. Priority: must-have
  > Socrates: Counter-argument considered: the MVP should not imply complete
  > hardware safety coverage before all limits are modeled. Resolution:
  > narrowed to warnings for clearly impossible values and likely unit
  > mistakes.
- FR-006: Operator can save accepted changes to the robot. Priority: must-have
  > Socrates: Counter-argument considered: persistence could be deferred or
  > expanded into backup and versioning features. Resolution: kept as written,
  > but scoped to the robot's existing save semantics only.

## Non-Functional Requirements

- Tuning flows remain easily accessible, with important configuration areas reachable through clear page structure instead of buried parameter navigation.
- The interface responds quickly enough that tuning feels interactive rather than delayed.
- The values and previews shown by the configurator are trustworthy enough for the operator to compare what is displayed with the robot state.
- Obviously invalid values are not saved without a warning being shown first.
- Connection failures are made visible clearly enough that the user can tell when the configurator is not currently talking to the robot.
- The configurator remains usable on a laptop in a normal browser.

## Business Logic

The configurator visualizes the effect of robot configuration values before they are applied so the operator can catch mistakes and avoid unsafe tuning changes.

The rule consumes current robot parameters such as leg lengths, joint angle limits, and absolute-position-related settings that affect how the robot is shaped or allowed to move.

It produces visual previews and warnings that help the user understand what a chosen value means before saving it to the robot.

The user encounters this logic directly on configuration and tuning pages while reviewing and editing a focused parameter group.

## Access Control

Single user in practice; no user authentication for the MVP. If the software can connect to the robot, that is sufficient access.

No role separation is planned. The smallest useful model is one operator with full access to configuration and tuning features.

## Non-Goals

- No path planning or SLAM in the MVP, because the first release is focused on configuration and tuning rather than autonomous behavior.
- No support for every robot namespace on day one, because the first release should focus on the highest-value configuration pages first.
- No complete hardware-safety guarantee, because the MVP only warns on obviously impossible values and likely unit mistakes.
- No multi-user accounts or role management, because the MVP is for a single operator with direct robot connectivity.

## Open Questions

None at this time.